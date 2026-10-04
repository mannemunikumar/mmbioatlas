import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon' | 'badge';
  className?: string;
  showSubtitle?: boolean;
  theme?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'full',
  className = '',
  showSubtitle = false,
  theme = 'light',
}) => {
  const iconDimensions = {
    sm: { w: 32, h: 32, textClass: 'text-base', subClass: 'text-[9px]' },
    md: { w: 42, h: 42, textClass: 'text-xl', subClass: 'text-[10px]' },
    lg: { w: 64, h: 64, textClass: 'text-3xl', subClass: 'text-xs' },
    xl: { w: 96, h: 96, textClass: 'text-5xl', subClass: 'text-sm' },
  }[size];

  // The custom vector SVG emblem:
  // Beautiful biomolecular double helix intersecting to form two harmonic 'M' peaks
  // with molecular orbital nodes and phosphodiester backbone rungs.
  const LogoEmblem = (
    <svg
      width={iconDimensions.w}
      height={iconDimensions.h}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 hover:scale-105"
      aria-label="M & M BioATLAS Logo"
    >
      <defs>
        {/* Core Vibrant Bio-Gradients */}
        <linearGradient id="helixGradPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" /> {/* Cyan */}
          <stop offset="50%" stopColor="#3b82f6" /> {/* Electric Blue */}
          <stop offset="100%" stopColor="#8b5cf6" /> {/* Royal Purple */}
        </linearGradient>

        <linearGradient id="helixGradSecondary" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#10b981" /> {/* Emerald */}
          <stop offset="50%" stopColor="#06b6d4" /> {/* Cyan */}
          <stop offset="100%" stopColor="#2563eb" /> {/* Deep Blue */}
        </linearGradient>

        <linearGradient id="nodeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>

        <radialGradient id="haloCenter" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Subtle Ambient Bioluminescent Back-glow */}
      <circle cx="50" cy="50" r="44" fill="url(#haloCenter)" />

      {/* Outer Hexagonal Shield Ring (Subtle micro-grid border) */}
      <polygon
        points="50,6 88,27 88,73 50,94 12,73 12,27"
        stroke="#334155"
        strokeWidth="1.5"
        strokeDasharray="3 3"
        opacity="0.6"
      />

      {/* Molecular Cross-Link Hydrogen Rungs connecting the two strands */}
      <line x1="28" y1="36" x2="38" y2="46" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <line x1="38" y1="46" x2="50" y2="34" stroke="#10b981" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <line x1="50" y1="34" x2="62" y2="46" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <line x1="62" y1="46" x2="72" y2="36" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <line x1="35" y1="64" x2="50" y2="60" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <line x1="50" y1="60" x2="65" y2="64" stroke="#10b981" strokeWidth="2" strokeLinecap="round" opacity="0.5" />

      {/* Primary Strand 1: Forms the outer wave and first 'M' peak */}
      <path
        d="M 18,72 Q 22,24 36,26 T 50,56 T 64,26 Q 78,24 82,72"
        fill="none"
        stroke="url(#helixGradPrimary)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Secondary Strand 2: Intertwines in counter-phase to complete the double 'M' molecular architecture */}
      <path
        d="M 18,34 Q 28,78 40,68 T 50,42 T 60,68 Q 72,78 82,34"
        fill="none"
        stroke="url(#helixGradSecondary)"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />

      {/* Intertwined Central 'M & M' Nexus bridge */}
      <path
        d="M 32,54 L 42,34 L 50,48 L 58,34 L 68,54"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.95"
      />

      {/* Single-Cell Satellite Nodes / Fluorophore Pips */}
      <circle cx="36" cy="26" r="4" fill="url(#nodeGlow)" stroke="#0f172a" strokeWidth="1.5" />
      <circle cx="64" cy="26" r="4" fill="#a78bfa" stroke="#0f172a" strokeWidth="1.5" />
      <circle cx="50" cy="48" r="4.5" fill="#34d399" stroke="#0f172a" strokeWidth="1.5" />
      <circle cx="18" cy="72" r="3.5" fill="#38bdf8" stroke="#0f172a" strokeWidth="1.5" />
      <circle cx="82" cy="72" r="3.5" fill="#c084fc" stroke="#0f172a" strokeWidth="1.5" />
      <circle cx="50" cy="56" r="3" fill="#67e8f9" />
    </svg>
  );

  if (variant === 'icon') {
    return <div className={`inline-flex items-center justify-center ${className}`}>{LogoEmblem}</div>;
  }

  if (variant === 'badge') {
    const badgeBg = theme === 'light' 
      ? 'bg-white/95 border-slate-300 text-slate-900 shadow-sm' 
      : 'bg-slate-900/90 border-cyan-500/30 text-white shadow-lg shadow-cyan-950/20';
    return (
      <div className={`inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border backdrop-blur-md ${badgeBg} ${className}`}>
        {LogoEmblem}
        <div className="flex flex-col">
          <span className={`font-bold tracking-tight leading-none ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>M & M BioATLAS</span>
          <span className={`text-[9px] font-mono tracking-wider uppercase mt-0.5 ${theme === 'light' ? 'text-sky-700' : 'text-cyan-400'}`}>Reference Consortium</span>
        </div>
      </div>
    );
  }

  const mmTextClass = theme === 'light' ? 'text-slate-900' : 'text-slate-100';
  const bioAtlasGradClass = theme === 'light' 
    ? 'bg-gradient-to-r from-blue-700 via-sky-600 to-teal-600 bg-clip-text text-transparent' 
    : 'bg-gradient-to-r from-cyan-400 via-sky-300 to-teal-300 bg-clip-text text-transparent';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <div className="relative flex items-center justify-center">
        {LogoEmblem}
      </div>

      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-extrabold tracking-tight ${mmTextClass} ${iconDimensions.textClass}`}>
            M & M
          </span>
          <span
            className={`font-black tracking-tight ${bioAtlasGradClass} ${iconDimensions.textClass}`}
          >
            BioATLAS
          </span>
        </div>
      </div>
    </div>
  );
};

export default Logo;
