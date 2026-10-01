'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { useScrollReveal } from '@/lib/useScrollReveal'

const INTERESTS = [
  { name: 'ROBOTICS', desc: 'Building machines that move, respond, and interact with the physical world.' },
  { name: 'COMPUTER VISION', desc: 'Teaching software to see — detection, tracking, and camera-based feedback loops.' },
  { name: 'EMBEDDED', desc: 'Microcontrollers, sensors, and the wiring that makes them behave.' },
  { name: 'AI', desc: 'API integrations and intelligent modules that make software more useful.' },
  { name: 'WEB SYSTEMS', desc: 'Full-stack platforms that serve real workflows — from browser to database.' },
  { name: 'HARDWARE PROTOTYPING', desc: 'Breadboards, servo horns, and debugging hardware that worked five minutes ago.' },
]

function Photo3D() {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width  - 0.5) * 20
    const y = ((e.clientY - r.top)  / r.height - 0.5) * -20
    el.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg) scale3d(1.04,1.04,1.04)`
  }, [])

  const onLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = ''
  }, [])

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        position: 'relative',
        border: '1px solid #d0cec8',
        transition: 'transform 0.15s ease-out',
        willChange: 'transform',
        cursor: 'none',
      }}
    >
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: '#e0ddd6',
          aspectRatio: '3/4',
        }}
      >
        <Image
          src="/images/Bhavya.jpeg"
          alt="Bhavya Jindal"
          fill
          unoptimized
          style={{
            objectFit: 'cover',
            objectPosition: 'top',
            filter: 'grayscale(100%)',
            mixBlendMode: 'multiply',
            transition: 'filter 0.5s',
          }}
          sizes="(max-width: 768px) 80vw, 300px"
          onMouseEnter={e => {
            (e.currentTarget as HTMLImageElement).style.filter = 'grayscale(0%)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLImageElement).style.filter = 'grayscale(100%)'
          }}
        />
      </div>
      <div className="mono-xs" style={{ color: '#888', padding: '0.4rem' }}>
        26.9124°N, 75.7873°E // JAIPUR
      </div>
      {/* 3D shine overlay */}
      <div
        aria-hidden="true"
        className="about-photo-shine"
      />
    </div>
  )
}

export default function About() {
  const [activeTile, setActiveTile] = useState<number | null>(null)
  const { ref: headRef, visible: headVisible } = useScrollReveal<HTMLHeadingElement>()
  const { ref: copyRef, visible: copyVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.1 })
  const { ref: gridRef, visible: gridVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.1 })

  return (
    <section
      id="about"
      className="section section--bone"
      aria-labelledby="about-heading"
      style={{ scrollMarginTop: '64px' }}
    >
      <div className="container">
        <p className="mono-xs" style={{ color: '#888', marginBottom: '1.5rem' }}>02 // ABOUT</p>

        <h2
          ref={headRef}
          id="about-heading"
          className="display-lg"
          style={{
            color: 'var(--ink)',
            maxWidth: '16ch',
            marginBottom: '3rem',
            lineHeight: 0.9,
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? 'none' : 'translateY(30px)',
            transition: 'opacity 0.8s, transform 0.8s var(--ease-out-expo)',
          }}
        >
          NOT JUST SOFTWARE. I LIKE BUILDING THE THING IT CONTROLS TOO.
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(2rem, 5vw, 5rem)',
            marginBottom: '4rem',
            alignItems: 'start',
          }}
        >
          <div
            ref={copyRef}
            style={{
              opacity: copyVisible ? 1 : 0,
              transform: copyVisible ? 'none' : 'translateX(-30px)',
              transition: 'opacity 0.8s 0.2s, transform 0.8s 0.2s var(--ease-out-expo)',
            }}
          >
            <p className="body-lg" style={{ color: '#333', marginBottom: '1.5rem' }}>
              Second-year B.Tech CSE at JECRC University, Jaipur. I work at the edge of software and physical systems — where the code doesn&apos;t just run on a screen but actually moves something, detects something, or controls something.
            </p>
            <p className="body-md" style={{ color: '#555', marginBottom: '1.5rem' }}>
              Robotics, embedded development, computer vision, AI-powered applications and full-stack platforms. Hackathons and makerspace environments matter to me because they force an idea off a whiteboard and into working wires within a deadline.
            </p>
            <p className="mono-sm" style={{ color: '#888' }}>
              WORKFLOW: BUILD → BREAK → DEBUG → REPEAT
            </p>
          </div>

          {/* 3D photo */}
          <div
            style={{
              opacity: copyVisible ? 1 : 0,
              transform: copyVisible ? 'none' : 'translateX(30px)',
              transition: 'opacity 0.8s 0.35s, transform 0.8s 0.35s var(--ease-out-expo)',
            }}
          >
            <Photo3D />
          </div>
        </div>

        {/* Interest grid */}
        <div
          ref={gridRef}
          style={{
            opacity: gridVisible ? 1 : 0,
            transform: gridVisible ? 'none' : 'translateY(20px)',
            transition: 'opacity 0.7s 0.1s, transform 0.7s 0.1s var(--ease-out-expo)',
          }}
        >
          <p className="mono-xs" style={{ color: '#888', marginBottom: '1rem' }}>AREAS OF INTEREST</p>
          <div className="interest-grid" role="list">
            {INTERESTS.map((interest, i) => (
              <div
                key={interest.name}
                role="listitem"
                className={`interest-tile${activeTile === i ? ' is-active' : ''}`}
                onClick={() => setActiveTile(activeTile === i ? null : i)}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setActiveTile(activeTile === i ? null : i)
                  }
                }}
                tabIndex={0}
                data-expanded={activeTile === i}
                aria-label={`${interest.name}: ${interest.desc}`}
                style={{
                  transitionDelay: `${i * 60}ms`,
                  opacity: gridVisible ? 1 : 0,
                  transform: gridVisible ? 'none' : 'translateY(15px)',
                  transition: `opacity 0.5s ${i * 60}ms, transform 0.5s ${i * 60}ms var(--ease-out-expo), background 0.3s, color 0.3s`,
                }}
              >
                <span className="interest-tile__name">{interest.name}</span>
                <p className="interest-tile__desc">{interest.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <p
          className="mono-xs"
          style={{ color: '#aaa', marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid #d0cec8' }}
        >
          MOST LIKELY TO BE FOUND: DEBUGGING HARDWARE THAT WORKED FIVE MINUTES AGO
        </p>
      </div>
    </section>
  )
}
