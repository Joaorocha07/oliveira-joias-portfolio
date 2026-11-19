import { apagarToken, responder } from '@/app/lib/conta-server'

export async function POST() {
  await apagarToken()
  return responder({ status: 200, json: { data: { ok: true } } })
}
