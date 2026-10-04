import React, { useEffect, useRef, useState } from 'react';
import { 
  Play, 
  Pause, 
  RotateCw, 
  Maximize2, 
  CheckCircle2, 
  Cpu, 
  Dna, 
  FileText, 
  Sparkles, 
  Activity,
  Layers,
  ZoomIn,
  ZoomOut,
  Info
} from 'lucide-react';

/* ==========================================================================
   1. HERO SCIENTIFIC PLATE: PLATE I · 3D PROTEIN-LIGAND COMPLEX (PDB: 7V1A)
   ========================================================================== */
export const HeroScientificPlate: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [rotX, setRotX] = useState(0.3);
  const [rotY, setRotY] = useState(0.4);
  const [zoom, setZoom] = useState(1);
  const [activeResidue, setActiveResidue] = useState<string | null>('Asp184');
  const isDraggingRef = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let angle = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.parentElement?.clientWidth || 440;
    const height = 300;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    // 3D Nodes representing alpha-helix backbone + ligand
    const nodes = [
      // Helix 1
      { x: -70, y: -60, z: -20, r: 8, color: '#2563eb', label: 'Tyr150' },
      { x: -50, y: -40, z: 15, r: 7, color: '#3b82f6', label: 'Lys162' },
      { x: -30, y: -55, z: 35, r: 9, color: '#1d4ed8', label: 'Asp184' },
      { x: -10, y: -30, z: 20, r: 8, color: '#60a5fa', label: 'Phe185' },
      // Helix 2
      { x: 20, y: -50, z: -30, r: 8, color: '#0284c7', label: 'Glu204' },
      { x: 45, y: -30, z: -10, r: 7, color: '#0ea5e9', label: 'Arg210' },
      { x: 70, y: -45, z: 25, r: 8, color: '#38bdf8', label: 'His230' },
      // Beta-turn & active pocket
      { x: -40, y: 20, z: -20, r: 6, color: '#0d9488', label: 'Ser95' },
      { x: -15, y: 40, z: -10, r: 8, color: '#14b8a6', label: 'Thr96' },
      { x: 15, y: 35, z: 10, r: 7, color: '#2dd4bf', label: 'Gly97' },
      { x: 45, y: 15, z: 30, r: 8, color: '#059669', label: 'Cys112' },
      // Docked small molecule ligand (gold/emerald core)
      { x: 0, y: 0, z: 5, r: 11, color: '#eab308', isLigand: true, label: 'LIGAND-C1' },
      { x: -12, y: -8, z: 12, r: 6, color: '#f59e0b', isLigand: true, label: 'LIGAND-N2' },
      { x: 12, y: 8, z: -8, r: 6, color: '#ef4444', isLigand: true, label: 'LIGAND-O3' },
      { x: 14, y: -10, z: 15, r: 6, color: '#10b981', isLigand: true, label: 'LIGAND-F4' },
    ];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Gradient background with traditional laboratory blueprint grid
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#0a192f');
      bgGrad.addColorStop(1, '#071324');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Fine grid lines
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.07)';
      ctx.lineWidth = 1;
      const gridSize = 24;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Docking bounding box
      const boxSize = 110 * zoom;
      const cx = width / 2;
      const cy = height / 2;

      ctx.save();
      ctx.translate(cx, cy);

      if (isPlaying) {
        angle += 0.008;
      }

      const currentRotY = rotY + (isPlaying ? angle : 0);
      const currentRotX = rotX;

      const cosY = Math.cos(currentRotY);
      const sinY = Math.sin(currentRotY);
      const cosX = Math.cos(currentRotX);
      const sinX = Math.sin(currentRotX);

      // Draw dashed docking grid cube
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.25)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(-boxSize / 2, -boxSize / 2, boxSize, boxSize);
      ctx.setLineDash([]);

      // Project nodes in 3D
      const projected = nodes.map(node => {
        // Rotate Y
        let x1 = node.x * cosY - node.z * sinY;
        let z1 = node.z * cosY + node.x * sinY;
        // Rotate X
        let y2 = node.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + node.y * sinX;

        const scale = (350 / (350 + z2)) * zoom;
        const px = x1 * scale;
        const py = y2 * scale;

        return {
          ...node,
          px,
          py,
          scale,
          zDepth: z2,
        };
      });

      // Sort by depth
      projected.sort((a, b) => a.zDepth - b.zDepth);

      // Draw backbone connections
      ctx.strokeStyle = 'rgba(96, 165, 250, 0.4)';
      ctx.lineWidth = 2.5 * zoom;
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        const p = projected.find(p => p.label === nodes[i].label)!;
        if (i === 0) ctx.moveTo(p.px, p.py);
        else ctx.lineTo(p.px, p.py);
      }
      ctx.stroke();

      ctx.strokeStyle = 'rgba(45, 212, 191, 0.4)';
      ctx.beginPath();
      for (let i = 7; i < 11; i++) {
        const p = projected.find(p => p.label === nodes[i].label)!;
        if (i === 7) ctx.moveTo(p.px, p.py);
        else ctx.lineTo(p.px, p.py);
      }
      ctx.stroke();

      // Hydrogen bond lines to ligand
      const ligNode = projected.find(p => p.label === 'LIGAND-C1')!;
      const aspNode = projected.find(p => p.label === 'Asp184')!;
      if (ligNode && aspNode) {
        ctx.strokeStyle = 'rgba(234, 179, 8, 0.85)';
        ctx.setLineDash([3, 3]);
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(ligNode.px, ligNode.py);
        ctx.lineTo(aspNode.px, aspNode.py);
        ctx.stroke();
        ctx.setLineDash([]);

        // Label distance
        const midX = (ligNode.px + aspNode.px) / 2;
        const midY = (ligNode.px + aspNode.py) / 2;
        ctx.fillStyle = '#fef08a';
        ctx.font = '9px monospace';
        ctx.fillText('2.31 Å (H-bond)', midX + 6, midY);
      }

      // Render 3D atoms
      projected.forEach(p => {
        const rad = Math.max(2, p.r * p.scale);
        const grad = ctx.createRadialGradient(
          p.px - rad * 0.3,
          p.py - rad * 0.3,
          rad * 0.1,
          p.px,
          p.py,
          rad
        );

        if (p.isLigand) {
          grad.addColorStop(0, '#fef08a');
          grad.addColorStop(0.5, p.color);
          grad.addColorStop(1, '#78350f');
        } else {
          grad.addColorStop(0, '#ffffff');
          grad.addColorStop(0.4, p.color);
          grad.addColorStop(1, '#0f172a');
        }

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.px, p.py, rad, 0, Math.PI * 2);
        ctx.fill();

        // Residue label
        if (p.label === activeResidue || p.isLigand) {
          ctx.fillStyle = p.isLigand ? '#facc15' : '#e2e8f0';
          ctx.font = '10px sans-serif';
          ctx.fillText(p.label, p.px + rad + 4, p.py + 3);
        }
      });

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isPlaying, rotX, rotY, zoom, activeResidue]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;
    setRotY(prev => prev + dx * 0.01);
    setRotX(prev => Math.max(-1.2, Math.min(1.2, prev + dy * 0.01)));
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div className="rounded-2xl border-2 border-slate-300/80 bg-white overflow-hidden shadow-md flex flex-col font-sans">
      {/* Traditional Editorial Figure Header */}
      <div className="px-4 py-2.5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono font-bold tracking-wider uppercase text-sky-400">
            Plate I · Cryo-EM Protein-Ligand Complex
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
            1.24 Å Resolution
          </span>
          <span className="text-[10px] font-mono text-slate-400">PDB: 7V1A</span>
        </div>
      </div>

      {/* Dedicated Non-Overlapping Telemetry Strip */}
      <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
        <div className="flex items-center gap-3">
          <span className="text-cyan-300 font-semibold">ΔG: -10.4 kcal/mol (Ki = 24.3 nM)</span>
          <span className="text-slate-600">|</span>
          <span className="text-emerald-300 font-semibold">RMSD: 0.84 Å · CHARMM36m</span>
        </div>
        <span className="text-[10px] text-slate-400">Drag to rotate 3D view</span>
      </div>

      {/* Dynamic 3D Molecular Simulation Canvas (Clean, zero overlapping overlays) */}
      <div 
        className="relative bg-slate-950 cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <canvas ref={canvasRef} className="block w-full h-[240px] sm:h-[260px]" />
      </div>

      {/* Dedicated Non-Overlapping Controls Bar */}
      <div className="px-4 py-2 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
        <span className="text-[11px] font-mono text-slate-400">
          Catalytic Pocket Simulation
        </span>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? 'Pause trajectory' : 'Play trajectory'}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition text-xs"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => { setRotX(0.3); setRotY(0.4); setZoom(1); }}
            title="Reset orientation"
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition text-xs"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoom(z => Math.min(1.4, z + 0.1))}
            title="Zoom In"
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition text-xs"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoom(z => Math.max(0.7, z - 0.1))}
            title="Zoom Out"
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition text-xs"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Traditional Academic Caption & Legend */}
      <div className="p-3.5 bg-slate-50 border-t border-slate-200 text-xs space-y-1">
        <div className="flex items-center justify-between">
          <div className="font-bold text-slate-900 flex items-center gap-1.5">
            <span>Fig. 1.0</span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-700">Atomistic Protein-Ligand Interface &amp; Energetics</span>
          </div>
          <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
            Validated Lead
          </span>
        </div>
        <p className="text-[11px] text-slate-600 leading-relaxed font-serif">
          Structural representation of small-molecule candidate docked into the catalytic pocket. Hydrophobic contacts and key hydrogen bonding (Asp184, Tyr150) simulated at 300 K under NPT ensemble using GROMACS GPU acceleration.
        </p>
      </div>
    </div>
  );
};

