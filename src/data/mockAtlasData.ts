import {
  OrganSystem,
  CellTypeDetail,
  GeneExpression,
  MicrobialTaxon,
  SingleCellPoint,
  SpatialSpot,
  BioAtlasDataset,
} from '../types';

export const ORGAN_SYSTEMS: OrganSystem[] = [
  {
    id: 'brain',
    name: 'Central Nervous System',
    latinName: 'Systema nervosum centrale',
    iconName: 'Brain',
    summary: 'Single-nucleus transcriptome and spatial mapping of cortical layers, striatum, and hippocampal subfields.',
    totalCells: '2,840,000',
    sampleDonors: 48,
    sequencingTechnologies: ['snRNA-seq', '10x Visium HD', 'MERFISH'],
    primaryCellTypes: ['GABAergic Neurons', 'Glutamatergic Neurons', 'Astrocytes', 'Microglia', 'Oligodendrocytes'],
    keyMarkers: ['NEUROD1', 'SLC17A7', 'GAD1', 'GFAP', 'AIF1', 'MBP'],
    clinicalFocus: 'Neurodegenerative diseases, Alzheimer\'s progression, neuroinflammation',
    color: 'from-indigo-500/20 to-purple-500/20',
    accentHex: '#818cf8',
  },
  {
    id: 'heart',
    name: 'Cardiovascular System',
    latinName: 'Systema cardiovasculare',
    iconName: 'Heart',
    summary: 'High-density cellular atlas of ventricular myocardium, atrial appendages, pacemaking nodes, and vascular beds.',
    totalCells: '1,920,000',
    sampleDonors: 36,
    sequencingTechnologies: ['snRNA-seq', 'Stereo-seq', 'Patch-seq'],
    primaryCellTypes: ['Ventricular Cardiomyocytes', 'Cardiac Fibroblasts', 'Endothelial Cells', 'Pericytes', 'Epicardial Cells'],
    keyMarkers: ['MYH6', 'TNNT2', 'POSTN', 'PECAM1', 'PDGFRB'],
    clinicalFocus: 'Ischemia reperfusion, heart failure with preserved ejection fraction (HFpEF)',
    color: 'from-rose-500/20 to-red-500/20',
    accentHex: '#f43f5e',
  },
  {
    id: 'lung',
    name: 'Respiratory System',
    latinName: 'Systema respiratorium',
    iconName: 'Wind',
    summary: 'Epithelial, endothelial, and mesenchymal cellular lineage mapping across proximal airways and alveolar spaces.',
    totalCells: '2,150,000',
    sampleDonors: 42,
    sequencingTechnologies: ['scRNA-seq', 'Slide-seqV2', 'CosMx SMI'],
    primaryCellTypes: ['Alveolar Type I (AT1)', 'Alveolar Type II (AT2)', 'Ciliated Cells', 'Club Cells', 'Alveolar Macrophages'],
    keyMarkers: ['SFTPC', 'AGER', 'FOXJ1', 'SCGB1A1', 'MARCO', 'ACE2'],
    clinicalFocus: 'Idiopathic pulmonary fibrosis, viral respiratory infections, COPD',
    color: 'from-cyan-500/20 to-teal-500/20',
    accentHex: '#06b6d4',
  },
  {
    id: 'gut',
    name: 'Gastrointestinal & Enteric',
    latinName: 'Tractus gastrointestinalis',
    iconName: 'Activity',
    summary: 'Host-microbe mucosal interface along the duodenum, ileum, colon, and gut-associated lymphoid tissue (GALT).',
    totalCells: '2,640,000',
    sampleDonors: 52,
    sequencingTechnologies: ['scRNA-seq', '16S rRNA Profiling', 'Shotgun Metagenomics', 'GeoMx DSP'],
    primaryCellTypes: ['Lgr5+ Stem Cells', 'Enterocytes', 'Goblet Cells', 'Enteroendocrine Cells', 'Paneth Cells'],
    keyMarkers: ['LGR5', 'MUC2', 'CHGA', 'LYZ', 'ALPI', 'REG3A'],
    clinicalFocus: 'Inflammatory bowel disease (Crohn\'s & Colitis), gut-brain axis metabolism',
    color: 'from-amber-500/20 to-orange-500/20',
    accentHex: '#f59e0b',
  },
  {
    id: 'liver',
    name: 'Hepatic & Metabolic System',
    latinName: 'Systema hepatobiliare',
    iconName: 'Compass',
    summary: 'Zonated hepatocyte expression profiles from periportal to pericentral regions with sinusoidal immune networks.',
    totalCells: '1,480,000',
    sampleDonors: 30,
    sequencingTechnologies: ['scRNA-seq', 'Spatial Transcriptomics', 'Proteomics'],
    primaryCellTypes: ['Periportal Hepatocytes', 'Pericentral Hepatocytes', 'Kupffer Cells', 'Hepatic Stellate Cells', 'Cholangiocytes'],
    keyMarkers: ['ALB', 'CYP2E1', 'CLEC4F', 'ACTA2', 'KRT19'],
    clinicalFocus: 'Metabolic dysfunction-associated steatohepatitis (MASH), cirrhosis, lipid homeostasis',
    color: 'from-emerald-500/20 to-teal-500/20',
    accentHex: '#10b981',
  },
  {
    id: 'immune',
    name: 'Immune & Hematopoietic',
    latinName: 'Systema lymphaticum et hematopoieticum',
    iconName: 'Shield',
    summary: 'Circulating and tissue-resident lymphoid and myeloid compartments with TCR/BCR repertoire sequencing.',
    totalCells: '3,820,000',
    sampleDonors: 64,
    sequencingTechnologies: ['CITE-seq', 'scVDJ-seq', 'scATAC-seq'],
    primaryCellTypes: ['CD8+ Cytotoxic T Cells', 'CD4+ Helper T Cells', 'Regulatory T Cells', 'NK Cells', 'Classical Monocytes', 'B Cells'],
    keyMarkers: ['CD3D', 'CD4', 'CD8A', 'FOXP3', 'NCAM1', 'CD19', 'MS4A1'],
    clinicalFocus: 'Autoimmunity, cancer immunotherapy response, clonal hematopoiesis',
    color: 'from-blue-500/20 to-sky-500/20',
    accentHex: '#38bdf8',
  },
];

