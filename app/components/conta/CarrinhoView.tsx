'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { type SiteConfig, whatsappUrl } from '@/app/lib/site'
import { useSessao } from '@/app/lib/sessao'
import {
  alterarObservacao, alterarQuantidade, formatBRL, limparCarrinho, useCarrinho, type ItemCarrinho,
} from '@/app/lib/carrinho'
import { btnPrimario, btnSecundario, enviar, inputClass } from './ui'
import { descricaoCupom, type DadosConta } from './ContaView'

type Cupom = DadosConta['cupons'][number]
type PedidoCriado = {
  numero: number
  itens: { nome: string; quantidade: number; subtotal: number; observacao: string | null }[]
  subtotal: number
  desconto: number
  total: number
  cupom_codigo: string | null
}

function descontoPrevisto(cupom: Cupom | undefined, subtotal: number) {
  if (!cupom) return 0
  const bruto = cupom.tipo === 'percentual' ? (subtotal * cupom.valor) / 100 : cupom.valor
  return Math.round(Math.min(bruto, subtotal) * 100) / 100
}

function mensagemWhatsApp(p: PedidoCriado) {
  const linhas = [
    `Olá! Fiz o pedido #${p.numero} pelo site:`,
    ...p.itens.map((i) => `• ${i.quantidade}x ${i.nome}${i.observacao ? ` (${i.observacao})` : ''} — ${formatBRL(i.subtotal)}`),
    '',
    `Subtotal: ${formatBRL(p.subtotal)}`,
    ...(p.cupom_codigo ? [`Cupom ${p.cupom_codigo}: −${formatBRL(p.desconto)}`] : []),
    `Total: ${formatBRL(p.total)}`,
  ]
  return linhas.join('\n')
}

export default function CarrinhoView({ site }: { site: SiteConfig }) {
  const { itens, subtotal } = useCarrinho()
  const logado = useSessao()
  const [cupons, setCupons] = useState<Cupom[]>([])
  const [cupomId, setCupomId] = useState<string>('')
  const [observacoes, setObservacoes] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState<string | null>(null)
  const [pedido, setPedido] = useState<PedidoCriado | null>(null)

  useEffect(() => {
    if (!logado) return
    let ativo = true
    void enviar<DadosConta>('/api/conta', 'GET').then((r) => {
      if (ativo && r.ok && r.data) setCupons(r.data.cupons)
    })
    return () => { ativo = false }
  }, [logado])

  const cupom = cupons.find((c) => c.id === cupomId)
  const desconto = descontoPrevisto(cupom, subtotal)

  async function finalizar() {
    setErro(null)
    setEnviando(true)
    const r = await enviar<PedidoCriado>('/api/conta/pedidos', 'POST', {
      itens: itens.map((i) => ({ slug: i.slug, quantidade: i.quantidade, observacao: i.observacao || undefined })),
      cupom_id: cupomId || null,
      observacoes: observacoes.trim() || undefined,
    })
    setEnviando(false)
    if (!r.ok || !r.data) {
      setErro(r.error ?? 'Não foi possível registrar o pedido. Tente novamente.')
      return
    }
    setPedido(r.data)
    limparCarrinho()
  }

  if (pedido) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Pedido registrado</p>
        <h1 className="mt-3 font-serif text-3xl font-semibold text-ink">Pedido #{pedido.numero}</h1>
        <p className="mt-3 text-sm text-text/60">
          Falta só um passo: envie o pedido no WhatsApp para combinarmos pagamento, numeração e entrega.
        </p>
        <p className="mt-4 text-lg text-ink">Total: <strong>{formatBRL(pedido.total)}</strong></p>
        <a
          href={whatsappUrl(site, mensagemWhatsApp(pedido))}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-whatsapp py-4 text-base font-semibold text-white transition-colors hover:bg-whatsapp-dark"
        >
          Enviar pedido no WhatsApp
        </a>
        <Link href="/conta" className="mt-4 inline-block text-sm font-semibold text-gold hover:underline">
          Ver meus pedidos
        </Link>
      </div>
    )
  }

  if (itens.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="font-serif text-3xl font-semibold text-ink">Seu carrinho está vazio</h1>
        <p className="mt-3 text-sm text-text/60">Escolha suas alianças e adicione ao carrinho.</p>
        <Link href="/aliancas" className={`${btnPrimario} mt-6`}>Ver alianças</Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <h1 className="font-serif text-3xl font-semibold text-ink sm:text-4xl">Carrinho</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <ul className="space-y-4">
          {itens.map((item, index) => (
            <ItemLinha key={`${item.slug}-${index}`} item={item} index={index} />
          ))}
        </ul>

        <aside className="h-fit rounded-2xl border border-gray-100 bg-surface p-5 shadow-sm lg:sticky lg:top-32">
          <h2 className="font-serif text-xl font-semibold text-ink">Resumo</h2>

          {logado && cupons.length > 0 && (
            <label className="mt-4 flex flex-col gap-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-text/50">Cupom</span>
              <select value={cupomId} onChange={(e) => setCupomId(e.target.value)} className={inputClass}>
                <option value="">Não usar cupom</option>
                {cupons.map((c) => (
                  <option key={c.id} value={c.id}>{c.codigo} — {descricaoCupom(c)}</option>
                ))}
              </select>
            </label>
          )}

          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between text-text/70"><dt>Subtotal</dt><dd>{formatBRL(subtotal)}</dd></div>
            {desconto > 0 && (
              <div className="flex justify-between text-green-600"><dt>Cupom {cupom?.codigo}</dt><dd>−{formatBRL(desconto)}</dd></div>
            )}
            <div className="flex justify-between border-t border-gray-100 pt-2 text-base font-semibold text-ink">
              <dt>Total</dt><dd>{formatBRL(subtotal - desconto)}</dd>
            </div>
          </dl>

          {logado ? (
            <>
              <textarea
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                maxLength={500}
                rows={2}
                placeholder="Observações (opcional)"
                className={`${inputClass} mt-4 resize-none`}
              />
              {erro && <p className="mt-3 text-sm text-red-500" role="alert">{erro}</p>}
              <button type="button" onClick={() => void finalizar()} disabled={enviando} className={`${btnPrimario} mt-4 w-full py-3.5`}>
                {enviando ? 'Registrando...' : 'Finalizar pedido'}
              </button>
              <p className="mt-2 text-center text-xs text-text/45">
                Você confirma pagamento e entrega com a gente pelo WhatsApp.
              </p>
            </>
          ) : logado === false ? (
            <>
              <p className="mt-4 text-sm text-text/60">Entre na sua conta para finalizar o pedido e usar seus cupons.</p>
              <Link href="/entrar?voltar=/carrinho" className={`${btnPrimario} mt-3 w-full py-3.5`}>Entrar ou criar conta</Link>
            </>
          ) : null}
        </aside>
      </div>
    </div>
  )
}

