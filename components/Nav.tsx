'use client'

import { useState } from 'react'

const navLinks = [
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Ventures', href: '#ventures' },
  { label: 'Press', href: '#press' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="w-full max-w-hero mx-auto" role="navigation" aria-label="Main navigation">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center justify-between">
        {/* Left - Location Tag */}
        <span className="text-nav-gray text-sm tracking-wide font-light">
          Cunningham • New York • 2025
        </span>

        {/* Center - Name */}
        <a href="#" className="text-[#1A1A1C] text-sm font-medium tracking-[0.25em] uppercase hover:opacity-80 transition-opacity">
          CHIZZ CUNNINGHAM
        </a>

        {/* Right - Navigation Links + Contact CTA */}
        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[#4A4A4A] text-sm font-light tracking-wide hover:text-[#1A1A1C] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#1A1A1C] focus:ring-offset-2 rounded"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-2 px-5 py-2.5 bg-[#1A1A1C] text-white text-sm font-medium tracking-wide rounded-full hover:bg-[#2A2A2C] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#1A1A1C] focus:ring-offset-2"
            aria-label="Contact Chizz Cunningham"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="flex items-center justify-between">
          {/* Name */}
          <a href="#" className="text-[#1A1A1C] text-xs font-medium tracking-[0.2em] uppercase">
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
        {mobileMenuOpen && (
          <div className="mobile-menu-enter mt-6 pb-6 border-b border-[#E5E5E3]">
            <div className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[#1A1A1C] text-base font-light tracking-wide hover:text-[#4A4A4A] transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 px-5 py-3 bg-[#1A1A1C] text-white text-sm font-medium tracking-wide rounded-full text-center hover:bg-[#2A2A2C] transition-all duration-300"
              >
                Get in Touch
              </a>
            </div>
            <span className="block mt-6 text-nav-gray text-xs tracking-wide font-light">
              Cunningham • New York • 2025
            </span>
          </div>
        )}
      </div>
    </nav>
  )
}
