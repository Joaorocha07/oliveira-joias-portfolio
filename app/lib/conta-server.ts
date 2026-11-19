import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// A sessão do cliente fica num cookie httpOnly do próprio site (o JavaScript da
// página não consegue ler o token). As rotas /api/conta/* repassam as chamadas
// para o backend com o token no header Authorization.

export const SESSAO_COOKIE = 'oj_sessao'
const SESSAO_DIAS = 30
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? ''

export async function lerToken(): Promise<string | null> {
  return (await cookies()).get(SESSAO_COOKIE)?.value ?? null
}

export async function salvarToken(token: string) {
  ;(await cookies()).set(SESSAO_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSAO_DIAS * 86_400,
  })
}

export async function apagarToken() {
  ;(await cookies()).delete(SESSAO_COOKIE)
}

// Chama o backend e devolve a resposta (status + JSON) para o navegador.
export async function repassar(
  caminho: string,
  init: { method: string; body?: unknown; autenticado?: boolean },
): Promise<{ status: number; json: { data?: unknown; error?: string } }> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (init.autenticado) {
    const token = await lerToken()
    if (!token) return { status: 401, json: { error: 'Faça login para continuar.' } }
    headers.Authorization = `Bearer ${token}`
  }
  try {
    const res = await fetch(`${BACKEND_URL}/api/conta${caminho}`, {
      method: init.method,
      headers,
      body: init.body === undefined ? undefined : JSON.stringify(init.body),
      cache: 'no-store',
    })
    const json = await res.json().catch(() => ({ error: 'Resposta inválida do servidor.' }))
    if (res.status === 401 && init.autenticado) await apagarToken()
    return { status: res.status, json }
  } catch {
    return { status: 502, json: { error: 'Servidor indisponível. Tente novamente em instantes.' } }
  }
}

export function responder({ status, json }: { status: number; json: unknown }) {
  return NextResponse.json(json, { status })
}

export async function lerCorpo(request: Request): Promise<unknown> {
  return request.json().catch(() => ({}))
}
