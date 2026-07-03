import type { Metadata } from 'next'
import Image from 'next/image'
import { getProductsByCategory, getProductsGroupedBySubcategory, subcategoryAnchorId } from '@/app/lib/products'
import ProductCard from '@/app/components/ProductCard'

export const metadata: Metadata = {
  title: 'Alianças',
  description:
    'Coleção completa de alianças da Oliveira Joias. Aurora, Classic, Lumina, Essenza e muito mais. Alianças em prata com qualidade e tradição.',
}

export default function AliancasPage() {
  const products = getProductsByCategory('alianças')
  const groups = getProductsGroupedBySubcategory('alianças')

  return (
    <>
      <section className="relative h-72 sm:h-96 flex items-end overflow-hidden">
        <Image
          src="/images/colecao-copa-do-mundo-mobile.png"
          alt="Coleção de Alianças Oliveira Joias"
          fill
          className="object-cover object-[50%_70%] sm:hidden"
          priority
          sizes="100vw"
        />
        <Image
          src="/images/colecao-copa-do-mundo-desktop.png"
          alt="Coleção de Alianças Oliveira Joias"
          fill
          className="object-cover object-[75%_68%] hidden sm:block"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/70 to-dark/45" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
          <p className="text-gold text-sm tracking-widest uppercase font-medium mb-2">
            Coleção
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white">
            Alianças
          </h1>
          <p className="text-white/60 text-sm mt-2">
            {products.length} modelos disponíveis em {groups.length} linhas
          </p>
        </div>
      </section>

      <nav className="sticky top-16 lg:top-20 z-30 bg-cream/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap gap-2">
          {groups.map((group) => (
            <a
              key={group.subcategory}
              href={`#${subcategoryAnchorId(group.subcategory)}`}
              className="text-xs uppercase tracking-wide font-medium px-4 py-2 rounded-full border border-gold/30 text-gold-dark hover:bg-gold hover:text-dark hover:border-gold transition-colors duration-200"
            >
              {group.subcategory}
              <span className="text-text/40 ml-1.5">({group.products.length})</span>
            </a>
          ))}
        </div>
      </nav>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {groups.map((group) => (
            <div key={group.subcategory} id={subcategoryAnchorId(group.subcategory)} className="scroll-mt-32">
              <div className="flex items-end justify-between mb-8 border-b border-gray-100 pb-4">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-dark">
                  Linha {group.subcategory}
                </h2>
                <span className="text-text/40 text-sm">
                  {group.products.length} {group.products.length === 1 ? 'modelo' : 'modelos'}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {group.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
