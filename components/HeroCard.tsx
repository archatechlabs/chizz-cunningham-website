'use client'

import Image from 'next/image'
import { useState, useCallback } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function HeroCard() {
  const [imageError, setImageError] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  
  const { scrollY } = useScroll()
  const parallaxY = useTransform(scrollY, [0, 500], [0, 50])

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
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
  }, [prefersReducedMotion])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
        delayChildren: prefersReducedMotion ? 0 : 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  }

  const headlineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
      },
    },
  }

  const lineVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] as const },
    },
  }

  return (
    <section id="hero" aria-label="Hero" className="w-full max-w-hero mx-auto">
      {/* Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full rounded-hero overflow-hidden"
        style={{
          boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.15), 0 10px 25px -8px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Card Grid - Desktop: side by side, Mobile: stacked */}
        <div className="grid grid-cols-1 md:grid-cols-[55%_45%] min-h-[580px] md:min-h-[600px]">
          
          {/* Left Column - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="order-2 md:order-1 flex flex-col justify-center px-6 py-14 sm:px-10 sm:py-16 md:px-14 md:py-[72px] lg:pl-16 lg:pr-12 relative"
            style={{
              background: 'linear-gradient(135deg, #0B0B0C 0%, #1A1A1C 100%)',
            }}
          >
            {/* Eyebrow */}
            <motion.p
              variants={itemVariants}
              className="text-[#6B6B6B] text-xs sm:text-sm font-medium tracking-[0.2em] uppercase mb-6"
            >
              Founder of Archatech Labs • CTO, Baron Davis Enterprises
            </motion.p>

            {/* Headline with staggered line reveal */}
            <motion.h1
              variants={headlineVariants}
              className="font-serif text-headline-white text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] leading-[1.12] tracking-[-0.02em] max-w-[560px]"
            >
              <motion.span variants={lineVariants} className="block">
                Chizz Cunningham
              </motion.span>
              <motion.span variants={lineVariants} className="block text-[#A8A8A6]">
                Tech Entrepreneur,
              </motion.span>
              <motion.span variants={lineVariants} className="block text-[#A8A8A6]">
                Builder & Fractional CTO
              </motion.span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="mt-6 md:mt-8 text-[#9A9A9A] text-base sm:text-lg font-light leading-relaxed max-w-[500px]"
            >
              I build companies, brands, software, and scalable technology platforms. Through Archatech Labs, I provide fractional CTO services to startups and growing companies, helping founders architect, scale, and operationalize their technology with clarity and precision.
            </motion.p>

            {/* Social Proof Row */}
            <motion.div
              variants={itemVariants}
              className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-[#5A5A5A] text-xs sm:text-sm tracking-wide"
            >
              <span>Founder</span>
              <span className="text-[#3A3A3A]">•</span>
              <span>Fractional CTO</span>
              <span className="text-[#3A3A3A]">•</span>
              <span>Product Builder</span>
              <span className="text-[#3A3A3A]">•</span>
              <span>Systems Architect</span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-10 md:mt-12 flex flex-wrap items-center gap-4"
            >
              {/* Primary CTA */}
              <motion.a
                href="#ventures"
                onClick={(e) => handleNavClick(e, '#ventures')}
                whileHover={prefersReducedMotion ? {} : { scale: 1.02, y: -2 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                className="inline-flex items-center px-7 py-4 bg-button-bg text-[#111] text-sm font-semibold tracking-wide rounded-full hover:shadow-[0_8px_30px_rgba(239,237,231,0.3)] transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1A1A1C]"
              >
                View Ventures
                <svg 
                  className="ml-2.5 w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </motion.a>

              {/* Secondary CTA */}
              <motion.a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                className="inline-flex items-center px-7 py-4 border border-[#3A3A3A] text-[#D0D0D0] text-sm font-medium tracking-wide rounded-full hover:border-[#5A5A5A] hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1A1A1C]"
              >
                Contact
              </motion.a>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              variants={itemVariants}
              className="hidden lg:flex absolute bottom-10 left-16 items-center gap-3 text-[#4A4A4A] text-xs tracking-widest uppercase"
            >
              <span className="w-10 h-[1px] bg-[#4A4A4A]"></span>
              <span>Scroll to explore</span>
              <motion.svg
                animate={prefersReducedMotion ? {} : { y: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </motion.div>
          </motion.div>

          {/* Right Column - Portrait Image with subtle parallax */}
          <div className="order-1 md:order-2 relative h-[320px] sm:h-[380px] md:h-auto min-h-[320px] overflow-hidden">
            <motion.div
              className="absolute inset-0"
              style={prefersReducedMotion ? {} : { y: parallaxY }}
            >
              <div className="absolute inset-[-20%] md:inset-0">
                {!imageError ? (
                  <Image
                    src="/Images/Chizz_Cunningham_Image.jpeg"
                    alt="Chizz Cunningham - Tech Entrepreneur and Investor"
                    fill
                    priority
                    className="object-cover object-center grayscale"
                    sizes="(max-width: 768px) 100vw, 45vw"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  /* Placeholder when image is missing */
                  <div 
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(145deg, #2A2A2C 0%, #1A1A1C 50%, #0F0F10 100%)',
                    }}
                  >
                    <div className="relative w-full h-full overflow-hidden">
                      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full border border-[#3A3A3C] opacity-30" />
                      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full border border-[#4A4A4C] opacity-20" />
                      <div className="absolute top-[38%] left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-[#3A3A3C] to-transparent opacity-40" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-serif text-[80px] sm:text-[100px] text-[#2A2A2C] font-light tracking-tight select-none">
                          CC
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* Dark overlay for blending */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to right, rgba(26, 26, 28, 0.5) 0%, rgba(26, 26, 28, 0.15) 40%, rgba(26, 26, 28, 0.05) 100%)',
                }}
              />
              {/* Bottom gradient for mobile */}
              <div 
                className="absolute inset-0 md:hidden pointer-events-none"
                style={{
                  background: 'linear-gradient(to bottom, transparent 50%, rgba(11, 11, 12, 0.9) 100%)',
                }}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
