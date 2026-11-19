import { lerCorpo, repassar, responder } from '@/app/lib/conta-server'

export async function GET() {
  return responder(await repassar('', { method: 'GET', autenticado: true }))
}

export async function PUT(request: Request) {
  return responder(await repassar('', { method: 'PUT', body: await lerCorpo(request), autenticado: true }))
}
