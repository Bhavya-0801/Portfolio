'use client'

import Link from 'next/link'
import { PROJECTS, type Project } from '@/data/projects'

interface BuildModePanelProps {
  project: Project
  visible: boolean
}

function BuildModePanel({ project, visible }: BuildModePanelProps) {
  return (
    <div
      className="build-mode-panel"
      style={{
        maxHeight: visible ? '200px' : '0',
        opacity: visible ? 1 : 0,
        overflow: 'hidden',
        transition: 'max-height 0.5s var(--ease-out-expo), opacity 0.4s',
      }}
      aria-hidden={!visible}
    >
      <div className="build-mode-panel__inner">
        {[
          { key: 'INPUT', val: project.buildMode.input },
          { key: 'PROCESSOR', val: project.buildMode.processor },
          { key: 'OUTPUT', val: project.buildMode.output },
        ].map(row => (
          <div key={row.key} className="build-mode-panel__row">
            <span className="build-mode-panel__key">{row.key}</span>
            <span className="build-mode-panel__val">{row.val}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function StatusTag({ status }: { status: Project['status'] }) {
  const colorMap: Record<Project['status'], string> = {
    'PROTOTYPE': 'var(--violet)',
    'LIVE DEMO': 'var(--cyan)',
    'IN PROGRESS': 'var(--signal)',
    'EXPERIMENT': 'var(--mute)',
  }
  return (
    <span
      className="tag"
      style={{ borderColor: colorMap[status], color: colorMap[status] }}
    >
      {status}
    </span>
  )
}

// TIER 1: Full-section flagship
function ProjectFeature({ project, buildModeOn }: { project: Project; buildModeOn: boolean }) {
  return (
    <article
      className="project-feature"
      id={`project-${project.id}`}
      aria-labelledby={`project-title-${project.id}`}
    >
      {/* Left: content */}
      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem', marginBottom: '1rem' }}>
          <span
            className="project-number text-outlined"
            aria-hidden="true"
          >
            {project.number}
          </span>
          <StatusTag status={project.status} />
        </div>

        <h3
          id={`project-title-${project.id}`}
          className="display-lg"
          style={{ marginBottom: '0.5rem' }}
        >
          {project.name}
        </h3>

        <p className="mono-sm" style={{ color: 'var(--mute)', marginBottom: '1rem' }}>
          {project.category.join(' · ')}
        </p>

        <p className="body-lg" style={{ color: 'var(--mute)', marginBottom: '1.5rem', maxWidth: '55ch' }}>
          {project.description}
        </p>

        {/* Stack tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '2rem' }}>
          {project.stack.map(s => (
            <span key={s} className="tag">{s}</span>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {project.caseStudy && (
            <Link
              href={`/projects/${project.caseStudy.slug}`}
              className="btn btn--primary"
              id={`project-casestudy-${project.id}`}
            >
              CASE STUDY →
            </Link>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              id={`project-live-${project.id}`}
            >
              LIVE DEMO ↗
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              id={`project-repo-${project.id}`}
            >
              VIEW SOURCE ↗
            </a>
          )}
        </div>

        <BuildModePanel project={project} visible={buildModeOn} />
      </div>

      {/* Right: visual */}
      <div>
        {project.id === 'sajag' && <SAJAGSchematic />}
        {project.id === 'aarogya-darpan' && <AaragyaArchitecture />}
      </div>
    </article>
  )
}

// TIER 2: Large card
function ProjectCard({ project, buildModeOn }: { project: Project; buildModeOn: boolean }) {
  return (
    <article
      className="project-card"
      id={`project-${project.id}`}
      aria-labelledby={`project-title-${project.id}`}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <span className="project-number text-outlined" aria-hidden="true" style={{ fontSize: '4rem' }}>
          {project.number}
        </span>
        <StatusTag status={project.status} />
      </div>

      <h3 id={`project-title-${project.id}`} className="display-md" style={{ marginBottom: '0.5rem' }}>
        {project.name}
      </h3>
      <p className="mono-sm" style={{ color: 'var(--mute)', marginBottom: '1rem' }}>
        {project.category.join(' · ')}
      </p>
      <p className="body-md" style={{ color: 'var(--mute)', marginBottom: '1.5rem' }}>
        {project.description}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
        {project.stack.map(s => <span key={s} className="tag">{s}</span>)}
      </div>

      <GyaanSetuProgress />

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn" id={`project-live-${project.id}`}>
            LIVE DEMO ↗
          </a>
        )}
        {project.repoUrl && (
          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn" id={`project-repo-${project.id}`}>
            VIEW SOURCE ↗
          </a>
        )}
      </div>

      <BuildModePanel project={project} visible={buildModeOn} />
    </article>
  )
}

// TIER 3: Compact tile
function ProjectTile({ project, buildModeOn }: { project: Project; buildModeOn: boolean }) {
  return (
    <article
      id={`project-${project.id}`}
      aria-labelledby={`project-title-${project.id}`}
      style={{ borderBottom: '1px solid var(--line)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '3rem 1fr auto', gap: '1rem', alignItems: 'center' }}>
        <span className="mono-sm" style={{ color: 'var(--line)' }}>{project.number}</span>
        <div>
          <h3 id={`project-title-${project.id}`} className="display-md" style={{ fontSize: '1.25rem' }}>
            {project.name}
          </h3>
          <p className="body-md" style={{ color: 'var(--mute)', fontSize: '0.9rem' }}>{project.tagline}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginTop: '0.5rem' }}>
            {project.category.map(c => <span key={c} className="tag">{c}</span>)}
            <StatusTag status={project.status} />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginTop: '0.5rem' }}>
            {project.stack.slice(0, 4).map(s => <span key={s} className="tag">{s}</span>)}
            {project.stack.length > 4 && (
              <span className="tag">+{project.stack.length - 4}</span>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column', alignItems: 'flex-end' }}>
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mono-sm"
              style={{ color: 'var(--mute)', textDecoration: 'none', transition: 'color 0.2s' }}
              id={`project-repo-${project.id}`}
              aria-label={`${project.name} repository`}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--cyan)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--mute)')}
            >
              REPO ↗
            </a>
          )}
        </div>
      </div>
      <BuildModePanel project={project} visible={buildModeOn} />
    </article>
  )
}

