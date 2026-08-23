'use client'

import { useState, useMemo } from 'react'
import type { Product } from '@/app/lib/products'
import { subcategoryAnchorId } from '@/app/lib/products'
import ProductCard from '@/app/components/ProductCard'

const FAIXAS_PRECO = [
  { value: 'ate-300', label: 'Até R$ 300', min: 1, max: 300 },
  { value: '300-500', label: 'R$ 300 – R$ 500', min: 300, max: 500 },
  { value: '500-1000', label: 'R$ 500 – R$ 1.000', min: 500, max: 1000 },
  { value: '1000+', label: 'Acima de R$ 1.000', min: 1000, max: Infinity },
]

type Group = { subcategory: string; products: Product[] }

function groupBySubcategory(products: Product[]): Group[] {
  const groups: Group[] = []
  for (const product of products) {
    const sub = product.subcategory
    const group = groups.find((g) => g.subcategory === sub)
    if (group) group.products.push(product)
    else groups.push({ subcategory: sub, products: [product] })
  }
  return groups
}

function sortWidths(widths: string[]): string[] {
  return [...widths].sort((a, b) => (parseFloat(a) || 0) - (parseFloat(b) || 0))
}

function ChevronDown() {
  return (
    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
    </svg>
  )
}

function FilterSelect({
  label,
  value,
  onChange,
  children,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-[10px] font-semibold text-text/40 uppercase tracking-[0.12em] mb-1.5">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none text-sm border border-gray-200 rounded-lg px-3 py-2.5 pr-8 text-dark bg-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-colors cursor-pointer"
        >
          {children}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center">
          <ChevronDown />
        </span>
      </div>
    </div>
  )
}

export default function AliancasContent({ products, categorias }: { products: Product[]; categorias: string[] }) {
  const [busca, setBusca] = useState('')
  const [material, setMaterial] = useState('')
  const [largura, setLargura] = useState('')
  const [acabamento, setAcabamento] = useState('')
  const [faixaPreco, setFaixaPreco] = useState('')

  const materiais = useMemo(
    () => [...categorias].sort((a, b) => a.localeCompare(b, 'pt-BR')),
    [categorias],
  )

  const larguras = useMemo(() => {
    const s = new Set<string>()
    for (const p of products) if (p.width) s.add(p.width)
    return sortWidths([...s])
  }, [products])

  const acabamentos = useMemo(() => {
    const s = new Set<string>()
    for (const p of products) if (p.subcategory) s.add(p.subcategory)
    return [...s].sort()
  }, [products])

  const hasActiveFilters = !!(busca || material || largura || acabamento || faixaPreco)

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (busca && !p.name.toLowerCase().includes(busca.toLowerCase())) return false
      if (material && p.category.toLowerCase() !== material.toLowerCase()) return false
      if (largura && p.width !== largura) return false
      if (acabamento && p.subcategory !== acabamento) return false
      if (faixaPreco) {
        const faixa = FAIXAS_PRECO.find((f) => f.value === faixaPreco)
        if (faixa) {
          if (p.valor <= 0 || p.valor < faixa.min || p.valor > faixa.max) return false
        }
      }
      return true
    })
  }, [products, busca, material, largura, acabamento, faixaPreco])

  const groups = useMemo(() => groupBySubcategory(filtered), [filtered])

  function limparFiltros() {
    setBusca('')
    setMaterial('')
    setLargura('')
    setAcabamento('')
    setFaixaPreco('')
  }

  return (
    <>
      {/* Barra de filtros */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Busca */}
            <div className="sm:col-span-2 lg:col-span-1">
              <label className="block text-[10px] font-semibold text-text/40 uppercase tracking-[0.12em] mb-1.5">
                Buscar modelo
              </label>
              <div className="relative">
                <svg
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text/30"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
                <input
                  type="text"
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  placeholder="Ex: Aurora, Classic, Lumina..."
                  className="w-full text-sm border border-gray-200 rounded-lg pl-9 pr-3 py-2.5 text-dark placeholder-text/30 bg-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-colors"
                />
              </div>
            </div>

            {/* Material */}
            <FilterSelect label="Material" value={material} onChange={setMaterial}>
              <option value="">Todos</option>
              {materiais.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </FilterSelect>

            {/* Largura */}
            <FilterSelect label="Largura" value={largura} onChange={setLargura}>
              <option value="">Todas</option>
              {larguras.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </FilterSelect>

            {/* Acabamento */}
            <FilterSelect label="Acabamento" value={acabamento} onChange={setAcabamento}>
              <option value="">Todos</option>
              {acabamentos.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </FilterSelect>

            {/* Faixa de preço */}
            <FilterSelect label="Faixa de preço" value={faixaPreco} onChange={setFaixaPreco}>
              <option value="">Todas</option>
              {FAIXAS_PRECO.map((f) => (
                <option key={f.value} value={f.value}>{f.label}</option>
              ))}
            </FilterSelect>
          </div>

          {/* Resultado + limpar */}
          <div className={`flex items-center justify-between mt-3 pt-3 border-t border-gray-50 transition-opacity ${hasActiveFilters ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <span className="text-xs text-text/50">
              <span className="font-semibold text-dark">{filtered.length}</span>{' '}
              {filtered.length === 1 ? 'modelo encontrado' : 'modelos encontrados'}
            </span>
            <button
              onClick={limparFiltros}
              className="text-xs text-gold-dark hover:text-gold font-semibold transition-colors flex items-center gap-1"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Limpar filtros
            </button>
          </div>
        </div>
      </div>

      {/* Grid de produtos */}
      <section className="py-16 lg:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {groups.map((group) => (
            <div
              key={group.subcategory || '__sem_linha__'}
              id={subcategoryAnchorId(group.subcategory || 'todos')}
              className="scroll-mt-28"
            >
              {!hasActiveFilters && (
                <div className="flex items-end justify-between mb-8 border-b border-gray-200 pb-4">
                  <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-dark">
                    {group.subcategory ? `Linha ${group.subcategory}` : 'Todos os modelos'}
                  </h2>
                  <span className="text-text/40 text-sm">
                    {group.products.length} {group.products.length === 1 ? 'modelo' : 'modelos'}
                  </span>
                </div>
              )}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
                {group.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-24 text-text/40">
              <svg className="w-12 h-12 mx-auto mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              {material && !busca && !largura && !acabamento && !faixaPreco ? (
                <>
                  <p className="font-serif text-2xl mb-2">Nenhum produto cadastrado</p>
                  <p className="text-sm mb-5">Não há produto cadastrado para esse material ainda.</p>
                </>
              ) : (
                <>
                  <p className="font-serif text-2xl mb-2">Nenhum modelo encontrado</p>
                  <p className="text-sm mb-5">Tente ajustar os filtros para ver mais opções.</p>
                </>
              )}
              <button
                onClick={limparFiltros}
                className="text-sm font-semibold text-gold-dark hover:text-gold border border-gold/30 hover:border-gold px-5 py-2 rounded-full transition-all duration-200"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
