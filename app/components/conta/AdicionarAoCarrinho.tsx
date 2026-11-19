'use client'

import { useState } from 'react'
import Link from 'next/link'
import { adicionarAoCarrinho } from '@/app/lib/carrinho'

export default function AdicionarAoCarrinho({
  slug, nome, valor, imagem,
}: {
  slug: string
  nome: string
  valor: number
  imagem: string | null
}) {
  const [observacao, setObservacao] = useState('')
  const [adicionado, setAdicionado] = useState(false)

  function adicionar() {
    adicionarAoCarrinho({ slug, nome, valor, imagem }, 1, observacao.trim())
    setAdicionado(true)
  }

  if (!valor) return null

  return (
    <div className="mb-3 flex flex-col gap-2.5">
      <input
        value={observacao}
        onChange={(e) => { setObservacao(e.target.value); setAdicionado(false) }}
        maxLength={200}
        placeholder="Numeração / gravação (opcional) — ex.: Ele 20 · Ela 16"
        className="w-full rounded-xl border border-gray-200 bg-surface px-4 py-3 text-sm text-ink placeholder-text/35 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/25"
      />
      <button
        type="button"
        onClick={adicionar}
        className="flex items-center justify-center gap-2 rounded-2xl bg-dark px-6 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-gold hover:text-dark dark:ring-1 dark:ring-inset dark:ring-white/15"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M3 3h2l.4 2M7 13h10l3-8H5.4M7 13L5.4 5M7 13l-2 5h13M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" />
        </svg>
        Adicionar ao carrinho
      </button>
      {adicionado && (
        <p className="text-center text-sm text-green-600" role="status">
          Adicionado! <Link href="/carrinho" className="font-semibold underline">Ver carrinho</Link>
        </p>
      )}
    </div>
  )
}
