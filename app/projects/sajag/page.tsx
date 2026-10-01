import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/data/site'

export const metadata: Metadata = {
  title: 'SAJAG — Remote Railway Security Inspection Quadruped',
  description:
    'Case study: SAJAG is a proof-of-concept quadruped robot built for remote security inspection. Built for Smart India Hackathon / JECRC HackQuest by Team Zenith. Tech Lead: Bhavya Jindal.',
  alternates: {
    canonical: `${SITE_URL}/projects/sajag`,
  },
  openGraph: {
    title: 'SAJAG — Remote Inspection Quadruped | Bhavya Jindal',
    description: 'Quadruped locomotion, ESP32 control, camera, IMU, sensor array and operator dashboard. Smart India Hackathon project.',
    url: `${SITE_URL}/projects/sajag`,
    type: 'article',
  },
}

export default function SAJAGCaseStudy() {
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
          onMouseEnter={undefined}
        >
          ← BACK TO BUILDS
        </Link>
      </div>

      <article style={{ padding: 'clamp(3rem, 8vw, 8rem) clamp(1.25rem, 5vw, 5rem)', maxWidth: '900px', margin: '0 auto' }}>

        {/* Eyebrow */}
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'var(--mute)', marginBottom: '1rem', textTransform: 'uppercase' }}>
          CASE STUDY · ROBOTICS / EMBEDDED / SENSOR SYSTEMS
        </p>

        {/* Title */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: 'clamp(3rem, 10vw, 7rem)',
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
            fontVariationSettings: '"wdth" 87.5',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}
        >
          SAJAG
        </h1>

        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.3rem', color: 'var(--mute)', marginBottom: '3rem', fontVariationSettings: '"wdth" 87.5', textTransform: 'uppercase' }}>
          Remote Railway Security Inspection Quadruped
        </p>

        {/* Meta row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', padding: '1.5rem 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', marginBottom: '4rem' }}>
          {[
            { label: 'CONTEXT', value: 'Smart India Hackathon / JECRC HackQuest' },
            { label: 'TEAM', value: 'Team Zenith' },
            { label: 'MY ROLE', value: 'Tech Lead' },
            { label: 'STATUS', value: 'Prototype' },
          ].map(item => (
            <div key={item.label}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--mute)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>{item.label}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--bone)' }}>{item.value}</p>
            </div>
          ))}
        </div>

        {/* OVERVIEW */}
        <section aria-labelledby="sajag-overview">
          <h2 id="sajag-overview" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'var(--cyan)', textTransform: 'uppercase', marginBottom: '1rem' }}>
            01 · OVERVIEW
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--mute)', marginBottom: '2rem' }}>
            SAJAG is a proof-of-concept quadruped robot designed to assist security personnel in inspecting potentially hazardous or suspicious areas remotely — without placing people in direct contact with an unknown situation. The robot can walk, stop, wave, and perform simple gestures on command; it streams a live camera feed, reports orientation data, monitors for anomalous vapour conditions, and is aware of obstacles in front of it. All of this is accessible through a browser-based operator dashboard.
          </p>
        </section>

        {/* PROBLEM */}
        <section aria-labelledby="sajag-problem" style={{ marginTop: '3rem' }}>
          <h2 id="sajag-problem" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'var(--cyan)', textTransform: 'uppercase', marginBottom: '1rem' }}>
            02 · PROBLEM
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.7, color: 'var(--mute)', marginBottom: '1rem' }}>
            Railway security personnel sometimes need to approach areas — dark carriages, under-platform spaces, abandoned equipment — where a visual or sensor scan would be safer than a physical presence. A small, remote-controlled robot that can carry a camera and a basic sensor array could reduce exposure in these situations.
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.7, color: 'var(--mute)' }}>
            The problem is not a solved one; SAJAG is a student prototype that explores what such a system could look like at a hardware-and-software proof-of-concept level.
          </p>
        </section>

        {/* APPROACH */}
        <section aria-labelledby="sajag-approach" style={{ marginTop: '3rem' }}>
          <h2 id="sajag-approach" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'var(--cyan)', textTransform: 'uppercase', marginBottom: '1rem' }}>
            03 · APPROACH
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.7, color: 'var(--mute)', marginBottom: '1rem' }}>
            Four legs, each with a hip and knee joint driven by SG90 servo motors. A PCA9685 I²C servo driver handles the 8 servos (two per leg) so the ESP32 doesn&apos;t run out of PWM channels. An MPU6050 IMU gives orientation data. Ultrasonic sensors detect obstacles. MQ-series gas / vapour sensors flag anomalous atmospheric conditions for human review — they are not precise enough to identify specific substances and are framed accordingly in the operator display.
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.7, color: 'var(--mute)' }}>
            An ESP32-CAM streams video. All sensor data and motor commands travel over a wireless link between the robot and the operator&apos;s browser dashboard.
          </p>
        </section>

        {/* ARCHITECTURE */}
        <section aria-labelledby="sajag-architecture" style={{ marginTop: '3rem' }}>
          <h2 id="sajag-architecture" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'var(--cyan)', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            04 · ARCHITECTURE
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
            <pre>{`HARDWARE SENSORS
├── MPU6050 (I²C)  → orientation / tilt
├── Ultrasonic     → obstacle distance
├── MQ-series      → vapour / gas anomaly flag
└── ESP32-CAM      → live video stream

ESP32 (MAIN PROCESSOR)
├── Reads all sensor data
├── Drives PCA9685 (I²C) → 8 × SG90 servos
├── Parses gait commands → motor sequences
│   (WALK / STOP / HI / DANCE)
└── Wireless link (WebSocket / HTTP)

OPERATOR DASHBOARD (BROWSER)
├── Live camera feed
├── Sensor readouts (IMU, obstacle, vapour)
├── Command buttons
└── Status display`}</pre>
          </div>
        </section>

        {/* MY ROLE */}
        <section aria-labelledby="sajag-role" style={{ marginTop: '3rem' }}>
          <h2 id="sajag-role" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'var(--cyan)', textTransform: 'uppercase', marginBottom: '1rem' }}>
            05 · MY ROLE
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.7, color: 'var(--mute)' }}>
            Tech Lead for Team Zenith. Responsible for the ESP32 firmware, servo gait sequencing, I²C sensor integration (MPU6050, PCA9685), the wireless control layer, and coordination across the hardware and software work done by the team. Also involved in the overall system design: deciding which hardware to use, how the control loop should work, and how sensor data would be presented to the operator.
          </p>
        </section>

        {/* TECH */}
        <section aria-labelledby="sajag-tech" style={{ marginTop: '3rem' }}>
          <h2 id="sajag-tech" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'var(--cyan)', textTransform: 'uppercase', marginBottom: '1rem' }}>
            06 · TECH
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {['ESP32', 'ESP32-CAM', 'PCA9685 Servo Driver', 'SG90 Servos (×8)', 'MPU6050 IMU', 'Ultrasonic Sensor', 'MQ-Series Sensors', 'C++ (Arduino Framework)', 'WebSocket', 'Regulated Battery Power'].map(s => (
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
        <section aria-labelledby="sajag-challenges" style={{ marginTop: '3rem' }}>
          <h2 id="sajag-challenges" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'var(--cyan)', textTransform: 'uppercase', marginBottom: '1rem' }}>
            07 · CHALLENGES
          </h2>
          <ul style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.8, color: 'var(--mute)', paddingLeft: '1.5rem' }}>
            <li>Getting stable quadruped gait sequences that don&apos;t topple the robot under battery load.</li>
            <li>Managing I²C bus conflicts between the MPU6050 and PCA9685 at the right polling rates.</li>
            <li>Keeping the wireless latency low enough for the operator to have meaningful control.</li>
            <li>Power budget: eight servos under load, sensors, ESP32 and camera from a single regulated supply.</li>
            <li>Presenting sensor data (especially vapour readings) accurately — flagging anomalies without overstating what the sensors can conclusively detect.</li>
          </ul>
        </section>

        {/* RESULT */}
        <section aria-labelledby="sajag-result" style={{ marginTop: '3rem' }}>
          <h2 id="sajag-result" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'var(--cyan)', textTransform: 'uppercase', marginBottom: '1rem' }}>
            08 · RESULT
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.7, color: 'var(--mute)' }}>
            A working hardware prototype: SAJAG walks, stops, waves and dances on command from a browser dashboard, streams a live camera feed, and displays IMU, obstacle and vapour sensor readings in real time. Built and demonstrated at JECRC HackQuest (part of Smart India Hackathon) with Team Zenith.
          </p>
        </section>

        {/* NEXT ITERATION */}
        <section aria-labelledby="sajag-next" style={{ marginTop: '3rem', marginBottom: '4rem' }}>
          <h2 id="sajag-next" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'var(--cyan)', textTransform: 'uppercase', marginBottom: '1rem' }}>
            09 · NEXT ITERATION
          </h2>
          <ul style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.8, color: 'var(--mute)', paddingLeft: '1.5rem' }}>
            <li>More robust gait controller for uneven surfaces.</li>
            <li>Improved wireless range and lower-latency video stream.</li>
            <li>Better power management and onboard battery monitoring.</li>
            <li>A more structured operator interface with sensor history graphs.</li>
          </ul>
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
              transition: 'color 0.2s, border-color 0.2s',
            }}
          >
            ← ALL BUILDS
          </Link>
          <Link
            href="/projects/aarogya-darpan"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              color: 'var(--mute)',
              textDecoration: 'none',
              textTransform: 'uppercase',
              padding: '0.75rem 1.5rem',
              border: '1px solid var(--line)',
              transition: 'color 0.2s, border-color 0.2s',
            }}
          >
            NEXT: AAROGYA DARPAN →
          </Link>
        </div>
      </article>
    </main>
  )
}