export const GENES_DATABASE: GeneExpression[] = [
  {
    symbol: 'CD3D',
    name: 'CD3 Delta Subunit of T-Cell Receptor Complex',
    ensemblId: 'ENSG00000167286',
    chromosome: 'Chr 11: 118,338,814-118,342,755',
    biotype: 'Protein Coding',
    description: 'Part of the T-cell receptor/CD3 complex involved in antigen recognition and T-cell activation signaling cascade.',
    expressionByTissue: { brain: 4, heart: 12, lung: 48, gut: 65, liver: 32, immune: 98 },
    diseaseRelevance: ['Severe Combined Immunodeficiency', 'Autoimmune Lymphoproliferative Syndrome', 'T-cell Lymphoma'],
  },
  {
    symbol: 'SFTPC',
    name: 'Surfactant Protein C',
    ensemblId: 'ENSG00000168484',
    chromosome: 'Chr 8: 141,607,987-141,611,489',
    biotype: 'Protein Coding',
    description: 'Hydrophobic pulmonary surfactant protein stabilizing alveoli against collapse at the end of expiration.',
    expressionByTissue: { brain: 0, heart: 2, lung: 100, gut: 1, liver: 0, immune: 2 },
    diseaseRelevance: ['Pulmonary Fibrosis (Idiopathic)', 'Neonatal Respiratory Distress Syndrome'],
  },
  {
    symbol: 'ALB',
    name: 'Albumin',
    ensemblId: 'ENSG00000163631',
    chromosome: 'Chr 4: 73,404,251-73,421,412',
    biotype: 'Protein Coding',
    description: 'Most abundant blood plasma protein synthesized exclusively by hepatocytes; regulates oncotic pressure and binds hormones/fatty acids.',
    expressionByTissue: { brain: 1, heart: 3, lung: 6, gut: 8, liver: 100, immune: 5 },
    diseaseRelevance: ['Cirrhosis', 'Analbuminemia', 'Hypoalbuminemia in Sepsis'],
  },
  {
    symbol: 'MYH6',
    name: 'Myosin Heavy Chain 6 (Cardiac Alpha)',
    ensemblId: 'ENSG00000197616',
    chromosome: 'Chr 14: 23,417,896-23,444,142',
    biotype: 'Protein Coding',
    description: 'Cardiac muscle alpha-isoform of myosin heavy chain essential for sarcomere contractile force generation.',
    expressionByTissue: { brain: 2, heart: 100, lung: 4, gut: 0, liver: 1, immune: 0 },
    diseaseRelevance: ['Familial Hypertrophic Cardiomyopathy', 'Atrial Septal Defect 3', 'Dilated Cardiomyopathy'],
  },
  {
    symbol: 'MUC2',
    name: 'Mucin 2, Oligomeric Mucus/Gel-Forming',
    ensemblId: 'ENSG00000198788',
    chromosome: 'Chr 11: 1,074,874-1,104,749',
    biotype: 'Protein Coding',
    description: 'Major gel-forming intestinal mucin secreted by goblet cells to construct the primary defensive epithelial barrier against gut microbiota.',
    expressionByTissue: { brain: 0, heart: 0, lung: 18, gut: 100, liver: 4, immune: 3 },
    diseaseRelevance: ['Ulcerative Colitis', 'Colorectal Carcinoma', 'Mucinous Adenocarcinoma'],
  },
  {
    symbol: 'NEUROD1',
    name: 'Neuronal Differentiation 1',
    ensemblId: 'ENSG00000162992',
    chromosome: 'Chr 2: 181,664,570-181,671,438',
    biotype: 'Protein Coding',
    description: 'Basic helix-loop-helix (bHLH) transcription factor promoting neuronal neurogenesis and endocrine cell development.',
    expressionByTissue: { brain: 96, heart: 2, lung: 1, gut: 12, liver: 0, immune: 1 },
    diseaseRelevance: ['Maturity-Onset Diabetes of the Young (MODY6)', 'Cortical Dysplasia', 'Neurodevelopmental Delay'],
  },
  {
    symbol: 'ACE2',
    name: 'Angiotensin-Converting Enzyme 2',
    ensemblId: 'ENSG00000130234',
    chromosome: 'Chr X: 15,561,033-15,602,159',
    biotype: 'Protein Coding',
    description: 'Carboxypeptidase converting angiotensin II to angiotensin-(1-7); functions as functional receptor for SARS-CoV-2 entry.',
    expressionByTissue: { brain: 8, heart: 46, lung: 72, gut: 88, liver: 24, immune: 6 },
    diseaseRelevance: ['COVID-19 Pathogenesis', 'Hypertension', 'Cardiovascular Remodeling'],
  },
  {
    symbol: 'FOXP3',
    name: 'Forkhead Box P3',
    ensemblId: 'ENSG00000049768',
    chromosome: 'Chr X: 49,250,436-49,265,108',
    biotype: 'Protein Coding',
    description: 'Master transcriptional regulator specifying development, lineage maintenance, and immunosuppressive function of regulatory T (Treg) cells.',
    expressionByTissue: { brain: 2, heart: 8, lung: 24, gut: 42, liver: 14, immune: 92 },
    diseaseRelevance: ['IPEX Syndrome', 'Systemic Lupus Erythematosus', 'Immune Tolerance in Transplantation'],
  },
];

