'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, ExternalLink, AlertTriangle, Sparkles, ArrowRight,
  Eye, Brain, Wrench, Terminal, ShieldCheck, Camera, Search,
  Grid3X3, Volume2, FileText, Scissors, Database, MessageSquare,
  User, Zap, BarChart3, TrendingUp, Monitor, Activity, Calculator,
  PieChart, Target, Scan, Route, BookOpen, Leaf, Cloud, Server,
  FileCode, Globe, Filter, Box,
} from 'lucide-react';
import { GitHubIcon } from '@/components/Icons';
import { ProjectDetail } from '@/lib/data';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Eye, Brain, Wrench, Terminal, ShieldCheck, Camera, Search, Grid3X3,
  Volume2, FileText, Scissors, Database, MessageSquare, User, Zap,
  BarChart: BarChart3, TrendingUp, Monitor, Activity, Calculator,
  PieChart, Target, Scan, Route, BookOpen, Leaf, Cloud, Server,
  FileCode, Globe, Filter, Grid: Grid3X3,
};

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectDetail | null;
}

export default function CaseStudyModal({ isOpen, onClose, project }: CaseStudyModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  const getIcon = (iconName: string) => ICON_MAP[iconName] || Box;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-2 sm:p-4 md:p-6 select-none"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[94vw] max-h-[92vh] bg-[#070707] overflow-hidden shadow-2xl flex flex-col border border-white/[0.06]"
          >
            {/* ── HEADER ──────────────────────────────────────────────── */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/[0.06] bg-[#0a0a0a] flex-shrink-0">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635] shadow-[0_0_8px_#a3e635] animate-pulse" />
                <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[#a3e635] uppercase">
                  CASE STUDY // {project.number} // {project.title}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#a3e635] text-black font-mono text-[10px] font-bold uppercase tracking-wider hover:bg-[#bbf246] transition-colors">
                    <span className="hidden sm:inline">LIVE DEMO</span>
                    <ExternalLink size={11} />
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-white/15 text-white/70 font-mono text-[10px] uppercase tracking-wider hover:border-[#a3e635] hover:text-[#a3e635] transition-colors">
                    <GitHubIcon size={11} />
                    <span className="hidden sm:inline">CODE</span>
                  </a>
                )}
                <button onClick={onClose}
                  className="w-7 h-7 flex items-center justify-center border border-white/10 hover:border-[#a3e635] text-white/50 hover:text-[#a3e635] transition-colors cursor-pointer ml-1"
                  aria-label="Close">
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* ── SCROLLABLE CONTENT ──────────────────────────────────── */}
            <div className="overflow-y-auto flex-1 scrollbar-none">

              {/* ── HERO ──────────────────────────────────────────────── */}
              <section className="px-5 sm:px-8 md:px-12 pt-10 sm:pt-14 pb-10 border-b border-white/[0.06]">
                <div className="max-w-3xl">
                  <div className="font-mono text-[10px] text-[#a3e635] uppercase tracking-[0.3em] mb-4">
                    {project.category}
                  </div>
                  <h1 className="font-bebas text-5xl sm:text-7xl md:text-8xl text-[#edece6] leading-[0.88] tracking-[0.01em] mb-4">
                    {project.title}
                  </h1>
                  <h2 className="font-bebas text-2xl sm:text-3xl md:text-4xl text-white/70 leading-[0.95] mb-6">
                    {project.subtitle}
                  </h2>
                  <p className="font-mono text-xs sm:text-sm text-white/50 leading-[1.8] max-w-2xl mb-8">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635]" />
                      <span className="font-mono text-[10px] text-[#a3e635] uppercase tracking-widest font-bold">
                        {project.status}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
                      {project.duration}
                    </span>
                  </div>
                </div>
              </section>

              {/* ── OVERVIEW ──────────────────────────────────────────── */}
              <section className="px-5 sm:px-8 md:px-12 py-10 sm:py-14 border-b border-white/[0.06]">
                <div className="flex items-center gap-3 mb-8">
                  <span className="font-bebas text-3xl sm:text-4xl text-[#a3e635]/40">01</span>
                  <span className="font-mono text-[10px] text-white/40 uppercase tracking-[0.25em]">OVERVIEW</span>
                  <div className="flex-1 h-px bg-white/[0.06] ml-2" />
                </div>

                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <AlertTriangle size={14} className="text-rose-400/70" />
                      <span className="font-mono text-[10px] text-rose-400/70 uppercase tracking-[0.2em] font-bold">
                        THE PROBLEM
                      </span>
                    </div>
                    <p className="font-mono text-xs sm:text-sm text-white/60 leading-[1.9]">
                      {project.caseStudy.problem}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles size={14} className="text-[#a3e635]/70" />
                      <span className="font-mono text-[10px] text-[#a3e635]/70 uppercase tracking-[0.2em] font-bold">
                        THE APPROACH
                      </span>
                    </div>
                    <p className="font-mono text-xs sm:text-sm text-white/60 leading-[1.9]">
                      {project.caseStudy.approach}
                    </p>
                  </div>
                </div>
              </section>

              {/* ── SYSTEM ARCHITECTURE ───────────────────────────────── */}
              <section className="px-5 sm:px-8 md:px-12 py-10 sm:py-14 border-b border-white/[0.06]">
                <div className="flex items-center gap-3 mb-8">
                  <span className="font-bebas text-3xl sm:text-4xl text-[#a3e635]/40">02</span>
                  <span className="font-mono text-[10px] text-white/40 uppercase tracking-[0.25em]">SYSTEM ARCHITECTURE</span>
                  <div className="flex-1 h-px bg-white/[0.06] ml-2" />
                </div>

                <div className="hidden md:flex items-start justify-between gap-3 relative">
                  <div className="absolute top-7 left-[8%] right-[8%] h-px bg-gradient-to-r from-[#a3e635]/20 via-[#a3e635]/40 to-[#a3e635]/20 z-0" />
                  {project.architectureNodes.map((node, idx) => {
                    const IconComp = getIcon(node.icon);
                    return (
                      <div key={idx} className="flex flex-col items-center text-center flex-1 relative z-10">
                        <div className="w-14 h-14 border border-white/10 bg-[#0a0a0a] flex items-center justify-center mb-3 hover:border-[#a3e635]/50 transition-colors">
                          <IconComp size={20} className="text-white/60" />
                        </div>
                        <span className="font-mono text-[9px] font-bold text-white uppercase tracking-wider mb-1">{node.title}</span>
                        <span className="font-mono text-[8px] text-white/35 leading-[1.5] max-w-[100px]">{node.desc}</span>
                        {idx < project.architectureNodes.length - 1 && (
                          <ArrowRight size={12} className="text-[#a3e635]/30 absolute -right-2 top-6 hidden lg:block" />
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="md:hidden space-y-4">
                  {project.architectureNodes.map((node, idx) => {
                    const IconComp = getIcon(node.icon);
                    return (
                      <div key={idx} className="flex items-center gap-4 p-3 border border-white/[0.06] bg-[#0a0a0a]">
                        <div className="w-10 h-10 border border-white/10 flex items-center justify-center flex-shrink-0">
                          <IconComp size={16} className="text-white/60" />
                        </div>
                        <div>
                          <span className="font-mono text-[10px] font-bold text-white uppercase tracking-wider block">{node.title}</span>
                          <span className="font-mono text-[9px] text-white/35">{node.desc}</span>
                        </div>
                        {idx < project.architectureNodes.length - 1 && (
                          <ArrowRight size={10} className="text-[#a3e635]/30 ml-auto" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* ── WORKFLOW ──────────────────────────────────────────── */}
              <section className="px-5 sm:px-8 md:px-12 py-10 sm:py-14 border-b border-white/[0.06]">
                <div className="flex items-center gap-3 mb-8">
                  <span className="font-bebas text-3xl sm:text-4xl text-[#a3e635]/40">03</span>
                  <span className="font-mono text-[10px] text-white/40 uppercase tracking-[0.25em]">WORKFLOW</span>
                  <div className="flex-1 h-px bg-white/[0.06] ml-2" />
                </div>

                <div className="hidden md:grid gap-4" style={{ gridTemplateColumns: `repeat(${project.workflow.length}, 1fr)` }}>
                  {project.workflow.map((step, idx) => (
                    <div key={idx} className="relative">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-[10px] text-[#a3e635]/50 font-bold">0{idx + 1}</span>
                        {idx < project.workflow.length - 1 && <div className="flex-1 h-px bg-white/[0.06]" />}
                      </div>
                      <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider mb-1">{step.label}</h4>
                      <p className="font-mono text-[10px] text-white/35 leading-[1.6]">{step.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="md:hidden space-y-4">
                  {project.workflow.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="font-mono text-[10px] text-[#a3e635]/50 font-bold mt-0.5">0{idx + 1}</span>
                      <div>
                        <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider mb-0.5">{step.label}</h4>
                        <p className="font-mono text-[10px] text-white/35 leading-[1.6]">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── CHALLENGES ────────────────────────────────────────── */}
              <section className="px-5 sm:px-8 md:px-12 py-10 sm:py-14 border-b border-white/[0.06]">
                <div className="flex items-center gap-3 mb-8">
                  <span className="font-bebas text-3xl sm:text-4xl text-[#a3e635]/40">04</span>
                  <span className="font-mono text-[10px] text-white/40 uppercase tracking-[0.25em]">CHALLENGES</span>
                  <div className="flex-1 h-px bg-white/[0.06] ml-2" />
                </div>
                <div className="max-w-3xl border-l-2 border-amber-500/30 pl-6 py-1">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle size={13} className="text-amber-400/60" />
                    <span className="font-mono text-[10px] text-amber-400/60 uppercase tracking-[0.2em] font-bold">ENGINEERING BOTTLENECKS</span>
                  </div>
                  <p className="font-mono text-xs sm:text-sm text-white/55 leading-[1.9]">{project.caseStudy.challenges}</p>
                </div>
              </section>

              {/* ── RESULT & IMPACT ───────────────────────────────────── */}
              <section className="px-5 sm:px-8 md:px-12 py-10 sm:py-14 border-b border-white/[0.06]">
                <div className="flex items-center gap-3 mb-8">
                  <span className="font-bebas text-3xl sm:text-4xl text-[#a3e635]/40">05</span>
                  <span className="font-mono text-[10px] text-white/40 uppercase tracking-[0.25em]">RESULT &amp; IMPACT</span>
                  <div className="flex-1 h-px bg-white/[0.06] ml-2" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.04] border border-white/[0.06]">
                  {project.results.map((metric, idx) => (
                    <div key={idx} className="bg-[#070707] p-5 sm:p-6 text-center">
                      <div className="font-bebas text-3xl sm:text-4xl text-[#a3e635] leading-none mb-2">{metric.value}</div>
                      <div className="font-mono text-[8px] sm:text-[9px] text-white/35 uppercase tracking-[0.2em] leading-[1.6]">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── TECHNOLOGY ────────────────────────────────────────── */}
              <section className="px-5 sm:px-8 md:px-12 py-10 sm:py-14 border-b border-white/[0.06]">
                <div className="flex items-center gap-3 mb-8">
                  <span className="font-bebas text-3xl sm:text-4xl text-[#a3e635]/40">06</span>
                  <span className="font-mono text-[10px] text-white/40 uppercase tracking-[0.25em]">TECHNOLOGY</span>
                  <div className="flex-1 h-px bg-white/[0.06] ml-2" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t}
                      className="font-mono text-[10px] px-3 py-1.5 border border-white/[0.08] text-white/50 uppercase tracking-[0.15em] hover:border-[#a3e635]/30 hover:text-[#a3e635]/70 transition-colors">
                      {t}
                    </span>
                  ))}
                </div>
              </section>

              {/* ── LINKS ─────────────────────────────────────────────── */}
              {project.links.length > 0 && (
                <section className="px-5 sm:px-8 md:px-12 py-10 sm:py-14">
                  <div className="flex items-center gap-3 mb-8">
                    <span className="font-bebas text-3xl sm:text-4xl text-[#a3e635]/40">07</span>
                    <span className="font-mono text-[10px] text-white/40 uppercase tracking-[0.25em]">LINKS</span>
                    <div className="flex-1 h-px bg-white/[0.06] ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {project.links.map((link, idx) => (
                      <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 border border-white/10 hover:border-[#a3e635] text-white/60 hover:text-[#a3e635] font-mono text-[10px] uppercase tracking-[0.2em] transition-colors">
                        <span>{link.label}</span>
                        <ExternalLink size={11} />
                      </a>
                    ))}
                  </div>
                </section>
              )}

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
