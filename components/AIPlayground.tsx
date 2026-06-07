'use client';

import React from 'react';

import { motion } from 'framer-motion';
import { Bot, Database, Workflow } from 'lucide-react';
import { aiPlayground } from '@/lib/data';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Bot, Database, Workflow,
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function AIPlayground() {
  return (
    <section id="playground" className="py-28 bg-zinc-50 dark:bg-[#0A0A0A]">
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
          <span className="text-xs font-mono tracking-[0.25em] text-cyan-500 uppercase">05 / AI Lab</span>
          <div className="flex-1 h-px bg-gradient-to-r from-zinc-200 dark:from-zinc-800 to-transparent" />
        </motion.div>

        <div className="mb-12">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-4"
          >
            AI Systems Lab
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-zinc-500 dark:text-zinc-400 text-lg max-w-xl"
          >
            Deep expertise in building autonomous AI systems, intelligent pipelines, and production workflows.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {aiPlayground.map((item, i) => {
            const Icon = iconMap[item.icon] ?? Bot;
            return (
              <motion.div
                key={item.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 hover:shadow-xl hover:shadow-zinc-900/5"
              >
                {/* Background glow on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500`} />

                {/* Icon */}
                <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-5 shadow-lg`}>
                  <Icon size={22} className="text-white" />
                </div>

                {/* Status badge */}
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-zinc-900 dark:text-white leading-tight">{item.title}</h3>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold font-mono ${
                    item.status === 'Production'
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                      : 'bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800'
                  }`}>
                    {item.status}
                  </span>
                </div>

                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5">{item.description}</p>

                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-lg font-medium">{tag}</span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Decorative stats bar */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'LLM Integrations', value: '5+', color: 'text-violet-500' },
              { label: 'RAG Systems Built', value: '3+', color: 'text-cyan-500' },
              { label: 'Automation Flows', value: '10+', color: 'text-emerald-500' },
              { label: 'AI APIs Used', value: '8+', color: 'text-orange-500' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className={`text-3xl font-bold ${s.color} mb-1`}>{s.value}</div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
