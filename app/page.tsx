import Hero from './components/Hero'
import AboutSection from './components/AboutSection'
import CategoriesSection from './components/CategoriesSection'
import FeaturedProducts from './components/FeaturedProducts'
import TestimonialsSection from './components/TestimonialsSection'
import LocationSection from './components/LocationSection'

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <CategoriesSection />
      <FeaturedProducts />
      <TestimonialsSection />
      <LocationSection />
    </>
  )
}
