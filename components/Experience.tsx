'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { experiences, certificates } from '@/lib/data';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function Experience() {
  return (
    <section id="experience" className="py-28 bg-white dark:bg-[#111111]">
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
          <span className="text-xs font-mono tracking-[0.25em] text-cyan-500 uppercase">04 / Experience</span>
          <div className="flex-1 h-px bg-gradient-to-r from-zinc-200 dark:from-zinc-800 to-transparent" />
        </motion.div>

        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-16"
        >
          Experience &amp;{' '}
          <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
            Credentials
          </span>
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* LEFT — Timeline */}
          <div>
            <h3 className="text-sm font-mono tracking-widest text-zinc-400 uppercase mb-8">Work &amp; Leadership</h3>
            <div className="relative">
              {/* Line */}
              <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-cyan-400 via-violet-500 to-transparent opacity-30" />

              <div className="space-y-8">
                {experiences.map((exp, i) => (
                  <motion.div
                    key={exp.id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex gap-6 pl-10 relative"
                  >
                    {/* Dot */}
                    <div className={`absolute left-2 top-5 w-4 h-4 rounded-full border-2 ${
                      exp.current
                        ? 'border-cyan-400 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.5)]'
                        : 'border-zinc-400 dark:border-zinc-600 bg-white dark:bg-zinc-900'
                    }`} />

                    <div className="flex-1 pb-2">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <div>
                          <h4 className="font-semibold text-zinc-900 dark:text-white">{exp.role}</h4>
                          <p className="text-sm text-violet-500 dark:text-violet-400 font-medium">{exp.organization}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {exp.current && (
                            <span className="text-xs px-2 py-0.5 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800/60 rounded-full font-medium">
                              Active
                            </span>
                          )}
                          <span className="text-xs text-zinc-400 font-mono whitespace-nowrap">{exp.period}</span>
                        </div>
                      </div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-3">{exp.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.tags.map(t => (
                          <span key={t} className="text-xs px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 rounded-md">{t}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Certificates Grid */}
          <div>
            <h3 className="text-sm font-mono tracking-widest text-zinc-400 uppercase mb-8">Certifications</h3>
            <div className="grid grid-cols-2 gap-3">
              {certificates.map((cert, i) => (
                <motion.a
                  key={cert.id}
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                  whileHover={{ y: -3, transition: { duration: 0.15 } }}
                  className="group p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-violet-400/40 dark:hover:border-violet-500/30 transition-all duration-200 hover:shadow-lg cursor-pointer"
                >
                  {/* Color bar */}
                  <div className={`h-1 -mx-4 -mt-4 mb-4 rounded-t-xl bg-gradient-to-r ${cert.color}`} />

                  <div className="flex items-start justify-between gap-1 mb-2">
                    <h4 className="text-xs font-semibold text-zinc-900 dark:text-white leading-tight">{cert.name}</h4>
                    <ExternalLink size={10} className="text-zinc-400 group-hover:text-violet-500 flex-shrink-0 transition-colors mt-0.5" />
                  </div>

                  <p className="text-xs text-zinc-400 mb-3">{cert.issuer} · {cert.date}</p>

                  <div className="flex flex-wrap gap-1">
                    {cert.skills.slice(0, 2).map(s => (
                      <span key={s} className="text-[10px] px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 rounded-md">{s}</span>
                    ))}
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
