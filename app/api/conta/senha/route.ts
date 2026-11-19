import { lerCorpo, repassar, responder } from '@/app/lib/conta-server'

export async function PUT(request: Request) {
  return responder(await repassar('/senha', { method: 'PUT', body: await lerCorpo(request), autenticado: true }))
}