export const MICROBIAL_TAXA: MicrobialTaxon[] = [
  {
    id: 'bac-01',
    scientificName: 'Faecalibacterium prausnitzii',
    phylum: 'Bacillota (Firmicutes)',
    genus: 'Faecalibacterium',
    habitat: 'Gut',
    relativeAbundance: 6.8,
    metabolicFunction: 'Major producer of butyrate; downregulates NF-kB, suppresses pro-inflammatory cytokines, enhances epithelial tight junctions.',
    hostInteraction: 'Symbiotic',
    associatedConditions: ['Protective against Crohn\'s disease', 'Reduced in Type 2 Diabetes', 'Anti-inflammatory mucosal homeostatis'],
  },
  {
    id: 'bac-02',
    scientificName: 'Akkermansia muciniphila',
    phylum: 'Verrucomicrobiota',
    genus: 'Akkermansia',
    habitat: 'Gut',
    relativeAbundance: 3.4,
    metabolicFunction: 'Mucin-degrading specialist that constantly stimulates gut turnover, secretes acetate and propionate, reinforces mucosal barrier integrity.',
    hostInteraction: 'Probiotic',
    associatedConditions: ['Protective in metabolic syndrome', 'Enhances PD-1 cancer immunotherapy response', 'Decreased in obesity'],
  },
  {
    id: 'bac-03',
    scientificName: 'Bifidobacterium longum',
    phylum: 'Actinomycetota',
    genus: 'Bifidobacterium',
    habitat: 'Gut',
    relativeAbundance: 5.1,
    metabolicFunction: 'Ferments human milk oligosaccharides (HMOs) into acetate and lactate; modulates neuroactive pathways via the gut-brain axis.',
    hostInteraction: 'Probiotic',
    associatedConditions: ['Infant immune maturation', 'Mitigation of anxiety-like behavioral phenotypes', 'Pathogen exclusion'],
  },
  {
    id: 'bac-04',
    scientificName: 'Bacteroides fragilis',
    phylum: 'Bacteroidota',
    genus: 'Bacteroides',
    habitat: 'Gut',
    relativeAbundance: 8.2,
    metabolicFunction: 'Expresses Polysaccharide A (PSA) which activates regulatory T cells; complex carbohydrate degradation.',
    hostInteraction: 'Symbiotic',
    associatedConditions: ['Immune system maturation', 'Enterotoxigenic strains linked to colorectal carcinogenesis (ETBF)'],
  },
  {
    id: 'bac-05',
    scientificName: 'Cutibacterium acnes',
    phylum: 'Actinomycetota',
    genus: 'Cutibacterium',
    habitat: 'Skin',
    relativeAbundance: 28.5,
    metabolicFunction: 'Hydrolyzes sebum triglycerides into free fatty acids maintaining acidic skin mantle; produces antimicrobial bacteriocins.',
    hostInteraction: 'Commensal',
    associatedConditions: ['Acne vulgaris (specific phylotypes)', 'Cutaneous microbiome resilience against fungal colonization'],
  },
  {
    id: 'bac-06',
    scientificName: 'Streptococcus mitis',
    phylum: 'Bacillota',
    genus: 'Streptococcus',
    habitat: 'Oral Cavity',
    relativeAbundance: 14.2,
    metabolicFunction: 'Pioneer oral colonizer producing hydrogen peroxide that limits pathogenic colonization on oral mucosal pellicle.',
    hostInteraction: 'Commensal',
    associatedConditions: ['Oral biofilm homeostasis', 'Infective endocarditis following dental bacteremia in susceptible hosts'],
  },
];

