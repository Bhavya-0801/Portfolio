'use client'

import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const raf = useRef<number>(0)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }

    const loop = () => {
      if (glowRef.current) {
        glowRef.current.style.transform =
          `translate(${pos.current.x - 200}px, ${pos.current.y - 200}px)`
      }
      raf.current = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', move, { passive: true })
    raf.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 400,
        height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(25,227,227,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
        willChange: 'transform',
        mixBlendMode: 'screen',
      }}
    />
  )
}
