import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  getProductBySlug,
  getProductsByCategory,
  getRelatedProducts,
  buildWhatsAppUrl,
} from '@/app/lib/products'
import { fetchCatalogoConfig } from '@/app/lib/api'
import ImageGallery from '@/app/components/ImageGallery'
import ProductCard from '@/app/components/ProductCard'
import ProductDetailsInfo from '@/app/components/ProductDetailsInfo'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return {}
  return {
    title: product.name,
    description: product.description,
  }
}

export async function generateStaticParams() {
  const products = await getProductsByCategory('alianças')
  return products.map((p) => ({ slug: p.slug }))
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const [product, config] = await Promise.all([
    getProductBySlug(slug),
    fetchCatalogoConfig(),
  ])

  if (!product) notFound()

  const related = await getRelatedProducts(product, 4)
  const whatsappUrl = buildWhatsAppUrl(product.name)

  return (
    <>
      <div className="pt-20 lg:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center gap-2 text-sm text-text/50 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-gold transition-colors">Início</Link>
            <span>/</span>
            <Link href="/aliancas" className="hover:text-gold transition-colors">Alianças</Link>
            <span>/</span>
            <span className="text-text/80">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <ImageGallery images={product.images} videos={product.videos} productName={product.name} />

            <div className="flex flex-col">
              <p className="text-gold text-xs uppercase tracking-widest font-medium mb-2">
                {product.subcategory}
              </p>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-dark leading-tight mb-4">
                {product.name}
              </h1>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-xs bg-gold/10 text-gold-dark px-3 py-1 rounded-full font-medium">
                  {product.material}
                </span>
                <span className="text-xs bg-gray-100 text-text/70 px-3 py-1 rounded-full font-medium">
                  Largura: {product.width}
                </span>
              </div>

              <p className="text-text/70 leading-relaxed mb-8 text-base">
                {product.details}
              </p>

              {product.installments && product.cashPrice && (
                <div className="mb-8 rounded-2xl border border-gold/20 bg-gold/5 p-5">
                  <p className="text-xs font-medium uppercase tracking-widest text-gold-dark">Valor do par</p>
                  <p className="mt-2 font-serif text-2xl font-bold text-dark">{product.installments}</p>
                  <p className="mt-1 text-sm text-text/60">{product.cashPrice}</p>
                </div>
              )}

              <div className="border-t border-gray-100 pt-8 mb-8">
                <h2 className="font-serif text-dark font-bold text-lg mb-4">Especificações</h2>
                <dl className="grid grid-cols-2 gap-3">
                  <div>
                    <dt className="text-xs text-text/40 uppercase tracking-wide">Material</dt>
                    <dd className="text-sm font-medium text-dark mt-0.5">{product.material}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-text/40 uppercase tracking-wide">Largura</dt>
                    <dd className="text-sm font-medium text-dark mt-0.5">{product.width}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-text/40 uppercase tracking-wide">Categoria</dt>
                    <dd className="text-sm font-medium text-dark mt-0.5 capitalize">{product.category}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-text/40 uppercase tracking-wide">Linha</dt>
                    <dd className="text-sm font-medium text-dark mt-0.5">{product.subcategory}</dd>
                  </div>
                </dl>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-whatsapp hover:bg-whatsapp-dark text-white font-semibold py-4 px-6 rounded-2xl transition-colors duration-200 text-base mt-auto"
                aria-label={`Enviar mensagem no WhatsApp sobre ${product.name}`}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chamar no WhatsApp
              </a>
              <p className="text-center text-text/40 text-xs mt-3">
                Resposta rápida · Atendimento personalizado
              </p>
            </div>
          </div>

          <div className="max-w-3xl">
            <ProductDetailsInfo width={product.width} config={config} />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="py-16 bg-cream mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-dark mb-8">
              Produtos Relacionados
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
