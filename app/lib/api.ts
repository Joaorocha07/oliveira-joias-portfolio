import type { Product } from './products'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? ''

export type CatalogoConfig = {
  info_produto: string
  voce_sabia: string
  faq: Array<{ pergunta: string; resposta: string }>
}

const DEFAULT_CONFIG: CatalogoConfig = {
  info_produto:
    'Sob encomenda. Prazo de fabricação de até 72h úteis.\n\nImportante: Valor referente ao par de alianças e caixinha de veludo.\n\nIncluso: Todos os pares acompanham caixinha de brinde.',
  voce_sabia:
    'Nossas alianças são de fabricação própria, aqui você pode personalizar como desejar! Por exemplo: acrescentar/remover pedras, solicitar modelo liso, espessura maior e muito mais.\n\nFaça já seu orçamento via WhatsApp que vamos lhe direcionar ♡',
  faq: [
    {
      pergunta: 'Qual o material da joia?',
      resposta: 'Nossas peças são fabricadas em prata premium 950 com designers especializados em joias.',
    },
    {
      pergunta: 'Quanto tempo de garantia?',
      resposta:
        'Todas as peças possuem garantia eterna sob a autenticidade da joia.\n\nObs: não damos garantia em pedras.',
    },
    {
      pergunta: 'Como funciona caso precise efetuar uma troca/ajuste de aliança?',
      resposta:
        'Você tem até 7 dias para fazer uma troca ou ajuste na aliança.\n\nNão efetuamos trocas para defeitos identificados previamente como mau uso, somente para peças com defeito de fábrica.\n\nPara ajuste de alianças, se for preciso aumentar/diminuir até 2 números, será cobrada uma taxa de apenas R$ 25,00. Caso a aliança tenha pedra, não será possível fazer o ajuste, somente a troca.\n\nCaso o ajuste seja acima de 2 numerações, será cobrado o valor de 1/3 sobre o valor integral das alianças.',
    },
  ],
}

export async function fetchCatalogoConfig(): Promise<CatalogoConfig> {
  if (!BACKEND_URL) return DEFAULT_CONFIG
  try {
    const res = await fetch(`${BACKEND_URL}/api/config`, { next: { revalidate: 300 } })
    if (!res.ok) return DEFAULT_CONFIG
    const { data } = (await res.json()) as { data: CatalogoConfig }
    return data ?? DEFAULT_CONFIG
  } catch {
    return DEFAULT_CONFIG
  }
}

type ApiProduto = {
  id: string
  nome: string
  slug: string
  categoria: string
  linha: string | null
  material: string
  largura: string | null
  descricao: string
  valor: number
  parcelas: number | null
  valor_parcela: number | null
  imagens: string[]
  destaque: boolean
  ordem: number | null
  info_produto: string | null
  voce_sabia: string | null
  faq: Array<{ pergunta: string; resposta: string }> | null
}

function formatBRL(value: number): string {
  return `R$ ${value.toFixed(2).replace('.', ',')}`
}

function mapProduct(p: ApiProduto): Product {
  const valorParcela = p.valor_parcela ?? (p.parcelas ? p.valor / p.parcelas : null)
  const totalParcelado = p.parcelas && valorParcela ? p.parcelas * valorParcela : null
  const hasJuros = totalParcelado != null && totalParcelado > p.valor + 0.01
  return {
    id: p.id,
    slug: p.slug,
    name: p.nome,
    category: p.categoria,
    subcategory: p.linha ?? '',
    description: p.descricao,
    details: p.descricao,
    material: p.material,
    width: p.largura ?? '',
    valor: p.valor,
    installments: p.parcelas && valorParcela
      ? `${p.parcelas}x de ${formatBRL(valorParcela)} sem juros`
      : undefined,
    cashPrice: p.valor > 0 ? `${formatBRL(p.valor)} à vista` : undefined,
    images: p.imagens,
    featured: p.destaque,
    ordem: p.ordem,
    info_produto: p.info_produto ?? null,
    voce_sabia: p.voce_sabia ?? null,
    faq: p.faq ?? null,
  }
}

export type CatalogoCategoria = { id: string; nome: string; ativo: boolean }

export async function fetchCategorias(): Promise<CatalogoCategoria[]> {
  if (!BACKEND_URL) return []
  try {
    const res = await fetch(`${BACKEND_URL}/api/categorias`, { next: { revalidate: 60 } })
    if (!res.ok) return []
    const { data } = (await res.json()) as { data: CatalogoCategoria[] }
    return data ?? []
  } catch {
    return []
  }
}

// revalidate: 60 — catálogo não muda a cada segundo, ISR de 1 minuto evita
// bater no backend a cada request mantendo os produtos razoavelmente atuais.
export async function fetchAllProducts(): Promise<Product[]> {
  if (!BACKEND_URL) return []
  try {
    const res = await fetch(`${BACKEND_URL}/api/produtos`, { next: { revalidate: 60 } })
    if (!res.ok) return []
    const { data } = (await res.json()) as { data: ApiProduto[] }
    return data.map(mapProduct)
  } catch {
    return []
  }
}

export async function fetchProductBySlug(slug: string): Promise<Product | undefined> {
  if (!BACKEND_URL) return undefined
  try {
    const res = await fetch(`${BACKEND_URL}/api/produtos/${slug}`, { next: { revalidate: 60 } })
    if (!res.ok) return undefined
    const { data } = (await res.json()) as { data: ApiProduto }
    return mapProduct(data)
  } catch {
    return undefined
  }
}
