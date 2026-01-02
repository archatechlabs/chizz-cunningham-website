'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const pillars = [
  {
    title: 'Ownership Over Extraction',
    description: 'Building products where users and creators own their data, identity, and upside—not just rent access.',
    expanded: 'In a world of platform dependency, true ownership is revolutionary. I design systems where value flows back to creators and users, not just shareholders.',
  },
  {
    title: 'Culture + Technology as a Moat',
    description: 'The most defensible companies understand culture deeply. Technology is the lever; culture is the foundation.',
    expanded: 'Code can be copied. Culture cannot. The ventures I build are rooted in authentic communities and cultural understanding that create lasting competitive advantage.',
  },
  {
    title: 'Long-Term Systems Thinking',
    description: 'No quick hacks. I build infrastructure and ecosystems designed to compound over decades, not quarters.',
    expanded: 'Every decision is made with a 10-year horizon in mind. I\'m building companies that will outlast trends and create enduring value for generations.',
  },
]

export default function PhilosophySection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

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

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <section 
      ref={sectionRef}
      id="philosophy" 
      aria-labelledby="philosophy-heading"
      className="w-full max-w-hero mx-auto py-24 md:py-32"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
        className="text-center mb-16 md:mb-20"
      >
        <p className="text-[#8A8A8A] text-xs sm:text-sm font-medium tracking-[0.2em] uppercase mb-4">
          Philosophy
        </p>
        <h2 
          id="philosophy-heading"
          className="font-serif text-[#1A1A1C] text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] tracking-[-0.02em]"
        >
          Why I Build
        </h2>
        {/* Animated divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: prefersReducedMotion ? 0 : 0.3 }}
          className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#1A1A1C] to-transparent mx-auto mt-6"
          style={{ transformOrigin: 'center' }}
        />
      </motion.div>

      {/* Pillars Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20"
      >
        {pillars.map((pillar, index) => (
          <motion.button
            key={pillar.title}
            variants={itemVariants}
            onClick={() => toggleExpand(index)}
            whileHover={prefersReducedMotion ? {} : { y: -4, scale: 1.01 }}
            className={`group relative p-8 md:p-10 bg-white rounded-2xl border text-left transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#1A1A1C] focus:ring-offset-2 ${
              expandedIndex === index
                ? 'border-[#1A1A1C] shadow-xl'
                : 'border-[#E8E8E6] hover:border-[#C0C0BE] hover:shadow-lg card-glow'
            }`}
            aria-expanded={expandedIndex === index}
          >
            {/* Number indicator */}
            <span className={`absolute top-6 right-6 text-sm font-medium transition-colors duration-300 ${
              expandedIndex === index ? 'text-[#1A1A1C]' : 'text-[#E0E0DE] group-hover:text-[#C0C0BE]'
            }`}>
              0{index + 1}
            </span>
            
            <h3 className="font-serif text-[#1A1A1C] text-xl md:text-2xl leading-tight mb-4 pr-8">
              {pillar.title}
            </h3>
            <p className="text-[#6A6A6A] text-base leading-relaxed mb-2">
              {pillar.description}
            </p>

            {/* Expandable content */}
            <AnimatePresence>
              {expandedIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 mt-4 border-t border-[#E8E8E6]">
                    <p className="text-[#4A4A4A] text-sm leading-relaxed italic">
                      {pillar.expanded}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Expand indicator */}
            <div className="flex items-center gap-2 mt-4 text-[#8A8A8A] text-xs font-medium tracking-wide">
              <span>{expandedIndex === index ? 'Less' : 'Read more'}</span>
              <motion.svg
                animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Throughline Paragraph */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.6 }}
        className="max-w-3xl mx-auto text-center"
      >
        <div className="inline-block w-12 h-[1px] bg-[#D0D0CE] mb-8" />
        <p className="text-[#4A4A4A] text-lg md:text-xl leading-relaxed font-light">
          Every venture I build connects back to one idea: <span className="text-[#1A1A1C] font-normal">technology should empower people to own their future</span>—whether that's their health data, their creative work, their community, or their economic upside. I'm not interested in building another extractive platform. I'm building the infrastructure for the next generation of ownership.
        </p>
      </motion.div>
    </section>
  )
}
