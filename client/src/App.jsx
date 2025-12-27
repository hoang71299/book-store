import Header from './components/Header'
import HeroSection from './components/HeroSection'
import CategorySection from './components/CategorySection'
import ProductGrid from './components/ProductGrid'
import FeatureSection from './components/FeatureSection'
import TestimonialSection from './components/TestimonialSection'
import NewsletterSection from './components/NewsletterSection'

function App() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <HeroSection />
        <CategorySection />
        <ProductGrid />
        <FeatureSection />
        <TestimonialSection />
        <NewsletterSection />
      </main>
    </div>
  )
}

export default App
