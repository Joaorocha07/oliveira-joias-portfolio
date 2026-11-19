import { lerToken, responder } from '@/app/lib/conta-server'

// Só diz se há sessão (para o ícone da navbar) — sem ir ao backend.
export async function GET() {
  return responder({ status: 200, json: { data: { logado: !!(await lerToken()) } } })
}
