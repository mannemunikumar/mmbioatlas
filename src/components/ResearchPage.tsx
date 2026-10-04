import React, { useState } from 'react';
import { 
  BookOpen, 
  Dna, 
  Layers, 
  Cpu, 
  BarChart3, 
  Award, 
  ExternalLink, 
  CheckCircle2, 
  Globe2, 
  FileCheck2, 
  ArrowRight,
  Sparkles,
  Send,
  FlaskConical
} from 'lucide-react';
import { RESEARCH_THEMES, PUBLICATION_HIGHLIGHTS } from '../data/researchData';
import { AtlasView } from '../types';

interface ResearchPageProps {
  onSelectView: (view: AtlasView) => void;
  onOpenConsultation: (serviceCategory?: string) => void;
}

export const ResearchPage: React.FC<ResearchPageProps> = ({
  onSelectView,
  onOpenConsultation,
}) => {
  const [activeThemeId, setActiveThemeId] = useState<string>(RESEARCH_THEMES[0].id);

  const activeTheme = RESEARCH_THEMES.find((t) => t.id === activeThemeId) || RESEARCH_THEMES[0];

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Hero Banner */}
      <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#071d33] via-[#0b2b4f] to-[#071d33] border border-blue-900/40 text-white shadow-lg relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-sky-300 text-xs font-semibold">
            <FlaskConical className="w-3.5 h-3.5 text-sky-400" />
            <span>Academic Excellence &amp; Translational Discovery</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Scientific Research &amp;{' '}
            <span className="bg-gradient-to-r from-sky-300 via-teal-200 to-emerald-300 bg-clip-text text-transparent">
              Academic Publications
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            At M &amp; M BioATLAS, research operations bridge high-performance bio-computing with impactful biological validation. Investigations span atomistic biophysics, multi-omics biomarker mapping, antimicrobial resistance surveillance, and rigorous biostatistical modeling targeting top-tier peer-reviewed journals.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
            <button
              onClick={() => onOpenConsultation('writing')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold text-xs sm:text-sm transition shadow-sm"
            >
              <Send className="w-4 h-4" />
              <span>Propose Collaborative Research</span>
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('publications-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm border border-white/20 transition"
            >
              <span>View Published Papers</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Ambient Decorative Accents */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-radial from-teal-400 to-transparent pointer-events-none" />
      </section>

      {/* Research Impact Metrics */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
          <div className="text-xs font-bold text-blue-700 uppercase tracking-wider">Indexed Papers</div>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">120+</div>
          <p className="text-[11px] text-slate-500">Co-authored &amp; supported articles in Q1/Q2 journals</p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
          <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Top Impact Factor</div>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">14.7</div>
          <p className="text-[11px] text-slate-500">Publications in high-impact international journals</p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
          <div className="text-xs font-bold text-purple-700 uppercase tracking-wider">Simulation Trajectories</div>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">12+ μs</div>
          <p className="text-[11px] text-slate-500">Cumulative atomistic MD runtime completed</p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
          <div className="text-xs font-bold text-amber-700 uppercase tracking-wider">Grant Support</div>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">$3.2M+</div>
          <p className="text-[11px] text-slate-500">Collaborative research grant funding enabled</p>
        </div>
      </section>

      {/* Interactive Research Themes Explorer */}
      <section className="space-y-6">
        <div>
          <div className="text-xs font-semibold text-[#0b3b70] uppercase tracking-wider">
            Investigative Domains
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Core Research Domains &amp; Frontiers
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Explore active theoretical, atomistic, and genomic research tracks underway at M &amp; M BioATLAS.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Navigation list */}
          <div className="lg:col-span-4 space-y-2">
            {RESEARCH_THEMES.map((theme) => {
              const isSelected = activeTheme.id === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => setActiveThemeId(theme.id)}
                  className={`w-full text-left p-4 rounded-2xl transition border flex items-start gap-3.5 ${
                    isSelected
                      ? 'bg-[#0b3b70] text-white border-[#0b3b70] shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200/90 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                    isSelected ? 'bg-white/10 text-sky-300' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {theme.iconName === 'Cpu' && <Cpu className="w-5 h-5" />}
                    {theme.iconName === 'Layers' && <Layers className="w-5 h-5" />}
                    {theme.iconName === 'Dna' && <Dna className="w-5 h-5" />}
                    {theme.iconName === 'BarChart3' && <BarChart3 className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="text-sm font-bold leading-tight">{theme.title}</div>
                    <div className={`text-[11px] mt-1 line-clamp-1 ${
                      isSelected ? 'text-sky-200' : 'text-slate-500'
                    }`}>
                      {theme.tagline}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active theme details */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-[#0b3b70] border border-blue-200">
                Active Research Focus
              </span>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                {activeTheme.title}
              </h3>
              <p className="text-xs font-medium text-blue-700">
                {activeTheme.tagline}
              </p>
              <p className="text-sm text-slate-600 leading-relaxed pt-2">
                {activeTheme.description}
              </p>
            </div>

            {/* Key Topics List */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Key Methodological Priorities:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeTheme.keyTopics.map((topic, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benchmarks & Tools */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4 text-xs">
              <div>
                <span className="font-bold text-slate-800">Computational Standards: </span>
                <span className="text-slate-600">{activeTheme.benchmarks}</span>
              </div>
              <button
                onClick={() => onSelectView('cro-services')}
                className="text-xs font-semibold text-[#0b3b70] hover:text-blue-900 flex items-center gap-1 shrink-0"
              >
                <span>Interactive Tool</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Representative Publications */}
      <section className="space-y-6" id="publications-section">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-[#0b3b70] uppercase tracking-wider">
              Scholarly Dissemination
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Representative Peer-Reviewed Publications
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Selected journal articles demonstrating atomistic simulation precision, transcriptomic pipelines, and biostatistical rigor.
            </p>
          </div>

          <button
            onClick={() => onSelectView('academic-writing')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition self-start sm:self-auto"
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>Manuscript Writing Support</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PUBLICATION_HIGHLIGHTS.map((pub) => (
            <div
              key={pub.id}
              className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0b3b70] border border-blue-200">
                    {pub.area}
                  </span>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {pub.quartile}
                    </span>
                    <span className="text-slate-500 font-medium">IF: {pub.impactFactor}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {pub.title}
                </h3>

                <div className="text-xs text-slate-600 font-medium">
                  Published in <span className="font-bold text-slate-800">{pub.journal}</span> ({pub.year})
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="font-mono text-[11px] text-slate-400">DOI: {pub.doiPlaceholder}</span>
                <span className="flex items-center gap-1 text-blue-600 font-medium cursor-pointer hover:underline">
                  <span>Open Access</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Grant & Institutional Consortia Support */}
      <section className="p-8 sm:p-10 rounded-3xl bg-slate-100/80 border border-slate-200 space-y-6">
        <div className="max-w-2xl space-y-2">
          <div className="text-xs font-semibold text-[#0b3b70] uppercase tracking-wider">
            Grant Formulation &amp; Consortia
          </div>
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
            Research Grant Partnership &amp; MoUs
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            M &amp; M BioATLAS co-applies as computational biology industry partners on national and international research grants (DBT, ICMR, DST, NIH, and Horizon Europe), supplying in silico modeling sections, G*Power statistical justification, and cloud data architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 space-y-1.5">
            <div className="text-xs font-bold text-slate-900">Pre-Grant Preliminary Data</div>
            <p className="text-[11px] text-slate-500">
              Generating pilot docking scores, RMSD stability graphs, and sample size calculations for grant applications.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 space-y-1.5">
            <div className="text-xs font-bold text-slate-900">Institutional MoUs</div>
            <p className="text-[11px] text-slate-500">
              Formal memorandums of understanding with universities to support postgraduate dissertation research.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 space-y-1.5">
            <div className="text-xs font-bold text-slate-900">Dedicated Project Teams</div>
            <p className="text-[11px] text-slate-500">
              Assigned Ph.D.-level bioinformaticians embedded with laboratory PIs to analyze data in real time.
            </p>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={() => onOpenConsultation('cro')}
            className="px-5 py-2.5 rounded-xl bg-[#0b3b70] hover:bg-[#082e59] text-white text-xs font-semibold transition shadow-xs flex items-center gap-2"
          >
            <span>Inquire About Institutional MoUs &amp; Grant Partnerships</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
};
