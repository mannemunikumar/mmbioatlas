export type AtlasView = 
  | 'overview' 
  | 'about'
  | 'services'
  | 'research'
  | 'rd'
  | 'projects'
  | 'cro-services'
  | 'academic-writing'
  | 'statistics'
  | 'training'
  | 'contact'
  | 'umap' 
  | 'spatial' 
  | 'organs' 
  | 'microbiome' 
  | 'datasets';

export interface TrainingProgramInfo {
  id: string;
  length: '1-Month Training' | '3-Month Project' | '6-Month Project';
  focusArea: string;
  idealFor: string;
  weeklyHours: string;
  tools: string[];
  deliverables: string[];
  highlight: boolean;
}

export interface ServiceInquiry {
  fullName: string;
  email: string;
  institution: string;
  serviceCategory: 'cro' | 'writing' | 'statistics' | 'training';
  projectDetails: string;
  timeline: string;
}

export interface OrganSystem {
  id: string;
  name: string;
  latinName: string;
  iconName: string;
  summary: string;
  totalCells: string;
  sampleDonors: number;
  sequencingTechnologies: string[];
  primaryCellTypes: string[];
  keyMarkers: string[];
  clinicalFocus: string;
  color: string;
  accentHex: string;
}

export interface CellTypeDetail {
  id: string;
  name: string;
  organ: string;
  ontologyId: string;
  cellCount: number;
  proportion: number;
  function: string;
  primaryMarkers: string[];
  lineage: string;
  associatedDiseases: string[];
}

export interface GeneExpression {
  symbol: string;
  name: string;
  ensemblId: string;
  chromosome: string;
  biotype: string;
  description: string;
  expressionByTissue: Record<string, number>; // 0 to 100
  diseaseRelevance: string[];
}

export interface MicrobialTaxon {
  id: string;
  scientificName: string;
  phylum: string;
  genus: string;
  habitat: 'Gut' | 'Oral Cavity' | 'Skin' | 'Respiratory' | 'Urogenital';
  relativeAbundance: number; // percentage
  metabolicFunction: string;
  hostInteraction: 'Symbiotic' | 'Commensal' | 'Opportunistic' | 'Probiotic';
  associatedConditions: string[];
}

export interface SingleCellPoint {
  id: string;
  clusterId: number;
  clusterName: string;
  x: number;
  y: number;
  tissue: string;
  umiCount: number;
  geneCount: number;
  markerLevel: number;
}

export interface SpatialSpot {
  id: string;
  x: number;
  y: number;
  region: string;
  cluster: string;
  dapiIntensity: number;
  markerExpression: number;
  dominantCellType: string;
  umiCount: number;
}

export interface BioAtlasDataset {
  accession: string;
  title: string;
  doi: string;
  organ: string;
  technology: 'scRNA-seq' | 'snRNA-seq' | 'Spatial Transcriptomics' | 'Metagenomics' | 'Multi-Omic (CITE-seq)';
  cellsCount: string;
  donorCount: number;
  publicationDate: string;
  fileFormats: string[];
  sizeGb: number;
  summary: string;
  leadInvestigator: string;
}
