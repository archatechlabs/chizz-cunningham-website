import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import MotionProvider from '@/components/MotionProvider'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const CANONICAL_DOMAIN = 'https://www.chizzcunningham.com'

export const metadata: Metadata = {
  metadataBase: new URL(CANONICAL_DOMAIN),
  title: 'Chizz Cunningham | Tech Entrepreneur, Builder & Fractional CTO',
  description: 'Chizz Cunningham is a tech entrepreneur, investor, and fractional CTO. Through Archatech Labs, he helps startups architect, scale, and operationalize technology with clarity and precision.',
  keywords: ['Chizz Cunningham', 'Tech Entrepreneur', 'Fractional CTO', 'Startup CTO', 'Archatech Labs', 'Software Architecture', 'Technology Leadership', 'Baron Davis Enterprises', 'Investor'],
  authors: [{ name: 'Chizz Cunningham' }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Chizz Cunningham | Tech Entrepreneur, Builder & Fractional CTO',
    description: 'Tech entrepreneur and fractional CTO helping startups build and scale technology through Archatech Labs.',
    url: CANONICAL_DOMAIN,
    siteName: 'Chizz Cunningham',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chizz Cunningham | Tech Entrepreneur, Builder & Fractional CTO',
    description: 'Tech entrepreneur and fractional CTO helping startups build and scale technology through Archatech Labs.',
    creator: '@chizzcunningham',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="canonical" href={CANONICAL_DOMAIN} />
      </head>
      <body className="font-sans antialiased bg-off-white">
        <MotionProvider>
          {children}
        </MotionProvider>
      </body>
    </html>
  )
}
