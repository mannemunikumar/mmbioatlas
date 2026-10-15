/**
 * ============================================================================
 * GOOGLE APPS SCRIPT WEB APP INTEGRATION: GOOGLE SHEETS & DRIVE
 * ============================================================================
 * Backend Code.gs for receiving submissions, storing rows in Google Sheets,
 * and uploading base64-encoded file attachments to Google Drive:
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
 * ============================================================================
 */

import React, { useState } from 'react';
import { 
  X, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Building2, 
  User, 
  Mail, 
  MessageSquare, 
  PhoneCall, 
  Copy, 
  Check, 
  ExternalLink,
  UploadCloud,
  FileText,
  XCircle,
  AlertTriangle,
  Loader2,
  RotateCcw
} from 'lucide-react';
import { ServiceInquiry } from '../types';
import { LEADERSHIP_CONTACT } from '../data/organizationData';
import { 
  dispatchInquiry, 
  INQUIRY_RECIPIENT_EMAILS, 
  buildInquirySummary,
  getMailtoUrl,
  getGmailWebComposeUrl,
  getWhatsAppUrl
} from '../utils/inquiryEmail';
import {
  SCRIPT_URL,
  submitToGoogleAppsScript,
  convertFileToBase64,
  FormSubmissionPayload
} from '../utils/googleAppsScriptService';

