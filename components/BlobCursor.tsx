'use client';

import { useEffect, useRef } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface BlobCursorProps {
  blobType?: 'circle' | 'square';
  fillColor?: string;
  trailCount?: number;
  sizes?: number[];
  innerSizes?: number[];
  innerColor?: string;
  opacities?: number[];
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  filterStdDeviation?: number;
  useFilter?: boolean;
  fastDuration?: number;
  slowDuration?: number;
  zIndex?: number;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Convert a "settle duration" (seconds) to a per-frame lerp factor at 60 fps. */
const durationToLerp = (duration: number, dt: number) =>
  1 - Math.exp(-dt / Math.max(duration, 0.001));

// ─── Component ───────────────────────────────────────────────────────────────

export default function BlobCursor({
  blobType = 'circle',
  fillColor = '#5227FF',
  trailCount = 3,
  sizes = [60, 125, 75],
  innerSizes = [20, 35, 25],
  innerColor = 'rgba(255,255,255,0.8)',
  opacities = [0.6, 0.6, 0.6],
  shadowColor = 'rgba(0,0,0,0.75)',
  shadowBlur = 5,
  shadowOffsetX = 10,
  shadowOffsetY = 10,
  filterStdDeviation = 30,
  useFilter = true,
  fastDuration = 0.1,
  slowDuration = 0.5,
  zIndex = 100,
}: BlobCursorProps) {
  const outerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const innerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mousePos = useRef({ x: -300, y: -300 });
  // Each blob position; chain: blob[i] follows blob[i-1], blob[0] follows mouse
  const positions = useRef<{ x: number; y: number }[]>([]);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  const borderRadius = blobType === 'circle' ? '50%' : '8px';
  const filterId = 'blob-cursor-goo';

  useEffect(() => {
    // Initialise positions off-screen so there's no flash at (0,0)
    positions.current = Array.from({ length: trailCount }, () => ({
      x: -300,
      y: -300,
    }));

    // ── Mouse tracking ────────────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    // Hide the native cursor site-wide while BlobCursor is mounted
    document.body.style.cursor = 'none';

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // ── Animation loop ───────────────────────────────────────────────────
    const animate = (time: number) => {
      // Cap dt so a stalled tab doesn't cause a giant jump
      const dt = Math.min((time - (lastTimeRef.current || time)) / 1000, 0.05);
      lastTimeRef.current = time;

      for (let i = 0; i < trailCount; i++) {
        // Lerp factor: blob[0] = fastDuration, last blob = slowDuration, others interpolated
        const t = trailCount > 1 ? i / (trailCount - 1) : 0;
        const duration = fastDuration + (slowDuration - fastDuration) * t;
        const factor = durationToLerp(duration, dt);

        // Chain: blob[0] chases the mouse; blob[i>0] chases the previous blob
        const target = i === 0 ? mousePos.current : positions.current[i - 1];

        positions.current[i] = {
          x: lerp(positions.current[i].x, target.x, factor),
          y: lerp(positions.current[i].y, target.y, factor),
        };

        const size = sizes[i] ?? 60;
        const innerSize = innerSizes[i] ?? 20;

        // Position the outer gooey blob
        const outer = outerRefs.current[i];
        if (outer) {
          outer.style.left = `${positions.current[i].x - size / 2}px`;
          outer.style.top = `${positions.current[i].y - size / 2}px`;
        }

        // Position the inner crisp dot (same centre, separate layer)
        const inner = innerRefs.current[i];
        if (inner) {
          inner.style.left = `${positions.current[i].x - innerSize / 2}px`;
          inner.style.top = `${positions.current[i].y - innerSize / 2}px`;
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafRef.current);
      document.body.style.cursor = '';
    };
  }, [trailCount, sizes, innerSizes, fastDuration, slowDuration]);

  // ── Derived box-shadow string ───────────────────────────────────────────
  const boxShadow = `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px ${shadowColor}`;

  return (
    <>
      {/* ── SVG Gooey Filter ─────────────────────────────────────────────
          Placed in the document but takes up no space.
          feGaussianBlur blurs the blobs; feColorMatrix sharpens the alpha
          back to a hard edge, creating the "goo / liquid merge" effect.
      ─────────────────────────────────────────────────────────────────── */}
      {useFilter && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: 0,
            height: 0,
            overflow: 'hidden',
            zIndex: -1,
            pointerEvents: 'none',
          }}
        >
          <defs>
            <filter id={filterId} colorInterpolationFilters="sRGB">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation={filterStdDeviation}
                result="blur"
              />
              {/* 18 × alpha − 7: pixels with α > ~0.39 become fully opaque → gooey edge */}
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                result="goo"
              />
              {/* Composite the original source on top so colours stay true */}
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
        </svg>
      )}

      {/* ── Layer 1: Gooey outer blobs ─────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex,
          pointerEvents: 'none',
          overflow: 'hidden',
          filter: useFilter ? `url(#${filterId})` : undefined,
        }}
      >
        {Array.from({ length: trailCount }, (_, i) => {
          const size = sizes[i] ?? 60;
          const opacity = opacities[i] ?? 0.6;
          return (
            <div
              key={i}
              ref={el => { outerRefs.current[i] = el; }}
              style={{
                position: 'absolute',
                width: size,
                height: size,
                borderRadius,
                backgroundColor: fillColor,
                opacity,
                boxShadow,
                willChange: 'left, top',
              }}
            />
          );
        })}
      </div>

      {/* ── Layer 2: Crisp inner dots (above the goo filter) ───────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: zIndex + 1,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        {Array.from({ length: trailCount }, (_, i) => {
          const innerSize = innerSizes[i] ?? 20;
          const opacity = opacities[i] ?? 0.6;
          return (
            <div
              key={i}
              ref={el => { innerRefs.current[i] = el; }}
              style={{
                position: 'absolute',
                width: innerSize,
                height: innerSize,
                borderRadius,
                backgroundColor: innerColor,
                opacity,
                willChange: 'left, top',
              }}
            />
          );
        })}
      </div>
    </>
  );
}
