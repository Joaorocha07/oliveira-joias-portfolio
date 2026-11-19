'use client'

import { useState } from 'react'
import Link from 'next/link'
import { type SiteConfig, whatsappUrl } from '@/app/lib/site'
import { avisarMudancaSessao } from '@/app/lib/sessao'
import { SenhaInput, enviar, inputClass, maskPhone } from './conta/ui'

// Pop-up de cadastro: cria a CONTA do site (nome, telefone, e-mail e senha) e já
// deixa a pessoa logada. O backend reaproveita o lead/cliente existente (mesmo
// e-mail ou telefone) e gera o cupom de boas-vindas.

type CupomConta = { codigo: string; descricao: string | null }
type Resultado = { primeiroNome: string; cupom: CupomConta | null }

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
  const [senha, setSenha] = useState('')
  const [confirmacao, setConfirmacao] = useState('')
  const [website, setWebsite] = useState('') // isca para bots (campo invisível)
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState<string | null>(null)
  const [contaExiste, setContaExiste] = useState(false)
  const [resultado, setResultado] = useState<Resultado | null>(null)
  const [copiado, setCopiado] = useState(false)

  const senhasDiferentes = confirmacao.length > 0 && confirmacao !== senha

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErro(null)
    setContaExiste(false)
    if (telefone.replace(/\D/g, '').length < 10) {
      setErro('Informe um telefone com DDD.')
      return
    }
    if (senha.length < 8) {
      setErro('A senha precisa ter pelo menos 8 caracteres.')
      return
    }
    // O aviso "As senhas não conferem" já aparece embaixo do campo.
    if (senha !== confirmacao) return
    // Bot preencheu o campo invisível: finge sucesso sem criar nada.
    if (website) {
      setResultado({ primeiroNome: nome.split(' ')[0] ?? '', cupom: null })
      return
    }

    setEnviando(true)
    const r = await enviar('/api/conta/cadastro', 'POST', { nome, telefone, email, senha })
    if (!r.ok) {
      setEnviando(false)
      setErro(r.error ?? 'Não foi possível criar sua conta. Tente novamente.')
      setContaExiste(r.status === 409)
      return
    }

    // Já está logado (cookie criado pela rota): busca o cupom de boas-vindas.
    const conta = await enviar<{ perfil: { nome: string }; cupons: CupomConta[] }>('/api/conta', 'GET')
    setEnviando(false)
    setResultado({
      primeiroNome: (conta.data?.perfil.nome ?? nome).split(' ')[0] ?? '',
      cupom: conta.data?.cupons[0] ?? null,
    })
    avisarMudancaSessao()
    onRegistered()
  }

  async function copiarCupom(codigo: string) {
    try {
      await navigator.clipboard.writeText(codigo)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    } catch { /* noop */ }
  }

  if (resultado) {
    const cupom = resultado.cupom
    const waText = cupom
      ? `Olá! Criei minha conta no site e quero usar meu cupom ${cupom.codigo}.`
      : 'Olá! Acabei de criar minha conta no site.'
    return (
      <div className="mt-4 text-center" aria-live="polite">
        <p className="font-serif text-lg font-bold text-ink">Conta criada, {resultado.primeiroNome}!</p>
        <p className="mt-1 text-sm text-text/60">Você já está logado. Seus cupons e pedidos ficam em Minha conta.</p>

        {cupom && (
          <div className="mt-5">
            <p className="text-[10px] font-semibold uppercase tracking-[2px] text-gold-dark">
              {cupom.descricao || 'Seu cupom'}
            </p>
            <button
              type="button"
              onClick={() => void copiarCupom(cupom.codigo)}
              className="mt-2 w-full rounded-xl border-2 border-dashed border-gold/60 bg-gold/5 px-4 py-3 font-mono text-xl font-bold tracking-[0.2em] text-ink transition-colors hover:bg-gold/10"
              title="Copiar cupom"
            >
              {cupom.codigo}
            </button>
            <p className="mt-1.5 text-xs text-text/45">
              {copiado ? 'Copiado!' : 'Toque para copiar · use no carrinho ou no atendimento'}
            </p>
          </div>
        )}

        <div className="mt-5 flex flex-col gap-2.5">
          <Link
            href="/aliancas"
            onClick={onClose}
            className="block rounded-xl bg-dark py-3 text-center text-sm font-semibold text-white transition-all duration-200 hover:bg-gold hover:text-dark dark:ring-1 dark:ring-inset dark:ring-white/15"
          >
            Ver alianças
          </Link>
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
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2.5">
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
      <label className="sr-only" htmlFor="lead-senha">Senha</label>
      <SenhaInput
        id="lead-senha"
        required
        minLength={8}
        autoComplete="new-password"
        placeholder="Crie uma senha (mín. 8 caracteres)"
        value={senha}
        onChange={setSenha}
      />
      <label className="sr-only" htmlFor="lead-senha2">Confirmar senha</label>
      <SenhaInput
        id="lead-senha2"
        required
        minLength={8}
        autoComplete="new-password"
        placeholder="Confirme a senha"
        value={confirmacao}
        onChange={setConfirmacao}
        aria-invalid={senhasDiferentes}
      />
      {senhasDiferentes && <p className="-mt-1 text-xs text-red-500">As senhas não conferem.</p>}

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

      {erro && (
        <p className="text-xs text-red-500" role="alert">
          {erro}{' '}
          {contaExiste && (
            <Link href="/entrar" onClick={onClose} className="font-semibold text-gold underline">
              Entrar
            </Link>
          )}
        </p>
      )}

      <button
        type="submit"
        disabled={enviando}
        className="mt-1 w-full rounded-xl bg-dark py-3 text-sm font-semibold tracking-wide text-white transition-all duration-200 hover:bg-gold hover:text-dark disabled:opacity-60 dark:ring-1 dark:ring-inset dark:ring-white/15"
      >
        {enviando ? 'Criando sua conta...' : submitLabel || 'Criar conta e ganhar desconto'}
      </button>
      <p className="text-center text-xs text-text/45">
        Já tem conta?{' '}
        <Link href="/entrar" onClick={onClose} className="font-semibold text-gold hover:underline">Entrar</Link>
        {' · '}
        <button type="button" onClick={onClose} className="text-text/40 transition-colors hover:text-text/60">
          Agora não
        </button>
      </p>
      <p className="text-center text-[10px] leading-snug text-text/35">
        Usamos seus dados só para contato da {site.name}. Sem spam.
      </p>
    </form>
  )
}