interface ConsultationModalProps {
  isOpen: boolean;
  initialServiceCategory?: string;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  initialServiceCategory = 'cro',
  onClose
}) => {
  const [category, setCategory] = useState<string>(initialServiceCategory);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [institution, setInstitution] = useState('');
  const [timeline, setTimeline] = useState('Standard (2-4 Weeks)');
  const [details, setDetails] = useState('');

  // File upload state (converted to Base64 via FileReader)
  const [fileAttachment, setFileAttachment] = useState<{
    file: File;
    base64: string;
    fileName: string;
    fileType: string;
    sizeFormatted: string;
  } | null>(null);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  // Submission States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [savedFileUrl, setSavedFileUrl] = useState<string | null>(null);
  const [isSimulated, setIsSimulated] = useState(false);

  const [copied, setCopied] = useState(false);
  const [links, setLinks] = useState<{ mailtoUrl: string; gmailUrl: string; waUrl: string } | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFileError(null);
    setIsProcessingFile(true);

    try {
      const encoded = await convertFileToBase64(selected);
      setFileAttachment({
        file: selected,
        base64: encoded.fileData,
        fileName: encoded.fileName,
        fileType: encoded.fileType,
        sizeFormatted: (selected.size / (1024 * 1024)).toFixed(2) + ' MB',
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error reading selected file';
      setFileError(msg);
      setFileAttachment(null);
    } finally {
      setIsProcessingFile(false);
    }
  };

  const handleRemoveFile = () => {
    setFileAttachment(null);
    setFileError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const submissionPayload: FormSubmissionPayload = {
      name: fullName,
      email,
      category,
      comments: details,
      institution: institution || 'Not Specified',
      timeline,
      source: 'Website Quick Consultation Modal',
      timestamp: new Date().toISOString(),
      fileName: fileAttachment?.fileName,
      fileType: fileAttachment?.fileType,
      fileData: fileAttachment?.base64,
    };

    const dispatched = dispatchInquiry({
      fullName,
      email,
      institution,
      serviceCategory: category,
      timeline,
      message: details,
      source: 'Website Quick Consultation Modal',
    });
    setLinks(dispatched);

    // POST directly to Google Apps Script Web App
    const result = await submitToGoogleAppsScript(submissionPayload);
    setIsSubmitting(false);

    if (result.success) {
      setIsSubmitted(true);
      setSuccessMessage(result.message || 'Thank you! Your inquiry has been saved.');
      setIsSimulated(!!result.isSimulated);
      setSavedFileUrl(result.fileUrl || null);

      if (typeof window !== 'undefined' && 'gtag' in window && typeof (window as unknown as { gtag: Function }).gtag === 'function') {
        (window as unknown as { gtag: Function }).gtag('event', 'generate_lead', {
          event_category: 'Consultation',
          event_label: category,
          service_category: category,
          institution: institution || 'Not Specified',
        });
      }
    } else {
      setSubmitError(result.error || 'Failed to communicate with Google Apps Script endpoint.');
    }
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setSubmitError(null);
    setSuccessMessage('');
    setSavedFileUrl(null);
    setFullName('');
    setEmail('');
    setInstitution('');
    setDetails('');
    setFileAttachment(null);
    setFileError(null);
  };

  const handleCopy = () => {
    const payload = {
      fullName,
      email,
      institution,
      serviceCategory: category,
      timeline,
      message: details,
      source: 'Website Consultation Modal'
    };
    navigator.clipboard.writeText(buildInquirySummary(payload));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 sm:p-8 text-slate-100 overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Inline Error Alert */}
        {submitError && (
          <div className="mb-4 p-3.5 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-200 text-xs space-y-2">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-rose-300">Google Apps Script Submission Error</div>
                <div className="font-mono text-[11px] text-rose-200 break-all">{submitError}</div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-mono text-[11px] flex items-center gap-1.5 transition disabled:opacity-50"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Retry Submission</span>
            </button>
          </div>
        )}

        {isSubmitted ? (
          <div className="py-4 text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-white">Thank you! Inquiry Saved</h2>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                {successMessage || 'Your inquiry has been logged in Google Sheets and routed directly to the scientific leadership desk at M & M BioATLAS.'}
              </p>
            </div>

            {/* Saved File Url in Google Drive */}
            {savedFileUrl && (
              <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800 text-xs">
                <a
                  href={savedFileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-emerald-300 hover:underline font-semibold"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>View Attached File in Google Drive</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}

            {/* Recipient Verification Box */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-left space-y-2">
              <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                Delivered / Addressed to:
              </div>
              <ul className="text-xs font-mono text-slate-300 space-y-1">
                {INQUIRY_RECIPIENT_EMAILS.map((recipient) => (
                  <li key={recipient} className="flex items-center gap-2 text-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{recipient}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Multi-channel 1-Click Action Buttons */}
            <div className="space-y-2 pt-1">
              <div className="text-xs text-slate-400 font-medium">
                Ensure prompt delivery by clicking your preferred channel:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Web Gmail Button */}
                <a
                  href={links?.gmailUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold transition shadow-xs"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send via Gmail Web</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>

                {/* Default Mail App Button */}
                <a
                  href={links?.mailtoUrl}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition shadow-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>Open in Mail App</span>
                </a>

                {/* WhatsApp Button */}
                <a
                  href={links?.waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Lead Desk</span>
                </a>

                {/* Copy Button */}
                <button
                  onClick={handleCopy}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Summary'}</span>
                </button>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={handleResetForm}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition"
              >
                Submit Another Inquiry
              </button>
              <button
                onClick={() => {
                  handleResetForm();
                  onClose();
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition"
              >
                Close &amp; Return
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Google Sheets &amp; Drive Enabled</span>
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                Project Consultation &amp; Enrollment
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Tell us about your computational research goals, manuscript drafting requirements, or desired training cohort.
              </p>
            </div>

            {/* Service Category */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300">Service or Program Category:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
              >
                <option value="cro">Contract Research Organization (CRO) &amp; Molecular Simulations</option>
                <option value="writing">Academic &amp; Scientific Manuscript Writing / Thesis</option>
                <option value="statistics">Statistical &amp; Survey Data Analysis</option>
                <option value="training-1m">1-Month Training Program (Fundamentals)</option>
                <option value="training-3m">3-Month Project (Hands-on Guided Research)</option>
                <option value="training-6m">6-Month Project (End-to-end Ph.D./Publication Prep)</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">Full Name:</label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Dr. / Scholar Name"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">Email Address:</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="researcher@university.edu"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">Institution / University / Company:</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder="e.g. Stanford, Max Planck, Biotech"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">Expected Timeline:</label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
                >
                  <option>Urgent (&lt; 2 Weeks)</option>
                  <option>Standard (2-4 Weeks)</option>
                  <option>Extended (1-3 Months)</option>
                  <option>Next Academic Semester</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Research Scope / Project Overview:</label>
              <textarea
                rows={3}
                required
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Describe your receptor target, dataset volume, hypothesis, or training interests..."
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none resize-none"
              />
            </div>

            {/* Optional File Attachment (Converted to Base64 for Google Drive) */}
            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300 flex items-center justify-between">
                <span>Optional File Attachment (Saved to Google Drive):</span>
                <span className="text-[10px] text-slate-500">PDF, DOCX, PDB, CSV, FASTA (max 10MB)</span>
              </label>

              {!fileAttachment ? (
                <div className="relative border border-dashed border-slate-800 hover:border-cyan-500 rounded-xl p-3 bg-slate-950/60 hover:bg-slate-950 transition text-center cursor-pointer">
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    disabled={isProcessingFile}
                    accept=".pdf,.doc,.docx,.pdb,.sdf,.fasta,.fa,.csv,.tsv,.txt,.png,.jpg,.jpeg"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex items-center justify-center gap-2 pointer-events-none text-xs text-slate-400">
                    {isProcessingFile ? (
                      <>
                        <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                        <span>Encoding file for Google Drive...</span>
                      </>
                    ) : (
                      <>
                        <UploadCloud className="w-4 h-4 text-cyan-400" />
                        <span>Attach Protocol, Structure (PDB), or Notes</span>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-2.5 rounded-xl bg-slate-950 border border-cyan-500/40 flex items-center justify-between text-xs animate-fadeIn">
                  <div className="flex items-center gap-2 truncate">
                    <FileText className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="truncate text-slate-200">{fileAttachment.fileName}</span>
                    <span className="text-[10px] text-slate-500 font-mono shrink-0">({fileAttachment.sizeFormatted})</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="p-1 text-slate-400 hover:text-rose-400 transition shrink-0"
                    title="Remove file"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                </div>
              )}

              {fileError && (
                <div className="text-[11px] text-rose-400 font-mono px-1">
                  {fileError}
                </div>
              )}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-800">
              <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono font-medium">
                <a
                  href={`tel:${LEADERSHIP_CONTACT.phoneRaw}`}
                  className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition"
                >
                  <PhoneCall className="w-3.5 h-3.5 shrink-0" />
                  <span>{LEADERSHIP_CONTACT.phoneDisplay}</span>
                </a>
                <span className="text-slate-600 hidden sm:inline">•</span>
                <a
                  href={`mailto:${LEADERSHIP_CONTACT.email}`}
                  className="flex items-center gap-1.5 text-sky-400 hover:text-sky-300 transition text-[11px]"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  <span>{LEADERSHIP_CONTACT.email}</span>
                </a>
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || isProcessingFile}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Submitting to Google...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Research Inquiry</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
