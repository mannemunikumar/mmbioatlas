export interface MissionPillar {
  title: string;
  description: string;
  iconName: string;
  metrics: string;
}

export interface ValueItem {
  letter: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
}

export interface OrganizationActivity {
  id: string;
  title: string;
  category: 'cro' | 'genomics' | 'writing' | 'statistics' | 'training' | 'alliances' | 'csr' | 'quality';
  categoryLabel: string;
  tagline: string;
  description: string;
  highlights: string[];
  impactMetric: string;
  iconName: string;
}

export const ORGANIZATION_VISION = {
  statement:
    'To be a premier global benchmark in precision computational biology, translational in silico discovery, and life science research excellence.',
  strategicGoals: [
    {
      goal: 'Global Research Catalyst',
      desc: 'Accelerating discovery timelines for biotech startups, universities, and research institutes worldwide.',
    },
    {
      goal: 'Democratized Bio-Computing',
      desc: 'Providing high-performance GPU computing and cutting-edge bioinformatics infrastructure on demand.',
    },
    {
      goal: 'Next-Gen Scientific Talent',
      desc: 'Training and mentoring future computational biologists with hands-on, publication-focused project skills.',
    },
  ],
};

export const ORGANIZATION_MISSION = {
  statement:
    'Bridging computational biology with biomedical discoveries through reproducible contract research, publication excellence, and hands-on training.',
  pillars: [
    {
      title: 'Precision Contract Research (CRO)',
      description:
        'Delivering gold-standard molecular docking, atomistic MD simulations, and NGS pipelines for industry and academia.',
      iconName: 'Cpu',
      metrics: '500+ Molecular Targets Modeled',
    },
    {
      title: 'Academic Writing & Dissemination',
      description:
        'Supporting scholars with publication-grade manuscript development, systematic reviews, and rigorous statistical analysis.',
      iconName: 'BookOpen',
      metrics: '98% Journal Peer-Review Acceptance',
    },
    {
      title: 'Professional Training & Mentorship',
      description:
        'Empowering students and faculties with practical, project-based bio-computing skills on dedicated cloud Linux workstations.',
      iconName: 'GraduationCap',
      metrics: '1,200+ Scholars Trained & Mentored',
    },
  ] as MissionPillar[],
};

export const CORE_VALUES: ValueItem[] = [
  {
    letter: 'P',
    title: 'Precision',
    subtitle: 'Atomistic Fidelity',
    description:
      'Uncompromising computational accuracy across molecular docking, simulations, and statistical modeling.',
    color: 'from-blue-600 to-sky-600',
  },
  {
    letter: 'R',
    title: 'Reproducibility',
    subtitle: 'Open & Verifiable Science',
    description:
      'Fully documented workflows, parameter files, and verifiable scripts provided for every analysis.',
    color: 'from-teal-600 to-emerald-600',
  },
  {
    letter: 'I',
    title: 'Integrity',
    subtitle: 'Confidentiality & Ethics',
    description:
      'Strict intellectual property protection under NDAs with unwavering commitment to research ethics.',
    color: 'from-indigo-600 to-blue-700',
  },
  {
    letter: 'S',
    title: 'Scientific Rigor',
    subtitle: 'Peer-Validated Standards',
    description:
      'Computational methods strictly adhere to internationally recognized benchmarking standards.',
    color: 'from-amber-600 to-orange-600',
  },
  {
    letter: 'M',
    title: 'Mentorship',
    subtitle: 'Empowering Talent',
    description:
      'Dedicated one-on-one mentorship nurturing practical research competencies for every enrolled scholar.',
    color: 'from-cyan-600 to-teal-700',
  },
];

