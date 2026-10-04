import React, { useState } from 'react';
import { 
  Globe, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink, 
  Linkedin, 
  Twitter, 
  Github, 
  Youtube, 
  FileText, 
  Award, 
  Sparkles, 
  Cpu, 
  Layers, 
  Users, 
  BookOpen,
  Send,
  Building2,
  Calendar,
  GraduationCap,
  Phone
} from 'lucide-react';
import { AtlasView } from '../types';
import { LEADERSHIP_CONTACT } from '../data/organizationData';

interface InternationalResearchHubProps {
  onSelectView: (view: AtlasView) => void;
  onOpenConsultation?: (service: string) => void;
}

interface RegionalHub {
  id: string;
  region: string;
  territory: string;
  flag: string;
  activeTimezones: string;
  consortiaAffiliations: string[];
  keyCapabilities: string[];
  turnaroundGuarantee: string;
  leadCoordinator: string;
}

const REGIONAL_HUBS: RegionalHub[] = [
  {
    id: 'north-america',
    region: 'North America Hub',
    territory: 'USA & Canada (Boston • San Diego • Toronto • RTP)',
    flag: '🇺🇸 / 🇨🇦',
    activeTimezones: 'EST (UTC-5) / CST (UTC-6) / PST (UTC-8)',
    consortiaAffiliations: [
      'NIH R01 / R21 / SBIR Data Compliance',
      'FAIR Data & GenBank / SRA Submissions',
      'HIPAA-Compliant De-identified Cohorts',
      'Biotech Startup Computational Acceleration'
    ],
    keyCapabilities: [
      'Overnight GROMACS MD trajectories executed during US evening cycles',
      'AutoDock Vina virtual screening of 1M+ small-molecule compounds',
      'Target identification for IND-enabling regulatory dossiers'
    ],
    turnaroundGuarantee: '48-Hour Pilot Execution',
    leadCoordinator: 'Senior Biophysics Fellow (Americas Desk)'
  },
  {
    id: 'europe-uk',
    region: 'European Research Area',
    territory: 'UK & EU (Cambridge • Heidelberg • Oxford • Zurich)',
    flag: '🇬🇧 / 🇪🇺',
    activeTimezones: 'GMT/BST (UTC+0/+1) / CET/CEST (UTC+1/+2)',
    consortiaAffiliations: [
      'Horizon Europe ERC Synergy Protocols',
      'Wellcome Trust Open Research Formats',
      'GDPR-Compliant Biomedical Cryptography',
      'EMBL-EBI Standard Ontologies & BioSamples'
    ],
    keyCapabilities: [
      'Single-cell RNA-Seq integration (Seurat v5 & Scanpy)',
      'Molecular dynamics of antimicrobial resistance (AMR) targets',
      'Scientific manuscript preparation for Nature / Lancet portfolio journals'
    ],
    turnaroundGuarantee: 'Rapid Peer-Review Turnaround',
    leadCoordinator: 'Principal Bioinformatician (Europe Desk)'
  },
  {
    id: 'asia-pacific',
    region: 'Asia-Pacific & Middle East',
    territory: 'APAC (Singapore • Tokyo • Sydney • Bengaluru • Hyderabad)',
    flag: '🇸🇬 / 🇯🇵 / 🇮🇳 / 🇦🇺',
    activeTimezones: 'IST (UTC+5:30) / SGT (UTC+8) / JST (UTC+9) / AEST (UTC+10)',
    consortiaAffiliations: [
      'DBT / DST / ICMR Collaborative Grants',
      'A*STAR / RIKEN Computational Benchmarks',
      'ASEAN Marine & Plant Metagenomics',
      'Regional Ph.D. Scholar Fellowship Cohorts'
    ],
    keyCapabilities: [
      'Whole Exome & Variant Annotation pipelines for clinical genetics',
      'Large-scale survey and epidemiological Bayesian statistical modeling',
      'Hands-on 3-Month and 6-Month remote research internships'
    ],
    turnaroundGuarantee: 'Continuous 24/7 Compute Support',
    leadCoordinator: 'Director of Academic Outreach (APAC Desk)'
  }
];

