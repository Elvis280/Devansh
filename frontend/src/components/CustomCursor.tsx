'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    document.documentElement.classList.add('has-cursor');

    const onMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    let raf = 0;
    const animateCursor = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetPos.current.x - 3}px, ${targetPos.current.y - 3}px, 0)`;
      }
      ringPos.current.x += (targetPos.current.x - ringPos.current.x) * 0.14;
      ringPos.current.y += (targetPos.current.y - ringPos.current.y) * 0.14;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x - 24}px, ${ringPos.current.y - 24}px, 0)`;
      }
      raf = requestAnimationFrame(animateCursor);
    };
    raf = requestAnimationFrame(animateCursor);

    const onEnterInteractive = () => {
      ringRef.current?.classList.add('cursor-hover');
    };
    const onLeaveInteractive = () => {
      ringRef.current?.classList.remove('cursor-hover');
    };

    const attachListeners = () => {
      document.querySelectorAll('a, button, [data-cursor], input, textarea').forEach((el) => {
        el.removeEventListener('mouseenter', onEnterInteractive);
        el.removeEventListener('mouseleave', onLeaveInteractive);
        el.addEventListener('mouseenter', onEnterInteractive);
        el.addEventListener('mouseleave', onLeaveInteractive);
      });
    };

    attachListeners();
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#a3e635] shadow-[0_0_6px_#a3e635] z-[9999] pointer-events-none"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-12 h-12 border border-white/25 z-[9998] pointer-events-none transition-[width,height,border-color,background-color] duration-200 ease-out"
        style={{ willChange: 'transform' }}
      />
    </>
  );
}