import { fetchAllProducts, fetchProductBySlug } from './api'

export type Product = {
  id: string
  slug: string
  name: string
  category: string
  subcategory: string
  description: string
  details: string
  material: string
  width: string
  valor: number
  installments?: string
  cashPrice?: string
  valorTotalParcelado?: number
  images: string[]
  videos?: string[]
  featured: boolean
  ordem: number | null
}

export const categoryPaths: Record<string, string> = {
  'alianças': 'aliancas',
  'anéis': 'aneis',
  'correntes': 'correntes',
  'serviços': 'servicos',
  'moeda antiga': 'aliancas',
  'ouro': 'aliancas',
  'prata': 'aliancas',
}

const WHATSAPP_NUMBER = '5534998717389'

export function buildWhatsAppUrl(productName: string) {
  const text = `Olá! Vi no site da Oliveira Joias o produto ${productName} e tenho interesse. Poderia me passar mais informações?`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

export const WHATSAPP_GENERIC_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá! Gostaria de saber mais sobre os produtos da Oliveira Joias.')}`

export async function getAllProducts(): Promise<Product[]> {
  return fetchAllProducts()
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return fetchProductBySlug(slug)
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const products = await getAllProducts()
  const routePath = categoryPaths[category]
  return products.filter(
    (p) => p.category === category || (routePath && categoryPaths[p.category] === routePath)
  )
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getAllProducts()
  return products.filter((p) => p.featured)
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const products = await getAllProducts()
  return products
    .filter((p) => p.id !== product.id && p.subcategory === product.subcategory)
    .slice(0, limit)
}

export async function getProductsGroupedBySubcategory(
  category: string
): Promise<{ subcategory: string; products: Product[] }[]> {
  const groups: { subcategory: string; products: Product[] }[] = []
  for (const product of await getProductsByCategory(category)) {
    const group = groups.find((g) => g.subcategory === product.subcategory)
    if (group) {
      group.products.push(product)
    } else {
      groups.push({ subcategory: product.subcategory, products: [product] })
    }
  }
  return groups
}

export async function getTopSubcategories(
  category: string,
  limit = 4
): Promise<{ subcategory: string; products: Product[] }[]> {
  const groups = await getProductsGroupedBySubcategory(category)
  return [...groups]
    .sort((a, b) => b.products.length - a.products.length)
    .slice(0, limit)
}

export function subcategoryAnchorId(subcategory: string) {
  return subcategory
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, '-')
}
