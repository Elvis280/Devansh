'use client';

import { useState, useEffect } from 'react';

interface SectionTrackerProps {
  className?: string;
  fixed?: boolean;
}

const SECTIONS = [
  { id: 'hero', num: '01', name: 'INTRO' },
  { id: 'about', num: '02', name: 'ABOUT' },
  { id: 'projects', num: '03', name: 'PROJECTS' },
  { id: 'experiments', num: '04', name: 'EXPERIMENTS' },
  { id: 'journey', num: '05', name: 'JOURNEY' },
  { id: 'contact', num: '06', name: 'CONTACT' },
];

export default function SectionTracker({ className = '', fixed = false }: SectionTrackerProps) {
  const [currentSection, setCurrentSection] = useState(1);

  useEffect(() => {
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

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const containerClasses = fixed
    ? `fixed bottom-6 left-6 sm:left-10 lg:left-14 z-40 bg-[#070707]/85 backdrop-blur-md border border-white/15 px-3.5 py-2 flex items-center gap-3 font-mono text-xs select-none pointer-events-auto shadow-2xl transition-all duration-300 ${className}`
    : `flex items-center gap-3 font-mono text-xs select-none bg-[#0a0a09]/80 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-full shadow-lg ${className}`;

  return (
    <div className={containerClasses}>
      {/* Active Section Number */}
      <span className="font-bold text-[#a3e635] tracking-wider transition-all duration-300">
        0{currentSection}
      </span>

      {/* Segmented Dynamic Track Bar */}
      <div className="flex items-center gap-1.5 py-0.5">
        {SECTIONS.map((sec, idx) => {
          const numSec = idx + 1;
          const isActive = numSec === currentSection;
          const isPassed = numSec < currentSection;

          return (
            <button
              key={sec.id}
              onClick={() => scrollTo(sec.id)}
              className="group relative py-1 px-0.5 cursor-pointer focus:outline-none"
              title={`Go to Section 0${numSec}: ${sec.name}`}
            >
              <div
                className={`h-0.5 transition-all duration-300 ${
                  isActive
                    ? 'w-7 sm:w-8 bg-[#a3e635] shadow-[0_0_8px_#a3e635]'
                    : isPassed
                    ? 'w-3.5 sm:w-4 bg-white/40 group-hover:bg-[#a3e635]/70'
                    : 'w-3.5 sm:w-4 bg-white/20 group-hover:bg-white/50'
                }`}
              />

              {/* Hover Tooltip Badge (Pops down from header) */}
              <span className="absolute top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-[#0d0d0c] text-[#a3e635] border border-white/20 px-2 py-0.5 text-[9.5px] font-mono whitespace-nowrap pointer-events-none z-50 shadow-xl">
                0{numSec} // {sec.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Total Section Count */}
      <span className="text-white/30 tracking-wider">
        06
      </span>
    </div>
  );
}
