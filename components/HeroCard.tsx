'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function HeroCard() {
  const [imageError, setImageError] = useState(false)

  return (
    <section aria-label="Hero" className="w-full max-w-hero mx-auto hero-animate">
      {/* Card Container */}
      <div 
        className="relative w-full rounded-hero overflow-hidden"
        style={{
          boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.15), 0 10px 25px -8px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Card Grid - Desktop: side by side, Mobile: stacked */}
        <div className="grid grid-cols-1 md:grid-cols-[55%_45%] min-h-[580px] md:min-h-[600px]">
          
          {/* Left Column - Content */}
          <div 
            className="order-2 md:order-1 flex flex-col justify-center px-6 py-14 sm:px-10 sm:py-16 md:px-14 md:py-[72px] lg:pl-16 lg:pr-12"
            style={{
              background: 'linear-gradient(135deg, #0B0B0C 0%, #1A1A1C 100%)',
            }}
          >
            {/* Eyebrow */}
            <p 
              className="text-[#6B6B6B] text-xs sm:text-sm font-medium tracking-[0.2em] uppercase mb-6 opacity-0 hero-animate"
              style={{ animationDelay: '0.15s' }}
            >
              Tech Entrepreneur & Investor
            </p>

            {/* Headline */}
            <h1 
              className="font-serif text-headline-white text-[32px] sm:text-[42px] md:text-[48px] lg:text-[58px] leading-[1.08] tracking-[-0.02em] max-w-[540px] opacity-0 hero-animate"
              style={{ animationDelay: '0.25s' }}
            >
              Building the systems
              <br />
              behind the future of
              <br />
              <span className="text-[#A8A8A6]">culture, technology,</span>
              <br />
              <span className="text-[#A8A8A6]">and ownership.</span>
            </h1>

            {/* Subheadline */}
            <p 
              className="mt-6 md:mt-8 text-[#9A9A9A] text-base sm:text-lg font-light leading-relaxed max-w-[480px] opacity-0 hero-animate"
              style={{ animationDelay: '0.4s' }}
            >
              I create companies at the intersection of AI, Web3, gaming, and consumer technology—where culture meets innovation.
            </p>

            {/* Social Proof Row */}
            <div 
              className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-[#5A5A5A] text-xs sm:text-sm tracking-wide opacity-0 hero-animate"
              style={{ animationDelay: '0.5s' }}
            >
              <span>Founder</span>
              <span className="text-[#3A3A3A]">•</span>
              <span>Product Builder</span>
              <span className="text-[#3A3A3A]">•</span>
              <span>Systems Thinker</span>
              <span className="text-[#3A3A3A]">•</span>
              <span>Culture + Tech</span>
            </div>

            {/* CTA Buttons */}
            <div 
              className="mt-10 md:mt-12 flex flex-wrap items-center gap-4 opacity-0 hero-animate"
              style={{ animationDelay: '0.6s' }}
            >
              {/* Primary CTA */}
              <a
                href="#ventures"
                className="inline-flex items-center px-7 py-4 bg-button-bg text-[#111] text-sm font-semibold tracking-wide rounded-full btn-glow hover:bg-[#E5E3DD] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1A1A1C]"
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
              </a>

              {/* Secondary CTA */}
              <a
                href="#contact"
                className="inline-flex items-center px-7 py-4 border border-[#3A3A3A] text-[#D0D0D0] text-sm font-medium tracking-wide rounded-full hover:border-[#5A5A5A] hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1A1A1C]"
              >
                Contact
              </a>
            </div>

            {/* Decorative Element */}
            <div className="hidden lg:block absolute bottom-10 left-16">
              <div className="flex items-center gap-3 text-[#4A4A4A] text-xs tracking-widest uppercase">
                <span className="w-10 h-[1px] bg-[#4A4A4A]"></span>
                Scroll to explore
              </div>
            </div>
          </div>

          {/* Right Column - Portrait Image */}
          <div className="order-1 md:order-2 relative h-[320px] sm:h-[380px] md:h-auto min-h-[320px]">
            {/* Image Container */}
            <div className="absolute inset-0">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
