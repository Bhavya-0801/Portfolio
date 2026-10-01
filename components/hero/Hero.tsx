'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import EngineeringGrid from './EngineeringGrid'
import { SITE_META } from '@/data/site'

/* ── tiny floating-particle canvas ── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let w = canvas.width  = canvas.offsetWidth
    let h = canvas.height = canvas.offsetHeight
    const N = 60
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.2 + 0.3,
      dx: (Math.random() - 0.5) * 0.25,
      dy: (Math.random() - 0.5) * 0.25,
    }))

    let raf: number
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of pts) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(25,227,227,0.5)'
        ctx.fill()
        p.x = (p.x + p.dx + w) % w
        p.y = (p.y + p.dy + h) % h
      }
      raf = requestAnimationFrame(draw)
    }
    draw()

    const resize = () => {
      w = canvas.width  = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', resize, { passive: true })
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
    />
  )
}

/* ── 3D tilt portrait ── */
function TiltPortrait({ visible }: { visible: boolean }) {
  const frameRef = useRef<HTMLDivElement>(null)

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = frameRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width  - 0.5) * 18
    const y = ((e.clientY - r.top)  / r.height - 0.5) * -18
    el.style.transform = `perspective(700px) rotateX(${y}deg) rotateY(${x}deg) scale3d(1.03,1.03,1.03)`
  }, [])

  const onLeave = useCallback(() => {
    if (frameRef.current) frameRef.current.style.transform = ''
  }, [])

  return (
    <div
      className="portrait-frame hidden md:block"
      style={{
        position: 'relative',
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(20px)',
        transition: 'opacity 0.8s 0.8s, transform 0.8s 0.8s var(--ease-out-expo)',
      }}
    >
      <div
        ref={frameRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{
          transition: 'transform 0.15s ease-out',
          willChange: 'transform',
          position: 'relative',
        }}
      >
        {/* SVG technical frame */}
        <svg
          aria-hidden="true"
          viewBox="0 0 360 480"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            zIndex: 2, pointerEvents: 'none',
          }}
        >
          {/* Animated corner scan line */}
          <line x1="0" y1="20" x2="0" y2="0" stroke="var(--cyan)" strokeWidth="2" />
          <line x1="0" y1="0" x2="20" y2="0" stroke="var(--cyan)" strokeWidth="2" />
          <line x1="340" y1="0" x2="360" y2="0" stroke="var(--cyan)" strokeWidth="2" />
          <line x1="360" y1="0" x2="360" y2="20" stroke="var(--cyan)" strokeWidth="2" />
          <line x1="360" y1="460" x2="360" y2="480" stroke="var(--cyan)" strokeWidth="2" />
          <line x1="360" y1="480" x2="340" y2="480" stroke="var(--cyan)" strokeWidth="2" />
          <line x1="20" y1="480" x2="0" y2="480" stroke="var(--cyan)" strokeWidth="2" />
          <line x1="0" y1="480" x2="0" y2="460" stroke="var(--cyan)" strokeWidth="2" />
          {/* Scan line animation */}
          <line x1="0" y1="0" x2="360" y2="0" stroke="var(--cyan)" strokeWidth="1" opacity="0.4">
            <animateTransform
              attributeName="transform"
              type="translate"
              from="0 0" to="0 480"
              dur="3s" repeatCount="indefinite"
            />
            <animate attributeName="opacity" values="0.4;0;0.4" dur="3s" repeatCount="indefinite" />
          </line>
          {/* Grid overlay */}
          <line x1="120" y1="0" x2="120" y2="480" stroke="var(--line)" strokeWidth="0.5" strokeDasharray="4 6" />
          <line x1="240" y1="0" x2="240" y2="480" stroke="var(--line)" strokeWidth="0.5" strokeDasharray="4 6" />
          <line x1="0" y1="160" x2="360" y2="160" stroke="var(--line)" strokeWidth="0.5" strokeDasharray="4 6" />
          <line x1="0" y1="320" x2="360" y2="320" stroke="var(--line)" strokeWidth="0.5" strokeDasharray="4 6" />
        </svg>

        {/* Real photo */}
        <div
          style={{
            width: 'clamp(200px, 28vw, 360px)',
            aspectRatio: '3/4',
            background: 'var(--graphite)',
            border: '1px solid var(--line)',
            clipPath: 'polygon(0 2%, 2% 0, 98% 0, 100% 2%, 100% 98%, 98% 100%, 2% 100%, 0 98%)',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <Image
            src="/images/Bhavya.jpeg"
            alt="Bhavya Jindal, B.Tech CSE student"
            fill
            unoptimized
            style={{ objectFit: 'cover', objectPosition: 'top center' }}
            sizes="(max-width: 768px) 80vw, (max-width: 1280px) 28vw, 360px"
            priority
          />
          {/* Color overlay on hover */}
          <div className="portrait-hover-overlay" />
        </div>
      </div>

      {/* Frame labels */}
      {[
        { text: 'BHAVYA JINDAL', pos: { top: -20, left: 0 } },
        { text: 'CSE // JECRC', pos: { bottom: 40, left: -80 }, rotate: true },
        { text: 'JAIPUR // INDIA', pos: { top: 60, right: -90 }, rotate: true },
        { text: 'BUILD MODE: ACTIVE', pos: { bottom: -20, right: 0 } },
      ].map((label, i) => (
        <div
          key={i}
          className="portrait-frame__label"
          style={{
            ...label.pos,
            transform: label.rotate ? 'rotate(90deg)' : undefined,
          }}
        >
          {label.text}
        </div>
      ))}
    </div>
  )
}