export const InternationalResearchHub: React.FC<InternationalResearchHubProps> = ({
  onSelectView,
  onOpenConsultation
}) => {
  const [activeTab, setActiveTab] = useState<string>('north-america');

  const selectedHub = REGIONAL_HUBS.find(h => h.id === activeTab) || REGIONAL_HUBS[0];

  return (
    <section id="international-research-portal" className="w-full space-y-8 my-6">
      {/* SECTION HEADER: Elite International Research Institute Look */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#06182a] via-[#0b2847] to-[#081e35] text-white p-8 sm:p-12 border border-blue-900/80 shadow-xl">
        {/* Glow and grid effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-xs font-semibold text-cyan-300">
              <Globe className="w-3.5 h-3.5" />
              <span>International Research Collaboration Framework</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-[11px] text-emerald-300 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Global PIs, Postdocs &amp; Scholars Welcomed</span>
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Connecting World-Class Laboratories with{' '}
            <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
              High-Throughput Bio-Computing
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-normal font-normal max-w-3xl">
            Global research partnerships across 24+ countries with multi-timezone computational coordination and publication deliverables.
          </p>

          {/* Key Global Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">24+</div>
              <div className="text-xs text-slate-300 font-medium mt-0.5">Countries Engaged</div>
              <div className="text-[10px] text-slate-400">USA, EU, UK, APAC, MEA</div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">100%</div>
              <div className="text-xs text-slate-300 font-medium mt-0.5">FAIR Data Standard</div>
              <div className="text-[10px] text-slate-400">NIH &amp; ERC Compliant</div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="text-2xl sm:text-3xl font-extrabold text-sky-400 font-mono">&lt; 12h</div>
              <div className="text-xs text-slate-300 font-medium mt-0.5">NDA Fast-Track</div>
              <div className="text-[10px] text-slate-400">Bilateral Institutional NDA</div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">24/7</div>
              <div className="text-xs text-slate-300 font-medium mt-0.5">Cluster Workloads</div>
              <div className="text-[10px] text-slate-400">Multi-GPU MD Pipelines</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onSelectView('contact')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-[#06182a] font-bold text-xs sm:text-sm transition shadow-md active:scale-95"
            >
              <span>Connect with International Desk</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onSelectView('research')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm border border-white/20 transition"
            >
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Explore Q1 Publications &amp; Grants</span>
            </button>
          </div>
        </div>
      </div>

      {/* REGIONAL HUBS INTERACTIVE SELECTOR */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#0b3b70] font-bold">
              Timezone Coordination &amp; Consortia
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Active Regional Coordination Desks
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Select a territory to inspect local timezone coverage, grant alignment, and computational throughput.
            </p>
          </div>

          {/* Selector Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-slate-100 border border-slate-200">
            {REGIONAL_HUBS.map(hub => (
              <button
                key={hub.id}
                onClick={() => setActiveTab(hub.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                  activeTab === hub.id
                    ? 'bg-[#0b3b70] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                }`}
              >
                <span>{hub.flag}</span>
                <span>{hub.region}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Hub Card Details */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/40 border border-slate-200 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">{selectedHub.flag}</span>
                <h4 className="text-lg font-bold text-slate-900">{selectedHub.region}</h4>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                  {selectedHub.turnaroundGuarantee}
                </span>
              </div>
              <div className="text-xs text-slate-600 mt-1">
                <strong>Target Territories:</strong> {selectedHub.territory}
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs bg-white px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700">
              <Clock className="w-4 h-4 text-blue-600 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block font-mono">SUPPORT HOURS</span>
                <span className="font-semibold text-slate-900">{selectedHub.activeTimezones}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Grant & Regulatory Affiliations */}
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Grant &amp; Compliance Frameworks:</span>
              </div>
              <ul className="space-y-2">
                {selectedHub.consortiaAffiliations.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Computational Workloads Delivered */}
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-600" />
                <span>Primary Compute Deliverables:</span>
              </div>
              <ul className="space-y-2">
                {selectedHub.keyCapabilities.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200/80">
                    <Sparkles className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-200 text-xs">
            <div className="text-slate-600 space-y-0.5">
              <div>
                <strong>Supervisory Desk:</strong> {selectedHub.leadCoordinator}
              </div>
              <div className="flex flex-wrap items-center gap-1.5 text-slate-700">
                <Phone className="w-3 h-3 text-emerald-600 shrink-0" />
                <span>Director Desk: <strong>{LEADERSHIP_CONTACT.name}, {LEADERSHIP_CONTACT.credentials}</strong></span>
                <span className="text-slate-400">•</span>
                <a
                  href={`tel:${LEADERSHIP_CONTACT.phoneRaw}`}
                  className="font-bold text-emerald-700 hover:underline"
                >
                  Phone: {LEADERSHIP_CONTACT.phoneDisplay}
                </a>
                <span className="text-slate-400">•</span>
                <a
                  href={`mailto:${LEADERSHIP_CONTACT.email}`}
                  className="font-mono text-[11px] text-[#0b3b70] hover:underline"
                >
                  {LEADERSHIP_CONTACT.email}
                </a>
              </div>
            </div>
            <button
              onClick={() => onSelectView('contact')}
              className="px-4 py-2 rounded-lg bg-[#0b3b70] hover:bg-[#082e59] text-white font-semibold text-xs transition flex items-center gap-2 self-start sm:self-auto shrink-0"
            >
              <span>Schedule Timezone Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* SCIENTIFIC SOCIAL MEDIA & SCHOLAR CHANNELS */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-blue-700 font-bold">
              Global Researcher Networks
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Official BioATLAS Scientific Channels
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Connect with investigators, browse public workflow repositories, and follow ongoing computational biology breakthroughs.
            </p>
          </div>
          <div className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 flex items-center gap-1.5 self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Open Science &amp; FAIR Data</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* LinkedIn */}
          <div className="p-5 rounded-2xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200 hover:border-blue-300 transition group flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#0077b5]/10 text-[#0077b5] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Linkedin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">LinkedIn Scientific Desk</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Institutional milestones, career announcements, postdoc fellowships, and computational biology white papers.
                </p>
              </div>
            </div>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0077b5] hover:underline"
            >
              <span>Follow on LinkedIn</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* X / Twitter */}
          <div className="p-5 rounded-2xl bg-slate-50 hover:bg-sky-50/50 border border-slate-200 hover:border-sky-300 transition group flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Twitter className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">X / BioTwitter Desk</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Live conference updates, bioRxiv preprints, GROMACS benchmark releases, and bioinformatics discussions.
                </p>
              </div>
            </div>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 hover:underline"
            >
              <span>Follow @BioATLAS_Science</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* GitHub */}
          <div className="p-5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-400 transition group flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900/10 text-slate-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Github className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">GitHub Open Source</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Open Nextflow DSL2 pipelines, Snakemake automation, bash orchestration scripts, and Docker bioinformatics containers.
                </p>
              </div>
            </div>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 hover:underline"
            >
              <span>Explore Repositories</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* YouTube */}
          <div className="p-5 rounded-2xl bg-slate-50 hover:bg-rose-50/50 border border-slate-200 hover:border-rose-300 transition group flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Youtube className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">YouTube Science Channel</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Video protocols for molecular docking with AutoDock, solvated MD simulations, and RNA-Seq volcano plot tutorials.
                </p>
              </div>
            </div>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:underline"
            >
              <span>Subscribe &amp; Watch</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* INTERNATIONAL VISITING FELLOWSHIPS & PROCUREMENT MODES */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center">
            <GraduationCap className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">Remote Visiting Fellowships</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            International Ph.D. students and postdoctoral researchers can access M &amp; M BioATLAS HPC computing clusters remotely, receive 1-on-1 mentorship, and co-author high-impact research papers.
          </p>
          <button
            onClick={() => onSelectView('training')}
            className="text-xs font-semibold text-[#0b3b70] hover:underline flex items-center gap-1 pt-1"
          >
            <span>Inspect 3M &amp; 6M Fellowships</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Building2 className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">Grant Letters of Support (LOS)</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Applying for an NIH, Horizon Europe, or national research grant? M &amp; M BioATLAS provides formal institutional Letters of Support and computational budget allocations.
          </p>
          <button
            onClick={() => onSelectView('contact')}
            className="text-xs font-semibold text-emerald-800 hover:underline flex items-center gap-1 pt-1"
          >
            <span>Request Grant Letter of Support</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
          <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center">
            <FileText className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">Multi-Currency Invoicing &amp; POs</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Institutional procurement accepted via wire transfers in USD ($), EUR (€), GBP (£), and INR (₹). Fast-track vendor registration forms completed within 24 hours.
          </p>
          <button
            onClick={() => onSelectView('contact')}
            className="text-xs font-semibold text-purple-800 hover:underline flex items-center gap-1 pt-1"
          >
            <span>Inquire Procurement Protocols</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </section>
  );
};
