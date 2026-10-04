/**
 * Inquiry Email & Communication Dispatch Utility
 * Ensures inquiries are delivered directly to the leadership team:
 * - mmbioatlas@gmail.com
 * - mannemunidivya@gmail.com
 * - research@mmbioatlas.org
 */

export const INQUIRY_RECIPIENT_EMAILS = [
  'mmbioatlas@gmail.com',
  'mannemunidivya@gmail.com',
  'research@mmbioatlas.org'
];

export const INQUIRY_WHATSAPP_PHONE = '919492373997';

export interface InquiryPayload {
  fullName: string;
  email: string;
  institution?: string;
  serviceCategory?: string;
  timeline?: string;
  fundingType?: string;
  urgency?: string;
  needsNda?: boolean;
  message?: string;
  source?: string;
}

export function buildInquirySummary(data: InquiryPayload): string {
  const parts = [
    `M & M BioATLAS - Scientific Project Inquiry`,
    `------------------------------------------`,
    `Full Name: ${data.fullName || 'Not specified'}`,
    `Email: ${data.email || 'Not specified'}`,
  ];

  if (data.institution) parts.push(`Institution / Company: ${data.institution}`);
  if (data.serviceCategory) parts.push(`Category / Division: ${data.serviceCategory}`);
  if (data.timeline) parts.push(`Target Timeline: ${data.timeline}`);
  if (data.urgency) parts.push(`Urgency Level: ${data.urgency}`);
  if (data.fundingType) parts.push(`Funding Source: ${data.fundingType}`);
  if (data.needsNda !== undefined) parts.push(`Mutual NDA Required: ${data.needsNda ? 'Yes' : 'No'}`);
  if (data.source) parts.push(`Inquiry Origin: ${data.source}`);

  parts.push(``);
  parts.push(`Project Scope / Details:`);
  parts.push(data.message || '(No detailed notes provided)');
  parts.push(``);
  parts.push(`Timestamp: ${new Date().toLocaleString()}`);

  return parts.join('\n');
}

export function getMailtoUrl(data: InquiryPayload): string {
  const recipients = INQUIRY_RECIPIENT_EMAILS.join(',');
  const subject = `[BioATLAS Inquiry] ${data.serviceCategory || 'Project Consultation'} - ${data.fullName || 'Researcher'}`;
  const body = buildInquirySummary(data);

  return `mailto:${recipients}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function getGmailWebComposeUrl(data: InquiryPayload): string {
  const to = encodeURIComponent(INQUIRY_RECIPIENT_EMAILS.join(','));
  const su = encodeURIComponent(`[BioATLAS Inquiry] ${data.serviceCategory || 'Project Consultation'} - ${data.fullName || 'Researcher'}`);
  const body = encodeURIComponent(buildInquirySummary(data));

  return `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${su}&body=${body}`;
}

export function getWhatsAppUrl(data: InquiryPayload): string {
  const text = encodeURIComponent(
    `*M & M BioATLAS Inquiry*\n` +
    `*Name:* ${data.fullName}\n` +
    `*Email:* ${data.email}\n` +
    `*Category:* ${data.serviceCategory || 'Consultation'}\n` +
    `*Institution:* ${data.institution || 'N/A'}\n` +
    `*Scope:* ${data.message || 'Interested in scientific project collaboration'}`
  );

  return `https://wa.me/${INQUIRY_WHATSAPP_PHONE}?text=${text}`;
}

export function saveInquiryLocally(data: InquiryPayload): void {
  try {
    const existing = JSON.parse(localStorage.getItem('bioatlas_inquiries') || '[]');
    const record = {
      id: `inq_${Date.now()}`,
      timestamp: new Date().toISOString(),
      recipients: INQUIRY_RECIPIENT_EMAILS,
      ...data
    };
    existing.unshift(record);
    localStorage.setItem('bioatlas_inquiries', JSON.stringify(existing.slice(0, 50)));
  } catch {
    // Local storage fallback
  }
}

export function dispatchInquiry(data: InquiryPayload): { mailtoUrl: string; gmailUrl: string; waUrl: string } {
  saveInquiryLocally(data);
  const mailtoUrl = getMailtoUrl(data);
  const gmailUrl = getGmailWebComposeUrl(data);
  const waUrl = getWhatsAppUrl(data);

  // Trigger mailto protocol
  try {
    const link = document.createElement('a');
    link.href = mailtoUrl;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
    }, 100);
  } catch {
    // browser blocked automatic mailto link click
  }

  return { mailtoUrl, gmailUrl, waUrl };
}
