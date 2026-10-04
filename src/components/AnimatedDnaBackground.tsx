import React, { useEffect, useRef, useState } from 'react';

interface AnimatedDnaBackgroundProps {
  className?: string;
  strandColorA?: string;
  strandColorB?: string;
  speed?: number;
  interactive?: boolean;
}

export const AnimatedDnaBackground: React.FC<AnimatedDnaBackgroundProps> = ({
  className = '',
  speed = 0.018,
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });
  const [isRotating, setIsRotating] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let rotation = 0;
    let width = container.clientWidth;
    let height = container.clientHeight;

    // High DPI scaling
    const updateSize = () => {
      if (!canvas || !container) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    updateSize();

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    resizeObserver.observe(container);

    // Floating ambient molecular particles
    const particleCount = 28;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -0.2 - Math.random() * 0.3,
      size: Math.random() * 2.5 + 1,
      alpha: Math.random() * 0.35 + 0.1,
      color: Math.random() > 0.5 ? '#0284c7' : '#0d9488',
    }));

    // Base pair types (A-T, T-A, G-C, C-G)
    const basePairs = [
      { name1: 'A', name2: 'T', col1: '#0284c7', col2: '#06b6d4' },
      { name1: 'G', name2: 'C', col1: '#0b3b70', col2: '#10b981' },
      { name1: 'T', name2: 'A', col1: '#06b6d4', col2: '#0284c7' },
      { name1: 'C', name2: 'G', col1: '#10b981', col2: '#0b3b70' },
    ];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw floating ambient particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      }

      // 2. DNA Double Helix Configuration
      // Position helix gracefully: angled across right half on desktop, center-right on mobile
      const isMobile = width < 768;
      const helixCenterX = isMobile ? width * 0.72 : width * 0.76;
      const helixAmplitude = isMobile ? 52 : 82; // Helix radius
      const verticalPitch = 22; // Distance between base pairs
      const totalRungs = Math.ceil(height / verticalPitch) + 4;
      const startY = -40;

      // Mouse influence on rotation
      let currentSpeed = speed;
      if (interactive && mouseRef.current.active) {
        const normalizedX = (mouseRef.current.x / width) - 0.5;
        currentSpeed = speed + normalizedX * 0.015;
      }

      if (isRotating) {
        rotation += currentSpeed;
      }

      // Collect nodes to draw in depth-sorted order (back-to-front rendering)
      interface HelixNode {
        type: 'strandA' | 'strandB';
        x: number;
        y: number;
        z: number;
        scale: number;
        alpha: number;
        index: number;
        pairIndex: number;
      }

      interface HelixRung {
        x1: number;
        y1: number;
        z1: number;
        x2: number;
        y2: number;
        z2: number;
        avgZ: number;
        alpha: number;
        pair: typeof basePairs[0];
      }

      const nodesA: HelixNode[] = [];
      const nodesB: HelixNode[] = [];
      const rungs: HelixRung[] = [];

      for (let i = 0; i < totalRungs; i++) {
        const y = startY + i * verticalPitch;
        
        // Gentle biomolecular diagonal tilt and natural organic wave
        const tiltOffset = (y - height * 0.5) * -0.12;
        const waveOffset = Math.sin((y / height) * Math.PI) * (isMobile ? 12 : 20);
        const cx = helixCenterX + waveOffset + tiltOffset;

        // Angle along the vertical axis
        const theta = (y * 0.018) + rotation;

        // 3D coordinates on cylinder surface
        const cosA = Math.cos(theta);
        const sinA = Math.sin(theta);
        const cosB = Math.cos(theta + Math.PI);
        const sinB = Math.sin(theta + Math.PI);

        const x1 = cx + helixAmplitude * cosA;
        const z1 = helixAmplitude * sinA; // -helixAmplitude to +helixAmplitude
        
        const x2 = cx + helixAmplitude * cosB;
        const z2 = helixAmplitude * sinB;

        // Depth perspective
        const scale1 = 0.85 + ((z1 + helixAmplitude) / (2 * helixAmplitude)) * 0.45;
        const scale2 = 0.85 + ((z2 + helixAmplitude) / (2 * helixAmplitude)) * 0.45;

        // Opacity: front is brighter, back is softer
        const alpha1 = 0.35 + ((z1 + helixAmplitude) / (2 * helixAmplitude)) * 0.55;
        const alpha2 = 0.35 + ((z2 + helixAmplitude) / (2 * helixAmplitude)) * 0.55;

        const nodeA: HelixNode = {
          type: 'strandA',
          x: x1,
          y,
          z: z1,
          scale: scale1,
          alpha: alpha1,
          index: i,
          pairIndex: i % basePairs.length,
        };

        const nodeB: HelixNode = {
          type: 'strandB',
          x: x2,
          y,
          z: z2,
          scale: scale2,
          alpha: alpha2,
          index: i,
          pairIndex: i % basePairs.length,
        };

        nodesA.push(nodeA);
        nodesB.push(nodeB);

        const avgZ = (z1 + z2) / 2;
        const rungAlpha = 0.25 + ((avgZ + helixAmplitude) / (2 * helixAmplitude)) * 0.45;

        rungs.push({
          x1,
          y1: y,
          z1,
          x2,
          y2: y,
          z2,
          avgZ,
          alpha: rungAlpha,
          pair: basePairs[i % basePairs.length],
        });
      }

      // 3. Draw Connecting Rungs (Hydrogen base-pair bonds)
      for (const rung of rungs) {
        ctx.save();
        ctx.globalAlpha = rung.alpha;
        ctx.lineWidth = Math.max(1.2, 2.2 * (0.8 + (rung.avgZ / (2 * helixAmplitude))));

        // Two-tone gradient representing nucleotide pairs (e.g. Adenine-Thymine)
        const grad = ctx.createLinearGradient(rung.x1, rung.y1, rung.x2, rung.y2);
        grad.addColorStop(0, rung.pair.col1);
        grad.addColorStop(0.48, rung.pair.col1);
        grad.addColorStop(0.5, '#ffffff'); // Central hydrogen bond interface
        grad.addColorStop(0.52, rung.pair.col2);
        grad.addColorStop(1, rung.pair.col2);

        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(rung.x1, rung.y1);
        ctx.lineTo(rung.x2, rung.y2);
        ctx.stroke();

        // Hydrogen bond center node
        const midX = (rung.x1 + rung.x2) / 2;
        const midY = (rung.y1 + rung.y2) / 2;
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = rung.alpha * 0.9;
        ctx.beginPath();
        ctx.arc(midX, midY, 1.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      // 4. Draw Backbone continuous Spline Ribbons
      const drawBackboneSpline = (nodes: HelixNode[], strokeColor: string) => {
        if (nodes.length < 2) return;
        ctx.save();
        for (let i = 0; i < nodes.length - 1; i++) {
          const curr = nodes[i];
          const next = nodes[i + 1];
          const avgZ = (curr.z + next.z) / 2;
          const alpha = 0.35 + ((avgZ + helixAmplitude) / (2 * helixAmplitude)) * 0.55;

          ctx.beginPath();
          ctx.moveTo(curr.x, curr.y);
          ctx.lineTo(next.x, next.y);
          ctx.strokeStyle = strokeColor;
          ctx.lineWidth = Math.max(1.8, 3.2 * curr.scale);
          ctx.globalAlpha = alpha * 0.8;
          ctx.stroke();
        }
        ctx.restore();
      };

      drawBackboneSpline(nodesA, '#0284c7'); // Strand A: Sky/Blue
      drawBackboneSpline(nodesB, '#0b3b70'); // Strand B: Navy/Deep Blue

      // 5. Draw Backbone Spheres / Phosphodiester Nodes
      const allNodes = [...nodesA, ...nodesB].sort((a, b) => a.z - b.z);

      for (const node of allNodes) {
        ctx.save();
        ctx.globalAlpha = node.alpha;

        const isStrandA = node.type === 'strandA';
        const baseColor = isStrandA ? '#0284c7' : '#0b3b70';
        const highlightColor = isStrandA ? '#38bdf8' : '#2563eb';
        const radius = Math.max(3.5, 5.5 * node.scale);

        // Outer glow on front-facing nodes
        if (node.z > 0) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius * 1.6, 0, Math.PI * 2);
          ctx.fillStyle = highlightColor;
          ctx.globalAlpha = (node.alpha * 0.25);
          ctx.fill();
        }

        // Spherical 3D shaded sphere
        const grad = ctx.createRadialGradient(
          node.x - radius * 0.3,
          node.y - radius * 0.3,
          radius * 0.1,
          node.x,
          node.y,
          radius
        );
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.3, highlightColor);
        grad.addColorStop(1, baseColor);

        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.globalAlpha = Math.min(1, node.alpha * 1.1);
        ctx.fill();

        ctx.restore();
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const targetEl = container.parentElement || container;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    if (interactive && targetEl) {
      targetEl.addEventListener('mousemove', handleMouseMove);
      targetEl.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (interactive && targetEl) {
        targetEl.removeEventListener('mousemove', handleMouseMove);
        targetEl.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [speed, interactive, isRotating]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full pointer-events-none select-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full"
      />
      {/* Soft gradient mask ensuring text on the left is crisp while DNA stays vibrant */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/40 to-transparent pointer-events-none w-3/4 sm:w-1/2" />
    </div>
  );
};
