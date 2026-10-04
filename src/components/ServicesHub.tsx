import React, { useState } from 'react';
import { 
  Cpu, 
  Dna, 
  BookOpen, 
  BarChart3, 
  GraduationCap, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  FileText, 
  Zap, 
  Layers,
  ChevronRight,
  Send,
  HelpCircle
} from 'lucide-react';
import { AtlasView } from '../types';
import { HeroScientificPlate } from './DynamicScientificFigures';

interface ServicesHubProps {
  onSelectView: (view: AtlasView) => void;
  onOpenConsultation: (serviceCategory?: string) => void;
}

export const ServicesHub: React.FC<ServicesHubProps> = ({
  onSelectView,
  onOpenConsultation,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'cro', label: 'CRO & Drug Discovery' },
    { id: 'genomics', label: 'NGS & Genomics' },
    { id: 'writing', label: 'Academic Writing' },
    { id: 'statistics', label: 'Biostatistics' },
    { id: 'training', label: 'Training & Academy' },
  ];

  const services = [
    {
      id: 'serv-docking-md',
      category: 'cro',
      title: 'In Silico Drug Discovery & Molecular Dynamics',
      tagline: 'High-throughput virtual screening, atomistic simulations, and binding energy calculations',
      description:
        'End-to-end computational drug design from target preparation to nanosecond-scale molecular dynamics. Screening of 150,000+ small molecules, peptide-protein interactions, and thermodynamic decomposition.',
      targetView: 'cro-services' as AtlasView,
      icon: <Cpu className="w-6 h-6 text-blue-600" />,
      turnaround: '2 - 4 Weeks',
      deliverables: [
        'Curated top-binding docking pose coordinates (PDB/PDBQT)',
        '100ns–500ns solvated GROMACS simulation trajectories (RMSD, RMSF, Rg, SASA)',
        'MM-PBSA / MM-GBSA binding free energy decomposition',
        'SwissADME pharmacokinetic profiling and drug-likeness radar graphs',
      ],
      sop: 'Compliant with CHARMM36m and AMBER14SB force field benchmarks',
      ctaLabel: 'Launch CRO Simulation Workbench',
    },
    {
      id: 'serv-ngs-genomics',
      category: 'genomics',
      title: 'Next-Generation Sequencing (NGS) & Multi-Omics Pipelines',
      tagline: 'RNA-Seq, whole exome sequencing, metagenomics, and single-cell deconvolution',
      description:
        'Comprehensive bioinformatic processing from raw FASTQ reads to biological insight. Differential expression profiling, pathway enrichment analyses, and multi-sample cohort comparisons.',
      targetView: 'cro-services' as AtlasView,
      icon: <Dna className="w-6 h-6 text-emerald-600" />,
      turnaround: '1 - 3 Weeks',
      deliverables: [
        'Splice-aware read alignment (STAR/HISAT2) and FastQC quality reports',
        'Differential expression testing using DESeq2 and EdgeR',
        'Gene Ontology (GO), KEGG, and Reactome pathway enrichment maps',
        'Interactive 300+ DPI volcano plots, heatmaps, and PCA dispersion clusters',
      ],
      sop: 'Adhering to GATK Best Practices and FAIR data management standards',
      ctaLabel: 'Explore Genomic Pipelines',
    },
    {
      id: 'serv-academic-writing',
      category: 'writing',
      title: 'Scholarly Manuscript Development & Thesis Advisory',
      tagline: 'Publishing support for Q1/Q2 indexed journals, dissertations, and peer-review rebuttals',
      description:
        'Professional scientific communication assisting faculties, doctoral candidates, and clinicians. Transform raw laboratory data and computational findings into high-impact manuscripts with strict plagiarism and ICMJE compliance.',
      targetView: 'academic-writing' as AtlasView,
      icon: <BookOpen className="w-6 h-6 text-sky-600" />,
      turnaround: '3 - 5 Weeks',
      deliverables: [
        'Complete original research manuscript drafting formatted for target journal',
        'Master’s and Ph.D. dissertation chapter synthesis and literature synthesis',
        'PRISMA 2020 compliant systematic review & meta-analysis execution',
        'Point-by-point reviewer rebuttal matrices for journal resubmissions',
      ],
      sop: '100% human scientific review with Turnitin similarity under 10%',
      ctaLabel: 'Open Manuscript Drafting Suite',
    },
    {
      id: 'serv-biostatistics',
      category: 'statistics',
      title: 'Advanced Biostatistics & Clinical Trial Modeling',
      tagline: 'Parametric inference, G*Power sample size calculations, and epidemiological modeling',
      description:
        'Rigorous mathematical modeling for preclinical studies, survey research, and clinical trials. Ensuring institutional review board (IRB) statistical approval and robust multivariate inference.',
      targetView: 'statistics' as AtlasView,
      icon: <BarChart3 className="w-6 h-6 text-amber-600" />,
      turnaround: '1 - 2 Weeks',
      deliverables: [
        'A priori sample size and statistical power calculations using G*Power 3.1',
        'ANOVA, MANOVA, ANCOVA, and repeated measures modeling',
        'Logistic, linear, and Cox proportional hazards survival regressions',
        'Cronbach’s alpha questionnaire reliability and exploratory factor analysis (EFA)',
      ],
      sop: 'Executed with audited R scripts, SPSS, and GraphPad Prism reports',
      ctaLabel: 'Open Biostatistics Workbench',
    },
    {
      id: 'serv-training-academy',
      category: 'training',
      title: 'Bioinformatics Research Academy & Fellowships',
      tagline: '1-Month, 3-Month, and 6-Month hands-on project cohorts with cloud Linux access',
      description:
        'Bridging the talent gap in computational life sciences. Students, postgraduates, and researchers receive 1-on-1 mentorship, individual cloud GPU compute instances, and publication-ready thesis deliverables.',
      targetView: 'training' as AtlasView,
      icon: <GraduationCap className="w-6 h-6 text-purple-600" />,
      turnaround: 'Cohort Schedules: Monthly Intakes',
      deliverables: [
        'Dedicated high-performance Linux cloud terminal access with pre-installed software',
        'Independent guided project execution with tangible research paper drafts',
        'Verified institutional training completion credentials with unique verification IDs',
        'Direct 1-on-1 weekly mentorship sessions with senior computational scientists',
      ],
      sop: 'Real-world project deliverables with real multi-omic datasets',
      ctaLabel: 'View Training Syllabus & Enroll',
    },
    {
      id: 'serv-custom-pipelines',
      category: 'cro',
      title: 'Custom Bioinformatic Workflows & High-Throughput Automation',
      tagline: 'Nextflow & Snakemake containerized pipelines tailored for institutional consortia',
      description:
        'Engineering automated bio-computing pipelines for biotechnology labs, diagnostic companies, and university departments requiring high-throughput computational execution.',
      targetView: 'rd' as AtlasView,
      icon: <Layers className="w-6 h-6 text-teal-600" />,
      turnaround: 'Custom Timeline',
      deliverables: [
        'Containerized Nextflow DSL2 / Docker reproducible pipelines',
        'Multi-node HPC job automation with SLURM scheduler integration',
        'Cloud storage integration with AWS S3 / Google Cloud Storage',
        'Complete documentation, unit tests, and source code transfer',
      ],
      sop: '100% intellectual property (IP) assignment to the client',
      ctaLabel: 'Learn More in R&D Division',
    },
  ];

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(s => s.category === selectedCategory);

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Header Banner */}
      <section className="p-8 sm:p-12 lg:p-14 rounded-3xl bg-gradient-to-br from-slate-900 via-[#0b2b4f] to-slate-900 border border-slate-800 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-sky-300 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5 text-sky-400" />
              <span>Comprehensive Scientific Solutions</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
              Scientific Services &amp;{' '}
              <span className="bg-gradient-to-r from-sky-300 via-cyan-200 to-teal-300 bg-clip-text text-transparent">
                Contract Research
              </span>
            </h1>

            <p className="text-base sm:text-xl text-slate-300 leading-normal font-normal">
              End-to-end computational biology solutions, molecular dynamics simulations, NGS pipelines, and academic publishing support.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
              <button
                onClick={() => onOpenConsultation('cro')}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold text-xs sm:text-sm transition shadow-sm"
              >
                <Send className="w-4 h-4" />
                <span>Request Project Scoping &amp; Quote</span>
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('services-grid');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm border border-white/20 transition"
              >
                <span>Explore All 6 Core Divisions</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 w-full">
            <HeroScientificPlate />
          </div>
        </div>

        {/* Ambient Decorative Accents */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-radial from-sky-400 to-transparent pointer-events-none" />
      </section>

      {/* Trust & Compliance Bar */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">100% Confidential</div>
            <div className="text-[11px] text-slate-500">Mutual NDA executed before data exchange</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">GLP &amp; FAIR Standards</div>
            <div className="text-[11px] text-slate-500">Reproducible script-based execution</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">Rapid Turnaround</div>
            <div className="text-[11px] text-slate-500">Dedicated compute nodes for fast delivery</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">Full IP Ownership</div>
            <div className="text-[11px] text-slate-500">100% intellectual property transferred to client</div>
          </div>
        </div>
      </section>

      {/* Category Filter Tabs */}
      <section className="space-y-4" id="services-grid">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Service Directory
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Select a category to view specialized protocols, deliverables, and interactive workbenches.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  selectedCategory === cat.id
                    ? 'bg-white text-[#0b3b70] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Detailed Service Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    {service.icon}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>{service.turnaround}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                    {service.title}
                  </h3>
                  <div className="text-xs font-medium text-blue-700 mt-1">
                    {service.tagline}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2.5">
                    {service.description}
                  </p>
                </div>

                {/* Deliverables List */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Standard Deliverables:
                  </div>
                  <ul className="space-y-1.5">
                    {service.deliverables.map((deliv, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-[11px] text-slate-500 italic bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="font-semibold text-slate-700">Protocol Standard: </span>
                  {service.sop}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => onSelectView(service.targetView)}
                  className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0b3b70] hover:bg-[#082e59] text-white text-xs font-semibold transition shadow-xs"
                >
                  <span>{service.ctaLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onOpenConsultation(service.category)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
                >
                  Request Quote
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Engagement Workflow */}
      <section className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
        <div>
          <div className="text-xs font-semibold text-[#0b3b70] uppercase tracking-wider">
            Execution Lifecycle
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
            How The Engagement Process Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Transparent, audit-trailed project milestones from initial discovery to final publication-ready delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <span className="text-xs font-bold text-blue-700">Stage 01</span>
            <div className="text-sm font-bold text-slate-900">Project Scoping &amp; NDA</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Confidential consultation to review biological hypotheses, input data, and target timelines under a formal NDA.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <span className="text-xs font-bold text-emerald-700">Stage 02</span>
            <div className="text-sm font-bold text-slate-900">Computational Execution</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              High-throughput screening, GROMACS MD simulations, RNA-Seq differential expression, or statistical modeling on HPC nodes.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <span className="text-xs font-bold text-purple-700">Stage 03</span>
            <div className="text-sm font-bold text-slate-900">Dual-Analyst Review</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Internal cross-validation of results, quality audits, energy minimization verifications, and figure rendering.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <span className="text-xs font-bold text-amber-700">Stage 04</span>
            <div className="text-sm font-bold text-slate-900">Final Handover &amp; Defense</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Complete delivery of raw data, scripts, high-res figures, methodology texts, and ongoing post-delivery revision support.
            </p>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="p-8 sm:p-10 rounded-3xl bg-[#0b3b70] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-2 max-w-xl">
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
            Ready to Scope a Research Project or Training Cohort?
          </h3>
          <p className="text-xs sm:text-sm text-sky-200 leading-relaxed">
            Connect with a senior computational scientist to receive a detailed technical roadmap, budget estimate, and execution schedule within 24 hours.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onOpenConsultation('cro')}
            className="px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-[#0b3b70] font-bold text-xs sm:text-sm transition shadow-sm"
          >
            Initiate Consultation
          </button>
          <button
            onClick={() => onSelectView('contact')}
            className="px-6 py-3 rounded-xl bg-blue-900/60 hover:bg-blue-900/80 text-white font-semibold text-xs sm:text-sm border border-blue-400/30 transition"
          >
            Contact Information
          </button>
        </div>
      </section>
    </div>
  );
};
