'use client'

import { flushSync } from 'react-dom'
import { THEME_STORAGE_KEY } from '@/app/lib/theme'

export default function ThemeToggle({ className = '' }: { className?: string }) {
  function toggle(e: React.MouseEvent<HTMLButtonElement>) {
    const root = document.documentElement
    const next = !root.classList.contains('dark')

    const apply = () => {
      root.classList.toggle('dark', next)
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next ? 'dark' : 'light')
      } catch {}
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Navegador sem View Transitions: só um fade suave das cores.
    if (!document.startViewTransition || reduceMotion) {
      if (!reduceMotion) {
        root.classList.add('theme-fade')
        window.setTimeout(() => root.classList.remove('theme-fade'), 550)
      }
      apply()
      return
    }

    // Círculo que se expande a partir do botão até cobrir a tela inteira.
    const rect = e.currentTarget.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

    const transition = document.startViewTransition(() => flushSync(apply))
    transition.ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 650, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', pseudoElement: '::view-transition-new(root)' },
      )
    })
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Alternar modo claro/escuro"
      title="Alternar modo claro/escuro"
      className={`grid h-10 w-10 place-items-center rounded-full border border-gold/40 text-gold transition-colors duration-200 hover:bg-gold hover:text-dark ${className}`}
    >
      {/* Ícone escolhido por CSS (classe .dark), sem depender de estado no React. */}
      <SunIcon className="hidden h-5 w-5 dark:block" />
      <MoonIcon className="h-5 w-5 dark:hidden" />
    </button>
  )
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4" strokeWidth={1.5} />
      <path
        strokeLinecap="round"
        strokeWidth={1.5}
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
      />
    </svg>
  )
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  )
}