function ItemLinha({ item, index }: { item: ItemCarrinho; index: number }) {
  return (
    <li className="flex gap-4 rounded-2xl border border-gray-100 bg-surface p-4 shadow-sm">
      <Link href={`/aliancas/${item.slug}`} className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-gray-50">
        {item.imagem && <Image src={item.imagem} alt={item.nome} fill sizes="96px" className="object-cover" />}
      </Link>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <Link href={`/aliancas/${item.slug}`} className="font-serif font-semibold leading-snug text-ink hover:text-gold">
            {item.nome}
          </Link>
          <p className="flex-shrink-0 font-semibold text-ink">{formatBRL(item.valor * item.quantidade)}</p>
        </div>
        <input
          value={item.observacao}
          onChange={(e) => alterarObservacao(index, e.target.value)}
          placeholder="Numeração / gravação (ex.: Ele 20 · Ela 16)"
          maxLength={200}
          className="w-full rounded-lg border border-gray-200 bg-surface px-3 py-2 text-xs text-ink placeholder-text/35 focus:border-gold focus:outline-none"
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center rounded-lg border border-gray-200">
            <button type="button" onClick={() => alterarQuantidade(index, item.quantidade - 1)} className="px-3 py-1 text-ink" aria-label="Diminuir">−</button>
            <span className="min-w-8 text-center text-sm tabular-nums text-ink">{item.quantidade}</span>
            <button type="button" onClick={() => alterarQuantidade(index, item.quantidade + 1)} className="px-3 py-1 text-ink" aria-label="Aumentar">+</button>
          </div>
          <button type="button" onClick={() => alterarQuantidade(index, 0)} className={`${btnSecundario} !border-0 !px-0 !py-1 text-xs text-red-500 hover:!bg-transparent hover:underline`}>
            Remover
          </button>
        </div>
      </div>
    </li>
  )
}
