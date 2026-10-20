import BenefitsStrip from '../components/BenefitsStrip'
import MaterialsSection from '../components/MaterialsSection'
import FeaturedProducts from '../components/FeaturedProducts'
import CustomizationSection from '../components/CustomizationSection'
import PurchaseJourney from '../components/PurchaseJourney'
import AboutSection from '../components/AboutSection'
import TestimonialsSection from '../components/TestimonialsSection'
import FaqSection from '../components/FaqSection'
import LocationSection from '../components/LocationSection'
import FinalCta from '../components/FinalCta'
import { getSite } from '../lib/site'

export default async function HomePage({ params }: { params: Promise<{ site: string }> }) {
  const site = getSite((await params).site)
  return (
    <>
      <MaterialsSection site={site} />
      <BenefitsStrip />
      <FeaturedProducts site={site} />
      <CustomizationSection site={site} />
      <PurchaseJourney />
      <AboutSection site={site} />
      <TestimonialsSection site={site} />
      <FaqSection />
      <LocationSection site={site} />
      <FinalCta site={site} />
    </>
  )
}
