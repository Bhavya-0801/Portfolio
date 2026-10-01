import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/data/site'

export const metadata: Metadata = {
  title: 'Aarogya Darpan — AI-Powered Hospital Management Platform',
  description:
    'Case study: Aarogya Darpan is a full-stack Next.js hospital management platform covering patient management, appointments, digital records, bed tracking, lab workflows, billing and AI modules. Presented at VishwaNova 2026, MIT-WPU.',
  alternates: {
    canonical: `${SITE_URL}/projects/aarogya-darpan`,
  },
  openGraph: {
    title: 'Aarogya Darpan | Bhavya Jindal',
    description: 'Full-stack hospital management software prototype. Presented at VishwaNova 2026, MIT-WPU.',
    url: `${SITE_URL}/projects/aarogya-darpan`,
    type: 'article',
  },
}

export default function AaragyaDarpanCaseStudy() {
  return (
    <main id="main-content" style={{ background: 'var(--ink)', minHeight: '100vh', color: 'var(--bone)' }}>

      {/* Back link */}
      <div style={{ padding: '2rem clamp(1.25rem, 5vw, 5rem)', borderBottom: '1px solid var(--line)' }}>
        <Link
          href="/#builds"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            color: 'var(--mute)',
            textDecoration: 'none',
            textTransform: 'uppercase',
          }}
        >
          ← BACK TO BUILDS
        </Link>
      </div>

      <article style={{ padding: 'clamp(3rem, 8vw, 8rem) clamp(1.25rem, 5vw, 5rem)', maxWidth: '900px', margin: '0 auto' }}>

        {/* Eyebrow */}
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'var(--mute)', marginBottom: '1rem', textTransform: 'uppercase' }}>
          CASE STUDY · FULL STACK / HEALTHCARE / AI
        </p>

        {/* Title */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: 'clamp(2rem, 8vw, 5.5rem)',
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
            fontVariationSettings: '"wdth" 87.5',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}
        >
          AAROGYA DARPAN
        </h1>

        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem', color: 'var(--mute)', marginBottom: '1rem', fontVariationSettings: '"wdth" 87.5', textTransform: 'uppercase' }}>
          AI-Powered Digital Hospital Management Platform
        </p>

        {/* Live demo link */}
        <div style={{ marginBottom: '3rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a
            href="https://aarogya-darpan.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              color: 'var(--cyan)',
              textDecoration: 'none',
              textTransform: 'uppercase',
              padding: '0.6rem 1.2rem',
              border: '1px solid var(--cyan)',
            }}
          >
            LIVE DEMO ↗
          </a>
          <a
            href="https://github.com/Bhavya-0801/Aarogya-Darpan"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              color: 'var(--mute)',
              textDecoration: 'none',
              textTransform: 'uppercase',
              padding: '0.6rem 1.2rem',
              border: '1px solid var(--line)',
            }}
          >
            VIEW SOURCE ↗
          </a>
        </div>

        {/* Meta row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', padding: '1.5rem 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', marginBottom: '4rem' }}>
          {[
            { label: 'PRESENTED AT', value: 'VishwaNova 2026, MIT-WPU (National Level)' },
            { label: 'CATEGORY', value: 'Project Competition' },
            { label: 'STATUS', value: 'Live Demo — Software Prototype' },
          ].map(item => (
            <div key={item.label}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--mute)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>{item.label}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--bone)' }}>{item.value}</p>
            </div>
          ))}
        </div>

        {/* OVERVIEW */}
        <section aria-labelledby="ad-overview">
          <h2 id="ad-overview" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'var(--cyan)', textTransform: 'uppercase', marginBottom: '1rem' }}>
            01 · OVERVIEW
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--mute)', marginBottom: '1rem' }}>
            Aarogya Darpan is a full-stack Next.js platform that tries to bring together the core workflows of a hospital&apos;s information system into one place: patient registration and records, appointment scheduling, bed management, lab order tracking, billing, and role-specific dashboards for different clinical and administrative staff. On top of that, it includes an AI symptom checker and an AI health assistant.
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.7, color: 'var(--mute)' }}>
            This is a software prototype — it is not a certified medical product, and no medical-efficacy claims are made.
          </p>
        </section>

        {/* APPROACH */}
        <section aria-labelledby="ad-approach" style={{ marginTop: '3rem' }}>
          <h2 id="ad-approach" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'var(--cyan)', textTransform: 'uppercase', marginBottom: '1rem' }}>
            02 · APPROACH
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.7, color: 'var(--mute)' }}>
            Built with the Next.js App Router, TypeScript, Tailwind CSS, and MongoDB (via Mongoose). Authentication is handled by NextAuth. Data validation uses Zod schemas. The dashboard includes charts rendered with Recharts. The AI features integrate with the OpenAI API. The application is deployed on Vercel.
          </p>
        </section>

        {/* ARCHITECTURE */}
        <section aria-labelledby="ad-architecture" style={{ marginTop: '3rem' }}>
          <h2 id="ad-architecture" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'var(--cyan)', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            03 · ARCHITECTURE
          </h2>
          <div
            style={{
              background: 'var(--graphite)',
              border: '1px solid var(--line)',
              padding: '2rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              lineHeight: 2,
              color: 'var(--mute)',
              overflowX: 'auto',
            }}
          >
            <pre>{`FRONTEND (Next.js App Router)
├── Role-specific portals
│   ├── Admin dashboard
│   ├── Doctor view
│   ├── Lab staff view
│   └── Patient portal
├── Appointment scheduling UI
├── Medical records viewer
├── Bed management board
├── Billing interface
└── AI symptom checker + assistant

API LAYER (Next.js Route Handlers)
├── Patient CRUD
├── Appointment management
├── Lab order tracking
├── Bed availability
├── Billing workflows
└── AI endpoints (OpenAI integration)

DATABASE
└── MongoDB (Mongoose ODM)
    ├── Patient model
    ├── Appointment model
    ├── Medical record model
    └── Billing model

AUTH
└── NextAuth.js (role-based sessions)`}</pre>
          </div>
        </section>

        {/* TECH */}
        <section aria-labelledby="ad-tech" style={{ marginTop: '3rem' }}>
          <h2 id="ad-tech" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'var(--cyan)', textTransform: 'uppercase', marginBottom: '1rem' }}>
            04 · TECH
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {['Next.js (App Router)', 'React', 'TypeScript', 'Tailwind CSS', 'NextAuth', 'MongoDB', 'Mongoose', 'OpenAI API', 'Zod', 'Recharts', 'Vercel'].map(s => (
              <span
                key={s}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.08em',
                  padding: '0.2rem 0.6rem',
                  border: '1px solid var(--line)',
                  color: 'var(--mute)',
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* CHALLENGES */}
        <section aria-labelledby="ad-challenges" style={{ marginTop: '3rem' }}>
          <h2 id="ad-challenges" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'var(--cyan)', textTransform: 'uppercase', marginBottom: '1rem' }}>
            05 · CHALLENGES
          </h2>
          <ul style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.8, color: 'var(--mute)', paddingLeft: '1.5rem' }}>
            <li>Designing data models that could handle the relationships between patients, appointments, lab orders and billing without becoming a maintenance problem.</li>
            <li>Role-based access control: ensuring each user type sees only the data and actions relevant to their role.</li>
            <li>Integrating AI features responsibly — the symptom checker flags possible areas for clinical attention, not diagnoses.</li>
            <li>Making the UI usable across the different workflows (scheduling is very different from lab order tracking).</li>
          </ul>
        </section>

        {/* RESULT */}
        <section aria-labelledby="ad-result" style={{ marginTop: '3rem', marginBottom: '4rem' }}>
          <h2 id="ad-result" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'var(--cyan)', textTransform: 'uppercase', marginBottom: '1rem' }}>
            06 · RESULT
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.7, color: 'var(--mute)' }}>
            A working full-stack platform deployed on Vercel, with a live demo available. Presented at VishwaNova 2026, a national-level project competition held at MIT-WPU.
          </p>
        </section>

        {/* Navigation */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '2rem 0',
            borderTop: '1px solid var(--line)',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <Link
            href="/projects/sajag"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              color: 'var(--mute)',
              textDecoration: 'none',
              textTransform: 'uppercase',
              padding: '0.75rem 1.5rem',
              border: '1px solid var(--line)',
            }}
          >
            ← SAJAG
          </Link>
          <Link
            href="/#builds"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              color: 'var(--mute)',
              textDecoration: 'none',
              textTransform: 'uppercase',
              padding: '0.75rem 1.5rem',
              border: '1px solid var(--line)',
            }}
          >
            ALL BUILDS →
          </Link>
        </div>
      </article>
    </main>
  )
}
