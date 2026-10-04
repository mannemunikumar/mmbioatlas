import React, { useState } from 'react';
import { 
  Compass, 
  Target, 
  Eye, 
  Award, 
  Cpu, 
  Dna, 
  BookOpen, 
  BarChart3, 
  GraduationCap, 
  Users, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  Building2, 
  Globe2, 
  Lock,
  ChevronRight,
  PhoneCall,
  UserCheck,
  Mail,
  MessageSquare
} from 'lucide-react';
import { 
  ORGANIZATION_VISION, 
  ORGANIZATION_MISSION, 
  CORE_VALUES, 
  ORGANIZATIONAL_ACTIVITIES,
  OrganizationActivity,
  LEADERSHIP_CONTACT
} from '../data/organizationData';
import { AtlasView } from '../types';

interface AboutMissionProps {
  onSelectView: (view: AtlasView, detailId?: string) => void;
  onOpenConsultation?: (service: string) => void;
}

export const AboutMission: React.FC<AboutMissionProps> = ({
  onSelectView,
  onOpenConsultation,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeActivity, setActiveActivity] = useState<OrganizationActivity>(ORGANIZATIONAL_ACTIVITIES[0]);

  const categories = [
    { id: 'all', label: 'All Activities (8)' },
    { id: 'cro', label: 'CRO & Simulations' },
    { id: 'genomics', label: 'Genomics & NGS' },
    { id: 'writing', label: 'Academic Writing' },
    { id: 'statistics', label: 'Biostatistics' },
    { id: 'training', label: 'Training Academy' },
    { id: 'alliances', label: 'Institutional Alliances' },
    { id: 'csr', label: 'CSR & Open Science' },
    { id: 'quality', label: 'Quality & Ethics' },
  ];

  const filteredActivities = selectedCategory === 'all'
    ? ORGANIZATIONAL_ACTIVITIES
    : ORGANIZATIONAL_ACTIVITIES.filter(a => a.category === selectedCategory);

  const getActivityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-5 h-5 text-blue-600" />;
      case 'Dna': return <Dna className="w-5 h-5 text-sky-600" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-indigo-600" />;
      case 'BarChart3': return <BarChart3 className="w-5 h-5 text-amber-600" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-emerald-600" />;
      case 'Users': return <Users className="w-5 h-5 text-teal-600" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-rose-600" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-cyan-600" />;
      default: return <Building2 className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div id="about-mission-page" className="w-full space-y-12 sm:space-y-16">
      {/* 1. HERO / INSTITUTION PROFILE BANNER */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-sky-50/50 to-slate-50 border border-slate-200/90 p-8 sm:p-12 lg:p-14 shadow-sm">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-50/50 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-blue-200 text-xs text-[#0b3b70] shadow-xs">
            <Building2 className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-semibold">Corporate Profile &amp; Governance</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600 font-medium">M &amp; M BioATLAS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.08]">
            Organization,{' '}
            <span className="bg-gradient-to-r from-[#0b3b70] via-sky-700 to-teal-700 bg-clip-text text-transparent">
              Mission &amp; Vision
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 leading-normal max-w-3xl font-normal">
            Bridging computational biophysics, high-throughput multi-omics data science, and academic research excellence.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => {
                const el = document.getElementById('org-activities-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0b3b70] hover:bg-[#082e59] text-white font-semibold text-xs sm:text-sm transition shadow-sm active:scale-95"
            >
              <span>Explore Organizational Activities</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onOpenConsultation && onOpenConsultation('cro')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-[#0b3b70] font-semibold text-xs sm:text-sm border border-slate-300 transition shadow-xs"
            >
              <span>Institutional Partnerships &amp; MoUs</span>
            </button>
          </div>

          {/* Institutional Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-200/80">
            <div className="p-3.5 rounded-xl bg-white/80 border border-slate-200">
              <div className="text-2xl font-extrabold text-[#0b3b70]">ISO / GLP</div>
              <div className="text-xs text-slate-600 font-medium mt-0.5">Audited SOP Workflows</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white/80 border border-slate-200">
              <div className="text-2xl font-extrabold text-purple-700">ICMJE</div>
              <div className="text-xs text-slate-600 font-medium mt-0.5">Publication Integrity Standard</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white/80 border border-slate-200">
              <div className="text-2xl font-extrabold text-emerald-700">Global</div>
              <div className="text-xs text-slate-600 font-medium mt-0.5">Academic &amp; Biopharma Reach</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white/80 border border-slate-200">
              <div className="text-2xl font-extrabold text-slate-900">100%</div>
              <div className="text-xs text-slate-600 font-medium mt-0.5">Non-Disclosure Agreement (NDA)</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VISION & MISSION DUAL PILLARS */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* VISION CARD */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-6 relative overflow-hidden group hover:border-blue-400 transition">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-[#0b3b70]">
              <Eye className="w-3.5 h-3.5 text-blue-600" />
              <span>Institutional Vision</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Vision for Global Discovery
            </h2>

            <p className="text-sm sm:text-base text-slate-700 leading-normal font-medium italic border-l-4 border-[#0b3b70] pl-4 py-1 bg-slate-50/70 rounded-r-lg">
              &ldquo;{ORGANIZATION_VISION.statement}&rdquo;
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h4 className="text-xs uppercase tracking-wider text-slate-500 font-bold">
              Strategic Horizons &amp; Impact
            </h4>
            <div className="space-y-2.5">
              {ORGANIZATION_VISION.strategicGoals.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/80 border border-slate-100">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{item.goal}</div>
                    <div className="text-[11px] text-slate-500 leading-snug mt-0.5">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MISSION CARD */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-6 relative overflow-hidden group hover:border-emerald-400 transition">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
              <Target className="w-3.5 h-3.5 text-emerald-600" />
              <span>Institutional Mission</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Mission &amp; Purpose
            </h2>

            <p className="text-sm sm:text-base text-slate-700 leading-normal font-medium italic border-l-4 border-emerald-600 pl-4 py-1 bg-emerald-50/40 rounded-r-lg">
              &ldquo;{ORGANIZATION_MISSION.statement}&rdquo;
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h4 className="text-xs uppercase tracking-wider text-slate-500 font-bold">
              Three Pillars of Execution
            </h4>
            <div className="space-y-2.5">
              {ORGANIZATION_MISSION.pillars.map((pillar, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50/80 border border-slate-100 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-900">{pillar.title}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 shrink-0">
                      {pillar.metrics}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE VALUES (PRISM ARCHITECTURE) */}
      <section className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-8">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0b3b70]">
            <Award className="w-4 h-4 text-blue-600" />
            <span>Guiding Principles</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Core Values: The P.R.I.S.M. Framework
          </h2>
          <p className="text-sm text-slate-600 leading-normal">
            Five foundational operational principles governing simulation trajectories, manuscript reviews, and student mentorship.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {CORE_VALUES.map((val) => (
            <div
              key={val.letter}
              className="p-5 rounded-2xl bg-slate-50/90 border border-slate-200/80 hover:border-blue-400 hover:shadow-xs transition space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${val.color} text-white font-extrabold text-lg flex items-center justify-center shadow-xs mb-3`}>
                  {val.letter}
                </div>
                <div className="text-base font-bold text-slate-900">{val.title}</div>
                <div className="text-xs font-medium text-blue-700">{val.subtitle}</div>
                <p className="text-xs text-slate-600 leading-relaxed mt-2 font-normal">
                  {val.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. COMPREHENSIVE ORGANIZATIONAL ACTIVITIES (LIKE ORGANISATION WEBSITE) */}
      <section id="org-activities-section" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0b3b70]">
              <Globe2 className="w-4 h-4 text-blue-600" />
              <span>Scope of Institutional Operations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mt-1 leading-tight">
              Organizational Activities &amp; Strategic Programs
            </h2>
            <p className="text-sm text-slate-600 font-medium mt-1">
              End-to-end capabilities spanning computational drug discovery, genomics, scientific publishing, training, and global academic alliances.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0b3b70]">
              8 Operational Dimensions
            </span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#0b3b70] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredActivities.map((act) => (
            <div
              key={act.id}
              onClick={() => setActiveActivity(act)}
              className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md cursor-pointer transition flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100 group-hover:scale-105 transition">
                    {getActivityIcon(act.iconName)}
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                    {act.categoryLabel}
                  </span>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#0b3b70] transition">
                    {act.title}
                  </h3>
                  <div className="text-xs font-medium text-sky-700 mt-0.5">
                    {act.tagline}
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {act.description}
                </p>

                <div className="space-y-1.5 pt-2">
                  <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    Core Protocols &amp; Focus:
                  </div>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {act.highlights.slice(0, 3).map((item, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] font-semibold text-slate-500">
                  {act.impactMetric}
                </span>
                <span className="text-blue-700 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition">
                  <span>Learn more</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4B. SCIENTIFIC DIRECTORATE & PRINCIPAL SCIENTIST */}
      <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-white via-blue-50/40 to-slate-50 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#0b3b70] font-bold">
              Institutional Governance
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Scientific Directorate &amp; Principal Investigator
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Direct computational oversight, research methodology validation, and international collaboration leadership.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold border border-blue-200">
              Ph.D. Research Desk
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-[#0b3b70] to-cyan-600 p-0.5 shadow-md shrink-0">
              <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center text-[#0b3b70]">
                <UserCheck className="w-9 h-9" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#0b3b70] uppercase tracking-wide">
                  {LEADERSHIP_CONTACT.designation}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs text-slate-500">{LEADERSHIP_CONTACT.affiliation}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                {LEADERSHIP_CONTACT.name},{' '}
                <span className="text-cyan-700 font-mono text-base font-semibold">
                  {LEADERSHIP_CONTACT.credentials}
                </span>
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                {LEADERSHIP_CONTACT.bio}
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                {LEADERSHIP_CONTACT.expertise.slice(0, 3).map((item, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0 pt-2 lg:pt-0">
            <a
              href={`tel:${LEADERSHIP_CONTACT.phoneRaw}`}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-xs"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call: {LEADERSHIP_CONTACT.phoneDisplay}</span>
            </a>

            <a
              href={`mailto:${LEADERSHIP_CONTACT.email}?subject=Scientific%20Inquiry%20to%20Dr.%20Manne%20Munikumar`}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0b3b70] font-semibold text-xs transition border border-blue-200 font-mono"
            >
              <Mail className="w-4 h-4 text-blue-700" />
              <span>{LEADERSHIP_CONTACT.email}</span>
            </a>

            <a
              href={LEADERSHIP_CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition border border-slate-200"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Direct WhatsApp</span>
            </a>

            <button
              onClick={() => onSelectView('contact')}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#0b3b70] hover:bg-[#082e59] text-white font-semibold text-xs transition"
            >
              <Mail className="w-4 h-4" />
              <span>Schedule Consultation</span>
            </button>
          </div>
        </div>
      </section>

      {/* 5. QUALITY GOVERNANCE & ACADEMIC INTEGRITY */}
      <section className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white relative overflow-hidden shadow-xl space-y-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-300">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>Institutional Governance</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Quality Assurance, GLP Computing &amp; Academic Non-Disclosure
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Similar to global biopharmaceutical compliance systems, every computational workflow at M &amp; M BioATLAS operates under strict quality control, verified audit trails, and legally binding non-disclosure protocols.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10 pt-2">
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1.5">
            <div className="text-xs font-bold text-sky-400 uppercase tracking-wider">01. 100% NDA Protection</div>
            <div className="text-sm font-semibold text-white">Full IP Transfer</div>
            <p className="text-xs text-slate-400">All molecular coordinates, manuscripts, and scripts belong 100% to the client.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1.5">
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">02. GLP Computational Audit</div>
            <div className="text-sm font-semibold text-white">Dual Analyst Cross-Check</div>
            <p className="text-xs text-slate-400">Every simulation parameter is independently verified by a secondary bioinformatician.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1.5">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">03. FAIR Data Standards</div>
            <div className="text-sm font-semibold text-white">Verifiable Scripts</div>
            <p className="text-xs text-slate-400">Findable, Accessible, Interoperable, and Reusable code for complete replication.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1.5">
            <div className="text-xs font-bold text-teal-400 uppercase tracking-wider">04. Ethics Compliance</div>
            <div className="text-sm font-semibold text-white">ICMJE &amp; COPE Aligned</div>
            <p className="text-xs text-slate-400">Rigorous plagiarism scanning, reference verification, and ethical authorship guidelines.</p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs relative z-10">
          <div className="text-slate-400">
            Need an institutional collaboration, faculty training MoU, or project inquiry?
          </div>
          <button
            onClick={() => onOpenConsultation && onOpenConsultation('cro')}
            className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold transition flex items-center justify-center gap-2 shadow-sm"
          >
            <span>Initiate Institutional Inquiry</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
