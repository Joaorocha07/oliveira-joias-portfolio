'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { avisarMudancaSessao } from '@/app/lib/sessao'
import { formatBRL } from '@/app/lib/carrinho'
import { Campo, Secao, btnPrimario, btnSecundario, enviar, inputClass, maskPhone } from './ui'

type Cupom = { id: string; codigo: string; descricao: string | null; tipo: 'percentual' | 'valor'; valor: number; validade: string | null }
type ItemPedido = { nome: string; quantidade: number; subtotal: number; observacao: string | null }
type Pedido = { numero: number; itens: ItemPedido[]; subtotal: number; desconto: number; total: number; cupom_codigo: string | null; status: string; created_at: string }
type Compra = { numero: number; data_venda: string; total: number; desconto: number; status: string; descricao_livre: string | null; itens: { nome_produto: string; quantidade: number; subtotal: number }[] }
type Perfil = { nome: string; email: string; telefone: string | null; cidade: string | null; data_nascimento: string | null }
export type DadosConta = {
  conta: { email: string; verificado: boolean }
  perfil: Perfil
  cupons: Cupom[]
  pedidos: Pedido[]
  compras: Compra[]
}

const STATUS_PEDIDO: Record<string, { label: string; cls: string }> = {
  novo: { label: 'Recebido', cls: 'bg-gold/15 text-gold-dark dark:text-gold-light' },
  em_atendimento: { label: 'Em atendimento', cls: 'bg-blue-500/10 text-blue-600 dark:text-blue-300' },
  concluido: { label: 'Concluído', cls: 'bg-green-500/10 text-green-700 dark:text-green-300' },
  cancelado: { label: 'Cancelado', cls: 'bg-red-500/10 text-red-600 dark:text-red-300' },
}

export function descricaoCupom(c: Cupom) {
  return c.descricao || (c.tipo === 'percentual' ? `${c.valor}% de desconto` : `${formatBRL(c.valor)} de desconto`)
}

function data(d: string) {
  return new Date(d.length === 10 ? `${d}T12:00:00` : d).toLocaleDateString('pt-BR')
}

export default function ContaView() {
  const router = useRouter()
  const [dados, setDados] = useState<DadosConta | null>(null)
  const [erro, setErro] = useState<string | null>(null)

  const carregar = useCallback(async () => {
    const r = await enviar<DadosConta>('/api/conta', 'GET')
    if (r.status === 401) {
      router.replace('/entrar?voltar=/conta')
      return
    }
    if (!r.ok || !r.data) setErro(r.error ?? 'Não foi possível carregar sua conta.')
    else setDados(r.data)
  }, [router])

  useEffect(() => {
    const t = window.setTimeout(() => void carregar(), 0)
    return () => window.clearTimeout(t)
  }, [carregar])

  async function sair() {
    await enviar('/api/conta/sair', 'POST')
    avisarMudancaSessao()
    router.push('/')
    router.refresh()
  }

  if (erro) {
    return <p className="mx-auto max-w-3xl px-4 py-20 text-center text-sm text-red-500">{erro}</p>
  }
  if (!dados) {
    return <p className="mx-auto max-w-3xl px-4 py-20 text-center text-sm text-text/50">Carregando sua conta...</p>
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Minha conta</p>
          <h1 className="mt-2 font-serif text-3xl font-semibold text-ink sm:text-4xl">Olá, {dados.perfil.nome.split(' ')[0]}!</h1>
          <p className="mt-1 text-sm text-text/55">{dados.conta.email}</p>
        </div>
        <div className="flex gap-2">
          <Link href="/carrinho" className={btnSecundario}>Meu carrinho</Link>
          <button type="button" onClick={() => void sair()} className={btnSecundario}>Sair</button>
        </div>
      </div>

      <div className="grid gap-6">
        <CuponsSecao cupons={dados.cupons} />
        <PedidosSecao pedidos={dados.pedidos} />
        <ComprasSecao compras={dados.compras} />
        <DadosSecao perfil={dados.perfil} onSalvo={carregar} />
        <SenhaSecao />
      </div>
    </div>
  )
}

