'use client'

import { useState } from 'react'
import { type SiteConfig, whatsappUrl } from '@/app/lib/site'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? ''

type Resultado = { existente: boolean; primeiro_nome: string; cupom_codigo: string | null }

// (34) 99999-9999 enquanto digita
function maskPhone(value: string) {
  const d = value.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d.length ? `(${d}` : ''
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

const inputClass =
  'w-full rounded-xl border border-gray-200 bg-surface px-4 py-3 text-sm text-ink placeholder-text/35 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/25 transition-colors'

export default function LeadSignupForm({
  site,
  submitLabel,
  onRegistered,
  onClose,
}: {
  site: SiteConfig
  submitLabel?: string | null
  onRegistered: () => void
  onClose: () => void
}) {
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('') // isca para bots (campo invisível)
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState<string | null>(null)
  const [resultado, setResultado] = useState<Resultado | null>(null)
  const [copiado, setCopiado] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErro(null)
    if (telefone.replace(/\D/g, '').length < 10) {
      setErro('Informe um telefone com DDD.')
      return
    }
    setEnviando(true)
    try {
      const res = await fetch(`${BACKEND_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, telefone, email, website }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) {
        setErro(json.error ?? 'Não foi possível concluir o cadastro. Tente novamente.')
        return
      }
      setResultado(json.data as Resultado)
      onRegistered()
    } catch {
      setErro('Sem conexão. Verifique sua internet e tente novamente.')
    } finally {
      setEnviando(false)
    }
  }

  async function copiarCupom(codigo: string) {
    try {
      await navigator.clipboard.writeText(codigo)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    } catch { /* noop */ }
  }

  if (resultado) {
    const cupom = resultado.cupom_codigo
    const waText = cupom
      ? `Olá! Me cadastrei no site e quero usar meu cupom ${cupom}.`
      : 'Olá! Acabei de me cadastrar no site.'
    return (
      <div className="mt-4 text-center" aria-live="polite">
        <p className="font-serif text-lg font-bold text-ink">
          {resultado.existente
            ? `Que bom te ver de novo, ${resultado.primeiro_nome}!`
            : `Cadastro feito, ${resultado.primeiro_nome}!`}
        </p>
        <p className="mt-1 text-sm text-text/60">
          {resultado.existente
            ? 'Você já faz parte da nossa base — atualizamos seus dados.'
            : 'Você vai receber nossas ofertas exclusivas em primeira mão.'}
        </p>

        {cupom && (
          <div className="mt-5">
            <p className="text-[10px] font-semibold uppercase tracking-[2px] text-gold-dark">Seu cupom</p>
            <button
              type="button"
              onClick={() => void copiarCupom(cupom)}
              className="mt-2 w-full rounded-xl border-2 border-dashed border-gold/60 bg-gold/5 px-4 py-3 font-mono text-xl font-bold tracking-[0.2em] text-ink transition-colors hover:bg-gold/10"
              title="Copiar cupom"
            >
              {cupom}
            </button>
            <p className="mt-1.5 text-xs text-text/45">{copiado ? 'Copiado!' : 'Toque para copiar · use no atendimento pelo WhatsApp'}</p>
          </div>
        )}

        <div className="mt-5 flex flex-col gap-2.5">
          <a
            href={whatsappUrl(site, waText)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="block rounded-xl bg-whatsapp py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-whatsapp-dark"
          >
            {cupom ? 'Usar cupom no WhatsApp' : 'Falar no WhatsApp'}
          </a>
          <button type="button" onClick={onClose} className="py-1 text-xs text-text/40 transition-colors hover:text-text/60">
            Continuar navegando
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2.5" noValidate={false}>
      <label className="sr-only" htmlFor="lead-nome">Nome</label>
      <input
        id="lead-nome"
        required
        minLength={2}
        autoComplete="name"
        placeholder="Seu nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className={inputClass}
      />
      <label className="sr-only" htmlFor="lead-telefone">Telefone</label>
      <input
        id="lead-telefone"
        required
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        placeholder="WhatsApp com DDD"
        value={telefone}
        onChange={(e) => setTelefone(maskPhone(e.target.value))}
        className={inputClass}
      />
      <label className="sr-only" htmlFor="lead-email">E-mail</label>
      <input
        id="lead-email"
        required
        type="email"
        autoComplete="email"
        placeholder="Seu e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={inputClass}
      />
      {/* Isca para bots: invisível para pessoas */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />

      {erro && <p className="text-xs text-red-500" role="alert">{erro}</p>}

      <button
        type="submit"
        disabled={enviando}
        className="mt-1 w-full rounded-xl bg-dark py-3 text-sm font-semibold tracking-wide text-white transition-all duration-200 hover:bg-gold hover:text-dark disabled:opacity-60 dark:ring-1 dark:ring-inset dark:ring-white/15"
      >
        {enviando ? 'Enviando...' : submitLabel || 'Quero meu desconto'}
      </button>
      <button type="button" onClick={onClose} className="py-1 text-xs text-text/30 transition-colors hover:text-text/55">
        Agora não
      </button>
      <p className="text-center text-[10px] leading-snug text-text/35">
        Usamos seus dados só para contato da {site.name}. Sem spam.
      </p>
    </form>
  )
}
