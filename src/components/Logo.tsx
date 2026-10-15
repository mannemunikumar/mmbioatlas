import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'stacked' | 'icon' | 'badge';
  className?: string;
  showSubtitle?: boolean;
  theme?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'full',
  className = '',
  theme = 'light',
}) => {
  const iconDimensions = {
    sm: { w: 36, h: 36, textClass: 'text-base', subClass: 'text-[9px]' },
    md: { w: 46, h: 46, textClass: 'text-xl', subClass: 'text-[11px]' },
    lg: { w: 72, h: 72, textClass: 'text-3xl', subClass: 'text-sm' },
    xl: { w: 120, h: 120, textClass: 'text-5xl', subClass: 'text-lg' },
  }[size];

  // Official M & M BioATLAS Vector Emblem:
  // Circular world globe with latitude/longitude grid and blue-to-green continents,
  // overlaid with a vibrant 3D vertical DNA double helix with blue and green strands,
  // horizontal base-pair rungs, and top/bottom spherical terminal nodes.
  const LogoEmblem = (
    <svg
      width={iconDimensions.w}
      height={iconDimensions.h}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 hover:scale-105"
      aria-label="M & M BioATLAS Brand Emblem"
    >
      <defs>
        {/* Continents Blue-to-Green Gradient */}
        <linearGradient id="globeContinentGrad" x1="0%" y1="20%" x2="100%" y2="80%">
          <stop offset="0%" stopColor="#0b3b70" />    {/* Deep Navy/Blue */}
          <stop offset="35%" stopColor="#0284c7" />   {/* Sky Blue */}
          <stop offset="65%" stopColor="#0d9488" />   {/* Teal */}
          <stop offset="100%" stopColor="#65a30d" />  {/* Lime Green */}
        </linearGradient>

        {/* DNA Blue Strand 3D Gradient */}
        <linearGradient id="dnaBlueStrand" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />    {/* Light Cyan */}
          <stop offset="45%" stopColor="#0284c7" />   {/* Deep Sky */}
          <stop offset="100%" stopColor="#0369a1" />  {/* Royal Blue */}
        </linearGradient>

        {/* DNA Green Strand 3D Gradient */}
        <linearGradient id="dnaGreenStrand" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a3e635" />   {/* Lime Accent */}
          <stop offset="50%" stopColor="#65a30d" />   {/* Leaf Green */}
          <stop offset="100%" stopColor="#15803d" />  {/* Emerald */}
        </linearGradient>

        {/* Sphere Top Node Gradient */}
        <radialGradient id="sphereTopGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="50%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#075985" />
        </radialGradient>

        {/* Sphere Bottom Node Gradient */}
        <radialGradient id="sphereBottomGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="55%" stopColor="#0369a1" />
          <stop offset="100%" stopColor="#082f49" />
        </radialGradient>

        {/* Subtle Globe Atmosphere Glow */}
        <radialGradient id="globeAtmosphere" cx="50%" cy="50%" r="50%">
          <stop offset="70%" stopColor="#0284c7" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0.16" />
        </radialGradient>

        {/* Drop shadow filter for DNA pop */}
        <filter id="dnaShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.2" floodColor="#000000" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* 1. GLOBE BASE CIRCLE & ATMOSPHERE */}
      <circle cx="50" cy="50" r="44" fill="url(#globeAtmosphere)" />
      <circle cx="50" cy="50" r="44" stroke="#0b3b70" strokeWidth="1.2" opacity="0.35" />

      {/* 2. LATITUDE & LONGITUDE GRID LINES */}
      {/* Equator & Parallels */}
      <line x1="6" y1="50" x2="94" y2="50" stroke="#0b3b70" strokeWidth="0.8" opacity="0.25" />
      <ellipse cx="50" cy="30" rx="39" ry="7" fill="none" stroke="#0b3b70" strokeWidth="0.7" opacity="0.22" />
      <ellipse cx="50" cy="70" rx="39" ry="7" fill="none" stroke="#0b3b70" strokeWidth="0.7" opacity="0.22" />
      <ellipse cx="50" cy="16" rx="27" ry="5" fill="none" stroke="#0b3b70" strokeWidth="0.6" opacity="0.18" />
      <ellipse cx="50" cy="84" rx="27" ry="5" fill="none" stroke="#0b3b70" strokeWidth="0.6" opacity="0.18" />

      {/* Meridians (Longitude Arcs) */}
      <ellipse cx="50" cy="50" rx="18" ry="44" fill="none" stroke="#0b3b70" strokeWidth="0.75" opacity="0.22" />
      <ellipse cx="50" cy="50" rx="33" ry="44" fill="none" stroke="#0b3b70" strokeWidth="0.75" opacity="0.22" />
      <line x1="50" y1="6" x2="50" y2="94" stroke="#0b3b70" strokeWidth="0.8" opacity="0.2" />

      {/* 3. CONTINENTS (Silhouettes with Blue-to-Green gradient) */}
      <g fill="url(#globeContinentGrad)" opacity="0.82">
        {/* North America & Greenland */}
        <path d="M 22,22 Q 25,18 32,20 Q 38,22 36,28 Q 33,32 28,34 Q 25,38 27,42 Q 23,43 20,38 Q 18,30 22,22 Z" />
        <path d="M 36,14 Q 40,12 43,15 Q 41,18 38,18 Z" />
        {/* South America */}
        <path d="M 30,50 Q 36,52 38,58 Q 39,66 34,74 Q 31,76 32,71 Q 30,64 28,58 Z" />
        {/* Europe & Africa */}
        <path d="M 46,24 Q 52,22 55,27 Q 52,32 47,30 Z" />
        <path d="M 48,34 Q 56,33 58,40 Q 56,48 54,54 Q 50,58 48,52 Q 46,42 48,34 Z" />
        {/* Asia & Eurasia */}
        <path d="M 57,22 Q 68,18 78,24 Q 82,30 76,36 Q 70,38 65,34 Q 60,30 57,22 Z" />
        {/* Southeast Asia & Australia */}
        <path d="M 68,42 Q 72,40 73,44 Q 70,47 68,44 Z" />
        <path d="M 72,56 Q 80,54 82,60 Q 80,66 74,65 Q 71,61 72,56 Z" />
      </g>

      {/* 4. DNA BASE-PAIR RUNGS (Horizontal connections with blue & green segments) */}
      <g filter="url(#dnaShadow)" strokeWidth="2.8" strokeLinecap="round">
        {/* Top Turn Base Pairs */}
        <line x1="42" y1="18" x2="49" y2="18" stroke="#0284c7" />
        <line x1="51" y1="18" x2="58" y2="18" stroke="#65a30d" />

        <line x1="40" y1="23" x2="49" y2="23" stroke="#0284c7" />
        <line x1="51" y1="23" x2="60" y2="23" stroke="#65a30d" />

        <line x1="43" y1="28" x2="49" y2="28" stroke="#0284c7" />
        <line x1="51" y1="28" x2="57" y2="28" stroke="#65a30d" />

        {/* Middle Turn Base Pairs */}
        <line x1="43" y1="42" x2="49" y2="42" stroke="#0284c7" />
        <line x1="51" y1="42" x2="57" y2="42" stroke="#65a30d" />

        <line x1="40" y1="48" x2="49" y2="48" stroke="#0284c7" />
        <line x1="51" y1="48" x2="60" y2="48" stroke="#65a30d" />

        <line x1="42" y1="54" x2="49" y2="54" stroke="#0284c7" />
        <line x1="51" y1="54" x2="58" y2="54" stroke="#65a30d" />

        {/* Lower Turn Base Pairs */}
        <line x1="43" y1="68" x2="49" y2="68" stroke="#0284c7" />
        <line x1="51" y1="68" x2="57" y2="68" stroke="#65a30d" />

        <line x1="40" y1="74" x2="49" y2="74" stroke="#0284c7" />
        <line x1="51" y1="74" x2="60" y2="74" stroke="#65a30d" />

        <line x1="43" y1="80" x2="49" y2="80" stroke="#0284c7" />
        <line x1="51" y1="80" x2="57" y2="80" stroke="#65a30d" />
      </g>

      {/* 5. DNA DOUBLE HELIX STRANDS (Curving ribbons with glossy 3D gradients) */}
      <g filter="url(#dnaShadow)" fill="none" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Blue Strand: Twisting vertical sinusoidal wave */}
        <path
          d="M 50,8 Q 38,12 39,24 Q 40,34 50,37 Q 61,40 61,50 Q 61,60 50,64 Q 39,68 39,78 Q 39,88 50,92"
          stroke="url(#dnaBlueStrand)"
        />

        {/* Green Strand: Twisting in counter-phase */}
        <path
          d="M 50,8 Q 62,12 61,24 Q 60,34 50,37 Q 39,40 39,50 Q 39,60 50,64 Q 61,68 61,78 Q 61,88 50,92"
          stroke="url(#dnaGreenStrand)"
        />

        {/* Highlight inner accents */}
        <path
          d="M 50,9 Q 39,13 40,23 Q 41,33 50,36"
          stroke="#7dd3fc"
          strokeWidth="1.2"
          opacity="0.8"
        />
        <path
          d="M 50,9 Q 61,13 60,23 Q 59,33 50,36"
          stroke="#bef264"
          strokeWidth="1.2"
          opacity="0.8"
        />
      </g>

      {/* 6. DNA TERMINAL SPHERES (Top and Bottom Nodes) */}
      <circle cx="50" cy="7" r="4.8" fill="url(#sphereTopGrad)" filter="url(#dnaShadow)" />
      <circle cx="50" cy="93" r="4.8" fill="url(#sphereBottomGrad)" filter="url(#dnaShadow)" />
    </svg>
  );

  // Variant: Icon only
  if (variant === 'icon') {
    return <div className={`inline-flex items-center justify-center ${className}`}>{LogoEmblem}</div>;
  }

  // Variant: Stacked (Matches the uploaded vertical orientation)
  if (variant === 'stacked') {
    const isDark = theme === 'dark';
    return (
      <div className={`inline-flex flex-col items-center justify-center text-center select-none ${className}`}>
        <div className="mb-2">{LogoEmblem}</div>
        <div className={`font-extrabold tracking-widest uppercase ${isDark ? 'text-white' : 'text-[#0b2952]'} ${iconDimensions.subClass} leading-tight`}>
          M &amp; M
        </div>
        <div className="flex items-center leading-none mt-0.5">
          <span className={`font-black tracking-tight ${isDark ? 'text-slate-100' : 'text-[#0b2952]'} ${iconDimensions.textClass}`}>
            Bio
          </span>
          <span className={`font-black tracking-tight bg-gradient-to-r from-[#00897b] via-[#059669] to-[#65a30d] bg-clip-text text-transparent ${iconDimensions.textClass}`}>
            ATLAS
          </span>
        </div>
      </div>
    );
  }

  // Variant: Badge (Pill with emblem and brand typography)
  if (variant === 'badge') {
    const badgeBg = theme === 'light' 
      ? 'bg-white/95 border-slate-300 text-slate-900 shadow-sm' 
      : 'bg-slate-900/90 border-cyan-500/30 text-white shadow-lg shadow-cyan-950/20';
    return (
      <div className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border backdrop-blur-md ${badgeBg} ${className}`}>
        {LogoEmblem}
        <div className="flex flex-col">
          <div className="flex items-center gap-1 leading-none">
            <span className={`font-bold tracking-wider text-[10px] ${theme === 'light' ? 'text-[#0b2952]' : 'text-slate-200'}`}>M &amp; M</span>
            <span className={`font-extrabold text-xs ${theme === 'light' ? 'text-[#0b2952]' : 'text-white'}`}>Bio</span>
            <span className="font-extrabold text-xs bg-gradient-to-r from-[#00897b] to-[#65a30d] bg-clip-text text-transparent">ATLAS</span>
          </div>
          <span className={`text-[8.5px] font-mono tracking-wider uppercase mt-0.5 ${theme === 'light' ? 'text-slate-500' : 'text-cyan-400'}`}>
            Bioinformatics &amp; CRO
          </span>
        </div>
      </div>
    );
  }

  // Default Variant: Full (Horizontal - Ideal for Navbar & Footers)
  const isDark = theme === 'dark';
  const navyTextClass = isDark ? 'text-slate-100' : 'text-[#0b2952]';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <div className="relative flex items-center justify-center">
        {LogoEmblem}
      </div>

      <div className="flex flex-col justify-center leading-none">
        {/* Top Line: M & M */}
        <span className={`font-bold tracking-widest uppercase ${navyTextClass} ${iconDimensions.subClass} opacity-90 pb-0.5`}>
          M &amp; M
        </span>

        {/* Bottom Line: BioATLAS with gradient */}
        <div className="flex items-center tracking-tight leading-none">
          <span className={`font-black ${navyTextClass} ${iconDimensions.textClass}`}>
            Bio
          </span>
          <span className={`font-black bg-gradient-to-r from-[#00897b] via-[#059669] to-[#65a30d] bg-clip-text text-transparent ${iconDimensions.textClass}`}>
            ATLAS
          </span>
        </div>
      </div>
    </div>
  );
};

export default Logo;
