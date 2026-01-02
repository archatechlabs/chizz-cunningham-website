import Nav from '@/components/Nav'
import HeroCard from '@/components/HeroCard'

export default function Home() {
  return (
    <main className="min-h-screen bg-off-white">
      {/* Main container with padding */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Navigation */}
        <Nav />
        
        {/* Hero Section */}
        <div className="mt-8 md:mt-12">
          <HeroCard />
        </div>
      </div>
    </main>
  )
}

