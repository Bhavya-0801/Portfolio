'use client'

import { useEffect, useRef } from 'react'
import { FIELD_LOG } from '@/data/experience'

export default function FieldLog() {
  const entriesRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = entriesRef.current.map((el) => {
      if (!el) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add('is-active')
          } else {
            el.classList.remove('is-active')
          }
        },
        { threshold: 0.5 }
      )
      observer.observe(el)
      return observer
    })

    return () => observers.forEach(o => o?.disconnect())
  }, [])

  return (
    <section
      id="journey"
      className="section section--bone"
      aria-labelledby="journey-heading"
      style={{ scrollMarginTop: '64px' }}
    >
      <div className="container">
        <p className="mono-xs" style={{ color: '#888', marginBottom: '1.5rem' }}>05 // FIELD LOG</p>

        <h2
          id="journey-heading"
          className="display-lg"
          style={{ color: 'var(--ink)', marginBottom: '4rem', maxWidth: '18ch' }}
        >
          BUILD HISTORY.
        </h2>

        {/* Two column layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: 'clamp(2rem, 5vw, 5rem)',
          }}
        >
          {/* Sticky year */}
          <div style={{ position: 'sticky', top: '80px', height: 'fit-content' }}>
            <p className="mono-xs" style={{ color: '#888', marginBottom: '0.5rem' }}>JECRC UNIVERSITY</p>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(4rem, 12vw, 8rem)',
                color: '#e0ddd6',
                lineHeight: 1,
                fontVariationSettings: '"wdth" 87.5',
              }}
              aria-hidden="true"
            >
              2025
            </p>
            <p className="mono-xs" style={{ color: '#aaa', marginTop: '0.5rem' }}>BATCH 2025–2029</p>
          </div>

          {/* Log entries */}
          <div className="fieldlog" style={{ paddingLeft: '2rem', position: 'relative' }}>
            {/* Vertical line */}
            <div className="fieldlog__line" />

            {FIELD_LOG.map((entry, i) => (
              <div
                key={entry.id}
                className="fieldlog__entry"
                ref={el => { entriesRef.current[i] = el }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: '1.1rem',
                    fontVariationSettings: '"wdth" 87.5',
                    textTransform: 'uppercase',
                    color: 'var(--ink)',
                    marginBottom: '0.25rem',
                  }}
                >
                  {entry.event}
                </h3>

                {entry.role && (
                  <p className="mono-xs" style={{ color: 'var(--signal)', marginBottom: '0.25rem' }}>
                    {entry.role}
                  </p>
                )}

                {entry.context && (
                  <p className="mono-sm" style={{ color: '#888', marginBottom: '0.5rem' }}>
                    {entry.context}
                  </p>
                )}

                {entry.project && (
                  <span className="tag" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>
                    {entry.project}
                  </span>
                )}

                {entry.note && (
                  <p className="body-md" style={{ color: '#555', marginTop: '0.5rem' }}>
                    {entry.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
