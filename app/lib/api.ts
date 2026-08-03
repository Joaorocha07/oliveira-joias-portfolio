import type { Product } from './products'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? ''

type ApiProduto = {
  id: string
  nome: string
  slug: string
  categoria: Product['category']
  linha: string | null
  material: string
  largura: string | null
  descricao: string
  valor: number
  parcelas: number | null
  imagens: string[]
  destaque: boolean
}

function formatBRL(value: number): string {
  return `R$ ${value.toFixed(2).replace('.', ',')}`
}

function mapProduct(p: ApiProduto): Product {
  return {
    id: p.id,
    slug: p.slug,
    name: p.nome,
    category: p.categoria,
    subcategory: p.linha ?? '',
    description: p.descricao,
    details: p.descricao,
    material: p.material,
    width: p.largura ?? '',
    installments: p.parcelas
      ? `${p.parcelas}x de ${formatBRL(p.valor / p.parcelas)} sem juros`
      : undefined,
    cashPrice: `${formatBRL(p.valor)} à vista`,
    images: p.imagens,
    featured: p.destaque,
  }
}

// revalidate: 60 — catálogo não muda a cada segundo, ISR de 1 minuto evita
// bater no backend a cada request mantendo os produtos razoavelmente atuais.
export async function fetchAllProducts(): Promise<Product[]> {
  if (!BACKEND_URL) return []
  try {
    const res = await fetch(`${BACKEND_URL}/api/produtos`, { next: { revalidate: 60 } })
    if (!res.ok) return []
    const { data } = (await res.json()) as { data: ApiProduto[] }
    return data.map(mapProduct)
  } catch {
    return []
  }
}

export async function fetchProductBySlug(slug: string): Promise<Product | undefined> {
  if (!BACKEND_URL) return undefined
  try {
    const res = await fetch(`${BACKEND_URL}/api/produtos/${slug}`, { next: { revalidate: 60 } })
    if (!res.ok) return undefined
    const { data } = (await res.json()) as { data: ApiProduto }
    return mapProduct(data)
  } catch {
    return undefined
  }
}
