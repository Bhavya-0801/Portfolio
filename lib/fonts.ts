import { Archivo, Inter_Tight, JetBrains_Mono } from 'next/font/google'

// Archivo is a variable font — use weight: 'variable' and define axes
export const fontDisplay = Archivo({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  // For variable fonts, don't specify weight + axes together
  // Let the variable font handle weight via CSS font-variation-settings
})

export const fontBody = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

export const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})