export const BIOATLAS_DATASETS: BioAtlasDataset[] = [
  {
    accession: 'MM-ATLAS-001',
    title: 'Whole-Organ Human Cardiac Cellular Architecture at Single-Nucleus Resolution',
    doi: '10.1038/s41586-024-07201-x',
    organ: 'Cardiovascular System',
    technology: 'snRNA-seq',
    cellsCount: '1,920,400',
    donorCount: 36,
    publicationDate: '2025-11-18',
    fileFormats: ['h5ad (AnnData)', 'Seurat (.rds)', 'Matrix Market (.mtx)', 'Spatial coordinates'],
    sizeGb: 14.6,
    summary: 'Deep sequencing of non-failing and ischemic myocardial samples spanning left/right ventricles, atria, and interventricular septum with mapped electrophysiological conductive cell clusters.',
    leadInvestigator: 'M. Mannem, D. Muni, et al.',
  },
  {
    accession: 'MM-ATLAS-002',
    title: 'Spatial Transcriptomics & Microenvironmental Niches of the Human Respiratory Epithelium',
    doi: '10.1016/j.cell.2025.04.019',
    organ: 'Respiratory System',
    technology: 'Spatial Transcriptomics',
    cellsCount: '2,150,800',
    donorCount: 42,
    publicationDate: '2026-02-04',
    fileFormats: ['10x Visium Tar', 'Loupe File (.cloupe)', 'AnnData (.h5ad)', 'High-Res TIFF'],
    sizeGb: 38.2,
    summary: 'Sub-micron spatial profiling capturing bronchoalveolar transitions, viral infection entry routes, and fibrotic niche reprogramming with high spatial gene coordinate resolution.',
    leadInvestigator: 'M. Mannem, S. Thorne, et al.',
  },
  {
    accession: 'MM-ATLAS-003',
    title: 'Gut Mucosal Multi-Omics: Single-Cell Immune Landscape and Paired Metagenomic Taxa',
    doi: '10.1126/science.ade9912',
    organ: 'Gastrointestinal & Enteric',
    technology: 'Multi-Omic (CITE-seq)',
    cellsCount: '2,640,000',
    donorCount: 52,
    publicationDate: '2026-05-14',
    fileFormats: ['AnnData (.h5ad)', 'BIOM Table', 'FASTQ (Metagenomics)', 'Antibody Barcode Matrix'],
    sizeGb: 46.8,
    summary: 'Simultaneous single-cell surface proteome and transcriptomic mapping of mucosal lymphocytes paired with 100M+ metagenomic reads deciphering host-microbiota immune crosstalk.',
    leadInvestigator: 'D. Muni, M. Mannem, et al.',
  },
  {
    accession: 'MM-ATLAS-004',
    title: 'Human Cortical Layer Neurodevelopmental Cell Atlas & Microglial Activation Gradients',
    doi: '10.1038/s41593-025-01824-3',
    organ: 'Central Nervous System',
    technology: 'snRNA-seq',
    cellsCount: '2,840,000',
    donorCount: 48,
    publicationDate: '2026-07-22',
    fileFormats: ['h5ad (AnnData)', 'Neuroglancer Mesh', 'Raw Counts TSV'],
    sizeGb: 29.4,
    summary: 'Single-nucleus transcriptomes spanning prefrontal cortex, temporal pole, and hippocampus tracking microglial neuroinflammatory transitions in healthy and aging cohorts.',
    leadInvestigator: 'M. Mannem, E. Vance, et al.',
  },
  {
    accession: 'MM-ATLAS-005',
    title: 'Hepatic Metabolic Zonation and Sinusoidal Niche Single-Cell Proteogenomics',
    doi: '10.1002/hep.33108',
    organ: 'Hepatic & Metabolic System',
    technology: 'scRNA-seq',
    cellsCount: '1,480,200',
    donorCount: 30,
    publicationDate: '2026-08-30',
    fileFormats: ['h5ad (AnnData)', 'Zonation Coordinate Map', 'CSV Matrix'],
    sizeGb: 11.2,
    summary: 'Reconstruction of liver portal-to-central metabolic lobule gradients, non-parenchymal cell crosstalk, and lipid droplet accumulating subpopulations in steatotic phenotypes.',
    leadInvestigator: 'K. Tanaka, D. Muni, et al.',
  },
  {
    accession: 'MM-ATLAS-006',
    title: 'Pan-Tissue Circulating & Resident T/NK Cell Receptor (TCR) Single-Cell Repertoire',
    doi: '10.1038/s41590-026-01890-w',
    organ: 'Immune & Hematopoietic',
    technology: 'scRNA-seq',
    cellsCount: '3,820,000',
    donorCount: 64,
    publicationDate: '2026-09-02',
    fileFormats: ['h5ad (AnnData)', 'AIRR-compliant TCR TSV', 'Clonotype Summaries'],
    sizeGb: 22.0,
    summary: 'Full-length alpha/beta paired V(D)J repertoires joined with 5-prime single-cell transcriptomes quantifying cross-tissue clonal sharing and antigen-experienced exhaustion trajectories.',
    leadInvestigator: 'M. Mannem, D. Muni, et al.',
  },
];

