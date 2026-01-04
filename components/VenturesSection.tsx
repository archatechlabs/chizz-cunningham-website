'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import Image from 'next/image'

type VentureCategory = 'All' | 'AI' | 'Web3' | 'Gaming' | 'Consumer'

interface Venture {
  name: string
  mission: string
  differentiator: string
  credibility: string
  link: string
  external?: boolean
  categories: VentureCategory[]
  fullDescription?: string
  logo?: string
}

const ventures: Venture[] = [
  {
    name: 'Archatech Labs',
    mission: 'Product studio and engineering for ambitious startups and enterprise.',
    differentiator: 'Not just code—strategic product development from zero-to-one, with a focus on consumer tech and Web3.',
    credibility: 'Full-stack product studio',
    link: 'https://archatechlabs.com',
    external: true,
    categories: ['AI', 'Web3', 'Consumer'],
    fullDescription: 'Archatech Labs is a product studio that partners with visionary founders and enterprises to build transformative technology products. From concept to scale, we provide strategic product development, engineering excellence, and deep expertise in AI, Web3, and consumer technology.',
    logo: '/Logos/Archatech-Labs-Logo-1.png',
  },
  {
    name: 'MyPal4Life + SkyLi',
    mission: 'Smart pet health ecosystem powered by proprietary hardware, AI, and blockchain incentives.',
    differentiator: 'End-to-end platform: SkyLi smart collar with medical-grade sensors tracks vitals 24/7, while MyPal4Life rewards pet owners for proactive wellness.',
    credibility: 'Hardware + Software + AI + Web3',
    link: '#contact',
    categories: ['AI', 'Web3', 'Consumer'],
    fullDescription: 'MyPal4Life and SkyLi together represent a complete reimagining of pet healthcare. The SkyLi smart collar uses proprietary medical-grade sensors to continuously monitor your pet\'s vital signs, activity levels, and behavioral patterns. This data feeds into MyPal4Life\'s AI-powered platform, which provides actionable health insights and rewards pet owners with blockchain-based incentives for maintaining their pet\'s wellness.',
    logo: '/Logos/Neighborhood_ta;es_logo.png',
  },
  {
    name: 'History of the Game',
    mission: 'Basketball storytelling meets Web3 and immersive virtual experiences.',
    differentiator: 'Preserving basketball culture through digital collectibles, documentary content, and virtual world integration.',
    credibility: 'Web3 + Media + Gaming convergence',
    link: 'https://historyofthegame.io',
    external: true,
    categories: ['Web3', 'Gaming'],
    fullDescription: 'History of the Game is a multimedia platform preserving and celebrating basketball culture through cutting-edge technology. From exclusive documentary content and digital collectibles to immersive virtual world experiences, we\'re creating a new way for fans to connect with the sport\'s rich history and legendary players.',
    logo: '/Logos/HOTG_Logo_transparent.png',
  },
  {
    name: 'Oatmeal Radio Café',
    mission: 'Music, coffee, and technology—unified under creator-first economics.',
    differentiator: 'A new model where artists, venues, and fans share ownership in the cultural experiences they create together.',
    credibility: 'Creator economy platform',
    link: '#contact',
    categories: ['Web3', 'Consumer'],
    fullDescription: 'Oatmeal Radio Café reimagines the relationship between artists, venues, and fans. By leveraging Web3 technology, we\'re building a platform where everyone who contributes to cultural experiences shares in the value they create. From live performances to recorded content, ownership flows back to the community.',
    logo: '/Logos/oatmeal_radio_cafe_logo.jpg',
  },
  {
    name: 'Neighborhood Tales',
    mission: 'Gaming and virtual world experiences rooted in culture and community.',
    differentiator: 'Building digital spaces that celebrate real neighborhoods, real stories, and authentic cultural representation.',
    credibility: 'Gaming + Culture IP development',
    link: '#contact',
    categories: ['Gaming', 'Consumer'],
    fullDescription: 'Neighborhood Tales creates gaming and virtual world experiences that authentically represent diverse communities and their stories. We\'re building digital spaces where real neighborhoods, real histories, and real cultural expressions come to life—giving underrepresented communities ownership of their narratives in the digital age.',
    logo: '/Logos/Neighborhood_ta;es_logo.png',
  },
]

const filters: VentureCategory[] = ['All', 'AI', 'Web3', 'Gaming', 'Consumer']

