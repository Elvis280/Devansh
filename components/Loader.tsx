'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_LINES = [
  { text: '> Initializing runtime environment...', delay: 0 },
  { text: '> Loading neural inference engine...', delay: 320 },
  { text: '> Mounting RAG pipeline modules...', delay: 620 },
  { text: '> Connecting to LLM endpoints...', delay: 900 },
  { text: '> Calibrating agentic systems...', delay: 1150 },
  { text: '> Compiling full-stack interfaces...', delay: 1380 },
  { text: '> All systems nominal. Welcome.', delay: 1580, highlight: true },
];

const GLITCH_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*';

function useGlitchText(target: string, active: boolean) {
  const [text, setText] = useState(target);
  const frameRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!active) { setText(target); return; }
    let iteration = 0;
    const total = target.length * 3;

    const step = () => {
      setText(
        target.split('').map((char, i) => {
          if (char === ' ') return ' ';
          if (i < Math.floor(iteration / 3)) return char;
          return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        }).join('')
      );
      iteration++;
      if (iteration <= total) {
        frameRef.current = setTimeout(step, 40);
      } else {
        setText(target);
      }
    };
    frameRef.current = setTimeout(step, 0);
    return () => { if (frameRef.current) clearTimeout(frameRef.current); };
  }, [active, target]);

  return text;
}

// Tiny matrix rain canvas
function MatrixRain({ visible }: { visible: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const cols = Math.floor(canvas.width / 20);
    const drops: number[] = Array(cols).fill(1);
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEF';

    const draw = () => {
      ctx.fillStyle = 'rgba(10,10,10,0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = '14px monospace';

      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 20;
        // Leading char bright cyan
        ctx.fillStyle = '#00d2ef';
        ctx.fillText(char, x, y * 20);
        // Trail chars darker
        if (y > 1) {
          ctx.fillStyle = 'rgba(0, 180, 180, 0.3)';
          ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, (y - 1) * 20);
        }
        if (y * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });

      animRef.current = requestAnimationFrame(draw);
    };

    if (visible) {
      draw();
    }

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [visible]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-[0.18]"
      style={{ pointerEvents: 'none' }}
    />
  );
}

export default function Loader({ onDone }: { onDone: () => void }) {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);
  const [exiting, setExiting] = useState(false);
  const glitchedName = useGlitchText('DEVANSH SHARMA', glitchActive);

  // Schedule lines appearing
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    BOOT_LINES.forEach((line, i) => {
      timers.push(setTimeout(() => {
        setVisibleLines(prev => [...prev, i]);
        // bump progress proportionally
        setProgress(Math.round(((i + 1) / BOOT_LINES.length) * 100));
      }, line.delay + 400));
    });

    // Glitch the name after lines appear
    timers.push(setTimeout(() => setGlitchActive(true), 600));

    // Trigger exit
    timers.push(setTimeout(() => {
      setExiting(true);
      setTimeout(onDone, 700);
    }, 2600));

    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.65, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] bg-[#0A0A0A] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Matrix rain background */}
          <MatrixRain visible={!exiting} />

          {/* Scanline overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,210,239,0.025) 0px, rgba(0,210,239,0.025) 1px, transparent 1px, transparent 3px)',
            }}
          />

          {/* Vignette */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.85) 100%)' }}
          />

          {/* Corner brackets */}
          {[
            'top-5 left-5 border-t-2 border-l-2',
            'top-5 right-5 border-t-2 border-r-2',
            'bottom-5 left-5 border-b-2 border-l-2',
            'bottom-5 right-5 border-b-2 border-r-2',
          ].map((cls, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
              className={`absolute w-8 h-8 border-cyan-500/60 ${cls}`}
            />
          ))}

          <div className="relative z-10 w-full max-w-xl px-6 flex flex-col items-center gap-8">
            {/* Logo / Name glitch */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-3 mb-3">
                {/* Animated logo mark */}
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  className="w-10 h-10 rounded-lg border-2 border-cyan-500/60 flex items-center justify-center relative overflow-hidden bg-zinc-950/50"
                >
                  <img
                    src="/logo.png"
                    alt="Logo"
                    className="w-7 h-7 object-contain"
                  />
                </motion.div>

                <div>
                  <div
                    className="font-mono font-bold tracking-[0.3em] text-xl"
                    style={{
                      color: '#00d2ef',
                      textShadow: '0 0 20px rgba(0,210,239,0.6), 0 0 40px rgba(0,210,239,0.3)',
                    }}
                  >
                    {glitchedName}
                  </div>
                  <div className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase mt-0.5">
                    AI Engineer · Full-Stack Developer
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Terminal window */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm overflow-hidden"
            >
              {/* Terminal title bar */}
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-zinc-800 bg-zinc-950/60">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-[11px] text-zinc-500 font-mono">portfolio-v2 — boot sequence</span>
              </div>

              {/* Terminal output */}
              <div className="p-4 font-mono text-sm min-h-[180px] space-y-1.5">
                {BOOT_LINES.map((line, i) => (
                  <AnimatePresence key={i}>
                    {visibleLines.includes(i) && (
                      <motion.div
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.25 }}
                        className={
                          line.highlight
                            ? 'text-cyan-400'
                            : 'text-zinc-400'
                        }
                        style={line.highlight ? { textShadow: '0 0 12px rgba(0,210,239,0.5)' } : {}}
                      >
                        {line.text}
                        {i === visibleLines[visibleLines.length - 1] && !line.highlight && (
                          <span className="inline-block w-2 h-4 bg-cyan-400 ml-1 align-middle animate-pulse" />
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                ))}
              </div>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="w-full"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-mono text-zinc-600 tracking-widest uppercase">System Boot</span>
                <span className="text-[10px] font-mono text-cyan-500">{progress}%</span>
              </div>
              <div className="h-0.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #00d2ef, #8d54ff)',
                    boxShadow: '0 0 8px rgba(0,210,239,0.6)',
                  }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                />
              </div>

              {/* Tick marks */}
              <div className="flex justify-between mt-1">
                {[0, 25, 50, 75, 100].map(tick => (
                  <div key={tick} className="flex flex-col items-center gap-0.5">
                    <div className={`w-px h-1.5 ${progress >= tick ? 'bg-cyan-500/60' : 'bg-zinc-700'} transition-colors duration-300`} />
                    <span className="text-[8px] font-mono text-zinc-600">{tick}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom status */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-6 left-0 right-0 flex justify-center"
          >
            <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-600 tracking-widest">
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className="w-1.5 h-1.5 rounded-full bg-cyan-500 inline-block"
              />
              SECURE · ENCRYPTED · AI-POWERED
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
