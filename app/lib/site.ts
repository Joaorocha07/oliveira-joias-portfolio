// Configuração de cada domínio servido por este projeto. O proxy.ts lê o host
// da requisição e reescreve a URL para /[site]/..., então cada página recebe
// a chave do site em params e busca aqui o nome e o WhatsApp corretos.

export type SiteKey = 'oliveira-joias' | 'aliancas-oliveira'

export type SiteConfig = {
  key: SiteKey
  name: string
  domain: string
  logoTop: string
  logoBottom: string
  whatsappNumber: string
  whatsappDisplay: string
  // Exibe a faixa "Sem estoque" nos produtos marcados assim no ERP (/portfolio).
  // Só o oliveirajoias.com mostra; no aliancasoliveira.com o produto aparece normal.
  showOutOfStock: boolean
}

export const sites: Record<SiteKey, SiteConfig> = {
  'oliveira-joias': {
    key: 'oliveira-joias',
    name: 'Oliveira Joias',
    domain: 'www.oliveirajoias.com',
    logoTop: 'OLIVEIRA',
    logoBottom: 'JOIAS',
    whatsappNumber: '553497717779',
    whatsappDisplay: '(34) 9771-7779',
    showOutOfStock: true,
  },
  'aliancas-oliveira': {
    key: 'aliancas-oliveira',
    name: 'Alianças Oliveira',
    domain: 'www.aliancasoliveira.com',
    logoTop: 'ALIANÇAS',
    logoBottom: 'OLIVEIRA',
    whatsappNumber: '5534998717389',
    whatsappDisplay: '(34) 99871-7389',
    showOutOfStock: false,
  },
}

export const DEFAULT_SITE: SiteKey = 'oliveira-joias'

export function siteKeyFromHost(host: string | null): SiteKey {
  // Também cobre aliancasoliveira.localhost:3000 para testar localmente.
  if (host?.includes('aliancasoliveira')) return 'aliancas-oliveira'
  return DEFAULT_SITE
}

export function getSite(key: string): SiteConfig {
  return sites[key as SiteKey] ?? sites[DEFAULT_SITE]
}

export function whatsappUrl(site: SiteConfig, text?: string) {
  const base = `https://wa.me/${site.whatsappNumber}`
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}
