'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const HERO_PARTICLES = 18;

type CursorState = 'default' | 'hover' | 'click';

function generateParticles() {
  return Array.from({ length: HERO_PARTICLES }, (_, i) => ({
    id: i,
    angle: (i / HERO_PARTICLES) * Math.PI * 2,
    radius: 28 + Math.random() * 14,
    size: 1.5 + Math.random() * 2,
    speed: 0.4 + Math.random() * 0.6,
    opacity: 0.3 + Math.random() * 0.5,
  }));
}

export default function HeroCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<{ x: number; y: number }[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const posRef = useRef({ x: -200, y: -200 });
  const stateRef = useRef<CursorState>('default');
  const [cursorState, setCursorState] = useState<CursorState>('default');
  const [isInHero, setIsInHero] = useState(false);
  const [particles] = useState(generateParticles);
  const particleAngles = useRef(particles.map(p => p.angle));
  const tickRef = useRef(0);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const springX = useSpring(mouseX, { stiffness: 200, damping: 20, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 20, mass: 0.5 });

  // Lagging ring
  const ringX = useSpring(mouseX, { stiffness: 60, damping: 12, mass: 1 });
  const ringY = useSpring(mouseY, { stiffness: 60, damping: 12, mass: 1 });

  const updateCursorEl = useCallback(() => {
    const el = cursorRef.current;
    if (!el) return;
    el.style.transform = `translate(${posRef.current.x - 8}px, ${posRef.current.y - 8}px)`;
  }, []);

  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      posRef.current = { x, y };
      mouseX.set(x);
      mouseY.set(y);

      // Track trail
      trailRef.current.unshift({ x, y });
      if (trailRef.current.length > 22) trailRef.current.pop();

      // Check if inside hero
      const rect = hero.getBoundingClientRect();
      const inside = x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
      setIsInHero(inside);
    };

    const onMouseDown = () => { stateRef.current = 'click'; setCursorState('click'); };
    const onMouseUp = () => { stateRef.current = 'default'; setCursorState('default'); };

    const onMouseEnterInteractive = () => { stateRef.current = 'hover'; setCursorState('hover'); };
    const onMouseLeaveInteractive = () => { stateRef.current = 'default'; setCursorState('default'); };

    // Attach to all interactive elements in hero
    const interactives = hero.querySelectorAll('a, button, [role="button"]');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnterInteractive);
      el.addEventListener('mouseleave', onMouseLeaveInteractive);
    });

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive);
        el.removeEventListener('mouseleave', onMouseLeaveInteractive);
      });
    };
  }, [mouseX, mouseY]);

  // Canvas rendering for trail + particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      tickRef.current += 0.025;

      const { x, y } = posRef.current;
      const state = stateRef.current;

      if (x < 0 || y < 0) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      // --- Trail ---
      const trail = trailRef.current;
      if (trail.length > 1) {
        for (let i = 1; i < trail.length; i++) {
          const alpha = (1 - i / trail.length) * 0.45;
          const size = (1 - i / trail.length) * 4;
          ctx.beginPath();
          ctx.arc(trail[i].x, trail[i].y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 210, 239, ${alpha})`;
          ctx.fill();
        }
      }

      // --- Orbiting particles (only when in hero) ---
      const hero = document.getElementById('hero');
      const inHero = hero ? (() => {
        const r = hero.getBoundingClientRect();
        return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
      })() : false;

      if (inHero) {
        particles.forEach((p, i) => {
          particleAngles.current[i] += p.speed * 0.018 * (state === 'hover' ? 2.2 : 1);
          const angle = particleAngles.current[i];
          const radius = p.radius * (state === 'click' ? 0.6 : state === 'hover' ? 1.3 : 1);
          const px = x + Math.cos(angle) * radius;
          const py = y + Math.sin(angle) * radius;

          // Color cycles between cyan and violet
          const hue = (angle * 30 + tickRef.current * 40) % 360;
          const isCyan = hue < 180;
          const color = isCyan
            ? `rgba(0, 210, 239, ${p.opacity * (state === 'hover' ? 1.4 : 1)})`
            : `rgba(141, 84, 255, ${p.opacity * 0.7 * (state === 'hover' ? 1.4 : 1)})`;

          ctx.beginPath();
          ctx.arc(px, py, p.size, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.shadowColor = isCyan ? 'rgba(0,210,239,0.8)' : 'rgba(141,84,255,0.8)';
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.shadowBlur = 0;
        });

        // Connecting lines between nearby particles
        if (state === 'hover') {
          for (let i = 0; i < particles.length; i++) {
            const ai = particleAngles.current[i];
            const ri = particles[i].radius * 1.3;
            const pxi = x + Math.cos(ai) * ri;
            const pyi = y + Math.sin(ai) * ri;
            for (let j = i + 1; j < particles.length; j++) {
              const aj = particleAngles.current[j];
              const rj = particles[j].radius * 1.3;
              const pxj = x + Math.cos(aj) * rj;
              const pyj = y + Math.sin(aj) * rj;
              const dist = Math.hypot(pxi - pxj, pyi - pyj);
              if (dist < 55) {
                ctx.beginPath();
                ctx.moveTo(pxi, pyi);
                ctx.lineTo(pxj, pyj);
                ctx.strokeStyle = `rgba(0, 210, 239, ${(1 - dist / 55) * 0.25})`;
                ctx.lineWidth = 0.8;
                ctx.stroke();
              }
            }
          }
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [particles]);

  const dotSize = cursorState === 'click' ? 6 : cursorState === 'hover' ? 14 : 8;
  const ringSize = cursorState === 'click' ? 20 : cursorState === 'hover' ? 56 : 38;

  return (
    <>
      {/* Canvas for trail + particles */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 9990 }}
      />

      {/* Dot cursor */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 9995,
        }}
        animate={{
          width: dotSize,
          height: dotSize,
          backgroundColor: cursorState === 'hover' ? '#8d54ff' : '#00d2ef',
          boxShadow: cursorState === 'click'
            ? '0 0 0 3px rgba(0,210,239,0.3), 0 0 20px rgba(0,210,239,0.6)'
            : cursorState === 'hover'
              ? '0 0 0 2px rgba(141,84,255,0.3), 0 0 16px rgba(141,84,255,0.6)'
              : '0 0 12px rgba(0,210,239,0.5)',
        }}
        transition={{ duration: 0.15 }}
        className="fixed rounded-full pointer-events-none"
      />

      {/* Ring cursor */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 9994,
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          borderColor: cursorState === 'hover' ? 'rgba(141,84,255,0.7)' : 'rgba(0,210,239,0.5)',
          borderWidth: cursorState === 'hover' ? 2 : 1,
          rotate: cursorState === 'hover' ? 45 : 0,
          borderRadius: cursorState === 'hover' ? '8px' : '50%',
        }}
        transition={{ duration: 0.25 }}
        className="fixed border pointer-events-none"
      />

      {/* Hover label */}
      {isInHero && cursorState === 'hover' && (
        <motion.div
          style={{
            x: ringX,
            y: ringY,
            translateX: '20px',
            translateY: '-50%',
            zIndex: 9996,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed pointer-events-none text-[9px] font-mono text-cyan-400 tracking-widest bg-zinc-900/80 px-2 py-0.5 rounded border border-cyan-500/30 backdrop-blur-sm whitespace-nowrap"
        >
          CLICK
        </motion.div>
      )}
    </>
  );
}
