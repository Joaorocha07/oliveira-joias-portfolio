import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { siteKeyFromHost } from './app/lib/site'

// Reescreve /qualquer-rota para /[site]/qualquer-rota conforme o domínio,
// mantendo a URL original no navegador.
export function proxy(request: NextRequest) {
  const site = siteKeyFromHost(request.headers.get('host'))
  const url = request.nextUrl.clone()
  url.pathname = `/${site}${url.pathname === '/' ? '' : url.pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  // Ignora assets do Next, a API e arquivos estáticos (qualquer caminho com extensão).
  matcher: ['/((?!_next|api|.*\\..*).*)'],
}
