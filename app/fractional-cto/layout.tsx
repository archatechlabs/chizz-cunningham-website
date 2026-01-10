import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fractional CTO Services',
  description: 'Fractional CTO services for startups and growing companies. I help founders architect, ship, and scale software through Archatech Labs.',
  keywords: ['Fractional CTO', 'Startup CTO', 'Technical Leadership', 'Software Architecture', 'CTO for Hire', 'Archatech Labs', 'Chizz Cunningham'],
  alternates: {
    canonical: '/fractional-cto',
  },
  openGraph: {
    title: 'Fractional CTO Services | Chizz Cunningham',
    description: 'Fractional CTO services for startups and growing companies. Architect, ship, and scale software with senior technical leadership.',
    url: 'https://www.chizzcunningham.com/fractional-cto',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fractional CTO Services | Chizz Cunningham',
    description: 'Fractional CTO services for startups and growing companies. Architect, ship, and scale software with senior technical leadership.',
  },
}

export default function FractionalCTOLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}


