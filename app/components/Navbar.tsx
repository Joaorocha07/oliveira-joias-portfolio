'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { type SiteConfig, whatsappUrl } from '@/app/lib/site'
import ThemeToggle from './ThemeToggle'
import { useCarrinho } from '@/app/lib/carrinho'
import { useSessao } from '@/app/lib/sessao'

const navLinks = [
  { href: '/', label: 'Início' },
  { href: '/aliancas', label: 'Alianças' },
  { href: '/#materiais', label: 'Materiais' },
  { href: '/#sobre', label: 'Sobre nós' },
  { href: '/#duvidas', label: 'Dúvidas' },
  { href: '/#localizacao', label: 'Contato' },
]

export default function Navbar({ site }: { site: SiteConfig }) {
  const WA_URL = whatsappUrl(site, `Olá! Gostaria de receber atendimento para escolher minhas alianças.`)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0e0e0f]/96 shadow-lg shadow-black/30'
            : 'bg-[#0e0e0f]/94'
        } backdrop-blur-[14px] border-b border-white/10`}
      >
        <div className="bg-[#0b0b0b] text-white/70 text-xs border-b border-white/10 hidden sm:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
            <div className="flex gap-6">
              <span>✦ Fabricação própria</span>
              <span>◇ Garantia vitalícia</span>
              <span>⌁ Envio para todo o Brasil</span>
            </div>
            <span>◔ Atendimento via WhatsApp</span>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="w-8 h-8 border border-gold rounded-full grid place-items-center text-gold text-base font-serif">◊</span>
              <span className="flex flex-col leading-none">
                <span className="font-serif text-xl font-semibold text-white tracking-[0.15em]">
                  {site.logoTop}
                </span>
                <span className="text-[8px] text-gold tracking-[0.42em] uppercase -mt-0.5">
                  {site.logoBottom}
                </span>
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[13px] text-white/75 hover:text-gold transition-colors duration-200 tracking-[0.08em] uppercase font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
            {site.hasThemeToggle && <ThemeToggle />}
            {site.hasAccount && <ContaIcons />}
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-gold/60 hover:bg-gold hover:border-gold text-white hover:text-dark text-[13px] font-bold px-[17px] py-3 rounded-lg transition-all duration-200"
            >
              ☏ Fale no WhatsApp
            </a>
            </div>

            <div className="flex items-center gap-1 lg:hidden">
            {site.hasThemeToggle && <ThemeToggle />}
            {site.hasAccount && <ContaIcons />}
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden text-white p-2"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            >
              {open ? <XIcon /> : <MenuIcon />}
            </button>
            </div>
          </div>
        </div>

        {open && (
          <div className="lg:hidden bg-[#111] border-t border-white/10">
            <nav className="flex flex-col px-4 py-4 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-white/75 hover:text-gold transition-colors py-3 border-b border-white/10 text-sm uppercase tracking-wide font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-whatsapp text-white font-bold py-3 rounded-lg mt-3 text-sm"
              >
                ☏ Falar no WhatsApp
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}

function ContaIcons() {
  const { quantidadeTotal } = useCarrinho()
  const logado = useSessao()
  const iconBtn =
    'relative grid h-9 w-9 lg:h-10 lg:w-10 place-items-center rounded-full border border-gold/40 text-gold transition-colors duration-200 hover:bg-gold hover:text-dark'
  return (
    <>
      <Link href={logado ? '/conta' : '/entrar'} className={iconBtn} aria-label={logado ? 'Minha conta' : 'Entrar'} title={logado ? 'Minha conta' : 'Entrar'}>
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.1a7.5 7.5 0 0115 0A17.9 17.9 0 0112 21.75c-2.68 0-5.22-.58-7.5-1.65z" />
        </svg>
        {logado && <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-whatsapp" aria-hidden="true" />}
      </Link>
      <Link href="/carrinho" className={iconBtn} aria-label={`Carrinho (${quantidadeTotal} itens)`} title="Carrinho">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.36-1.99l1.26 12A1.13 1.13 0 0119.75 21.75H4.25a1.13 1.13 0 01-1.12-1.24l1.26-12A1.13 1.13 0 015.51 7.5h12.98c.58 0 1.06.44 1.12 1.01z" />
        </svg>
        {quantidadeTotal > 0 && (
          <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-[10px] font-bold text-dark">
            {quantidadeTotal}
          </span>
        )}
      </Link>
    </>
  )
}

function MenuIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}