// SAJAG SVG schematic
function SAJAGSchematic() {
  return (
    <div style={{ width: '100%', maxWidth: '500px' }}>
      <svg
        viewBox="0 0 500 420"
        aria-label="SAJAG quadruped robot schematic"
        role="img"
        style={{ width: '100%', height: 'auto' }}
      >
        {/* Body */}
        <rect x="150" y="120" width="200" height="100" fill="none" stroke="var(--line)" strokeWidth="1.5" />
        <rect x="160" y="130" width="180" height="80" fill="var(--graphite)" stroke="var(--line)" strokeWidth="0.5" />

        {/* ESP32 chip */}
        <rect x="190" y="145" width="60" height="40" fill="none" stroke="var(--cyan)" strokeWidth="1" />
        <text x="220" y="168" textAnchor="middle" fill="var(--cyan)" fontSize="8" fontFamily="var(--font-mono)">ESP32</text>

        {/* Camera */}
        <circle cx="340" cy="140" r="12" fill="none" stroke="var(--mute)" strokeWidth="1" />
        <circle cx="340" cy="140" r="5" fill="var(--mute)" />
        <line x1="340" y1="128" x2="340" y2="120" stroke="var(--mute)" strokeWidth="1" />
        <text x="370" y="143" fill="var(--mute)" fontSize="8" fontFamily="var(--font-mono)">VISION</text>

        {/* MPU6050 */}
        <rect x="160" y="145" width="25" height="16" fill="none" stroke="var(--mute)" strokeWidth="0.8" />
        <text x="100" y="152" fill="var(--mute)" fontSize="7" fontFamily="var(--font-mono)">IMU</text>
        <line x1="133" y1="152" x2="160" y2="153" stroke="var(--line)" strokeWidth="0.5" strokeDasharray="3 2" />

        {/* Gas sensor */}
        <rect x="160" y="170" width="20" height="14" fill="none" stroke="var(--mute)" strokeWidth="0.8" rx="2" />
        <text x="90" y="178" fill="var(--mute)" fontSize="7" fontFamily="var(--font-mono)">VAPOUR</text>
        <text x="95" y="187" fill="var(--mute)" fontSize="7" fontFamily="var(--font-mono)">SENSOR</text>
        <line x1="133" y1="177" x2="160" y2="177" stroke="var(--line)" strokeWidth="0.5" strokeDasharray="3 2" />

        {/* Ultrasonic */}
        <rect x="265" y="145" width="20" height="12" fill="none" stroke="var(--mute)" strokeWidth="0.8" />
        <text x="295" y="153" fill="var(--mute)" fontSize="7" fontFamily="var(--font-mono)">OBSTACLE</text>

        {/* Legs — Front Left */}
        <line x1="160" y1="220" x2="120" y2="260" stroke="var(--bone)" strokeWidth="2" />
        <line x1="120" y1="260" x2="100" y2="310" stroke="var(--bone)" strokeWidth="2" />
        <circle cx="120" cy="260" r="5" fill="none" stroke="var(--line)" strokeWidth="1.5" />
        <circle cx="100" cy="310" r="4" fill="var(--line)" />

        {/* Front Right */}
        <line x1="340" y1="220" x2="380" y2="260" stroke="var(--bone)" strokeWidth="2" />
        <line x1="380" y1="260" x2="400" y2="310" stroke="var(--bone)" strokeWidth="2" />
        <circle cx="380" cy="260" r="5" fill="none" stroke="var(--line)" strokeWidth="1.5" />
        <circle cx="400" cy="310" r="4" fill="var(--line)" />

        {/* Rear Left */}
        <line x1="165" y1="220" x2="130" y2="265" stroke="var(--bone)" strokeWidth="2" />
        <line x1="130" y1="265" x2="115" y2="320" stroke="var(--bone)" strokeWidth="2" />
        <circle cx="130" cy="265" r="5" fill="none" stroke="var(--line)" strokeWidth="1.5" />
        <circle cx="115" cy="320" r="4" fill="var(--line)" />

        {/* Rear Right */}
        <line x1="335" y1="220" x2="370" y2="265" stroke="var(--bone)" strokeWidth="2" />
        <line x1="370" y1="265" x2="385" y2="320" stroke="var(--bone)" strokeWidth="2" />
        <circle cx="370" cy="265" r="5" fill="none" stroke="var(--line)" strokeWidth="1.5" />
        <circle cx="385" cy="320" r="4" fill="var(--line)" />

        {/* Architecture flow */}
        <g transform="translate(50, 380)">
          {['SENSORS', 'ESP32', 'FUSION', 'WIRELESS', 'DASHBOARD'].map((node, i) => (
            <g key={node} transform={`translate(${i * 88}, 0)`}>
              <rect x="0" y="0" width="72" height="22" fill="none" stroke={i === 1 ? 'var(--cyan)' : 'var(--line)'} strokeWidth="0.8" />
              <text x="36" y="14" textAnchor="middle" fill={i === 1 ? 'var(--cyan)' : 'var(--mute)'} fontSize="7" fontFamily="var(--font-mono)">{node}</text>
              {i < 4 && <line x1="73" y1="11" x2="88" y2="11" stroke="var(--line)" strokeWidth="0.8" markerEnd="url(#arrow)" />}
            </g>
          ))}
          <defs>
            <marker id="arrow" viewBox="0 0 6 6" refX="3" refY="3" markerWidth="4" markerHeight="4" orient="auto">
              <path d="M 0 0 L 6 3 L 0 6 z" fill="var(--mute)" />
            </marker>
          </defs>
        </g>

        {/* Remote control indicator */}
        <text x="250" y="100" textAnchor="middle" fill="var(--mute)" fontSize="9" fontFamily="var(--font-mono)">REMOTE CONTROL</text>
        <line x1="250" y1="104" x2="250" y2="120" stroke="var(--line)" strokeWidth="0.8" strokeDasharray="4 3" />
      </svg>

      <p className="mono-xs" style={{ color: 'var(--line)', marginTop: '0.5rem', textAlign: 'center' }}>
        SCHEMATIC — PLACEHOLDER FOR REAL PHOTO
      </p>
    </div>
  )
}

