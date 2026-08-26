'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const scrollToExplore = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full overflow-hidden select-none bg-[#070707]"
      style={{ height: '100svh', minHeight: 600 }}
    >
      {/* ─── Hidden SVG Grunge Filter ─── */}
      <svg
        style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <filter id="grunge-hero" x="-2%" y="-2%" width="104%" height="104%" colorInterpolationFilters="sRGB">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65 0.75"
              numOctaves="4"
              seed="5"
              result="noise"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0   3.5 0 0 -1.5 0"
              in="noise"
              result="mask"
            />
            <feComposite in="SourceGraphic" in2="mask" operator="in" />
          </filter>
        </defs>
      </svg>

      {/* ─── Ghost DS Watermark ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
        className="absolute left-[32%] top-1/2 -translate-y-1/2 z-[1] font-bebas text-[clamp(200px,40vw,500px)] leading-none text-white/[0.035] tracking-[-0.02em] select-none pointer-events-none"
      >
        DS
      </motion.div>

      {/* ─── Portrait — fills right 70% of viewport ─── */}
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 bottom-0 left-[28%] sm:left-[30%] lg:left-[32%] right-0 z-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <img
          src="/dev_hero_portrait.jpg"
          alt="Devansh Sharma"
          className="w-full h-full object-cover object-[50%_12%]"
          style={{ filter: 'grayscale(1) brightness(0.65) contrast(1.35)' }}
        />

        {/* Heavy left-edge vignette — blends name into portrait */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, #070707 0%, #070707 10%, rgba(7,7,7,0.9) 22%, rgba(7,7,7,0.55) 40%, rgba(7,7,7,0.15) 62%, transparent 80%)',
          }}
        />
        {/* Bottom vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, transparent 60%, rgba(7,7,7,0.8) 86%, #070707 100%)',
          }}
        />
        {/* Top vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(7,7,7,0.55) 0%, transparent 18%)',
          }}
        />
      </motion.div>

      {/* ─── Technical Corner Accents ─── */}
      <div aria-hidden="true" className="absolute inset-0 z-[2] pointer-events-none">
        {/* Top-left bracket */}
        <div className="absolute left-[clamp(20px,3.5vw,52px)] top-[clamp(16px,8%,80px)]">
          <div className="w-4 h-4 border-t border-l border-white/30" />
        </div>
        {/* Top-right bracket */}
        <div className="absolute right-[clamp(20px,3.5vw,52px)] top-[clamp(16px,8%,80px)]">
          <div className="w-4 h-4 border-t border-r border-white/20" />
        </div>
        {/* Bottom-left bracket */}
        <div className="absolute left-[clamp(20px,3.5vw,52px)] bottom-[clamp(16px,8%,80px)]">
          <div className="w-4 h-4 border-b border-l border-white/20" />
        </div>

        {/* Right-side crosshair accent (matches image) */}
        <div className="absolute right-[clamp(20px,3.5vw,52px)] top-1/2 -translate-y-1/2 hidden sm:flex flex-col items-center gap-1">
          {/* Crosshair target */}
          <div className="relative w-5 h-5 mb-2">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/20" />
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/20" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 border border-white/25 rounded-full" />
          </div>
          {/* Vertical tick marks */}
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`h-px bg-white/${i === 2 ? '25' : '10'} ${i === 2 ? 'w-4' : 'w-2'}`} />
          ))}
        </div>
      </div>

      {/* ─── Upper-Right Location Stamp ─── */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute z-10 pointer-events-none hidden sm:block text-right"
        style={{
          top: 'clamp(80px, 18%, 160px)',
          right: 'clamp(20px, 9%, 120px)',
        }}
      >
        <p className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-white/45 leading-loose">
          <span className="text-white/20">— </span>BASED IN
          <br />
          <span className="text-white/70 font-semibold tracking-[0.15em]">LUCKNOW, INDIA</span>
        </p>
      </motion.div>

      {/* ─── Main Left-Panel Text Stack ─── */}
      {/*
        Anchored top-left at ~10-13% from top (matching the reference image).
        Max-width covers ~40vw so the portrait face is fully visible to the right.
      */}
      <div
        className="absolute z-10 flex flex-col"
        style={{
          left: 'clamp(20px, 4vw, 56px)',
          top: 'clamp(80px, 11%, 120px)',
          maxWidth: 'clamp(260px, 40vw, 560px)',
        }}
      >
        {/* Corner accent bracket */}
        <div className="w-4 h-4 border-t border-l border-white/35 mb-4" />

        {/* DEVANSH line + lime accent square */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative inline-block self-start"
        >
          <h1
            className="font-bebas leading-[0.84] tracking-[0.01em] uppercase text-white block"
            style={{
              fontSize: 'clamp(4.4rem, 16.5vw, 13.5rem)',
              textShadow: '0 0 0 #fff, 2px 2px 0 rgba(0,0,0,0.55), -1px -1px 0 rgba(0,0,0,0.28)',
              filter: 'url(#grunge-hero)',
            }}
          >
            DEVANSH
          </h1>
          {/* Lime accent square — top-right corner of "DEVANSH" */}
          <span
            aria-hidden="true"
            className="absolute top-[8%] -right-3 sm:-right-5 w-3 sm:w-4 h-3 sm:h-4 bg-[#a3e635] shadow-[0_0_12px_rgba(163,230,53,0.8)] block animate-pulse"
          />
        </motion.div>

        {/* SHARMA line */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="font-bebas leading-[0.84] tracking-[0.01em] uppercase text-white block"
          style={{
            fontSize: 'clamp(4.4rem, 16.5vw, 13.5rem)',
            marginTop: '0.04em',
            textShadow: '0 0 0 #fff, 2px 2px 0 rgba(0,0,0,0.55), -1px -1px 0 rgba(0,0,0,0.28)',
            filter: 'url(#grunge-hero)',
          }}
        >
          SHARMA
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-mono uppercase text-white/60 leading-relaxed tracking-[0.18em]"
          style={{
            fontSize: 'clamp(0.6rem, 0.85vw, 0.8rem)',
            marginTop: 'clamp(10px, 1.6vh, 20px)',
          }}
        >
          BUILDER / AI ENGINEER /
          <br />
          COMPUTER SCIENCE STUDENT
        </motion.p>

        {/* Handwritten quote */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.38 }}
          className="font-handwritten text-[#a3e635] leading-snug font-normal"
          style={{
            fontSize: 'clamp(1.3rem, 2.5vw, 2.1rem)',
            marginTop: 'clamp(8px, 1.4vh, 18px)',
          }}
        >
          I build things that
          <br />
          <span className="relative inline-block">
            probably shouldn&apos;t exist yet.
            <svg
              aria-hidden="true"
              viewBox="0 0 220 8"
              fill="none"
              className="absolute -bottom-1 left-0 w-full h-2 overflow-visible"
            >
              <path d="M2 4 C 55 1, 165 7, 218 3" stroke="#a3e635" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </span>
        </motion.p>

        {/* 3-Box Info Strip */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="inline-flex flex-wrap w-fit max-w-full border border-white/15 bg-[#080808]/75 backdrop-blur-md shadow-xl"
          style={{ marginTop: 'clamp(14px, 2.4vh, 30px)' }}
        >
          {/* Box 1 — Location */}
          <div className="flex items-center gap-2.5 px-3.5 sm:px-4 py-3 border-r border-white/10 flex-shrink-0">
            <MapPin size={13} className="text-[#a3e635] flex-shrink-0" />
            <span className="font-mono text-[10.5px] sm:text-[11.5px] tracking-[0.16em] uppercase text-white/80 leading-tight font-medium">
              BASED IN
              <br />
              INDIA
            </span>
          </div>

          {/* Box 2 — Focus */}
          <div className="flex items-center gap-2.5 px-3.5 sm:px-4 py-3 border-r border-white/10 flex-shrink-0">
            <span className="font-mono text-xs font-bold text-[#a3e635] flex-shrink-0 leading-none">&lt;/&gt;</span>
            <span className="font-mono text-[10.5px] sm:text-[11.5px] tracking-[0.16em] uppercase text-white/80 leading-tight font-medium">
              CS / AI /
              <br />
              SOFTWARE
            </span>
          </div>

          {/* Box 3 — Availability */}
          <div className="flex items-center gap-2.5 px-3.5 sm:px-4 py-3 flex-shrink-0">
            <ArrowRight size={13} className="text-[#a3e635] flex-shrink-0" />
            <span className="font-mono text-[10.5px] sm:text-[11.5px] tracking-[0.16em] uppercase text-white/80 leading-tight font-medium">
              AVAILABLE FOR
              <br />
              INTERNSHIPS /
              <br />
              OPPORTUNITIES
            </span>
          </div>
        </motion.div>
      </div>

      {/* ─── Bottom Bar ─── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-end"
        style={{ padding: '0 clamp(20px,4vw,56px) clamp(20px,3vh,32px)' }}
      >
        {/* Right: SCROLL TO EXPLORE */}
        <button
          onClick={scrollToExplore}
          aria-label="Scroll to explore"
          className="flex items-center gap-3 transition-all cursor-pointer group border-none bg-transparent p-0"
        >
          <span className="relative inline-block font-mono text-[10.2px] sm:text-[10.5px] tracking-[0.22em] text-white/75 group-hover:text-white uppercase transition-colors font-medium pb-1">
            SCROLL TO EXPLORE
            <svg
              aria-hidden="true"
              viewBox="0 0 200 8"
              fill="none"
              className="absolute -bottom-0.5 left-0 w-full h-2 overflow-visible pointer-events-none"
            >
              <path d="M2 4 C 50 1, 150 7, 198 3" stroke="#a3e635" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </span>
          <svg
            viewBox="0 0 12 12"
            fill="none"
            className="w-4 h-4 text-[#a3e635] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform flex-shrink-0"
            aria-hidden="true"
          >
            <path
              d="M3 3l6 6M9 4.5v4.5h-4.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </motion.div>
    </section>
  );
}
