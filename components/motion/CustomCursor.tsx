'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouse   = useRef({ x: 0, y: 0 })
  const ring    = useRef({ x: 0, y: 0 })
  const raf     = useRef<number>(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`
        dotRef.current.style.top  = `${e.clientY}px`
      }
    }

    const onEnterLink = () => {
      if (!ringRef.current) return
      ringRef.current.style.width  = '52px'
      ringRef.current.style.height = '52px'
      ringRef.current.style.borderColor = 'var(--cyan)'
    }
    const onLeaveLink = () => {
      if (!ringRef.current) return
      ringRef.current.style.width  = '32px'
      ringRef.current.style.height = '32px'
      ringRef.current.style.borderColor = 'rgba(25,227,227,0.5)'
    }

    const loop = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`
        ringRef.current.style.top  = `${ring.current.y}px`
      }
      raf.current = requestAnimationFrame(loop)
    }

    const links = document.querySelectorAll('a, button, [role="button"], [tabindex="0"]')
    links.forEach(el => {
      el.addEventListener('mouseenter', onEnterLink)
      el.addEventListener('mouseleave', onLeaveLink)
    })

    window.addEventListener('mousemove', onMove, { passive: true })
    raf.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
      links.forEach(el => {
        el.removeEventListener('mouseenter', onEnterLink)
        el.removeEventListener('mouseleave', onLeaveLink)
      })
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
