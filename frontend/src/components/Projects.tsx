'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Eye,
  Brain,
  Hand,
  ShieldCheck,
  RotateCw,
  Sparkles,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';
import { GitHubIcon } from '@/components/Icons';
import { projects, ProjectDetail } from '@/lib/data';
import CaseStudyModal from '@/components/CaseStudyModal';

export default function Projects() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeProjectId, setActiveProjectId] = useState<string>('intentos');
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<ProjectDetail | null>(null);
  const [showAllModal, setShowAllModal] = useState<boolean>(false);

  const activeProject = projects.find((p) => p.id === activeProjectId) || projects[0];

  const scrollSlider = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    const scrollAmount = 320;
    sliderRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const projectTabs = [
    { id: 'overview', label: 'OVERVIEW' },
    { id: 'problem', label: 'PROBLEM' },
    { id: 'approach', label: 'APPROACH' },
    { id: 'architecture', label: 'ARCHITECTURE' },
    { id: 'challenges', label: 'CHALLENGES' },
    { id: 'result', label: 'RESULT & IMPACT' },
    { id: 'links', label: 'LINKS' },
  ];

  return (
    <section
      id="projects"
      className="relative min-h-screen py-24 sm:py-32 px-6 sm:px-10 lg:px-14 bg-[#060606] border-t border-white/[0.06] overflow-hidden select-none"
    >
      <div className="relative z-10 max-w-[1400px] mx-auto space-y-16">
        {/* ── Top Level: 03 SELECTED PROJECTS + Carousel ──────────────────── */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Header Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 flex flex-col justify-between"
          >
            <div>
              {/* Corner Bracket */}
              <div className="w-4 h-4 border-t border-l border-white/25 mb-3" />
              <div className="font-bebas text-6xl sm:text-7xl text-[#edece6] leading-none mb-2">
                03
              </div>
              <h2 className="font-bebas text-4xl sm:text-5xl lg:text-5xl text-[#edece6] uppercase tracking-wide leading-[0.9]">
                SELECTED
                <br />
                PROJECTS
              </h2>
              <p className="font-mono text-xs text-white/60 mt-4 leading-relaxed max-w-xs">
                A few things I&apos;ve built, broken and learned from.
              </p>
            </div>

            {/* CTA Button */}
            <div className="mt-8">
              <button
                onClick={() => setShowAllModal(true)}
                className="group border border-white/20 hover:border-[#a3e635] bg-white/[0.02] hover:bg-[#a3e635]/[0.06] text-white/80 hover:text-[#a3e635] font-mono text-[10.5px] tracking-[0.2em] px-4 py-3 uppercase flex items-center justify-between gap-3 w-full max-w-[200px] transition-all cursor-pointer shadow-md"
              >
                <span>VIEW ALL PROJECTS</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Right Horizontal Project Slider Container */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-9 relative"
          >
            {/* Top Carousel Navigation Arrows & Track Label */}
            <div className="flex items-center justify-between mb-4 px-1">
              <span className="font-mono text-[10px] text-white/40 tracking-widest uppercase">
                SWIPE TO EXPLORE ← →
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => scrollSlider('left')}
                  className="w-8 h-8 border border-white/20 hover:border-[#a3e635] hover:text-[#a3e635] text-white/70 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Scroll left"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => scrollSlider('right')}
                  className="w-8 h-8 border border-white/20 hover:border-[#a3e635] hover:text-[#a3e635] text-white/70 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Scroll right"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Horizontal Scroll Track */}
            <div
              ref={sliderRef}
              className="flex gap-4 overflow-x-auto scrollbar-none pb-4 snap-x snap-mandatory"
            >
              {projects.slice(0, 5).map((project, index) => {
                const isSelected = project.id === activeProjectId;
                return (
                  <motion.div
                    key={project.id}
                    onClick={() => setActiveProjectId(project.id)}
                    whileHover={{ y: -4 }}
                    className={`flex-shrink-0 w-[245px] sm:w-[275px] snap-start border p-4 transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'border-[#a3e635] bg-[#0c0c0b] shadow-[0_0_20px_rgba(163,230,53,0.15)]'
                        : 'border-white/10 hover:border-white/30 bg-[#090909]'
                    }`}
                  >
                    {/* Index Tag */}
                    <div className="flex items-center justify-between mb-3 font-mono text-[10px]">
                      <span className={`px-1.5 py-0.5 font-bold ${isSelected ? 'bg-[#a3e635] text-black' : 'text-white/40'}`}>
                        0{index + 1}
                      </span>
                      <span className="text-white/30">SYS // 0{index + 1}</span>
                    </div>

                    {/* Image Preview Thumbnail */}
                    <div className="w-full h-32 bg-neutral-900 overflow-hidden mb-3 border border-white/5 relative group">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                    </div>

                    {/* Project Title & Short Subtitle */}
                    <h3 className="font-bebas text-2xl text-white tracking-wide uppercase flex items-center gap-1.5">
                      {project.title}
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635]" />}
                    </h3>
                    <p className="font-mono text-[10.5px] text-white/50 mt-1 line-clamp-2 leading-relaxed h-8">
                      {project.subtitle}
                    </p>

                    {/* View Case Study CTA */}
                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCaseStudy(project);
                        }}
                        className="font-mono text-[10px] tracking-wider text-white/70 hover:text-[#a3e635] uppercase flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>VIEW CASE STUDY</span>
                        <ArrowUpRight size={12} />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* ── Lower Level: Interactive Step Pipeline & Active Project Deep-Dive ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border border-white/15 bg-[#080808] p-6 sm:p-10 shadow-2xl"
        >
          {/* Active Project Title Banner */}
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left Tab Navigator & Title */}
            <div className="lg:col-span-7 space-y-6">
              <div className="border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 font-mono text-xs text-[#a3e635] tracking-widest uppercase">
                  <span>01</span>
                  <span>/</span>
                  <span>{activeProject.title}</span>
                </div>
                <h3 className="font-bebas text-4xl sm:text-5xl text-white uppercase tracking-wide mt-2">
                  {activeProject.subtitle}.
                </h3>
                <p className="font-mono text-xs text-white/70 leading-relaxed mt-3">
                  {activeProject.description}
                </p>
              </div>

              {/* Sub-Tabs: OVERVIEW | PROBLEM | APPROACH | ARCHITECTURE | CHALLENGES | RESULT */}
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 border-b border-white/10">
                {projectTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`font-mono text-[10.5px] tracking-wider px-3 py-1.5 uppercase transition-all whitespace-nowrap cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-[#a3e635] text-black font-bold'
                        : 'text-white/50 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Dynamic Tab Content Display */}
              <div className="font-mono text-xs text-white/80 leading-relaxed bg-[#0d0d0c] p-4 border border-white/10 min-h-[100px]">
                {activeTab === 'overview' && <p>{activeProject.description}</p>}
                {activeTab === 'problem' && <p>{activeProject.caseStudy?.problem || 'Complex multi-step workflow automation required a unified reasoning framework.'}</p>}
                {activeTab === 'approach' && <p>{activeProject.caseStudy?.approach || 'Decoupled perception modules from execution primitives to enable deterministic self-correcting loops.'}</p>}
                {activeTab === 'architecture' && <p>{activeProject.caseStudy?.architecture || 'FastAPI backend streaming tool parameters into an asynchronous React state loop.'}</p>}
                {activeTab === 'challenges' && <p>{activeProject.caseStudy?.challenges || 'Managing UI latency and state recovery across non-deterministic LLM tool calls.'}</p>}
                {activeTab === 'result' && <p>{activeProject.caseStudy?.result || 'Achieved 82% task completion success rate across 1000+ real-world desktop automation tasks.'}</p>}
                {activeTab === 'links' && (
                  <div className="flex items-center gap-4 py-2">
                    {activeProject.github && (
                      <a href={activeProject.github} target="_blank" rel="noopener noreferrer" className="text-[#a3e635] underline flex items-center gap-1">
                        <GitHubIcon size={14} /> GitHub Repository
                      </a>
                    )}
                    {activeProject.demo && (
                      <a href={activeProject.demo} target="_blank" rel="noopener noreferrer" className="text-[#a3e635] underline flex items-center gap-1">
                        <ExternalLink size={14} /> Live Demo Application
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2">
                {activeProject.tech.map((tag, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-[9.5px] uppercase tracking-wider px-2.5 py-1 bg-white/[0.04] text-white/70 border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Pipeline Architecture & Metrics */}
            <div className="lg:col-span-5 space-y-6">
              {/* Step Pipeline Box */}
              <div className="border border-white/10 bg-[#090909] p-5 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 font-mono text-[10px] text-white/50 tracking-widest uppercase">
                    <span>SYSTEM ARCHITECTURE</span>
                    <div className="w-6 h-px bg-[#a3e635]" />
                  </div>
                </div>

                {/* 5-Step Connected Flow Icons */}
                <div className="grid grid-cols-5 gap-2 relative">
                  {/* Step 1: OBSERVE */}
                  <div className="flex flex-col items-center text-center group">
                    <div className="w-10 h-10 border border-white/15 bg-white/[0.02] flex items-center justify-center mb-2 group-hover:border-[#a3e635] transition-colors">
                      <Eye size={16} className="text-[#a3e635]" />
                    </div>
                    <span className="font-mono text-[9px] font-bold text-white uppercase">OBSERVE</span>
                    <span className="font-mono text-[7.5px] text-white/40 mt-1 leading-tight hidden sm:block">
                      Capture screen
                    </span>
                  </div>

                  {/* Step 2: REASON */}
                  <div className="flex flex-col items-center text-center group">
                    <div className="w-10 h-10 border border-white/15 bg-white/[0.02] flex items-center justify-center mb-2 group-hover:border-[#a3e635] transition-colors">
                      <Brain size={16} className="text-[#a3e635]" />
                    </div>
                    <span className="font-mono text-[9px] font-bold text-white uppercase">REASON</span>
                    <span className="font-mono text-[7.5px] text-white/40 mt-1 leading-tight hidden sm:block">
                      LLM decides
                    </span>
                  </div>

                  {/* Step 3: ACT */}
                  <div className="flex flex-col items-center text-center group">
                    <div className="w-10 h-10 border border-white/15 bg-white/[0.02] flex items-center justify-center mb-2 group-hover:border-[#a3e635] transition-colors">
                      <Hand size={16} className="text-[#a3e635]" />
                    </div>
                    <span className="font-mono text-[9px] font-bold text-white uppercase">ACT</span>
                    <span className="font-mono text-[7.5px] text-white/40 mt-1 leading-tight hidden sm:block">
                      Execute skills
                    </span>
                  </div>

                  {/* Step 4: VERIFY */}
                  <div className="flex flex-col items-center text-center group">
                    <div className="w-10 h-10 border border-white/15 bg-white/[0.02] flex items-center justify-center mb-2 group-hover:border-[#a3e635] transition-colors">
                      <ShieldCheck size={16} className="text-[#a3e635]" />
                    </div>
                    <span className="font-mono text-[9px] font-bold text-white uppercase">VERIFY</span>
                    <span className="font-mono text-[7.5px] text-white/40 mt-1 leading-tight hidden sm:block">
                      Check goal
                    </span>
                  </div>

                  {/* Step 5: LOOP */}
                  <div className="flex flex-col items-center text-center group">
                    <div className="w-10 h-10 border border-white/15 bg-white/[0.02] flex items-center justify-center mb-2 group-hover:border-[#a3e635] transition-colors">
                      <RotateCw size={16} className="text-[#a3e635]" />
                    </div>
                    <span className="font-mono text-[9px] font-bold text-white uppercase">LOOP</span>
                    <span className="font-mono text-[7.5px] text-white/40 mt-1 leading-tight hidden sm:block">
                      Repeat loop
                    </span>
                  </div>
                </div>
              </div>

              {/* 4 Quantitative KPI Metric Tiles */}
              <div className="grid grid-cols-4 gap-2 border border-white/10 bg-[#090909] p-4 text-center">
                <div>
                  <div className="font-bebas text-2xl sm:text-3xl text-[#a3e635]">1000+</div>
                  <div className="font-mono text-[8px] text-white/50 uppercase tracking-wider mt-0.5">
                    ACTIONS EXECUTED
                  </div>
                </div>
                <div className="border-l border-white/10">
                  <div className="font-bebas text-2xl sm:text-3xl text-[#a3e635]">82%</div>
                  <div className="font-mono text-[8px] text-white/50 uppercase tracking-wider mt-0.5">
                    TASK SUCCESS RATE
                  </div>
                </div>
                <div className="border-l border-white/10">
                  <div className="font-bebas text-2xl sm:text-3xl text-[#a3e635]">20+</div>
                  <div className="font-mono text-[8px] text-white/50 uppercase tracking-wider mt-0.5">
                    REAL WORLD TASKS
                  </div>
                </div>
                <div className="border-l border-white/10">
                  <div className="font-bebas text-2xl sm:text-3xl text-[#a3e635]">∞</div>
                  <div className="font-mono text-[8px] text-white/50 uppercase tracking-wider mt-0.5">
                    POSSIBILITIES
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Case Study Modal */}
      {selectedCaseStudy && (
        <CaseStudyModal
          isOpen={!!selectedCaseStudy}
          onClose={() => setSelectedCaseStudy(null)}
          project={selectedCaseStudy}
        />
      )}

      {/* View All Projects Modal */}
      {showAllModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-[#0d0d0c] border border-white/15 p-6 sm:p-10 text-[#eae8e1] shadow-2xl my-8 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="font-mono text-xs text-[#a3e635] tracking-widest uppercase">
                  CATALOG // ALL 9 PROJECTS
                </span>
                <h3 className="font-bebas text-3xl sm:text-4xl text-white mt-1">
                  COMPLETE SYSTEMS ARCHIVE
                </h3>
              </div>
              <button
                onClick={() => setShowAllModal(false)}
                className="w-8 h-8 flex items-center justify-center border border-white/20 hover:border-[#a3e635] hover:text-[#a3e635] text-white/60 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Catalog Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => {
                    setSelectedCaseStudy(proj);
                    setShowAllModal(false);
                  }}
                  className="border border-white/10 hover:border-[#a3e635] bg-[#121211] p-4 cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-bebas text-2xl text-white group-hover:text-[#a3e635]">
                      {proj.title}
                    </h4>
                    <ArrowUpRight size={14} className="text-white/40 group-hover:text-[#a3e635]" />
                  </div>
                  <p className="font-mono text-xs text-white/60 mt-1 line-clamp-2">
                    {proj.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {proj.tech.slice(0, 4).map((t, idx) => (
                      <span key={idx} className="font-mono text-[8.5px] px-2 py-0.5 bg-white/5 text-white/50 uppercase">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setShowAllModal(false)}
                className="border border-white/20 hover:border-[#a3e635] text-white hover:text-[#a3e635] px-5 py-2 font-mono text-xs uppercase cursor-pointer"
              >
                CLOSE CATALOG
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
