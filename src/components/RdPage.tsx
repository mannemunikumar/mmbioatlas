import React from 'react';
import { 
  Cpu, 
  Zap, 
  Server, 
  Terminal, 
  Workflow, 
  CheckCircle2, 
  ArrowRight, 
  Activity, 
  Code2, 
  ShieldAlert,
  Send,
  Boxes
} from 'lucide-react';
import { RD_PIPELINES, HPC_INFRASTRUCTURE } from '../data/rdData';
import { AtlasView } from '../types';

interface RdPageProps {
  onSelectView: (view: AtlasView) => void;
  onOpenConsultation: (serviceCategory?: string) => void;
}

export const RdPage: React.FC<RdPageProps> = ({
  onSelectView,
  onOpenConsultation,
}) => {
  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Hero Banner */}
      <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-950 via-[#071d33] to-slate-900 border border-slate-800 text-white shadow-lg relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium">
            <Boxes className="w-3.5 h-3.5 text-cyan-400" />
            <span>High-Throughput Bio-Computing Innovation</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight font-sans">
            Research &amp; Development{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-sky-200 to-teal-300 bg-clip-text text-transparent">
              (R&amp;D Division)
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            The R&amp;D division at M &amp; M BioATLAS engineers automated bioinformatic pipelines, machine-learning conformational filters, and scalable cloud execution clusters. By automating routine computational tasks, the team accelerates hit discovery and multi-omic data synthesis from months into days.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
            <button
              onClick={() => onOpenConsultation('cro')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs sm:text-sm transition shadow-sm"
            >
              <Send className="w-4 h-4" />
              <span>Pilot An R&amp;D Pipeline</span>
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('pipelines-grid');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm border border-white/20 transition"
            >
              <span>Explore Proprietary Algorithms</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Ambient Decorative Accents */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-radial from-cyan-400 to-transparent pointer-events-none" />
      </section>

      {/* HPC Infrastructure Specs Grid */}
      <section className="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 text-white space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
              Hardware &amp; Computing Cluster
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white mt-1">
              High-Performance Computing (HPC) Architecture
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-emerald-400">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>Active Cluster Status: Operational</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
            <div className="text-xs font-mono text-cyan-400">Compute Density</div>
            <div className="text-lg font-bold text-white">{HPC_INFRASTRUCTURE.computeCores}</div>
            <p className="text-[11px] text-slate-400">Dual-socket parallel nodes for multi-threaded GROMACS &amp; Nextflow</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
            <div className="text-xs font-mono text-cyan-400">GPU Acceleration</div>
            <div className="text-lg font-bold text-white">{HPC_INFRASTRUCTURE.gpuAcceleration}</div>
            <p className="text-[11px] text-slate-400">Dedicated Tensor cores for molecular dynamics &amp; deep learning filters</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
            <div className="text-xs font-mono text-cyan-400">System Memory</div>
            <div className="text-lg font-bold text-white">{HPC_INFRASTRUCTURE.memory}</div>
            <p className="text-[11px] text-slate-400">Error-correcting code RAM for massive single-cell matrix loading</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
            <div className="text-xs font-mono text-cyan-400">High-Speed I/O Storage</div>
            <div className="text-lg font-bold text-white">{HPC_INFRASTRUCTURE.storage}</div>
            <p className="text-[11px] text-slate-400">Multi-gigabyte/sec read/write throughput for raw FASTQ and BAM files</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
            <div className="text-xs font-mono text-cyan-400">Information Security</div>
            <div className="text-lg font-bold text-white">{HPC_INFRASTRUCTURE.security}</div>
            <p className="text-[11px] text-slate-400">Encrypted client partitions with automated cryptographic shredding</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
            <div className="text-xs font-mono text-cyan-400">SLURM Scheduler Reliability</div>
            <div className="text-lg font-bold text-white">{HPC_INFRASTRUCTURE.uptime}</div>
            <p className="text-[11px] text-slate-400">Uninterrupted microsecond simulations with automated checkpoint restarts</p>
          </div>
        </div>
      </section>

      {/* Proprietary Pipelines Showcase */}
      <section className="space-y-6" id="pipelines-grid">
        <div>
          <div className="text-xs font-semibold text-[#0b3b70] uppercase tracking-wider">
            Proprietary Automation
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Internal R&amp;D Pipeline Deployments
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Engineered internally to maximize reproducibility, throughput, and statistical precision across institutional operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {RD_PIPELINES.map((pipeline) => (
            <div
              key={pipeline.id}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 hover:border-cyan-500 hover:shadow-md transition flex flex-col justify-between space-y-5 group"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-slate-100 text-slate-800 border border-slate-200">
                    {pipeline.codename}
                  </span>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-200">
                    {pipeline.stage}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                    {pipeline.name}
                  </h3>
                  <div className="text-xs text-blue-700 font-medium mt-0.5">
                    {pipeline.category}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {pipeline.description}
                </p>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    Core Technical Innovation:
                  </div>
                  <p className="text-xs text-slate-600">
                    {pipeline.coreInnovation}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
                  <Zap className="w-4 h-4 text-emerald-600" />
                  <span>Benchmark Acceleration: {pipeline.speedupMetric}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-1.5">
                  {pipeline.technologyStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-mono text-slate-600 border border-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => onOpenConsultation('cro')}
                  className="text-xs font-semibold text-[#0b3b70] hover:text-blue-900 flex items-center gap-1 shrink-0"
                >
                  <span>Request Custom Integration</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* R&D Open Science Commitment */}
      <section className="p-8 sm:p-10 rounded-3xl bg-slate-100 border border-slate-200/90 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="text-xs font-semibold text-[#0b3b70] uppercase tracking-wider">
            Open Science &amp; Reproducibility
          </div>
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
            Collaborative R&amp;D with Biotech Startups &amp; Academic PIs
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            M &amp; M BioATLAS actively partners with biotechnology startups, pharmaceutical drug discovery divisions, and university research teams to co-develop specialized simulation algorithms, machine learning models, and custom data processing pipelines.
          </p>
        </div>

        <button
          onClick={() => onOpenConsultation('cro')}
          className="px-6 py-3 rounded-xl bg-[#0b3b70] hover:bg-[#082e59] text-white font-bold text-xs sm:text-sm transition shadow-sm shrink-0"
        >
          Propose An R&amp;D Partnership
        </button>
      </section>
    </div>
  );
};
