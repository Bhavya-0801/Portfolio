'use client'

import { useState, useEffect } from 'react'
import Preloader from '@/components/sections/Preloader'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/hero/Hero'
import MarqueeStrip from '@/components/motion/MarqueeStrip'
import About from '@/components/sections/About'
import Builds from '@/components/sections/Builds'
import Toolkit from '@/components/sections/Toolkit'
import FieldLog from '@/components/sections/FieldLog'
import GitHubLab from '@/components/sections/GitHubLab'
import Contact from '@/components/sections/Contact'
import CursorGlow from '@/components/motion/CursorGlow'
import CustomCursor from '@/components/motion/CustomCursor'

// Read localStorage once (outside effect to avoid triggering re-renders)
function getInitialBuildMode(): boolean {
  if (typeof window === 'undefined') return false
  try { return localStorage.getItem('build-mode') === '1' } catch { return false }
}

export default function Home() {
  const [buildModeOn, setBuildModeOn] = useState<boolean>(false)
  const [showBuildModeTooltip, setShowBuildModeTooltip] = useState(false)

  // Sync state from localStorage on first client render
  useEffect(() => {
    const timer = setTimeout(() => {
      setBuildModeOn(getInitialBuildMode())
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  // Show one-time discovery tooltip for build mode
  useEffect(() => {
    try {
      if (!localStorage.getItem('build-mode-discovered')) {
        const t = setTimeout(() => {
          setShowBuildModeTooltip(true)
          setTimeout(() => setShowBuildModeTooltip(false), 4000)
          localStorage.setItem('build-mode-discovered', '1')
        }, 4000)
        return () => clearTimeout(t)
      }
    } catch { /* ignore */ }
  }, [])

  const handleBuildModeToggle = () => {
    setBuildModeOn(prev => {
      const next = !prev
      try { localStorage.setItem('build-mode', next ? '1' : '0') } catch { /* ignore */ }
      return next
    })
  }

  return (
    <>
      <CursorGlow />
      <CustomCursor />
      <Preloader />

      <Navbar buildModeOn={buildModeOn} onBuildModeToggle={handleBuildModeToggle} />

      {/* Build Mode discovery tooltip */}
      {showBuildModeTooltip && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: 'fixed',
            top: '72px',
            right: '1.5rem',
            background: 'var(--graphite)',
            border: '1px solid var(--cyan)',
            padding: '0.75rem 1rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            letterSpacing: '0.08em',
            color: 'var(--cyan)',
            zIndex: 200,
            maxWidth: '220px',
            animation: 'fadeIn 0.3s',
          }}
        >
          [ BUILD MODE ] in the nav reveals engineering metadata for every project.
        </div>
      )}

      {/* Build mode blueprint grid overlay */}
      {buildModeOn && (
        <div
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 5,
            backgroundImage:
              'linear-gradient(rgba(25,227,227,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(25,227,227,0.015) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      )}

      <main id="main-content">
        <Hero />
        <MarqueeStrip />
        <About />
        <Builds buildModeOn={buildModeOn} />
        <Toolkit />
        <FieldLog />
        <GitHubLab />
        <Contact />
      </main>

      <Footer buildModeOn={buildModeOn} onBuildModeToggle={handleBuildModeToggle} />
    </>
  )
}
