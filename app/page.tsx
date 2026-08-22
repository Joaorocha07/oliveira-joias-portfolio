import Hero from './components/Hero'
import BenefitsStrip from './components/BenefitsStrip'
import MaterialsSection from './components/MaterialsSection'
import FeaturedProducts from './components/FeaturedProducts'
import CustomizationSection from './components/CustomizationSection'
import PurchaseJourney from './components/PurchaseJourney'
import AboutSection from './components/AboutSection'
import TestimonialsSection from './components/TestimonialsSection'
import FaqSection from './components/FaqSection'
import LocationSection from './components/LocationSection'
import FinalCta from './components/FinalCta'

export default function HomePage() {
  return (
    <>
      <Hero />
      <BenefitsStrip />
      <MaterialsSection />
      <FeaturedProducts />
      <CustomizationSection />
      <PurchaseJourney />
      <AboutSection />
      <TestimonialsSection />
      <FaqSection />
      <LocationSection />
      <FinalCta />
    </>
  )
}
