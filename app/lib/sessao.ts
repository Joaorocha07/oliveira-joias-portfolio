'use client'

import { useEffect, useState } from 'react'

const EVENTO = 'oj-sessao'

// Avisa a navbar (e outras partes) que o login mudou.
export function avisarMudancaSessao() {
  window.dispatchEvent(new Event(EVENTO))
}

// null = ainda verificando
export function useSessao(): boolean | null {
  const [logado, setLogado] = useState<boolean | null>(null)
  useEffect(() => {
    let ativo = true
    const checar = () =>
      fetch('/api/conta/sessao', { cache: 'no-store' })
        .then((r) => r.json())
        .then((j: { data?: { logado?: boolean } }) => { if (ativo) setLogado(!!j.data?.logado) })
        .catch(() => { if (ativo) setLogado(false) })
    void checar()
    window.addEventListener(EVENTO, checar)
    return () => {
      ativo = false
      window.removeEventListener(EVENTO, checar)
    }
  }, [])
  return logado
}
