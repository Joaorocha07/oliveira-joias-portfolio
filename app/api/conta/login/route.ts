import { lerCorpo, repassar, responder, salvarToken } from '@/app/lib/conta-server'

export async function POST(request: Request) {
  const r = await repassar('/login', { method: 'POST', body: await lerCorpo(request) })
  const token = (r.json.data as { token?: string } | undefined)?.token
  if (r.status === 200 && token) {
    await salvarToken(token)
    return responder({ status: 200, json: { data: { ok: true } } })
  }
  return responder(r)
}
