'use client';

import { motion } from 'framer-motion';
import { GitHubIcon } from '@/components/Icons';
import { personalInfo } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111111]">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">DS</span>
          </div>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            © {new Date().getFullYear()} Devansh Sharma
          </span>
        </div>

        <p className="text-xs text-zinc-400 dark:text-zinc-500">
          Built with Next.js · Tailwind · Framer Motion
        </p>

        <motion.a
          href={personalInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          <GitHubIcon size={14} />
          Elvis280
        </motion.a>
      </div>
    </footer>
  );
}