export const ORGANIZATIONAL_ACTIVITIES: OrganizationActivity[] = [
  {
    id: 'activity-cro-discovery',
    title: 'Contract Research (CRO) & In Silico Drug Discovery',
    category: 'cro',
    categoryLabel: 'Research & Discovery',
    tagline: 'High-throughput computational screening & atomistic biophysics',
    description:
      'End-to-end computational drug design from virtual compound screening to nanosecond-scale molecular dynamics and binding energy calculations.',
    highlights: [
      'Structure-based & ligand-based virtual screening with AutoDock Vina & Smina',
      '100ns to 500ns atomistic Molecular Dynamics (GROMACS) in explicit solvent',
      'Binding free energy decomposition via MM-PBSA and MM-GBSA protocols',
      'ADMET pharmacokinetic profiling & drug-likeness assessment (Lipinski, Veber)',
    ],
    impactMetric: 'Over 150,000+ compounds screened across 45 novel therapeutic targets',
    iconName: 'Cpu',
  },
  {
    id: 'activity-ngs-genomics',
    title: 'Next-Generation Sequencing (NGS) & Multi-Omics Analytics',
    category: 'genomics',
    categoryLabel: 'Genomic Science',
    tagline: 'From raw sequencing reads to biological pathway enrichment',
    description:
      'Standardized and custom bioinformatic pipelines for RNA-Seq, whole exome sequencing, and metagenomics yielding publication-grade figures.',
    highlights: [
      'Bulk & Single-cell RNA-Seq differential gene expression (DESeq2, EdgeR, Seurat)',
      '16S/18S & Metagenomic shotgun profiling for microbiome ecology & diversity',
      'Whole-Exome (WES) & Targeted sequencing variant calling (GATK Best Practices)',
      'Gene Ontology (GO), KEGG, and Reactome biological pathway enrichment analysis',
    ],
    impactMetric: 'Over 1,200+ raw sequencing runs analyzed with 99.8% QC alignment',
    iconName: 'Dna',
  },
  {
    id: 'activity-academic-writing',
    title: 'Scholarly Manuscript Development & Thesis Advisory',
    category: 'writing',
    categoryLabel: 'Academic Dissemination',
    tagline: 'Transforming scientific discoveries into high-impact publications',
    description:
      'Professional scientific writing support assisting researchers with manuscript drafting, thesis structuring, and journal peer-review rebuttals.',
    highlights: [
      'Original research manuscript drafting targeting Q1/Q2 indexed journals',
      'Master’s and Ph.D. dissertation synthesis with complete chapter structuring',
      'Systematic reviews and meta-analyses following PRISMA 2020 guidelines',
      'Journal peer-review rebuttal formulation and reviewer response matrices',
    ],
    impactMetric: 'Co-authored & supported papers in top journals (IF 3.5 to 14.2)',
    iconName: 'BookOpen',
  },
  {
    id: 'activity-biostatistics',
    title: 'Advanced Biostatistics & Experimental Modeling',
    category: 'statistics',
    categoryLabel: 'Data Science',
    tagline: 'Inferential statistical precision for life and social sciences',
    description:
      'Robust experimental design, sample size power calculations, and multivariate modeling translating raw data into verified conclusions.',
    highlights: [
      'Sample size & power calculations using G*Power for grant & trial approvals',
      'ANOVA, MANOVA, ANCOVA, and repeated-measures multivariate modeling',
      'Binary, multinomial, and ordinal logistic regression with odds ratio profiling',
      'Survival analysis (Kaplan-Meier log-rank tests, Cox proportional hazards)',
    ],
    impactMetric: 'Over 300+ experimental and clinical datasets modeled',
    iconName: 'BarChart3',
  },
  {
    id: 'activity-training-academy',
    title: 'Bioinformatics Research Academy & Fellowships',
    category: 'training',
    categoryLabel: 'Education & Capacity',
    tagline: 'Bridging classroom theory with real-world computational research',
    description:
      'Intensive 1-Month, 3-Month, and 6-Month cohort programs providing remote cloud Linux workstations, GPU access, and one-on-one doctoral mentorship.',
    highlights: [
      'Hands-on training in Linux Bash, Python (Biopython), R (Bioconductor), and PyMOL',
      'Individual cloud computing workstations pre-configured with industry software',
      'Live interactive mentor sessions with doctoral-level bioinformaticians',
      'Verified Certificate of Completion and project reference letters',
    ],
    impactMetric: '1,200+ alumni now placed in premier research institutes and biotech firms',
    iconName: 'GraduationCap',
  },
  {
    id: 'activity-academic-alliances',
    title: 'Global Academic Alliances & Institutional Consortia',
    category: 'alliances',
    categoryLabel: 'Institutional Partnerships',
    tagline: 'Collaborative research MoUs with universities and health institutes',
    description:
      'Institutional Memorandums of Understanding (MoUs) for joint research grant applications, faculty development programs, and laboratory computational support.',
    highlights: [
      'Institutional MoUs for joint computational biology R&D and co-supervision',
      'Co-investigator grant proposal drafting (DBT, ICMR, NIH, Wellcome Trust)',
      'Faculty Development Programs (FDP) & university symposium workshops',
      'External computing resource sharing for university laboratory departments',
    ],
    impactMetric: 'Active collaborations with 28+ higher education institutions',
    iconName: 'Users',
  },
  {
    id: 'activity-csr-community',
    title: 'Corporate Social Responsibility (CSR) & Open Science',
    category: 'csr',
    categoryLabel: 'CSR & Outreach',
    tagline: 'Democratizing computational biology for underrepresented scholars',
    description:
      'Dedicated community initiatives providing open-access bioinformatic toolkits, free educational workshops, and STEM scholarship subsidies.',
    highlights: [
      '"Bioinformatics for All": Free introductory command-line workshops for rural colleges',
      'Women in STEM Fellowships: Merit-based scholarship subsidies for female researchers',
      'Free open-access biological protocol repositories and curated educational guides',
      'Mentorship clinics for high-school biology students exploring bioinformatics careers',
    ],
    impactMetric: 'Over 2,500+ participants in free educational workshops and webinars',
    iconName: 'Sparkles',
  },
  {
    id: 'activity-quality-compliance',
    title: 'Quality Assurance, GLP Computing & Regulatory Ethics',
    category: 'quality',
    categoryLabel: 'Governance & Quality',
    tagline: 'Standardized workflows, strict IP protection, and data governance',
    description:
      'Good Laboratory Practice (GLP) in silico benchmarks, encrypted private server storage, strict NDAs, and full intellectual property transfer to clients.',
    highlights: [
      'Legally binding Non-Disclosure Agreements (NDA) executed for every engagement',
      '100% intellectual property (IP) assignment and source code handover to the client',
      'Internal dual-analyst cross-validation of simulation results before client delivery',
      'FAIR data compliance (Findable, Accessible, Interoperable, and Reusable)',
    ],
    impactMetric: '100% client data confidentiality track record with zero IP disputes',
    iconName: 'ShieldCheck',
  },
];