/* ==========================================================================
   2. MOLECULAR DOCKING VISUAL: FIGURE 1A (CRO PIPELINE)
   ========================================================================== */
export const MolecularDockingCardVisual: React.FC = () => {
  const [activePose, setActivePose] = useState(1);

  const poses = [
    { pose: 1, affinity: -10.4, rmsd: 0.0, hBonds: 4, label: 'Pose 1 (Top Rank)' },
    { pose: 2, affinity: -9.8, rmsd: 1.1, hBonds: 3, label: 'Pose 2' },
    { pose: 3, affinity: -9.2, rmsd: 1.8, hBonds: 2, label: 'Pose 3' },
  ];

  return (
    <div className="rounded-2xl border-2 border-slate-200 bg-white overflow-hidden shadow-xs hover:shadow-md transition">
      {/* Editorial Plate Header */}
      <div className="px-3.5 py-2 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-xs">
        <span className="font-mono font-bold text-blue-900">PLATE II · DOCKING MATRIX</span>
        <span className="text-[10px] font-mono px-2 py-0.5 bg-white border border-slate-300 rounded text-slate-600 font-semibold">
          AutoDock Vina 1.2
        </span>
      </div>

      {/* High-Resolution SVG Interaction Diagram */}
      <div className="relative p-4 bg-gradient-to-b from-blue-950 via-slate-900 to-blue-950 flex flex-col items-center justify-center min-h-[170px] overflow-hidden">
        <svg viewBox="0 0 320 130" className="w-full h-auto max-h-[140px]">
          {/* Active Site Receptor Pocket Boundary */}
          <path
            d="M 20 20 Q 90 100 160 85 T 300 30"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="3"
            strokeDasharray="4,4"
            className="animate-pulse"
          />

          {/* Electrostatic Surface Clouds */}
          <circle cx="80" cy="50" r="32" fill="rgba(59, 130, 246, 0.18)" />
          <circle cx="160" cy="70" r="40" fill="rgba(16, 185, 129, 0.22)" />
          <circle cx="240" cy="45" r="30" fill="rgba(244, 63, 94, 0.16)" />

          {/* Residue Side Chains */}
          <g className="text-[10px] font-mono fill-sky-200 font-bold">
            <line x1="60" y1="20" x2="80" y2="50" stroke="#60a5fa" strokeWidth="2" />
            <text x="50" y="16">His57</text>

            <line x1="160" y1="110" x2="160" y2="70" stroke="#34d399" strokeWidth="2" />
            <text x="145" y="124">Asp102</text>

            <line x1="260" y1="20" x2="240" y2="45" stroke="#f43f5e" strokeWidth="2" />
            <text x="250" y="16">Ser195</text>
          </g>

          {/* Small Molecule Compound Skeleton */}
          <g transform={`translate(${activePose === 1 ? '140, 55' : activePose === 2 ? '135, 50' : '145, 60'}) transition-transform duration-300`}>
            {/* Benzene Ring */}
            <polygon points="0,-16 14,-8 14,8 0,16 -14,8 -14,-8" fill="rgba(234, 179, 8, 0.3)" stroke="#facc15" strokeWidth="2.5" />
            {/* Functional Linker */}
            <line x1="14" y1="0" x2="32" y2="10" stroke="#facc15" strokeWidth="2.5" />
            <circle cx="32" cy="10" r="5" fill="#ef4444" />
            {/* Second Ring */}
            <polygon points="32,10 46,2 58,10 58,24 46,32 32,24" fill="rgba(56, 189, 248, 0.3)" stroke="#38bdf8" strokeWidth="2" />

            {/* H-Bond Lines */}
            <line x1="32" y1="10" x2="20" y2="15" stroke="#4ade80" strokeWidth="1.8" strokeDasharray="2,2" />
            <line x1="0" y1="-16" x2="-60" y2="-5" stroke="#fef08a" strokeWidth="1.8" strokeDasharray="2,2" />
          </g>

          {/* Interactive H-bond label */}
          <text x="100" y="32" fill="#a7f3d0" fontSize="9" fontFamily="monospace">
            H-Bond 2.1 Å
          </text>
        </svg>

        {/* Pose Switcher */}
        <div className="flex items-center gap-1.5 z-10 mt-1">
          {poses.map(p => (
            <button
              key={p.pose}
              onClick={() => setActivePose(p.pose)}
              className={`px-2.5 py-1 rounded-md text-[10px] font-mono transition ${
                activePose === p.pose
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20'
              }`}
            >
              Pose {p.pose} ({p.affinity} kcal/mol)
            </button>
          ))}
        </div>
      </div>

      {/* Traditional Caption */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-600">
        <span className="font-bold text-slate-900">Figure 2.1: </span>
        Target binding confirmation in serine protease catalytic triad with high affinity score.
      </div>
    </div>
  );
};

/* ==========================================================================
   3. GENOMICS & RNA-SEQ VOLCANO MATRIX: FIGURE 2B
   ========================================================================== */
export const GenomicsNgsCardVisual: React.FC = () => {
  const [selectedGene, setSelectedGene] = useState<string | null>('TP53');

  const genes = [
    { name: 'TP53', fc: 3.4, pval: 6.8, type: 'up' },
    { name: 'EGFR', fc: -2.8, pval: 5.4, type: 'down' },
    { name: 'BRCA1', fc: 2.9, pval: 7.2, type: 'up' },
    { name: 'VEGFA', fc: 4.1, pval: 8.5, type: 'up' },
    { name: 'KRAS', fc: -3.2, pval: 6.1, type: 'down' },
    { name: 'MYC', fc: 2.1, pval: 4.3, type: 'up' },
    { name: 'ACTB', fc: 0.1, pval: 0.8, type: 'ns' },
    { name: 'GAPDH', fc: -0.2, pval: 0.5, type: 'ns' },
  ];

  return (
    <div className="rounded-2xl border-2 border-slate-200 bg-white overflow-hidden shadow-xs hover:shadow-md transition">
      {/* Editorial Plate Header */}
      <div className="px-3.5 py-2 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-xs">
        <span className="font-mono font-bold text-emerald-900">PLATE III · DIFFERENTIAL EXPRESSION</span>
        <span className="text-[10px] font-mono px-2 py-0.5 bg-white border border-slate-300 rounded text-slate-600 font-semibold">
          DESeq2 FDR &lt; 0.05
        </span>
      </div>

      {/* High-Resolution Volcano Plot Vector */}
      <div className="relative p-4 bg-slate-950 flex flex-col items-center justify-center min-h-[170px]">
        <svg viewBox="0 0 320 130" className="w-full h-auto max-h-[140px]">
          {/* Axis lines */}
          <line x1="30" y1="110" x2="300" y2="110" stroke="#475569" strokeWidth="1.5" />
          <line x1="165" y1="10" x2="165" y2="110" stroke="#334155" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="30" y1="10" x2="30" y2="110" stroke="#475569" strokeWidth="1.5" />

          {/* Significance Threshold Line */}
          <line x1="30" y1="65" x2="300" y2="65" stroke="#ef4444" strokeWidth="1" strokeDasharray="3,3" />
          <text x="235" y="60" fill="#f87171" fontSize="8" fontFamily="monospace">p &lt; 0.001</text>

          {/* Gene Loci Dots */}
          {genes.map((g) => {
            // Map fold change to x: center is 165, range -5 to 5
            const cx = 165 + g.fc * 25;
            // Map pval to y: range 0 to 10
            const cy = 110 - g.pval * 10;
            const isSelected = selectedGene === g.name;

            return (
              <g 
                key={g.name} 
                className="cursor-pointer"
                onClick={() => setSelectedGene(g.name)}
              >
                <circle
                  cx={cx}
                  cy={cy}
                  r={isSelected ? 6 : g.type === 'ns' ? 3 : 4.5}
                  fill={
                    g.type === 'up' 
                      ? '#ef4444' 
                      : g.type === 'down' 
                      ? '#3b82f6' 
                      : '#64748b'
                  }
                  stroke={isSelected ? '#ffffff' : 'none'}
                  strokeWidth="2"
                  className="transition-all hover:scale-125"
                />
                {isSelected && (
                  <text 
                    x={cx + 8} 
                    y={cy + 3} 
                    fill="#ffffff" 
                    fontSize="10" 
                    fontWeight="bold" 
                    fontFamily="sans-serif"
                  >
                    {g.name} (log2FC: {g.fc})
                  </text>
                )}
              </g>
            );
          })}

          {/* Labels */}
          <text x="40" y="125" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">Downregulated</text>
          <text x="240" y="125" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">Upregulated</text>
          <text x="10" y="30" fill="#94a3b8" fontSize="8" fontFamily="sans-serif" transform="rotate(-90 15,30)">-log10(p)</text>
        </svg>

        {/* Selected Gene Badge */}
        <div className="flex items-center gap-2 mt-1 text-[11px] font-mono text-slate-300">
          <span className="text-slate-400">Selected Gene:</span>
          <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
            {selectedGene || 'TP53'}
          </span>
          <span className="text-slate-500 hidden sm:inline">Click points to inspect loci</span>
        </div>
      </div>

      {/* Traditional Caption */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-600">
        <span className="font-bold text-slate-900">Figure 3.2: </span>
        Transcriptomic volcano distribution showing significant oncogenic differential targets.
      </div>
    </div>
  );
};

/* ==========================================================================
   4. ACADEMIC MANUSCRIPT & TYPESETTING VISUAL: FIGURE 3C
   ========================================================================== */
export const AcademicManuscriptCardVisual: React.FC = () => {
  return (
    <div className="rounded-2xl border-2 border-slate-200 bg-white overflow-hidden shadow-xs hover:shadow-md transition">
      {/* Editorial Plate Header */}
      <div className="px-3.5 py-2 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-xs">
        <span className="font-mono font-bold text-purple-900">PLATE IV · Q1 JOURNAL PROOF</span>
        <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded font-semibold">
          Accepted for Publication
        </span>
      </div>

      {/* High-Resolution Typeset Manuscript Mockup */}
      <div className="relative p-5 bg-gradient-to-b from-amber-50/40 via-white to-slate-50 flex flex-col justify-between min-h-[170px] border-b border-slate-200 font-serif">
        {/* Masthead Bar */}
        <div className="flex items-center justify-between border-b border-slate-300 pb-2 text-[10px] text-slate-500">
          <span>JOURNAL OF COMPUTATIONAL BIOLOGY · VOL 48</span>
          <span className="font-mono text-blue-700">DOI: 10.1016/j.jcb.2024.08.012</span>
        </div>

        {/* Paper Title & Abstract Header */}
        <div className="space-y-1 my-2">
          <div className="text-xs font-bold font-sans text-slate-900 leading-snug">
            High-Throughput In Silico Screening Identifies Novel Allosteric Inhibitors
          </div>
          <div className="text-[10px] text-slate-600 font-sans">
            Munikumar M. et al. • <span className="italic">M &amp; M BioATLAS Consortium</span>
          </div>
        </div>

        {/* Two-Column Mockup Text with Embedded Figure Plate */}
        <div className="grid grid-cols-2 gap-3 text-[9px] text-slate-600 leading-tight">
          <div className="space-y-1">
            <p>
              Abstract: Utilizing molecular dynamics and Markov state models, free energy landscapes were computed across 100 ns GPU trajectories.
            </p>
            <div className="h-6 w-full bg-slate-200/70 rounded border border-slate-300 flex items-center justify-center text-[8px] font-mono text-slate-500">
              [FIGURE 1A: RMSD MATRIX]
            </div>
          </div>

          <div className="space-y-1">
            <p>
              Results demonstrate high binding specificity, consistent with biochemical validation in 24 international partner laboratories.
            </p>
            <div className="flex items-center gap-1 text-[8px] font-mono text-emerald-700 font-bold bg-emerald-50 p-1 rounded border border-emerald-200">
              <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
              <span>ICMJE &amp; PRISMA Verified</span>
            </div>
          </div>
        </div>

        {/* Traditional Official Red Review Stamp */}
        <div className="absolute right-4 bottom-3 border-2 border-red-600/80 rounded-lg px-2 py-0.5 transform rotate-6 bg-white/90 shadow-xs pointer-events-none">
          <span className="text-[9px] font-mono font-extrabold text-red-700 uppercase tracking-widest">
            PEER REVIEWED
          </span>
        </div>
      </div>

      {/* Traditional Caption */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-600">
        <span className="font-bold text-slate-900">Figure 4.0: </span>
        Publication-ready manuscript formatting targeting Nature, Elsevier, and Springer venues.
      </div>
    </div>
  );
};

/* ==========================================================================
   5. TRAINING WORKBENCH & PIPELINE VISUAL: FIGURE 4A
   ========================================================================== */
export const TrainingWorkbenchCardVisual: React.FC = () => {
  const [activeStep, setActiveStep] = useState(2);

  const steps = [
    { num: 1, title: 'FASTA Extraction', code: 'seq = SeqIO.read("target.fasta")' },
    { num: 2, title: 'Needleman-Wunsch Alignment', code: 'aligner.score(seqA, seqB) -> 98.4%' },
    { num: 3, title: 'Variant Annotation', code: 'vcf.annotate(dbSNP_build=155)' },
  ];

  return (
    <div className="rounded-2xl border-2 border-slate-200 bg-white overflow-hidden shadow-xs hover:shadow-md transition">
      {/* Editorial Plate Header */}
      <div className="px-3.5 py-2 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-xs">
        <span className="font-mono font-bold text-slate-900">PLATE V · HPC COMPUTATIONAL PIPELINE</span>
        <span className="text-[10px] font-mono px-2 py-0.5 bg-blue-100 text-blue-900 rounded font-semibold">
          Python 3.11 • Biopython
        </span>
      </div>

      {/* High-Resolution Terminal & Interactive Code Execution */}
      <div className="p-4 bg-slate-950 font-mono text-xs text-slate-200 min-h-[170px] flex flex-col justify-between">
        <div className="flex items-center gap-1.5 pb-2 border-b border-slate-800">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span className="text-[10px] text-slate-400 ml-2">bioatlas-gpu-cluster-01 ~ bash</span>
        </div>

        <div className="space-y-1.5 my-2">
          <div className="text-emerald-400 text-[11px]">
            $ python run_pipeline.py --workflow=structural-dynamics
          </div>
          <div className="text-slate-400 text-[10px]">
            [INFO] Loading PDB: 7V1A • Atoms: 4,812 • Water Box: TIP3P
          </div>
          <div className="text-sky-300 text-[10px]">
            [OK] Energy Minimization: 50,000 steps completed (Fmax &lt; 1000)
          </div>
          <div className="text-yellow-300 text-[10px] font-bold">
            &gt;&gt; Trajectory Output: 100.0 ns [RMSD convergence reached]
          </div>
        </div>

        {/* Step Selector for Students */}
        <div className="flex items-center gap-1.5 pt-2 border-t border-slate-800">
          {steps.map(s => (
            <button
              key={s.num}
              onClick={() => setActiveStep(s.num)}
              className={`px-2 py-0.5 rounded text-[10px] transition ${
                activeStep === s.num
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'bg-white/10 text-slate-400 hover:text-white'
              }`}
            >
              Step {s.num}
            </button>
          ))}
        </div>
      </div>

      {/* Traditional Caption */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-600">
        <span className="font-bold text-slate-900">Figure 5.0: </span>
        Direct hands-on terminal command execution in project-based bioinformatics cohorts.
      </div>
    </div>
  );
};
