'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const NAV_ITEMS = [
  { num: '01', label: 'HOME', href: '#home' },
  { num: '02', label: 'ABOUT', href: '#about' },
  { num: '03', label: 'BUILDS', href: '#builds' },
  { num: '04', label: 'TOOLKIT', href: '#toolkit' },
  { num: '05', label: 'JOURNEY', href: '#journey' },
  { num: '06', label: 'CONTACT', href: '#contact' },
]

interface Props {
  buildModeOn: boolean
  onBuildModeToggle: () => void
}

export default function Navbar({ buildModeOn, onBuildModeToggle }: Props) {
  const [activeSection, setActiveSection] = useState('home')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? scrollTop / docHeight : 0
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = NAV_ITEMS.map(item => item.href.slice(1))
    const observers: IntersectionObserver[] = []

    sections.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { threshold: 0.3, rootMargin: '-64px 0px 0px 0px' }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  // Close menu on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) setMenuOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  // Lock scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header className="navbar" role="banner">
        {/* Logo */}
        <Link
          href="/"
          className="font-display font-black text-bone text-sm tracking-widest uppercase mr-auto"
          style={{ fontFamily: 'var(--font-display)', fontVariationSettings: '"wdth" 87.5', textDecoration: 'none' }}
          aria-label="Bhavya Jindal — Home"
        >
          BHAVYA.J
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-6 mx-auto"
        >
          {NAV_ITEMS.map(item => (
            <a
              key={item.num}
              href={item.href}
              aria-current={activeSection === item.href.slice(1) ? 'page' : undefined}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                textDecoration: 'none',
                color: activeSection === item.href.slice(1) ? 'var(--cyan)' : 'var(--mute)',
                transition: 'color 0.2s',
                padding: '0.5rem 0',
              }}
            >
              <span style={{ color: 'var(--line)', marginRight: '0.3rem' }}>{item.num}</span>
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Status */}
          <div className="status-indicator hidden lg:flex">
            <span className="status-indicator__dot" />
            BUILDING
          </div>

          {/* Build Mode toggle */}
          <button
            className="build-mode-toggle hidden md:inline-flex"
            role="switch"
            aria-checked={buildModeOn}
            onClick={onBuildModeToggle}
            title="Toggle Build Mode — reveals engineering metadata"
          >
            <span className="build-mode-toggle__dot" />
            {buildModeOn ? 'BUILD MODE: ON' : '[ BUILD MODE ]'}
          </button>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMenuOpen(v => !v)}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {[0, 1, 2].map(i => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: '22px',
                  height: '1px',
                  background: 'var(--bone)',
                  transition: 'transform 0.3s, opacity 0.3s',
                  transform: menuOpen
                    ? i === 0 ? 'translateY(6px) rotate(45deg)'
                    : i === 1 ? 'scaleX(0)'
                    : 'translateY(-6px) rotate(-45deg)'
                    : undefined,
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>

        {/* Scroll progress bar */}
        <div
          className="nav-progress"
          style={{ transform: `scaleX(${scrollProgress})` }}
          aria-hidden="true"
        />
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'var(--ink)',
            zIndex: 99,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '2rem',
            paddingTop: '80px',
          }}
        >
          <nav aria-label="Mobile navigation">
            {NAV_ITEMS.map((item, i) => (
              <a
                key={item.num}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: 'clamp(2.5rem, 10vw, 5rem)',
                  fontVariationSettings: '"wdth" 87.5',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.02em',
                  color: activeSection === item.href.slice(1) ? 'var(--cyan)' : 'var(--bone)',
                  textDecoration: 'none',
                  paddingBottom: '0.25rem',
                  borderBottom: '1px solid var(--line)',
                  marginBottom: '0.5rem',
                  animationDelay: `${i * 60}ms`,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: 'var(--mute)',
                    marginRight: '1rem',
                    verticalAlign: 'middle',
                  }}
                >
                  {item.num}
                </span>
                {item.label}
              </a>
            ))}
          </nav>

          {/* Build mode in mobile menu */}
          <button
            className="build-mode-toggle mt-8"
            role="switch"
            aria-checked={buildModeOn}
            onClick={onBuildModeToggle}
          >
            <span className="build-mode-toggle__dot" />
            {buildModeOn ? 'BUILD MODE: ON' : '[ BUILD MODE ]'}
          </button>
        </div>
      )}
    </>
  )
}
