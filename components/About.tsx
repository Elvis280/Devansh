'use client';

import { motion } from 'framer-motion';
import { MapPin, Code2, Users, Award } from 'lucide-react';
import Image from 'next/image';
import { personalInfo, stats, experiences } from '@/lib/data';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function About() {
  return (
    <section id="about" className="py-28 bg-zinc-50 dark:bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Label */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-16"
        >
          <span className="text-xs font-mono tracking-[0.25em] text-cyan-500 uppercase">01 / About</span>
          <div className="flex-1 h-px bg-gradient-to-r from-zinc-200 dark:from-zinc-800 to-transparent" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
          {/* Left — Image + Status */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative w-full max-w-sm mx-auto">
              {/* Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/20 to-violet-500/20 rounded-3xl blur-2xl" />
              <div className="relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 aspect-square">
                <Image
                  src="/Dev.png"
                  alt="Devansh Sharma"
                  fill
                  sizes="(max-width: 768px) 100vw, 384px"
                  className="object-cover"
                  priority
                />
              </div>
              {/* Status badge */}
              <div className="absolute -bottom-4 left-4 right-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 flex items-center justify-between shadow-lg">
                <div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-0.5">Status</div>
                  <div className="text-sm font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Open to Work
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-0.5">Based in</div>
                  <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                    <MapPin size={12} className="text-cyan-500" /> India
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — Bio */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-6 leading-tight">
              Building the future with{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
                AI
              </span>
            </h2>
            <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
              {personalInfo.bio}
            </p>
            <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
              {personalInfo.objective}
            </p>

            <div className="flex flex-wrap gap-3">
              {['LLM Systems', 'RAG Pipelines', 'AI Agents', 'Full-Stack', 'Automation'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/50 text-zinc-700 dark:text-zinc-300 text-sm rounded-lg font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 text-center group transition-all duration-300 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/5"
            >
              <div className="text-4xl font-bold text-zinc-900 dark:text-white mb-1 bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Quick Experience Timeline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-8">Career Highlights</h3>
          <div className="space-y-4">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-violet-500/30 transition-colors"
              >
                <div className={`w-2 flex-shrink-0 rounded-full ${exp.current ? 'bg-cyan-400' : 'bg-zinc-300 dark:bg-zinc-600'}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                    <div>
                      <span className="font-semibold text-zinc-900 dark:text-white text-sm">{exp.role}</span>
                      <span className="text-zinc-500 dark:text-zinc-500 text-sm"> · {exp.organization}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {exp.current && (
                        <span className="text-xs px-2 py-0.5 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800 rounded-full font-medium">
                          Active
                        </span>
                      )}
                      <span className="text-xs text-zinc-400 font-mono">{exp.period}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {exp.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-md">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
