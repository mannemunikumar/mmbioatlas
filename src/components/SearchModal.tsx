import React, { useState, useEffect } from 'react';
import { 
  Search, 
  X, 
  Dna, 
  Activity, 
  Sparkles, 
  Database, 
  ArrowRight,
  Cpu,
  BookOpen,
  BarChart3,
  GraduationCap
} from 'lucide-react';
import { GENES_DATABASE, ORGAN_SYSTEMS, MICROBIAL_TAXA, BIOATLAS_DATASETS } from '../data/mockAtlasData';
import { TRAINING_PROGRAMS } from '../data/websiteContent';
import { AtlasView } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: AtlasView, detailId?: string) => void;
  onSelectGene?: (geneSymbol: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onSelectGene,
}) => {
  const [query, setQuery] = useState('');

  // Handle keyboard shortcut Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQuery = query.trim().toLowerCase();

  // Service & Page options
  const serviceOptions: { title: string; category: string; view: AtlasView; keywords: string[] }[] = [
    { title: 'Services Hub & Directory', category: 'Services', view: 'services', keywords: ['service', 'directory', 'hub', 'contract', 'research', 'capabilities'] },
    { title: 'Scientific Research & Publications', category: 'Research', view: 'research', keywords: ['research', 'publication', 'paper', 'journal', 'q1', 'theme', 'grant', 'mou'] },
    { title: 'R&D Division & HPC Cluster', category: 'R&D', view: 'rd', keywords: ['r&d', 'rd', 'pipeline', 'hpc', 'gpu', 'algorithm', 'hardware', 'speedup'] },
    { title: 'Client Projects & Case Studies', category: 'Projects', view: 'projects', keywords: ['project', 'portfolio', 'case study', 'client', 'drug discovery', 'exome'] },
    { title: 'Training & Fellowship Programs', category: 'Training', view: 'training', keywords: ['training', 'internship', 'fellowship', 'workshop', 'mentorship', 'course'] },
    { title: 'Contact Us & Project Scoping', category: 'Contact', view: 'contact', keywords: ['contact', 'email', 'phone', 'nda', 'scope', 'inquiry', 'quote', 'support'] },
    { title: 'Molecular Docking & Virtual Screening', category: 'CRO Service', view: 'cro-services', keywords: ['docking', 'ligand', 'autodock', 'vina', 'screening', 'protein', 'binding'] },
    { title: 'Molecular Dynamics (MD) Simulations', category: 'CRO Service', view: 'cro-services', keywords: ['md', 'dynamics', 'gromacs', 'simulation', 'rmsd', 'trajectory', 'atomistic'] },
    { title: 'Next-Generation Sequencing (NGS) Analysis', category: 'CRO Service', view: 'cro-services', keywords: ['ngs', 'sequencing', 'rna-seq', 'transcriptomics', 'fastq', 'deseq2', 'volcano'] },
    { title: 'Manuscript Writing & Journal Compliance', category: 'Academic Writing', view: 'academic-writing', keywords: ['writing', 'manuscript', 'journal', 'paper', 'nature', 'peer review', 'publication'] },
    { title: 'Thesis & Dissertation Guidance', category: 'Academic Writing', view: 'academic-writing', keywords: ['thesis', 'dissertation', 'phd', 'master', 'defense', 'literature review'] },
    { title: 'Survey Data Analysis & Imputation', category: 'Statistical Analysis', view: 'statistics', keywords: ['survey', 'questionnaire', 'cronbach', 'likert', 'imputation', 'data cleaning'] },
    { title: 'Advanced Statistical Modeling & ANOVA', category: 'Statistical Analysis', view: 'statistics', keywords: ['statistics', 'anova', 'regression', 'hypothesis', 'p-value', 'power', 'multivariate'] },
    { title: 'Mission, Vision & Institutional Activities', category: 'About', view: 'about', keywords: ['mission', 'vision', 'about', 'organization', 'activities', 'leadership'] },
  ];

  const matchingServices = cleanQuery
    ? serviceOptions.filter(s => 
        s.title.toLowerCase().includes(cleanQuery) ||
        s.category.toLowerCase().includes(cleanQuery) ||
        s.keywords.some(k => k.includes(cleanQuery))
      )
    : serviceOptions.slice(0, 3);

  // Search results
  const matchingGenes = cleanQuery
    ? GENES_DATABASE.filter(
        (g) =>
          g.symbol.toLowerCase().includes(cleanQuery) ||
          g.name.toLowerCase().includes(cleanQuery) ||
          g.ensemblId.toLowerCase().includes(cleanQuery)
      )
    : GENES_DATABASE.slice(0, 3);

  const matchingOrgans = cleanQuery
    ? ORGAN_SYSTEMS.filter(
        (o) =>
          o.name.toLowerCase().includes(cleanQuery) ||
          o.latinName.toLowerCase().includes(cleanQuery) ||
          o.primaryCellTypes.some((ct) => ct.toLowerCase().includes(cleanQuery))
      )
    : ORGAN_SYSTEMS.slice(0, 2);

  return (
    <div
      id="atlas-search-modal"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-slate-950/60">
          <Search className="w-5 h-5 text-cyan-400 mr-3 shrink-0" />
          <input
            id="search-atlas-input"
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search CRO services, docking, MD, NGS, writing, training, genes..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-white mr-2 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800 rounded border border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Scrollable Results */}
        <div className="overflow-y-auto p-4 space-y-5 text-slate-300">
          {/* Services & Training Section */}
          {matchingServices.length > 0 && (
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>CRO Services &amp; Training Tracks ({matchingServices.length})</span>
                </span>
                <span className="text-[10px]">Jump to service module</span>
              </div>
              <div className="space-y-1.5">
                {matchingServices.map((svc, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      onNavigate(svc.view);
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-800/40">
                        {svc.category}
                      </span>
                      <span className="text-xs font-semibold text-white group-hover:text-cyan-300">
                        {svc.title}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Genes Section */}
          {matchingGenes.length > 0 && (
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <Dna className="w-3.5 h-3.5" />
                  <span>Biomarkers &amp; Reference Genes ({matchingGenes.length})</span>
                </span>
              </div>
              <div className="space-y-1.5">
                {matchingGenes.map((gene) => (
                  <div
                    key={gene.symbol}
                    onClick={() => {
                      if (onSelectGene) onSelectGene(gene.symbol);
                      onNavigate('umap');
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-cyan-400 text-sm">{gene.symbol}</span>
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-slate-200 group-hover:text-white line-clamp-1">{gene.name}</span>
                        <span className="text-[10px] font-mono text-slate-500">{gene.chromosome}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Organs Section */}
          {matchingOrgans.length > 0 && (
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                <span className="flex items-center gap-1.5 text-rose-400">
                  <Activity className="w-3.5 h-3.5" />
                  <span>Organ Systems ({matchingOrgans.length})</span>
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {matchingOrgans.map((organ) => (
                  <div
                    key={organ.id}
                    onClick={() => {
                      onNavigate('organs', organ.id);
                      onClose();
                    }}
                    className="p-3 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 hover:border-rose-500/40 cursor-pointer transition group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white group-hover:text-rose-300">{organ.name}</span>
                      <span className="text-[10px] font-mono text-slate-400">{organ.totalCells} cells</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">{organ.summary}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>Search across CRO pipelines, academic writing, training, and 20,400+ genes</span>
          <div className="flex items-center gap-2">
            <span>M &amp; M BioATLAS Global Search</span>
          </div>
        </div>
      </div>
    </div>
  );
};
