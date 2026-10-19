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
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  Building2, 
  MessageSquare, 
  Calendar,
  Sparkles,
  Globe,
  Linkedin,
  GraduationCap,
  Github,
  ExternalLink,
  PhoneCall,
  UserCheck,
  Award,
  Copy,
  Check,
  UploadCloud,
  FileText,
  XCircle,
  Star,
  AlertTriangle,
  Loader2,
  RotateCcw
} from 'lucide-react';
import { AtlasView } from '../types';
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

interface ContactPageProps {
  onSelectView?: (view: AtlasView) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onSelectView,
}) => {
  const [formMode, setFormMode] = useState<'inquiry' | 'feedback'>('inquiry');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [institution, setInstitution] = useState('');
  const [serviceCategory, setServiceCategory] = useState('cro');
  const [feedbackCategory, setFeedbackCategory] = useState('Platform Usability & Workflows');
  const [rating, setRating] = useState<number>(5);
  const [timezone, setTimezone] = useState('EST');
  const [fundingType, setFundingType] = useState('grant');
  const [urgency, setUrgency] = useState('standard');
  const [needsNda, setNeedsNda] = useState(true);
  const [message, setMessage] = useState('');

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

  // Submission UX States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [savedFileUrl, setSavedFileUrl] = useState<string | null>(null);
  const [isSimulated, setIsSimulated] = useState(false);

  const [copied, setCopied] = useState(false);
  const [links, setLinks] = useState<{ mailtoUrl: string; gmailUrl: string; waUrl: string } | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

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

  const faqs = [
    {
      q: 'How does M & M BioATLAS handle intellectual property and confidentiality?',
      a: 'A legally binding mutual Non-Disclosure Agreement (NDA) is executed prior to receiving any proprietary data, sequences, or molecules. All computational findings, trajectory coordinates, scripts, and resulting intellectual property (IP) belong 100% to the client.',
    },
    {
      q: 'What is the typical turnaround time for a molecular docking or MD simulation project?',
      a: 'Virtual screening of up to 100,000 compounds typically concludes within 10 to 14 business days. Standard 100ns to 300ns atomistic molecular dynamics simulations in explicit solvent, including trajectory QC and MM-PBSA calculations, require 2 to 3 weeks on dedicated HPC GPU clusters.',
    },
    {
      q: 'Do you provide revisions if a journal peer-reviewer requests additional computational analyses?',
      a: 'Yes. For all academic manuscript support and CRO projects targeting peer-reviewed publications, post-submission revision support is provided. Point-by-point reviewer rebuttal matrices and supplementary simulations are supported.',
    },
    {
      q: 'Can university departments or colleges establish formal MoUs for student training and faculty development?',
      a: 'Yes. Formal Institutional Memorandums of Understanding (MoUs) are actively supported with colleges and universities for collaborative postgraduate thesis guidance, Faculty Development Programs (FDPs), and curriculum enhancement.',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const isFeedback = formMode === 'feedback';
    const payloadCategory = isFeedback ? `Feedback: ${feedbackCategory}` : serviceCategory;
    const timeline = urgency === 'immediate' ? 'Immediate Priority (< 10 Days)' : urgency === 'expedited' ? 'Expedited (2-3 Weeks)' : 'Standard (4-6 Weeks)';

    const submissionPayload: FormSubmissionPayload = {
      name: fullName,
      email,
      category: payloadCategory,
      rating: isFeedback ? rating : undefined,
      comments: message,
      institution: institution || (isFeedback ? 'Independent Researcher' : 'Not Specified'),
      urgency,
      timeline,
      fundingType,
      needsNda: isFeedback ? false : needsNda,
      source: isFeedback ? 'Website User Feedback & Review' : 'Contact & Project Scoping Form',
      timestamp: new Date().toISOString(),
      fileName: fileAttachment?.fileName,
      fileType: fileAttachment?.fileType,
      fileData: fileAttachment?.base64,
    };

    // Prepare multi-channel direct dispatch backup
    const dispatched = dispatchInquiry({
      fullName,
      email,
      institution,
      serviceCategory: payloadCategory,
      timeline,
      fundingType,
      urgency,
      needsNda,
      message,
      source: submissionPayload.source,
    });
    setLinks(dispatched);

    // Stream directly to Google Apps Script Web App (POST text/plain)
    const result = await submitToGoogleAppsScript(submissionPayload);
    setIsSubmitting(false);

    if (result.success) {
      setSubmitSuccess(true);
      setSuccessMessage(result.message || 'Thank you! Your feedback has been saved.');
      setIsSimulated(!!result.isSimulated);
      setSavedFileUrl(result.fileUrl || null);

      if (typeof window !== 'undefined' && 'gtag' in window && typeof (window as unknown as { gtag: Function }).gtag === 'function') {
        (window as unknown as { gtag: Function }).gtag('event', isFeedback ? 'feedback_submission' : 'generate_lead', {
          event_category: isFeedback ? 'Feedback' : 'ContactForm',
          event_label: payloadCategory,
          service_category: payloadCategory,
          rating: isFeedback ? rating : undefined,
          institution: institution || 'Not Specified',
        });
      }
    } else {
      setSubmitError(result.error || 'Failed to communicate with Google Apps Script endpoint.');
    }
  };

  const handleResetForm = () => {
    setSubmitSuccess(false);
    setSubmitError(null);
    setSuccessMessage('');
    setSavedFileUrl(null);
    setFullName('');
    setEmail('');
    setInstitution('');
    setMessage('');
    setFileAttachment(null);
    setFileError(null);
    setRating(5);
  };

  const handleCopy = () => {
    const isFeedback = formMode === 'feedback';
    const payload = {
      fullName,
      email,
      institution,
      serviceCategory: isFeedback ? `Feedback: ${feedbackCategory}` : serviceCategory,
      timeline: urgency === 'immediate' ? 'Immediate Priority (< 10 Days)' : urgency === 'expedited' ? 'Expedited (2-3 Weeks)' : 'Standard (4-6 Weeks)',
      fundingType,
      urgency,
      needsNda: isFeedback ? false : needsNda,
      message,
      source: isFeedback ? 'Website User Feedback & Review' : 'Contact & Project Scoping Form'
    };
    navigator.clipboard.writeText(buildInquirySummary(payload));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Hero Header */}
      <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#071d33] via-[#0b2b4f] to-[#071d33] border border-blue-900/40 text-white shadow-lg relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-sky-300 text-xs font-semibold">
            <MessageSquare className="w-3.5 h-3.5 text-sky-400" />
            <span>Direct Scientific Consultation</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight font-sans">
            Contact &amp;{' '}
            <span className="bg-gradient-to-r from-sky-300 via-cyan-200 to-teal-300 bg-clip-text text-transparent">
              Project Scoping
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Connect directly with scientific team members to evaluate computational requirements, receive formal budget proposals, establish institutional MoUs, or discuss training cohort enrollments. Initial scoping reviews are returned within 24 business hours.
          </p>
        </div>

        {/* Ambient Decorative Accents */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-radial from-sky-400 to-transparent pointer-events-none" />
      </section>

      {/* Executive Leadership & Director Direct Contact Card */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#071d33] via-[#0b2847] to-[#0a233e] text-white border border-blue-900/80 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
            <div className="relative shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-blue-600 via-sky-500 to-teal-400 p-0.5 shadow-md">
                <div className="w-full h-full rounded-2xl bg-[#071d33] flex items-center justify-center text-cyan-300">
                  <UserCheck className="w-9 h-9" />
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full bg-emerald-500 text-[10px] font-bold text-white shadow-xs">
                Direct
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-blue-500/20 text-sky-300 text-[11px] font-mono font-semibold border border-blue-400/30">
                  {LEADERSHIP_CONTACT.designation}
                </span>
                <span className="text-slate-400 text-xs hidden sm:inline">•</span>
                <span className="text-xs text-slate-300 font-sans">{LEADERSHIP_CONTACT.affiliation}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <span>{LEADERSHIP_CONTACT.name}</span>
                <span className="text-sm sm:text-base font-medium text-cyan-300 font-mono">
                  {LEADERSHIP_CONTACT.credentials}
                </span>
              </h2>

              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                {LEADERSHIP_CONTACT.bio}
              </p>
            </div>
          </div>

          {/* Direct Communication Buttons */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0 pt-2 lg:pt-0">
            <a
              href={`tel:${LEADERSHIP_CONTACT.phoneRaw}`}
              className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition shadow-md shadow-emerald-500/20 active:scale-95 group"
            >
              <PhoneCall className="w-4 h-4 text-slate-950 group-hover:scale-110 transition-transform" />
              <div className="text-left leading-tight">
                <div className="text-[10px] uppercase font-mono tracking-wider opacity-80">Direct Call</div>
                <div className="font-extrabold">{LEADERSHIP_CONTACT.phoneDisplay}</div>
              </div>
            </a>

            <a
              href={LEADERSHIP_CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition backdrop-blur-xs"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp</span>
            </a>

            <a
              href={`mailto:${LEADERSHIP_CONTACT.mailtoRecipients}?subject=Research%20Inquiry%20to%20Dr.%20Manne%20Munikumar`}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition backdrop-blur-xs"
              title={`Official Email: ${LEADERSHIP_CONTACT.email}`}
            >
              <Mail className="w-4 h-4 text-sky-400 shrink-0" />
              <span className="hidden sm:inline font-mono">{LEADERSHIP_CONTACT.email}</span>
              <span className="sm:hidden">Email Director</span>
            </a>
          </div>
        </div>
      </section>

      {/* Primary Contact Channels Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Direct Phone Contact */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2 hover:border-emerald-300 transition">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Phone className="w-5 h-5" />
          </div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Director &amp; Research Line</div>
          <a
            href={`tel:${LEADERSHIP_CONTACT.phoneRaw}`}
            className="text-sm font-bold text-slate-900 hover:text-emerald-700 transition block"
          >
            {LEADERSHIP_CONTACT.phoneDisplay}
          </a>
          <p className="text-[11px] text-slate-500">Dr. Manne Munikumar MSc., PhD • Available {LEADERSHIP_CONTACT.operatingHours}</p>
        </div>

        {/* Card 2: Official BioATLAS Email */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2 hover:border-blue-300 transition">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0b3b70] flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Official BioATLAS Email</div>
          <a
            href={`mailto:${LEADERSHIP_CONTACT.mailtoRecipients}?subject=BioATLAS%20Research%20Collaboration`}
            className="text-sm font-bold text-[#0b3b70] hover:text-blue-700 transition break-all block font-mono"
          >
            {LEADERSHIP_CONTACT.email}
          </a>
          <p className="text-[11px] text-slate-500">Official institutional desk &amp; CRO inquiries</p>
        </div>

        {/* Card 3: Academic & Training Desk */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2 hover:border-teal-300 transition">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
            <Building2 className="w-5 h-5" />
          </div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Academic &amp; Training Desk</div>
          <a
            href={`mailto:${LEADERSHIP_CONTACT.mailtoRecipients}?subject=Scientific%20Collaboration%20%26%20Training%20Inquiry`}
            className="text-sm font-bold text-slate-900 hover:text-teal-700 transition break-all block font-mono"
          >
            {LEADERSHIP_CONTACT.email}
          </a>
          <p className="text-[11px] text-slate-500">University partnerships, internships &amp; MoUs</p>
        </div>

        {/* Card 4: Response Window & NDA */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2 hover:border-purple-300 transition">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Mutual NDA &amp; Fast Response</div>
          <div className="text-sm font-bold text-slate-900">&lt; 24h SLA Guarantee</div>
          <p className="text-[11px] text-slate-500">Rigorous academic confidentiality and rapid review</p>
        </div>
      </section>

      {/* Main Form and Location Layout */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {formMode === 'inquiry' ? 'Submit a Research Scoping Inquiry' : 'Scientific Feedback & User Review'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {formMode === 'inquiry'
                  ? 'Provide project details below to stream directly into our Google Sheets and Drive workflow.'
                  : 'Share your feedback, report observations, or review scientific deliverables directly into our records.'}
              </p>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 border border-slate-200 shrink-0 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setFormMode('inquiry')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  formMode === 'inquiry'
                    ? 'bg-white text-[#0b3b70] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Project Scope
              </button>
              <button
                type="button"
                onClick={() => setFormMode('feedback')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  formMode === 'feedback'
                    ? 'bg-white text-[#0b3b70] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                User Feedback
              </button>
            </div>
          </div>

          {/* Inline Error Alert with Retry Button */}
          {submitError && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 space-y-2.5 animate-fadeIn">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-rose-700">
                    Google Apps Script Dispatch Error
                  </div>
                  <div className="text-xs text-rose-800 leading-relaxed font-mono break-all">
                    {submitError}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold flex items-center gap-1.5 transition shadow-xs disabled:opacity-50"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retry Submission</span>
                </button>

                <a
                  href={links?.gmailUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white hover:bg-rose-100 text-rose-700 text-xs font-medium border border-rose-200 transition"
                >
                  Send via Gmail Instead
                </a>
              </div>
            </div>
          )}

          {submitSuccess ? (
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 text-white space-y-5 animate-fadeIn">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {formMode === 'feedback' ? 'Thank you! Your feedback has been saved.' : 'Inquiry Successfully Saved & Recorded!'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  {successMessage || 'Your record has been logged in Google Sheets and routed to the research leadership team.'}
                </p>
              </div>

              {/* Uploaded File Link if Available */}
              {savedFileUrl && (
                <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800/80 text-center">
                  <a
                    href={savedFileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-300 hover:text-emerald-200 underline transition"
                  >
                    <FileText className="w-4 h-4" />
                    <span>View Uploaded File Attachment in Google Drive</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              {/* Sandbox notice if simulated */}
              {isSimulated && (
                <div className="p-3 rounded-xl bg-blue-950/60 border border-blue-800/60 text-xs text-blue-200 space-y-1">
                  <div className="font-semibold text-cyan-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Google Apps Script Endpoint Notice</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Your test entry was logged in local development storage. To stream directly to live Google Sheets and Drive, deploy the provided <code className="text-cyan-200 bg-black/40 px-1 py-0.5 rounded">Code.gs</code> Web App and update <code className="text-cyan-200 bg-black/40 px-1 py-0.5 rounded">SCRIPT_URL</code>.
                  </p>
                </div>
              )}

              {/* Recipient Verification List */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-left space-y-2">
                <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                  Addressed To Leadership Team:
                </div>
                <ul className="text-xs font-mono text-slate-300 space-y-1.5" data-recipients={INQUIRY_RECIPIENT_EMAILS.join(',')}>
                  <li className="flex items-center gap-2 text-slate-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                    <span>{LEADERSHIP_CONTACT.email}</span>
                  </li>
                </ul>
              </div>

              {/* Multi-Channel Delivery Buttons */}
              <div className="space-y-2.5 pt-1">
                <div className="text-xs text-slate-300 font-medium text-center">
                  To ensure instant confirmation, you may also open via direct channels:
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
                    <span>Send via Web Gmail</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>

                  {/* Default Mail App Button */}
                  <a
                    href={links?.mailtoUrl}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition shadow-xs"
                  >
                    <Send className="w-4 h-4" />
                    <span>Open in Email App</span>
                  </a>

                  {/* WhatsApp Direct */}
                  <a
                    href={links?.waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition shadow-xs"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send via WhatsApp (+91 9492373997)</span>
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

              <div className="pt-2 text-center">
                <button
                  onClick={handleResetForm}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono font-medium transition"
                >
                  Submit Another Response
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Full Name &amp; Academic Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Priya Sharma / Research Scholar"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@university.edu or company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    University / Organization / Company {formMode === 'inquiry' ? '*' : '(Optional)'}
                  </label>
                  <input
                    type="text"
                    required={formMode === 'inquiry'}
                    placeholder="e.g. BioPharma Labs / Central University"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    {formMode === 'inquiry' ? 'Primary Service Focus *' : 'Feedback Category *'}
                  </label>
                  {formMode === 'inquiry' ? (
                    <select
                      value={serviceCategory}
                      onChange={(e) => setServiceCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                    >
                      <option value="cro">In Silico Drug Discovery &amp; Molecular Dynamics (CRO)</option>
                      <option value="genomics">Next-Generation Sequencing &amp; RNA-Seq Pipelines</option>
                      <option value="writing">Academic Writing, Thesis &amp; Q1 Manuscripts</option>
                      <option value="statistics">Biostatistics, Sample Size &amp; Trial Modeling</option>
                      <option value="training">Training Program / Fellowship Enrollment</option>
                      <option value="mou">Institutional MoU / University Grant Partnership</option>
                    </select>
                  ) : (
                    <select
                      value={feedbackCategory}
                      onChange={(e) => setFeedbackCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                    >
                      <option value="Platform Usability & Workflows">Platform Usability &amp; Visual Experience</option>
                      <option value="CRO & Molecular Simulations">Molecular Dynamics (GROMACS) &amp; Docking</option>
                      <option value="NGS RNA-Seq Pipeline Quality">NGS &amp; RNA-Seq Pipeline Performance</option>
                      <option value="Academic Writing & Peer-Review">Academic Manuscript &amp; Thesis Support</option>
                      <option value="Bioinformatics Training Experience">Training Cohort &amp; Mentorship Quality</option>
                      <option value="Data Security & Integrity">Data Privacy &amp; GLP Compliance</option>
                      <option value="General Suggestion / Request">Feature Request &amp; General Suggestion</option>
                    </select>
                  )}
                </div>
              </div>

              {/* Star Rating Widget (For Feedback Mode) */}
              {formMode === 'feedback' && (
                <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                      <span>Experience Rating (Recorded in Google Sheets Column E)</span>
                    </label>
                    <span className="text-xs font-semibold text-amber-800">
                      {rating} / 5 Stars
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((starValue) => (
                      <button
                        type="button"
                        key={starValue}
                        onClick={() => setRating(starValue)}
                        className="p-1 hover:scale-110 transition-transform focus:outline-hidden"
                        title={`${starValue} Stars`}
                      >
                        <Star
                          className={`w-6 h-6 transition-colors ${
                            starValue <= rating
                              ? 'text-amber-500 fill-amber-400'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs text-amber-700 ml-2 font-medium">
                      {rating === 5 && 'Outstanding Excellence'}
                      {rating === 4 && 'Very Good Performance'}
                      {rating === 3 && 'Satisfactory Experience'}
                      {rating === 2 && 'Needs Improvement'}
                      {rating === 1 && 'Substantial Rework Needed'}
                    </span>
                  </div>
                </div>
              )}

              {/* Additional In-depth Project Parameters (for Inquiry Mode) */}
              {formMode === 'inquiry' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-blue-600" />
                        <span>Preferred Consultation Timezone</span>
                      </label>
                      <select
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 font-medium"
                      >
                        <option value="EST">North America East (EST / UTC-5)</option>
                        <option value="PST">North America West (PST / UTC-8)</option>
                        <option value="GMT">UK / Ireland (GMT/BST / UTC+0/+1)</option>
                        <option value="CET">Central Europe (CET / UTC+1)</option>
                        <option value="IST">India Standard Time (IST / UTC+5:30)</option>
                        <option value="SGT">Singapore / East Asia (SGT / UTC+8)</option>
                        <option value="AEST">Australia (AEST / UTC+10)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">
                        Procurement / Funding Vehicle
                      </label>
                      <select
                        value={fundingType}
                        onChange={(e) => setFundingType(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                      >
                        <option value="grant">University / Institute Grant (NIH, Horizon, DBT, DST)</option>
                        <option value="po">Institutional Purchase Order (PO / Wire in USD, EUR, GBP)</option>
                        <option value="corporate">Biotech Startup / Corporate R&amp;D Invoicing</option>
                        <option value="fellowship">Individual Fellowship / Thesis Self-Funded</option>
                        <option value="los">Request Grant Co-PI / Letter of Support (LOS)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">
                        Desired Delivery Timeline
                      </label>
                      <select
                        value={urgency}
                        onChange={(e) => setUrgency(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                      >
                        <option value="urgent">Urgent (&lt; 2 Weeks)</option>
                        <option value="standard">Standard (2 - 4 Weeks)</option>
                        <option value="flexible">Flexible / Ongoing Semester Cohort</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 self-end">
                      <input
                        type="checkbox"
                        id="nda-checkbox"
                        checked={needsNda}
                        onChange={(e) => setNeedsNda(e.target.checked)}
                        className="w-4 h-4 rounded text-[#0b3b70] focus:ring-blue-500"
                      />
                      <label htmlFor="nda-checkbox" className="text-xs text-slate-700 select-none cursor-pointer">
                        <span className="font-semibold text-slate-900">Execute mutual NDA</span> prior to project data transfer
                      </label>
                    </div>
                  </div>
                </>
              )}

              {/* Message / Comments field */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  {formMode === 'inquiry'
                    ? 'Project Outline / Objectives / Software Requirements *'
                    : 'Detailed Feedback / Scientific Notes / Observations *'}
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder={
                    formMode === 'inquiry'
                      ? 'Describe biological targets, compound counts, sequencing depth, thesis deadlines, or specific simulation requirements...'
                      : 'Provide your feedback on bioinformatics accuracy, platform visualization speed, or suggestions for upcoming features...'
                  }
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 resize-none"
                />
              </div>

              {/* Optional File Attachment (Converted to Base64 via FileReader for Google Drive) */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                  <span>Optional File Attachment (Saved to Google Drive)</span>
                  <span className="text-[10px] text-slate-400">PDF, DOCX, PDB, FASTA, CSV, PNG (max 10MB)</span>
                </label>

                {!fileAttachment ? (
                  <div className="relative border border-dashed border-slate-300 hover:border-blue-400 rounded-2xl p-4 bg-slate-50/70 hover:bg-blue-50/30 transition text-center group cursor-pointer">
                    <input
                      type="file"
                      id="file-upload-input"
                      onChange={handleFileUpload}
                      disabled={isProcessingFile}
                      accept=".pdf,.doc,.docx,.pdb,.sdf,.fasta,.fa,.csv,.tsv,.txt,.png,.jpg,.jpeg"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center justify-center space-y-1.5 pointer-events-none">
                      {isProcessingFile ? (
                        <>
                          <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                          <div className="text-xs font-medium text-slate-600">Encoding file to Base64...</div>
                        </>
                      ) : (
                        <>
                          <UploadCloud className="w-6 h-6 text-slate-400 group-hover:text-blue-600 transition-colors" />
                          <div className="text-xs font-medium text-slate-700">
                            Click or drag file to attach for Google Drive
                          </div>
                          <div className="text-[10px] text-slate-500">
                            PDB coordinates, project scoping doc, thesis draft, or screenshot
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs animate-fadeIn">
                    <div className="flex items-center gap-2.5 truncate">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <div className="font-bold text-slate-900 truncate">{fileAttachment.fileName}</div>
                        <div className="text-[10px] text-emerald-700 font-mono">
                          {fileAttachment.sizeFormatted} • Encoded for Google Drive
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="p-1 rounded-md text-slate-400 hover:text-rose-600 transition shrink-0"
                      title="Remove Attachment"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {fileError && (
                  <div className="text-[11px] text-rose-600 font-medium px-1">
                    {fileError}
                  </div>
                )}
              </div>

              {/* Submit Button & Visual State */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || isProcessingFile}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#0b3b70] hover:bg-[#082e59] text-white font-bold text-xs sm:text-sm transition shadow-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed active:scale-95"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-sky-300" />
                      <span>Submitting to Google Account...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>
                        {formMode === 'feedback' ? 'Submit Feedback & Record' : 'Transmit Scoping Inquiry'}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right Info & FAQ (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Institutional Office & Infrastructure Card */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0b3b70]">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>Bioinformatics Operations Center</span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              M &amp; M BioATLAS Innovation Hub
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed">
              Computational biophysics facilities, server clusters, and training lecture wings are operated in accordance with ISO 27001 data governance and GLP computational laboratory guidelines.
            </p>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-2 text-xs text-slate-700">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                <span className="font-semibold text-slate-900">Head of Research:</span>
                <span className="text-[#0b3b70] font-bold">Dr. Manne Munikumar, MSc., PhD</span>
              </div>
              <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                <span className="font-semibold text-slate-900">Direct Phone:</span>
                <a 
                  href={`tel:${LEADERSHIP_CONTACT.phoneRaw}`} 
                  className="text-emerald-700 font-bold hover:underline"
                >
                  {LEADERSHIP_CONTACT.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                <span className="font-semibold text-slate-900">Official Email:</span>
                <a 
                  href={`mailto:${LEADERSHIP_CONTACT.mailtoRecipients}`} 
                  className="text-blue-700 font-bold hover:underline font-mono text-[11px]"
                >
                  {LEADERSHIP_CONTACT.email}
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">Consultation Hours:</span>
                <span className="text-slate-600">Mon - Sat (09:00 - 18:00 IST)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">HPC Cluster Operations:</span>
                <span className="text-emerald-700 font-medium">24/7 Continuous Execution</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">Virtual Video Strategy:</span>
                <span className="text-blue-700 font-medium">Google Meet / Zoom</span>
              </div>
            </div>
          </div>

          {/* Official Scientific Social Media Channels Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0b2847] to-[#071d33] text-white border border-blue-900 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold">
                Direct Social Networks
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <h4 className="text-base font-bold text-white">
              Connect with Research Teams
            </h4>

            <p className="text-xs text-slate-300 leading-relaxed">
              Follow official channels for computational protocol releases, symposium invites, and direct messaging with bioinformatics investigators.
            </p>

            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <a
                href="https://www.linkedin.com/company/mmbioatlas/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/10 hover:bg-[#0077b5] border border-white/10 transition group"
                title="LinkedIn – M & M BioATLAS"
              >
                <Linkedin className="w-4 h-4 text-sky-300 group-hover:text-white shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold text-white">LinkedIn</div>
                  <div className="text-[10px] text-slate-300">Official Desk</div>
                </div>
              </a>

              <a
                href="https://scholar.google.com/citations?user=_Fejj7YAAAAJ&hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/10 hover:bg-sky-600 border border-white/10 transition group"
                title="Google Scholar – Dr. Manne Munikumar Citations"
              >
                <GraduationCap className="w-4 h-4 text-sky-400 group-hover:text-white shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold text-white">Google Scholar</div>
                  <div className="text-[10px] text-slate-300">Citations &amp; Papers</div>
                </div>
              </a>

              <a
                href="https://www.researchgate.net/profile/Manne-Munikumar?ev=hdr_xprf&_tp=eyJjb250ZXh0Ijp7ImZpcnN0UGFnZSI6ImhvbWUiLCJwYWdlIjoiaG9tZSIsInBvc2l0aW9uIjoiZ2xvYmFsSGVhZGVyIn19"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/10 hover:bg-emerald-600 border border-white/10 transition group"
                title="ResearchGate – Dr. Manne Munikumar Profile"
              >
                <span className="w-4 h-4 rounded bg-emerald-500 text-white text-[9px] flex items-center justify-center font-mono font-bold shrink-0 group-hover:bg-white group-hover:text-emerald-700 transition">RG</span>
                <div className="text-left">
                  <div className="text-xs font-bold text-white">ResearchGate</div>
                  <div className="text-[10px] text-slate-300">Scientific Profile</div>
                </div>
              </a>

              <a
                href="https://github.com/mannemunikumar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/10 hover:bg-slate-800 border border-white/10 transition group"
                title="GitHub – Dr. Manne Munikumar Pipelines & Repositories"
              >
                <Github className="w-4 h-4 text-slate-300 group-hover:text-white shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold text-white">GitHub</div>
                  <div className="text-[10px] text-slate-300">Repositories</div>
                </div>
              </a>
            </div>
          </div>

          {/* Quick FAQ Accordions */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              <span>Frequently Asked Questions</span>
            </div>

            <div className="space-y-2.5">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200 overflow-hidden transition"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full text-left p-3.5 bg-slate-50 hover:bg-slate-100/70 transition flex items-center justify-between gap-3 text-xs font-bold text-slate-900 select-none"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="p-3.5 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
