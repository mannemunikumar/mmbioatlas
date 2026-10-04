import React, { useState } from 'react';
import { 
  Cpu, 
  Dna, 
  Activity, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  Sliders, 
  Download, 
  ExternalLink,
  ChevronRight,
  Flame,
  Binary,
  Layers,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface CroServicesProps {
  onOpenConsultation?: (service: string) => void;
  onNavigateToUmap?: () => void;
}

export const CroServices: React.FC<CroServicesProps> = ({ onOpenConsultation, onNavigateToUmap }) => {
  const [activeTab, setActiveTab] = useState<'docking' | 'md' | 'ngs'>('docking');

  // Interactive Docking State
  const [targetReceptor, setTargetReceptor] = useState('EGFR_Kinase');
  const [dockingEnergy, setDockingEnergy] = useState(-9.4);
  const [hBonds, setHBonds] = useState(4);
  const [isSimulatingDock, setIsSimulatingDock] = useState(false);

  // Interactive MD Simulation State
  const [mdTimeStep, setMdTimeStep] = useState(50); // 0 to 100 ns
  const [isMdPlaying, setIsMdPlaying] = useState(false);

  // Interactive NGS State
  const [selectedNgsStep, setSelectedNgsStep] = useState<number>(2);

  const runDockingSimulation = () => {
    setIsSimulatingDock(true);
    setTimeout(() => {
      setDockingEnergy(-10.2 + Number((Math.random() * 2 - 1).toFixed(2)));
      setHBonds(Math.floor(Math.random() * 3) + 3);
      setIsSimulatingDock(false);
    }, 900);
  };

  return (
    <div className="space-y-12">
      {/* Section Header */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950/40 p-8 sm:p-10 shadow-2xl">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium">
            <Cpu className="w-3.5 h-3.5" />
            <span>Core Computational Pipeline</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Contract Research Organization (CRO) &amp; Bioinformatics
          </h1>
          <p className="text-base text-cyan-200/90 font-medium italic">
            The core computational pipeline accelerates drug discovery and genomic insights.
          </p>
          <p className="text-sm text-slate-400 leading-relaxed">
            From high-throughput in silico virtual screening and nanosecond-scale atomistic simulations to raw sequencing reads processing, we deliver robust, publication-grade computational biology intelligence.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenConsultation && onOpenConsultation('cro')}
              className="px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold text-xs font-mono flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition"
            >
              <span>Request CRO Service Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs for the 3 Core Capabilities */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('docking')}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-mono font-semibold transition ${
            activeTab === 'docking'
              ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
          }`}
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Molecular Docking</span>
        </button>

        <button
          onClick={() => setActiveTab('md')}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-mono font-semibold transition ${
            activeTab === 'md'
              ? 'bg-purple-500/15 text-purple-300 border border-purple-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
          }`}
        >
          <Activity className="w-4 h-4 text-purple-400" />
          <span>Molecular Dynamics (MD) Simulations</span>
        </button>

        <button
          onClick={() => setActiveTab('ngs')}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-mono font-semibold transition ${
            activeTab === 'ngs'
              ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
          }`}
        >
          <Dna className="w-4 h-4 text-emerald-400" />
          <span>Next-Generation Sequencing (NGS) Analysis</span>
        </button>
      </div>

      {/* TAB 1: MOLECULAR DOCKING */}
      {activeTab === 'docking' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Description & Features */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  <Cpu className="w-4 h-4" />
                  <span>Virtual Screening &amp; Affinity Scoring</span>
                </div>
                <h2 className="text-2xl font-bold text-white">Molecular Docking</h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  <strong>High-throughput virtual screening and precision protein-ligand interaction analysis to identify high-affinity therapeutic candidates.</strong>
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  We leverage blind docking, targeted grid-box docking, flexible receptor residue sampling, and empirical binding free energy evaluations using AutoDock Vina, Smina, and customized scoring matrices.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                  What The Pipeline Delivers:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                    <span className="font-semibold text-cyan-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      10,000+ Ligand Screening
                    </span>
                    <p className="text-[11px] text-slate-400">Rapid filtration against ZINC20, PubChem, DrugBank &amp; Natural Product databases.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                    <span className="font-semibold text-cyan-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      2D &amp; 3D Interaction Maps
                    </span>
                    <p className="text-[11px] text-slate-400">Identification of key hydrogen bonds, pi-stacking, salt bridges, and steric clashes.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                    <span className="font-semibold text-cyan-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      ADMET &amp; Drug-likeness
                    </span>
                    <p className="text-[11px] text-slate-400">Lipinski&apos;s Rule of 5, Veber filters, synthetic accessibility, and cytochromes inhibition.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                    <span className="font-semibold text-cyan-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      Publication Figures
                    </span>
                    <p className="text-[11px] text-slate-400">Ray-traced PyMOL/ChimeraX 300+ DPI graphics ready for journal submission.</p>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-cyan-200">Have a target protein or ligand library?</div>
                  <div className="text-[11px] text-slate-400">We provide pilot docking analysis within 48 business hours.</div>
                </div>
                <button
                  onClick={() => onOpenConsultation && onOpenConsultation('docking')}
                  className="px-3.5 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-mono font-bold transition"
                >
                  Consult Team
                </button>
              </div>
            </div>

            {/* Interactive Docking Workbench */}
            <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-xs font-mono text-slate-300 font-semibold">
                    Interactive Docking &amp; Affinity Simulator
                  </span>
                </div>
                <span className="text-[11px] font-mono text-cyan-400">Vina Scoring Engine</span>
              </div>

              {/* Target Selector */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-400">Target Receptor Model:</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'EGFR_Kinase', label: 'EGFR Kinase (PDB: 1M17)' },
                    { id: 'SARS2_Mpro', label: 'SARS-CoV-2 Mpro' },
                    { id: 'ACE2_RBD', label: 'ACE2 Receptor' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTargetReceptor(t.id)}
                      className={`p-2 rounded-lg text-left text-xs font-mono border transition ${
                        targetReceptor === t.id
                          ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Graphic Simulation Canvas */}
              <div className="h-52 rounded-xl bg-slate-950 border border-slate-800 relative overflow-hidden flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:12px_12px] opacity-20" />
                
                {/* 3D Receptor & Ligand Representation */}
                <div className="relative z-10 flex flex-col items-center">
                  <svg width="220" height="130" viewBox="0 0 220 130">
                    {/* Receptor Pocket Ribbons */}
                    <path
                      d="M 20 60 Q 60 10 110 50 T 200 40"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="6"
                      strokeLinecap="round"
                      opacity="0.8"
                    />
                    <path
                      d="M 30 110 Q 80 70 120 100 T 190 90"
                      fill="none"
                      stroke="#8b5cf6"
                      strokeWidth="5"
                      strokeLinecap="round"
                      opacity="0.85"
                    />

                    {/* Ligand Core (Bright Orange / Amber) */}
                    <g className={isSimulatingDock ? 'animate-bounce' : ''}>
                      <circle cx="110" cy="72" r="14" fill="#f97316" className="filter drop-shadow-[0_0_12px_#f97316]" />
                      <circle cx="110" cy="72" r="6" fill="#fef08a" />
                      
                      {/* H-Bond Vectors */}
                      <line x1="110" y1="58" x2="110" y2="48" stroke="#06b6d4" strokeWidth="2" strokeDasharray="3 2" />
                      <line x1="98" y1="76" x2="80" y2="82" stroke="#06b6d4" strokeWidth="2" strokeDasharray="3 2" />
                      <line x1="122" y1="76" x2="140" y2="80" stroke="#06b6d4" strokeWidth="2" strokeDasharray="3 2" />
                    </g>
                  </svg>
                  <div className="text-[11px] font-mono text-slate-400 mt-2">
                    Pocket Coordinate: X: 12.4, Y: -8.1, Z: 24.6 | Grid Size: 22×22×22 Å
                  </div>
                </div>
              </div>

              {/* Binding Metrics */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-center">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Binding Affinity (ΔG)</div>
                  <div className="text-base font-bold font-mono text-cyan-400 mt-0.5">
                    {dockingEnergy.toFixed(1)} <span className="text-xs font-normal text-slate-400">kcal/mol</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-center">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Est. Ki (Inhibition)</div>
                  <div className="text-base font-bold font-mono text-emerald-400 mt-0.5">
                    18.4 <span className="text-xs font-normal text-slate-400">nM</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-center">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Active H-Bonds</div>
                  <div className="text-base font-bold font-mono text-purple-400 mt-0.5">
                    {hBonds} <span className="text-xs font-normal text-slate-400">bonds</span>
                  </div>
                </div>
              </div>

              <button
                onClick={runDockingSimulation}
                disabled={isSimulatingDock}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-mono text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700 transition"
              >
                {isSimulatingDock ? (
                  <>
                    <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                    <span>Sampling Conformations...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Run In Silico Re-Docking Simulation</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MOLECULAR DYNAMICS SIMULATIONS */}
      {activeTab === 'md' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-wider">
                  <Activity className="w-4 h-4" />
                  <span>Atomistic &amp; Coarse-Grained Trajectories</span>
                </div>
                <h2 className="text-2xl font-bold text-white">Molecular Dynamics (MD) Simulations</h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  <strong>Rigorous atomistic and coarse-grained simulations to evaluate structural stability, conformational changes, and complex biomolecular behaviors over time.</strong>
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  We utilize industrial GPU cluster acceleration (GROMACS, NAMD, AMBER) for microsecond-scale trajectories, membrane-bound simulations, explicit water solvation, and MM/PBSA-MM/GBSA free energy landscape mapping.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                  Trajectory Analytics Included:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                    <span className="font-semibold text-purple-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                      RMSD &amp; RMSF Profiling
                    </span>
                    <p className="text-[11px] text-slate-400">Backbone equilibration verification and per-residue flexibility fluctuation metrics.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                    <span className="font-semibold text-purple-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                      Radius of Gyration (Rg)
                    </span>
                    <p className="text-[11px] text-slate-400">Total biomolecular compactness and unfolding detection throughout production runs.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                    <span className="font-semibold text-purple-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                      Hydrogen Bond Persistence
                    </span>
                    <p className="text-[11px] text-slate-400">Occupancy rates and life-times of critical binding pocket bridging water networks.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                    <span className="font-semibold text-purple-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                      PCA &amp; Free Energy (FEL)
                    </span>
                    <p className="text-[11px] text-slate-400">Essential dynamics covariance matrix reduction and Gibbs free energy basin projections.</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-purple-200">Need 100ns to 1μs MD simulations?</div>
                  <div className="text-[11px] text-slate-400">High-throughput GPU runs with full parameterization.</div>
                </div>
                <button
                  onClick={() => onOpenConsultation && onOpenConsultation('md')}
                  className="px-3.5 py-1.5 rounded-lg bg-purple-500 hover:bg-purple-400 text-white text-xs font-mono font-bold transition"
                >
                  Configure Run
                </button>
              </div>
            </div>

            {/* Trajectory Time Inspector */}
            <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
                  <span className="text-xs font-mono text-slate-300 font-semibold">
                    100ns Trajectory Stability Monitor
                  </span>
                </div>
                <span className="text-[11px] font-mono text-purple-400">GROMACS 2024 GPU</span>
              </div>

              {/* Timeline Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Simulation Time:</span>
                  <span className="text-purple-300 font-bold">{mdTimeStep} ns / 100 ns</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={mdTimeStep}
                  onChange={(e) => setMdTimeStep(Number(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer h-2 bg-slate-950 rounded-lg"
                />
              </div>

              {/* Trajectory Graph (RMSD Chart) */}
              <div className="h-48 rounded-xl bg-slate-950 border border-slate-800 p-3 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Backbone RMSD (nm)</span>
                  <span className="text-emerald-400">Equilibrated at ~0.18 nm</span>
                </div>
                <svg width="100%" height="130" viewBox="0 0 300 130" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="30" x2="300" y2="30" stroke="#1e293b" strokeDasharray="3 3" />
                  <line x1="0" y1="70" x2="300" y2="70" stroke="#1e293b" strokeDasharray="3 3" />
                  <line x1="0" y1="110" x2="300" y2="110" stroke="#1e293b" strokeDasharray="3 3" />

                  {/* Dynamic RMSD Path */}
                  <path
                    d="M 0 110 Q 30 70 70 65 T 140 60 T 210 58 T 300 56"
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="2.5"
                  />

                  {/* Marker at current time step */}
                  {(() => {
                    const xPos = (mdTimeStep / 100) * 300;
                    const yPos = 58 + Math.sin(mdTimeStep * 0.1) * 4;
                    return (
                      <g>
                        <line x1={xPos} y1="0" x2={xPos} y2="130" stroke="#c084fc" strokeWidth="1.5" strokeDasharray="2 2" />
                        <circle cx={xPos} cy={yPos} r="5" fill="#f43f5e" className="animate-pulse" />
                      </g>
                    );
                  })()}
                </svg>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400">Avg RMSD</div>
                  <div className="text-sm font-bold font-mono text-purple-400 mt-0.5">0.184 nm</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400">Radius of Gyration</div>
                  <div className="text-sm font-bold font-mono text-cyan-400 mt-0.5">1.42 nm</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400">Thermodynamic Temp</div>
                  <div className="text-sm font-bold font-mono text-amber-400 mt-0.5">300.1 K</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: NEXT-GENERATION SEQUENCING (NGS) ANALYSIS */}
      {activeTab === 'ngs' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider">
                  <Dna className="w-4 h-4" />
                  <span>Genomics, Transcriptomics &amp; Metagenomics</span>
                </div>
                <h2 className="text-2xl font-bold text-white">Next-Generation Sequencing (NGS) Analysis</h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  <strong>End-to-end genomic, transcriptomic (RNA-Seq), and metagenomic data processing, variant calling, and pathway analysis.</strong>
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  From raw Illumina, PacBio, or Oxford Nanopore FASTQ demultiplexing to high-confidence SNP/InDel variant calling, DEG volcano plots, and gene ontology enrichment, we produce publication-grade insights.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                  Sequencing Modalities Supported:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                    <span className="font-semibold text-emerald-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Bulk &amp; Single-Cell RNA-Seq
                    </span>
                    <p className="text-[11px] text-slate-400">DESeq2, EdgeR, Seurat v5, Scanpy, pseudobulk differential tests, and cell trajectory inference.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                    <span className="font-semibold text-emerald-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Whole Exome &amp; Genome (WES/WGS)
                    </span>
                    <p className="text-[11px] text-slate-400">GATK Best Practices, somatic/germline variant calling, ANNOVAR, and VEP pathogenic scoring.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                    <span className="font-semibold text-emerald-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Metagenomics &amp; 16S/18S
                    </span>
                    <p className="text-[11px] text-slate-400">QIIME2, Kraken2, Bracken, alpha/beta diversity, taxonomic profiling, and functional pathways.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                    <span className="font-semibold text-emerald-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Pathway &amp; GSEA Enrichment
                    </span>
                    <p className="text-[11px] text-slate-400">KEGG, Reactome, Gene Ontology (GO), and Hallmark gene set enrichment analysis.</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={onNavigateToUmap}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 text-xs font-mono font-medium flex items-center gap-1.5 transition"
                >
                  <span>Explore Single-Cell Atlas Manifold</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Interactive NGS Pipeline Stage Runner */}
            <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono text-slate-300 font-semibold">
                    Interactive RNA-Seq Pipeline
                  </span>
                </div>
                <span className="text-[11px] font-mono text-emerald-400">FastQC &rarr; DESeq2</span>
              </div>

              {/* 4 Pipeline Steps */}
              <div className="grid grid-cols-4 gap-2">
                {[
                  { step: 1, title: 'QC & Trimming', tool: 'FastQC / Trimmomatic' },
                  { step: 2, title: 'Alignment', tool: 'HISAT2 / STAR' },
                  { step: 3, title: 'Quantification', tool: 'FeatureCounts' },
                  { step: 4, title: 'Volcano DEG', tool: 'DESeq2 & GSEA' }
                ].map((s) => (
                  <button
                    key={s.step}
                    onClick={() => setSelectedNgsStep(s.step)}
                    className={`p-2 rounded-lg text-left border transition ${
                      selectedNgsStep === s.step
                        ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <div className="text-[10px] font-mono">Stage 0{s.step}</div>
                    <div className="text-xs font-semibold truncate mt-0.5">{s.title}</div>
                  </button>
                ))}
              </div>

              {/* Pipeline Output Display (Volcano Simulation) */}
              <div className="h-52 rounded-xl bg-slate-950 border border-slate-800 p-3 space-y-2 relative overflow-hidden flex flex-col justify-between">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>RNA-Seq Volcano Plot (Log2 Fold Change vs -Log10 p-value)</span>
                  <span className="text-emerald-400">p &lt; 0.05 &amp; |FC| &gt; 2.0</span>
                </div>

                <div className="relative flex-1 flex items-center justify-center">
                  <svg width="280" height="130" viewBox="0 0 280 130">
                    {/* Threshold Guidelines */}
                    <line x1="0" y1="45" x2="280" y2="45" stroke="#334155" strokeDasharray="3 3" />
                    <line x1="90" y1="0" x2="90" y2="130" stroke="#334155" strokeDasharray="3 3" />
                    <line x1="190" y1="0" x2="190" y2="130" stroke="#334155" strokeDasharray="3 3" />

                    {/* Up-regulated genes (Cyan) */}
                    <circle cx="230" cy="20" r="4" fill="#06b6d4" />
                    <circle cx="215" cy="35" r="3.5" fill="#06b6d4" />
                    <circle cx="245" cy="40" r="3" fill="#06b6d4" />
                    <circle cx="205" cy="28" r="3.5" fill="#06b6d4" />

                    {/* Down-regulated genes (Red/Pink) */}
                    <circle cx="45" cy="25" r="4" fill="#f43f5e" />
                    <circle cx="65" cy="38" r="3.5" fill="#f43f5e" />
                    <circle cx="35" cy="32" r="3" fill="#f43f5e" />
                    <circle cx="75" cy="22" r="4" fill="#f43f5e" />

                    {/* Non-significant bulk genes (Slate) */}
                    {Array.from({ length: 28 }).map((_, i) => (
                      <circle
                        key={i}
                        cx={110 + (i % 7) * 9 + (i % 3) * 4}
                        cy={60 + (i % 6) * 10}
                        r="2.5"
                        fill="#64748b"
                        opacity="0.6"
                      />
                    ))}
                  </svg>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-slate-800/80 pt-1">
                  <span className="text-rose-400">Down-regulated: 412 genes</span>
                  <span className="text-slate-400">Non-significant: 18,420</span>
                  <span className="text-cyan-400">Up-regulated: 628 genes</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="font-mono text-slate-400 text-[10px]">Read Depth / Sample</div>
                  <div className="font-mono font-bold text-emerald-400 text-sm mt-0.5">45.2M Reads (Q30 &gt; 94%)</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="font-mono text-slate-400 text-[10px]">Turnaround Time</div>
                  <div className="font-mono font-bold text-slate-200 text-sm mt-0.5">5–7 Business Days</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
