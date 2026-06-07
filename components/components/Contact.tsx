'use client';

import { motion } from 'framer-motion';
import { Mail, ArrowUpRight } from 'lucide-react';
import { GitHubIcon, LinkedInIcon, TwitterXIcon } from '@/components/Icons';
import { personalInfo } from '@/lib/data';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const socials = [
  { label: 'GitHub',   href: personalInfo.github,   Icon: GitHubIcon,   handle: '@Elvis280',            color: 'hover:border-zinc-400 dark:hover:border-zinc-500' },
  { label: 'LinkedIn', href: personalInfo.linkedin,  Icon: LinkedInIcon, handle: 'devansh-sharma28',    color: 'hover:border-blue-400 dark:hover:border-blue-500' },
  { label: 'Twitter',  href: personalInfo.twitter,   Icon: TwitterXIcon, handle: '@Devansh280',         color: 'hover:border-sky-400 dark:hover:border-sky-500' },
  { label: 'Email',    href: `mailto:${personalInfo.email}`, Icon: Mail, handle: 'devansh28sharma@gmail.com', color: 'hover:border-red-400 dark:hover:border-red-500' },
];

export default function Contact() {
  return (
    <section id="contact" className="py-28 bg-white dark:bg-[#111111]">
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
          <span className="text-xs font-mono tracking-[0.25em] text-cyan-500 uppercase">06 / Contact</span>
          <div className="flex-1 h-px bg-gradient-to-r from-zinc-200 dark:from-zinc-800 to-transparent" />
        </motion.div>

        {/* Big CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative rounded-3xl overflow-hidden bg-zinc-900 dark:bg-white p-12 md:p-16 text-center mb-12"
        >
          {/* Gradient blobs inside card */}
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-cyan-500/20 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-violet-500/20 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold text-white dark:text-zinc-900 tracking-tight mb-4">
              Let&apos;s build something
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                remarkable.
              </span>
            </h2>
            <p className="text-zinc-400 dark:text-zinc-500 text-lg mb-10 max-w-lg mx-auto">
              Open to AI engineering roles, research collaborations, and startup opportunities. Let&apos;s connect.
            </p>
            <motion.a
              href={`mailto:${personalInfo.email}`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-10 py-4 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-semibold rounded-2xl shadow-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all duration-200 text-lg"
            >
              <Mail size={20} />
              {personalInfo.email}
              <ArrowUpRight size={18} className="text-zinc-400" />
            </motion.a>
          </div>
        </motion.div>

        {/* Social Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {socials.map((s, i) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}
              whileHover={{ y: -4, transition: { duration: 0.15 } }}
              className={`group p-5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl transition-all duration-200 ${s.color} hover:shadow-lg`}
            >
              <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-3 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors">
                <s.Icon size={16} className="text-zinc-600 dark:text-zinc-400" />
              </div>
              <div className="text-sm font-semibold text-zinc-900 dark:text-white mb-0.5">{s.label}</div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 truncate">{s.handle}</div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
