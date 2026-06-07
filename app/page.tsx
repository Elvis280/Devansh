'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import AIPlayground from '@/components/AIPlayground';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

// Load client-only components (touch window/document)
const Loader       = dynamic(() => import('@/components/Loader'),       { ssr: false });
const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false });

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const handleDone = useCallback(() => setLoaded(true), []);

  return (
    <>
      {/* Full-screen boot loader */}
      {!loaded && <Loader onDone={handleDone} />}

      {/* Custom cursor — dot + ring */}
      <CustomCursor />

      {/* Main site — fades in after loader exits */}
      <main
        className="min-h-screen bg-white dark:bg-[#0A0A0A] text-zinc-900 dark:text-white selection:bg-cyan-500/20 selection:text-cyan-900 dark:selection:text-cyan-100"
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.5s ease 0.1s',
        }}
      >
        <Navigation />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <AIPlayground />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