export default function VenturesSection() {
  const [activeFilter, setActiveFilter] = useState<VentureCategory>('All')
  const [selectedVenture, setSelectedVenture] = useState<Venture | null>(null)
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const filteredVentures = activeFilter === 'All'
    ? ventures
    : ventures.filter((v) => v.categories.includes(activeFilter))

  // Close modal on escape and click outside
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedVenture(null)
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setSelectedVenture(null)
      }
    }

    if (selectedVenture) {
      document.addEventListener('keydown', handleEscape)
      document.addEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = ''
    }
  }, [selectedVenture])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
  }

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('#')) return
    e.preventDefault()
    setSelectedVenture(null)
    setTimeout(() => {
      const target = document.querySelector(href)
      if (target) {
        const offset = 80
        const elementPosition = target.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.scrollY - offset
        window.scrollTo({
          top: offsetPosition,
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
        })
      }
    }, 100)
  }, [prefersReducedMotion])

  return (
    <>
      <section 
        ref={sectionRef}
        id="ventures" 
        aria-labelledby="ventures-heading"
        className="w-full max-w-hero mx-auto py-24 md:py-32"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-[#8A8A8A] text-xs sm:text-sm font-medium tracking-[0.2em] uppercase mb-4">
            Portfolio
          </p>
          <h2 
            id="ventures-heading"
            className="font-serif text-[#1A1A1C] text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] tracking-[-0.02em] mb-4"
          >
            Ventures
          </h2>
          <p className="text-[#6A6A6A] text-base md:text-lg max-w-2xl mx-auto">
            Companies I've founded at the intersection of culture, technology, and ownership.
          </p>
        </motion.div>

        {/* Filter Chips */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12 md:mb-16"
          role="group"
          aria-label="Filter ventures by category"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1A1A1C] focus:ring-offset-2 ${
                activeFilter === filter
                  ? 'bg-[#1A1A1C] text-white'
                  : 'bg-white text-[#4A4A4A] border border-[#E8E8E6] hover:border-[#C0C0BE] hover:bg-[#F8F8F6]'
              }`}
              aria-pressed={activeFilter === filter}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Ventures Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredVentures.map((venture, index) => (
              <motion.article
                key={venture.name}
                variants={itemVariants}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
                whileHover={prefersReducedMotion ? {} : { y: -4 }}
                onClick={() => setSelectedVenture(venture)}
                className="group relative flex flex-col p-8 md:p-10 bg-[#1A1A1C] rounded-2xl overflow-hidden cursor-pointer transition-shadow duration-500 hover:shadow-2xl hover:shadow-black/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                style={{ minHeight: '320px' }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedVenture(venture)}
                aria-label={`View details for ${venture.name}`}
              >
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#252528] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex flex-col gap-3">
                      {venture.logo && (
                        <div className="relative h-8 w-auto">
                          <Image
                            src={venture.logo}
                            alt={`${venture.name} logo`}
                            width={140}
                            height={32}
                            className="h-8 w-auto object-contain brightness-0 invert"
                          />
                        </div>
                      )}
                      <h3 className="font-serif text-white text-2xl md:text-[28px] leading-tight tracking-[-0.01em]">
                        {venture.name}
                      </h3>
                    </div>
                    <span className="text-[#4A4A4A] text-xs font-medium tracking-wider uppercase shrink-0 ml-4 group-hover:text-[#6A6A6A] transition-colors">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Mission */}
                  <p className="text-[#B8B8B8] text-base md:text-lg leading-relaxed mb-4 flex-grow">
                    {venture.mission}
                  </p>

                  {/* Differentiator */}
                  <p className="text-[#7A7A7A] text-sm leading-relaxed mb-6 border-l-2 border-[#3A3A3A] pl-4">
                    {venture.differentiator}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-[#2A2A2C]">
                    {/* Category Tags */}
                    <div className="flex flex-wrap gap-2">
                      {venture.categories.slice(0, 2).map((cat) => (
                        <span
                          key={cat}
                          className="px-2 py-1 text-[10px] font-medium tracking-wider uppercase bg-[#2A2A2C] text-[#6A6A6A] rounded"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>

                    {/* View Details */}
                    <span className="inline-flex items-center text-[#D0D0D0] text-sm font-medium group-hover:text-white transition-colors duration-200">
                      View Details
                      <motion.svg
                        animate={prefersReducedMotion ? {} : { x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        className="ml-2 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </motion.svg>
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Modal/Drawer */}
      <AnimatePresence>
        {selectedVenture && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop bg-black/60"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="p-8 md:p-10 pb-0">
                <button
                  onClick={() => setSelectedVenture(null)}
                  className="absolute top-6 right-6 p-2 text-[#8A8A8A] hover:text-[#1A1A1C] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1A1A1C] rounded"
                  aria-label="Close modal"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedVenture.categories.map((cat) => (
                    <span
                      key={cat}
                      className="px-3 py-1 text-xs font-medium tracking-wider uppercase bg-[#F0F0EE] text-[#6A6A6A] rounded-full"
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                {selectedVenture.logo && (
                  <div className="relative h-10 w-auto mb-3">
                    <Image
                      src={selectedVenture.logo}
                      alt={`${selectedVenture.name} logo`}
                      width={180}
                      height={40}
                      className="h-10 w-auto object-contain"
                    />
                  </div>
                )}
                <h3 id="modal-title" className="font-serif text-[#1A1A1C] text-3xl md:text-4xl leading-tight mb-2">
                  {selectedVenture.name}
                </h3>
                <p className="text-[#6A6A6A] text-base font-medium mb-6">
                  {selectedVenture.credibility}
                </p>
              </div>

              {/* Content */}
              <div className="px-8 md:px-10 pb-8 md:pb-10">
                <p className="text-[#4A4A4A] text-lg leading-relaxed mb-8">
                  {selectedVenture.fullDescription || selectedVenture.differentiator}
                </p>

                {/* CTA */}
                <div className="flex flex-wrap gap-4">
                  {selectedVenture.external ? (
                    <a
                      href={selectedVenture.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-[#1A1A1C] text-white text-sm font-medium rounded-full hover:bg-[#2A2A2C] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1A1A1C] focus:ring-offset-2"
                    >
                      Visit Site
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ) : (
                    <a
                      href="#contact"
                      onClick={(e) => handleNavClick(e, '#contact')}
                      className="inline-flex items-center px-6 py-3 bg-[#1A1A1C] text-white text-sm font-medium rounded-full hover:bg-[#2A2A2C] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1A1A1C] focus:ring-offset-2"
                    >
                      Get in Touch
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedVenture(null)}
                    className="inline-flex items-center px-6 py-3 border border-[#E8E8E6] text-[#4A4A4A] text-sm font-medium rounded-full hover:bg-[#F8F8F6] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1A1A1C] focus:ring-offset-2"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
