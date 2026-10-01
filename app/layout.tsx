import type { Metadata } from 'next'
import { fontDisplay, fontBody, fontMono } from '@/lib/fonts'
import { SITE_META, SITE_URL } from '@/data/site'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_META.title,
    template: `%s | Bhavya Jindal`,
  },
  description: SITE_META.description,
  keywords: [
    'Bhavya Jindal',
    'JECRC University',
    'Robotics',
    'Computer Vision',
    'Embedded Systems',
    'AI',
    'Portfolio',
    'B.Tech CSE',
    'Jaipur',
  ],
  authors: [{ name: 'Bhavya Jindal' }],
  openGraph: {
    title: SITE_META.title,
    description: SITE_META.description,
    url: SITE_URL,
    siteName: 'Bhavya Jindal Portfolio',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_META.title,
    description: SITE_META.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_URL,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Bhavya Jindal',
  jobTitle: 'Computer Science Student',
  affiliation: {
    '@type': 'EducationalOrganization',
    name: 'JECRC University',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Jaipur',
      addressCountry: 'IN',
    },
  },
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'JECRC University',
  },
  sameAs: [SITE_META.linkedin, SITE_META.github],
  url: SITE_URL,
  knowsAbout: ['Robotics', 'Computer Vision', 'Embedded Systems', 'Artificial Intelligence', 'Web Development'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {/* Skip to content */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  )
}
