import { lerCorpo, repassar, responder } from '@/app/lib/conta-server'

export async function POST(request: Request) {
  return responder(await repassar('/pedidos', { method: 'POST', body: await lerCorpo(request), autenticado: true }))
}
