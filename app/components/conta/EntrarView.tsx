'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { type SiteConfig, whatsappUrl } from '@/app/lib/site'
import { avisarMudancaSessao } from '@/app/lib/sessao'
import { Campo, SenhaInput, btnPrimario, enviar, inputClass, maskPhone } from './ui'

type Aba = 'entrar' | 'criar'

function destinoSeguro(): string {
  const voltar = new URLSearchParams(window.location.search).get('voltar') ?? ''
  // Só caminhos internos (evita redirecionar para outro site).
  return voltar.startsWith('/') && !voltar.startsWith('//') ? voltar : '/conta'
}

export default function EntrarView({ site }: { site: SiteConfig }) {
  const router = useRouter()
  const [aba, setAba] = useState<Aba>('entrar')
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmacao, setConfirmacao] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErro(null)
    if (aba === 'criar' && telefone.replace(/\D/g, '').length < 10) {
      setErro('Informe um telefone com DDD.')
      return
    }
    if (aba === 'criar' && senha !== confirmacao) {
      setErro('As senhas não conferem.')
      return
    }
    setEnviando(true)
    const r = aba === 'entrar'
      ? await enviar('/api/conta/login', 'POST', { email, senha })
      : await enviar('/api/conta/cadastro', 'POST', { nome, telefone, email, senha })
    setEnviando(false)
    if (!r.ok) {
      setErro(r.error ?? 'Não foi possível continuar. Tente novamente.')
      return
    }
    avisarMudancaSessao()
    router.push(destinoSeguro())
    router.refresh()
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12 sm:py-16">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">{site.name}</p>
        <h1 className="mt-3 font-serif text-3xl font-semibold text-ink">
          {aba === 'entrar' ? 'Entrar na sua conta' : 'Criar sua conta'}
        </h1>
        <p className="mt-2 text-sm text-text/60">
          {aba === 'entrar'
            ? 'Veja seus cupons, seus pedidos e finalize compras pelo carrinho.'
            : 'Ganhe seu cupom de boas-vindas e acompanhe seus pedidos.'}
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 rounded-xl border border-gray-200 p-1" role="tablist">
        {(['entrar', 'criar'] as const).map((a) => (
          <button
            key={a}
            type="button"
            role="tab"
            aria-selected={aba === a}
            onClick={() => { setAba(a); setErro(null); setConfirmacao('') }}
            className={`rounded-lg py-2.5 text-sm font-semibold transition-colors ${
              aba === a ? 'bg-dark text-white dark:bg-gold dark:text-dark' : 'text-text/60 hover:text-ink'
            }`}
          >
            {a === 'entrar' ? 'Entrar' : 'Criar conta'}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        {aba === 'criar' && (
          <>
            <Campo label="Nome">
              <input required minLength={2} autoComplete="name" value={nome} onChange={(e) => setNome(e.target.value)} className={inputClass} />
            </Campo>
            <Campo label="WhatsApp">
              <input
                required
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                placeholder="(34) 99999-9999"
                value={telefone}
                onChange={(e) => setTelefone(maskPhone(e.target.value))}
                className={inputClass}
              />
            </Campo>
          </>
        )}
        <Campo label="E-mail">
          <input required type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
        </Campo>
        <Campo label="Senha">
          <SenhaInput
            required
            minLength={aba === 'criar' ? 8 : 1}
            autoComplete={aba === 'entrar' ? 'current-password' : 'new-password'}
            placeholder={aba === 'criar' ? 'Mínimo de 8 caracteres' : undefined}
            value={senha}
            onChange={setSenha}
          />
        </Campo>
        {aba === 'criar' && (
          <Campo label="Confirmar senha">
            <SenhaInput
              required
              minLength={8}
              autoComplete="new-password"
              placeholder="Digite a senha novamente"
              value={confirmacao}
              onChange={setConfirmacao}
              aria-invalid={confirmacao.length > 0 && confirmacao !== senha}
            />
            {confirmacao.length > 0 && confirmacao !== senha && (
              <span className="text-xs text-red-500">As senhas não conferem.</span>
            )}
          </Campo>
        )}

        {erro && <p className="text-sm text-red-500" role="alert">{erro}</p>}

        <button type="submit" disabled={enviando} className={`${btnPrimario} mt-1 w-full py-3.5`}>
          {enviando ? 'Aguarde...' : aba === 'entrar' ? 'Entrar' : 'Criar conta'}
        </button>
      </form>

      {aba === 'entrar' && (
        <p className="mt-6 text-center text-xs text-text/50">
          Esqueceu a senha?{' '}
          <a
            href={whatsappUrl(site, 'Olá! Esqueci a senha da minha conta no site.')}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-gold hover:underline"
          >
            Fale com a gente no WhatsApp
          </a>
        </p>
      )}
    </div>
  )
}
