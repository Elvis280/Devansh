'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  Briefcase,
  GraduationCap,
  Trophy,
  ExternalLink,
  MapPin,
  Sparkles,
  ChevronRight,
  Camera,
  CheckCircle2,
  ArrowUpRight,
} from 'lucide-react';
import { journeyMilestones, experiences, achievements, certificates, personalInfo } from '@/lib/data';

export default function Journey() {
  const [activeTab, setActiveTab] = useState<'timeline' | 'photos' | 'credentials'>('timeline');
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [showFullModal, setShowFullModal] = useState<boolean>(false);

  const photos = [
    { src: '/images/AlgoZ1.jpg', alt: 'AlgoZenith SRMCEM Chapter' },
    { src: '/images/AlgoZ10.JPG', alt: 'Technical Workshop & Coding Event' },
    { src: '/images/GFG1.jpg', alt: 'GeeksforGeeks Student Chapter' },
    { src: '/images/AlgoZ4.jpg', alt: 'Mentoring & Peer Collaboration' },
  ];

  return (
    <section
      id="journey"
      className="relative min-h-screen py-24 sm:py-32 px-6 sm:px-10 lg:px-14 bg-[#060606] border-t border-white/[0.06] overflow-hidden select-none"
    >
      <div className="relative z-10 max-w-[1400px] mx-auto space-y-14">
        {/* ── Top Level Header: 05 JOURNEY __ TIMELINE & ARCHIVE ──────────── */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Header Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="w-4 h-4 border-t border-l border-white/25 mb-3" />
            <div className="font-bebas text-6xl sm:text-7xl text-[#edece6] leading-none mb-2">
              05
            </div>
            <h2 className="font-bebas text-4xl sm:text-5xl text-[#edece6] uppercase tracking-wide leading-none">
              JOURNEY <span className="text-[#a3e635]">__</span>
            </h2>
            <div className="font-mono text-xs text-[#a3e635] tracking-widest uppercase font-bold mt-1">
              TIMELINE &amp; ARCHIVE
            </div>

            <p className="font-mono text-xs text-white/60 mt-4 leading-relaxed max-w-xs">
              A timeline of growth, curiosity and the people &amp; opportunities that shaped the builder I&apos;m becoming today.
            </p>

            <div className="mt-8">
              <button
                onClick={() => setShowFullModal(true)}
                className="group border border-white/20 hover:border-[#a3e635] bg-white/[0.02] hover:bg-[#a3e635]/[0.06] text-white/80 hover:text-[#a3e635] font-mono text-[10.5px] tracking-[0.2em] px-4 py-3 uppercase flex items-center justify-between gap-3 w-full max-w-[200px] transition-all cursor-pointer shadow-md"
              >
                <span>VIEW FULL JOURNEY</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Right Horizontal Milestone Track (2023 - 2026) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-9"
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
              {/* Connecting Accent Horizontal Line */}
              <div className="absolute top-10 left-4 right-4 h-0.5 bg-gradient-to-r from-white/10 via-[#a3e635]/60 to-white/10 hidden lg:block" />

              {journeyMilestones.map((milestone, idx) => (
                <div
                  key={milestone.year}
                  className="border border-white/12 bg-[#090909] hover:bg-[#0d0d0c] hover:border-[#a3e635]/50 p-5 relative z-10 transition-all duration-300 group shadow-lg"
                >
                  {/* Glowing Node Mark */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bebas text-4xl sm:text-5xl text-white group-hover:text-[#a3e635] transition-colors">
                      {milestone.year}
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#a3e635] shadow-[0_0_8px_#a3e635]" />
                  </div>

                  <h3 className="font-mono text-xs font-bold text-[#a3e635] uppercase tracking-wider mb-3">
                    {milestone.title}
                  </h3>

                  <ul className="space-y-2 font-mono text-[11px] text-white/70 leading-relaxed">
                    {milestone.highlights.map((item, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2">
                        <span className="text-[#a3e635] font-bold mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Lower Level: Interactive 3-Tab Archive ────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="border border-white/15 bg-[#080808] p-6 sm:p-8 shadow-2xl space-y-6"
        >
          {/* Tab Selector Bar */}
          <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
            {[
              { id: 'timeline', label: 'NARRATIVE TIMELINE', sub: 'The story of my journey', icon: Sparkles },
              { id: 'photos', label: 'DOCUMENTARY ARCHIVE', sub: 'Moments, events & memories', icon: Camera },
              { id: 'credentials', label: 'VERIFIED CREDENTIALS', sub: 'Certificates & achievements', icon: Award },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`font-mono text-xs p-3 sm:px-5 sm:py-3 border text-left transition-all flex items-center gap-3 cursor-pointer ${
                    isActive
                      ? 'border-[#a3e635] bg-[#0d0d0c] text-white font-bold shadow-[0_0_12px_rgba(163,230,53,0.2)]'
                      : 'border-white/10 text-white/50 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <tab.icon size={16} className={isActive ? 'text-[#a3e635]' : 'text-white/40'} />
                  <div>
                    <div className="uppercase tracking-wider">{tab.label}</div>
                    <div className="text-[9.5px] text-white/40 normal-case">{tab.sub}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Dynamic Tab Content Area */}
          <AnimatePresence mode="wait">
            {activeTab === 'timeline' && (
              <motion.div
                key="timeline"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid lg:grid-cols-12 gap-6 sm:gap-8"
              >
                {/* Left Column: Photo Archive Preview */}
                <div className="lg:col-span-5 flex flex-col justify-end">
                  <div className="grid grid-cols-4 gap-1 mb-4">
                    {photos.slice(0, 4).map((photo, idx) => (
                      <div key={idx} className="w-full aspect-[3/4] bg-neutral-900 overflow-hidden">
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          className="w-full h-full object-cover grayscale"
                        />
                      </div>
                    ))}
                  </div>
                  <p className="font-mono text-[11px] text-white/60 mb-2">
                    Leading. Collaborating. Building together.
                  </p>
                  <button 
                    onClick={() => setActiveTab('photos')}
                    className="font-mono text-[11px] font-bold text-[#a3e635] uppercase flex items-center gap-1.5 hover:text-white transition-colors self-start"
                  >
                    VIEW PHOTO ARCHIVE <ArrowUpRight size={14} />
                  </button>
                </div>

                {/* Right Column: Top Credentials Grid */}
                <div className="lg:col-span-7 grid grid-cols-2 gap-3 sm:gap-4">
                  {[
                    { logo: 'O', name: 'Agentic AI\nProfessional', date: '2025' },
                    { logo: 'A|', name: 'Model Context\nProtocol (MCP)', date: '2025' },
                    { logo: 'G', name: 'AI Agents\nIntensive', date: '2024' },
                    { logo: 'H', name: 'Python\n5-Star', date: '2024' },
                    { logo: 'k', name: '1 Year on Kaggle - Python Coder - Community Member', date: '2024', colSpan: 2 }
                  ].map((cert, idx) => (
                    <div 
                      key={idx} 
                      className={`border border-white/10 bg-[#0c0c0b] p-4 sm:p-5 relative group transition-all hover:border-[#a3e635]/40 ${cert.colSpan === 2 ? 'col-span-2 flex items-center gap-5 sm:gap-8' : 'flex items-center gap-4 sm:gap-6'}`}
                    >
                      {/* Logo Icon Area */}
                      <div className={`font-bebas text-white/70 select-none ${cert.colSpan === 2 ? 'text-5xl sm:text-5xl pl-1' : 'text-5xl sm:text-6xl'} flex-shrink-0 leading-none`}>
                        {cert.logo}
                      </div>

                      {/* Text Content */}
                      <div className="flex-1 pr-6">
                        <div className="font-mono text-[10px] sm:text-[11px] font-bold text-white whitespace-pre-line leading-relaxed">
                          {cert.name}
                        </div>
                        <div className="font-mono text-[9px] text-white/40 mt-1.5">
                          {cert.date}
                        </div>
                      </div>

                      {/* Verification Check */}
                      <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4">
                        <CheckCircle2 size={14} className="text-[#a3e635]/80" />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'photos' && (
              <motion.div
                key="photos"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {photos.map((photo, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedPhoto(photo.src)}
                      className="border border-white/10 bg-[#0d0d0c] p-2 hover:border-[#a3e635] transition-all cursor-pointer group"
                    >
                      <div className="w-full aspect-[4/3] overflow-hidden bg-neutral-900 mb-2">
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                        />
                      </div>
                      <p className="font-mono text-[10px] text-white/60 line-clamp-1">{photo.alt}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'credentials' && (
              <motion.div
                key="credentials"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid sm:grid-cols-3 gap-4"
              >
                {certificates.map((cert, idx) => (
                  <div key={idx} className="border border-white/10 bg-[#0d0d0c] p-4 flex items-center justify-between">
                    <div>
                      <div className="font-mono text-xs font-bold text-white">{cert.name}</div>
                      <div className="font-mono text-[10px] text-white/40">
                        {cert.issuer} • {cert.date}
                      </div>
                    </div>
                    <CheckCircle2 size={16} className="text-[#a3e635] flex-shrink-0" />
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Bottom Quote & Devansh Signature Banner ──────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div className="flex items-center gap-3">
            <span className="text-[#a3e635] text-3xl font-bold font-mono">“</span>
            <p className="font-mono text-xs sm:text-sm text-white/70 tracking-wide uppercase max-w-lg leading-relaxed">
              Every step, every failure and every late night has been a part of the journey.
            </p>
          </div>

          <div className="font-handwritten text-3xl sm:text-4xl text-[#a3e635] select-none">
            Devansh Sharma.
          </div>
        </motion.div>
      </div>

      {/* Photo Preview Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img src={selectedPhoto} alt="Archive Photo" className="max-w-full max-h-[85vh] object-contain border border-white/20" />
          </div>
        </div>
      )}

      {/* Full Journey Modal */}
      {showFullModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-[#0d0d0c] border border-white/15 p-6 sm:p-8 text-[#eae8e1] shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto my-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="font-mono text-xs text-[#a3e635] tracking-widest uppercase">
                  FULL JOURNEY ARCHIVE
                </span>
                <h3 className="font-bebas text-3xl text-white mt-1">
                  CHRONOLOGICAL MILESTONES (2023-2026)
                </h3>
              </div>
              <button
                onClick={() => setShowFullModal(false)}
                className="w-8 h-8 flex items-center justify-center border border-white/20 hover:border-[#a3e635] text-white/60 hover:text-[#a3e635] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 font-mono text-xs text-white/80 leading-relaxed">
              {journeyMilestones.map((m) => (
                <div key={m.year} className="border-l-2 border-[#a3e635] pl-4 py-1 space-y-1">
                  <div className="font-bebas text-2xl text-white">{m.year} - {m.title}</div>
                  <ul className="space-y-1 text-white/60">
                    {m.highlights.map((h, idx) => (
                      <li key={idx}>• {h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setShowFullModal(false)}
                className="border border-white/20 hover:border-[#a3e635] text-white hover:text-[#a3e635] px-5 py-2 font-mono text-xs uppercase cursor-pointer"
              >
                CLOSE ARCHIVE
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
