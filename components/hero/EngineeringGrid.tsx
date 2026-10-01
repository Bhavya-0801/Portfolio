'use client'

import { useEffect, useRef } from 'react'

export default function EngineeringGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const mouseRef = useRef({ x: 0, y: 0 })
  const isVisibleRef = useRef(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect()
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
    }

    resize()
    window.addEventListener('resize', resize)

    // Pause when not visible
    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting },
      { threshold: 0 }
    )
    observer.observe(canvas)

    // Track mouse (desktop only)
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    // PCB trace data
    const TRACES = [
      { points: [{ x: 0.1, y: 0.3 }, { x: 0.25, y: 0.3 }, { x: 0.25, y: 0.5 }, { x: 0.45, y: 0.5 }] },
      { points: [{ x: 0.6, y: 0.2 }, { x: 0.6, y: 0.4 }, { x: 0.8, y: 0.4 }, { x: 0.8, y: 0.7 }] },
      { points: [{ x: 0.15, y: 0.7 }, { x: 0.35, y: 0.7 }, { x: 0.35, y: 0.85 }] },
    ]

    let pulseT = 0

    function draw() {
      if (!ctx || !canvas) return
      const W = canvas.getBoundingClientRect().width
      const H = canvas.getBoundingClientRect().height
      if (W === 0 || H === 0) return

      ctx.clearRect(0, 0, W, H)

      const GRID = 40
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      // Main grid
      ctx.strokeStyle = 'rgba(34, 37, 43, 0.8)'
      ctx.lineWidth = 0.5
      ctx.beginPath()
      for (let x = 0; x < W; x += GRID) {
        ctx.moveTo(x, 0)
        ctx.lineTo(x, H)
      }
      for (let y = 0; y < H; y += GRID) {
        ctx.moveTo(0, y)
        ctx.lineTo(W, y)
      }
      ctx.stroke()

      // Grid nodes — cursor brightness
      for (let xi = 0; xi < W; xi += GRID) {
        for (let yi = 0; yi < H; yi += GRID) {
          const dist = Math.hypot(xi - mx, yi - my)
          const brightness = Math.max(0, 1 - dist / 200)
          if (brightness > 0.05) {
            ctx.fillStyle = `rgba(25, 227, 227, ${brightness * 0.3})`
            ctx.beginPath()
            ctx.arc(xi, yi, 1.5, 0, Math.PI * 2)
            ctx.fill()
          } else {
            ctx.fillStyle = 'rgba(34, 37, 43, 0.6)'
            ctx.beginPath()
            ctx.arc(xi, yi, 1, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }

      if (!prefersReduced) {
        // PCB traces
        TRACES.forEach((trace, ti) => {
          ctx.strokeStyle = 'rgba(34, 37, 43, 1)'
          ctx.lineWidth = 1
          ctx.beginPath()
          trace.points.forEach((pt, pi) => {
            const ax = pt.x * W
            const ay = pt.y * H
            if (pi === 0) ctx.moveTo(ax, ay)
            else ctx.lineTo(ax, ay)
          })
          ctx.stroke()

          // Pulse along trace
          const totalPts = trace.points.length - 1
          const cycleOffset = ti * 0.33
          const progress = ((pulseT + cycleOffset) % 1)
          const segIdx = Math.floor(progress * totalPts)
          const segProgress = (progress * totalPts) % 1

          if (segIdx < totalPts) {
            const a = trace.points[segIdx]
            const b = trace.points[segIdx + 1]
            const px = (a.x + (b.x - a.x) * segProgress) * W
            const py = (a.y + (b.y - a.y) * segProgress) * H
            const grad = ctx.createRadialGradient(px, py, 0, px, py, 8)
            grad.addColorStop(0, 'rgba(25, 227, 227, 0.9)')
            grad.addColorStop(1, 'rgba(25, 227, 227, 0)')
            ctx.fillStyle = grad
            ctx.beginPath()
            ctx.arc(px, py, 8, 0, Math.PI * 2)
            ctx.fill()
          }
        })

        // Crosshair markers
        const MARKERS = [
          { x: 0.2, y: 0.25 }, { x: 0.75, y: 0.6 }, { x: 0.5, y: 0.85 }
        ]
        ctx.strokeStyle = 'rgba(34, 37, 43, 0.8)'
        ctx.lineWidth = 0.5
        MARKERS.forEach(m => {
          const mx = m.x * W
          const my = m.y * H
          const S = 6
          ctx.beginPath()
          ctx.moveTo(mx - S, my)
          ctx.lineTo(mx + S, my)
          ctx.moveTo(mx, my - S)
          ctx.lineTo(mx, my + S)
          ctx.arc(mx, my, S * 0.7, 0, Math.PI * 2)
          ctx.stroke()
        })

        // Coordinate labels
        ctx.font = '10px "JetBrains Mono", monospace'
        ctx.fillStyle = 'rgba(34, 37, 43, 0.9)'
        ctx.fillText(`X: ${Math.round(mx)}  Y: ${Math.round(my)}`, 16, H - 16)

        pulseT += 0.003
      }
    }

    function loop() {
      if (isVisibleRef.current) draw()
      rafRef.current = requestAnimationFrame(loop)
    }

    // Static render for reduced motion
    if (prefersReduced) {
      draw()
    } else {
      loop()
    }

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      observer.disconnect()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="hero__grid-canvas"
      aria-hidden="true"
      style={{ width: '100%', height: '100%' }}
    />
  )
}
