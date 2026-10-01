'use client'

import { PROJECTS } from '@/data/projects'
import { SITE_META } from '@/data/site'

const LAB_REPOS = PROJECTS.filter(p => p.repoUrl).map(p => ({
  id: p.id,
  number: p.number,
  name: p.name,
  tagline: p.tagline,
  language: p.stack[0],
  repoUrl: p.repoUrl!,
  stack: p.stack,
}))

export default function GitHubLab() {
  return (
    <section
      id="lab"
      className="section"
      aria-labelledby="lab-heading"
      style={{ scrollMarginTop: '64px' }}
    >
      <div className="container">
        <p className="mono-xs" style={{ color: 'var(--mute)', marginBottom: '1.5rem' }}>06 // LAB</p>

        <h2
          id="lab-heading"
          className="display-md"
          style={{ marginBottom: '0.75rem', maxWidth: '28ch', color: 'var(--bone)' }}
        >
          PROJECTS NEVER REALLY END. THEY JUST GET ANOTHER COMMIT.
        </h2>

        <p className="body-md" style={{ color: 'var(--mute)', marginBottom: '3rem', maxWidth: '50ch' }}>
          Repository index. Static data — no dependency on the GitHub API to render this page.
        </p>

        {/* Header row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2.5rem 1fr 1fr auto',
            gap: '1rem',
            paddingBottom: '0.5rem',
            borderBottom: '1px solid var(--line)',
            marginBottom: '0.25rem',
          }}
        >
          {['IDX', 'REPO', 'PRIMARY LANG', ''].map(h => (
            <span key={h} className="mono-xs" style={{ color: 'var(--line)' }}>{h}</span>
          ))}
        </div>

        {/* Repo rows */}
        {LAB_REPOS.map(repo => (
          <a
            key={repo.id}
            href={repo.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="lab-row"
            id={`lab-${repo.id}`}
            aria-label={`${repo.name} — ${repo.tagline}`}
            style={{
              display: 'grid',
              gridTemplateColumns: '2.5rem 1fr 1fr auto',
              gap: '1rem',
              alignItems: 'center',
              padding: '1rem 0',
              borderBottom: '1px solid var(--line)',
              textDecoration: 'none',
              color: 'var(--bone)',
              transition: 'color 0.2s',
              minHeight: '44px',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--cyan)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--bone)')}
          >
            <span className="mono-sm" style={{ color: 'var(--line)' }}>{repo.number}</span>
            <div>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1rem', fontVariationSettings: '"wdth" 87.5', textTransform: 'uppercase' }}>
                {repo.name}
              </p>
              <p className="body-md" style={{ color: 'var(--mute)', fontSize: '0.85rem' }}>{repo.tagline}</p>
            </div>
            <span className="mono-sm" style={{ color: 'var(--mute)' }}>{repo.language}</span>
            <span className="mono-sm">→</span>
          </a>
        ))}

        {/* Link to full profile */}
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a
            href={SITE_META.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            id="lab-github-profile"
          >
            VIEW GITHUB PROFILE ↗
          </a>
        </div>
      </div>
    </section>
  )
}
