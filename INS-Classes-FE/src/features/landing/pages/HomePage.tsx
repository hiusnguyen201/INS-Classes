import { Navbar } from '@/features/landing/components/Navbar'
import { HeroSection } from '@/features/landing/components/HeroSection'
import { StatsBar } from '@/features/landing/components/StatsBar'
import { FeaturesSection } from '@/features/landing/components/FeaturesSection'
import { AiSection } from '@/features/landing/components/AiSection'
import { RolesSection } from '@/features/landing/components/RolesSection'
import { TestimonialSection } from '@/features/landing/components/TestimonialSection'
import { CtaSection } from '@/features/landing/components/CtaSection'
import { Footer } from '@/features/landing/components/Footer'

export function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsBar />
        <FeaturesSection />
        <AiSection />
        <RolesSection />
        <TestimonialSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}
