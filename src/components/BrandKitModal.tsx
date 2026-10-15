import React, { useState } from 'react';
import { X, Download, Copy, Check, Palette, Sparkles, Layers, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo';

interface BrandKitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrandKitModal: React.FC<BrandKitModalProps> = ({ isOpen, onClose }) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [copiedSvg, setCopiedSvg] = useState(false);

  if (!isOpen) return null;

  const colorPalette = [
    { name: 'Institutional Navy', hex: '#0b2952', desc: 'M & M header typography and core branding' },
    { name: 'Helix Sky Blue', hex: '#0284c7', desc: 'DNA double helix strand & globe ocean' },
    { name: 'BioATLAS Emerald', hex: '#00897b', desc: 'BioATLAS gradient start & transcriptomics' },
    { name: 'Helix Leaf Lime', hex: '#65a30d', desc: 'DNA counter-strand & BioATLAS gradient end' },
    { name: 'Deep Midnight Slate', hex: '#071d33', desc: 'Institutional hero background & contrast' },
    { name: 'Pure Surface White', hex: '#ffffff', desc: 'Primary document & card background' },
  ];

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const rawSvgCode = `<svg width="400" height="400" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="globeContinentGrad" x1="0%" y1="20%" x2="100%" y2="80%">
      <stop offset="0%" stop-color="#0b3b70" />
      <stop offset="35%" stop-color="#0284c7" />
      <stop offset="65%" stop-color="#0d9488" />
      <stop offset="100%" stop-color="#65a30d" />
    </linearGradient>
    <linearGradient id="dnaBlueStrand" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="45%" stop-color="#0284c7" />
      <stop offset="100%" stop-color="#0369a1" />
    </linearGradient>
    <linearGradient id="dnaGreenStrand" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#a3e635" />
      <stop offset="50%" stop-color="#65a30d" />
      <stop offset="100%" stop-color="#15803d" />
    </linearGradient>
    <radialGradient id="sphereTopGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#67e8f9" />
      <stop offset="50%" stop-color="#0284c7" />
      <stop offset="100%" stop-color="#075985" />
    </radialGradient>
    <radialGradient id="sphereBottomGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="55%" stop-color="#0369a1" />
      <stop offset="100%" stop-color="#082f49" />
    </radialGradient>
    <linearGradient id="atlasTextGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00897b" />
      <stop offset="50%" stop-color="#059669" />
      <stop offset="100%" stop-color="#65a30d" />
    </linearGradient>
    <radialGradient id="globeAtmosphere" cx="50%" cy="50%" r="50%">
      <stop offset="70%" stop-color="#0284c7" stop-opacity="0.04" />
      <stop offset="100%" stop-color="#0284c7" stop-opacity="0.16" />
    </radialGradient>
  </defs>
  <circle cx="50" cy="46" r="42" fill="url(#globeAtmosphere)" stroke="#0b3b70" stroke-width="1.2" opacity="0.35" />
  <line x1="8" y1="46" x2="92" y2="46" stroke="#0b3b70" stroke-width="0.8" opacity="0.25" />
  <ellipse cx="50" cy="28" rx="37" ry="7" fill="none" stroke="#0b3b70" stroke-width="0.7" opacity="0.22" />
  <ellipse cx="50" cy="64" rx="37" ry="7" fill="none" stroke="#0b3b70" stroke-width="0.7" opacity="0.22" />
  <ellipse cx="50" cy="46" rx="17" ry="42" fill="none" stroke="#0b3b70" stroke-width="0.75" opacity="0.22" />
  <ellipse cx="50" cy="46" rx="31" ry="42" fill="none" stroke="#0b3b70" stroke-width="0.75" opacity="0.22" />
  <g fill="url(#globeContinentGrad)" opacity="0.82">
    <path d="M 23,20 Q 26,16 33,18 Q 39,20 37,26 Q 34,30 29,32 Q 26,36 28,40 Q 24,41 21,36 Q 19,28 23,20 Z" />
    <path d="M 31,46 Q 37,48 39,54 Q 40,62 35,70 Q 32,72 33,67 Q 31,60 29,54 Z" />
    <path d="M 46,22 Q 52,20 55,25 Q 52,30 47,28 Z" />
    <path d="M 48,32 Q 56,31 58,38 Q 56,46 54,52 Q 50,56 48,50 Q 46,40 48,32 Z" />
    <path d="M 57,20 Q 68,16 78,22 Q 82,28 76,34 Q 70,36 65,32 Q 60,28 57,20 Z" />
    <path d="M 72,52 Q 80,50 82,56 Q 80,62 74,61 Q 71,57 72,52 Z" />
  </g>
  <g stroke-width="2.8" stroke-linecap="round">
    <line x1="42" y1="16" x2="49" y2="16" stroke="#0284c7" />
    <line x1="51" y1="16" x2="58" y2="16" stroke="#65a30d" />
    <line x1="40" y1="21" x2="49" y2="21" stroke="#0284c7" />
    <line x1="51" y1="21" x2="60" y2="21" stroke="#65a30d" />
    <line x1="43" y1="26" x2="49" y2="26" stroke="#0284c7" />
    <line x1="51" y1="26" x2="57" y2="26" stroke="#65a30d" />
    <line x1="43" y1="39" x2="49" y2="39" stroke="#0284c7" />
    <line x1="51" y1="39" x2="57" y2="39" stroke="#65a30d" />
    <line x1="40" y1="44" x2="49" y2="44" stroke="#0284c7" />
    <line x1="51" y1="44" x2="60" y2="44" stroke="#65a30d" />
    <line x1="42" y1="50" x2="49" y2="50" stroke="#0284c7" />
    <line x1="51" y1="50" x2="58" y2="50" stroke="#65a30d" />
    <line x1="43" y1="63" x2="49" y2="63" stroke="#0284c7" />
    <line x1="51" y1="63" x2="57" y2="63" stroke="#65a30d" />
    <line x1="40" y1="69" x2="49" y2="69" stroke="#0284c7" />
    <line x1="51" y1="69" x2="60" y2="69" stroke="#65a30d" />
    <line x1="43" y1="74" x2="49" y2="74" stroke="#0284c7" />
    <line x1="51" y1="74" x2="57" y2="74" stroke="#65a30d" />
  </g>
  <g fill="none" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 50,6 Q 38,10 39,21 Q 40,31 50,34 Q 61,37 61,46 Q 61,55 50,59 Q 39,63 39,72 Q 39,81 50,86" stroke="url(#dnaBlueStrand)" />
    <path d="M 50,6 Q 62,10 61,21 Q 60,31 50,34 Q 39,37 39,46 Q 39,55 50,59 Q 61,63 61,72 Q 61,81 50,86" stroke="url(#dnaGreenStrand)" />
  </g>
  <circle cx="50" cy="5" r="4.5" fill="url(#sphereTopGrad)" />
  <circle cx="50" cy="87" r="4.5" fill="url(#sphereBottomGrad)" />
  <text x="50" y="102" text-anchor="middle" fill="#0b2952" font-family="system-ui, -apple-system, sans-serif" font-size="8.5" font-weight="800" letter-spacing="2">M &amp; M</text>
  <text x="34" y="115" text-anchor="end" fill="#0b2952" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="900" letter-spacing="-0.5">Bio</text>
  <text x="35" y="115" text-anchor="start" fill="url(#atlasTextGrad)" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="900" letter-spacing="-0.5">ATLAS</text>
</svg>`;

  const handleDownloadSvg = () => {
    const blob = new Blob([rawSvgCode], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'mm-bioatlas-official-logo.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopySvgCode = () => {
    navigator.clipboard.writeText(rawSvgCode);
    setCopiedSvg(true);
    setTimeout(() => setCopiedSvg(false), 2000);
  };

  return (
    <div
      id="brand-kit-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 my-8 text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Brand Identity Kit</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">M & M BioATLAS Identity & Logo Assets</h2>
            <p className="text-sm text-slate-400 mt-1">
              Engineered for academic presentations, scientific publications, posters, and web applications.
            </p>
          </div>
          <button
            id="close-brand-kit"
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="space-y-8 mt-6">
          {/* Logo Showcase Variants */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>Vector Emblem Showcase</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Official Stacked Emblem (Matching uploaded brand mark) */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col items-center justify-center text-center shadow-xs">
                <Logo size="lg" variant="stacked" theme="light" />
                <span className="text-[11px] font-mono text-slate-600 mt-3 font-semibold">Official Emblem (Stacked)</span>
              </div>

              {/* Light canvas horizontal */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col items-center justify-center text-center shadow-xs">
                <Logo size="md" variant="full" theme="light" />
                <span className="text-[11px] font-mono text-slate-500 mt-4">Header Lockup (Light)</span>
              </div>

              {/* Dark canvas horizontal */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col items-center justify-center text-center">
                <Logo size="md" variant="full" theme="dark" />
                <span className="text-[11px] font-mono text-slate-400 mt-4">Footer Lockup (Dark)</span>
              </div>

              {/* Icon Only & Badge */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col items-center justify-center gap-2">
                <div className="flex items-center gap-3">
                  <Logo size="md" variant="icon" />
                  <Logo variant="badge" theme="dark" />
                </div>
                <span className="text-[11px] font-mono text-slate-400 mt-2">Icon &amp; Pill Badge</span>
              </div>
            </div>

            {/* Actions for Logo */}
            <div className="flex flex-wrap items-center gap-3 mt-4">
              <button
                id="btn-download-svg"
                onClick={handleDownloadSvg}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition shadow-lg shadow-cyan-500/20 active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>Download Vector SVG (.svg)</span>
              </button>
              <button
                id="btn-copy-svg"
                onClick={handleCopySvgCode}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium border border-slate-700 transition"
              >
                {copiedSvg ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedSvg ? 'SVG Copied to Clipboard!' : 'Copy Raw SVG Code'}</span>
              </button>
            </div>
          </div>

          {/* Color System Tokens */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-cyan-400" />
              <span>Biochromatic Color Tokens</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {colorPalette.map((col) => (
                <div
                  key={col.hex}
                  onClick={() => handleCopyHex(col.hex)}
                  className="group bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 hover:border-cyan-500/50 cursor-pointer transition relative"
                >
                  <div
                    className="w-full h-10 rounded-lg shadow-inner mb-2.5 border border-white/10"
                    style={{ backgroundColor: col.hex }}
                  />
                  <div className="text-xs font-semibold text-white leading-tight truncate">{col.name}</div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mt-1">
                    <span>{col.hex}</span>
                    {copiedHex === col.hex ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-tight">
                    {col.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scientific Symbolism & Mission */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-200">Emblem Geometry & Scientific Significance</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                The M & M BioATLAS insignia harmonizes two antiparallel double-helix strands that converge to construct dual &lsquo;M&rsquo; peaks—representing <strong>Molecular &amp; Microbiome</strong> systems (and founding investigators). The glowing nodal vertices symbolize single-cell barcode anchors and spatial histology spots.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
