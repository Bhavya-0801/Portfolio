'use client'

const MARQUEE_LINE_1 =
  'ROBOTICS ⬡ COMPUTER VISION ⬡ EMBEDDED SYSTEMS ⬡ AI ⬡ PROTOTYPING ⬡ WEB DEVELOPMENT ⬡ BUILD / TEST / ITERATE ⬡ '

const MARQUEE_LINE_2 =
  'SENSOR FUSION ⊕ ESP32 ⊕ OPENCV ⊕ NEXT.JS ⊕ ARDUINO ⊕ PYTHON ⊕ TYPESCRIPT ⊕ SERVO CONTROL ⊕ '

export default function MarqueeStrip() {
  return (
    <div aria-hidden="true" role="presentation">
      {/* Screen-reader version */}
      <p className="sr-only">
        Skills and technologies: Robotics, Computer Vision, Embedded Systems, AI, Prototyping, Web Development, Build / Test / Iterate, Sensor Fusion, ESP32, OpenCV, Next.js, Arduino, Python, TypeScript, Servo Control
      </p>

      {/* Line 1 — moves left */}
      <div className="marquee-track">
        <div className="marquee-inner" aria-hidden="true">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="marquee-item">
              {MARQUEE_LINE_1}
            </span>
          ))}
        </div>
      </div>

      {/* Line 2 — outlined, moves right */}
      <div className="marquee-track" style={{ borderTop: 'none' }}>
        <div className="marquee-inner marquee-inner--reverse" aria-hidden="true">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="marquee-item marquee-item--outline">
              {MARQUEE_LINE_2}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
