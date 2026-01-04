'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function ContactSection() {
  // TODO: Replace with actual email address when confirmed
  const email = 'hello@chizzcunningham.com'
  
  const linkedInUrl = 'https://www.linkedin.com/in/chizz-cunningham-664237214/'
  
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })
  const [headlineAnimated, setHeadlineAnimated] = useState(false)

  useEffect(() => {
    if (isInView && !prefersReducedMotion) {
      const timer = setTimeout(() => setHeadlineAnimated(true), 600)
      return () => clearTimeout(timer)
    }
  }, [isInView, prefersReducedMotion])

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

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      aria-labelledby="contact-heading"
      className="w-full max-w-hero mx-auto py-24 md:py-32"
    >
      {/* Contact Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-2xl p-10 md:p-16 lg:p-20"
        style={{
          background: 'linear-gradient(135deg, #0B0B0C 0%, #1A1A1C 100%)',
        }}
      >
        {/* Subtle decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#2A2A2C] to-transparent opacity-30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#2A2A2C] to-transparent opacity-20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="relative z-10 max-w-2xl mx-auto text-center"
        >
          {/* Eyebrow */}
          <motion.p
            variants={itemVariants}
            className="text-[#6B6B6B] text-xs sm:text-sm font-medium tracking-[0.2em] uppercase mb-6"
          >
            Get in Touch
          </motion.p>

          {/* Headline with animated underline */}
          <motion.h2
            variants={itemVariants}
            id="contact-heading"
            className="font-serif text-headline-white text-[32px] sm:text-[42px] md:text-[52px] leading-[1.1] tracking-[-0.02em] mb-6"
          >
            <span className="relative inline-block">
              Let's build something real.
              {/* Animated underline */}
              <motion.span
                className="absolute -bottom-2 left-0 h-[3px] bg-gradient-to-r from-white/60 via-white/30 to-transparent"
                initial={{ width: 0 }}
                animate={headlineAnimated ? { width: '100%' } : { width: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-[#9A9A9A] text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto"
          >
            I'm always interested in connecting with investors, potential partners, press, and ambitious builders. Whether you want to collaborate, invest, or just exchange ideas—reach out.
          </motion.p>

          {/* Contact Methods */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {/* Email CTA */}
            <motion.a
              href={`mailto:${email}`}
              whileHover={prefersReducedMotion ? {} : { scale: 1.03, y: -2 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              className="inline-flex items-center px-8 py-4 bg-button-bg text-[#111] text-base font-semibold tracking-wide rounded-full hover:shadow-[0_8px_30px_rgba(239,237,231,0.3)] transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1A1A1C]"
            >
              <motion.svg 
                className="mr-3 w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
                animate={prefersReducedMotion ? {} : { rotate: [0, -5, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </motion.svg>
              Email Me
            </motion.a>

            {/* LinkedIn CTA */}
            <motion.a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              className="inline-flex items-center px-8 py-4 border border-[#3A3A3A] text-[#D0D0D0] text-base font-medium tracking-wide rounded-full hover:border-[#5A5A5A] hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1A1A1C]"
            >
              <svg 
                className="mr-3 w-5 h-5" 
                fill="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </motion.a>
          </motion.div>

          {/* Additional note */}
          <motion.p
            variants={itemVariants}
            className="mt-10 text-[#5A5A5A] text-sm"
          >
            Based in New York • Open to global opportunities
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : 0.8 }}
        className="mt-16 pt-8 border-t border-[#E5E5E3] text-center"
      >
        <p className="text-[#9A9A9A] text-sm">
          © {new Date().getFullYear()} Chizz Cunningham. All rights reserved.
        </p>
      </motion.footer>
    </section>
  )
}
