'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function AboutSection() {
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.15,
        delayChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  }

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-labelledby="about-heading"
      className="w-full max-w-hero mx-auto py-20 md:py-28"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="max-w-3xl mx-auto"
      >
        {/* Section Label */}
        <motion.p
          variants={itemVariants}
          className="text-[#8A8A8A] text-xs sm:text-sm font-medium tracking-[0.2em] uppercase mb-6 text-center"
        >
          About
        </motion.p>

        {/* Heading */}
        <motion.h2
          id="about-heading"
          variants={itemVariants}
          className="font-serif text-[#1A1A1C] text-[28px] sm:text-[36px] md:text-[42px] leading-[1.15] tracking-[-0.02em] text-center mb-10"
        >
          About Chizz Cunningham
        </motion.h2>

        {/* Bio Content */}
        <motion.div
          variants={itemVariants}
          className="space-y-6"
        >
          <p className="text-[#4A4A4A] text-lg md:text-xl leading-relaxed">
            Chizz Cunningham is a tech entrepreneur, investor, and{' '}
            <a 
              href="/fractional-cto"
              className="text-[#1A1A1C] font-medium hover:underline underline-offset-4 transition-all"
            >
              fractional CTO
            </a>{' '}
            focused on building and scaling modern technology companies. He works hands-on with founders and leadership teams to design software architectures, launch platforms, and transform ideas into durable businesses.
          </p>
          
          <p className="text-[#4A4A4A] text-lg md:text-xl leading-relaxed">
            Through{' '}
            <a 
              href="https://archatechlabs.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#1A1A1C] font-medium hover:underline underline-offset-4 transition-all"
            >
              Archatech Labs
            </a>
            , Chizz partners with startups to provide strategic and technical leadership without the overhead of a full-time executive, helping companies move faster, scale smarter, and build technology that lasts.
          </p>
        </motion.div>

        {/* Learn More Link */}
        <motion.div
          variants={itemVariants}
          className="mt-8 text-center"
        >
          <a 
            href="/fractional-cto"
            className="inline-flex items-center text-[#6A6A6A] text-sm font-medium hover:text-[#1A1A1C] transition-colors"
          >
            Learn more about Fractional CTO services
            <svg 
              className="ml-2 w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </motion.div>

        {/* Decorative divider */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex justify-center"
        >
          <div className="w-16 h-[1px] bg-[#D0D0CE]" />
        </motion.div>
      </motion.div>
    </section>
  )
}