function CuponsSecao({ cupons }: { cupons: Cupom[] }) {
  const [copiado, setCopiado] = useState<string | null>(null)
  async function copiar(codigo: string) {
    try {
      await navigator.clipboard.writeText(codigo)
      setCopiado(codigo)
      setTimeout(() => setCopiado(null), 2000)
    } catch { /* noop */ }
  }
  return (
    <Secao titulo="Cupons ativos">
      {cupons.length === 0 ? (
        <p className="text-sm text-text/55">Você não tem cupons ativos no momento.</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {cupons.map((c) => (
            <div key={c.id} className="rounded-xl border-2 border-dashed border-gold/50 bg-gold/5 p-4">
              <p className="text-sm font-semibold text-ink">{descricaoCupom(c)}</p>
              <button
                type="button"
                onClick={() => void copiar(c.codigo)}
                className="mt-2 font-mono text-lg font-bold tracking-[0.18em] text-gold-dark hover:text-gold dark:text-gold-light"
                title="Copiar código"
              >
                {c.codigo}
              </button>
              <p className="mt-1 text-xs text-text/50">
                {copiado === c.codigo ? 'Copiado!' : c.validade ? `Válido até ${data(c.validade)}` : 'Use no carrinho ou no atendimento'}
              </p>
            </div>
          ))}
        </div>
      )}
    </Secao>
  )
}