// Pre-generated deterministic UMAP single cells for lightning-fast, silky smooth canvas rendering
export function generateSingleCellPoints(): SingleCellPoint[] {
  const clusters = [
    { id: 0, name: 'Cytotoxic CD8+ T Cells', cx: 280, cy: 190, r: 65, tissue: 'Immune', gene: 84 },
    { id: 1, name: 'Ventricular Cardiomyocytes', cx: 580, cy: 220, r: 75, tissue: 'Heart', gene: 92 },
    { id: 2, name: 'Alveolar Type II (AT2)', cx: 440, cy: 380, r: 70, tissue: 'Lung', gene: 78 },
    { id: 3, name: 'Glutamatergic Neurons', cx: 180, cy: 360, r: 80, tissue: 'Brain', gene: 96 },
    { id: 4, name: 'Zonated Hepatocytes', cx: 340, cy: 520, r: 72, tissue: 'Liver', gene: 88 },
    { id: 5, name: 'Lgr5+ Intestinal Crypt Cells', cx: 620, cy: 440, r: 68, tissue: 'Gut', gene: 74 },
    { id: 6, name: 'Vascular Endothelial Cells', cx: 420, cy: 230, r: 60, tissue: 'Pan-tissue', gene: 62 },
    { id: 7, name: 'Activated Microglia', cx: 160, cy: 500, r: 55, tissue: 'Brain', gene: 82 },
  ];

  const points: SingleCellPoint[] = [];
  let seed = 42;
  function random() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  }

  clusters.forEach((cl) => {
    const count = 140; // 140 points per cluster = 1,120 points for fluid high-speed rendering
    for (let i = 0; i < count; i++) {
      // Gaussian approximation
      const u1 = random();
      const u2 = random();
      const z0 = Math.sqrt(-2.0 * Math.log(u1 || 0.001)) * Math.cos(2.0 * Math.PI * u2);
      const z1 = Math.sqrt(-2.0 * Math.log(u1 || 0.001)) * Math.sin(2.0 * Math.PI * u2);

      const px = cl.cx + z0 * (cl.r * 0.45);
      const py = cl.cy + z1 * (cl.r * 0.45);
      const umi = Math.round(1800 + random() * 12000);
      const geneCount = Math.round(800 + random() * 3400);
      const markerLevel = Math.max(0, Math.min(100, Math.round(cl.gene + (random() * 24 - 12))));

      points.push({
        id: `cell_${cl.id}_${i}`,
        clusterId: cl.id,
        clusterName: cl.name,
        x: px,
        y: py,
        tissue: cl.tissue,
        umiCount: umi,
        geneCount,
        markerLevel,
      });
    }
  });

  return points;
}