export default function Hero() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      id="home"
      className="hero"
      aria-labelledby="hero-heading"
      style={{ scrollMarginTop: '64px' }}
    >
      {/* Particle canvas */}
      <ParticleCanvas />

      {/* Background grid */}
      <EngineeringGrid />

      {/* Hanging tag */}
      <div
        className="hanging-tag"
        aria-hidden="true"
        style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.8s 1.2s' }}
      >
        <div className="hanging-tag__cable" />
        <div className="hanging-tag__box">SAJAG // BUILD 01</div>
      </div>

      {/* Content */}
      <div
        style={{
          position: 'relative', zIndex: 1, width: '100%',
          display: 'grid', gridTemplateColumns: '1fr auto',
          gap: '2rem', alignItems: 'flex-end',
        }}
      >
        {/* Left column */}
        <div>
          <p
            className="hero__eyebrow"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'none' : 'translateY(10px)',
              transition: 'opacity 0.6s 0.4s, transform 0.6s 0.4s var(--ease-out-expo)',
            }}
          >
            01 // ENGINEER IN MOTION
          </p>

          <h1
            id="hero-heading"
            className="display-hero"
            aria-label="Bhavya Jindal"
            style={{ overflow: 'hidden', marginBottom: '1.5rem' }}
          >
            <span
              className="hero__name-line hero__name-line--glitch"
              style={{
                display: 'block',
                transform: visible ? 'translateY(0)' : 'translateY(110%)',
                transition: 'transform 0.8s 0.5s var(--ease-out-expo)',
              }}
            >
              BHAVYA
            </span>
            <span
              className="hero__name-line"
              style={{
                display: 'block',
                transform: visible ? 'translateY(0)' : 'translateY(110%)',
                transition: 'transform 0.8s 0.65s var(--ease-out-expo)',
                color: 'transparent',
                WebkitTextStroke: '2px var(--bone)',
              }}
            >
              JINDAL
            </span>
          </h1>

          <p
            className="hero__statement"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'none' : 'translateY(12px)',
              transition: 'opacity 0.7s 0.9s, transform 0.7s 0.9s var(--ease-out-expo)',
            }}
          >
            I BUILD SYSTEMS THAT{' '}
            <em>MOVE, SEE, SENSE</em>
            {' + '}RESPOND.
          </p>

          <p
            className="hero__sub"
            style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.6s 1.1s' }}
          >
            B.Tech CSE @ JECRC University · Jaipur, India
            <br />
            <span style={{ marginTop: '0.25rem', display: 'block', color: 'var(--line)' }}>
              ROBOTICS / COMPUTER VISION / AI / EMBEDDED SYSTEMS / WEB
            </span>
          </p>

          <div
            className="hero__ctas"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'none' : 'translateY(10px)',
              transition: 'opacity 0.6s 1.3s, transform 0.6s 1.3s var(--ease-out-expo)',
            }}
          >
            <a href="#builds" className="btn btn--primary" id="hero-cta-builds">
              EXPLORE BUILDS →
            </a>
            <a href={SITE_META.github} target="_blank" rel="noopener noreferrer" className="btn" id="hero-cta-github">
              GITHUB ↗
            </a>
            <a href={SITE_META.linkedin} target="_blank" rel="noopener noreferrer" className="btn" id="hero-cta-linkedin">
              LINKEDIN ↗
            </a>
          </div>
        </div>

        {/* 3D tilt portrait */}
        <TiltPortrait visible={visible} />
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', bottom: '2rem', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
          opacity: visible ? 0.4 : 0, transition: 'opacity 0.6s 1.8s',
        }}
      >
        <span className="mono-xs" style={{ color: 'var(--mute)' }}>SCROLL</span>
        <div className="scroll-cue-line" />
      </div>
    </section>
  )
}