function PedidosSecao({ pedidos }: { pedidos: Pedido[] }) {
  return (
    <Secao titulo="Pedidos pelo site">
      {pedidos.length === 0 ? (
        <p className="text-sm text-text/55">
          Nenhum pedido ainda. <Link href="/aliancas" className="font-semibold text-gold hover:underline">Ver alianças</Link>
        </p>
      ) : (
        <ul className="divide-y divide-gray-100">
          {pedidos.map((p) => {
            const st = STATUS_PEDIDO[p.status] ?? { label: p.status, cls: 'bg-gray-100 text-text/60' }
            return (
              <li key={p.numero} className="py-4 first:pt-0 last:pb-0">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold text-ink">Pedido #{p.numero}</p>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${st.cls}`}>{st.label}</span>
                </div>
                <p className="text-xs text-text/50">{data(p.created_at)}</p>
                <ul className="mt-2 space-y-0.5 text-sm text-text/70">
                  {p.itens.map((i, idx) => (
                    <li key={idx}>
                      {i.quantidade}× {i.nome}
                      {i.observacao ? <span className="text-text/45"> — {i.observacao}</span> : null}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-sm text-ink">
                  Total: <strong>{formatBRL(Number(p.total))}</strong>
                  {p.cupom_codigo && <span className="text-text/50"> · cupom {p.cupom_codigo} (−{formatBRL(Number(p.desconto))})</span>}
                </p>
              </li>
            )
          })}
        </ul>
      )}
    </Secao>
  )
}

function ComprasSecao({ compras }: { compras: Compra[] }) {
  return (
    <Secao titulo="Compras na loja">
      {compras.length === 0 ? (
        <p className="text-sm text-text/55">Nenhuma compra registrada ainda.</p>
      ) : (
        <ul className="divide-y divide-gray-100">
          {compras.map((c) => (
            <li key={c.numero} className="py-4 first:pt-0 last:pb-0">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold text-ink">Compra #{c.numero}</p>
                <p className="text-xs text-text/50">{data(c.data_venda)}</p>
              </div>
              <ul className="mt-2 space-y-0.5 text-sm text-text/70">
                {c.itens.length > 0
                  ? c.itens.map((i, idx) => <li key={idx}>{i.quantidade}× {i.nome_produto}</li>)
                  : <li>{c.descricao_livre || 'Compra na loja'}</li>}
              </ul>
              <p className="mt-2 text-sm text-ink">Total: <strong>{formatBRL(Number(c.total))}</strong></p>
            </li>
          ))}
        </ul>
      )}
    </Secao>
  )
}

function DadosSecao({ perfil, onSalvo }: { perfil: Perfil; onSalvo: () => Promise<void> }) {
  const [nome, setNome] = useState(perfil.nome)
  const [telefone, setTelefone] = useState(maskPhone(perfil.telefone ?? ''))
  const [cidade, setCidade] = useState(perfil.cidade ?? '')
  const [nascimento, setNascimento] = useState(perfil.data_nascimento ?? '')
  const [salvando, setSalvando] = useState(false)
  const [msg, setMsg] = useState<{ ok: boolean; texto: string } | null>(null)

  async function salvar(e: React.FormEvent) {
    e.preventDefault()
    setSalvando(true)
    setMsg(null)
    const r = await enviar('/api/conta', 'PUT', { nome, telefone, cidade: cidade || null, data_nascimento: nascimento || null })
    setSalvando(false)
    setMsg(r.ok ? { ok: true, texto: 'Dados salvos!' } : { ok: false, texto: r.error ?? 'Erro ao salvar.' })
    if (r.ok) await onSalvo()
  }

  return (
    <Secao titulo="Meus dados">
      <form onSubmit={salvar} className="grid gap-4 sm:grid-cols-2">
        <Campo label="Nome">
          <input required minLength={2} value={nome} onChange={(e) => setNome(e.target.value)} className={inputClass} />
        </Campo>
        <Campo label="E-mail (login)">
          <input value={perfil.email} disabled className={inputClass} />
        </Campo>
        <Campo label="WhatsApp">
          <input required type="tel" value={telefone} onChange={(e) => setTelefone(maskPhone(e.target.value))} className={inputClass} />
        </Campo>
        <Campo label="Cidade">
          <input value={cidade} onChange={(e) => setCidade(e.target.value)} className={inputClass} />
        </Campo>
        <Campo label="Data de nascimento">
          <input type="date" value={nascimento} onChange={(e) => setNascimento(e.target.value)} className={inputClass} />
        </Campo>
        <div className="flex items-end gap-3 sm:col-span-2">
          <button type="submit" disabled={salvando} className={btnPrimario}>{salvando ? 'Salvando...' : 'Salvar dados'}</button>
          {msg && <p className={`text-sm ${msg.ok ? 'text-green-600' : 'text-red-500'}`} role="status">{msg.texto}</p>}
        </div>
      </form>
    </Secao>
  )
}

function SenhaSecao() {
  const [aberto, setAberto] = useState(false)
  const [atual, setAtual] = useState('')
  const [nova, setNova] = useState('')
  const [salvando, setSalvando] = useState(false)
  const [msg, setMsg] = useState<{ ok: boolean; texto: string } | null>(null)

  async function salvar(e: React.FormEvent) {
    e.preventDefault()
    setSalvando(true)
    setMsg(null)
    const r = await enviar('/api/conta/senha', 'PUT', { senha_atual: atual, nova_senha: nova })
    setSalvando(false)
    if (r.ok) {
      setAtual('')
      setNova('')
    }
    setMsg(r.ok ? { ok: true, texto: 'Senha alterada!' } : { ok: false, texto: r.error ?? 'Erro ao alterar a senha.' })
  }

  return (
    <Secao
      titulo="Senha"
      acao={
        <button type="button" onClick={() => setAberto((v) => !v)} className="text-sm font-semibold text-gold hover:underline">
          {aberto ? 'Fechar' : 'Alterar senha'}
        </button>
      }
    >
      {aberto ? (
        <form onSubmit={salvar} className="grid gap-4 sm:grid-cols-2">
          <Campo label="Senha atual">
            <input required type="password" autoComplete="current-password" value={atual} onChange={(e) => setAtual(e.target.value)} className={inputClass} />
          </Campo>
          <Campo label="Nova senha">
            <input required type="password" minLength={8} autoComplete="new-password" value={nova} onChange={(e) => setNova(e.target.value)} className={inputClass} />
          </Campo>
          <div className="flex items-end gap-3 sm:col-span-2">
            <button type="submit" disabled={salvando} className={btnPrimario}>{salvando ? 'Salvando...' : 'Salvar nova senha'}</button>
            {msg && <p className={`text-sm ${msg.ok ? 'text-green-600' : 'text-red-500'}`} role="status">{msg.texto}</p>}
          </div>
        </form>
      ) : (
        <p className="text-sm text-text/55">Mantenha sua conta segura com uma senha de pelo menos 8 caracteres.</p>
      )}
    </Secao>
  )
}
