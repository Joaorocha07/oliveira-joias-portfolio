// Cadastra todos os produtos de public/images/ no backend.
// Requer Node.js 18+ (fetch e FormData nativos, sem dependências extras).
// Uso: node scripts/registrar-produtos.mjs

import { readFileSync, readdirSync } from 'node:fs'
import { join, extname, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const BACKEND_URL = 'https://oliveira-joias-backend.onrender.com'
const IMAGES_DIR = join(__dirname, '..', 'public', 'images')

// Cada entrada gera um produto. A categoria deve existir em catalogo_categorias.
// Imagens buscadas por prefixo: arquivos que comecem com o prefix seguido de
// underscore, dígito ou fim de nome (ex: "coin", "coin2", "coin3").
const PRODUTOS = [
  {
    nome: 'Aurora Diamantada com Risco Lateral',
    prefix: 'aurora_diamantada_com_risco_lateral',
    categoria: 'prata',
    material: 'Prata 950',
    largura: '',
  },
  {
    nome: 'Aurora Duo 3mm',
    prefix: 'aurora_duo_3mm',
    categoria: 'prata',
    material: 'Prata 950',
    largura: '3mm',
  },
  {
    nome: 'Aurora Duo com Pedra Central 3mm',
    prefix: 'aurora_duo_com_pedra_central_3mm',
    categoria: 'prata',
    material: 'Prata 950',
    largura: '3mm',
  },
  {
    nome: 'Aurora Fusion Chanfrada 3mm',
    prefix: 'aurora_fusion_chanfrada_3mm',
    categoria: 'prata',
    material: 'Prata 950',
    largura: '3mm',
  },
  {
    nome: 'Chanfrado 2mm',
    prefix: 'chanfrado_2mm',
    categoria: 'prata',
    material: 'Prata 950',
    largura: '2mm',
  },
  {
    nome: 'Chanfrado Diamantado 2mm',
    prefix: 'chanfrado_diamantado_2mm',
    categoria: 'prata',
    material: 'Prata 950',
    largura: '2mm',
  },
  {
    nome: 'Comfort One Abaulada 2mm',
    prefix: 'comfort_one_abaulada_2mm',
    categoria: 'prata',
    material: 'Prata 950',
    largura: '2mm',
  },
  {
    nome: 'Essenza Line 3mm',
    prefix: 'essenza_line_3mm',
    categoria: 'prata',
    material: 'Prata 950',
    largura: '3mm',
  },
  {
    nome: 'Lumina Crystal 3mm',
    prefix: 'lumina_crystal_3mm',
    categoria: 'prata',
    material: 'Prata 950',
    largura: '3mm',
  },
  {
    nome: 'Lumina Duo 3mm',
    prefix: 'lumina_duo_3mm',
    categoria: 'prata',
    material: 'Prata 950',
    largura: '3mm',
  },
  {
    nome: 'Lumina Duo Pedra Colorida 3mm',
    prefix: 'lumina_duo_pedra_colorida_3mm',
    categoria: 'prata',
    material: 'Prata 950',
    largura: '3mm',
  },
  {
    nome: 'Aurora Diamantada 2mm',
    prefix: 'modelo_aurora_diamantada_2mm',
    categoria: 'prata',
    material: 'Prata 950',
    largura: '2mm',
  },
  {
    nome: 'Aurora Diamantada 3mm',
    prefix: 'modelo_aurora_diamantada_3mm',
    categoria: 'prata',
    material: 'Prata 950',
    largura: '3mm',
  },
  {
    nome: 'Classic Reta 2mm',
    prefix: 'modelo_classic_reta_2mm_teste',
    categoria: 'prata',
    material: 'Prata 950',
    largura: '2mm',
  },
  {
    nome: 'Classic Reta 3mm',
    prefix: 'modelo_classic_reta_3mm',
    categoria: 'prata',
    material: 'Prata 950',
    largura: '3mm',
  },
  {
    nome: 'Classic Reta com Risco Central 3mm',
    prefix: 'modelo_classic_reta_com_risco_central_3mm',
    categoria: 'prata',
    material: 'Prata 950',
    largura: '3mm',
  },
  {
    nome: 'Moeda Antiga',
    prefix: 'coin',
    categoria: 'moeda antiga',
    material: 'Prata 950',
    largura: '',
  },
  {
    nome: 'Ouro',
    prefix: 'gold',
    categoria: 'ouro',
    material: 'Ouro',
    largura: '',
  },
]

const IMAGEM_EXTS = new Set(['.webp', '.jpg', '.jpeg', '.png'])

function listarImagens(prefix) {
  return readdirSync(IMAGES_DIR)
    .filter((f) => {
      if (!IMAGEM_EXTS.has(extname(f).toLowerCase())) return false
      const nome = f.slice(0, f.lastIndexOf('.'))
      const resto = nome.slice(prefix.length)
      // Aceita: prefixo exato, prefixo + _ ou prefixo + dígito (coin2, coin3)
      return nome.startsWith(prefix) && (resto === '' || /^[_\d]/.test(resto))
    })
    .sort()
}

async function registrar(produto) {
  const arquivos = listarImagens(produto.prefix)

  if (arquivos.length === 0) {
    console.log(`  ⚠  ${produto.nome}: nenhuma imagem encontrada (prefixo: "${produto.prefix}")`)
    return
  }

  const form = new FormData()
  form.append('nome', produto.nome)
  form.append('categoria', produto.categoria)
  form.append('material', produto.material)
  form.append('descricao', produto.nome)
  form.append('valor', '0')
  form.append('destaque', 'false')
  if (produto.largura) form.append('largura', produto.largura)

  for (const f of arquivos) {
    const bytes = readFileSync(join(IMAGES_DIR, f))
    form.append('imagens', new Blob([bytes], { type: 'image/webp' }), f)
  }

  try {
    const res = await fetch(`${BACKEND_URL}/api/produtos`, { method: 'POST', body: form })
    const json = await res.json().catch(() => ({}))
    if (res.ok) {
      console.log(`  ✓  ${produto.nome} — ${arquivos.length} imagem(ns) — slug: ${json.data?.slug}`)
    } else {
      console.error(`  ✗  ${produto.nome}: ${json.error ?? JSON.stringify(json)}`)
    }
  } catch (e) {
    console.error(`  ✗  ${produto.nome}: ${e.message}`)
  }
}

// --- Início ---

console.log(`Verificando backend (${BACKEND_URL})...`)
try {
  const health = await fetch(`${BACKEND_URL}/health`, {
    signal: AbortSignal.timeout(30_000),
  })
  if (!health.ok) throw new Error(`status ${health.status}`)
  console.log('Backend online.\n')
} catch (e) {
  console.error(`Backend não respondeu: ${e.message}`)
  console.error('O backend no Render pode estar dormindo — aguarde ~30s e tente novamente.')
  process.exit(1)
}

for (const produto of PRODUTOS) {
  await registrar(produto)
  await new Promise((r) => setTimeout(r, 800)) // evita sobrecarregar o backend
}

console.log('\n✅ Concluído!')
console.log('Todos os produtos foram criados com valor R$ 0,00.')
console.log('Edite cada um no sistema (/portfolio) para ajustar preço, descrição e categoria.')
