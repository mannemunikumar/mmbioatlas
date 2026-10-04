import { TrainingProgramInfo } from '../types';

export const TRAINING_PROGRAMS: TrainingProgramInfo[] = [
  {
    id: 'training-1m',
    length: '1-Month Training',
    focusArea: 'Core fundamentals, software familiarization, and introductory bioinformatics protocols.',
    idealFor: 'Beginners & Undergraduates',
    weeklyHours: '8–10 Hours / Week',
    tools: ['NCBI BLAST', 'UniProt', 'AutoDock Vina', 'PyMOL Basics', 'Linux Bash'],
    deliverables: [
      'Sequence alignment & retrieval protocols',
      'Basic receptor-ligand docking simulation',
      'Introductory visualization & structure reporting',
      'Certificate of Bioinformatics Fundamentals'
    ],
    highlight: false
  },
  {
    id: 'training-3m',
    length: '3-Month Project',
    focusArea: 'Hands-on execution of a guided research module with practical data analysis and docking.',
    idealFor: "Master's Students & Interns",
    weeklyHours: '14–16 Hours / Week',
    tools: ['AutoDock Vina / Smina', 'GROMACS (intro)', 'R / Bioconductor', 'DESeq2', 'Discovery Studio'],
    deliverables: [
      'Virtual screening of 100+ compound library',
      'Target binding affinity & interaction profiling',
      'Differential gene expression pipeline execution',
      'Structured research module project report'
    ],
    highlight: true
  },
  {
    id: 'training-6m',
    length: '6-Month Project',
    focusArea: 'End-to-end independent research, MD simulations, NGS pipelines, and thesis/publication prep.',
    idealFor: 'Ph.D. Scholars & Professionals',
    weeklyHours: '20+ Hours / Week',
    tools: ['GROMACS 100ns MD', 'Bowtie2 / HISAT2', 'DESeq2 / EdgeR', 'Python / Biopython', 'LaTeX / Manuscript prep'],
    deliverables: [
      'Full 100ns molecular dynamics trajectory & RMSD/RMSF/Rg analysis',
      'Complete raw FASTQ to annotated variant/transcriptome pipeline',
      'Publication-ready manuscript draft & high-res figures',
      'Comprehensive thesis chapter & defense slide deck'
    ],
    highlight: false
  }
];
