import React from 'react';
import { Logo } from './Logo';
import { AtlasView } from '../types';
import { 
  ShieldCheck, 
  PhoneCall, 
  Mail
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
                  Scientific Research
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
                  href={`mailto:${LEADERSHIP_CONTACT.email}`}
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
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Strict Academic Confidentiality &amp; NDA Standard</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