// Aarogya Darpan architecture flow
function AaragyaArchitecture() {
  const nodes = ['PATIENT', 'DOCTOR', 'LAB', 'BED', 'BILLING', 'AI']
  const colors = ['var(--bone)', 'var(--cyan)', 'var(--mute)', 'var(--mute)', 'var(--mute)', 'var(--violet)']

  return (
    <div style={{ width: '100%' }}>
      <svg viewBox="0 0 400 200" aria-label="Aarogya Darpan system architecture" role="img" style={{ width: '100%', height: 'auto' }}>
        {nodes.map((node, i) => {
          const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2
          const cx = 200 + Math.cos(angle) * 80
          const cy = 100 + Math.sin(angle) * 70
          const nAngle = ((i + 1) / nodes.length) * Math.PI * 2 - Math.PI / 2
          const nx = 200 + Math.cos(nAngle) * 80
          const ny = 100 + Math.sin(nAngle) * 70

          return (
            <g key={node}>
              <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="var(--line)" strokeWidth="0.8" />
              <circle cx={cx} cy={cy} r="24" fill="var(--graphite)" stroke={colors[i]} strokeWidth="1" />
              <text x={cx} y={cy + 3} textAnchor="middle" fill={colors[i]} fontSize="7" fontFamily="var(--font-mono)">{node}</text>
            </g>
          )
        })}
        {/* Center label */}
        <text x="200" y="98" textAnchor="middle" fill="var(--mute)" fontSize="7" fontFamily="var(--font-mono)">AAROGYA</text>
        <text x="200" y="108" textAnchor="middle" fill="var(--mute)" fontSize="7" fontFamily="var(--font-mono)">DARPAN</text>
      </svg>
    </div>
  )
}

