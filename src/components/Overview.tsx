import React from 'react';
import { 
  ArrowRight, 
  Cpu, 
  Dna, 
  Activity, 
  BookOpen, 
  BarChart3, 
  GraduationCap, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  FileCode,
  Search,
  Radio,
  Layers,
  Calendar,
  Clock,
  Users,
  Compass,
  Target,
  Eye,
  Award,
  ShieldCheck,
  Building2,
  Globe2
} from 'lucide-react';
import { Logo } from './Logo';
import { AtlasView } from '../types';
import { TRAINING_PROGRAMS } from '../data/websiteContent';
import { 
  ORGANIZATION_VISION, 
  ORGANIZATION_MISSION, 
  CORE_VALUES, 
  ORGANIZATIONAL_ACTIVITIES 
} from '../data/organizationData';
import { HighResAnimatedDna } from './HighResAnimatedDna';

interface OverviewProps {
  onSelectView: (view: AtlasView, detailId?: string) => void;
  onOpenSearch: () => void;
  onOpenBrandKit: () => void;
  onOpenConsultation?: (service: string) => void;
}

export const Overview: React.FC<OverviewProps> = ({
  onSelectView,
  onOpenSearch,
  onOpenBrandKit,
  onOpenConsultation
}) => {
  return (
    <div id="overview-portal-page" className="w-full space-y-12 sm:space-y-16">
      {/* 1. HERO SECTION - Clean, Traditional Full-Width Scientific Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-slate-50 to-blue-50/40 border border-slate-200/90 p-8 sm:p-12 lg:p-14 shadow-sm">
        {/* Subtle grid accent */}
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none bg-[radial-gradient(#0b3b70_1px,transparent_1px)] [background-size:20px_20px]" />

        {/* Two-Column Hero Grid: Left Editorial, Right High-Resolution Animated 3D DNA */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Editorial Title & Calls to Action */}
          <div className="lg:col-span-7 space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-blue-200 text-xs text-[#0b3b70] shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold">Contract Research Organization &amp; Training</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-600 font-medium">Bioinformatics Hub</span>
              </div>
            </div>

            {/* Exact Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Advancing Life Sciences with{' '}
              <span className="bg-gradient-to-r from-[#0b3b70] via-sky-700 to-teal-700 bg-clip-text text-transparent">
                Precision Bioinformatics
              </span>{' '}
              &amp; Analytics
            </h1>

            {/* Exact Sub-headline */}
            <p className="text-lg sm:text-2xl lg:text-[1.65rem] text-slate-600 leading-snug sm:leading-relaxed max-w-2xl font-medium">
              Contract Research Organization (CRO) and training partner for molecular simulations, NGS pipelines, academic writing, and statistical solutions.
            </p>

            {/* Calls to Action */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="hero-explore-services"
                onClick={() => onSelectView('services')}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0b3b70] hover:bg-[#082e59] text-white font-semibold text-sm transition shadow-md shadow-blue-900/15 active:scale-95"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: High-Resolution Animated 3D DNA Double Helix */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <HighResAnimatedDna />
          </div>
        </div>
      </section>

      {/* QUICK EXPLORER BAR: User-Friendly Direct Navigation */}
      <section className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-600 mb-3.5 px-1">
          Explore Divisions &amp; Scientific Resources:
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <button
            onClick={() => onSelectView('services')}
            className="p-3.5 rounded-xl bg-slate-50 hover:bg-blue-50/70 border border-slate-200/80 hover:border-blue-300 transition text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#0b3b70] flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
              <Cpu className="w-4.5 h-4.5" />
            </div>
            <div className="text-sm sm:text-base font-bold text-slate-900 leading-tight">Services Hub</div>
            <div className="text-xs text-slate-500 mt-1">CRO &amp; Simulations</div>
          </button>

          <button
            onClick={() => onSelectView('research')}
            className="p-3.5 rounded-xl bg-slate-50 hover:bg-blue-50/70 border border-slate-200/80 hover:border-blue-300 transition text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
              <BookOpen className="w-4.5 h-4.5" />
            </div>
            <div className="text-sm sm:text-base font-bold text-slate-900 leading-tight">Research</div>
            <div className="text-xs text-slate-500 mt-1">Themes &amp; Papers</div>
          </button>

          <button
            onClick={() => onSelectView('rd')}
            className="p-3.5 rounded-xl bg-slate-50 hover:bg-blue-50/70 border border-slate-200/80 hover:border-blue-300 transition text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-cyan-100 text-cyan-800 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
              <Layers className="w-4.5 h-4.5" />
            </div>
            <div className="text-sm sm:text-base font-bold text-slate-900 leading-tight">R&amp;D Division</div>
            <div className="text-xs text-slate-500 mt-1">HPC &amp; Pipelines</div>
          </button>

          <button
            onClick={() => onSelectView('projects')}
            className="p-3.5 rounded-xl bg-slate-50 hover:bg-blue-50/70 border border-slate-200/80 hover:border-blue-300 transition text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-4.5 h-4.5" />
            </div>
            <div className="text-sm sm:text-base font-bold text-slate-900 leading-tight">Projects</div>
            <div className="text-xs text-slate-500 mt-1">Client Portfolios</div>
          </button>

          <button
            onClick={() => onSelectView('training')}
            className="p-3.5 rounded-xl bg-slate-50 hover:bg-blue-50/70 border border-slate-200/80 hover:border-blue-300 transition text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-4.5 h-4.5" />
            </div>
            <div className="text-sm sm:text-base font-bold text-slate-900 leading-tight">Training</div>
            <div className="text-xs text-slate-500 mt-1">1M, 3M &amp; 6M Cohorts</div>
          </button>

          <button
            onClick={() => onSelectView('contact')}
            className="p-3.5 rounded-xl bg-blue-50/60 hover:bg-blue-100/70 border border-blue-200 hover:border-blue-400 transition text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#0b3b70] text-white flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
              <ArrowRight className="w-4.5 h-4.5" />
            </div>
            <div className="text-sm sm:text-base font-bold text-[#0b3b70] leading-tight">Contact Us</div>
            <div className="text-xs text-blue-700/80 mt-1">Submit Scoping Spec</div>
          </button>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/90 relative overflow-hidden shadow-sm space-y-6">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0b3b70]">
            <Compass className="w-4 h-4 text-blue-600" />
            <span>About M &amp; M BioATLAS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Bridging Computational Biology &amp; Scientific Impact
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-normal">
            Connecting advanced computational biophysics with reproducible discoveries, peer-reviewed publications, and hands-on researcher training.
          </p>
        </div>

        {/* 4 Pillars Summary Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-slate-100">
          <div className="p-4 rounded-xl bg-slate-50/90 border border-slate-200/80 space-y-1">
            <span className="text-xs font-semibold text-blue-700">01. Precision CRO</span>
            <div className="text-sm font-bold text-slate-900">Molecular Docking &amp; MD</div>
            <p className="text-[11px] text-slate-500">Virtual screening &amp; atomistic simulations</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50/90 border border-slate-200/80 space-y-1">
            <span className="text-xs font-semibold text-emerald-700">02. Genomic Pipelines</span>
            <div className="text-sm font-bold text-slate-900">NGS &amp; RNA-Seq</div>
            <p className="text-[11px] text-slate-500">Variant calling &amp; pathway enrichment</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50/90 border border-slate-200/80 space-y-1">
            <span className="text-xs font-semibold text-sky-700">03. Academic Writing</span>
            <div className="text-sm font-bold text-slate-900">Manuscripts &amp; Dissertations</div>
            <p className="text-[11px] text-slate-500">Targeting high-impact Q1 journals</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50/90 border border-slate-200/80 space-y-1">
            <span className="text-xs font-semibold text-amber-700">04. Statistics</span>
            <div className="text-sm font-bold text-slate-900">Survey &amp; Inferential Models</div>
            <p className="text-[11px] text-slate-500">ANOVA, regressions, G*Power testing</p>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs border-t border-slate-100">
          <span className="text-slate-500">
            Adhering to Good Laboratory Practice (GLP) in silico benchmarks &amp; academic ethics.
          </span>
          <button
            onClick={() => onSelectView('about')}
            className="text-xs font-semibold text-[#0b3b70] hover:text-blue-900 flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>Learn More About Institutional Governance &amp; Profile</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 2B. MISSION & VISION SECTION - Biological E Corporate Style */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* VISION CARD */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-6 relative overflow-hidden group hover:border-blue-400 transition">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-[#0b3b70]">
              <Eye className="w-3.5 h-3.5 text-blue-600" />
              <span>Vision</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              A Global Benchmark for Precision Bio-Computing
            </h3>

            <p className="text-sm sm:text-base text-slate-700 leading-normal font-medium italic border-l-4 border-[#0b3b70] pl-4 py-1 bg-slate-50/70 rounded-r-lg">
              &ldquo;{ORGANIZATION_VISION.statement}&rdquo;
            </p>
          </div>

          <div className="space-y-2.5 pt-4 border-t border-slate-100">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Strategic Objectives:
            </div>
            {ORGANIZATION_VISION.strategicGoals.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">{item.goal}:</strong> {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MISSION CARD */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-6 relative overflow-hidden group hover:border-emerald-400 transition">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
              <Target className="w-3.5 h-3.5 text-emerald-600" />
              <span>Mission</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              Bridging Data Science &amp; Life-Saving Therapies
            </h3>

            <p className="text-sm sm:text-base text-slate-700 leading-normal font-medium italic border-l-4 border-emerald-600 pl-4 py-1 bg-emerald-50/40 rounded-r-lg">
              &ldquo;{ORGANIZATION_MISSION.statement}&rdquo;
            </p>
          </div>

          <div className="space-y-2.5 pt-4 border-t border-slate-100">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Execution Commitments:
            </div>
            {ORGANIZATION_MISSION.pillars.map((pillar, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">{pillar.title}:</strong> {pillar.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2C. CORE VALUES: P.R.I.S.M. FRAMEWORK */}
      <section className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0b3b70]">
              <Award className="w-4 h-4 text-blue-600" />
              <span>Guiding Principles</span>
            </div>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mt-1 leading-tight">
              Core Values: The P.R.I.S.M. Framework
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Operational excellence built on precision, reproducibility, integrity, scientific rigor, and mentorship.
            </p>
          </div>
          <button
            onClick={() => onSelectView('about')}
            className="text-xs font-semibold text-[#0b3b70] hover:text-blue-900 flex items-center gap-1 shrink-0 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200"
          >
            <span>View Full Values &amp; CSR</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {CORE_VALUES.map((val) => (
            <div
              key={val.letter}
              className="p-5 rounded-2xl bg-slate-50/90 border border-slate-200/80 hover:border-blue-400 hover:shadow-xs transition space-y-2.5"
            >
              <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${val.color} text-white font-extrabold text-base flex items-center justify-center shadow-xs`}>
                {val.letter}
              </div>
              <div className="text-base sm:text-lg font-extrabold text-slate-900">{val.title}</div>
              <div className="text-xs sm:text-sm font-semibold text-blue-700">{val.subtitle}</div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {val.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 2D. ORGANIZATIONAL ACTIVITIES */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0b3b70]">
              <Globe2 className="w-4 h-4 text-blue-600" />
              <span>Organization Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mt-1 leading-tight">
              Organizational Activities &amp; Operations
            </h2>
            <p className="text-sm text-slate-600 font-medium mt-1">
              Coordinating multi-disciplinary research, computational pipelines, academic alliances, and quality assurance.
            </p>
          </div>

          <button
            onClick={() => onSelectView('about')}
            className="text-xs font-semibold text-[#0b3b70] hover:text-blue-900 flex items-center gap-1 shrink-0 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200 hover:bg-blue-100 transition"
          >
            <span>All 8 Organizational Activities</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Featured Activity Bento Cards on Home Page */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {ORGANIZATIONAL_ACTIVITIES.slice(0, 4).map((act) => (
            <div
              key={act.id}
              onClick={() => onSelectView('about')}
              className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md cursor-pointer transition flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="p-2.5 rounded-lg bg-blue-50 text-blue-700">
                    {act.category === 'cro' && <Cpu className="w-5 h-5" />}
                    {act.category === 'genomics' && <Dna className="w-5 h-5" />}
                    {act.category === 'writing' && <BookOpen className="w-5 h-5" />}
                    {act.category === 'statistics' && <BarChart3 className="w-5 h-5" />}
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                    {act.categoryLabel}
                  </span>
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-700 transition">
                    {act.title}
                  </h4>
                  <div className="text-xs sm:text-sm text-slate-600 line-clamp-2 mt-1.5 leading-relaxed">
                    {act.tagline}
                  </div>
                </div>
              </div>

              <div className="pt-3.5 border-t border-slate-100 text-xs sm:text-sm text-blue-700 font-semibold flex items-center justify-between">
                <span>View Scope</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
              </div>
            </div>
          ))}
        </div>

        {/* Secondary 4 Activities Preview Row (Alliances, Training, CSR, Quality) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ORGANIZATIONAL_ACTIVITIES.slice(4, 8).map((act) => (
            <div
              key={act.id}
              onClick={() => onSelectView('about')}
              className="p-5 rounded-xl bg-slate-50/90 border border-slate-200/80 hover:bg-white hover:border-blue-300 cursor-pointer transition space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900">{act.categoryLabel}</span>
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              </div>
              <div className="text-xs sm:text-sm text-slate-800 font-semibold">{act.title}</div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">{act.tagline}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CONTRACT RESEARCH ORGANIZATION (CRO) & BIOINFORMATICS */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-[#0b3b70] uppercase tracking-wider">
              Research Pipeline
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mt-1 leading-tight">
              Contract Research Organization (CRO) &amp; Bioinformatics
            </h2>
            <p className="text-sm text-slate-600 font-medium mt-1">
              Accelerating drug discovery through high-throughput virtual screening and GPU simulations.
            </p>
          </div>

          <button
            onClick={() => onSelectView('cro-services')}
            className="text-xs font-semibold text-[#0b3b70] hover:text-blue-900 flex items-center gap-1 shrink-0 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200 hover:bg-blue-100/70 transition"
          >
            <span>Explore Interactive CRO Workbench</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Molecular Docking */}
          <div 
            onClick={() => onSelectView('cro-services')}
            className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md cursor-pointer transition flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0b3b70] group-hover:scale-110 transition-transform">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-[#0b3b70] transition-colors">
                Molecular Docking
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                High-throughput virtual screening of small molecules, macrocycles, and peptide-protein interactions.
              </p>
              
              <ul className="text-xs text-slate-600 space-y-1.5 pt-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span>Target binding affinity calculations (AutoDock Vina, Smina)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span>Pharmacophore modeling &amp; 3D QSAR analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span>ADMET property profiling and Lipinski filter scoring</span>
                </li>
              </ul>
            </div>
            <div className="pt-3 border-t border-slate-100 text-[11px] font-semibold text-[#0b3b70] flex items-center justify-between">
              <span>AutoDock Vina &amp; Smina Suites</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Molecular Dynamics Simulations */}
          <div 
            onClick={() => onSelectView('cro-services')}
            className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-purple-500 hover:shadow-md cursor-pointer transition flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-700 group-hover:scale-110 transition-transform">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                Molecular Dynamics (MD)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Atomistic GROMACS GPU simulations evaluating thermodynamic stability, conformational flexibility, and binding free energy.
              </p>

              <ul className="text-xs text-slate-600 space-y-1.5 pt-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                  <span>100ns to 1μs explicit solvent atomistic trajectories</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                  <span>RMSD, RMSF, Rg, SASA &amp; hydrogen bond evolution</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                  <span>MM-PBSA &amp; MM-GBSA binding free energy calculation</span>
                </li>
              </ul>
            </div>
            <div className="pt-3 border-t border-slate-100 text-[11px] font-semibold text-purple-700 flex items-center justify-between">
              <span>GROMACS 2024 GPU Acceleration</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Next-Generation Sequencing Analysis */}
          <div 
            onClick={() => onSelectView('cro-services')}
            className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-md cursor-pointer transition flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 group-hover:scale-110 transition-transform">
                <Dna className="w-5 h-5" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                NGS &amp; Multi-Omics Analysis
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                End-to-end RNA-Seq, variant calling, and pathway enrichment from raw FASTQ reads to publication-grade figures.
              </p>

              <ul className="text-xs text-slate-600 space-y-1.5 pt-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span>FastQC, Trimmomatic &amp; STAR/HISAT2 reference alignments</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span>DESeq2 &amp; edgeR differential expression modeling</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span>GO term enrichment, KEGG &amp; Reactome pathway mapping</span>
                </li>
              </ul>
            </div>
            <div className="pt-3 border-t border-slate-100 text-[11px] font-semibold text-emerald-700 flex items-center justify-between">
              <span>FASTQ &rarr; DESeq2 &amp; KEGG Pathways</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. ACADEMIC & SCIENTIFIC WRITING */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-[#0b3b70] uppercase tracking-wider">
              Publication Services
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mt-1 leading-tight">
              Academic &amp; Scientific Writing
            </h2>
            <p className="text-sm text-slate-600 font-medium mt-1">
              Transforming research findings into high-impact, peer-reviewed scientific literature.
            </p>
          </div>

          <button
            onClick={() => onSelectView('academic-writing')}
            className="text-xs font-semibold text-[#0b3b70] hover:text-blue-900 flex items-center gap-1 shrink-0 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200 hover:bg-blue-100/70 transition"
          >
            <span>View Manuscript Guidelines</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            onClick={() => onSelectView('academic-writing')}
            className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md cursor-pointer transition flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-4">
              <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0b3b70] group-hover:scale-110 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-[#0b3b70] transition-colors">
                Manuscript Writing &amp; Editorial Support
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Full original research drafting, journal formatting, and peer-review revision support under strict ICMJE guidelines.
              </p>

              <ul className="text-xs text-slate-600 space-y-2 pt-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span>Target journal scoping for Nature, Elsevier, Springer &amp; Wiley</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span>Publication-ready vector artwork &amp; high-resolution figure compilation</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span>Point-by-point reviewer response letters &amp; supplementary data proofs</span>
                </li>
              </ul>
            </div>
            <div className="pt-2 text-[11px] font-semibold text-[#0b3b70] flex items-center justify-between border-t border-slate-100">
              <span>Nature, Elsevier, Springer &amp; Wiley compliance</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div 
            onClick={() => onSelectView('academic-writing')}
            className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 hover:border-purple-500 hover:shadow-md cursor-pointer transition flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-4">
              <div className="w-11 h-11 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-700 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                Thesis &amp; Dissertation Support
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Comprehensive structuring, systematic literature reviews, and quantitative results synthesis for postgraduate researchers.
              </p>

              <ul className="text-xs text-slate-600 space-y-2 pt-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                  <span>PRISMA 2020 compliant systematic review &amp; meta-analysis flows</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                  <span>Chapter-by-chapter PhD / MSc dissertation architecture</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                  <span>Defense slide decks and viva voce technical preparation</span>
                </li>
              </ul>
            </div>
            <div className="pt-2 text-[11px] font-semibold text-purple-700 flex items-center justify-between border-t border-slate-100">
              <span>PRISMA systematic reviews &amp; defense slide decks</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. STATISTICAL & SURVEY DATA ANALYSIS */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
              Methodological Rigor
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mt-1 leading-tight">
              Statistical &amp; Survey Data Analysis
            </h2>
            <p className="text-sm text-slate-600 font-medium mt-1">
              Rigorous inferential modeling and power validation for experimental and clinical studies.
            </p>
          </div>

          <button
            onClick={() => onSelectView('statistics')}
            className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1 shrink-0 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 hover:bg-amber-100/70 transition"
          >
            <span>Launch Statistical Modeler</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            onClick={() => onSelectView('statistics')}
            className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 hover:border-amber-500 hover:shadow-md cursor-pointer transition space-y-4 group"
          >
            <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700 group-hover:scale-110 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
              Survey Data Analysis
            </h3>
            <p className="text-xs text-slate-600 leading-normal">
              Data cleaning, psychometric validation, and actionable insight extraction from academic and clinical surveys.
            </p>
            <div className="pt-2 text-[11px] font-semibold text-amber-700 flex items-center gap-1">
              <span>Cronbach&apos;s alpha, Likert scaling &amp; MICE imputation</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div 
            onClick={() => onSelectView('statistics')}
            className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md cursor-pointer transition space-y-4 group"
          >
            <div className="w-11 h-11 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#0b3b70] group-hover:scale-110 transition-transform">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-[#0b3b70] transition-colors">
              Advanced Statistical Modeling
            </h3>
            <p className="text-xs text-slate-600 leading-normal">
              Hypothesis testing, ANOVA, multivariate regression, and G*Power sample size calculations.
            </p>
            <div className="pt-2 text-[11px] font-semibold text-[#0b3b70] flex items-center gap-1">
              <span>ANOVA, ANCOVA, Logistic Regression, G*Power</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. TRAINING & RESEARCH PROJECTS */}
      <section className="space-y-6">
        <div>
          <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
            Hands-on Capacity Building
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mt-1 leading-tight">
            Training &amp; Research Projects
          </h2>
          <p className="text-sm text-slate-600 font-medium mt-1">
            Equipping researchers with industry-standard computational tools and real project experience.
          </p>
        </div>

        {/* The Exact Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-sans text-xs uppercase tracking-wider">
                <th className="py-4 px-6 font-semibold">Program Length</th>
                <th className="py-4 px-6 font-semibold">Focus Area</th>
                <th className="py-4 px-6 font-semibold">Ideal For</th>
                <th className="py-4 px-6 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {TRAINING_PROGRAMS.map((prog) => (
                <tr
                  key={prog.id}
                  onClick={() => onSelectView('training')}
                  className="hover:bg-blue-50/40 cursor-pointer transition"
                >
                  <td className="py-5 px-6 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${prog.highlight ? 'bg-emerald-500' : 'bg-blue-600'}`} />
                      <strong className="text-slate-900 font-bold text-sm">
                        {prog.length}
                      </strong>
                      {prog.highlight && (
                        <span className="ml-2 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          Recommended
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-5 px-6 max-w-md text-slate-600 leading-relaxed font-normal">
                    {prog.focusArea}
                  </td>
                  <td className="py-5 px-6 text-slate-700 font-medium text-xs whitespace-nowrap">
                    <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200">
                      {prog.idealFor}
                    </span>
                  </td>
                  <td className="py-5 px-6 text-right whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenConsultation && onOpenConsultation(prog.id);
                      }}
                      className="px-4 py-2 rounded-lg bg-[#0b3b70] hover:bg-[#082e59] text-white text-xs font-semibold transition shadow-xs"
                    >
                      Enroll
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. ATOMISTIC & CELLULAR DATA EXPLORERS (Single-Cell, Spatial, Datasets) */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Underlying Multi-Omic Reference Atlases
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Interactive datasets, single-cell manifolds, and spatial tissue slices powering computational pipelines.
            </p>
          </div>
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 text-xs font-semibold transition shadow-xs"
          >
            <Search className="w-3.5 h-3.5 text-blue-600" />
            <span>Search Atlas Database</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => onSelectView('umap')}
            className="p-4 rounded-xl bg-slate-50/70 border border-slate-200 hover:border-blue-400 hover:bg-white text-left transition space-y-2 group shadow-xs"
          >
            <div className="flex items-center justify-between text-blue-600">
              <Radio className="w-4 h-4" />
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="font-bold text-slate-900 text-xs">Single-Cell UMAP Manifold</div>
            <div className="text-[11px] text-slate-500">14.8M+ cells with real-time gene expression heatmaps.</div>
          </button>

          <button
            onClick={() => onSelectView('spatial')}
            className="p-4 rounded-xl bg-slate-50/70 border border-slate-200 hover:border-purple-400 hover:bg-white text-left transition space-y-2 group shadow-xs"
          >
            <div className="flex items-center justify-between text-purple-600">
              <Layers className="w-4 h-4" />
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="font-bold text-slate-900 text-xs">Spatial Histology &amp; Transcriptomics</div>
            <div className="text-[11px] text-slate-500">Coronal brain tissue slice with DAPI channel controls.</div>
          </button>

          <button
            onClick={() => onSelectView('datasets')}
            className="p-4 rounded-xl bg-slate-50/70 border border-slate-200 hover:border-emerald-500 hover:bg-white text-left transition space-y-2 group shadow-xs"
          >
            <div className="flex items-center justify-between text-emerald-600">
              <Dna className="w-4 h-4" />
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="font-bold text-slate-900 text-xs">Open Access Repositories</div>
            <div className="text-[11px] text-slate-500">Download AnnData (.h5ad) and Seurat matrices with DOIs.</div>
          </button>
        </div>
      </section>
    </div>
  );
};
