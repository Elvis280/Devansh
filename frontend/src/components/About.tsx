'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import {
  Code2, Zap, Puzzle, FlaskConical, X, Copy, Ban, ArrowUpRight,
  GraduationCap, Award, Briefcase, Target, Box, Cloud, Share2, 
  Search, Brain, BarChart, Trophy, Code
} from 'lucide-react';
import { personalInfo, experiences, certificates } from '@/lib/data';

export default function About() {
  const [showDossier, setShowDossier] = useState(false);
  const [activePolaroid, setActivePolaroid] = useState(0);

  useEffect(() => {
    if (showDossier) {
      document.body.style.overflow = 'hidden';
      return;
    }
    
    document.body.style.overflow = 'unset';
    
    const interval = setInterval(() => {
      setActivePolaroid((prev) => (prev + 1) % 3);
    }, 8000);
    
    return () => {
      document.body.style.overflow = 'unset';
      clearInterval(interval);
    };
  }, [showDossier]);

  const polaroids = [
    {
      id: 0,
      src: '/images/about_polaroid_user.jpg',
      alt: personalInfo.name,
      decoration: (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 sm:w-28 h-5 bg-neutral-800/90 backdrop-blur-xs border-y border-white/18 rotate-[-1deg] shadow-sm z-30 pointer-events-none" />
      )
    },
    {
      id: 1,
      src: '/images/about_polaroid_mountain.jpg',
      alt: 'Exploring and trekking',
      decoration: null
    },
    {
      id: 2,
      src: '/images/about_polaroid_desk.jpg',
      alt: 'Night workspace and code terminal',
      decoration: (
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#111] shadow-md border border-white/25 z-20" />
      )
    }
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen pt-32 sm:pt-36 pb-28 sm:pb-32 px-6 sm:px-10 lg:px-14 bg-[#070707] border-t border-white/[0.06] overflow-hidden select-none scroll-mt-12"
    >
      {/* ── Background CURIOUS watermark ─── */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 whitespace-nowrap"
        style={{ opacity: 0.055 }}
      >
        <span className="font-bebas text-[clamp(11rem,26vw,32rem)] leading-none text-white tracking-widest">
          CURIOUS
        </span>
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col" style={{ minHeight: 'calc(100vh - 14rem)' }}>

        {/* ── Top Section Header ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-14"
        >
          <div className="w-4 h-4 border-t border-l border-white/25 mb-3" />
          <div className="font-bebas text-6xl sm:text-7xl text-[#edece6] leading-none mb-1">
            02
          </div>
          <div className="font-mono text-[11px] tracking-[0.22em] uppercase font-bold flex items-center gap-2">
            <span className="text-[#a3e635]">ABOUT</span>
            <span className="text-white/30">/</span>
            <span className="text-white/70">WHO I AM</span>
          </div>
        </motion.div>

        {/* ── 3-Column Equal Grid ─────────── */}
        <div className="w-full max-w-[1300px] mx-auto flex-1 flex flex-col justify-center self-center lg:pl-16 xl:pl-24">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 xl:gap-24 items-stretch">

          {/* ── Column 1: ABOUT ME headline + bio + CTA ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col justify-between h-full pb-8 lg:pb-0"
          >
            {/* Giant ABOUT ME heading */}
            <div className="mb-8">
              <h2
                className="font-bebas leading-[0.84] tracking-[0.02em] text-[#edece6] uppercase"
                style={{ fontSize: 'clamp(4.56rem, 9.5vw, 8.55rem)' }}
              >
                ABOUT
              </h2>
              <div className="flex items-end gap-3 sm:gap-4">
                <h2
                  className="font-bebas leading-[0.84] tracking-[0.02em] text-[#edece6] uppercase"
                  style={{ fontSize: 'clamp(4.56rem, 9.5vw, 8.55rem)' }}
                >
                  ME
                </h2>
                {/* Lime solid underscore bar (Terminal cursor style at bottom of 'E') */}
                <span className="w-12 sm:w-16 h-3 sm:h-3.5 bg-[#a3e635] shadow-[0_0_12px_rgba(163,230,53,0.6)] inline-block mb-1.5 sm:mb-2.5 flex-shrink-0" />
              </div>
            </div>

            {/* Narrative Bio */}
            <div className="font-mono text-[11px] sm:text-[11.5px] text-white/60 leading-[1.85] flex flex-col gap-3 sm:gap-3.5 max-w-[340px] ">
              <p>
                I&apos;m Devansh — a builder at heart and an AI engineer in the making.
              </p>
              <p>
                I love turning messy ideas into real systems that solve meaningful problems — from autonomous agents and vision-language models to high-performance full-stack apps.
              </p>
              <p>
                I learn by building, break things often, and believe the best way to master technology is to dive deep and construct it yourself.
              </p>
            </div>

            {/* CTA Button */}
            <div className="mt-12 pt-8 sm:pt-10 border-t border-white/[0.07]">
              <button
                onClick={() => setShowDossier(true)}
                className="group border border-white/20 hover:border-[#a3e635] bg-white/[0.02] hover:bg-[#a3e635]/[0.06] text-white/80 hover:text-[#a3e635] font-mono text-xs tracking-[0.25em] px-6 uppercase flex items-center justify-center gap-4 w-full max-w-[280px] aspect-[6/1] transition-all cursor-pointer shadow-md"
                aria-label="Open personal dossier"
              >
                <span>KNOW MORE ABOUT ME</span>
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform flex-shrink-0" />
              </button>
            </div>
          </motion.div>

          {/* ── Column 2: I LIKE / I DON'T LIKE ────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col justify-between h-full pb-12 lg:pb-0"
          >
            {/* I LIKE */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <span className="w-2.5 h-2.5 bg-[#a3e635] shadow-[0_0_8px_#a3e635] flex-shrink-0" />
                <span className="font-mono text-[11px] tracking-[0.22em] font-bold text-white uppercase">
                  I LIKE
                </span>
                <div className="flex-1 h-px bg-white/12 ml-1" />
              </div>

              <div className="flex flex-col">
                {[
                  { icon: Code2, label: 'Building before overplanning' },
                  { icon: Zap, label: 'Breaking things' },
                  { icon: Puzzle, label: 'Understanding how systems work' },
                  { icon: FlaskConical, label: 'Experimenting with weird ideas' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="border border-white/10 hover:border-[#a3e635]/50 bg-[#0c0c0b] hover:bg-[#a3e635]/[0.03] pr-4 flex items-center gap-4 transition-all group cursor-default w-full aspect-[6/1] overflow-hidden"
                  >
                    {/* Bordered icon box */}
                    <div className="h-full aspect-square border-r border-white/15 group-hover:border-[#a3e635]/50 flex items-center justify-center text-[#a3e635] flex-shrink-0 transition-colors bg-white/[0.02]">
                      <item.icon className="w-[40%] h-[40%]" strokeWidth={1.75} />
                    </div>
                    <span className="font-mono text-[11px] text-white/70 group-hover:text-white/90 transition-colors leading-tight">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* I DON'T LIKE */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <span className="w-2.5 h-2.5 bg-[#a3e635] shadow-[0_0_8px_#a3e635] flex-shrink-0" />
                <span className="font-mono text-[11px] tracking-[0.22em] font-bold text-white uppercase">
                  I DON&apos;T LIKE
                </span>
                <div className="flex-1 h-px bg-white/12 ml-1" />
              </div>

              <div className="flex flex-col">
                {[
                  { icon: X, label: 'Overengineered solutions' },
                  { icon: Copy, label: 'Copy-paste projects' },
                  { icon: Ban, label: 'Technology for the sake of technology' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="border border-white/10 hover:border-white/25 bg-[#0c0c0b] pr-4 flex items-center gap-4 transition-all group cursor-default w-full aspect-[6/1] overflow-hidden"
                  >
                    {/* Bordered icon box */}
                    <div className="h-full aspect-square border-r border-white/12 flex items-center justify-center text-white/35 group-hover:text-white/65 flex-shrink-0 transition-colors bg-white/[0.01]">
                      <item.icon className="w-[40%] h-[40%]" strokeWidth={1.75} />
                    </div>
                    <span className="font-mono text-[11px] text-white/50 group-hover:text-white/75 transition-colors leading-tight">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Column 3: Polaroid Photo Collage ─────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex items-center justify-center"
            style={{ minHeight: '460px' }}
          >
            {/* Top-Right stamp: /// BUILD BREAK LEARN REPEAT */}
            <div className="absolute -top-16 -right-6 lg:-top-15 lg:-right-5 text-right select-none z-0 hidden sm:block font-mono text-[9.5px] tracking-widest uppercase">
              <span className="text-white/18">///</span>
              <div className="mt-2 space-y-[3px]">
                <p className="text-white/40">BUILD</p>
                <p className="text-white/40">BREAK</p>
                <p className="text-white/40">LEARN</p>
                <p className="text-[#a3e635] font-bold">REPEAT</p>
              </div>
            </div>

            {/* Animated Polaroid Stack */}
            {polaroids.map((p) => {
              const isActive = activePolaroid === p.id;
              const isNext = (activePolaroid + 1) % 3 === p.id;
              
              return (
                <motion.div
                  key={p.id}
                  onClick={() => {
                    if (isActive) {
                      setActivePolaroid((prev) => (prev + 1) % 3);
                    } else {
                      setActivePolaroid(p.id);
                    }
                  }}
                  className="absolute cursor-pointer w-[237px] sm:w-[295px] aspect-[4/5] bg-[#edece6] p-2.5 pb-8 sm:p-3 sm:pb-10 shadow-2xl border border-black/25 origin-center"
                  animate={{
                    x: isActive ? '0%' : isNext ? '25%' : '15%',
                    y: isActive ? '0%' : isNext ? '25%' : '-25%',
                    scale: isActive ? 1 : isNext ? 0.95 : 0.9,
                    rotate: isActive ? (p.id === 0 ? -2 : p.id === 1 ? 2 : -1) : isNext ? 6 : 12,
                    zIndex: isActive ? 30 : isNext ? 20 : 10,
                  }}
                  transition={{ type: 'spring', stiffness: 280, damping: 25 }}
                >
                  {p.decoration}
                  <div className="w-full h-full overflow-hidden bg-neutral-900 relative group">
                    <img
                      src={p.src}
                      alt={p.alt}
                      className={`w-full h-full object-cover transition-all duration-700 ${isActive ? 'grayscale-0' : 'grayscale contrast-[1.2]'}`}
                    />
                    {!isActive && (
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                    )}
                  </div>
                </motion.div>
              );
            })}

            {/* Lime Claude Logo block */}
            <div className="absolute top-4 right-[40%] sm:right-[38%] z-30 w-11 sm:w-12 h-11 sm:h-12 bg-[#a3e635] flex items-center justify-center shadow-[0_0_16px_rgba(163,230,53,0.55)] rotate-[8deg] pointer-events-none">
              <svg viewBox="0 0 24 24" fill="currentColor" className="text-black w-[22px] h-[22px]">
                <path d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z" />
              </svg>
            </div>

            {/* Handwritten flourish — bottom right */}
            <div className="absolute -bottom-12 right-8 sm:right-60 z-30 select-none">
              <div className="font-handwritten text-[1.15rem] sm:text-[1.35rem] text-[#a3e635] leading-[1.5]">
                <p>Stay curious,</p>
                <p>Stay hungry,</p>
                <p className="relative inline-block">
                  Keep building.
                  <svg
                    className="absolute -bottom-1 left-0 w-full h-2 text-[#a3e635] overflow-visible"
                    viewBox="0 0 100 10"
                    fill="none"
                  >
                    <path
                      d="M2 5 C 30 1, 70 8, 98 4"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </p>
              </div>
            </div>
          </motion.div>
          </div>
        </div>
      </div>
      {/* ── Personal Dossier Modal ──────────────────────────────── */}
      {showDossier && typeof document !== 'undefined' && createPortal(
        <div data-lenis-prevent="true" className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 sm:p-8 overflow-y-auto backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[1100px] bg-[#050505] border border-white/10 p-6 sm:p-10 shadow-2xl max-h-[90vh] overflow-y-auto scrollbar-hide flex flex-col lg:flex-row gap-10"
          >
            {/* Close Button */}
            <button
              onClick={() => setShowDossier(false)}
              className="absolute top-0 right-0 p-4 sm:p-6 text-white/40 hover:text-white transition-colors z-10"
              aria-label="Close dossier"
            >
              <X size={32} strokeWidth={1} />
            </button>

            {/* Left Column */}
            <div className="flex-1 lg:max-w-[45%] flex flex-col">
              {/* Header */}
              <div className="mb-10">
                <div className="font-mono text-[10px] tracking-widest uppercase mb-4">
                  <span className="text-[#a3e635]">DS</span> <span className="text-white/40">// ENGINEERING PROFILE</span>
                </div>
                <h3 className="font-bebas text-7xl sm:text-[7.5rem] leading-[0.8] tracking-tight">
                  <div className="text-white">DEVANSH</div>
                  <div className="text-[#a3e635]">SHARMA</div>
                </h3>
                <p className="font-mono text-[11px] text-white/30 mt-6 tracking-[0.2em] uppercase">
                  [ BACKGROUND &amp; ENGINEERING PROFILE ]
                </p>
              </div>

              <div className="space-y-10 flex-1">
                {/* Academic */}
                <div>
                  <div className="text-[#a3e635] text-[11px] font-mono tracking-widest mb-4 uppercase">
                    / ACADEMIC FOUNDATION
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 flex-shrink-0 border border-white/10 flex items-center justify-center text-white/50">
                      <GraduationCap size={22} strokeWidth={1.5} className="text-[#a3e635]" />
                    </div>
                    <div className="font-mono text-[12.5px] text-white/80 leading-[1.7]">
                      B.Tech in Computer Science &amp; Engineering<br/>
                      at SRMCEM, Lucknow, India (2023–2027).<br/><br/>
                      <span className="text-white/40">Core focus:</span> <span className="text-[#a3e635]">Data Structures, Operating Systems, Database Management,</span> and <span className="text-[#a3e635]">Machine Learning.</span>
                    </div>
                  </div>
                </div>

                {/* Focus */}
                <div>
                  <div className="text-[#a3e635] text-[11px] font-mono tracking-widest mb-4 uppercase">
                    / ENGINEERING FOCUS
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 flex-shrink-0 border border-white/10 flex items-center justify-center text-white/50">
                      <Target size={22} strokeWidth={1.5} className="text-[#a3e635]" />
                    </div>
                    <div className="font-mono text-[12.5px] text-white/80 leading-[1.7]">
                      Autonomous Desktop Agents, Vision-Language<br/>
                      Models (VLMs), Retrieval-Augmented Generation<br/>
                      (RAG), and High-Performance Full-Stack Web<br/>
                      Systems (<span className="text-[#a3e635]">Python, React, Rust</span>).
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Left Badge */}
              <div className="mt-12 border border-white/10 p-5 flex items-center justify-between w-fit gap-8">
                <div className="font-mono text-[10px] text-white/40 tracking-widest uppercase leading-loose">
                  BUILT WITH<br/>CURIOSITY &amp; CODE
                </div>
                <Code size={24} strokeWidth={1} className="text-[#a3e635]" />
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="hidden lg:block w-px bg-gradient-to-b from-white/0 via-white/10 to-white/0 mx-2"></div>

            {/* Right Column */}
            <div className="flex-1 lg:max-w-[55%] pt-10 lg:pt-0">
              <div className="text-[#a3e635] text-[11px] font-mono tracking-widest mb-6 uppercase">
                / HONORS &amp; CERTIFICATIONS
              </div>
              
              <div className="flex flex-col">
                {certificates.map((cert, idx) => {
                  const Icon = [Award, Zap, Box, Cloud, Code2, Share2, Search, Box, Brain, BarChart, Trophy][idx % 11];
                  return (
                    <a 
                      key={idx} 
                      href={cert.url || '#'} 
                      target={cert.url ? "_blank" : undefined}
                      rel={cert.url ? "noopener noreferrer" : undefined}
                      className="flex items-center border-b border-white/[0.06] py-3.5 group hover:bg-white/[0.02] transition-colors cursor-pointer"
                    >
                      <div className="w-10 h-10 flex-shrink-0 border border-white/[0.08] flex items-center justify-center mr-4 group-hover:border-[#a3e635]/30 transition-colors">
                        <Icon size={18} strokeWidth={1.5} className="text-[#a3e635]" />
                      </div>
                      
                      <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2 min-w-0">
                        <div className="font-mono text-[12px] text-white/90 truncate mr-4 group-hover:text-[#a3e635] transition-colors">
                          {cert.name}
                        </div>
                        <div className="font-mono text-[10px] tracking-widest uppercase flex-shrink-0 whitespace-nowrap">
                          <span className="text-white/40">{cert.issuer}</span>
                          <span className="text-white/20 mx-3">|</span>
                          <span className="text-[#a3e635]">{cert.date}</span>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

          </motion.div>
        </div>,
        document.body
      )}
    </section>
  );
}