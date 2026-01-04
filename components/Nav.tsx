'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const navLinks = [
  { label: 'About', href: '#about', section: 'about' },
  { label: 'Philosophy', href: '#philosophy', section: 'philosophy' },
  { label: 'Ventures', href: '#ventures', section: 'ventures' },
  { label: 'Press', href: '#press', section: 'press' },
  { label: 'Contact', href: '#contact', section: 'contact' },
]

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const prefersReducedMotion = useReducedMotion()

  // Handle sticky nav after hero
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    )

    const sections = ['about', 'philosophy', 'ventures', 'press', 'contact']
    sections.forEach((section) => {
      const element = document.getElementById(section)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  // Close menu on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }

    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

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
    setMobileMenuOpen(false)
  }, [prefersReducedMotion])

  const menuVariants = {
    closed: { opacity: 0, y: -20, scale: 0.95 },
    open: { opacity: 1, y: 0, scale: 1 },
  }

  return (
    <>
      {/* Sticky Nav Wrapper */}
      <div
        className={`py-6 md:py-8 transition-all duration-300 ${
          isSticky
            ? 'fixed top-0 left-0 right-0 z-40 nav-sticky py-4 md:py-4 px-4 sm:px-6 lg:px-8'
            : ''
        }`}
      >
        <nav className="w-full max-w-hero mx-auto" role="navigation" aria-label="Main navigation">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between">
            {/* Left - Location Tag */}
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0.1 }}
              className="text-nav-gray text-sm tracking-wide font-light"
            >
              Cunningham • New York • 2025
            </motion.span>

            {/* Center - Name */}
            <motion.a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' }) }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
              className="text-[#1A1A1C] text-sm font-medium tracking-[0.25em] uppercase hover:opacity-80 transition-opacity"
            >
              CHIZZ CUNNINGHAM
            </motion.a>

            {/* Right - Navigation Links + Contact CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0.1 }}
              className="flex items-center gap-6"
            >
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative text-sm font-light tracking-wide transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#1A1A1C] focus:ring-offset-2 rounded ${
                    activeSection === link.section
                      ? 'text-[#1A1A1C]'
                      : 'text-[#4A4A4A] hover:text-[#1A1A1C]'
                  }`}
                >
                  {link.label}
                  {/* Active indicator */}
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#1A1A1C]"
                    initial={false}
                    animate={{
                      scaleX: activeSection === link.section ? 1 : 0,
                      opacity: activeSection === link.section ? 1 : 0,
                    }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                    style={{ transformOrigin: 'left' }}
                  />
                </a>
              ))}
              <motion.a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                className="ml-2 px-5 py-2.5 bg-[#1A1A1C] text-white text-sm font-medium tracking-wide rounded-full hover:bg-[#2A2A2C] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#1A1A1C] focus:ring-offset-2"
                aria-label="Contact Chizz Cunningham"
              >
                Get in Touch
              </motion.a>
            </motion.div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <div className="flex items-center justify-between">
              {/* Name */}
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' }) }}
                className="text-[#1A1A1C] text-xs font-medium tracking-[0.2em] uppercase"
              >
                CHIZZ CUNNINGHAM
              </a>

              {/* Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#1A1A1C] focus:outline-none focus:ring-2 focus:ring-[#1A1A1C] rounded"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={prefersReducedMotion ? false : menuVariants.closed}
                  animate={menuVariants.open}
                  exit={prefersReducedMotion ? {} : menuVariants.closed}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                  className="mt-6 pb-6 border-b border-[#E5E5E3]"
                >
                  <div className="flex flex-col gap-5">
                    {navLinks.map((link, index) => (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: prefersReducedMotion ? 0 : 0.2, delay: prefersReducedMotion ? 0 : index * 0.05 }}
                        className={`text-base font-light tracking-wide transition-colors duration-200 ${
                          activeSection === link.section
                            ? 'text-[#1A1A1C] font-medium'
                            : 'text-[#4A4A4A] hover:text-[#1A1A1C]'
                        }`}
                      >
                        {link.label}
                      </motion.a>
                    ))}
                    <motion.a
                      href="#contact"
                      onClick={(e) => handleNavClick(e, '#contact')}
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: prefersReducedMotion ? 0 : 0.2, delay: prefersReducedMotion ? 0 : 0.2 }}
                      className="mt-2 px-5 py-3 bg-[#1A1A1C] text-white text-sm font-medium tracking-wide rounded-full text-center hover:bg-[#2A2A2C] transition-all duration-300"
                    >
                      Get in Touch
                    </motion.a>
                  </div>
                  <span className="block mt-6 text-nav-gray text-xs tracking-wide font-light">
                    Cunningham • New York • 2025
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>
      </div>

      {/* Spacer for sticky nav */}
      {isSticky && <div className="h-[72px] md:h-[56px]" />}
    </>
  )
}
