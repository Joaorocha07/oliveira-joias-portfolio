import Link from 'next/link'
import { getFeaturedProducts } from '@/app/lib/products'
import ProductCard from './ProductCard'

export default function FeaturedProducts() {
  const products = getFeaturedProducts()

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <p className="text-gold text-sm tracking-widest uppercase font-medium mb-3">
              Coleção
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-dark">
              Produtos em Destaque
            </h2>
          </div>
          <Link
            href="/aliancas"
            className="shrink-0 inline-flex items-center gap-2 text-gold hover:text-gold-dark text-sm font-semibold border border-gold/30 hover:border-gold px-5 py-2.5 rounded-full transition-all duration-200"
          >
            Ver todos
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
