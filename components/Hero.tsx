'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Download } from 'lucide-react';
import { GitHubIcon, LinkedInIcon, TwitterXIcon } from '@/components/Icons';
import { useEffect, useState } from 'react';
import { personalInfo } from '@/lib/data';

const ROLES = personalInfo.roles;

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = ROLES[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < full.length) {
      timeout = setTimeout(() => setDisplayed(full.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === full.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  const scrollToAbout = () =>
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-[#0A0A0A]"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-violet-500/10 dark:bg-violet-600/15 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-cyan-400/10 dark:bg-cyan-500/15 rounded-full blur-[120px] animate-pulse [animation-delay:1s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-violet-500/5 via-transparent to-cyan-500/5 dark:from-violet-600/10 dark:to-cyan-600/10 rounded-full blur-[100px]" />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.5) 1px,transparent 1px)`,
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-600 dark:text-zinc-400 text-sm mb-8"
        >
          <Sparkles size={14} className="text-cyan-500" />
          <span>Available for opportunities</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-zinc-900 dark:text-white tracking-tight leading-[1.05] mb-4"
        >
          {personalInfo.name.split(' ').map((word, i) => (
            <span key={i} className="block">
              {i === 1 ? (
                <span className="bg-gradient-to-r from-cyan-400 via-violet-500 to-cyan-400 bg-clip-text text-transparent bg-[length:200%] animate-shimmer">
                  {word}
                </span>
              ) : word}
            </span>
          ))}
        </motion.h1>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 font-medium mb-6 h-8"
        >
          <span>{displayed}</span>
          <span className="inline-block w-0.5 h-6 bg-cyan-500 ml-1 align-middle animate-blink" />
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="max-w-2xl mx-auto text-base md:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed mb-10"
        >
          {personalInfo.bio}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <motion.button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold rounded-xl hover:bg-zinc-700 dark:hover:bg-zinc-100 transition-all duration-200 shadow-lg shadow-zinc-900/10"
          >
            View Projects
          </motion.button>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold rounded-xl hover:border-zinc-400 dark:hover:border-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all duration-200"
          >
            Get In Touch
          </motion.a>
          {/* Download CV */}
          <motion.a
            href={personalInfo.cv}
            download="Devansh_Sharma_CV.pdf"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white overflow-hidden transition-all duration-200 shadow-lg shadow-cyan-500/20"
            style={{ background: 'linear-gradient(135deg, #00d2ef 0%, #8d54ff 100%)' }}
          >
            {/* shimmer sweep */}
            <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <Download size={16} className="relative flex-shrink-0" />
            <span className="relative">Download CV</span>
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex items-center justify-center gap-4 mb-16"
        >
          {[
            { href: personalInfo.github,   Icon: GitHubIcon,   label: 'GitHub' },
            { href: personalInfo.linkedin, Icon: LinkedInIcon, label: 'LinkedIn' },
            { href: personalInfo.twitter,  Icon: TwitterXIcon, label: 'Twitter / X' },
          ].map(({ href, Icon, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/50 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-500 transition-all"
              aria-label={label}
            >
              <Icon size={16} />
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          onClick={scrollToAbout}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col items-center gap-2 text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors mx-auto"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <ArrowDown size={16} />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}
