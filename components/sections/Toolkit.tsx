'use client'

import { useState } from 'react'
import { TOOLKIT } from '@/data/toolkit'

export default function Toolkit() {
  const [activeGroup, setActiveGroup] = useState<string | null>(null)

  const handleGroupInteraction = (id: string) => {
    setActiveGroup(prev => prev === id ? null : id)
  }

  return (
    <section
      id="toolkit"
      className="section section--graphite"
      aria-labelledby="toolkit-heading"
      style={{ scrollMarginTop: '64px' }}
    >
      <div className="container">
        <p className="mono-xs" style={{ color: 'var(--mute)', marginBottom: '1.5rem' }}>04 // TOOLKIT</p>

        <h2
          id="toolkit-heading"
          className="display-lg"
          style={{ marginBottom: '3rem', maxWidth: '20ch' }}
        >
          TOOLS CHANGE. THE BUILDING DOESN&apos;T.
        </h2>

        <div role="list">
          {TOOLKIT.map(group => {
            const isActive = activeGroup === group.id
            const isDimmed = activeGroup !== null && !isActive

            return (
              <div
                key={group.id}
                role="listitem"
                className={`toolkit-group${isActive ? ' is-active' : ''}${isDimmed ? ' is-dimmed' : ''}`}
                onMouseEnter={() => setActiveGroup(group.id)}
                onMouseLeave={() => setActiveGroup(null)}
                onFocus={() => setActiveGroup(group.id)}
                onBlur={() => setActiveGroup(null)}
                // Touch tap
                onClick={() => handleGroupInteraction(group.id)}
                aria-label={`${group.label}: ${group.items.join(', ')}`}
              >
                <p className="toolkit-group__label">{group.label}</p>
                <div className="toolkit-group__items">
                  {group.items.map(item => (
                    <span key={item} className="toolkit-item">
                      {item}
                      <span aria-hidden="true" style={{ color: 'var(--line)', marginLeft: '0.75rem' }}>
                        /
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Small human detail */}
        <p className="mono-xs" style={{ color: 'var(--line)', marginTop: '4rem' }}>
          CURRENTLY: BUILDING / LEARNING / EXPERIMENTING
        </p>
      </div>
    </section>
  )
}
