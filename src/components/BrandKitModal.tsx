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
    { name: 'Bio Cyan (Primary)', hex: '#06b6d4', desc: 'Single-cell fluorophores & accents' },
    { name: 'Helix Blue', hex: '#3b82f6', desc: 'Macromolecular phosphodiester backbone' },
    { name: 'Microbiome Emerald', hex: '#10b981', desc: 'Taxonomic abundance & metabolic nodes' },
    { name: 'Ribosome Indigo', hex: '#6366f1', desc: 'Cellular ontology & deep clusters' },
    { name: 'Obsidian Slate', hex: '#020617', desc: 'Deep background contrast' },
    { name: 'Fluorophore Silver', hex: '#f8fafc', desc: 'High-contrast typography' },
  ];

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const rawSvgCode = `<svg width="200" height="200" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="helixGradPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#06b6d4" />
      <stop offset="50%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#8b5cf6" />
    </linearGradient>
    <linearGradient id="helixGradSecondary" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="50%" stop-color="#06b6d4" />
      <stop offset="100%" stop-color="#2563eb" />
    </linearGradient>
    <linearGradient id="nodeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#67e8f9" />
      <stop offset="100%" stop-color="#06b6d4" />
    </linearGradient>
    <radialGradient id="haloCenter" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#06b6d4" stop-opacity="0" />
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="44" fill="url(#haloCenter)" />
  <polygon points="50,6 88,27 88,73 50,94 12,73 12,27" stroke="#334155" stroke-width="1.5" stroke-dasharray="3 3" opacity="0.6" />
  <line x1="28" y1="36" x2="38" y2="46" stroke="#0ea5e9" stroke-width="2" stroke-linecap="round" opacity="0.6" />
  <line x1="38" y1="46" x2="50" y2="34" stroke="#10b981" stroke-width="2" stroke-linecap="round" opacity="0.6" />
  <line x1="50" y1="34" x2="62" y2="46" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" opacity="0.6" />
  <line x1="62" y1="46" x2="72" y2="36" stroke="#8b5cf6" stroke-width="2" stroke-linecap="round" opacity="0.6" />
  <line x1="35" y1="64" x2="50" y2="60" stroke="#06b6d4" stroke-width="2" stroke-linecap="round" opacity="0.5" />
  <line x1="50" y1="60" x2="65" y2="64" stroke="#10b981" stroke-width="2" stroke-linecap="round" opacity="0.5" />
  <path d="M 18,72 Q 22,24 36,26 T 50,56 T 64,26 Q 78,24 82,72" fill="none" stroke="url(#helixGradPrimary)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M 18,34 Q 28,78 40,68 T 50,42 T 60,68 Q 72,78 82,34" fill="none" stroke="url(#helixGradSecondary)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.9" />
  <path d="M 32,54 L 42,34 L 50,48 L 58,34 L 68,54" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.95" />
  <circle cx="36" cy="26" r="4" fill="url(#nodeGlow)" stroke="#0f172a" stroke-width="1.5" />
  <circle cx="64" cy="26" r="4" fill="#a78bfa" stroke="#0f172a" stroke-width="1.5" />
  <circle cx="50" cy="48" r="4.5" fill="#34d399" stroke="#0f172a" stroke-width="1.5" />
  <circle cx="18" cy="72" r="3.5" fill="#38bdf8" stroke="#0f172a" stroke-width="1.5" />
  <circle cx="82" cy="72" r="3.5" fill="#c084fc" stroke="#0f172a" stroke-width="1.5" />
  <circle cx="50" cy="56" r="3" fill="#67e8f9" />
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Dark canvas presentation */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                <Logo size="lg" variant="full" />
                <span className="text-[11px] font-mono text-slate-400 mt-4">Full Primary Horizontal (Dark UI)</span>
              </div>

              {/* Light canvas presentation */}
              <div className="bg-slate-100 border border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                <div className="p-2 bg-slate-900 rounded-lg inline-block">
                  <Logo size="lg" variant="full" />
                </div>
                <span className="text-[11px] font-mono text-slate-600 mt-4">High Contrast Inverted Lockup</span>
              </div>

              {/* Icon Only & Badge */}
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center gap-3">
                <div className="flex items-center gap-4">
                  <Logo size="lg" variant="icon" />
                  <Logo variant="badge" />
                </div>
                <span className="text-[11px] font-mono text-slate-400 mt-2">Standalone Vector Emblem & Badge</span>
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
