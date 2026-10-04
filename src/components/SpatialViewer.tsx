import React, { useState, useMemo } from 'react';
import { 
  Layers, 
  Eye, 
  EyeOff, 
  Sliders, 
  Dna, 
  Maximize2, 
  RotateCcw,
  Sparkles,
  Compass
} from 'lucide-react';
import { generateSpatialSpots } from '../data/mockAtlasData';
import { SpatialSpot } from '../types';

export const SpatialViewer: React.FC = () => {
  const spots = useMemo(() => generateSpatialSpots(), []);
  
  const [showDapi, setShowDapi] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [showRegions, setShowRegions] = useState(true);
  const [activeMarker, setActiveMarker] = useState<'NEUROD1' | 'GFAP' | 'MBP' | 'SLC17A7'>('NEUROD1');
  const [threshold, setThreshold] = useState<number>(15);
  const [hoveredSpot, setHoveredSpot] = useState<SpatialSpot | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const regionColors: Record<string, string> = {
    'Cortical Layer I-II': '#38bdf8',
    'Cortical Layer III-IV': '#818cf8',
    'Cortical Layer V-VI': '#c084fc',
    'Subcortical White Matter': '#34d399',
  };

  const filteredSpots = spots.filter(
    (s) => s.markerExpression >= threshold
  );

  return (
    <div id="spatial-biology-view" className="w-full space-y-6">
      {/* Control Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">Spatial Transcriptomics &amp; Histology</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Sub-cellular spatial resolution of human coronal neocortical sections mapped with Visium HD and multiplexed RNA fluorescence.
          </p>
        </div>

        {/* Channel Toggles */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowDapi(!showDapi)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition ${
              showDapi
                ? 'bg-blue-500/20 text-blue-300 border-blue-500/50'
                : 'bg-slate-950 text-slate-400 border-slate-800'
            }`}
          >
            {showDapi ? <Eye className="w-3.5 h-3.5 text-blue-400" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>DAPI Nuclei</span>
          </button>

          <button
            onClick={() => setShowHeatmap(!showHeatmap)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition ${
              showHeatmap
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                : 'bg-slate-950 text-slate-400 border-slate-800'
            }`}
          >
            {showHeatmap ? <Eye className="w-3.5 h-3.5 text-cyan-400" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>Marker Heatmap</span>
          </button>

          <button
            onClick={() => setShowRegions(!showRegions)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition ${
              showRegions
                ? 'bg-purple-500/20 text-purple-300 border-purple-500/50'
                : 'bg-slate-950 text-slate-400 border-slate-800'
            }`}
          >
            {showRegions ? <Eye className="w-3.5 h-3.5 text-purple-400" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>Cortical Layers</span>
          </button>
        </div>
      </div>

      {/* Main Grid Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tissue Stage */}
        <div className="lg:col-span-3 relative h-[560px] bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl flex items-center justify-center select-none">
          {/* Subtle organ silhouette background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-950/20 via-slate-950 to-slate-950" />

          {/* Histological spot array */}
          <svg
            viewBox="0 0 720 480"
            className="w-full h-full cursor-crosshair z-10"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
            }}
          >
            {/* Outer tissue coronal contour */}
            <path
              d="M 120,240 C 120,100 240,60 360,60 C 480,60 600,100 600,240 C 600,380 480,420 360,420 C 240,420 120,380 120,240 Z"
              fill="none"
              stroke="#1e293b"
              strokeWidth="2"
              strokeDasharray="4 4"
              opacity="0.6"
            />

            {/* DAPI Fluorescent Background Cloud */}
            {showDapi && (
              <g opacity="0.3">
                <circle cx="360" cy="240" r="160" fill="#0284c7" filter="blur(45px)" />
                <circle cx="300" cy="200" r="120" fill="#3b82f6" filter="blur(35px)" />
              </g>
            )}

            {/* Render spatial spots */}
            {filteredSpots.map((spot) => {
              const isHovered = hoveredSpot?.id === spot.id;
              
              // Color calculation
              let fill = '#334155';
              if (showHeatmap) {
                const val = spot.markerExpression;
                fill = val > 75 ? '#facc15' : val > 50 ? '#06b6d4' : val > 30 ? '#0284c7' : '#1e293b';
              } else if (showRegions) {
                fill = regionColors[spot.region] || '#38bdf8';
              }

              const stroke = isHovered 
                ? '#ffffff' 
                : showRegions 
                  ? regionColors[spot.region] || '#0f172a' 
                  : '#0f172a';

              return (
                <circle
                  key={spot.id}
                  cx={spot.x}
                  cy={spot.y}
                  r={isHovered ? 8 : 5}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={isHovered ? 2 : 1}
                  opacity={isHovered ? 1 : 0.85}
                  className="transition-all duration-150 cursor-pointer"
                  onMouseEnter={() => setHoveredSpot(spot)}
                  onMouseLeave={() => setHoveredSpot(null)}
                />
              );
            })}
          </svg>

          {/* Interactive Spot Tooltip */}
          {hoveredSpot && (
            <div
              className="absolute z-30 pointer-events-none bg-slate-900/95 border border-cyan-500/40 rounded-xl p-3 shadow-2xl backdrop-blur-md text-xs w-64 animate-in fade-in zoom-in-95 duration-100"
              style={{
                left: Math.min(mousePos.x + 15, 500),
                top: Math.min(mousePos.y + 15, 380),
              }}
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-2">
                <span className="font-mono text-[10px] text-cyan-400 font-bold">{hoveredSpot.id}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                  {hoveredSpot.region}
                </span>
              </div>
              <div className="font-semibold text-white text-xs">{hoveredSpot.dominantCellType}</div>
              <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-800/80 text-[11px] font-mono">
                <div>
                  <span className="text-slate-400 block text-[9px]">TOTAL UMIS</span>
                  <span className="text-slate-200">{hoveredSpot.umiCount.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px]">{activeMarker} LEVEL</span>
                  <span className="text-cyan-400 font-bold">{hoveredSpot.markerExpression}%</span>
                </div>
              </div>
            </div>
          )}

          {/* Scale Bar */}
          <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg text-[10px] font-mono text-slate-300">
            <div className="w-12 h-1 bg-cyan-400 rounded-full" />
            <span>200 µm</span>
          </div>
        </div>

        {/* Controls Sidebar */}
        <div className="space-y-4">
          {/* Spatial Biomarker Selector */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Dna className="w-3.5 h-3.5 text-cyan-400" />
              <span>Target Biomarker</span>
            </h3>

            <div className="grid grid-cols-2 gap-2">
              {[
                { gene: 'NEUROD1', type: 'Neurogenesis', role: 'Cortical Neurons' },
                { gene: 'GFAP', type: 'Glial', role: 'Astrocytes' },
                { gene: 'MBP', type: 'Myelin', role: 'Oligodendrocytes' },
                { gene: 'SLC17A7', type: 'Glutamatergic', role: 'Excitatory' },
              ].map((m) => (
                <button
                  key={m.gene}
                  onClick={() => setActiveMarker(m.gene as any)}
                  className={`p-2.5 rounded-xl border text-left transition ${
                    activeMarker === m.gene
                      ? 'bg-cyan-500/20 border-cyan-500/50 text-white'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="font-mono text-xs font-bold text-cyan-400">{m.gene}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{m.role}</div>
                </button>
              ))}
            </div>

            {/* Expression Threshold Slider */}
            <div className="pt-2 border-t border-slate-800">
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="text-slate-400">Expression Threshold:</span>
                <span className="font-mono text-cyan-400 font-bold">{threshold}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="70"
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                className="w-full accent-cyan-400 bg-slate-800 rounded-lg cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Showing {filteredSpots.length} of {spots.length} active tissue capture spots.
              </span>
            </div>
          </div>

          {/* Regional Layers Legend */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2.5">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Histological Annotations
            </h3>
            <div className="space-y-2">
              {Object.entries(regionColors).map(([reg, col]) => (
                <div key={reg} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: col }} />
                    <span className="text-slate-200">{reg}</span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-400">Layer {reg.split(' ')[1]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
