'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { adicionarAoCarrinho } from '@/app/lib/carrinho'
import type { AroDisponivel } from '@/app/lib/products'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? ''

type Props = {
  slug: string
  nome: string
  valor: number
  imagem: string | null
  aros: AroDisponivel[]
  arosPar: boolean
  whatsappHref: string
}

export default function AdicionarAoCarrinho(props: Props) {
  const { slug, nome, valor, imagem, whatsappHref } = props
  // A página fica em cache por até 1h: busca a disponibilidade atual dos aros.
  const [config, setConfig] = useState({ aros: props.aros, arosPar: props.arosPar })
  const [escolhidos, setEscolhidos] = useState<(number | null)[]>([null, null])
  const [slotAtivo, setSlotAtivo] = useState(0)
  const [observacao, setObservacao] = useState('')
  const [adicionado, setAdicionado] = useState(false)
  const [aviso, setAviso] = useState<string | null>(null)

  useEffect(() => {
    if (!BACKEND_URL) return
    let ativo = true
    fetch(`${BACKEND_URL}/api/produtos/${encodeURIComponent(slug)}/aros`, { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((json: { data?: { aros: AroDisponivel[]; aros_par: boolean } } | null) => {
        if (!ativo || !json?.data) return
        const novo = { aros: json.data.aros, arosPar: json.data.aros_par }
        setConfig(novo)
        // Descarta escolhas que deixaram de estar disponíveis.
        setEscolhidos((prev) => prev.map((a) => (a != null && novo.aros.some((x) => x.aro === a && x.qtd > 0) ? a : null)))
      })
      .catch(() => { /* mantém os dados da página */ })
    return () => { ativo = false }
  }, [slug])

  if (!valor) return null

  const temAros = config.aros.length > 0
  const slots = config.arosPar ? 2 : 1
  const selecionados = escolhidos.slice(0, slots)
  const completo = !temAros || selecionados.every((a) => a != null)

  // Aro indisponível para o slot ativo: sem estoque, ou só 1 unidade e ela já
  // está escolhida na outra aliança do par.
  function indisponivel(a: AroDisponivel) {
    if (a.qtd <= 0) return true
    if (slots === 2 && a.qtd < 2) return escolhidos[1 - slotAtivo] === a.aro
    return false
  }

  function escolher(aro: number) {
    setAviso(null)
    setAdicionado(false)
    setEscolhidos((prev) => {
      const novo = [...prev]
      novo[slotAtivo] = aro
      return novo
    })
    // Depois de escolher a 1ª, passa para a 2ª aliança se ainda estiver vazia.
    if (slots === 2 && slotAtivo === 0 && escolhidos[1] == null) setSlotAtivo(1)
  }

  function adicionar() {
    if (!completo) {
      setAviso(slots === 2 ? 'Escolha o aro das duas alianças.' : 'Escolha o aro.')
      return
    }
    adicionarAoCarrinho(
      { slug, nome, valor, imagem, ...(temAros ? { aros: selecionados as number[] } : {}) },
      1,
      observacao.trim(),
    )
    setAdicionado(true)
  }

  const resumo = selecionados.filter((a) => a != null).join(' e ')
  const disponiveis = config.aros.filter((a) => a.qtd > 0).length

  return (
    <div className="mb-3 flex flex-col gap-2.5">
      {temAros && (
        <div className="mb-2">
          <div className="flex items-baseline justify-between border-t border-gray-100 pt-5">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-ink">Aro</h2>
            <span className="text-base text-ink tabular-nums">{resumo}</span>
          </div>

          {slots === 2 && (
            <div className="mt-3 grid grid-cols-2 gap-2" role="tablist" aria-label="Escolha a aliança">
              {[0, 1].map((i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={slotAtivo === i}
                  onClick={() => setSlotAtivo(i)}
                  className={`rounded-xl border px-3 py-2 text-left text-xs transition-colors ${
                    slotAtivo === i ? 'border-ink bg-ink/5 text-ink' : 'border-gray-200 text-text/60 hover:border-gray-400'
                  }`}
                >
                  <span className="block font-semibold uppercase tracking-wider">Aliança {i + 1}</span>
                  <span className="text-text/60">{escolhidos[i] != null ? `Aro ${escolhidos[i]}` : 'Escolher aro'}</span>
                </button>
              ))}
            </div>
          )}

          <div className="mt-3 grid grid-cols-6 gap-1.5 sm:grid-cols-8" role="radiogroup" aria-label="Aros disponíveis">
            {config.aros.map((a) => {
              const off = indisponivel(a)
              const ativo = escolhidos[slotAtivo] === a.aro
              return (
                <button
                  key={a.aro}
                  type="button"
                  role="radio"
                  aria-checked={ativo}
                  disabled={off}
                  onClick={() => escolher(a.aro)}
                  title={off ? (a.qtd <= 0 ? 'Indisponível no momento' : 'Só 1 unidade deste aro') : `Aro ${a.aro}`}
                  className={`h-11 rounded-md border text-sm tabular-nums transition-colors ${
                    ativo
                      ? 'border-ink bg-ink text-cream'
                      : off
                        ? 'cursor-not-allowed border-gray-100 text-text/25 line-through'
                        : 'border-gray-300 text-ink hover:border-ink'
                  }`}
                >
                  {a.aro}
                </button>
              )
            })}
          </div>

          <p className="mt-2 text-xs text-text/50">
            {disponiveis === 0 ? 'Nenhum aro disponível no momento. ' : 'Não achou seu aro? '}
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="font-semibold text-gold hover:underline">
              Fale com a gente
            </a>{' '}
            — fazemos sob encomenda.
          </p>
        </div>
      )}

      <input
        value={observacao}
        onChange={(e) => { setObservacao(e.target.value); setAdicionado(false) }}
        maxLength={200}
        placeholder={temAros ? 'Gravação (opcional)' : 'Numeração / gravação (opcional) — ex.: Ele 20 · Ela 16'}
        className="w-full rounded-xl border border-gray-200 bg-surface px-4 py-3 text-sm text-ink placeholder-text/35 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/25"
      />
      <button
        type="button"
        onClick={adicionar}
        disabled={temAros && disponiveis === 0}
        className="flex items-center justify-center gap-2 rounded-2xl bg-dark px-6 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-gold hover:text-dark disabled:cursor-not-allowed disabled:opacity-50 dark:ring-1 dark:ring-inset dark:ring-white/15"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M3 3h2l.4 2M7 13h10l3-8H5.4M7 13L5.4 5M7 13l-2 5h13M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" />
        </svg>
        Adicionar ao carrinho
      </button>
      {aviso && <p className="text-center text-sm text-red-500" role="alert">{aviso}</p>}
      {adicionado && (
        <p className="text-center text-sm text-green-600" role="status">
          Adicionado{resumo ? ` (aro ${resumo})` : ''}! <Link href="/carrinho" className="font-semibold underline">Ver carrinho</Link>
        </p>
      )}
    </div>
  )
}
