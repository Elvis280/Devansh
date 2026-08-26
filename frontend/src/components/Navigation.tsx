'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import SectionTracker from '@/components/SectionTracker';

const NAV_LINKS = [
  { href: '#hero', label: 'DEVANSH SHARMA', num: '01', sub: 'Home // Intro' },
  { href: '#about', label: 'ABOUT ME', num: '02', sub: 'Manifesto // Who I Am' },
  { href: '#projects', label: 'SELECTED PROJECTS', num: '03', sub: 'Case Studies // Systems' },
  { href: '#experiments', label: 'EXPERIMENTS', num: '04', sub: 'Laboratory // Prototypes' },
  { href: '#journey', label: 'JOURNEY', num: '05', sub: 'Timeline // Archive' },
  { href: '#contact', label: "LET'S BUILD SOMETHING COOL", num: '06', sub: 'Direct Channel // Transmission' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('#hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHash(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.25 }
    );

    const sections = ['#hero', '#about', '#projects', '#experiments', '#journey', '#contact'];
    sections.forEach((id) => {
      const el = document.querySelector(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    setActiveHash(href);
    setMenuOpen(false);
    const target = document.querySelector(href) as HTMLElement | null;
    if (!target) return;
    const NAVBAR_HEIGHT = 20; // px — small offset so content isn't hidden by header
    const top = target.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Header Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none transition-all duration-300">
        <div
          className={`flex items-center justify-between px-6 sm:px-10 lg:px-14 py-6 pointer-events-auto transition-all ${
            scrolled ? 'bg-[#060606]/90 backdrop-blur-md border-b border-white/[0.06]' : ''
          }`}
        >
          {/* Top Left: DS Logo + Lime Dot */}
          <button
            onClick={() => scrollTo('#hero')}
            className="group flex items-center gap-2 text-left cursor-pointer focus:outline-none"
            aria-label="Devansh Sharma Home"
          >
            <span className="font-bebas text-2xl tracking-[0.1em] text-[#eae8e1] group-hover:text-[#a3e635] transition-colors">
              DS
            </span>
            <span className="w-2 h-2 rounded-full bg-[#a3e635] shadow-[0_0_8px_#a3e635]" />
          </button>

          {/* Top Center: Dynamic Header Section Tracker (01 ━━━ 06) */}
          <div className="hidden sm:flex items-center justify-center">
            <SectionTracker fixed={false} />
          </div>

          {/* Top Right: MENU + Lime Dot */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="group flex items-center gap-2 text-left cursor-pointer focus:outline-none transition-all duration-300"
              aria-label="Toggle Menu"
            >
              <span className="font-mono text-xs sm:text-[13px] tracking-[0.22em] uppercase text-[#eae8e1] group-hover:text-[#a3e635] transition-colors font-medium">
                MENU
              </span>
              <span className="w-2 h-2 rounded-full bg-[#a3e635] shadow-[0_0_8px_#a3e635] animate-pulse" />
            </button>
          </div>
        </div>
      </header>

      {/* Floating Vertical Social Rail (Right Side) — Intro Only */}
      <aside
        aria-label="Social Navigation"
        className={`fixed right-6 sm:right-8 lg:right-10 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-4 pointer-events-auto transition-all duration-500 overflow-hidden ${
          activeHash === '#hero' ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635] shadow-[0_0_8px_#a3e635] animate-pulse" />
        <div className="w-px h-8 bg-gradient-to-b from-[#a3e635]/60 to-white/15" />
        <a
          href={personalInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[11px] font-bold tracking-widest text-white/45 hover:text-[#a3e635] transition-all py-1 hover:-translate-x-0.5"
          title="GitHub"
        >
          GH
        </a>
        <a
          href={personalInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[11px] font-bold tracking-widest text-white/45 hover:text-[#a3e635] transition-all py-1 hover:-translate-x-0.5"
          title="LinkedIn"
        >
          LI
        </a>
        <a
          href={personalInfo.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[11px] font-bold tracking-widest text-white/45 hover:text-[#a3e635] transition-all py-1 hover:-translate-x-0.5"
          title="Twitter / X"
        >
          X
        </a>
        <a
          href={`mailto:${personalInfo.email}`}
          className="font-mono text-[11px] font-bold tracking-widest text-white/45 hover:text-[#a3e635] transition-all py-1 hover:-translate-x-0.5"
          title="Email"
        >
          ML
        </a>
        <div className="w-px h-6 bg-white/10" />
      </aside>

      {/* Full-Screen Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[70] bg-[#070707]/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-12 lg:p-16 border border-white/[0.08]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-6">
              <div className="flex items-center gap-3">
                <span className="font-bebas text-3xl text-white">DS</span>
                <span className="w-2 h-2 rounded-full bg-[#a3e635] shadow-[0_0_8px_#a3e635]" />
                <span className="font-mono text-xs text-white/40 tracking-[0.2em] ml-2">INDEX // 01-06</span>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center border border-white/15 hover:border-[#a3e635] hover:text-[#a3e635] text-white/70 transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* Menu Links */}
            <div className="max-w-4xl py-6 space-y-2">
              {NAV_LINKS.map((item, idx) => {
                const isActive = activeHash === item.href;
                return (
                  <motion.button
                    key={item.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.35 }}
                    onClick={() => scrollTo(item.href)}
                    className="group w-full flex items-baseline justify-between py-3 border-b border-white/[0.05] text-left cursor-pointer transition-all"
                  >
                    <div className="flex items-baseline gap-4 sm:gap-8">
                      <span
                        className={`font-mono text-xs tracking-widest ${
                          isActive ? 'text-[#a3e635]' : 'text-white/30 group-hover:text-[#a3e635]'
                        }`}
                      >
                        {item.num}
                      </span>
                      <span className="font-bebas text-3xl sm:text-5xl lg:text-6xl text-[#eae8e1] group-hover:text-[#a3e635] group-hover:translate-x-3 transition-all duration-300">
                        {item.label}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] tracking-wider text-white/30 hidden sm:inline group-hover:text-white/60">
                      {item.sub}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Footer Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-6 font-mono text-xs text-white/50">
              <div className="flex items-center gap-4">
                <a
                  href={personalInfo.cv}
                  download="Devansh_Sharma_CV.pdf"
                  className="flex items-center gap-2 px-4 py-2 bg-[#a3e635] text-black font-bold tracking-wider uppercase hover:scale-105 transition-transform"
                >
                  <Download size={13} />
                  <span>Resume PDF</span>
                </a>
                <span className="text-white/40">{personalInfo.email}</span>
              </div>
              <div className="flex items-center gap-4">
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-[#a3e635]">
                  GitHub ↗
                </a>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#a3e635]">
                  LinkedIn ↗
                </a>
                <a href={personalInfo.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-[#a3e635]">
                  Twitter ↗
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}