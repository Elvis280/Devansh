import { useState, useEffect, useCallback } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Loader from '@/components/Loader'
import CRTOverlay from '@/components/CRTOverlay'
import CustomCursor from '@/components/CustomCursor'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Experiments from '@/components/Experiments'
import Journey from '@/components/Journey'
import Contact from '@/components/Contact'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [loaded, setLoaded] = useState(false)

  const handleLoaderDone = useCallback(() => {
    setLoaded(true)
    setTimeout(() => ScrollTrigger.refresh(), 100)
  }, [])

  // Lenis smooth scroll integrated with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
    })

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
      lenis.destroy()
    }
  }, [])

  return (
    <div className="grain relative min-h-screen bg-[#070707] text-[#edece6] overflow-x-hidden selection:bg-[#a3e635]/25 selection:text-[#a3e635]">
      {/* CRT Film + Grain Overlay */}
      <CRTOverlay />

      {/* Boot Loader */}
      {!loaded && <Loader onDone={handleLoaderDone} />}

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Navigation Header + Social Rail */}
      <Navigation />

      {/* 6-Section Cinematic Portfolio */}
      <main
        className="relative z-10 will-change-transform"
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <Hero />
        <About />
        <Projects />
        <Experiments />
        <Journey />
        <Contact />
      </main>
    </div>
  )
}
