'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

const LINES = [
  { text: 'BHAVYA_OS  v2026', isTitle: true },
  { text: 'INITIALIZING //', isTitle: false },
  { text: 'MOTION SYSTEM ........ READY', isReady: true },
  { text: 'VISION SYSTEM ........ READY', isReady: true },
  { text: 'AI MODULE ............ READY', isReady: true },
  { text: 'INTERFACE ............ READY', isReady: true },
  { text: 'BHAVYA JINDAL · PORTFOLIO / 2026', isTitle: false },
]

export default function Preloader() {
  const [visible, setVisible] = useState(true)
  const [counter, setCounter] = useState(0)
  const [lineStates, setLineStates] = useState<boolean[]>(LINES.map(() => false))
  const containerRef = useRef<HTMLDivElement>(null)

  const dismiss = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.style.transition = 'opacity 0.3s ease, transform 0.3s ease'
      containerRef.current.style.opacity = '0'
      containerRef.current.style.transform = 'translateY(-6px)'
      containerRef.current.style.pointerEvents = 'none'
    }
    const t = setTimeout(() => {
      setVisible(false)
      try { sessionStorage.setItem('preloader-shown', '1') } catch { /* ignore */ }
    }, 320)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    // Check sessionStorage — skip on repeat visits
    try {
      if (sessionStorage.getItem('preloader-shown') === '1') {
        const timer = setTimeout(() => setVisible(false), 0)
        return () => clearTimeout(timer)
      }
    } catch { /* ignore */ }

    // Keyboard listener for Escape to skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') {
        dismiss()
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    // Animate lines in sequence
    const delays = [0, 180, 380, 560, 740, 920, 1100]
    const timers: ReturnType<typeof setTimeout>[] = []

    delays.forEach((delay, i) => {
      timers.push(
        setTimeout(() => {
          setLineStates(prev => {
            const next = [...prev]
            next[i] = true
            return next
          })
        }, delay)
      )
    })

    // Counter animation
    let start = 0
    const totalMs = 1500
    const step = 25
    const increment = 100 / (totalMs / step)
    const counterTimer = setInterval(() => {
      start += increment
      if (start >= 100) {
        setCounter(100)
        clearInterval(counterTimer)
      } else {
        setCounter(Math.floor(start))
      }
    }, step)

    // Auto-hide after 1.8s
    const hideTimer = setTimeout(() => {
      dismiss()
    }, 1800)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      timers.forEach(clearTimeout)
      clearTimeout(hideTimer)
      clearInterval(counterTimer)
    }
  }, [dismiss])

  if (!visible) return null

  return (
    <div
      ref={containerRef}
      className="preloader"
      role="status"
      aria-live="polite"
      onClick={dismiss}
      title="Click or press Esc to skip"
      style={{ cursor: 'pointer' }}
    >
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '24px',
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '11px',
          letterSpacing: '0.1em',
          color: 'var(--mute, #888)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '4px 10px',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '2px',
        }}
      >
        <span>[ SKIP ESC ]</span>
      </div>

      {LINES.map((line, i) => (
        <div
          key={i}
          className={
            line.isTitle
              ? 'preloader__title'
              : line.isReady
              ? 'preloader__line preloader__line--ready'
              : 'preloader__line'
          }
          style={{
            opacity: lineStates[i] ? 1 : 0,
            transform: lineStates[i] ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.25s, transform 0.25s',
          }}
        >
          {line.text}
        </div>
      ))}
      <div
        className="preloader__counter"
        style={{ opacity: counter > 0 ? 1 : 0 }}
      >
        {String(counter).padStart(2, '0')}%
      </div>
    </div>
  )
}
