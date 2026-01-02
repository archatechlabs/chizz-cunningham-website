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

export const metadata: Metadata = {
  title: 'Chizz Cunningham | Tech Entrepreneur & Investor',
  description: 'Building the systems behind the future of culture, technology, and ownership. Tech Entrepreneur, Investor, and Founder of MyPal4Life, SkyLi, and History of the Game.',
  keywords: ['Chizz Cunningham', 'Tech Entrepreneur', 'Investor', 'MyPal4Life', 'SkyLi', 'History of the Game'],
  authors: [{ name: 'Chizz Cunningham' }],
  openGraph: {
    title: 'Chizz Cunningham | Tech Entrepreneur & Investor',
    description: 'Building the systems behind the future of culture, technology, and ownership.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-off-white">
        <MotionProvider>
          {children}
        </MotionProvider>
      </body>
    </html>
  )
}
