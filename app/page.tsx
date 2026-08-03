import Hero from './components/Hero'
import AboutSection from './components/AboutSection'
import CategoriesSection from './components/CategoriesSection'
import FeaturedProducts from './components/FeaturedProducts'
import TestimonialsSection from './components/TestimonialsSection'
import LocationSection from './components/LocationSection'
import BenefitsStrip from './components/BenefitsStrip'
import PurchaseJourney from './components/PurchaseJourney'
import FaqSection from './components/FaqSection'
import FinalCta from './components/FinalCta'

export default function HomePage() {
  return (
    <>
      <Hero />
      <BenefitsStrip />
      <AboutSection />
      <CategoriesSection />
      <FeaturedProducts />
      <PurchaseJourney />
      <TestimonialsSection />
      <FaqSection />
      <LocationSection />
      <FinalCta />
    </>
  )
}
