import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  CheckCircle2, 
  Clock, 
  Building2, 
  ArrowRight, 
  Send, 
  SlidersHorizontal,
  ChevronDown,
  Filter
} from 'lucide-react';
import { PROJECTS_LIST, ProjectItem } from '../data/projectsData';
import { AtlasView } from '../types';

interface ProjectsPageProps {
  onSelectView: (view: AtlasView) => void;
  onOpenConsultation: (serviceCategory?: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  onSelectView,
  onOpenConsultation,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(PROJECTS_LIST[0].id);

  const categories = [
    { id: 'all', label: 'All Case Studies' },
    { id: 'drug-discovery', label: 'In Silico Drug Discovery' },
    { id: 'genomics', label: 'Genomics & Multi-Omics' },
    { id: 'publications', label: 'Academic Publications' },
    { id: 'statistics', label: 'Biostatistics & Trials' },
  ];

  const filteredProjects = PROJECTS_LIST.filter((proj) => {
    const matchesCategory = selectedCategory === 'all' || proj.category === selectedCategory;
    const matchesSearch = 
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.toolsUsed.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Hero Banner */}
      <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0c2340] via-[#0b2b4f] to-[#0c2340] border border-blue-900/40 text-white shadow-lg relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-sky-300 text-xs font-semibold">
            <Briefcase className="w-3.5 h-3.5 text-sky-400" />
            <span>Proven Scientific Execution</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight font-sans">
            Client Projects &amp;{' '}
            <span className="bg-gradient-to-r from-sky-300 via-cyan-200 to-teal-300 bg-clip-text text-transparent">
              Case Studies
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Examine real-world research deliverables executed across biotechnology firms, pharmaceutical innovators, clinical trial centers, and university research groups. Every project adheres strictly to reproducible pipelines, transparent timelines, and comprehensive data ownership handover.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
            <button
              onClick={() => onOpenConsultation('cro')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold text-xs sm:text-sm transition shadow-sm"
            >
              <Send className="w-4 h-4" />
              <span>Scope A Similar Project</span>
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('project-results');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm border border-white/20 transition"
            >
              <span>Explore Portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Ambient Decorative Accents */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-radial from-blue-400 to-transparent pointer-events-none" />
      </section>

      {/* Cumulative Metrics Strip */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
          <div className="text-xs font-bold text-blue-700 uppercase tracking-wider">Completed Projects</div>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">450+</div>
          <p className="text-[11px] text-slate-500">CRO simulations, RNA-Seq runs &amp; manuscripts</p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
          <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Client Retention</div>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">96%</div>
          <p className="text-[11px] text-slate-500">Repeat academic and biotech research partnerships</p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
          <div className="text-xs font-bold text-purple-700 uppercase tracking-wider">Average Turnaround</div>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">3.2 Wks</div>
          <p className="text-[11px] text-slate-500">Rapid execution without compromising rigor</p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
          <div className="text-xs font-bold text-amber-700 uppercase tracking-wider">IP Disputes</div>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">Zero</div>
          <p className="text-[11px] text-slate-500">100% intellectual property transferred to clients</p>
        </div>
      </section>

      {/* Filter and Search Controls */}
      <section className="space-y-6" id="project-results">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Featured Case Studies &amp; Research Portfolio
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Filter by biological discipline or search by computational method (e.g., GROMACS, RNA-Seq, DESeq2).
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search case studies &amp; tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 shadow-xs"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                selectedCategory === cat.id
                  ? 'bg-[#0b3b70] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects List with Expandable Deep Dive */}
        <div className="space-y-4">
          {filteredProjects.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
              <p className="text-slate-500 text-sm">No project case studies matched the filter criteria.</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="text-xs font-semibold text-[#0b3b70] underline"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            filteredProjects.map((project) => {
              const isExpanded = expandedProjectId === project.id;
              return (
                <div
                  key={project.id}
                  className="rounded-3xl bg-white border border-slate-200/90 hover:border-blue-400 transition shadow-xs overflow-hidden"
                >
                  {/* Card Header & Summary (Clickable to toggle) */}
                  <div
                    onClick={() => setExpandedProjectId(isExpanded ? null : project.id)}
                    className="p-6 sm:p-8 cursor-pointer flex flex-col lg:flex-row lg:items-center justify-between gap-4 select-none hover:bg-slate-50/50 transition"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0b3b70] border border-blue-200">
                          {project.categoryLabel}
                        </span>
                        <span className="flex items-center gap-1 text-slate-500 font-medium">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          <span>{project.clientType}</span>
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="flex items-center gap-1 text-slate-500 font-medium">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{project.duration}</span>
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                        {project.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-2">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Metrics and toggle button */}
                    <div className="flex items-center gap-6 shrink-0 pt-2 lg:pt-0">
                      <div className="hidden sm:flex items-center gap-4 border-l border-slate-200 pl-6">
                        {project.metrics.map((metric, idx) => (
                          <div key={idx} className="text-right">
                            <div className="text-base font-bold text-slate-900">{metric.value}</div>
                            <div className="text-[10px] text-slate-500 uppercase">{metric.label}</div>
                          </div>
                        ))}
                      </div>

                      <div className="p-2 rounded-xl bg-slate-100 text-slate-600">
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-blue-600' : ''}`} />
                      </div>
                    </div>
                  </div>

                  {/* Expanded Detail Panel */}
                  {isExpanded && (
                    <div className="p-6 sm:p-8 pt-0 border-t border-slate-100 bg-slate-50/60 space-y-6 animate-fadeIn">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                        {/* Challenge & Solution */}
                        <div className="space-y-4">
                          <div className="space-y-1.5">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                              Biological Challenge:
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-white p-4 rounded-2xl border border-slate-200/80">
                              {project.challenge}
                            </p>
                          </div>

                          <div className="space-y-1.5">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                              Computational Execution &amp; Solution:
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-white p-4 rounded-2xl border border-slate-200/80">
                              {project.solution}
                            </p>
                          </div>
                        </div>

                        {/* Outcomes & Tools */}
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                              Verified Deliverables &amp; Outcomes:
                            </h4>
                            <div className="space-y-2 bg-white p-4 rounded-2xl border border-slate-200/80">
                              {project.outcomes.map((outcome, idx) => (
                                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                  <span>{outcome}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                              Software Stack &amp; Protocols:
                            </h4>
                            <div className="flex flex-wrap items-center gap-1.5">
                              {project.toolsUsed.map((tool, idx) => (
                                <span
                                  key={idx}
                                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-mono text-slate-700 shadow-xs"
                                >
                                  {tool}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action footer */}
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200 text-xs">
                        <span className="text-slate-500">
                          Complete audit logs and trajectory coordinates were transferred to client upon final milestone.
                        </span>
                        <button
                          onClick={() => onOpenConsultation(project.category === 'publications' ? 'writing' : 'cro')}
                          className="px-4 py-2 rounded-xl bg-[#0b3b70] hover:bg-[#082e59] text-white font-semibold transition flex items-center gap-1.5 shrink-0"
                        >
                          <span>Request Similar Scope</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Propose a Project CTA */}
      <section className="p-8 sm:p-10 rounded-3xl bg-[#0b3b70] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-2 max-w-xl">
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
            Have a Complex Computational Biological Problem?
          </h3>
          <p className="text-xs sm:text-sm text-sky-200 leading-relaxed">
            From preliminary docking feasibility screens to multi-omics cohort analyses, M &amp; M BioATLAS engineers solutions to rigorous academic and regulatory standards.
          </p>
        </div>

        <button
          onClick={() => onOpenConsultation('cro')}
          className="px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-[#0b3b70] font-bold text-xs sm:text-sm transition shadow-sm shrink-0"
        >
          Submit Research Scope
        </button>
      </section>
    </div>
  );
};
