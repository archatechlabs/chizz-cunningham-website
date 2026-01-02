import Nav from '@/components/Nav'
import HeroCard from '@/components/HeroCard'
import PhilosophySection from '@/components/PhilosophySection'
import VenturesSection from '@/components/VenturesSection'
import ContactSection from '@/components/ContactSection'

export default function Home() {
  return (
    <main className="min-h-screen bg-off-white relative overflow-hidden">
      {/* Subtle background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top right gradient blob */}
        <div 
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.03]"
          style={{
            background: 'radial-gradient(circle, #1A1A1C 0%, transparent 70%)',
          }}
        />
        {/* Bottom left gradient blob */}
        <div 
          className="absolute -bottom-60 -left-60 w-[800px] h-[800px] rounded-full opacity-[0.02]"
          style={{
            background: 'radial-gradient(circle, #1A1A1C 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Main container */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="py-6 md:py-8">
          <Nav />
        </div>
        
        {/* Hero Section */}
        <div className="mt-4 md:mt-8">
          <HeroCard />
        </div>

        {/* Philosophy Section */}
        <PhilosophySection />

        {/* Ventures Section */}
        <VenturesSection />

        {/* Contact Section */}
        <ContactSection />
      </div>
    </main>
  )
}
