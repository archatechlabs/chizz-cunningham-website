'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import Link from 'next/link'

const ARCHATECH_URL = 'https://archatechlabs.com'

const whatIDo = [
  {
    title: 'Product & Platform Architecture',
    description: 'Design scalable systems from the ground up—choosing the right tech stack, data models, and infrastructure patterns.',
  },
  {
    title: 'Technical Strategy & Roadmap',
    description: 'Align technology decisions with business goals. Prioritize what to build, when, and why.',
  },
  {
    title: 'Hiring & Team Building',
    description: 'Source, interview, and evaluate engineering talent. Build teams that ship.',
  },
  {
    title: 'MVP to Scale',
    description: 'Move fast without breaking things. Ship MVPs, then systematically scale infrastructure and processes.',
  },
  {
    title: 'Security & Reliability',
    description: 'Implement foundational security practices, monitoring, and incident response before they become emergencies.',
  },
]

const whoItsFor = [
  'Founders building their first technical product',
  'Pre-seed to Series A startups needing senior technical leadership',
  'Small teams without a full-time CTO',
  'Organizations scaling beyond their current technical capabilities',
  'Non-technical founders who need a trusted technical partner',
]

const engagementModels = [
  {
    title: 'Advisory',
    description: 'Lightweight guidance and strategic input. Perfect for founders who need a sounding board and occasional deep dives.',
    features: ['Weekly or bi-weekly calls', 'Async support via Slack/email', 'Architecture reviews', 'Hiring guidance'],
  },
  {
    title: 'Build Sprint',
    description: 'Hands-on delivery for specific initiatives. Ideal for launching MVPs, major refactors, or critical features.',
    features: ['Dedicated focus period', 'Direct code contribution', 'Team mentorship', 'Documentation & handoff'],
  },
  {
    title: 'Fractional CTO Retainer',
    description: 'Ongoing technical leadership embedded in your team. For companies that need consistent senior guidance.',
    features: ['Regular team integration', 'Strategic planning', 'Vendor management', 'Board/investor support'],
  },
]

const howWeStart = [
  {
    step: '01',
    title: 'Discovery Call',
    description: 'A focused 30-minute conversation to understand your business, technical challenges, and goals.',
  },
  {
    step: '02',
    title: 'Audit & Roadmap',
    description: 'I review your current state—codebase, architecture, team—and propose a clear path forward.',
  },
  {
    step: '03',
    title: 'Execution Plan',
    description: 'We agree on scope, engagement model, and timeline. Then we get to work.',
  },
]

