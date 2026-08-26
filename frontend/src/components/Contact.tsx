'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  ArrowUpRight,
  MapPin,
  FileText,
  Check,
  Crosshair
} from 'lucide-react';
import { GitHubIcon, LinkedInIcon, TwitterXIcon } from '@/components/Icons';
import { personalInfo } from '@/lib/data';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="contact"
      className="relative bg-[#060606] overflow-hidden flex flex-col font-mono text-white/80 selection:bg-[#a3e635]/30"
    >
      <div className="relative z-10 w-full flex flex-col max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 pt-24">

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-0 mt-4 mb-4">

          {/* Left Column */}
          <div className="flex flex-col justify-between pr-0 lg:pr-16 relative">
            {/* Top Left Bracket */}
            <div className="absolute -top-10 -left-6 w-6 h-6 border-t border-l border-white/20 hidden sm:block" />

            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {/* Section Indicator */}
                <div className="flex items-center gap-3 text-[11px] sm:text-xs font-mono tracking-[0.2em] text-white/50 mb-10">
                  <span className="text-[#a3e635]">06</span>
                  <span>/</span>
                  <span className="text-white/80">CONTACT</span>
                  <span>/</span>
                  <span>TRANSMISSION</span>
                </div>

                {/* Headline */}
                <h2 className="font-bebas text-[clamp(4.5rem,9vw,9rem)] leading-[0.85] tracking-wide text-[#e5e5e5] mt-6">
                  LET&apos;S BUILD
                  <br />
                  SOMETHING
                  <br />
                  COOL.
                  <span className="inline-block w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-[#a3e635] ml-4 sm:ml-6 translate-y-[-10px] sm:translate-y-[-15px] shadow-[0_0_15px_rgba(163,230,53,0.2)]" />
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Subtext */}
                <p className="mt-12 text-[11px] sm:text-xs text-white/60 font-mono max-w-[400px] leading-relaxed">
                  Have an idea, a problem worth solving
                  or just want to build something insane?
                  I&apos;m always up for interesting
                  conversations and bold projects.
                </p>
                {/* Invisible Space Block */}
                <div className="h-10 sm:h-10 w-full" aria-hidden="true" />

                {/* Email Box */}
                <div className="mt-10 max-w-lg">
                  <button
                    onClick={handleCopyEmail}
                    className="group w-full aspect-[10/1] border border-white/20 hover:border-[#a3e635] bg-[#090909] flex items-center justify-between px-10 sm:px-14 transition-all relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-[#a3e635]/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
                    <div className="flex items-center gap-4 sm:gap-6 relative z-10">
                      {copied ? (
                        <Check size={32} className="text-[#a3e635]" />
                      ) : (
                        <Mail size={32} className="text-white/40 group-hover:text-white transition-colors" />
                      )}
                      <span className="text-[10px] sm:text-xs tracking-widest text-white/70">
                        {copied ? 'COPIED TO CLIPBOARD' : 'SEND ME AN EMAIL'}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 sm:gap-6 relative z-10">
                      <span className="text-[10px] sm:text-xs text-[#a3e635] tracking-widest hidden sm:block">
                        {personalInfo.email}
                      </span>
                      <ArrowUpRight size={32} className="text-white/40 group-hover:text-[#a3e635] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </button>
                  <div className="h-10 sm:h-10 w-full" aria-hidden="true" />

                  {/* Location */}
                  <div className="mt-8 flex items-start gap-3">
                    <MapPin className="text-[#a3e635] mt-0.5" size={14} />
                    <div className="text-[10px] sm:text-[11px] tracking-wider text-white/50 space-y-1">
                      <p>Lucknow,</p>
                      <p>Uttar Pradesh, India</p>
                      <p>(IST UTC +5:30)</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column */}
          <div className="relative flex flex-col justify-center lg:justify-start pt-12 lg:pt-0 lg:pl-16 border-t lg:border-t-0 lg:border-l border-white/10">

            {/* Crosshair at intersection */}
            <div className="hidden lg:flex absolute -left-[15px] top-[40px] items-center justify-center w-[30px] h-[30px] text-white/20">
              <Crosshair size={24} strokeWidth={1} />
            </div>

            {/* Top Right Bracket */}
            <div className="absolute -top-10 -right-6 w-6 h-6 border-t border-r border-white/20 hidden sm:block" />

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="w-full flex flex-col h-full justify-between"
            >
              <div>
                {/* Dotted World Map */}
                <div className="w-[85%] sm:w-[75%] relative aspect-[4378/2435] mb-8 pointer-events-none">
                  <div
                    className="absolute inset-0 opacity-40"
                    style={{
                      backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)',
                      backgroundSize: '6px 6px',
                      WebkitMaskImage: 'url(/world-map.svg)',
                      WebkitMaskSize: 'contain',
                      WebkitMaskRepeat: 'no-repeat',
                      WebkitMaskPosition: 'center',
                      maskImage: 'url(/world-map.svg)',
                      maskSize: 'contain',
                      maskRepeat: 'no-repeat',
                      maskPosition: 'center',
                    }}
                  />

                  {/* India Marker */}
                  <div className="absolute left-[68%] top-[33%]">
                    <div className="relative -ml-1.5 -mt-1.5">
                      <div className="w-3 h-3 bg-[#a3e635] rounded-full shadow-[0_0_12px_#a3e635] relative z-10" />
                      <div className="absolute -inset-3 border border-[#a3e635] rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] opacity-50" />
                      <div className="absolute -inset-1.5 bg-[#a3e635]/20 rounded-full animate-pulse" />
                    </div>
                  </div>

                </div>

                {/* Open to collaborate text */}
                <div className="mb-10 text-[10px] sm:text-[11px] tracking-[0.2em] text-white/50 uppercase leading-loose">
                  [ OPEN TO COLLABORATE ]
                  <br />
                  ANYWHERE, <span className="text-[#a3e635]">ANYTIME.</span>
                </div>

                {/* Links list */}
                <div className="space-y-0 border-t border-white/10">
                  {[
                    {
                      label: 'GITHUB',
                      sublabel: 'github.com/Devansh28sharma',
                      url: personalInfo.github,
                      icon: GitHubIcon,
                    },
                    {
                      label: 'LINKEDIN',
                      sublabel: 'linkedin.com/in/devansh-sharma-28',
                      url: personalInfo.linkedin,
                      icon: LinkedInIcon,
                    },
                    {
                      label: 'TWITTER / X',
                      sublabel: 'x.com/Devansh28_',
                      url: personalInfo.twitter,
                      icon: TwitterXIcon,
                    },
                    {
                      label: 'RESUME (PDF)',
                      sublabel: 'Download My Resume',
                      url: personalInfo.cv,
                      icon: FileText,
                    }
                  ].map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between py-6 border-b border-white/10 hover:bg-white/[0.02] transition-colors"
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 border border-white/10 flex items-center justify-center rounded-sm group-hover:border-[#a3e635] group-hover:text-[#a3e635] text-white/60 transition-colors bg-[#090909]">
                          <link.icon size={22} />
                        </div>
                        <div>
                          <div className="text-[11px] sm:text-xs text-white tracking-[0.2em] mb-1">{link.label}</div>
                          <div className="text-[10px] text-white/40 tracking-wider font-sans">{link.sublabel}</div>
                        </div>
                      </div>
                      <ArrowUpRight className="text-white/20 group-hover:text-[#a3e635] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={20} />
                    </a>
                  ))}
                </div>
              </div>

            </motion.div>
          </div>
        </div>

        {/* Bottom Footer Area */}
        <div className="h-10 sm:h-10 w-full" aria-hidden="true" />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}

          className="grid grid-cols-1 lg:grid-cols-3 items-center gap-6 mt-16 pt-10 pb-6 border-t border-white/10 text-xs sm:text-sm tracking-widest text-white/40 relative w-full"
        >
          {/* Bottom Left Bracket */}
          <div className="absolute bottom-4 -left-6 w-6 h-6 border-b border-l border-white/20 hidden sm:block" />
          {/* Bottom Right Bracket */}
          <div className="absolute bottom-4 -right-6 w-6 h-6 border-b border-r border-white/20 hidden sm:block" />

          {/* Left: Copyright */}
          <div className="flex justify-center lg:justify-start uppercase tracking-[0.2em]">
            <span>DEVANSH SHARMA © 2005</span>
          </div>

          {/* Center: Back to Top */}
          <div className="flex justify-center">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 hover:text-[#a3e635] transition-colors uppercase tracking-[0.2em] group"
            >
              <span>BACK TO TOP</span>
              <ArrowUpRight size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Right: Built with Curiosity */}
          <div className="flex items-center justify-center lg:justify-end gap-3 uppercase tracking-[0.2em] whitespace-nowrap">
            <span>BUILT WITH CURIOSITY & CODE</span>
            <span className="text-[#a3e635]">{'</>'}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
