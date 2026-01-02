'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function HeroCard() {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="w-full max-w-hero mx-auto hero-animate">
      {/* Card Container */}
      <div 
        className="relative w-full rounded-hero overflow-hidden"
        style={{
          boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.15), 0 10px 25px -8px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Card Grid - Desktop: side by side, Mobile: stacked */}
        <div className="grid grid-cols-1 md:grid-cols-[55%_45%] min-h-[520px]">
          
          {/* Left Column - Content */}
          <div 
            className="order-2 md:order-1 flex flex-col justify-center px-6 py-12 sm:px-10 sm:py-14 md:px-16 md:py-[72px] lg:pl-16 lg:pr-12"
            style={{
              background: 'linear-gradient(135deg, #0B0B0C 0%, #1A1A1C 100%)',
            }}
          >
            {/* Headline */}
            <h2 
              className="font-serif text-headline-white text-[28px] sm:text-[38px] md:text-[44px] lg:text-[56px] leading-[1.1] tracking-[-0.02em] max-w-[520px] stagger-1 opacity-0 hero-animate"
              style={{ animationDelay: '0.2s' }}
            >
              Building the systems
              <br />
              behind the future of
              <br />
              culture, technology,
              <br />
              and ownership.
            </h2>

            {/* Subheadline */}
            <p 
              className="mt-5 md:mt-6 text-muted-gray text-sm sm:text-base font-light tracking-wide max-w-[480px] stagger-2 opacity-0 hero-animate"
              style={{ animationDelay: '0.35s' }}
            >
              Tech Entrepreneur • Investor • Founder of MyPal4Life, SkyLi, History of the Game
            </p>

            {/* CTA Button */}
            <div 
              className="mt-8 md:mt-10 stagger-3 opacity-0 hero-animate"
              style={{ animationDelay: '0.5s' }}
            >
              <a
                href="#work"
                className="inline-flex items-center px-6 py-3.5 md:px-[22px] md:py-[14px] bg-button-bg text-[#111] text-sm font-medium tracking-wide rounded-full btn-glow hover:bg-[#E5E3DD] transition-all duration-300"
              >
                View My Work
                <svg 
                  className="ml-2 w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>

            {/* Decorative Element */}
            <div className="hidden lg:block absolute bottom-8 left-16">
              <div className="flex items-center gap-3 text-[#4A4A4A] text-xs tracking-widest uppercase">
                <span className="w-8 h-[1px] bg-[#4A4A4A]"></span>
                Scroll to explore
              </div>
            </div>
          </div>

          {/* Right Column - Portrait Image */}
          <div className="order-1 md:order-2 relative h-[300px] sm:h-[360px] md:h-auto min-h-[300px]">
            {/* Image Container */}
            <div className="absolute inset-0">
              {!imageError ? (
                <Image
                  src="/Images/Chizz_Cunningham_Image.jpeg"
                  alt="Chizz Cunningham Portrait"
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
                  {/* Abstract placeholder design */}
                  <div className="relative w-full h-full overflow-hidden">
                    {/* Geometric pattern */}
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full border border-[#3A3A3C] opacity-30" />
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full border border-[#4A4A4C] opacity-20" />
                    <div className="absolute top-[38%] left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-[#3A3A3C] to-transparent opacity-40" />
                    
                    {/* Initials */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-serif text-[80px] sm:text-[100px] text-[#2A2A2C] font-light tracking-tight select-none">
                        CC
                      </span>
                    </div>
                    
                    {/* Subtle text */}
                    <div className="absolute bottom-8 left-0 right-0 text-center">
                      <p className="text-[#4A4A4A] text-xs tracking-[0.3em] uppercase">
                        Portrait Coming Soon
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {/* Dark overlay for blending */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to right, rgba(26, 26, 28, 0.4) 0%, rgba(26, 26, 28, 0.1) 50%, rgba(26, 26, 28, 0.05) 100%)',
                }}
              />
              {/* Bottom gradient for mobile */}
              <div 
                className="absolute inset-0 md:hidden pointer-events-none"
                style={{
                  background: 'linear-gradient(to bottom, transparent 60%, rgba(11, 11, 12, 0.8) 100%)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

