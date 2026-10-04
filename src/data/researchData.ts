export interface ResearchTheme {
  id: string;
  title: string;
  tagline: string;
  description: string;
  keyTopics: string[];
  benchmarks: string;
  iconName: string;
}

export interface PublicationHighlight {
  id: string;
  title: string;
  journal: string;
  impactFactor: string;
  quartile: string;
  year: string;
  area: string;
  doiPlaceholder: string;
}

export const RESEARCH_THEMES: ResearchTheme[] = [
  {
    id: 'theme-structural-biophysics',
    title: 'Atomistic Molecular Biophysics & Allosteric Signaling',
    tagline: 'Deciphering conformational landscapes and cryptic allosteric pockets',
    description:
      'Investigating dynamic conformational switches in oncogenic kinases, GPCRs, and viral proteases through microsecond-scale atomistic simulations, accelerated molecular dynamics, and cross-correlation matrix evaluations.',
    keyTopics: [
      'Cryptic pocket identification via cosolvent MD simulations',
      'Allosteric communication network mapping (Dynamut & Bio3D)',
      'Free energy perturbation (FEP) and alchemical transformation pipelines',
      'Membrane-protein dynamics in explicit lipid bilayer assemblies',
    ],
    benchmarks: 'GROMACS 2023, CHARMM36m force fields, AmberTools 23, Plumed enhanced sampling',
    iconName: 'Cpu',
  },
  {
    id: 'theme-single-cell-transcriptomics',
    title: 'High-Resolution Single-Cell & Spatial Omics',
    tagline: 'Deconvoluting cellular heterogeneity across diseased tissue microenvironments',
    description:
      'Developing computational pipelines for 10x Genomics, Smart-seq, and spatial transcriptomics to uncover cell lineage trajectories, immune infiltration states, and intercellular ligand-receptor crosstalk.',
    keyTopics: [
      'Unsupervised graph clustering and UMAP non-linear manifold projection',
      'Pseudotime trajectory inference (Monocle 3, Slingshot)',
      'Spatial tissue deconvolution and spot-level cell type mapping',
      'Intercellular communication network discovery (CellChat, NicheNet)',
    ],
    benchmarks: 'Seurat v4/v5, Scanpy, Bioconductor, Harmony batch correction',
    iconName: 'Layers',
  },
  {
    id: 'theme-antimicrobial-genomics',
    title: 'Pathogen Metagenomics & Antimicrobial Resistance (AMR)',
    tagline: 'Surveillance of resistomes, mobilomes, and microbial community shifts',
    description:
      'Applying whole-genome sequencing (WGS) and shotgun metagenomics to track plasmid-mediated resistance transmission, virulence determinants, and dysbiotic microbial shifts in clinical and environmental biomes.',
    keyTopics: [
      'Resistome annotation with CARD, ResFinder, and MEGARes databases',
      'Plasmid reconstruction and horizontal gene transfer tracking',
      'High-resolution metagenomic taxonomic classification (Kraken2, Bracken)',
      'Microbial metabolic pathway deconvolution (HUMAnN 3)',
    ],
    benchmarks: 'CARD RGI, SPAdes metagenomic assembly, CheckM genome completeness',
    iconName: 'Dna',
  },
  {
    id: 'theme-biostatistics-epidemiology',
    title: 'Mathematical Biostatistics & Epidemiological Modeling',
    tagline: 'Robust parametric inference, machine learning classifiers, and survival analytics',
    description:
      'Engineering sound experimental designs, survival hazard assessments, and clinical trial sample size models that safeguard against type-I errors and publication bias.',
    keyTopics: [
      'Kaplan-Meier survival estimation and multivariable Cox proportional hazards',
      'Propensity score matching for observational cohort studies',
      'Generalized additive models (GAM) and repeated measures ANOVA',
      'PRISMA 2020 systematic review meta-analysis with funnel plot bias audits',
    ],
    benchmarks: 'R stats, survival package, metafor, G*Power 3.1, SAS-compliant scripts',
    iconName: 'BarChart3',
  },
];

export const PUBLICATION_HIGHLIGHTS: PublicationHighlight[] = [
  {
    id: 'pub-1',
    title: 'Atomistic Insights into Allosteric Modulation of Oncogenic Kinases: A Comparative Molecular Dynamics and MM-PBSA Study',
    journal: 'Journal of Medicinal Chemistry',
    impactFactor: '7.8',
    quartile: 'Q1',
    year: '2024',
    area: 'In Silico Drug Discovery',
    doiPlaceholder: '10.1021/acs.jmedchem.example01',
  },
  {
    id: 'pub-2',
    title: 'Single-Cell Transcriptomic Atlas Reveals Spatiotemporal Dynamics of Microglial Substates in Neurodegenerative Pathology',
    journal: 'Nature Communications (Computational Biology)',
    impactFactor: '14.7',
    quartile: 'Q1',
    year: '2023',
    area: 'Single-Cell Genomics',
    doiPlaceholder: '10.1038/s41467-example02',
  },
  {
    id: 'pub-3',
    title: 'Metagenomic Profiling of Gut Resistome Alterations in Multi-Drug Resistant Enteric Pathogens Across Clinical Cohorts',
    journal: 'Frontiers in Cellular and Infection Microbiology',
    impactFactor: '5.7',
    quartile: 'Q1',
    year: '2024',
    area: 'Microbiome & AMR',
    doiPlaceholder: '10.3389/fcimb.example03',
  },
  {
    id: 'pub-4',
    title: 'Rigorous Parametric and Survival Hazard Modeling in Phase-II Oncology Trial Protocols: Mitigating Attrition Bias',
    journal: 'BMC Medical Research Methodology',
    impactFactor: '4.2',
    quartile: 'Q1',
    year: '2023',
    area: 'Biostatistics',
    doiPlaceholder: '10.1186/s12874-example04',
  },
];
