import Image from 'next/image'
import Link from 'next/link'
import { getTopSubcategories, subcategoryAnchorId } from '@/app/lib/products'

export default function CategoriesSection() {
  const topLines = getTopSubcategories('alianças', 4)

  return (
    <section id="categorias" className="py-20 lg:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-gold text-sm tracking-widest uppercase font-medium mb-3">
            Explore
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-dark">
            Categorias em Destaque
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topLines.map((line) => {
            const featuredProduct = line.products.find((p) => p.images[0]) ?? line.products[0]
            return (
              <Link
                key={line.subcategory}
                href={`/aliancas#${subcategoryAnchorId(line.subcategory)}`}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                {featuredProduct.images[0] ? (
                  <Image
                    src={featuredProduct.images[0]}
                    alt={line.subcategory}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gray-100" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-white text-xl font-bold mb-1">{line.subcategory}</h3>
                  <p className="text-white/70 text-xs leading-relaxed">
                    {line.products.length} {line.products.length === 1 ? 'modelo' : 'modelos'} disponíveis
                  </p>
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 bg-gold/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
