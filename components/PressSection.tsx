'use client'

const pressItems = [
  {
    title: 'Baron Davis Expands Business Inside the Game to Members-Only Platform',
    publication: 'Sports Business Journal',
    date: 'February 2024',
    description: 'Coverage of the expansion of B.I.G. into a membership platform fostering innovation and entrepreneurship across sports and technology.',
    link: 'https://www.sportsbusinessjournal.com/Articles/2024/02/16/baron-davis-business-inside-the-game/',
    featured: true,
  },
  {
    title: 'Ex-NBA Star Baron Davis on What Makes His Business Platform Unique',
    publication: 'Forbes',
    date: 'October 2024',
    description: 'In-depth feature on Baron Davis Enterprises and the team building innovative platforms at the intersection of sports, technology, and culture.',
    link: 'https://www.forbes.com/sites/djsiddiqi/2024/10/18/ex-nba-star-baron-davis-on-what-makes-his-business-platform-unique-and-how-hes-helping-entrepreneurs/',
    featured: true,
  },
  {
    title: 'Baron Davis Launches Playrs Holdings in Web3 Partnership',
    publication: 'Boardroom',
    date: '2024',
    description: 'Announcement of Playrs Holdings, a holding company bridging sports, technology, business, and culture in the Web3 space.',
    link: 'https://boardroom.tv/baron-davis-playrs-holdings-partnership/',
    featured: false,
  },
  {
    title: 'NBA All-Star Baron Davis Invests in Fan-Owned SailGP Racing Team',
    publication: 'PR Newswire',
    date: 'July 2023',
    description: 'First professional athlete to invest in a fan-owned sports team powered by blockchain and DAO technology.',
    link: 'https://www.prnewswire.com/news-releases/nba-all-star-baron-davis-invests-in-fan-owned-sailgp-racing-team-301884690.html',
    featured: false,
  },
  // TODO: Add more press items as they become available
  // {
  //   title: 'Your Press Title Here',
  //   publication: 'Publication Name',
  //   date: 'Month Year',
  //   description: 'Brief description of the coverage.',
  //   link: 'https://...',
  //   featured: false,
  // },
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
          Featured coverage of our ventures and the future we're building.
        </p>
      </div>

      {/* Featured Press */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
        {featuredPress.map((item, index) => (
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
            
            <div className="relative z-10">
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
              <h3 className="font-serif text-white text-xl md:text-2xl leading-tight mb-4 group-hover:text-[#E0E0E0] transition-colors">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-[#8A8A8A] text-base leading-relaxed mb-6">
                {item.description}
              </p>

              {/* Read More */}
              <div className="flex items-center text-[#B8B8B8] text-sm font-medium group-hover:text-white transition-colors">
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

