export type Product = {
  id: string
  slug: string
  name: string
  category: 'alianças' | 'anéis' | 'correntes' | 'serviços'
  subcategory: string
  description: string
  details: string
  material: string
  width: string
  images: string[]
  videos?: string[]
  featured: boolean
}

export const categoryPaths: Record<Product['category'], string> = {
  'alianças': 'aliancas',
  'anéis': 'aneis',
  'correntes': 'correntes',
  'serviços': 'servicos',
}

const WHATSAPP_NUMBER = '5534998717389'

export function buildWhatsAppUrl(productName: string) {
  const text = `Olá! Vi no site da Oliveira Joias o produto ${productName} e tenho interesse. Poderia me passar mais informações?`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

export const WHATSAPP_GENERIC_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá! Gostaria de saber mais sobre os produtos da Oliveira Joias.')}`

export const products: Product[] = [
  {
    id: '1',
    slug: 'aurora-diamantada-com-risco-lateral',
    name: 'Aurora Diamantada com Risco Lateral',
    category: 'alianças',
    subcategory: 'Aurora',
    description: 'Aliança com acabamento diamantado e risco lateral, para quem busca sofisticação e personalidade.',
    details: 'A Aurora Diamantada com Risco Lateral combina o brilho do acabamento diamantado com um delicado risco lateral que confere identidade única à peça. Design moderno e elegante, perfeito para eternizar momentos especiais.',
    material: 'Prata',
    width: '3mm',
    images: [
      '/images/aurora_diamantada_com_risco_lateral_01.webp',
      '/images/aurora_diamantada_com_risco_lateral_02.webp',
      '/images/aurora_diamantada_com_risco_lateral_03.webp',
    ],
    featured: true,
  },
  {
    id: '2',
    slug: 'aurora-duo-3mm',
    name: 'Aurora Duo 3mm',
    category: 'alianças',
    subcategory: 'Aurora Duo',
    description: 'Aliança Aurora Duo em 3mm com design duplo elegante e acabamento impecável.',
    details: 'A Aurora Duo 3mm apresenta um design inovador com dois elos unidos, simbolizando a união entre dois seres. Acabamento de alta qualidade com brilho duradouro.',
    material: 'Prata',
    width: '3mm',
    images: [
      '/images/aurora_duo_3mm_01.webp',
      '/images/aurora_duo_3mm_02.webp',
      '/images/aurora_duo_3mm_03.webp',
      '/images/aurora_duo_3mm_04.webp',
      '/images/aurora_duo_3mm_05.webp',
      '/images/aurora_duo_3mm_06.webp',
      '/images/aurora_duo_3mm_07.webp',
      '/images/aurora_duo_3mm_08.webp',
    ],
    videos: ['/images/aurora_duo_3mm_09.mp4'],
    featured: true,
  },
  {
    id: '3',
    slug: 'aurora-duo-com-pedra-central-3mm',
    name: 'Aurora Duo com Pedra Central 3mm',
    category: 'alianças',
    subcategory: 'Aurora Duo',
    description: 'Aurora Duo com pedra central em destaque, unindo elegância e brilho em uma peça única.',
    details: 'A Aurora Duo com Pedra Central 3mm eleva o design da linha Aurora com a adição de uma pedra central que capta e reflete a luz de forma incomparável. Uma peça que expressa amor e distinção.',
    material: 'Prata',
    width: '3mm',
    images: [
      '/images/aurora_duo_com_pedra_central_3mm_01.webp',
      '/images/aurora_duo_com_pedra_central_3mm_02.webp',
      '/images/aurora_duo_com_pedra_central_3mm_03.webp',
      '/images/aurora_duo_com_pedra_central_3mm_04.webp',
    ],
    videos: ['/images/aurora_duo_com_pedra_central_3mm_05.mp4'],
    featured: true,
  },
  {
    id: '4',
    slug: 'aurora-fusion-chanfrada-3mm',
    name: 'Aurora Fusion Chanfrada 3mm',
    category: 'alianças',
    subcategory: 'Aurora',
    description: 'Design chanfrado moderno da linha Aurora Fusion, com borda diagonal que valoriza o acabamento.',
    details: 'A Aurora Fusion Chanfrada 3mm destaca-se pelo seu corte chanfrado que cria um jogo de luz e sombra único. Perfeita para quem busca modernidade e sofisticação.',
    material: 'Prata',
    width: '3mm',
    images: [
      '/images/aurora_fusion_chanfrada_3mm_01.webp',
      '/images/aurora_fusion_chanfrada_3mm_02.webp',
      '/images/aurora_fusion_chanfrada_3mm_03.webp',
      '/images/aurora_fusion_chanfrada_3mm_04.webp',
    ],
    featured: false,
  },
  {
    id: '5',
    slug: 'chanfrado-2mm',
    name: 'Chanfrado 2mm',
    category: 'alianças',
    subcategory: 'Chanfrado',
    description: 'Aliança chanfrada delicada em 2mm, clássica e atemporal para uso diário.',
    details: 'A aliança Chanfrado 2mm é uma peça clássica que nunca sai de moda. Seu corte chanfrado sutil valoriza o anel no dedo, sendo ideal para quem prefere discrição e elegância.',
    material: 'Prata',
    width: '2mm',
    images: [
      '/images/chanfrado_2mm_01.webp',
      '/images/chanfrado_2mm_02.webp',
      '/images/chanfrado_2mm_03.webp',
    ],
    featured: false,
  },
  {
    id: '6',
    slug: 'chanfrado-diamantado-2mm',
    name: 'Chanfrado Diamantado 2mm',
    category: 'alianças',
    subcategory: 'Chanfrado',
    description: 'Chanfrado com textura diamantada que amplifica o brilho da peça em cada movimento.',
    details: 'A aliança Chanfrado Diamantado 2mm une o clássico corte chanfrado com o sofisticado acabamento diamantado. O resultado é uma peça de alto brilho que impressiona a cada movimento.',
    material: 'Prata',
    width: '2mm',
    images: [
      '/images/chanfrado_diamantado_2mm_01.webp',
      '/images/chanfrado_diamantado_2mm_02.webp',
      '/images/chanfrado_diamantado_2mm_03.webp',
      '/images/chanfrado_diamantado_2mm_04.webp',
    ],
    featured: true,
  },
  {
    id: '7',
    slug: 'comfort-one-abaulada-2mm',
    name: 'Comfort One Abaulada 2mm',
    category: 'alianças',
    subcategory: 'Comfort One',
    description: 'Aliança abaulada confortável em 2mm, com interior arredondado para o uso diário perfeito.',
    details: 'A Comfort One Abaulada 2mm é sinônimo de conforto e elegância. Seu interior arredondado (comfort fit) permite uso prolongado sem desconforto. Perfeita para o dia a dia.',
    material: 'Prata',
    width: '2mm',
    images: [
      '/images/comfort_one_abaulada_2mm_01.webp',
      '/images/comfort_one_abaulada_2mm_02.webp',
      '/images/comfort_one_abaulada_2mm_03.webp',
      '/images/comfort_one_abaulada_2mm_04.webp',
      '/images/comfort_one_abaulada_2mm_05.webp',
    ],
    featured: false,
  },
  {
    id: '8',
    slug: 'essenza-line-3mm',
    name: 'Essenza Line 3mm',
    category: 'alianças',
    subcategory: 'Essenza',
    description: 'Linha Essenza em 3mm: minimalismo sofisticado que captura a essência da elegância.',
    details: 'A Essenza Line 3mm traz o conceito de beleza essencial em cada detalhe. Linhas puras e acabamento impecável definem esta peça que é ao mesmo tempo simples e marcante.',
    material: 'Prata',
    width: '3mm',
    images: [
      '/images/essenza_line_3mm_01.webp',
      '/images/essenza_line_3mm_02.webp',
      '/images/essenza_line_3mm_03.webp',
      '/images/essenza_line_3mm_04.webp',
      '/images/essenza_line_3mm_05.webp',
    ],
    featured: true,
  },
  {
    id: '9',
    slug: 'lumina-crystal-3mm',
    name: 'Lumina Crystal 3mm',
    category: 'alianças',
    subcategory: 'Lumina',
    description: 'Lumina Crystal com cristais que capturam e refletem a luz em cada ângulo.',
    details: 'A Lumina Crystal 3mm é a escolha perfeita para quem ama brilho. Os cristais embutidos criam um efeito luminoso deslumbrante, transformando cada momento em algo ainda mais especial.',
    material: 'Prata com cristais',
    width: '3mm',
    images: [
      '/images/lumina_crystal_3mm_01.webp',
      '/images/lumina_crystal_3mm_02.webp',
      '/images/lumina_crystal_3mm_03.webp',
    ],
    featured: false,
  },
  {
    id: '10',
    slug: 'lumina-duo-3mm',
    name: 'Lumina Duo 3mm',
    category: 'alianças',
    subcategory: 'Lumina',
    description: 'Aliança Lumina Duo em 3mm: dois elementos em harmonia perfeita para celebrar a união.',
    details: 'A Lumina Duo 3mm combina dois elos em harmonia, representando a parceria e cumplicidade de uma vida a dois. Acabamento polido que realça a qualidade do material.',
    material: 'Prata',
    width: '3mm',
    images: [
      '/images/lumina_duo_3mm_01.webp',
      '/images/lumina_duo_3mm_02.webp',
      '/images/lumina_duo_3mm_03.webp',
      '/images/lumina_duo_3mm_04.webp',
    ],
    featured: false,
  },
  {
    id: '11',
    slug: 'lumina-duo-com-pedra-colorida-3mm',
    name: 'Lumina Duo com Pedra Colorida 3mm',
    category: 'alianças',
    subcategory: 'Lumina',
    description: 'Lumina Duo com pedra colorida central, adicionando personalidade e cor ao seu símbolo de amor.',
    details: 'A Lumina Duo com Pedra Colorida 3mm personaliza a tradição com uma pedra colorida que representa a unicidade do casal. Uma escolha ousada e apaixonante.',
    material: 'Prata com pedra colorida',
    width: '3mm',
    images: [
      '/images/lumina_duo_pedra_colorida_3mm_01.webp',
      '/images/lumina_duo_pedra_colorida_3mm_02.webp',
      '/images/lumina_duo_pedra_colorida_3mm_03.webp',
    ],
    featured: false,
  },
  {
    id: '12',
    slug: 'modelo-aurora-diamantada-2mm',
    name: 'Modelo Aurora Diamantada 2mm',
    category: 'alianças',
    subcategory: 'Aurora',
    description: 'Aurora Diamantada delicada em 2mm, para quem prefere discrição com muito brilho.',
    details: 'O Modelo Aurora Diamantada 2mm oferece o sofisticado acabamento diamantado em uma versão mais delicada e discreta. Ideal para uso diário ou como complemento a outras peças.',
    material: 'Prata',
    width: '2mm',
    images: [
      '/images/modelo_aurora_diamantada_2mm_01.webp',
      '/images/modelo_aurora_diamantada_2mm_02.webp',
      '/images/modelo_aurora_diamantada_2mm_03.webp',
    ],
    featured: false,
  },
  {
    id: '13',
    slug: 'modelo-aurora-diamantada-3mm',
    name: 'Modelo Aurora Diamantada 3mm',
    category: 'alianças',
    subcategory: 'Aurora',
    description: 'Aurora Diamantada em 3mm com presença marcante e brilho que conquista olhares.',
    details: 'O Modelo Aurora Diamantada 3mm é a versão com mais presença da linha Aurora Diamantada. Seu acabamento diamantado em 3mm garante um visual imponente e sofisticado.',
    material: 'Prata',
    width: '3mm',
    images: [
      '/images/modelo_aurora_diamantada_3mm_01.webp',
      '/images/modelo_aurora_diamantada_3mm_02.webp',
      '/images/modelo_aurora_diamantada_3mm_03.webp',
    ],
    featured: false,
  },
  {
    id: '14',
    slug: 'modelo-classic-reta-2mm',
    name: 'Modelo Classic Reta 2mm',
    category: 'alianças',
    subcategory: 'Classic',
    description: 'A clássica aliança reta em 2mm: tradição e elegância que nunca saem de moda.',
    details: 'O Modelo Classic Reta 2mm é a essência da tradição em joalheria. Linhas retas e puras que transmitem serenidade e elegância atemporal. A escolha perfeita para quem valoriza o clássico.',
    material: 'Prata',
    width: '2mm',
    images: [
      '/images/modelo_classic_reta_2mm_teste_01.webp',
      '/images/modelo_classic_reta_2mm_teste_02.webp',
      '/images/modelo_classic_reta_2mm_teste_03.webp',
      '/images/modelo_classic_reta_2mm_teste_04.webp',
      '/images/modelo_classic_reta_2mm_teste_05.webp',
      '/images/modelo_classic_reta_2mm_teste_06.webp',
    ],
    featured: false,
  },
  {
    id: '15',
    slug: 'modelo-classic-reta-3mm',
    name: 'Modelo Classic Reta 3mm',
    category: 'alianças',
    subcategory: 'Classic',
    description: 'Classic Reta em 3mm com maior presença e o mesmo charme clássico que atravessa gerações.',
    details: 'O Modelo Classic Reta 3mm oferece um visual mais marcante mantendo a pureza clássica da linha. Ideal para quem busca uma aliança tradicional com mais destaque.',
    material: 'Prata',
    width: '3mm',
    images: [
      '/images/modelo_classic_reta_3mm_01.webp',
      '/images/modelo_classic_reta_3mm_02.webp',
      '/images/modelo_classic_reta_3mm_03.webp',
    ],
    featured: false,
  },
  {
    id: '16',
    slug: 'modelo-classic-reta-com-risco-central-3mm',
    name: 'Modelo Classic Reta com Risco Central 3mm',
    category: 'alianças',
    subcategory: 'Classic',
    description: 'Classic Reta com risco central em 3mm: o clássico elevado com um toque de personalidade.',
    details: 'O Modelo Classic Reta com Risco Central 3mm adiciona um detalhe sutil — o risco central — que transforma uma aliança tradicional em uma peça com identidade própria. Elegância e personalidade em equilíbrio perfeito.',
    material: 'Prata',
    width: '3mm',
    images: [
      '/images/modelo_classic_reta_com_risco_central_3mm_01.webp',
      '/images/modelo_classic_reta_com_risco_central_3mm_02.webp',
      '/images/modelo_classic_reta_com_risco_central_3mm_03.webp',
      '/images/modelo_classic_reta_com_risco_central_3mm_04.webp',
    ],
    featured: true,
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(category: Product['category']): Product[] {
  return products.filter((p) => p.category === category)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured)
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.subcategory === product.subcategory)
    .slice(0, limit)
}

export function getProductsGroupedBySubcategory(
  category: Product['category']
): { subcategory: string; products: Product[] }[] {
  const groups: { subcategory: string; products: Product[] }[] = []
  for (const product of getProductsByCategory(category)) {
    const group = groups.find((g) => g.subcategory === product.subcategory)
    if (group) {
      group.products.push(product)
    } else {
      groups.push({ subcategory: product.subcategory, products: [product] })
    }
  }
  return groups
}

export function getTopSubcategories(
  category: Product['category'],
  limit = 4
): { subcategory: string; products: Product[] }[] {
  return [...getProductsGroupedBySubcategory(category)]
    .sort((a, b) => b.products.length - a.products.length)
    .slice(0, limit)
}

export function subcategoryAnchorId(subcategory: string) {
  return subcategory
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, '-')
}