export default function FractionalCTOPage() {
  const prefersReducedMotion = useReducedMotion()
  const heroRef = useRef(null)
  const whatRef = useRef(null)
  const whoRef = useRef(null)
  const modelsRef = useRef(null)
  const startRef = useRef(null)

  const heroInView = useInView(heroRef, { once: true, amount: 0.3 })
  const whatInView = useInView(whatRef, { once: true, amount: 0.2 })
  const whoInView = useInView(whoRef, { once: true, amount: 0.3 })
  const modelsInView = useInView(modelsRef, { once: true, amount: 0.2 })
  const startInView = useInView(startRef, { once: true, amount: 0.3 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
        delayChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
  }

  const cardHover = prefersReducedMotion
    ? {}
    : { y: -4, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }

  return (
    <main className="min-h-screen bg-off-white">
      {/* Navigation */}
      <nav className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-[#1A1A1C] text-sm font-medium tracking-[0.2em] uppercase hover:opacity-70 transition-opacity"
          >
            Chizz Cunningham
          </Link>
          <Link
            href="/#contact"
            className="px-5 py-2.5 bg-[#1A1A1C] text-white text-sm font-medium rounded-full hover:bg-[#2A2A2C] transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 md:pt-20 md:pb-28">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={heroInView ? 'visible' : 'hidden'}
          className="text-center"
        >
          <motion.p
            variants={itemVariants}
            className="text-[#8A8A8A] text-xs sm:text-sm font-medium tracking-[0.2em] uppercase mb-6"
          >
            Services
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="font-serif text-[#1A1A1C] text-[36px] sm:text-[48px] md:text-[56px] leading-[1.1] tracking-[-0.02em] mb-8"
          >
            Fractional CTO Services
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-[#4A4A4A] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-4"
          >
            I help startups and growing companies architect, ship, and scale software. No full-time executive overhead. Just focused, senior technical leadership.
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-[#6A6A6A] text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Through{' '}
            <a
              href={ARCHATECH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1A1A1C] font-medium hover:underline underline-offset-4"
            >
              Archatech Labs
            </a>
            , I partner directly with founders as their fractional CTO.
          </motion.p>
        </motion.div>
      </section>

      {/* What I Do Section */}
      <section ref={whatRef} className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={whatInView ? 'visible' : 'hidden'}
        >
          <motion.h2
            variants={itemVariants}
            className="font-serif text-[#1A1A1C] text-[28px] sm:text-[36px] md:text-[42px] leading-[1.15] tracking-[-0.02em] text-center mb-16"
          >
            What I Do
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whatIDo.map((item, index) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                whileHover={cardHover}
                className="p-8 bg-white rounded-2xl border border-[#E8E8E6] transition-all duration-300"
              >
                <span className="text-[#D0D0CE] text-sm font-medium mb-4 block">
                  0{index + 1}
                </span>
                <h3 className="font-serif text-[#1A1A1C] text-xl mb-3">
                  {item.title}
                </h3>
                <p className="text-[#6A6A6A] text-base leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Who It's For Section */}
      <section ref={whoRef} className="w-full bg-[#1A1A1C] py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={whoInView ? 'visible' : 'hidden'}
          >
            <motion.h2
              variants={itemVariants}
              className="font-serif text-white text-[28px] sm:text-[36px] md:text-[42px] leading-[1.15] tracking-[-0.02em] text-center mb-12"
            >
              Who It's For
            </motion.h2>

            <div className="space-y-4">
              {whoItsFor.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-start gap-4 p-6 bg-[#252528] rounded-xl"
                >
                  <span className="text-[#4A4A4A] text-sm font-medium shrink-0">
                    0{index + 1}
                  </span>
                  <p className="text-[#B8B8B8] text-lg">
                    {item}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Engagement Models Section */}
      <section ref={modelsRef} className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={modelsInView ? 'visible' : 'hidden'}
        >
          <motion.h2
            variants={itemVariants}
            className="font-serif text-[#1A1A1C] text-[28px] sm:text-[36px] md:text-[42px] leading-[1.15] tracking-[-0.02em] text-center mb-6"
          >
            Engagement Models
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-[#6A6A6A] text-lg text-center mb-16 max-w-2xl mx-auto"
          >
            Every engagement is scoped to your specific needs. Here are the most common ways I work with founders.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {engagementModels.map((model) => (
              <motion.div
                key={model.title}
                variants={itemVariants}
                whileHover={cardHover}
                className="p-8 bg-white rounded-2xl border border-[#E8E8E6] transition-all duration-300 flex flex-col"
              >
                <h3 className="font-serif text-[#1A1A1C] text-2xl mb-4">
                  {model.title}
                </h3>
                <p className="text-[#6A6A6A] text-base leading-relaxed mb-6">
                  {model.description}
                </p>
                <ul className="space-y-3 mt-auto">
                  {model.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-[#4A4A4A] text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A1C]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* How We Start Section */}
      <section ref={startRef} className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={startInView ? 'visible' : 'hidden'}
        >
          <motion.h2
            variants={itemVariants}
            className="font-serif text-[#1A1A1C] text-[28px] sm:text-[36px] md:text-[42px] leading-[1.15] tracking-[-0.02em] text-center mb-16"
          >
            How We Start
          </motion.h2>

          <div className="space-y-8">
            {howWeStart.map((step) => (
              <motion.div
                key={step.step}
                variants={itemVariants}
                className="flex gap-8 items-start"
              >
                <span className="font-serif text-[#D0D0CE] text-4xl md:text-5xl font-light shrink-0 w-16">
                  {step.step}
                </span>
                <div>
                  <h3 className="font-serif text-[#1A1A1C] text-xl md:text-2xl mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[#6A6A6A] text-base md:text-lg leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          className="text-center"
        >
          <h2 className="font-serif text-[#1A1A1C] text-[28px] sm:text-[36px] md:text-[42px] leading-[1.15] tracking-[-0.02em] mb-6">
            Ready to Build?
          </h2>

          <p className="text-[#6A6A6A] text-lg md:text-xl leading-relaxed max-w-xl mx-auto mb-10">
            Let's talk about your technical challenges and how I can help you move faster.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href={ARCHATECH_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              className="inline-flex items-center px-8 py-4 bg-[#1A1A1C] text-white text-base font-semibold rounded-full hover:bg-[#2A2A2C] hover:shadow-lg transition-all duration-300"
            >
              Work With Me via Archatech Labs
              <svg
                className="ml-3 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </motion.a>

            <Link
              href="/"
              className="inline-flex items-center px-8 py-4 border border-[#D0D0CE] text-[#4A4A4A] text-base font-medium rounded-full hover:border-[#1A1A1C] hover:text-[#1A1A1C] transition-all duration-300"
            >
              Back to Home
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-[#E5E5E3]">
        <p className="text-[#9A9A9A] text-sm text-center">
          © {new Date().getFullYear()} Chizz Cunningham. All rights reserved.
        </p>
      </footer>
    </main>
  )
}


