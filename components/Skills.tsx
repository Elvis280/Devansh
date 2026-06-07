'use client';

import React from 'react';

import { motion } from 'framer-motion';
import { Brain, Zap, Server, Monitor, GitBranch, Cloud } from 'lucide-react';
import { skillCategories } from '@/lib/data';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Brain, Zap, Server, Monitor, GitBranch, Cloud,
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function Skills() {
  return (
    <section id="skills" className="py-28 bg-white dark:bg-[#111111]">
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
          <span className="text-xs font-mono tracking-[0.25em] text-cyan-500 uppercase">02 / Skills</span>
          <div className="flex-1 h-px bg-gradient-to-r from-zinc-200 dark:from-zinc-800 to-transparent" />
        </motion.div>

        <div className="mb-16">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-4"
          >
            My Tech Stack
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-zinc-500 dark:text-zinc-400 text-lg max-w-xl"
          >
            Tools and technologies I use to build production-grade AI systems and applications.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((cat, i) => {
            const Icon = iconMap[cat.icon] ?? Brain;
            return (
              <motion.div
                key={cat.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group p-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 cursor-default"
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-lg`}>
                    <Icon size={18} className="text-white" />
                  </div>
                  <span className="font-semibold text-zinc-900 dark:text-white">{cat.label}</span>
                </div>

                {/* Pills */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-sm rounded-lg font-medium hover:border-cyan-400/50 dark:hover:border-cyan-500/40 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
