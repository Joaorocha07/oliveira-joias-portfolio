import type { Metadata } from 'next'
import Image from 'next/image'
import { getAllProducts, categoryPaths } from '@/app/lib/products'
import AliancasContent from './aliancas-content'

export const metadata: Metadata = {
  title: 'Alianças',
  description:
    'Coleção completa de alianças da Oliveira Joias. Aurora, Classic, Lumina, Essenza e muito mais. Alianças em prata com qualidade e tradição.',
}

export default async function AliancasPage() {
  const all = await getAllProducts()
  const products = all.filter((p) => categoryPaths[p.category] === 'aliancas')

  return (
    <>
      <section
        className="relative min-h-[320px] flex items-end overflow-hidden"
        style={{
          background: 'linear-gradient(110deg, #090909 0%, #121213 58%, #090909 100%)',
        }}
      >
        <div className="absolute inset-0 opacity-40">
          <Image
            src="/images/capa-desktop-aliancas.png"
            alt="Coleção de Alianças Oliveira Joias"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <p className="text-[11px] text-gold tracking-[0.2em] uppercase font-medium mb-2">
            Coleção
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-medium text-white mb-2">
            Catálogo de Alianças
          </h1>
          <p className="text-white/50 text-sm">
            {products.length} {products.length === 1 ? 'modelo disponível' : 'modelos disponíveis'}
          </p>
        </div>
      </section>

      <AliancasContent products={products} />
    </>
  )
}
