'use client';

import { motion } from 'framer-motion';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { GitHubIcon } from '@/components/Icons';
import Image from 'next/image';
import { projects } from '@/lib/data';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function Projects() {
  const featured = projects.filter(p => p.featured);
  const rest = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="py-28 bg-zinc-50 dark:bg-[#0A0A0A]">
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
          <span className="text-xs font-mono tracking-[0.25em] text-cyan-500 uppercase">03 / Projects</span>
          <div className="flex-1 h-px bg-gradient-to-r from-zinc-200 dark:from-zinc-800 to-transparent" />
        </motion.div>

        <div className="flex items-end justify-between mb-12">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight"
          >
            Selected Work
          </motion.h2>
          <motion.a
            href="https://github.com/Elvis280"
            target="_blank"
            rel="noopener noreferrer"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors group"
          >
            All projects
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.a>
        </div>

        {/* Featured — large cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {featured.map((project, i) => (
            <motion.div
              key={project.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 hover:shadow-xl hover:shadow-zinc-900/5 dark:hover:shadow-zinc-900/40"
            >
              {/* Image / Gradient Preview */}
              <div className={`relative h-52 overflow-hidden ${project.image ? '' : `bg-gradient-to-br ${project.gradient}`}`}>
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-end p-6">
                    <span className="text-6xl font-bold text-white/20 font-mono">{project.title}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 bg-white/90 dark:bg-zinc-900/90 text-zinc-700 dark:text-zinc-300 text-xs font-semibold rounded-lg backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-1 font-mono tracking-wide">
                  {project.title}
                </h3>
                <p className="text-sm text-cyan-600 dark:text-cyan-400 font-medium mb-3">{project.subtitle}</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-5">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tech.map(t => (
                    <span key={t} className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs rounded-lg font-medium">{t}</span>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
                      <GitHubIcon size={14} /> Code
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-medium transition-colors">
                      <ExternalLink size={14} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Compact row */}
        <div className="grid md:grid-cols-3 gap-5">
          {rest.map((project, i) => (
            <motion.div
              key={project.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
              className="group p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 hover:shadow-lg"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${project.gradient} mb-4 flex items-center justify-center`}>
                <span className="text-white text-xs font-bold">{project.title[0]}</span>
              </div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-white font-mono text-sm tracking-wide">{project.title}</h3>
                  <p className="text-xs text-cyan-600 dark:text-cyan-400 font-medium">{project.subtitle}</p>
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                      className="w-7 h-7 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
                      <GitHubIcon size={12} />
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer"
                      className="w-7 h-7 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 hover:text-cyan-500 transition-colors">
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-1">
                {project.tech.slice(0, 3).map(t => (
                  <span key={t} className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-500 text-xs rounded-md">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
