'use client'

import { SITE_META } from '@/data/site'

export default function Contact() {
  return (
    <section
      id="contact"
      className="section"
      aria-labelledby="contact-heading"
      style={{ scrollMarginTop: '64px', background: 'var(--graphite)' }}
    >
      <div className="container">
        <p className="mono-xs" style={{ color: 'var(--mute)', marginBottom: '1.5rem' }}>07 // CONTACT</p>

        {/* Big headline */}
        <h2
          id="contact-heading"
          className="display-xl"
          style={{
            maxWidth: '14ch',
            marginBottom: '2rem',
            lineHeight: 0.9,
          }}
        >
          HAVE AN IDEA THAT NEEDS TO MOVE OFF THE SCREEN?
        </h2>

        {/* Intent line */}
        <p
          className="body-lg"
          style={{
            color: 'var(--mute)',
            maxWidth: '55ch',
            marginBottom: '3rem',
          }}
        >
          I&apos;m interested in robotics, AI, hardware-software systems, computer vision, hackathons and ambitious prototypes.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '4rem' }}>
          <a
            href={SITE_META.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary"
            id="contact-linkedin"
          >
            LINKEDIN ↗
          </a>
          <a
            href={SITE_META.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            id="contact-github"
          >
            GITHUB ↗
          </a>
        </div>

        {/* Info line */}
        <div
          style={{
            display: 'flex',
            gap: '2rem',
            flexWrap: 'wrap',
            borderTop: '1px solid var(--line)',
            paddingTop: '2rem',
          }}
        >
          <div>
            <p className="mono-xs" style={{ color: 'var(--mute)', marginBottom: '0.25rem' }}>INSTITUTION</p>
            <p className="body-md">{SITE_META.institution}</p>
          </div>
          <div>
            <p className="mono-xs" style={{ color: 'var(--mute)', marginBottom: '0.25rem' }}>LOCATION</p>
            <p className="body-md">{SITE_META.location}</p>
          </div>
          <div>
            <p className="mono-xs" style={{ color: 'var(--mute)', marginBottom: '0.25rem' }}>PROGRAMME</p>
            <p className="body-md">B.Tech CSE · {SITE_META.batch}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
