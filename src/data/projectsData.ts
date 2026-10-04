export interface ProjectItem {
  id: string;
  title: string;
  category: 'drug-discovery' | 'genomics' | 'publications' | 'statistics';
  categoryLabel: string;
  tagline: string;
  clientType: 'Pharmaceutical' | 'Biotechnology' | 'Academic University' | 'Clinical Research Center';
  duration: string;
  toolsUsed: string[];
  challenge: string;
  solution: string;
  outcomes: string[];
  metrics: { label: string; value: string }[];
  featured?: boolean;
}

export const PROJECTS_LIST: ProjectItem[] = [
  {
    id: 'proj-kinase-oncology',
    title: 'Structure-Based Virtual Screening for Dual EGFR/HER2 Kinase Inhibitors',
    category: 'drug-discovery',
    categoryLabel: 'In Silico Drug Discovery',
    tagline: 'High-throughput docking & 300ns atomistic MD simulations for non-small cell lung cancer',
    clientType: 'Biotechnology',
    duration: '6 Weeks',
    toolsUsed: ['AutoDock Vina', 'GROMACS', 'PyMOL', 'SwissADME', 'MM-PBSA'],
    challenge:
      'Identifying novel non-covalent small molecule scaffolds with nanomolar affinity to overcome T790M/C797S resistance mutations in EGFR.',
    solution:
      'Screened a curated library of 180,000 diverse synthetic and natural compounds, filtered by Lipinski and Veber drug-likeness rules, followed by ensemble docking into crystal structure 4ZAU and 300ns solvated Molecular Dynamics trajectories.',
    outcomes: [
      'Identified 6 lead candidates with predicted binding energies below -10.4 kcal/mol',
      'Demonstrated continuous root-mean-square deviation (RMSD < 1.8 Å) across 300ns trajectory',
      'Validated low hepatotoxicity and optimal blood-brain barrier permeability profiles',
    ],
    metrics: [
      { label: 'Compounds Screened', value: '180,000+' },
      { label: 'MD Trajectory', value: '300 ns' },
      { label: 'Lead Scaffolds', value: '6 Validated' },
    ],
    featured: true,
  },
  {
    id: 'proj-alzheimers-rnaseq',
    title: 'Single-Cell & Bulk RNA-Seq Multi-Omic Profiling in Neurodegeneration',
    category: 'genomics',
    categoryLabel: 'NGS & Multi-Omics',
    tagline: 'Differential gene expression and pathway enrichment mapping in microglial activation',
    clientType: 'Academic University',
    duration: '4 Weeks',
    toolsUsed: ['FastQC', 'STAR Align', 'DESeq2', 'Seurat v4', 'ClusterProfiler', 'Cytoscape'],
    challenge:
      'Unraveling heterogenous microglial phenotypic transitions between homeostatic and neurodegenerative states from 24 human post-mortem brain biopsies.',
    solution:
      'Executed full-stack read trimming, splice-aware genome alignment to GRCh38, Wald statistical testing for differential expression, and Gene Ontology/KEGG functional interaction networks.',
    outcomes: [
      'Characterized 4 distinct microglial subpopulations with differential TREM2 and APOE axes',
      'Generated 300+ DPI publication-grade volcano plots, complex heatmaps, and circos diagrams',
      'Co-authored findings accepted in a Q1 neurobiology journal with high impact factor',
    ],
    metrics: [
      { label: 'Raw Reads QC', value: '1.4B Reads' },
      { label: 'Cell Manifolds', value: '42,000 Cells' },
      { label: 'Significant Genes', value: '384 DEGs' },
    ],
    featured: true,
  },
  {
    id: 'proj-covid-mpro-dynamics',
    title: 'MM-PBSA Binding Free Energy Deconstruction of Viral Protease Targets',
    category: 'drug-discovery',
    categoryLabel: 'Molecular Simulations',
    tagline: 'Thermodynamic profiling of repurposed protease inhibitors against SARS-CoV-2 Mpro',
    clientType: 'Pharmaceutical',
    duration: '3 Weeks',
    toolsUsed: ['GROMACS 2023', 'CHARMM36m', 'g_mmpbsa', 'Grace', 'VMD'],
    challenge:
      'Elucidating the per-residue thermodynamic contributions and hydrogen-bond persistence of candidate peptidomimetic inhibitors at the catalytic dyad (His41-Cys145).',
    solution:
      'Conducted triplicate 150ns atomistic simulations in explicit TIP3P water boxes with physiological salt concentration, computing electrostatic, van der Waals, and polar solvation free energy terms.',
    outcomes: [
      'Pinpointed critical salt-bridge stabilizers at Glu166 and Gln189 residues',
      'Demonstrated persistent occupancy (> 85%) of primary pharmacophore hydrogen bonds',
      'Delivered full audit-trailed trajectory coordinates and trajectory movies',
    ],
    metrics: [
      { label: 'Triplicate Runs', value: '3 x 150 ns' },
      { label: 'Binding ΔG', value: '-48.2 kJ/mol' },
      { label: 'Dyad Stability', value: '98.4%' },
    ],
    featured: false,
  },
  {
    id: 'proj-oncology-q1-manuscript',
    title: 'Q1 Manuscript Development & Journal Reviewer Rebuttal Strategy',
    category: 'publications',
    categoryLabel: 'Academic Dissemination',
    tagline: 'End-to-end scientific drafting, statistical re-modeling, and high-impact publishing',
    clientType: 'Clinical Research Center',
    duration: '5 Weeks',
    toolsUsed: ['LaTeX', 'ICMJE Guidelines', 'PRISMA 2020', 'R Studio', 'Illustrator'],
    challenge:
      'A multi-center oncology trial faced major revisions in a Tier-1 medical journal due to unaddressed covariate confounding and insufficient graphical representation.',
    solution:
      'Restructured the manuscript introduction and discussion, implemented Cox proportional hazard regression adjustments, and synthesized 6 multi-panel vector figures.',
    outcomes: [
      'Formulated a point-by-point 18-page peer-review rebuttal matrix addressing all 4 reviewers',
      'Accepted without additional laboratory experimental cycles within 21 days of resubmission',
      'Published open-access with full data availability compliance',
    ],
    metrics: [
      { label: 'Target Journal IF', value: '8.6 (Q1)' },
      { label: 'Reviewer Concerns', value: '28 Resolved' },
      { label: 'Acceptance Speed', value: '21 Days' },
    ],
    featured: true,
  },
  {
    id: 'proj-gut-microbiome-metagenome',
    title: 'Shotgun Metagenomic Profiling of Gut Microbial Biomarkers in Type-2 Diabetes',
    category: 'genomics',
    categoryLabel: 'Microbiome Analytics',
    tagline: 'Taxonomic abundance profiling and functional pathway metabolic reconstructions',
    clientType: 'Clinical Research Center',
    duration: '4 Weeks',
    toolsUsed: ['KneadData', 'MetaPhlAn 4', 'HUMAnN 3', 'LEfSe', 'QIIME 2'],
    challenge:
      'Differentiating microbial strain compositions and short-chain fatty acid (SCFA) synthesis capacities between metformin-treated and naive cohorts.',
    solution:
      'Processed 80 paired-end Illumina NovaSeq FASTQ libraries through quality trimming, host decontamination, taxonomic clade stratification, and pathway abundance mapping.',
    outcomes: [
      'Identified 14 protective biomarker taxa with statistically significant enrichment',
      'Reconstructed butyrate synthesis pathway downregulation in dysbiotic subgroups',
      'Delivered interactive biom-formatted tables and stratified taxonomic sunburst plots',
    ],
    metrics: [
      { label: 'Clinical Samples', value: '80 Cohorts' },
      { label: 'Identified Taxa', value: '620 Species' },
      { label: 'Pathway Modules', value: '142 Reconstructed' },
    ],
    featured: false,
  },
  {
    id: 'proj-gpower-clinical-trial',
    title: 'Multivariate Clinical Trial Sample Size Calculation & G*Power Modeling',
    category: 'statistics',
    categoryLabel: 'Advanced Biostatistics',
    tagline: 'Institutional Review Board (IRB) statistical defense and power protocol design',
    clientType: 'Academic University',
    duration: '2 Weeks',
    toolsUsed: ['G*Power 3.1', 'R stats', 'SPSS 29', 'GraphPad Prism'],
    challenge:
      'Designing an appropriately powered randomized controlled trial (RCT) protocol with repeated measures across 4 treatment arms with planned attrition.',
    solution:
      'Conducted a priori power analyses targeting 90% statistical power (1-β = 0.90) at α = 0.01 with effect size estimates derived from pilot baseline variances.',
    outcomes: [
      'Secured swift IRB and ethics committee approval on first submission',
      'Calculated required sample size of N = 128 accounting for 15% estimated dropout rate',
      'Supplied complete statistical methodology section with pre-specified ANOVA analysis plan',
    ],
    metrics: [
      { label: 'Statistical Power', value: '90% (β=0.10)' },
      { label: 'Target Sample', value: 'N = 128' },
      { label: 'IRB Approval', value: '1st Review' },
    ],
    featured: false,
  },
];
