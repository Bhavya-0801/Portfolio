'use client'

import { useRef, useCallback } from 'react'

interface Props {
  children: React.ReactNode
  intensity?: number
  className?: string
  style?: React.CSSProperties
}

export default function TiltCard({ children, intensity = 15, className, style }: Props) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width  - 0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5
    el.style.transform = `perspective(800px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) scale3d(1.02,1.02,1.02)`
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(25,227,227,0.12) 0%, transparent 65%)`
    }
  }, [intensity])

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current
    if (!el) return
    el.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)'
    if (glowRef.current) glowRef.current.style.background = 'transparent'
  }, [])

  return (
    <div
      ref={cardRef}
      className={className}
      style={{
        ...style,
        transition: 'transform 0.15s ease-out',
        willChange: 'transform',
        position: 'relative',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={glowRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1,
          transition: 'background 0.2s',
        }}
      />
      {children}
    </div>
  )
}
