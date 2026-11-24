'use client'

import { useSyncExternalStore } from 'react'

// Carrinho guardado no navegador (localStorage). O preço aqui é só para exibir:
// no pedido o backend recalcula tudo pelo catálogo.

export type ItemCarrinho = {
  slug: string
  nome: string
  valor: number
  imagem: string | null
  quantidade: number
  observacao: string
  /** Aros escolhidos (1 ou 2). Ausente em produtos sem seleção de aro. */
  aros?: number[]
}

const KEY = 'oj_carrinho'
const EVENTO = 'oj-carrinho'
const VAZIO: ItemCarrinho[] = []

let cacheRaw: string | null = null
let cache: ItemCarrinho[] = VAZIO

function ler(): ItemCarrinho[] {
  let raw: string | null = null
  try { raw = localStorage.getItem(KEY) } catch { /* noop */ }
  if (raw === cacheRaw) return cache
  cacheRaw = raw
  try {
    const parsed = raw ? (JSON.parse(raw) as ItemCarrinho[]) : VAZIO
    cache = Array.isArray(parsed) ? parsed : VAZIO
  } catch {
    cache = VAZIO
  }
  return cache
}

function gravar(itens: ItemCarrinho[]) {
  try { localStorage.setItem(KEY, JSON.stringify(itens)) } catch { /* noop */ }
  window.dispatchEvent(new Event(EVENTO))
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENTO, cb)
  window.addEventListener('storage', cb) // outras abas
  return () => {
    window.removeEventListener(EVENTO, cb)
    window.removeEventListener('storage', cb)
  }
}

export function useCarrinho() {
  const itens = useSyncExternalStore(subscribe, ler, () => VAZIO)
  return {
    itens,
    quantidadeTotal: itens.reduce((s, i) => s + i.quantidade, 0),
    subtotal: Math.round(itens.reduce((s, i) => s + i.valor * i.quantidade, 0) * 100) / 100,
  }
}

const mesmosAros = (a?: number[], b?: number[]) => (a ?? []).join(',') === (b ?? []).join(',')

export function adicionarAoCarrinho(item: Omit<ItemCarrinho, 'quantidade' | 'observacao'>, quantidade = 1, observacao = '') {
  const itens = [...ler()]
  const idx = itens.findIndex((i) => i.slug === item.slug && i.observacao === observacao && mesmosAros(i.aros, item.aros))
  if (idx >= 0) itens[idx] = { ...itens[idx]!, quantidade: Math.min(20, itens[idx]!.quantidade + quantidade) }
  else itens.push({ ...item, quantidade, observacao })
  gravar(itens)
}

export function alterarQuantidade(index: number, quantidade: number) {
  const itens = [...ler()]
  if (!itens[index]) return
  if (quantidade <= 0) itens.splice(index, 1)
  else itens[index] = { ...itens[index]!, quantidade: Math.min(20, quantidade) }
  gravar(itens)
}

export function alterarObservacao(index: number, observacao: string) {
  const itens = [...ler()]
  if (!itens[index]) return
  itens[index] = { ...itens[index]!, observacao: observacao.slice(0, 200) }
  gravar(itens)
}

export function limparCarrinho() {
  gravar([])
}

export function formatBRL(v: number) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