export const LEADERSHIP_CONTACT = {
  name: 'Dr. Manne Munikumar',
  credentials: 'MSc., PhD',
  designation: 'Director & Principal Scientist',
  affiliation: 'M & M BioATLAS Innovation Hub',
  phone: '+91 9492373997',
  phoneDisplay: '+ 91 9492373997',
  phoneRaw: '+919492373997',
  whatsappUrl: 'https://wa.me/919492373997',
  email: 'mmbioatlas@gmail.com',
  directEmail: 'mmbioatlas@gmail.com',
  institutionalEmail: 'research@mmbioatlas.org',
  academicEmail: 'academy@mmbioatlas.org',
  operatingHours: 'Mon - Sat (09:00 - 18:00 IST)',
  expertise: [
    'Molecular Docking & High-Throughput Virtual Screening',
    'Atomistic Molecular Dynamics Simulations (GROMACS)',
    'Next-Generation Sequencing (NGS) Transcriptomics',
    'Academic Manuscript & Grant Development',
    'Advanced Biostatistical Inference & Clinical Analytics'
  ],
  bio: 'Dr. Manne Munikumar, MSc., PhD, serves as the Director and Principal Scientist at M & M BioATLAS. Leading multi-disciplinary research initiatives across computational biophysics, structural biology, and translational bio-computing, Dr. Munikumar mentors global research fellows and directs in silico contract research projects for academic institutions and biotechnology partners worldwide.'
};

