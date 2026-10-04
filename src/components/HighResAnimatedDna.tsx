import React, { useEffect, useRef, useState } from 'react';

interface HighResAnimatedDnaProps {
  className?: string;
}

interface BasePair {
  type: 'A-T' | 'T-A' | 'G-C' | 'C-G';
  bonds: 2 | 3;
  colorA: string;
  colorB: string;
  labelA: string;
  labelB: string;
}

export const HighResAnimatedDna: React.FC<HighResAnimatedDnaProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const mouseTargetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // Scientific base pair sequence with explicit Double (A=T) and Triple (G≡C) hydrogen bonding
    const basePairsData: BasePair[] = [
      { type: 'A-T', bonds: 2, colorA: '#0284c7', colorB: '#06b6d4', labelA: 'A', labelB: 'T' },
      { type: 'G-C', bonds: 3, colorA: '#0d9488', colorB: '#10b981', labelA: 'G', labelB: 'C' },
      { type: 'T-A', bonds: 2, colorA: '#06b6d4', colorB: '#0284c7', labelA: 'T', labelB: 'A' },
      { type: 'C-G', bonds: 3, colorA: '#10b981', colorB: '#0d9488', labelA: 'C', labelB: 'G' },
      { type: 'A-T', bonds: 2, colorA: '#38bdf8', colorB: '#0ea5e9', labelA: 'A', labelB: 'T' },
      { type: 'G-C', bonds: 3, colorA: '#14b8a6', colorB: '#059669', labelA: 'G', labelB: 'C' },
      { type: 'C-G', bonds: 3, colorA: '#059669', colorB: '#14b8a6', labelA: 'C', labelB: 'G' },
      { type: 'T-A', bonds: 2, colorA: '#0ea5e9', colorB: '#38bdf8', labelA: 'T', labelB: 'A' },
      { type: 'G-C', bonds: 3, colorA: '#0d9488', colorB: '#10b981', labelA: 'G', labelB: 'C' },
      { type: 'A-T', bonds: 2, colorA: '#0284c7', colorB: '#06b6d4', labelA: 'A', labelB: 'T' },
      { type: 'T-A', bonds: 2, colorA: '#06b6d4', colorB: '#0284c7', labelA: 'T', labelB: 'A' },
      { type: 'C-G', bonds: 3, colorA: '#10b981', colorB: '#0d9488', labelA: 'C', labelB: 'G' },
    ];

    // Background floating micro-particles
    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 2.2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.0008,
      speedY: (Math.random() - 0.5) * 0.0008,
      alpha: Math.random() * 0.45 + 0.2,
    }));

    // Mouse parallax tracking
    let currentTiltX = 0;
    let currentTiltY = 0;

    const render = () => {
      time += 0.022;

      // Handle retina high-resolution scaling
      const dpr = Math.min(window.devicePixelRatio || 1, 3);
      const width = container.clientWidth;
      const height = container.clientHeight || 420;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse tilt parallax
      currentTiltX += (mouseTargetRef.current.x - currentTiltX) * 0.06;
      currentTiltY += (mouseTargetRef.current.y - currentTiltY) * 0.06;

      // Draw subtle ambient glow in center
      const centerX = width * 0.5 + currentTiltX * 15;
      const centerY = height * 0.5 + currentTiltY * 15;
      const glowGrad = ctx.createRadialGradient(
        centerX, centerY, 10,
        centerX, centerY, Math.min(width, height) * 0.65
      );
      glowGrad.addColorStop(0, 'rgba(14, 165, 233, 0.12)');
      glowGrad.addColorStop(0.5, 'rgba(13, 148, 136, 0.05)');
      glowGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      // Floating particles
      particles.forEach((p) => {
        p.x = (p.x + p.speedX + 1) % 1;
        p.y = (p.y + p.speedY + 1) % 1;
        const px = p.x * width;
        const py = p.y * height;
        ctx.fillStyle = `rgba(14, 165, 233, ${p.alpha * 0.6})`;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // DNA Helix Geometry Settings
      const numRungs = 26; // Number of base pairs along the vertical strand
      const helixRadius = Math.min(width * 0.32, 105);
      const verticalPitch = (height * 0.88) / (numRungs - 1);
      const startY = height * 0.06;
      const twistSpeed = 0.85; // Frequency of rotation
      const helixAngleTilt = 0.16 + currentTiltX * 0.12; // Dynamic 3D tilt

      interface RenderItem {
        zIndex: number;
        draw: () => void;
      }

      const renderQueue: RenderItem[] = [];

      // Calculate 3D points for Strand A and Strand B
      const strandAPoints: { x: number; y: number; z: number; alpha: number; scale: number }[] = [];
      const strandBPoints: { x: number; y: number; z: number; alpha: number; scale: number }[] = [];

      for (let i = 0; i < numRungs; i++) {
        const y = startY + i * verticalPitch;
        const angle = time * twistSpeed + (i * 0.34);
        
        // 3D coordinates
        // Strand A
        const rawXA = Math.cos(angle) * helixRadius;
        const rawZA = Math.sin(angle) * helixRadius;
        
        // Strand B (opposite 180 degrees)
        const rawXB = Math.cos(angle + Math.PI) * helixRadius;
        const rawZB = Math.sin(angle + Math.PI) * helixRadius;

        // Apply 3D tilt transformation
        const tiltedXA = rawXA * Math.cos(helixAngleTilt) - rawZA * Math.sin(helixAngleTilt);
        const tiltedZA = rawXA * Math.sin(helixAngleTilt) + rawZA * Math.cos(helixAngleTilt);

        const tiltedXB = rawXB * Math.cos(helixAngleTilt) - rawZB * Math.sin(helixAngleTilt);
        const tiltedZB = rawXB * Math.sin(helixAngleTilt) + rawZB * Math.cos(helixAngleTilt);

        // Perspective projection
        const fov = 380;
        const scaleA = fov / (fov + tiltedZA);
        const scaleB = fov / (fov + tiltedZB);

        const projXA = centerX + tiltedXA * scaleA;
        const projYA = y + (tiltedZA * 0.14) + currentTiltY * 20;

        const projXB = centerX + tiltedXB * scaleB;
        const projYB = y + (tiltedZB * 0.14) + currentTiltY * 20;

        const alphaA = Math.max(0.3, Math.min(1, (tiltedZA + helixRadius) / (2 * helixRadius) * 0.7 + 0.3));
        const alphaB = Math.max(0.3, Math.min(1, (tiltedZB + helixRadius) / (2 * helixRadius) * 0.7 + 0.3));

        strandAPoints.push({ x: projXA, y: projYA, z: tiltedZA, alpha: alphaA, scale: scaleA });
        strandBPoints.push({ x: projXB, y: projYB, z: tiltedZB, alpha: alphaB, scale: scaleB });

        // Base pair index mapping
        const bp = basePairsData[i % basePairsData.length];
        const rungZ = (tiltedZA + tiltedZB) / 2;

        // Render base pair connecting rung with accurate DOUBLE (A=T) or TRIPLE (G≡C) hydrogen bonds
        renderQueue.push({
          zIndex: rungZ,
          draw: () => {
            const midX = (projXA + projXB) / 2;
            const midY = (projYA + projYB) / 2;
            const rungAlpha = Math.min(alphaA, alphaB) * 0.88;
            const avgScale = Math.min(scaleA, scaleB);

            // Perpendicular unit vector to the rung in screen space
            const dx = projXB - projXA;
            const dy = projYB - projYA;
            const len = Math.hypot(dx, dy) || 1;
            const nx = -dy / len;
            const ny = dx / len;

            // Double bond: 2 parallel lines; Triple bond: 3 parallel lines
            const bondOffsets = bp.bonds === 2
              ? [-2.6 * avgScale, 2.6 * avgScale]
              : [-4.0 * avgScale, 0, 4.0 * avgScale];
            
            const bondLineWidth = (bp.bonds === 2 ? 2.5 : 2.0) * avgScale;

            bondOffsets.forEach((offset) => {
              const ox = nx * offset;
              const oy = ny * offset;

              const startX = projXA + ox;
              const startY = projYA + oy;
              const endX = projXB + ox;
              const endY = projYB + oy;
              const mX = midX + ox;
              const mY = midY + oy;

              // Half-bar A to center
              const gradA = ctx.createLinearGradient(startX, startY, mX, mY);
              gradA.addColorStop(0, bp.colorA);
              gradA.addColorStop(1, `${bp.colorA}cc`);

              ctx.beginPath();
              ctx.moveTo(startX, startY);
              ctx.lineTo(mX, mY);
              ctx.lineWidth = bondLineWidth;
              ctx.strokeStyle = gradA;
              ctx.stroke();

              // Half-bar B to center
              const gradB = ctx.createLinearGradient(mX, mY, endX, endY);
              gradB.addColorStop(0, `${bp.colorB}cc`);
              gradB.addColorStop(1, bp.colorB);

              ctx.beginPath();
              ctx.moveTo(mX, mY);
              ctx.lineTo(endX, endY);
              ctx.lineWidth = bondLineWidth;
              ctx.strokeStyle = gradB;
              ctx.stroke();

              // Central Hydrogen Bond contact point
              ctx.fillStyle = `rgba(255, 255, 255, ${rungAlpha * 0.95})`;
              ctx.beginPath();
              ctx.arc(mX, mY, (bp.bonds === 2 ? 2.0 : 1.7) * avgScale, 0, Math.PI * 2);
              ctx.fill();
            });
          },
        });
      }

      // Render Strand Backbones (Continuous smooth spline curves)
      renderQueue.push({
        zIndex: 0,
        draw: () => {
          // Strand A line
          ctx.beginPath();
          for (let i = 0; i < strandAPoints.length; i++) {
            const p = strandAPoints[i];
            if (i === 0) ctx.moveTo(p.x, p.y);
            else {
              const prev = strandAPoints[i - 1];
              const mx = (prev.x + p.x) / 2;
              const my = (prev.y + p.y) / 2;
              ctx.quadraticCurveTo(prev.x, prev.y, mx, my);
            }
          }
          ctx.lineWidth = 2.5;
          ctx.strokeStyle = 'rgba(2, 132, 199, 0.45)';
          ctx.stroke();

          // Strand B line
          ctx.beginPath();
          for (let i = 0; i < strandBPoints.length; i++) {
            const p = strandBPoints[i];
            if (i === 0) ctx.moveTo(p.x, p.y);
            else {
              const prev = strandBPoints[i - 1];
              const mx = (prev.x + p.x) / 2;
              const my = (prev.y + p.y) / 2;
              ctx.quadraticCurveTo(prev.x, prev.y, mx, my);
            }
          }
          ctx.lineWidth = 2.5;
          ctx.strokeStyle = 'rgba(13, 148, 136, 0.45)';
          ctx.stroke();
        },
      });

      // Render Strand Phosphate Nodes (Spherical atoms with 3D specular shine)
      for (let i = 0; i < numRungs; i++) {
        const ptA = strandAPoints[i];
        const ptB = strandBPoints[i];

        // Node A
        renderQueue.push({
          zIndex: ptA.z,
          draw: () => {
            const radius = 6.5 * ptA.scale;
            const gradNode = ctx.createRadialGradient(
              ptA.x - radius * 0.35,
              ptA.y - radius * 0.35,
              radius * 0.1,
              ptA.x,
              ptA.y,
              radius
            );
            gradNode.addColorStop(0, '#bae6fd');
            gradNode.addColorStop(0.3, '#38bdf8');
            gradNode.addColorStop(0.8, '#0284c7');
            gradNode.addColorStop(1, '#075985');

            ctx.fillStyle = gradNode;
            ctx.shadowColor = 'rgba(56, 189, 248, 0.4)';
            ctx.shadowBlur = ptA.z > 0 ? 12 : 3;
            ctx.beginPath();
            ctx.arc(ptA.x, ptA.y, radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          },
        });

        // Node B
        renderQueue.push({
          zIndex: ptB.z,
          draw: () => {
            const radius = 6.5 * ptB.scale;
            const gradNode = ctx.createRadialGradient(
              ptB.x - radius * 0.35,
              ptB.y - radius * 0.35,
              radius * 0.1,
              ptB.x,
              ptB.y,
              radius
            );
            gradNode.addColorStop(0, '#a7f3d0');
            gradNode.addColorStop(0.3, '#34d399');
            gradNode.addColorStop(0.8, '#0d9488');
            gradNode.addColorStop(1, '#065f46');

            ctx.fillStyle = gradNode;
            ctx.shadowColor = 'rgba(52, 211, 153, 0.4)';
            ctx.shadowBlur = ptB.z > 0 ? 12 : 3;
            ctx.beginPath();
            ctx.arc(ptB.x, ptB.y, radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          },
        });
      }

      // Depth sort items (back-to-front rendering)
      renderQueue.sort((a, b) => a.zIndex - b.zIndex);
      renderQueue.forEach((item) => item.draw());

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    mouseTargetRef.current = { x: nx, y: ny };
    setMousePos({ x: nx, y: ny });
  };

  const handleMouseLeave = () => {
    mouseTargetRef.current = { x: 0, y: 0 };
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full h-[380px] sm:h-[430px] lg:h-[460px] flex items-center justify-center select-none overflow-hidden cursor-crosshair ${className}`}
      title="3D Molecular DNA Double Helix with A=T double bond and G≡C triple bond"
    >
      {/* High-Resolution Dynamic Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain pointer-events-none"
      />

      {/* Scientific Legend Pill in Corner */}
      <div className="absolute bottom-2 right-2 pointer-events-none flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-slate-200/90 shadow-xs text-[11px] font-mono text-slate-700">
        <span className="flex items-center gap-1.5 font-medium">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-500 shadow-xs flex items-center justify-center text-[8px] text-white font-bold">=</span>
          <span className="font-semibold text-slate-900">A = T</span>
          <span className="text-[10px] text-sky-700 font-semibold">(Double Bond)</span>
        </span>
        <span className="text-slate-300">|</span>
        <span className="flex items-center gap-1.5 font-medium">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-xs flex items-center justify-center text-[8px] text-white font-bold">≡</span>
          <span className="font-semibold text-slate-900">G ≡ C</span>
          <span className="text-[10px] text-emerald-700 font-semibold">(Triple Bond)</span>
        </span>
      </div>
    </div>
  );
};
