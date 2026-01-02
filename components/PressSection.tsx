'use client'

const pressItems = [
  {
    title: 'Innovating for Impact: Chizz Cunningham\'s Vision at Archatech Labs',
    publication: 'Writer\'s Life Magazine',
    date: 'May 2025',
    description: 'An exclusive interview exploring the pivotal moments of Chizz\'s entrepreneurial journey, his commitment to empowering underrepresented voices in tech, and the future of Archatech Labs.',
    link: 'https://www.writerslifemag.com/single-post/innovating-for-impact-chizz-cunningham-s-vision-at-archatech-labs',
    featured: true,
  },
  {
    title: 'Archatech Labs Expands to Allentown: Chizz Cunningham\'s Vision to Help Make Pennsylvania a Tech Powerhouse',
    publication: 'North Penn Now',
    date: 'October 2025',
    description: 'Coverage of Archatech Labs\' strategic expansion into Pennsylvania, positioning the state as a growing hub for technology and innovation.',
    link: 'https://northpennnow.com/news/2025/oct/14/archatech-labs-expands-to-allentown-chizz-cunninghams-vision-to-help-make-pennsylvania-a-tech-powerhouse/',
    featured: true,
  },
  {
    title: 'Chizz Cunningham: From Jamaica Queens to Silicon Valley – A Tech Mogul in the Making',
    publication: 'Tech Bullion',
    date: '2025',
    description: 'A deep dive into Chizz Cunningham\'s journey from Queens, New York to becoming a leading figure in the tech industry, building ventures across AI, blockchain, and gaming.',
    link: 'https://techbullion.com/chizz-cunningham-from-jamaica-queens-to-silicon-valley-a-tech-mogul-in-the-making/',
    featured: true,
  },
  {
    title: 'Chizz Cunningham on Blockchain: Beyond the Hype – Building Real-World Utility',
    publication: 'London Daily News',
    date: '2025',
    description: 'An exploration of Chizz\'s approach to blockchain technology—focusing on practical applications and real-world utility rather than speculation.',
    link: 'https://www.londondaily.news/chizz-cunningham-on-blockchain-beyond-the-hype-building-real-world-utility/',
    featured: false,
  },
  {
    title: 'Chizz Cunningham on Building Global Tech Infrastructure for the Next Generation',
    publication: '7NetWorth',
    date: '2025',
    description: 'Insights on building scalable technology infrastructure designed to empower the next generation of creators, entrepreneurs, and innovators worldwide.',
    link: 'https://7networth.com/chizz-cunningham-on-building-global-tech-infrastructure-for-the-next-generation/',
    featured: false,
  },
]

export default function PressSection() {
  const featuredPress = pressItems.filter(item => item.featured)
  const otherPress = pressItems.filter(item => !item.featured)

  return (
    <section 
      id="press" 
      aria-labelledby="press-heading"
      className="w-full max-w-hero mx-auto py-24 md:py-32"
    >
      {/* Section Header */}
      <div className="text-center mb-16 md:mb-20">
        <p className="text-[#8A8A8A] text-xs sm:text-sm font-medium tracking-[0.2em] uppercase mb-4">
          In The News
        </p>
        <h2 
          id="press-heading"
          className="font-serif text-[#1A1A1C] text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] tracking-[-0.02em] mb-4"
        >
          Press & Media
        </h2>
        <p className="text-[#6A6A6A] text-base md:text-lg max-w-2xl mx-auto">
          Featured coverage of my work building the future of technology, culture, and ownership.
        </p>
      </div>

      {/* Featured Press */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
        {featuredPress.map((item) => (
          <a
            key={item.title}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col p-8 md:p-10 bg-[#1A1A1C] rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-black/20 hover:-translate-y-1"
          >
            {/* Featured badge */}
            <div className="absolute top-6 right-6">
              <span className="px-3 py-1 bg-[#2A2A2C] text-[#8A8A8A] text-xs font-medium tracking-wider uppercase rounded-full">
                Featured
              </span>
            </div>

            {/* Subtle gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#252528] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 flex flex-col h-full">
              {/* Publication & Date */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[#6A6A6A] text-sm font-medium tracking-wide">
                  {item.publication}
                </span>
                <span className="text-[#3A3A3A]">•</span>
                <span className="text-[#5A5A5A] text-sm">
                  {item.date}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-serif text-white text-lg md:text-xl leading-tight mb-4 group-hover:text-[#E0E0E0] transition-colors flex-grow">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-[#8A8A8A] text-sm leading-relaxed mb-6">
                {item.description}
              </p>

              {/* Read More */}
              <div className="flex items-center text-[#B8B8B8] text-sm font-medium group-hover:text-white transition-colors mt-auto">
                Read Article
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
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Other Press - Compact List */}
      {otherPress.length > 0 && (
        <div className="border-t border-[#E5E5E3] pt-12">
          <h3 className="text-[#6A6A6A] text-sm font-medium tracking-wider uppercase mb-8 text-center">
            More Coverage
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {otherPress.map((item) => (
              <a
                key={item.title}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between p-6 bg-white rounded-xl border border-[#E8E8E6] hover:border-[#D0D0CE] hover:shadow-md transition-all duration-300"
              >
                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#8A8A8A] text-xs font-medium">
                      {item.publication}
                    </span>
                    <span className="text-[#D0D0CE]">•</span>
                    <span className="text-[#A0A0A0] text-xs">
                      {item.date}
                    </span>
                  </div>
                  <h4 className="text-[#1A1A1C] text-base font-medium leading-snug group-hover:text-[#4A4A4A] transition-colors">
                    {item.title}
                  </h4>
                </div>
                <svg 
                  className="w-5 h-5 text-[#C0C0C0] group-hover:text-[#6A6A6A] transition-colors shrink-0 mt-1" 
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
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
