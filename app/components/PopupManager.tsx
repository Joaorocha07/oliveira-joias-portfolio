'use client'

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type SitePopup = {
  id: string
  tipo: 'boas_vindas' | 'promocao' | 'saida'
  titulo: string
  mensagem: string
  imagem_url: string | null
  produto_slug: string | null
  cta_texto: string | null
  cta_url: string | null
  ativo: boolean
  delay_segundos: number
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? ''

const TIPO_BADGE: Record<SitePopup['tipo'], string> = {
  boas_vindas: 'Boas-vindas',
  promocao: 'Oferta especial',
  saida: 'Antes de ir...',
}

function todayStr() {
  return new Date().toDateString()
}
function dayKey(id: string) {
  return `oj_pd_${id}`
}
function wasSeenToday(id: string): boolean {
  try { return localStorage.getItem(dayKey(id)) === todayStr() } catch { return false }
}
function markSeenToday(id: string) {
  try { localStorage.setItem(dayKey(id), todayStr()) } catch { /* noop */ }
}

export default function PopupManager() {
  const pathname = usePathname()
  const [popups, setPopups] = useState<SitePopup[]>([])
  const [activePopup, setActivePopup] = useState<SitePopup | null>(null)
  const [visible, setVisible] = useState(false)

  const productSlug = pathname.match(/^\/aliancas\/([^/]+)$/)?.[1] ?? null

  useEffect(() => {
    if (!BACKEND_URL) return
    fetch(`${BACKEND_URL}/api/popups/ativos`)
      .then((r) => r.json())
      .then((json: { data: SitePopup[] }) => setPopups(json.data ?? []))
      .catch(() => {})
  }, [])

  const showPopup = useCallback((popup: SitePopup) => {
    if (wasSeenToday(popup.id)) return
    setActivePopup(popup)
    setVisible(true)
  }, [])

  const closePopup = useCallback(() => {
    if (activePopup) markSeenToday(activePopup.id)
    setVisible(false)
    setTimeout(() => setActivePopup(null), 250)
  }, [activePopup])

  // Boas-vindas
  useEffect(() => {
    const popup = popups.find((p) => p.tipo === 'boas_vindas')
    if (!popup || wasSeenToday(popup.id) || activePopup) return
    const timer = setTimeout(() => showPopup(popup), (popup.delay_segundos ?? 3) * 1000)
    return () => clearTimeout(timer)
  }, [popups, activePopup, showPopup])

  // Promoção (produto específico)
  useEffect(() => {
    if (!productSlug) return
    const popup = popups.find((p) => p.tipo === 'promocao' && p.produto_slug === productSlug)
    if (!popup || wasSeenToday(popup.id) || activePopup) return
    const timer = setTimeout(() => showPopup(popup), 2000)
    return () => clearTimeout(timer)
  }, [popups, productSlug, activePopup, showPopup])

  // Saída (exit intent — desktop)
  useEffect(() => {
    const popup = popups.find((p) => p.tipo === 'saida')
    if (!popup || wasSeenToday(popup.id)) return

    function onMouseLeave(e: MouseEvent) {
      if (e.clientY <= 0) {
        setActivePopup((prev) => {
          if (prev) return prev
          markSeenToday(popup!.id)
          return popup!
        })
        setVisible(true)
      }
    }
    document.addEventListener('mouseleave', onMouseLeave)
    return () => document.removeEventListener('mouseleave', onMouseLeave)
  }, [popups])

  if (!activePopup) return null

  const isExternal = activePopup.cta_url?.startsWith('http') ?? false

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-titulo"
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ animation: 'overlay-in 0.2s ease-out' }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={closePopup}
        aria-hidden="true"
      />

      {/* Card */}
      <div
        className={`relative z-10 w-full max-w-[400px] overflow-hidden rounded-2xl shadow-[0_32px_64px_rgba(0,0,0,0.45)] transition-opacity duration-200 ${visible ? 'opacity-100' : 'opacity-0'}`}
        style={{ animation: 'popup-in 0.35s cubic-bezier(0.22,1,0.36,1)' }}
      >
        {/* Gold top bar */}
        <div className="h-[3px] bg-gradient-to-r from-gold-dark via-gold-light to-gold-dark" />

        {/* Close button */}
        <button
          onClick={closePopup}
          aria-label="Fechar"
          className="absolute top-3.5 right-3.5 z-20 w-7 h-7 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/55 backdrop-blur-sm transition-colors"
        >
          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image or decorative header */}
        {activePopup.imagem_url ? (
          <div className="relative w-full aspect-[16/9]">
            <Image
              src={activePopup.imagem_url}
              alt={activePopup.titulo}
              fill
              className="object-cover"
              sizes="400px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        ) : (
          <div className="relative bg-dark overflow-hidden px-6 pt-9 pb-7 flex flex-col items-center text-center">
            {/* Decorative rings */}
            <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full border border-gold/10" />
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full border border-gold/10" />
            <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full border border-gold/10" />
            {/* Diamond icon */}
            <svg viewBox="0 0 40 40" className="w-10 h-10 mb-3 relative" fill="none">
              <polygon points="20,4 36,16 20,36 4,16" stroke="#c8a15a" strokeWidth="1.5" fill="none" />
              <polygon points="20,4 36,16 4,16" stroke="#c8a15a" strokeWidth="0.8" fill="#c8a15a" fillOpacity="0.12" />
              <polygon points="20,9 30,16 20,31 10,16" fill="#c8a15a" fillOpacity="0.08" />
            </svg>
            <p className="text-[10px] tracking-[3px] uppercase text-gold/75 font-medium">Oliveira Joias</p>
          </div>
        )}

        {/* Body */}
        <div className="bg-white px-6 pt-5 pb-6">
          {/* Tipo badge */}
          <span className="inline-block text-[10px] font-semibold tracking-[1.5px] uppercase text-gold-dark/80 mb-2.5">
            {TIPO_BADGE[activePopup.tipo]}
          </span>

          <h2
            id="popup-titulo"
            className="font-serif text-[1.3rem] font-bold text-dark leading-snug mb-2.5"
          >
            {activePopup.titulo}
          </h2>
          <p className="text-text/55 text-sm leading-relaxed whitespace-pre-line">
            {activePopup.mensagem}
          </p>

          {activePopup.cta_texto && (
            <div className="mt-5 flex flex-col items-stretch gap-2.5">
              {activePopup.cta_url ? (
                isExternal ? (
                  <a
                    href={activePopup.cta_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closePopup}
                    className="block text-center bg-dark hover:bg-gold hover:text-dark text-white font-semibold py-3 rounded-xl transition-all duration-200 text-sm tracking-wide"
                  >
                    {activePopup.cta_texto}
                  </a>
                ) : (
                  <Link
                    href={activePopup.cta_url}
                    onClick={closePopup}
                    className="block text-center bg-dark hover:bg-gold hover:text-dark text-white font-semibold py-3 rounded-xl transition-all duration-200 text-sm tracking-wide"
                  >
                    {activePopup.cta_texto}
                  </Link>
                )
              ) : (
                <button
                  onClick={closePopup}
                  className="w-full text-center bg-dark hover:bg-gold hover:text-dark text-white font-semibold py-3 rounded-xl transition-all duration-200 text-sm tracking-wide"
                >
                  {activePopup.cta_texto}
                </button>
              )}
              <button
                onClick={closePopup}
                className="text-xs text-text/30 hover:text-text/55 transition-colors py-1"
              >
                Não, obrigado
              </button>
            </div>
          )}
        </div>

        {/* Gold bottom bar */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      </div>
    </div>
  )
}
