import Image from 'next/image'
import Link from 'next/link'
import { categoryPaths, type Product } from '@/app/lib/products'

type Props = {
  product: Product
  showCategory?: boolean
}

export default function ProductCard({ product, showCategory = false }: Props) {
  const href = `/${categoryPaths[product.category] ?? 'aliancas'}/${product.slug}`

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      <Link href={href} className="block relative aspect-square overflow-hidden">
        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-gray-50 flex items-center justify-center text-text/30 text-xs font-medium">
            Foto em breve
          </div>
        )}
        {showCategory && (
          <div className="absolute top-3 left-3 bg-dark/80 backdrop-blur-sm text-gold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-medium">
            {product.category}
          </div>
        )}
      </Link>

      <div className="p-3 sm:p-5">
        <Link href={href}>
          <h3 className="font-serif text-dark text-sm sm:text-lg font-bold leading-tight hover:text-gold transition-colors mb-1 line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-[10px] sm:text-xs text-text/50 uppercase tracking-wider mb-2 sm:mb-3 line-clamp-1">
          {product.material}{product.width ? ` · ${product.width}` : ''}
        </p>
        <p className="hidden sm:block text-text/65 text-sm leading-relaxed mb-5 line-clamp-2">
          {product.description}
        </p>

        {product.installments && product.cashPrice && (
          <div className="mb-3 sm:mb-5 border-t border-gray-100 pt-2 sm:pt-4">
            <p className="font-semibold text-dark text-xs sm:text-base">{product.installments}</p>
            {product.valorTotalParcelado && (
              <p className="text-[9px] sm:text-[11px] text-text/45">
                Total: R$ {product.valorTotalParcelado.toFixed(2).replace('.', ',')}
              </p>
            )}
            <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-text/55">{product.cashPrice}</p>
          </div>
        )}

        <Link
          href={href}
          className="flex items-center justify-center gap-1.5 w-full bg-dark hover:bg-gold hover:text-dark text-white text-xs sm:text-sm font-semibold py-2 sm:py-3 px-3 sm:px-4 rounded-xl transition-colors duration-200"
        >
          Ver
          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
