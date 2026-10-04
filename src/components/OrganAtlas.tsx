import React, { useState } from 'react';
import { 
  Activity, 
  Brain, 
  Heart, 
  Wind, 
  Compass, 
  Shield, 
  Dna, 
  Database,
  ArrowRight,
  ExternalLink,
  Layers,
  ChevronRight
} from 'lucide-react';
import { ORGAN_SYSTEMS, GENES_DATABASE } from '../data/mockAtlasData';
import { OrganSystem, AtlasView } from '../types';

interface OrganAtlasProps {
  initialOrganId?: string;
  onNavigateToUmap: (gene: string) => void;
  onNavigateToDataset: () => void;
}

export const OrganAtlas: React.FC<OrganAtlasProps> = ({
  initialOrganId,
  onNavigateToUmap,
  onNavigateToDataset,
}) => {
  const [selectedOrganId, setSelectedOrganId] = useState<string>(
    initialOrganId || ORGAN_SYSTEMS[0].id
  );

  const activeOrgan = ORGAN_SYSTEMS.find((o) => o.id === selectedOrganId) || ORGAN_SYSTEMS[0];

  const getOrganIcon = (name: string) => {
    switch (name) {
      case 'Brain': return <Brain className="w-5 h-5 text-indigo-400" />;
      case 'Heart': return <Heart className="w-5 h-5 text-rose-400" />;
      case 'Wind': return <Wind className="w-5 h-5 text-cyan-400" />;
      case 'Activity': return <Activity className="w-5 h-5 text-amber-400" />;
      case 'Compass': return <Compass className="w-5 h-5 text-emerald-400" />;
      default: return <Shield className="w-5 h-5 text-sky-400" />;
    }
  };

  return (
    <div id="organ-systems-atlas-view" className="w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">Pan-Organ &amp; Anatomical Reference Atlas</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Standardized cellular census, cell-state hierarchies, and marker gene specificity across organ systems.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono text-cyan-400">
          <span className="px-2.5 py-1 rounded-lg bg-cyan-950/80 border border-cyan-800/40">
            6 Core Physiological Systems
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300">
            14.8M Indexed Cells
          </span>
        </div>
      </div>

      {/* Organ Systems Selector Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {ORGAN_SYSTEMS.map((organ) => {
          const isSelected = organ.id === selectedOrganId;
          return (
            <button
              key={organ.id}
              onClick={() => setSelectedOrganId(organ.id)}
              className={`p-3.5 rounded-2xl border text-left transition relative overflow-hidden group ${
                isSelected
                  ? 'bg-slate-900 border-cyan-500 shadow-lg shadow-cyan-950/30 ring-1 ring-cyan-500'
                  : 'bg-slate-950/60 hover:bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800">
                  {getOrganIcon(organ.iconName)}
                </div>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />
                )}
              </div>
              <div className="font-semibold text-xs text-white truncate">{organ.name}</div>
              <div className="text-[10px] font-mono text-cyan-400 mt-0.5">{organ.totalCells} cells</div>
            </button>
          );
        })}
      </div>

      {/* Selected Organ Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Main Organ Profile */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold text-white tracking-tight">{activeOrgan.name}</h3>
                  <span className="text-xs italic text-slate-400 font-mono">({activeOrgan.latinName})</span>
                </div>
                <p className="text-xs text-slate-300 mt-1 max-w-xl">{activeOrgan.summary}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="px-3 py-1 rounded-full bg-cyan-950/70 text-cyan-300 border border-cyan-800/50 text-xs font-mono">
                  {activeOrgan.sampleDonors} Healthy Donors
                </span>
              </div>
            </div>

            {/* Cell Lineages */}
            <div className="mt-5 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>Primary Mapped Cell Subpopulations</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeOrgan.primaryCellTypes.map((cell) => (
                  <span
                    key={cell}
                    className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-medium text-slate-200"
                  >
                    {cell}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Biomarkers with 1-click UMAP jump */}
            <div className="mt-5 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Dna className="w-3.5 h-3.5 text-cyan-400" />
                <span>Diagnostic &amp; Lineage Biomarkers</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {activeOrgan.keyMarkers.map((marker) => (
                  <button
                    key={marker}
                    onClick={() => onNavigateToUmap(marker)}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/80 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/40 text-left transition group"
                  >
                    <span className="font-mono text-xs font-bold text-cyan-400">{marker}</span>
                    <span className="text-[10px] text-slate-400 group-hover:text-cyan-300 flex items-center gap-1">
                      <span>UMAP</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Clinical & Translational Pharmacology */}
            <div className="mt-5 p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="text-xs font-semibold text-rose-400 mb-1 flex items-center gap-1.5">
                <span>Translational Pathology &amp; Disease Models</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeOrgan.clinicalFocus}
              </p>
            </div>
          </div>

          {/* Cross-Tissue Gene Expression Heatmap Comparison */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">Cross-Tissue Gene Specificity Matrix</h4>
                <p className="text-xs text-slate-400">Relative expression index across tissue compartments (0-100 scale)</p>
              </div>
              <div className="text-[10px] font-mono text-cyan-400">RNA-Seq RPKM Normalized</div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-mono text-[10px]">
                    <th className="py-2 px-3">GENE SYMBOL</th>
                    <th className="py-2 px-3 text-center">BRAIN</th>
                    <th className="py-2 px-3 text-center">HEART</th>
                    <th className="py-2 px-3 text-center">LUNG</th>
                    <th className="py-2 px-3 text-center">GUT</th>
                    <th className="py-2 px-3 text-center">LIVER</th>
                    <th className="py-2 px-3 text-center">IMMUNE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                  {GENES_DATABASE.slice(0, 6).map((gene) => (
                    <tr key={gene.symbol} className="hover:bg-slate-950/40">
                      <td className="py-2.5 px-3 font-bold text-cyan-400 flex items-center gap-2">
                        <span>{gene.symbol}</span>
                      </td>
                      {(['brain', 'heart', 'lung', 'gut', 'liver', 'immune'] as const).map((tissue) => {
                        const val = gene.expressionByTissue[tissue] || 0;
                        const opacity = val / 100;
                        return (
                          <td key={tissue} className="py-2.5 px-3 text-center">
                            <span
                              className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold"
                              style={{
                                backgroundColor: `rgba(6, 182, 212, ${Math.max(0.1, opacity)})`,
                                color: val > 50 ? '#ffffff' : '#94a3b8',
                              }}
                            >
                              {val}%
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Technologies & Datasets for this organ */}
        <div className="space-y-6">
          {/* Sequencing Tech Stack */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-cyan-400" />
              <span>Assay &amp; Sequencing Platforms</span>
            </h4>
            <div className="space-y-2">
              {activeOrgan.sequencingTechnologies.map((tech) => (
                <div
                  key={tech}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-200"
                >
                  <span className="font-medium">{tech}</span>
                  <span className="text-[10px] font-mono text-emerald-400">Validated</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Dataset Access */}
          <div className="bg-gradient-to-br from-slate-900 to-cyan-950/30 border border-cyan-500/20 rounded-2xl p-5 space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">Open Access Repository</span>
            <h4 className="text-base font-bold text-white">Download Raw &amp; Processed AnnData</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Explore count matrices, cell annotations, and spatial coordinates for {activeOrgan.name} in H5AD format.
            </p>
            <button
              onClick={onNavigateToDataset}
              className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition shadow-lg shadow-cyan-500/20"
            >
              <span>Explore Datasets Directory</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
