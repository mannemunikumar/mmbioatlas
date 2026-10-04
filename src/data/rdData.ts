export interface RdPipeline {
  id: string;
  name: string;
  codename: string;
  stage: 'Production Benchmark' | 'Active Optimization' | 'Beta Testing' | 'Validation';
  category: 'Molecular Modeling' | 'Genomics Automation' | 'Statistical Inference' | 'AI Drug Discovery';
  description: string;
  coreInnovation: string;
  speedupMetric: string;
  technologyStack: string[];
}

export const RD_PIPELINES: RdPipeline[] = [
  {
    id: 'rd-atlasdock',
    name: 'AtlasDock-AI Multi-Conformer Pre-Filter',
    codename: 'AD-v2.4',
    stage: 'Production Benchmark',
    category: 'AI Drug Discovery',
    description:
      'A machine-learning-assisted scoring filter that pre-evaluates millions of ligand conformers before rigid and flexible receptor docking.',
    coreInnovation:
      'Reduces false-positive binding poses by 42% through graph-neural-network (GNN) interaction energy feature vectors.',
    speedupMetric: '5.8x faster screening',
    technologyStack: ['PyTorch', 'AutoDock Vina', 'RDKit', 'OpenBabel', 'CUDA 12.2'],
  },
  {
    id: 'rd-gromacs-auto',
    name: 'BioATLAS Automated Solvated MD Engine',
    codename: 'MD-Engine-3.0',
    stage: 'Production Benchmark',
    category: 'Molecular Modeling',
    description:
      'End-to-end automated topology generation, solvent box ionization, energy minimization, NVT/NPT equilibration, and production MD simulation with built-in trajectory QC.',
    coreInnovation:
      'Zero manual file intervention from PDB upload to 100ns trajectory plots with automatic residue protonation state detection.',
    speedupMetric: '80% time reduction in MD setup',
    technologyStack: ['GROMACS 2023', 'CHARMM-GUI API', 'Python 3.11', 'Bash Linux HPC'],
  },
  {
    id: 'rd-ngs-stream',
    name: 'RapidOmics Nextflow Automated RNA-Seq Pipeline',
    codename: 'RO-v4.1',
    stage: 'Active Optimization',
    category: 'Genomics Automation',
    description:
      'Containerized Nextflow DSL2 orchestration covering raw read trimming, splice-aware alignment, transcript quantification, and DESeq2 differential analysis.',
    coreInnovation:
      'Reproducible Docker/Singularity images compliant with FAIR data principles and automatic multi-sample quality control reports.',
    speedupMetric: 'Analyzes 24 samples in under 3 hours',
    technologyStack: ['Nextflow', 'STAR', 'Salmon', 'DESeq2', 'Singularity', 'MultiQC'],
  },
  {
    id: 'rd-statbio',
    name: 'StatBio-Inference Automated Power & Model Selection',
    codename: 'SB-Infer',
    stage: 'Beta Testing',
    category: 'Statistical Inference',
    description:
      'Intelligent statistical engine that evaluates distribution normality, heteroskedasticity, and multicollinearity to recommend the exact parametric or non-parametric test suite.',
    coreInnovation:
      'Automates G*Power sample size matrices with sensitivity curves and automatically drafts compliant statistical methods paragraphs.',
    speedupMetric: 'Generates IRB-ready statistical plans in minutes',
    technologyStack: ['R Studio Server', 'Shiny', 'Rcpp', 'G*Power 3.1 CLI'],
  },
];

export const HPC_INFRASTRUCTURE = {
  computeCores: '1,024 AMD EPYC & Intel Xeon Cores',
  gpuAcceleration: 'NVIDIA A100 & RTX 6000 Ada Cloud Clusters',
  memory: '4.8 TB High-Speed ECC Memory',
  storage: '250 TB Fast NVMe High-Throughput Scratch Storage',
  security: 'ISO 27001-Compliant AES-256 Encrypted Private Storage',
  uptime: '99.9% High-Availability Simulation Uptime',
};
