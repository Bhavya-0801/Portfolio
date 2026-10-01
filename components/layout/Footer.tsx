'use client'

import { SITE_META } from '@/data/site'

interface Props {
  buildModeOn: boolean
  onBuildModeToggle: () => void
}

export default function Footer({ buildModeOn, onBuildModeToggle }: Props) {
  const year = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        {/* Oversized wordmark */}
        <div
          className="footer__wordmark mb-12"
          aria-hidden="true"
        >
          BHAVYA JINDAL
        </div>

        {/* Footer columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '3rem',
            borderTop: '1px solid var(--line)',
            paddingTop: '2rem',
          }}
        >
          {/* About col */}
          <div>
            <p className="mono-xs" style={{ color: 'var(--mute)', marginBottom: '1rem' }}>IDENTITY</p>
            <p className="body-md" style={{ color: 'var(--bone)' }}>ENGINEERING / ROBOTICS / AI</p>
            <p className="mono-sm" style={{ color: 'var(--mute)', marginTop: '0.5rem' }}>JAIPUR, INDIA</p>
            <p className="mono-xs" style={{ color: 'var(--line)', marginTop: '0.25rem' }}>
              JECRC UNIVERSITY · CSE · 2025–2029
            </p>
          </div>

          {/* Links col */}
          <div>
            <p className="mono-xs" style={{ color: 'var(--mute)', marginBottom: '1rem' }}>LINKS</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a
                href={SITE_META.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mono-sm"
                style={{ color: 'var(--bone)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--cyan)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--bone)')}
              >
                LINKEDIN ↗
              </a>
              <a
                href={SITE_META.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mono-sm"
                style={{ color: 'var(--bone)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--cyan)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--bone)')}
              >
                GITHUB ↗
              </a>
            </div>
          </div>

          {/* Sections col */}
          <div>
            <p className="mono-xs" style={{ color: 'var(--mute)', marginBottom: '1rem' }}>SECTIONS</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {['#about', '#builds', '#toolkit', '#journey', '#lab', '#contact'].map((href, i) => (
                <a
                  key={href}
                  href={href}
                  className="mono-sm"
                  style={{ color: 'var(--mute)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--bone)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--mute)')}
                >
                  0{i + 2} {href.slice(1).toUpperCase()}
                </a>
              ))}
            </div>
          </div>

          {/* Controls col */}
          <div>
            <p className="mono-xs" style={{ color: 'var(--mute)', marginBottom: '1rem' }}>CONTROLS</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button
                className="build-mode-toggle"
                role="switch"
                aria-checked={buildModeOn}
                onClick={onBuildModeToggle}
              >
                <span className="build-mode-toggle__dot" />
                {buildModeOn ? 'BUILD MODE: ON' : '[ BUILD MODE ]'}
              </button>
              <button
                onClick={scrollToTop}
                className="btn"
                style={{ fontSize: '0.65rem', padding: '0.5rem 1rem', alignSelf: 'flex-start' }}
              >
                BACK TO TOP ↑
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <p
          className="mono-xs"
          style={{ color: 'var(--line)', marginTop: '3rem', borderTop: '1px solid var(--line)', paddingTop: '1.5rem' }}
        >
          © {year} BHAVYA JINDAL · ALL RIGHTS RESERVED
        </p>
      </div>
    </footer>
  )
}
