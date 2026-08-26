'use client';

import { useEffect, useRef, useState } from 'react';

export default function CRTOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRaining, setIsRaining] = useState(false);

  // Tab AFK title switcher
  useEffect(() => {
    const originalTitle = document.title;
    const onVisibilityChange = () => {
      document.title = document.hidden
        ? '▓▒░ afk — devansh sharma'
        : originalTitle;
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, []);

  // Konami Code Easter Egg (↑ ↑ ↓ ↓ ← → ← → b a)
  useEffect(() => {
    const KONAMI = [
      'ArrowUp',
      'ArrowUp',
      'ArrowDown',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'ArrowLeft',
      'ArrowRight',
      'b',
      'a',
    ];
    let buffer: string[] = [];

    const onKeyDown = (e: KeyboardEvent) => {
      buffer.push(e.key);
      buffer = buffer.slice(-KONAMI.length);
      if (KONAMI.every((key, i) => key.toLowerCase() === buffer[i]?.toLowerCase())) {
        setIsRaining(true);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Matrix Rain Canvas
  useEffect(() => {
    if (!isRaining) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cols = Math.floor(window.innerWidth / 15);
    const drops: number[] = Array(cols).fill(0);
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノDEVANSHSHARMA';
    let frame = 0;

    const interval = setInterval(() => {
      ctx.fillStyle = 'rgba(7, 7, 6, 0.12)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#a3e635';
      ctx.font = '13px monospace';

      for (let i = 0; i < cols; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * 15, drops[i] * 16);

        if (drops[i] * 16 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      frame++;
      if (frame > 180) {
        clearInterval(interval);
        setIsRaining(false);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }, 33);

    return () => clearInterval(interval);
  }, [isRaining]);

  return (
    <>
      {/* Studio vignette */}
      <div
        className="fixed inset-0 z-[80] pointer-events-none select-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, transparent 45%, rgba(7, 7, 6, 0.65) 100%)',
        }}
      />

      {/* Matrix Rain Easter Egg Canvas */}
      {isRaining && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 z-[85] pointer-events-none bg-black/40 backdrop-blur-[1px]"
        />
      )}
    </>
  );
}