import Image from 'next/image'
import Link from 'next/link'
import { categoryPaths, type Product } from '@/app/lib/products'

type Props = {
  product: Product
  showCategory?: boolean
}

export default function ProductCard({ product, showCategory = false }: Props) {
  const href = `/${categoryPaths[product.category]}/${product.slug}`

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      <Link href={href} className="block relative aspect-square overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
        />
        {showCategory && (
          <div className="absolute top-3 left-3 bg-dark/80 backdrop-blur-sm text-gold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-medium">
            {product.category}
          </div>
        )}
      </Link>

      <div className="p-5">
        <Link href={href}>
          <h3 className="font-serif text-dark text-lg font-bold leading-tight hover:text-gold transition-colors mb-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-text/50 uppercase tracking-wider mb-3">
          {product.material} · {product.width}
        </p>
        <p className="text-text/65 text-sm leading-relaxed mb-5 line-clamp-2">
          {product.description}
        </p>

        <Link
          href={href}
          className="flex items-center justify-center gap-2 w-full bg-dark hover:bg-gold hover:text-dark text-white text-sm font-semibold py-3 px-4 rounded-xl transition-colors duration-200"
        >
          Ver Produto
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
