'use client'

// GSAP plugin registration — client-only singleton
// Import this in any component that needs GSAP/ScrollTrigger/etc.

let registered = false

export async function registerGSAP() {
  if (registered) return
  registered = true

  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  const { TextPlugin } = await import('gsap/TextPlugin')

  gsap.registerPlugin(ScrollTrigger, TextPlugin)

  return { gsap, ScrollTrigger }
}

export { }
