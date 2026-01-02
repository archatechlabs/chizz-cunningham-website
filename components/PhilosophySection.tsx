'use client'

const pillars = [
  {
    title: 'Ownership Over Extraction',
    description: 'Building products where users and creators own their data, identity, and upside—not just rent access.',
  },
  {
    title: 'Culture + Technology as a Moat',
    description: 'The most defensible companies understand culture deeply. Technology is the lever; culture is the foundation.',
  },
  {
    title: 'Long-Term Systems Thinking',
    description: 'No quick hacks. I build infrastructure and ecosystems designed to compound over decades, not quarters.',
  },
]

export default function PhilosophySection() {
  return (
    <section 
      id="philosophy" 
      aria-labelledby="philosophy-heading"
      className="w-full max-w-hero mx-auto py-24 md:py-32"
    >
      {/* Section Header */}
      <div className="text-center mb-16 md:mb-20">
        <p className="text-[#8A8A8A] text-xs sm:text-sm font-medium tracking-[0.2em] uppercase mb-4">
          Philosophy
        </p>
        <h2 
          id="philosophy-heading"
          className="font-serif text-[#1A1A1C] text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] tracking-[-0.02em]"
        >
          Why I Build
        </h2>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-16 md:mb-20">
        {pillars.map((pillar, index) => (
          <div 
            key={pillar.title}
            className="group relative p-8 md:p-10 bg-white rounded-2xl border border-[#E8E8E6] hover:border-[#D0D0CE] transition-all duration-300 hover:shadow-lg"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Number indicator */}
            <span className="absolute top-6 right-6 text-[#E0E0DE] text-sm font-medium">
              0{index + 1}
            </span>
            
            <h3 className="font-serif text-[#1A1A1C] text-xl md:text-2xl leading-tight mb-4">
              {pillar.title}
            </h3>
            <p className="text-[#6A6A6A] text-base leading-relaxed">
              {pillar.description}
            </p>
          </div>
        ))}
      </div>

      {/* Throughline Paragraph */}
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-block w-12 h-[1px] bg-[#D0D0CE] mb-8" />
        <p className="text-[#4A4A4A] text-lg md:text-xl leading-relaxed font-light">
          Every venture I build connects back to one idea: <span className="text-[#1A1A1C] font-normal">technology should empower people to own their future</span>—whether that's their health data, their creative work, their community, or their economic upside. I'm not interested in building another extractive platform. I'm building the infrastructure for the next generation of ownership.
        </p>
      </div>
    </section>
  )
}

