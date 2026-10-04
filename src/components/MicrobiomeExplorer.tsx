import React, { useState } from 'react';
import { 
  Sparkles, 
  Dna, 
  Activity, 
  ShieldCheck, 
  Layers, 
  Sliders, 
  ExternalLink,
  Info
} from 'lucide-react';
import { MICROBIAL_TAXA } from '../data/mockAtlasData';
import { MicrobialTaxon } from '../types';

export const MicrobiomeExplorer: React.FC = () => {
  const [selectedNiche, setSelectedNiche] = useState<string>('All');
  const [activeTaxon, setActiveTaxon] = useState<MicrobialTaxon>(MICROBIAL_TAXA[0]);

  const niches = ['All', 'Gut', 'Oral Cavity', 'Skin', 'Respiratory'];

  const filteredTaxa = selectedNiche === 'All'
    ? MICROBIAL_TAXA
    : MICROBIAL_TAXA.filter((t) => t.habitat === selectedNiche);

  return (
    <div id="microbiome-atlas-view" className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">Microbial &amp; Metagenomic BioATLAS</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Profiling commensal, symbiotic, and pathogenic taxa with functional metabolic pathways across anatomical niches.
          </p>
        </div>

        {/* Niche Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          {niches.map((niche) => (
            <button
              key={niche}
              onClick={() => setSelectedNiche(niche)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                selectedNiche === niche
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {niche}
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Taxa Table / Cards + Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Taxa List (Left 2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white">Taxonomic Census &amp; Relative Abundance</h3>
              <span className="text-xs font-mono text-emerald-400">16S &amp; Shotgun Metagenomic Consensus</span>
            </div>

            <div className="space-y-3">
              {filteredTaxa.map((taxon) => {
                const isSelected = activeTaxon.id === taxon.id;
                return (
                  <div
                    key={taxon.id}
                    onClick={() => setActiveTaxon(taxon)}
                    className={`p-4 rounded-xl border cursor-pointer transition ${
                      isSelected
                        ? 'bg-slate-950 border-emerald-500/80 shadow-lg shadow-emerald-950/30'
                        : 'bg-slate-950/60 hover:bg-slate-950 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold italic text-white">{taxon.scientificName}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                            {taxon.habitat}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 mt-1 font-mono">Phylum: {taxon.phylum}</div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-sm font-mono font-bold text-emerald-400">{taxon.relativeAbundance}%</div>
                        <span className="text-[10px] text-slate-400">Mean Abundance</span>
                      </div>
                    </div>

                    {/* Progress Bar of Abundance */}
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mt-3">
                      <div
                        className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, taxon.relativeAbundance * 3.5)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Metabolic Pathways Grid */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-white">Functional Metabolic Ecosystems</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs font-mono text-emerald-400 font-bold block">SCFA Biosynthesis</span>
                <span className="text-[11px] text-slate-300 mt-1 block">Butyrate, propionate, acetate fermentation supporting mucosal barriering.</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs font-mono text-cyan-400 font-bold block">Bile Acid Deconjugation</span>
                <span className="text-[11px] text-slate-300 mt-1 block">Bile salt hydrolase (BSH) catalytic conversion affecting FXR signaling.</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs font-mono text-purple-400 font-bold block">Neurotransmitter Secretion</span>
                <span className="text-[11px] text-slate-300 mt-1 block">GABA, serotonin precursors, and tryptophan derivatives along the vagal axis.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Taxon Deep Dive (Right Col) */}
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">Microbial Specimen</span>
              <h3 className="text-lg font-bold italic text-white mt-0.5">{activeTaxon.scientificName}</h3>
              <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-800 text-emerald-300">
                {activeTaxon.hostInteraction} Organism
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 font-mono text-[10px] block">METABOLIC &amp; CELLULAR FUNCTION</span>
                <p className="text-slate-200 mt-1 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                  {activeTaxon.metabolicFunction}
                </p>
              </div>

              <div>
                <span className="text-slate-400 font-mono text-[10px] block">TRANSLATIONAL DISEASE RELEVANCE</span>
                <div className="space-y-1.5 mt-1.5">
                  {activeTaxon.associatedConditions.map((cond, i) => (
                    <div
                      key={i}
                      className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 text-[11px] flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                      <span>{cond}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Info Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-emerald-950/30 border border-emerald-500/20 text-xs text-slate-400 space-y-2">
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <Info className="w-4 h-4 shrink-0" />
              <span>Host-Microbe Integration Protocol</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Metagenomic contigs in M &amp; M BioATLAS are assembled with metaSPAdes and taxonomically annotated using the GTDB-Tk database release 214.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
