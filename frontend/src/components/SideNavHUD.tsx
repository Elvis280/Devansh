'use client';

import { useState, useEffect } from 'react';
import { personalInfo } from '@/lib/data';

const SECTIONS = [
  { id: 'hero', num: '01', label: 'INTRO', sub: 'Home' },
  { id: 'about', num: '02', label: 'ABOUT', sub: 'Who I Am' },
  { id: 'projects', num: '03', label: 'PROJECTS', sub: 'Selected Works' },
  { id: 'experiments', num: '04', label: 'EXPERIMENTS', sub: 'Laboratory' },
  { id: 'journey', num: '05', label: 'JOURNEY', sub: 'Timeline' },
  { id: 'contact', num: '06', label: 'CONTACT', sub: 'Transmission' },
];

export default function SideNavHUD() {
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
    const el = document.getElementById(id);
    if (!el) return;
    const NAVBAR_HEIGHT = 20;
    const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <aside
      aria-label="Section & Social Navigation HUD"
      className="fixed right-5 sm:right-7 lg:right-9 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3 select-none pointer-events-auto bg-[#070707]/80 backdrop-blur-md border border-white/10 px-2.5 py-4 shadow-2xl transition-all"
    >
      {/* Top Glowing Lime Radar Beacon */}
      <div className="flex flex-col items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635] shadow-[0_0_8px_#a3e635] animate-pulse" />
        <span className="font-mono text-[10px] font-bold text-[#a3e635] tracking-widest">
          0{currentSection}
        </span>
      </div>

      {/* Vertical Segmented Section Track Bar */}
      <div className="flex flex-col items-center gap-1.5 py-1">
        {SECTIONS.map((sec, idx) => {
          const numSec = idx + 1;
          const isActive = numSec === currentSection;
          const isPassed = numSec < currentSection;

          return (
            <button
              key={sec.id}
              onClick={() => scrollTo(sec.id)}
              className="group relative px-2 py-0.5 cursor-pointer focus:outline-none flex items-center justify-center"
              title={`Section 0${numSec}: ${sec.label}`}
            >
              <div
                className={`transition-all duration-300 ${
                  isActive
                    ? 'h-6 sm:h-7 w-1 bg-[#a3e635] shadow-[0_0_10px_#a3e635]'
                    : isPassed
                    ? 'h-3 sm:h-3.5 w-0.5 bg-white/45 group-hover:bg-[#a3e635]/80'
                    : 'h-3 sm:h-3.5 w-0.5 bg-white/20 group-hover:bg-white/60'
                }`}
              />

              {/* Hover Tooltip Badge (Pops up to the left of the sidebar) */}
              <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-[#0d0d0c] text-[#a3e635] border border-white/20 px-2 py-1 text-[9.5px] font-mono whitespace-nowrap pointer-events-none z-50 shadow-xl flex items-center gap-1.5">
                <span className="font-bold">0{numSec}</span>
                <span className="text-white/40">//</span>
                <span className="text-white font-medium uppercase tracking-wider">{sec.label}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Bottom Track Limit Indicator */}
      <span className="font-mono text-[9px] text-white/30 tracking-widest">
        06
      </span>

      {/* Thin Connecting Divider Line */}
      <div
        className={`w-px bg-gradient-to-b from-white/20 to-white/10 transition-all duration-500 ${
          currentSection === 1 ? 'h-5 my-0.5 opacity-100' : 'h-0 my-0 opacity-0'
        }`}
      />

      {/* Social Links Stack */}
      <div
        className={`flex flex-col items-center font-mono text-[10px] font-bold tracking-widest text-white/45 transition-all duration-500 overflow-hidden ${
          currentSection === 1 ? 'max-h-[200px] opacity-100 gap-2 mt-1' : 'max-h-0 opacity-0 gap-0 mt-0'
        }`}
      >
        <a
          href={personalInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#a3e635] transition-all hover:-translate-x-0.5 py-0.5"
          title="GitHub"
        >
          GH
        </a>
        <a
          href={personalInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#a3e635] transition-all hover:-translate-x-0.5 py-0.5"
          title="LinkedIn"
        >
          LI
        </a>
        <a
          href={personalInfo.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#a3e635] transition-all hover:-translate-x-0.5 py-0.5"
          title="Twitter / X"
        >
          X
        </a>
        <a
          href={`mailto:${personalInfo.email}`}
          className="hover:text-[#a3e635] transition-all hover:-translate-x-0.5 py-0.5"
          title="Email"
        >
          ML
        </a>
      </div>
    </aside>
  );
}
