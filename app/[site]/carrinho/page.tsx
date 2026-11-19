import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getSite } from '@/app/lib/site'
import CarrinhoView from '@/app/components/conta/CarrinhoView'

export const metadata: Metadata = { title: 'Carrinho', robots: { index: false } }

// Contas e carrinho existem só no site com hasAccount (Oliveira Joias).
export default async function Page({ params }: { params: Promise<{ site: string }> }) {
  const site = getSite((await params).site)
  if (!site.hasAccount) notFound()
  return <CarrinhoView site={site} />
}
