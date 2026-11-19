'use client'

import { useState } from 'react'

// Peças visuais compartilhadas pelas telas de conta e carrinho.

export const inputClass =
  'w-full rounded-xl border border-gray-200 bg-surface px-4 py-3 text-sm text-ink placeholder-text/35 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/25 transition-colors disabled:opacity-60'

export const btnPrimario =
  'inline-flex items-center justify-center gap-2 rounded-xl bg-dark px-5 py-3 text-sm font-semibold tracking-wide text-white transition-all duration-200 hover:bg-gold hover:text-dark disabled:opacity-60 dark:ring-1 dark:ring-inset dark:ring-white/15'

export const btnSecundario =
  'inline-flex items-center justify-center gap-2 rounded-xl border border-gold/50 px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-gold/10 disabled:opacity-60'

export function Campo({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-text/50">{label}</span>
      {children}
    </label>
  )
}

export function Secao({ titulo, children, acao }: { titulo: string; children: React.ReactNode; acao?: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-gray-100 bg-surface p-5 sm:p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="font-serif text-xl font-semibold text-ink">{titulo}</h2>
        {acao}
      </div>
      {children}
    </section>
  )
}

export function maskPhone(value: string) {
  const d = value.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d.length ? `(${d}` : ''
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

// Envia JSON para as rotas /api/conta do próprio site.
export async function enviar<T = unknown>(url: string, method: string, body?: unknown): Promise<{ ok: boolean; status: number; data?: T; error?: string }> {
  try {
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
      cache: 'no-store',
    })
    const json = (await res.json().catch(() => ({}))) as { data?: T; error?: string }
    return { ok: res.ok, status: res.status, data: json.data, error: json.error }
  } catch {
    return { ok: false, status: 0, error: 'Sem conexão. Verifique sua internet e tente novamente.' }
  }
}

// Campo de senha com botão de olho para mostrar/ocultar.
export function SenhaInput({
  value,
  onChange,
  ...props
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> & { onChange: (v: string) => void }) {
  const [visivel, setVisivel] = useState(false)
  return (
    <div className="relative">
      <input
        {...props}
        type={visivel ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputClass} pr-12`}
      />
      <button
        type="button"
        onClick={() => setVisivel((v) => !v)}
        aria-label={visivel ? 'Ocultar senha' : 'Mostrar senha'}
        title={visivel ? 'Ocultar senha' : 'Mostrar senha'}
        className="absolute inset-y-0 right-0 grid w-12 place-items-center text-text/45 transition-colors hover:text-gold"
      >
        {visivel ? (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.98 8.22A10.48 10.48 0 001.93 12C3.23 16.34 7.24 19.5 12 19.5c.99 0 1.95-.14 2.86-.39M6.23 6.23A10.45 10.45 0 0112 4.5c4.76 0 8.77 3.16 10.07 7.5a10.52 10.52 0 01-4.29 5.77M6.23 6.23L3 3m3.23 3.23l3.65 3.65m7.89 7.89L21 21m-3.23-3.23l-3.65-3.65m0 0a3 3 0 10-4.24-4.24m4.24 4.24L9.88 9.88" />
          </svg>
        ) : (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.04 12.32a1 1 0 010-.64C3.42 7.51 7.36 4.5 12 4.5c4.64 0 8.57 3.01 9.96 7.18.07.21.07.43 0 .64C20.58 16.49 16.64 19.5 12 19.5c-4.64 0-8.57-3.01-9.96-7.18z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        )}
      </button>
    </div>
  )
}
