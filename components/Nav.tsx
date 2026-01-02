'use client'

import { useState } from 'react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Ventures', href: '#ventures' },
  { label: 'Thinking', href: '#thinking' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="w-full max-w-hero mx-auto">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center justify-between">
        {/* Left - Location Tag */}
        <span className="text-nav-gray text-sm tracking-wide font-light">
          Cunningham • New York • 2025
        </span>

        {/* Center - Name */}
        <h1 className="text-[#1A1A1C] text-sm font-medium tracking-[0.25em] uppercase">
          CHIZZ CUNNINGHAM
        </h1>

        {/* Right - Navigation Links */}
        <div className="flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[#4A4A4A] text-sm font-light tracking-wide hover:text-[#1A1A1C] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="flex items-center justify-between">
          {/* Name */}
          <h1 className="text-[#1A1A1C] text-xs font-medium tracking-[0.2em] uppercase">
            CHIZZ CUNNINGHAM
          </h1>

          {/* Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#1A1A1C] focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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
          <div className="mobile-menu-enter mt-4 pb-4 border-b border-[#E5E5E3]">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[#4A4A4A] text-sm font-light tracking-wide hover:text-[#1A1A1C] transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <span className="block mt-4 text-nav-gray text-xs tracking-wide font-light">
              Cunningham • New York • 2025
            </span>
          </div>
        )}
      </div>
    </nav>
  )
}

