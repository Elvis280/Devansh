'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouse = { x: -100, y: -100 };
    let ring_pos = { x: -100, y: -100 };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouse = { x: e.clientX, y: e.clientY };
      // Dot snaps instantly
      dot.style.transform = `translate(${mouse.x - 4}px, ${mouse.y - 4}px)`;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      // Ring lags behind with smooth lerp
      ring_pos.x = lerp(ring_pos.x, mouse.x, 0.12);
      ring_pos.y = lerp(ring_pos.y, mouse.y, 0.12);
      ring.style.transform = `translate(${ring_pos.x - 18}px, ${ring_pos.y - 18}px)`;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    window.addEventListener('mousemove', onMove, { passive: true });

    // Hide native cursor
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      document.body.style.cursor = '';
    };
  }, []);

  return (
    <>
      {/* Dot — exact mouse position */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#00d2ef',
          pointerEvents: 'none',
          zIndex: 9999,
          willChange: 'transform',
        }}
      />

      {/* Ring — lags slightly behind */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1.5px solid rgba(0, 210, 239, 0.6)',
          pointerEvents: 'none',
          zIndex: 9998,
          willChange: 'transform',
        }}
      />
    </>
  );
}