// Generate tissue section spots for spatial transcriptomics viewer
export function generateSpatialSpots(): SpatialSpot[] {
  const spots: SpatialSpot[] = [];
  const rows = 18;
  const cols = 26;
  const regions = [
    { name: 'Cortical Layer I-II', color: 'Outer Cortex', cluster: 'Layer 1/2 Neurons' },
    { name: 'Cortical Layer III-IV', color: 'Mid Cortex', cluster: 'Pyramidal Neurons' },
    { name: 'Cortical Layer V-VI', color: 'Deep Cortex', cluster: 'Subplate / Deep Layer' },
    { name: 'Subcortical White Matter', color: 'White Matter', cluster: 'Oligodendrocytes & Astrocytes' },
  ];

  let seed = 99;
  function random() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // Create organic tissue boundary (elliptical shape)
      const dx = (c - cols / 2) / (cols / 2);
      const dy = (r - rows / 2) / (rows / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 0.92 + (random() * 0.1 - 0.05)) {
        const layerIdx = Math.min(3, Math.floor(dist * 4.2));
        const reg = regions[layerIdx];
        const dapi = Math.round(40 + (1 - dist) * 55 + (random() * 15));
        const marker = Math.round(20 + Math.sin(r * 0.4 + c * 0.6) * 35 + 35 + (random() * 15));

        spots.push({
          id: `spot_${r}_${c}`,
          x: c * 24 + 30 + (r % 2 === 1 ? 12 : 0),
          y: r * 22 + 30,
          region: reg.name,
          cluster: reg.cluster,
          dapiIntensity: Math.min(100, Math.max(10, dapi)),
          markerExpression: Math.min(100, Math.max(5, marker)),
          dominantCellType: reg.cluster,
          umiCount: Math.round(2500 + marker * 85 + random() * 1200),
        });
      }
    }
  }

  return spots;
}
