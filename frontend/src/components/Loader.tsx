'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_LINES = [
  { text: '> Initializing neural runtime environment...', delay: 0 },
  { text: '> Loading agentic workflow orchestration...', delay: 280 },
  { text: '> Mounting FAISS & ChromaDB vector stores...', delay: 540 },
  { text: '> Connecting to multi-model LLM endpoints...', delay: 780 },
  { text: '> Calibrating high-precision telemetry...', delay: 1000 },
  { text: '> Compiling spatial scene interfaces...', delay: 1200 },
  { text: '> All systems nominal. Welcome to Portfolio V2.', delay: 1400, highlight: true },
];

const GLITCH_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=';

function useGlitchText(target: string, active: boolean) {
  const [text, setText] = useState(target);
  const frameRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!active) {
      setText(target);
      return;
    }
    let iteration = 0;
    const total = target.length * 3;

    const step = () => {
      setText(
        target
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            if (i < Math.floor(iteration / 3)) return char;
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          })
          .join('')
      );
      iteration++;
      if (iteration <= total) {
        frameRef.current = setTimeout(step, 35);
      } else {
        setText(target);
      }
    };

    frameRef.current = setTimeout(step, 0);
    return () => {
      if (frameRef.current) clearTimeout(frameRef.current);
    };
  }, [active, target]);

  return text;
}

export default function Loader({ onDone }: { onDone: () => void }) {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);
  const [exiting, setExiting] = useState(false);
  const glitchedName = useGlitchText('DEVANSH SHARMA', glitchActive);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    BOOT_LINES.forEach((line, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleLines((prev) => [...prev, i]);
          setProgress(Math.round(((i + 1) / BOOT_LINES.length) * 100));
        }, line.delay + 300)
      );
    });

    timers.push(setTimeout(() => setGlitchActive(true), 500));

    timers.push(
      setTimeout(() => {
        setExiting(true);
        setTimeout(onDone, 650);
      }, 2300)
    );

    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  const handleExit = () => {
    setExiting(true);
    setTimeout(onDone, 600);
  };

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-[#070706] flex flex-col justify-between overflow-hidden"
        >
          {/* Top rule */}
          <div className="rule w-full" />

          {/* Heading row */}
          <div className="px-5 sm:px-10 pt-6 flex items-start justify-between">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-4"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-[#a3e635] text-black font-mono font-bold text-sm sm:text-base">
                DS
              </div>
              <div>
                <div
                  className="font-display text-lg sm:text-2xl text-[#e8e6df] leading-none"
                  style={{ letterSpacing: '0.18em' }}
                >
                  {glitchedName}
                </div>
                <div className="t-mono-xs text-[#a3e635] mt-1 tracking-[0.3em] uppercase">
                  AI Engineer · Full-Stack Developer
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="hidden sm:block text-right"
            >
              <div className="t-mono-xs text-white/30">EST. 2023 — COMPUTING SYSTEMS</div>
              <div className="t-mono-xs text-[#a3e635] mt-1 font-bold">{progress}%</div>
            </motion.div>
          </div>

          {/* Center stage: progress numeral + terminal */}
          <div className="flex-1 flex flex-col items-center justify-center gap-10 px-5 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex items-end gap-4 sm:gap-6 select-none"
            >
              <span className="font-display text-[26vw] sm:text-[16vw] md:text-[13rem] leading-[0.8] text-[#e8e6df]">
                {progress}
              </span>
              <span className="font-display text-[6vw] sm:text-5xl leading-[0.8] text-[#a3e635] mb-1">
                %
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-full max-w-xl border border-white/10 bg-[#0c0c0a]"
            >
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
                <span className="t-mono-xs text-white/50">portfolio-v2 // boot-sequence</span>
                <span className="t-mono-xs text-[#a3e635]/80">CORE_INIT</span>
              </div>
              <div className="p-4 font-mono text-xs min-h-[150px] space-y-1.5">
                {BOOT_LINES.map((line, i) => (
                  <AnimatePresence key={i}>
                    {visibleLines.includes(i) && (
                      <motion.div
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className={
                          line.highlight ? 'text-[#a3e635] font-semibold' : 'text-white/60'
                        }
                      >
                        {line.text}
                        {i === visibleLines[visibleLines.length - 1] && !line.highlight && (
                          <span className="inline-block w-1.5 h-3.5 bg-[#a3e635] ml-1 align-middle animate-blink" />
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom progress meter */}
          <div className="px-5 sm:px-10 pb-8 w-full">
            <div className="flex items-center justify-between mb-2">
              <span className="t-mono-xs text-white/40">LOADING PORTFOLIO</span>
              <span className="t-mono-xs text-white/40">V.02 — RAW EDITORIAL</span>
            </div>
            <div className="h-[3px] w-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full bg-[#a3e635]"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}