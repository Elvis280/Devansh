'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bot,
  Eye,
  Network,
  Cpu,
  Wrench,
  Sparkles,
  ArrowUpRight,
  ChevronRight,
  Terminal,
  Layers,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { experiments, ExperimentItem } from '@/lib/data';

export default function Experiments() {
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeExperimentModal, setActiveExperimentModal] = useState<ExperimentItem | null>(null);

  const categories = [
    { id: 'Agentic AI', label: 'AGENTS', count: '02', icon: Bot },
    { id: 'Computer Vision', label: 'VISION', count: '01', icon: Eye },
    { id: 'RAG & Search', label: 'RAG / NLP', count: '01', icon: Network },
    { id: 'Systems & LLMs', label: 'HARDWARE / LLM', count: '01', icon: Cpu },
    { id: 'Edge & Hardware', label: 'TOOLS / SYSTEMS', count: '01', icon: Wrench },
  ];

  const filteredExperiments = experiments.filter((exp) => {
    const matchesStatus =
      selectedStatus === 'ALL' || exp.status.toUpperCase() === selectedStatus.toUpperCase();
    const matchesCategory =
      selectedCategory === 'ALL' || exp.category === selectedCategory;
    return matchesStatus && matchesCategory;
  });

  return (
    <section
      id="experiments"
      className="relative min-h-screen py-24 sm:py-32 px-6 sm:px-10 lg:px-14 bg-[#070707] border-t border-white/[0.06] overflow-hidden select-none"
    >
      <div className="relative z-10 max-w-[1400px] mx-auto space-y-12">
        {/* ── Top Row: 04 EXPERIMENTS // LABORATORY + Status Filter Bar ─────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8"
        >
          {/* Header Title */}
          <div>
            <div className="w-4 h-4 border-t border-l border-white/25 mb-3" />
            <div className="font-bebas text-6xl sm:text-7xl text-[#edece6] leading-none mb-1">
              04
            </div>
            <h2 className="font-bebas text-4xl sm:text-6xl text-[#edece6] uppercase tracking-wide flex items-center gap-3">
              EXPERIMENTS
              <span className="text-[#a3e635] font-light">// LABORATORY</span>
            </h2>
            <p className="font-handwritten text-xl sm:text-2xl text-white/80 mt-2 font-normal">
              Ideas are easy. Experiments <span className="text-[#a3e635] underline decoration-[#a3e635]">show</span> how I think.
            </p>
          </div>

          {/* Status Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 border border-white/10 bg-[#0c0c0b] p-1.5 self-start lg:self-auto">
            {['ALL', 'CONCLUDED', 'ACTIVE RESEARCH', 'PIVOTED'].map((status) => {
              const isActive = selectedStatus === status;
              return (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`font-mono text-[10.5px] tracking-wider px-3.5 py-1.5 uppercase transition-all flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-[#a3e635] text-black font-bold shadow-[0_0_8px_rgba(163,230,53,0.4)]'
                      : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <span>{status === 'ALL' ? 'ALL EXPERIMENTS' : status}</span>
                  {status !== 'ALL' && (
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        status === 'CONCLUDED'
                          ? 'bg-[#a3e635]'
                          : status === 'ACTIVE RESEARCH'
                          ? 'bg-amber-400'
                          : 'bg-rose-400'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Main Content Grid: Categories Sidebar | Experiment Cards ────── */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Category Filter Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3 space-y-4"
          >
            <p className="font-mono text-xs text-white/50 leading-relaxed">
              A collection of experiments, random ideas and deep dives that didn&apos;t always work but taught me something real.
            </p>

            <div className="space-y-1.5 pt-2">
              <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest block mb-2">
                CATEGORIES
              </span>
              <button
                onClick={() => setSelectedCategory('ALL')}
                className={`w-full font-mono text-xs p-3 border text-left flex items-center justify-between transition-all cursor-pointer ${
                  selectedCategory === 'ALL'
                    ? 'border-[#a3e635] bg-[#0d0d0c] text-white font-bold'
                    : 'border-white/10 text-white/60 hover:border-white/20'
                }`}
              >
                <span>ALL CATEGORIES</span>
                <span className="text-[#a3e635]">{experiments.length}</span>
              </button>

              {categories.map((cat) => {
                const isCatActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(isCatActive ? 'ALL' : cat.id)}
                    className={`w-full font-mono text-xs p-3 border text-left flex items-center justify-between transition-all cursor-pointer group ${
                      isCatActive
                        ? 'border-[#a3e635] bg-[#0d0d0c] text-white font-bold'
                        : 'border-white/10 text-white/60 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <cat.icon size={14} className={isCatActive ? 'text-[#a3e635]' : 'text-white/40 group-hover:text-white'} />
                      <span>{cat.label}</span>
                    </div>
                    <span className={isCatActive ? 'text-[#a3e635]' : 'text-white/30'}>
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Cards Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-9 grid sm:grid-cols-2 xl:grid-cols-3 gap-5"
          >
            {filteredExperiments.map((exp) => (
              <div
                key={exp.id}
                onClick={() => setActiveExperimentModal(exp)}
                className="border border-white/12 bg-[#090909] hover:bg-[#0d0d0c] hover:border-[#a3e635]/60 p-5 flex flex-col justify-between space-y-4 transition-all duration-300 cursor-pointer group shadow-lg"
              >
                {/* Top Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs">
                  <span className="font-bold text-white/80 group-hover:text-[#a3e635]">
                    {exp.number} //
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border ${
                      exp.status === 'CONCLUDED'
                        ? 'border-[#a3e635]/40 text-[#a3e635] bg-[#a3e635]/5'
                        : exp.status === 'ACTIVE RESEARCH'
                        ? 'border-amber-400/40 text-amber-400 bg-amber-400/5'
                        : 'border-rose-400/40 text-rose-400 bg-rose-400/5'
                    }`}
                  >
                    {exp.status}
                  </span>
                </div>

                {/* Question Title */}
                <h3 className="font-bebas text-2xl sm:text-3xl text-white group-hover:text-[#a3e635] tracking-wide leading-tight transition-colors">
                  {exp.question}
                </h3>

                {/* Technical Content Snippets */}
                <div className="space-y-3 font-mono text-[11px] text-white/70">
                  <div>
                    <span className="text-white/40 block text-[9.5px] uppercase tracking-wider mb-0.5">
                      HYPOTHESIS & STACK
                    </span>
                    <p className="line-clamp-2">{exp.hypothesis}</p>
                  </div>

                  <div>
                    <span className="text-white/40 block text-[9.5px] uppercase tracking-wider mb-0.5">
                      RESULT & ARTIFACTS
                    </span>
                    <p className="line-clamp-2 text-white/90">{exp.result}</p>
                  </div>
                </div>

                {/* Bottom Trigger Arrow */}
                <div className="pt-3 border-t border-white/5 flex justify-end">
                  <ArrowUpRight
                    size={14}
                    className="text-white/40 group-hover:text-[#a3e635] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Bottom Quote & Signature Banner ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <span className="text-[#a3e635] text-2xl font-bold font-mono">“</span>
            <p className="font-mono text-xs sm:text-sm text-white/80 tracking-wide uppercase">
              NOT EVERY EXPERIMENT SHIPS.{' '}
              <span className="text-[#a3e635] font-bold">
                BUT EVERY EXPERIMENT SHAPES HOW I BUILD.
              </span>
            </p>
          </div>

          <div className="font-handwritten text-2xl sm:text-3xl text-[#a3e635] select-none">
            Devansh ✕
          </div>
        </motion.div>
      </div>

      {/* Deep Dive Modal */}
      {activeExperimentModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#0d0d0c] border border-white/15 p-6 sm:p-8 text-[#eae8e1] shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto my-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="font-mono text-xs text-[#a3e635] tracking-widest uppercase">
                  POST-MORTEM // {activeExperimentModal.number}
                </span>
                <h3 className="font-bebas text-3xl text-white mt-1">
                  {activeExperimentModal.question}
                </h3>
              </div>
              <button
                onClick={() => setActiveExperimentModal(null)}
                className="w-8 h-8 flex items-center justify-center border border-white/20 hover:border-[#a3e635] text-white/60 hover:text-[#a3e635] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 font-mono text-xs text-white/80 leading-relaxed">
              <div>
                <h4 className="text-white font-bold uppercase tracking-wider mb-1">HYPOTHESIS</h4>
                <p>{activeExperimentModal.hypothesis}</p>
              </div>

              <div>
                <h4 className="text-white font-bold uppercase tracking-wider mb-1">RESULT & ARTIFACTS</h4>
                <p>{activeExperimentModal.result}</p>
              </div>

              <div>
                <h4 className="text-[#a3e635] font-bold uppercase tracking-wider mb-1">WHAT WENT WRONG</h4>
                <p>{activeExperimentModal.whatWentWrong}</p>
              </div>

              <div>
                <h4 className="text-[#a3e635] font-bold uppercase tracking-wider mb-1">LESSONS LEARNED</h4>
                <p>{activeExperimentModal.whatLearned}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setActiveExperimentModal(null)}
                className="border border-white/20 hover:border-[#a3e635] text-white hover:text-[#a3e635] px-5 py-2 font-mono text-xs uppercase cursor-pointer"
              >
                CLOSE POST-MORTEM
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
