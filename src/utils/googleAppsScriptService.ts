/**
 * ============================================================================
 * GOOGLE APPS SCRIPT WEB APP BACKEND SPECIFICATION
 * ============================================================================
 * 
 * To deploy the receiving Google Sheets & Google Drive backend in your Google account:
 * 
 * 1. Open Google Sheets (https://sheets.google.com) and create a new sheet:
 *    Name: "Feedback Submissions"
 *    Row 1 Header Columns:
 *    [A] Timestamp | [B] Name | [C] Email | [D] Category | [E] Rating | [F] Comments | [G] File Link
 * 
 * 2. In Google Sheets, click: Extensions > Apps Script
 *    Replace the contents of `Code.gs` with the exact backend code below:
 * 
 * ```javascript
 * function doPost(e) {
 *   try {
 *     const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 *     const data = JSON.parse(e.postData.contents);
 *     let fileUrl = "";
 * 
 *     // If an attachment is included, save it to Google Drive
 *     if (data.fileData && data.fileName) {
 *       // Replace with your Google Drive Folder ID, or omit to save to Root Drive
 *       const folder = DriveApp.getRootFolder(); 
 *       const decoded = Utilities.base64Decode(data.fileData.split(",")[1]);
 *       const blob = Utilities.newBlob(decoded, data.fileType || "application/octet-stream", data.fileName);
 *       const file = folder.createFile(blob);
 *       fileUrl = file.getUrl();
 *     }
 * 
 *     sheet.appendRow([
 *       new Date(data.timestamp || Date.now()),
 *       data.name || data.fullName || "",
 *       data.email || "",
 *       data.category || data.serviceCategory || "",
 *       data.rating || "",
 *       data.comments || data.message || "",
 *       fileUrl
 *     ]);
 * 
 *     return ContentService.createTextOutput(
 *       JSON.stringify({ status: "success", message: "Recorded", fileUrl: fileUrl })
 *     ).setMimeType(ContentService.MimeType.JSON);
 * 
 *   } catch (error) {
 *     return ContentService.createTextOutput(
 *       JSON.stringify({ status: "error", error: error.toString() })
 *     ).setMimeType(ContentService.MimeType.JSON);
 *   }
 * }
 * ```
 * 
 * 3. Deploy the Web App:
 *    - Click "Deploy" > "New deployment"
 *    - Select type: "Web app"
 *    - Execute as: "Me (your Google account)"
 *    - Who has access: "Anyone"
 *    - Authorize Google Drive & Sheets permissions, then copy the generated Web App URL.
 * 
 * 4. Paste the URL into `SCRIPT_URL` below or set `VITE_GOOGLE_APPS_SCRIPT_URL` in your environment.
 * ============================================================================
 */

export const SCRIPT_URL: string =
  (import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL as string) ||
  "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";

export interface FormSubmissionPayload {
  name: string;
  email: string;
  category: string;
  rating?: number | string;
  comments: string;
  institution?: string;
  urgency?: string;
  timeline?: string;
  fundingType?: string;
  needsNda?: boolean;
  source?: string;
  timestamp?: string;
  fileName?: string;
  fileType?: string;
  fileData?: string; // Base64 Data URL (data:application/pdf;base64,...)
}

export interface SubmissionResponse {
  success: boolean;
  message: string;
  fileUrl?: string;
  error?: string;
  isSimulated?: boolean;
}

/**
 * Converts a selected browser File into a Base64 data string via FileReader.
 */
export function convertFileToBase64(file: File): Promise<{ fileName: string; fileType: string; fileData: string }> {
  return new Promise((resolve, reject) => {
    // Enforce 10MB client-side cap for Apps Script transfer limits
    const maxSizeBytes = 10 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      reject(new Error(`File size (${(file.size / (1024 * 1024)).toFixed(1)}MB) exceeds the 10MB Google Apps Script upload limit.`));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const fileData = reader.result as string;
      resolve({
        fileName: file.name,
        fileType: file.type || 'application/octet-stream',
        fileData,
      });
    };
    reader.onerror = () => reject(new Error('Failed to read and encode the attachment file.'));
    reader.readAsDataURL(file);
  });
}

/**
 * Dispatches form data via POST text/plain to Google Apps Script.
 * Using "text/plain;charset=utf-8" prevents browser CORS preflight (OPTIONS)
 * blocking on Google Apps Script redirect endpoints.
 */
export async function submitToGoogleAppsScript(formData: FormSubmissionPayload): Promise<SubmissionResponse> {
  const payload: FormSubmissionPayload = {
    ...formData,
    timestamp: formData.timestamp || new Date().toISOString(),
  };

  // If the endpoint is still the placeholder, provide a seamless local sandbox simulation
  // while saving to localStorage and notifying the developer in console.
  if (!SCRIPT_URL || SCRIPT_URL === "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE") {
    // Artificial 750ms latency to reflect network state
    await new Promise((resolve) => setTimeout(resolve, 750));

    try {
      const existing = JSON.parse(localStorage.getItem('bioatlas_apps_script_submissions') || '[]');
      existing.unshift(payload);
      localStorage.setItem('bioatlas_apps_script_submissions', JSON.stringify(existing.slice(0, 50)));
    } catch {
      // LocalStorage error ignored
    }

    console.info(
      "%c[Google Apps Script]%c Submission recorded in Sandbox mode. Replace SCRIPT_URL with your live Google Apps Script Web App URL to stream directly into Google Sheets & Drive.",
      "color: #0284c7; font-weight: bold;",
      "color: inherit;",
      payload
    );

    return {
      success: true,
      message: "Thank you! Your feedback and project data have been successfully saved.",
      isSimulated: true,
    };
  }

  try {
    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok && response.type !== 'opaque') {
      throw new Error(`Google Apps Script returned HTTP ${response.status}: ${response.statusText}`);
    }

    let parsed: any = null;
    try {
      parsed = await response.json();
    } catch {
      // Some Apps Script endpoints redirect without returning JSON under CORS; treated as successful delivery
      parsed = { status: 'success' };
    }

    if (parsed && parsed.status === 'error') {
      throw new Error(parsed.error || 'Apps Script reported an execution error while appending row.');
    }

    return {
      success: true,
      message: "Thank you! Your feedback and data have been recorded in Google Sheets.",
      fileUrl: parsed?.fileUrl || undefined,
    };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Network error communicating with Google Apps Script endpoint.';
    console.error("[Google Apps Script Submission Failed]", err);
    return {
      success: false,
      message: "Submission failed.",
      error: errorMessage,
    };
  }
}