// GyaanSetu progress flow
function GyaanSetuProgress() {
  const steps = ['LEARN', 'COMPLETE', 'EARN', 'CERTIFY']
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '1rem 0',
        overflowX: 'auto',
      }}
      aria-label="GyaanSetu learning flow"
    >
      {steps.map((step, i) => (
        <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
          <div
            style={{
              border: `1px solid ${i === steps.length - 1 ? 'var(--cyan)' : 'var(--line)'}`,
              padding: '0.3rem 0.7rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              color: i === steps.length - 1 ? 'var(--cyan)' : 'var(--mute)',
            }}
          >
            {step}
          </div>
          {i < steps.length - 1 && (
            <span style={{ color: 'var(--line)', fontSize: '0.65rem' }}>→</span>
          )}
        </div>
      ))}
    </div>
  )
}

interface Props {
  buildModeOn: boolean
}

export default function Builds({ buildModeOn }: Props) {
  const tier1 = PROJECTS.filter(p => p.tier === 1)
  const tier2 = PROJECTS.filter(p => p.tier === 2)
  const tier3 = PROJECTS.filter(p => p.tier === 3)

  return (
    <section
      id="builds"
      className="section"
      aria-labelledby="builds-heading"
      style={{ scrollMarginTop: '64px' }}
    >
      <div className="container">
        {/* Eyebrow + heading */}
        <p className="mono-xs" style={{ color: 'var(--mute)', marginBottom: '1.5rem' }}>03 // SELECTED BUILDS</p>
        <h2 id="builds-heading" className="display-lg" style={{ marginBottom: '1rem', maxWidth: '20ch' }}>
          FROM BROWSER WINDOWS TO MOVING MACHINES.
        </h2>
        <hr className="hairline" style={{ marginBottom: '0' }} />

        {/* Tier 1 — Flagship */}
        {tier1.map(p => (
          <ProjectFeature key={p.id} project={p} buildModeOn={buildModeOn} />
        ))}

        {/* Tier 2 — Product build */}
        <div style={{ marginTop: '4rem' }}>
          <p className="mono-xs" style={{ color: 'var(--mute)', marginBottom: '2rem' }}>PRODUCT BUILDS</p>
          {tier2.map(p => (
            <ProjectCard key={p.id} project={p} buildModeOn={buildModeOn} />
          ))}
        </div>

        {/* Tier 3 — Experiments */}
        <div style={{ marginTop: '4rem' }}>
          <p className="mono-xs" style={{ color: 'var(--mute)', marginBottom: '2rem' }}>ENGINEERING EXPERIMENTS</p>
          {tier3.map(p => (
            <ProjectTile key={p.id} project={p} buildModeOn={buildModeOn} />
          ))}
        </div>
      </div>
    </section>
  )
}
