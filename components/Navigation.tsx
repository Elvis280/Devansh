'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun, Download } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

const navLinks = [
  { href: '#hero',        label: 'Home' },
  { href: '#about',       label: 'About' },
  { href: '#skills',      label: 'Skills' },
  { href: '#projects',    label: 'Projects' },
  { href: '#experience',  label: 'Experience' },
  { href: '#playground',  label: 'AI Lab' },
  { href: '#contact',     label: 'Contact' },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { threshold: 0.4 }
    );
    navLinks.forEach(l => {
      const el = document.getElementById(l.href.slice(1));
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-zinc-200/50 dark:border-zinc-800/50 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.button
          onClick={() => scrollTo('#hero')}
          className="flex items-center gap-2 group"
          whileHover={{ scale: 1.02 }}
        >
          <img
            src="/logo.png"
            alt="Devansh Sharma Logo"
            className="w-8 h-8 object-contain rounded-lg"
          />
          <span className="font-semibold text-zinc-900 dark:text-white tracking-tight">
            Devansh<span className="text-cyan-500">.</span>
          </span>
        </motion.button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                active === link.href.slice(1)
                  ? 'text-cyan-500 dark:text-cyan-400'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              {active === link.href.slice(1) && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 bg-cyan-50 dark:bg-cyan-950/40 rounded-lg"
                  transition={{ type: 'spring', bounce: 0.25, duration: 0.4 }}
                />
              )}
              <span className="relative">{link.label}</span>
            </button>
          ))}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          {mounted && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </motion.button>
          )}

          <motion.a
            href="mailto:devansh28sharma@gmail.com"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium rounded-lg hover:bg-zinc-700 dark:hover:bg-zinc-100 transition-colors"
          >
            Hire Me
          </motion.a>

          {/* Download CV — desktop */}
          <motion.a
            href="/Devansh_Sharma_CV.pdf"
            download="Devansh_Sharma_CV.pdf"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="hidden md:flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg text-white transition-all"
            style={{ background: 'linear-gradient(135deg, #00d2ef 0%, #8d54ff 100%)' }}
          >
            <Download size={13} />
            CV
          </motion.a>

          <button
            className="md:hidden w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 dark:bg-black/95 backdrop-blur-xl border-t border-zinc-200 dark:border-zinc-800"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-left px-4 py-3 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-lg transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <a
                href="mailto:devansh28sharma@gmail.com"
                className="mt-2 px-4 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium rounded-lg text-center"
              >
                Hire Me
              </a>
              {/* Download CV — mobile */}
              <a
                href="/Devansh_Sharma_CV.pdf"
                download="Devansh_Sharma_CV.pdf"
                className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-lg text-white"
                style={{ background: 'linear-gradient(135deg, #00d2ef 0%, #8d54ff 100%)' }}
              >
                <Download size={14} />
                Download CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
