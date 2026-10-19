import React from 'react';
import { Logo } from './Logo';
import { AtlasView } from '../types';
import { 
  ShieldCheck, 
  PhoneCall, 
  Mail,
  Linkedin,
  GraduationCap,
  Github
} from 'lucide-react';
import { LEADERSHIP_CONTACT } from '../data/organizationData';

interface FooterProps {
  onSelectView: (view: AtlasView) => void;
  onOpenBrandKit: () => void;
  onOpenConsultation?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectView, onOpenBrandKit, onOpenConsultation }) => {
  return (
    <footer className="w-full border-t border-slate-200 bg-[#071d33] mt-20 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-10">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Logo size="md" variant="full" theme="dark" />
            <p className="text-xs text-slate-300 leading-relaxed font-normal max-w-sm">
              M &amp; M BioATLAS bridges computational biology with impactful scientific discovery. The institution provides end-to-end research support—from atomistic molecular dynamics to Q1 academic publishing—while training the next generation of computational life scientists through hands-on project cohorts.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => onSelectView('about')}
                className="text-xs text-sky-300 hover:text-white flex items-center gap-1.5 transition font-medium"
              >
                <span>Mission &amp; Activities</span>
              </button>
              <span className="text-slate-500">•</span>
              <button
                onClick={() => onSelectView('contact')}
                className="text-xs text-sky-300 hover:text-white flex items-center gap-1.5 transition font-medium"
              >
                <span>Contact Us</span>
              </button>
              <span className="text-slate-500">•</span>
              <a
                href="https://www.linkedin.com/company/mmbioatlas/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#0077b5] hover:text-sky-300 flex items-center gap-1 transition font-medium"
                title="Follow M & M BioATLAS on LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
              <span className="text-slate-500">•</span>
              <a
                href="https://scholar.google.com/citations?user=_Fejj7YAAAAJ&hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-sky-400 hover:text-white flex items-center gap-1 transition font-medium"
                title="Google Scholar – Dr. Manne Munikumar Citations"
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Scholar</span>
              </a>
              <span className="text-slate-500">•</span>
              <a
                href="https://www.researchgate.net/profile/Manne-Munikumar?ev=hdr_xprf&_tp=eyJjb250ZXh0Ijp7ImZpcnN0UGFnZSI6ImhvbWUiLCJwYWdlIjoiaG9tZSIsInBvc2l0aW9uIjoiZ2xvYmFsSGVhZGVyIn19"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-emerald-400 hover:text-white flex items-center gap-1 transition font-medium font-mono"
                title="ResearchGate – Dr. Manne Munikumar Scientific Profile"
              >
                <span className="w-3.5 h-3.5 rounded bg-emerald-600 text-white text-[9px] flex items-center justify-center font-bold">RG</span>
                <span>ResearchGate</span>
              </a>
              <span className="text-slate-500">•</span>
              <a
                href="https://github.com/mannemunikumar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-300 hover:text-white flex items-center gap-1 transition font-medium"
                title="GitHub – Dr. Manne Munikumar Repositories"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          {/* Core Pages & Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-white font-bold mb-3 font-sans">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectView('overview')}
                  className="hover:text-sky-300 transition text-left"
                >
                  Home &amp; Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectView('services')}
                  className="hover:text-sky-300 transition text-left"
                >
                  Services Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectView('research')}
                  className="hover:text-sky-300 transition text-left"
                >
                  Publications &amp; Grants
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectView('rd')}
                  className="hover:text-sky-300 transition text-left"
                >
                  R&amp;D Division
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectView('projects')}
                  className="hover:text-sky-300 transition text-left"
                >
                  Projects &amp; Case Studies
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectView('training')}
                  className="hover:text-sky-300 transition text-left"
                >
                  Training &amp; Fellowships
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectView('contact')}
                  className="hover:text-sky-300 transition text-left text-sky-300 font-semibold"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectView('contact')}
                  className="hover:text-sky-300 transition text-left text-cyan-300"
                >
                  User Feedback &amp; Reviews
                </button>
              </li>
            </ul>
          </div>

          {/* CRO & Computing Services */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-white font-bold mb-3 font-sans">
              Scientific Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectView('cro-services')}
                  className="hover:text-sky-300 transition text-left"
                >
                  Molecular Docking (AutoDock)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectView('cro-services')}
                  className="hover:text-sky-300 transition text-left"
                >
                  Molecular Dynamics (GROMACS)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectView('cro-services')}
                  className="hover:text-sky-300 transition text-left"
                >
                  Next-Gen Sequencing (RNA-Seq)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectView('academic-writing')}
                  className="hover:text-sky-300 transition text-left"
                >
                  Manuscript &amp; Thesis Writing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectView('statistics')}
                  className="hover:text-sky-300 transition text-left"
                >
                  Biostatistics &amp; Trial Modeling
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectView('umap')}
                  className="hover:text-sky-300 transition text-left text-cyan-300"
                >
                  Single-Cell UMAP Atlas
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Inquiries */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-white font-bold mb-3 font-sans">
              Director &amp; Inquiries
            </h4>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                <div className="text-[10px] uppercase font-mono tracking-wider text-sky-400">Head of Research</div>
                <div className="font-bold text-white text-xs">{LEADERSHIP_CONTACT.name}, {LEADERSHIP_CONTACT.credentials}</div>
                <a
                  href={`tel:${LEADERSHIP_CONTACT.phoneRaw}`}
                  className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold text-xs pt-0.5 transition"
                >
                  <PhoneCall className="w-3.5 h-3.5 shrink-0" />
                  <span>Phone: {LEADERSHIP_CONTACT.phoneDisplay}</span>
                </a>
                <a
                  href={`mailto:${LEADERSHIP_CONTACT.mailtoRecipients}`}
                  className="flex items-center gap-1.5 text-sky-300 hover:text-white font-medium text-[11px] font-mono transition break-all"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0 text-sky-400" />
                  <span>{LEADERSHIP_CONTACT.email}</span>
                </a>
              </div>

              <button
                onClick={() => onSelectView('contact')}
                className="w-full py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-[#0b2447] text-xs font-bold transition shadow-sm"
              >
                Contact Research Desk
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-blue-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} M &amp; M BioATLAS. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="https://www.linkedin.com/company/mmbioatlas/?viewAsMember=true"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition"
              title="M & M BioATLAS on LinkedIn"
            >
              <Linkedin className="w-3.5 h-3.5 text-[#0077b5]" />
              <span>LinkedIn</span>
            </a>
            <span className="text-slate-600">•</span>
            <a
              href="https://scholar.google.com/citations?user=_Fejj7YAAAAJ&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition"
              title="Google Scholar – Dr. Manne Munikumar"
            >
              <GraduationCap className="w-3.5 h-3.5 text-sky-400" />
              <span>Google Scholar</span>
            </a>
            <span className="text-slate-600">•</span>
            <a
              href="https://www.researchgate.net/profile/Manne-Munikumar?ev=hdr_xprf&_tp=eyJjb250ZXh0Ijp7ImZpcnN0UGFnZSI6ImhvbWUiLCJwYWdlIjoiaG9tZSIsInBvc2l0aW9uIjoiZ2xvYmFsSGVhZGVyIn19"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition"
              title="ResearchGate – Dr. Manne Munikumar"
            >
              <span className="w-3.5 h-3.5 rounded bg-emerald-600 text-white text-[9px] flex items-center justify-center font-bold font-mono">RG</span>
              <span>ResearchGate</span>
            </a>
            <span className="text-slate-600">•</span>
            <a
              href="https://github.com/mannemunikumar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition"
              title="GitHub – Dr. Manne Munikumar"
            >
              <Github className="w-3.5 h-3.5 text-slate-300" />
              <span>GitHub</span>
            </a>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Academic Confidentiality &amp; NDA</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
