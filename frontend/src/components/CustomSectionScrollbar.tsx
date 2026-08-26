'use client';

import { useState, useEffect } from 'react';

const SECTIONS = [
  { id: 'hero', num: '01', name: 'INTRO' },
  { id: 'about', num: '02', name: 'ABOUT' },
  { id: 'projects', num: '03', name: 'PROJECTS' },
  { id: 'experiments', num: '04', name: 'EXPERIMENTS' },
  { id: 'journey', num: '05', name: 'JOURNEY' },
  { id: 'contact', num: '06', name: 'CONTACT' },
];

export default function CustomSectionScrollbar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(Math.max(window.scrollY / totalHeight, 0), 1);
        setScrollProgress(progress);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = SECTIONS.findIndex((s) => s.id === entry.target.id);
            if (idx !== -1) {
              setCurrentSection(idx + 1);
            }
          }
        });
      },
      { threshold: 0.25 }
    );

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <aside
      aria-label="Section Scrollbar Rail"
      className="fixed right-0 top-0 bottom-0 w-7 sm:w-8 z-40 hidden md:flex flex-col items-center justify-between py-6 select-none pointer-events-auto bg-[#070707]/70 backdrop-blur-xs border-l border-white/10"
    >
      {/* Top Section Numeral */}
      <span className="font-mono text-[10px] font-bold text-[#a3e635] tracking-widest">
        01
      </span>

      {/* Main Track Line & Sliding Thumb */}
      <div className="relative flex-1 w-full flex flex-col items-center my-4">
        {/* Background Vertical Guide Line */}
        <div className="absolute top-0 bottom-0 w-px bg-white/15" />

        {/* Dynamic Scroll Progress Fill Line */}
        <div
          className="absolute top-0 w-0.5 bg-[#a3e635]/80 shadow-[0_0_8px_#a3e635] transition-all duration-75"
          style={{ height: `${scrollProgress * 100}%` }}
        />

        {/* Glowing Lime Thumb Indicator */}
        <div
          className="absolute w-2.5 h-2.5 rounded-full bg-[#a3e635] shadow-[0_0_10px_#a3e635] pointer-events-none transition-all duration-75"
          style={{
            top: `${scrollProgress * 100}%`,
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* 6 Section Ticks / Fast Navigation Nodes */}
        <div className="absolute inset-y-0 w-full flex flex-col justify-between items-center py-2">
          {SECTIONS.map((sec, idx) => {
            const numSec = idx + 1;
            const isActive = numSec === currentSection;

            return (
              <button
                key={sec.id}
                onClick={() => scrollTo(sec.id)}
                className="group relative w-full flex items-center justify-center py-1 cursor-pointer focus:outline-none"
                title={`0${numSec} // ${sec.name}`}
              >
                {/* Node Mark */}
                <div
                  className={`transition-all duration-300 ${
                    isActive
                      ? 'w-3 h-1 bg-[#a3e635] shadow-[0_0_8px_#a3e635]'
                      : 'w-1.5 h-0.5 bg-white/40 group-hover:bg-[#a3e635] group-hover:w-2.5'
                  }`}
                />

                {/* Tooltip popping up to the left of the scrollbar */}
                <div className="absolute right-full mr-2 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-[#0d0d0c] text-[#a3e635] border border-white/20 px-2 py-1 text-[9.5px] font-mono whitespace-nowrap pointer-events-none z-50 shadow-xl flex items-center gap-1.5">
                  <span className="font-bold">0{numSec}</span>
                  <span className="text-white/40">//</span>
                  <span className="text-white font-medium uppercase tracking-wider">{sec.name}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Section Limit Numeral */}
      <span className="font-mono text-[10px] text-white/30 tracking-widest">
        06
      </span>
    </aside>
  );
}
