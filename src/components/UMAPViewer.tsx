import React, { useState, useMemo } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Download, 
  Dna, 
  Sliders, 
  Info,
  Maximize2
} from 'lucide-react';
import { generateSingleCellPoints, GENES_DATABASE } from '../data/mockAtlasData';
import { SingleCellPoint } from '../types';

interface UMAPViewerProps {
  initialGene?: string;
}

export const UMAPViewer: React.FC<UMAPViewerProps> = ({ initialGene = 'CD3D' }) => {
  const points = useMemo(() => generateSingleCellPoints(), []);
  
  const [selectedCluster, setSelectedCluster] = useState<number | null>(null);
  const [colorMode, setColorMode] = useState<'cluster' | 'expression'>('cluster');
  const [activeGene, setActiveGene] = useState<string>(initialGene);
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hoveredPoint, setHoveredPoint] = useState<SingleCellPoint | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const clusterPalette = [
    { id: 0, name: 'Cytotoxic CD8+ T Cells', color: '#38bdf8', bg: 'bg-sky-400' },
    { id: 1, name: 'Ventricular Cardiomyocytes', color: '#f43f5e', bg: 'bg-rose-500' },
    { id: 2, name: 'Alveolar Type II (AT2)', color: '#2dd4bf', bg: 'bg-teal-400' },
    { id: 3, name: 'Glutamatergic Neurons', color: '#a855f7', bg: 'bg-purple-500' },
    { id: 4, name: 'Zonated Hepatocytes', color: '#10b981', bg: 'bg-emerald-500' },
    { id: 5, name: 'Lgr5+ Intestinal Crypt Cells', color: '#f59e0b', bg: 'bg-amber-500' },
    { id: 6, name: 'Vascular Endothelial Cells', color: '#ec4899', bg: 'bg-pink-500' },
    { id: 7, name: 'Activated Microglia', color: '#6366f1', bg: 'bg-indigo-500' },
  ];

  const handleZoom = (delta: number) => {
    setZoom((prev) => Math.min(2.5, Math.max(0.7, prev + delta)));
  };

  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setSelectedCluster(null);
  };

  // Expression color scale: low = dark navy/slate, mid = cyan, high = bright yellow
  const getExpressionColor = (score: number) => {
    // Normalization with sigmoid/linear blend
    const t = score / 100;
    if (t < 0.25) return '#1e293b'; // low expression
    if (t < 0.5) return '#0284c7'; // moderate
    if (t < 0.75) return '#06b6d4'; // elevated
    if (t < 0.9) return '#34d399'; // high
    return '#facc15'; // extreme (yellow)
  };

  // Download coordinates simulation
  const handleExportCSV = () => {
    let csv = 'Cell_ID,Cluster_ID,Cluster_Name,UMAP_1,UMAP_2,Tissue,Total_UMIs,Gene_Count,Marker_Expression\n';
    points.forEach((p) => {
      csv += `${p.id},${p.clusterId},"${p.clusterName}",${p.x.toFixed(2)},${p.y.toFixed(2)},${p.tissue},${p.umiCount},${p.geneCount},${p.markerLevel}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mm_bioatlas_umap_${activeGene}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div id="single-cell-umap-view" className="w-full space-y-6">
      {/* Control Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 animate-ping"></span>
            <h2 className="text-xl font-bold text-white tracking-tight">Interactive Single-Cell UMAP Manifold</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Uniform Manifold Approximation &amp; Projection of 1,120 annotated single-cell transcriptomes across human organ systems.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Color Mode Toggle */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setColorMode('cluster')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                colorMode === 'cluster'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Cell Lineages
            </button>
            <button
              onClick={() => setColorMode('expression')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                colorMode === 'expression'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Gene Expression
            </button>
          </div>

          {/* Gene selector if in expression mode */}
          {colorMode === 'expression' && (
            <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
              <Dna className="w-3.5 h-3.5 text-cyan-400" />
              <select
                value={activeGene}
                onChange={(e) => setActiveGene(e.target.value)}
                className="bg-transparent text-xs text-cyan-300 font-mono font-semibold focus:outline-none cursor-pointer"
              >
                {GENES_DATABASE.map((g) => (
                  <option key={g.symbol} value={g.symbol} className="bg-slate-900 text-white">
                    {g.symbol} ({g.name.split(' ')[0]})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Export Button */}
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Main Plot Stage & Cluster Legend */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* The Interactive Canvas / SVG Plot */}
        <div className="lg:col-span-3 relative h-[560px] bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl flex items-center justify-center select-none">
          {/* Grid lines background */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />

          {/* Floating Canvas Controls */}
          <div className="absolute top-4 right-4 z-20 flex flex-col gap-1.5 bg-slate-900/90 border border-slate-800 p-1.5 rounded-xl backdrop-blur-md shadow-lg">
            <button
              onClick={() => handleZoom(0.2)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleZoom(-0.2)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleReset}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              title="Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Axis Labels */}
          <div className="absolute bottom-3 left-4 text-[10px] font-mono text-slate-400">
            UMAP 1 →
          </div>
          <div className="absolute top-4 left-3 text-[10px] font-mono text-slate-400 [writing-mode:vertical-lr] rotate-180">
            UMAP 2 →
          </div>

          {/* Expression Color Gradient Bar (When in expression mode) */}
          {colorMode === 'expression' && (
            <div className="absolute bottom-4 right-4 z-20 bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl backdrop-blur-md flex flex-col gap-1.5 w-44">
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-300">
                <span>{activeGene} log2(Exp)</span>
                <span className="text-cyan-400 font-semibold">Max 9.8</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-gradient-to-r from-slate-800 via-sky-600 via-cyan-400 to-amber-300 border border-slate-700/50" />
              <div className="flex justify-between text-[9px] font-mono text-slate-400">
                <span>0.0</span>
                <span>4.9</span>
                <span>9.8</span>
              </div>
            </div>
          )}

          {/* SVG Plot Render */}
          <svg
            viewBox="0 0 800 650"
            className="w-full h-full cursor-crosshair transition-transform duration-200"
            style={{
              transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
            }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
            }}
          >
            {/* Soft cluster centroids halo */}
            {colorMode === 'cluster' && clusterPalette.map((cl) => {
              const clusterPoints = points.filter((p) => p.clusterId === cl.id);
              if (!clusterPoints.length) return null;
              const avgX = clusterPoints.reduce((acc, p) => acc + p.x, 0) / clusterPoints.length;
              const avgY = clusterPoints.reduce((acc, p) => acc + p.y, 0) / clusterPoints.length;

              return (
                <g key={cl.id} opacity={selectedCluster === null || selectedCluster === cl.id ? 0.35 : 0.05}>
                  <circle cx={avgX} cy={avgY} r="65" fill={cl.color} filter="blur(20px)" />
                  <text
                    x={avgX}
                    y={avgY - 45}
                    textAnchor="middle"
                    fill={cl.color}
                    className="text-[11px] font-mono font-bold tracking-wider uppercase select-none pointer-events-none"
                    stroke="#020617"
                    strokeWidth="3"
                    paintOrder="stroke fill"
                  >
                    {cl.name}
                  </text>
                </g>
              );
            })}

            {/* Render single-cell points */}
            {points.map((pt) => {
              const isClusterSelected = selectedCluster === null || selectedCluster === pt.clusterId;
              const isHovered = hoveredPoint?.id === pt.id;

              const cellFill =
                colorMode === 'cluster'
                  ? clusterPalette[pt.clusterId]?.color || '#38bdf8'
                  : getExpressionColor(pt.markerLevel);

              return (
                <circle
                  key={pt.id}
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? 6.5 : isClusterSelected ? 3.5 : 2}
                  fill={cellFill}
                  opacity={isHovered ? 1 : isClusterSelected ? 0.88 : 0.15}
                  stroke={isHovered ? '#ffffff' : '#020617'}
                  strokeWidth={isHovered ? 1.5 : 0.5}
                  className="transition-all duration-150 cursor-pointer"
                  onMouseEnter={() => setHoveredPoint(pt)}
                  onMouseLeave={() => setHoveredPoint(null)}
                  onClick={() => setSelectedCluster(selectedCluster === pt.clusterId ? null : pt.clusterId)}
                />
              );
            })}
          </svg>

          {/* Hover Tooltip Box */}
          {hoveredPoint && (
            <div
              className="absolute z-30 pointer-events-none bg-slate-900/95 border border-cyan-500/40 rounded-xl p-3 shadow-2xl backdrop-blur-md text-xs w-64 animate-in fade-in zoom-in-95 duration-100"
              style={{
                left: Math.min(mousePos.x + 15, 520),
                top: Math.min(mousePos.y + 15, 420),
              }}
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-2">
                <span className="font-mono text-[10px] text-cyan-400 font-bold">{hoveredPoint.id}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                  {hoveredPoint.tissue}
                </span>
              </div>
              <div className="font-semibold text-white text-xs">{hoveredPoint.clusterName}</div>
              <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-800/80 text-[11px] font-mono">
                <div>
                  <span className="text-slate-400 block text-[9px]">TOTAL UMIS</span>
                  <span className="text-slate-200">{hoveredPoint.umiCount.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px]">GENES DETECTED</span>
                  <span className="text-slate-200">{hoveredPoint.geneCount}</span>
                </div>
                <div className="col-span-2 flex items-center justify-between pt-1">
                  <span className="text-slate-400 text-[10px]">{activeGene} EXP SCORE:</span>
                  <span className="text-cyan-400 font-bold">{hoveredPoint.markerLevel}%</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar: Clusters & Cell Composition */}
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                <span>Lineage Clusters ({clusterPalette.length})</span>
              </h3>
              {selectedCluster !== null && (
                <button
                  onClick={() => setSelectedCluster(null)}
                  className="text-[10px] text-cyan-400 hover:underline"
                >
                  Clear filter
                </button>
              )}
            </div>

            <div className="space-y-1.5 max-h-[360px] overflow-y-auto pr-1">
              {clusterPalette.map((cl) => {
                const isSelected = selectedCluster === cl.id;
                return (
                  <button
                    key={cl.id}
                    onClick={() => setSelectedCluster(isSelected ? null : cl.id)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition border ${
                      isSelected
                        ? 'bg-cyan-500/15 border-cyan-500/50 text-white'
                        : 'bg-slate-950/60 hover:bg-slate-800/80 border-slate-800/80 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span
                        className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                        style={{ backgroundColor: cl.color }}
                      />
                      <span className="text-xs font-medium truncate">{cl.name}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 shrink-0 ml-2">140 cells</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Technical Info Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 text-slate-400 text-xs space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs">
              <Info className="w-4 h-4 shrink-0" />
              <span>Dimensionality Reduction Metrics</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Standardized with harmony batch integration across 10x Chromium Next GEM 3&apos; v3.1 chemistry, normalized with SCTransform v2.
            </p>
            <div className="pt-2 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-300">
              <div>
                <span className="text-slate-400 block">HARMONY ITERS</span>
                <span>15 converged</span>
              </div>
              <div>
                <span className="text-slate-400 block">PERPLEXITY</span>
                <span>30.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
