import Image from 'next/image'
import Link from 'next/link'
import { getFeaturedProducts } from '@/app/lib/products'

export default async function FeaturedProducts() {
  const featured = await getFeaturedProducts()

  if (featured.length === 0) return null

  return (
    <section className="py-20 lg:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[11px] text-gold tracking-[0.2em] uppercase font-medium mb-3">
            Mais procurados
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] leading-[1.05] font-medium text-dark">
            Os queridinhos dos nossos clientes
          </h2>
          <p className="text-text/60 mt-4 text-base">
            Modelos que mais recebem pedidos de orçamento pelo WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {featured.map((p) => (
            <article
              key={p.id}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              <Link href={`/aliancas/${p.slug}`} className="block aspect-square overflow-hidden bg-gray-50">
                {p.images[0] ? (
                  <Image
                    src={p.images[0]}
                    alt={`${p.name} — Oliveira Joias`}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100" />
                )}
              </Link>

              <div className="p-3 sm:p-5 flex flex-col flex-1">
                <span className="text-[10px] text-gold-dark uppercase tracking-[0.14em] font-medium">
                  {p.material}
                </span>
                <h3 className="font-serif text-dark text-sm sm:text-xl font-semibold mt-1 sm:mt-1.5 mb-0.5 sm:mb-1 leading-snug line-clamp-2">
                  {p.name}
                </h3>
                {p.width && (
                  <p className="hidden sm:block text-text/50 text-xs">{p.width} · par de alianças</p>
                )}

                {p.valor > 0 && (
                  <div className="mt-auto pt-2 sm:pt-4 border-t border-gray-50">
                    <strong className="text-dark text-base sm:text-xl font-bold">
                      {formatBRL(p.valor)}
                    </strong>
                    {p.installments && (
                      <span className="hidden sm:block text-text/50 text-xs mt-0.5">
                        {p.installments}
                      </span>
                    )}
                  </div>
                )}

                <Link
                  href={`/aliancas/${p.slug}`}
                  className="mt-3 sm:mt-4 block text-center bg-dark hover:bg-gold hover:text-dark text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all duration-200"
                >
                  Ver produto
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/aliancas"
            className="inline-flex items-center gap-2 border border-gold/40 hover:border-gold text-gold-dark hover:text-gold text-sm font-semibold px-7 py-3.5 rounded-full transition-all duration-200"
          >
            Ver todos os modelos
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

function formatBRL(value: number) {
  return `R$ ${value.toFixed(2).replace('.', ',')}`
}
