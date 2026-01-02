'use client'

const ventures = [
  {
    name: 'MyPal4Life',
    mission: 'Smart pet health ecosystem reimagining how we care for our companions.',
    differentiator: 'First platform combining wearable hardware, AI health insights, and blockchain-based incentives for proactive pet wellness.',
    credibility: 'Hardware + Software + AI ecosystem',
    link: '#contact',
  },
  {
    name: 'SkyLi',
    mission: 'Smart collar hardware platform powering real-time pet health insights.',
    differentiator: 'Medical-grade sensors in consumer-friendly form factor—tracking vitals, activity, and behavioral patterns 24/7.',
    credibility: 'Proprietary hardware development',
    link: '#contact',
  },
  {
    name: 'History of the Game',
    mission: 'Basketball storytelling meets Web3 and immersive virtual experiences.',
    differentiator: 'Preserving basketball culture through digital collectibles, documentary content, and virtual world integration.',
    credibility: 'Web3 + Media + Gaming convergence',
    link: 'https://historyofthegame.io',
    external: true,
  },
  {
    name: 'Oatmeal Radio Café',
    mission: 'Music, coffee, and technology—unified under creator-first economics.',
    differentiator: 'A new model where artists, venues, and fans share ownership in the cultural experiences they create together.',
    credibility: 'Creator economy platform',
    link: '#contact',
  },
  {
    name: 'Neighborhood Tales',
    mission: 'Gaming and virtual world experiences rooted in culture and community.',
    differentiator: 'Building digital spaces that celebrate real neighborhoods, real stories, and authentic cultural representation.',
    credibility: 'Gaming + Culture IP development',
    link: '#contact',
  },
  {
    name: 'Archatech Labs',
    mission: 'Product studio and engineering for ambitious startups and enterprise.',
    differentiator: 'Not just code—strategic product development from zero-to-one, with a focus on consumer tech and Web3.',
    credibility: 'Full-stack product studio',
    link: '#contact',
  },
]

export default function VenturesSection() {
  return (
    <section 
      id="ventures" 
      aria-labelledby="ventures-heading"
      className="w-full max-w-hero mx-auto py-24 md:py-32"
    >
      {/* Section Header */}
      <div className="text-center mb-16 md:mb-20">
        <p className="text-[#8A8A8A] text-xs sm:text-sm font-medium tracking-[0.2em] uppercase mb-4">
          Portfolio
        </p>
        <h2 
          id="ventures-heading"
          className="font-serif text-[#1A1A1C] text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] tracking-[-0.02em] mb-4"
        >
          Ventures
        </h2>
        <p className="text-[#6A6A6A] text-base md:text-lg max-w-2xl mx-auto">
          Companies I've founded at the intersection of culture, technology, and ownership.
        </p>
      </div>

      {/* Ventures Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {ventures.map((venture, index) => (
          <article 
            key={venture.name}
            className="group relative flex flex-col p-8 md:p-10 bg-[#1A1A1C] rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-black/20 hover:-translate-y-1"
            style={{ minHeight: '320px' }}
          >
            {/* Subtle gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#252528] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Content */}
            <div className="relative z-10 flex flex-col h-full">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <h3 className="font-serif text-white text-2xl md:text-[28px] leading-tight tracking-[-0.01em]">
                  {venture.name}
                </h3>
                <span className="text-[#4A4A4A] text-xs font-medium tracking-wider uppercase shrink-0 ml-4">
                  0{index + 1}
                </span>
              </div>

              {/* Mission */}
              <p className="text-[#B8B8B8] text-base md:text-lg leading-relaxed mb-4 flex-grow">
                {venture.mission}
              </p>

              {/* Differentiator */}
              <p className="text-[#7A7A7A] text-sm leading-relaxed mb-6 border-l-2 border-[#3A3A3A] pl-4">
                {venture.differentiator}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-[#2A2A2C]">
                {/* Credibility Signal */}
                <span className="text-[#5A5A5A] text-xs tracking-wide uppercase">
                  {venture.credibility}
                </span>

                {/* Learn More Link */}
                <a
                  href={venture.link}
                  target={venture.external ? '_blank' : undefined}
                  rel={venture.external ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center text-[#D0D0D0] text-sm font-medium hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1A1A1C] rounded"
                  aria-label={`Learn more about ${venture.name}`}
                >
                  {venture.external ? 'Visit Site' : 'Learn More'}
                  <svg 
                    className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d={venture.external ? "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" : "M17 8l4 4m0 0l-4 4m4-4H3"}
                    />
                  </svg>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

