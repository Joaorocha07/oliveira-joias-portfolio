import Image from 'next/image'
import Link from 'next/link'

const materials = [
  {
    slug: 'prata',
    label: 'Alianças de',
    name: 'Prata 950',
    from: 'A partir de R$ 280,00 o par',
    image: '/images/products/10.webp',
    alt: 'Alianças de prata 950 — Oliveira Joias',
    href: '/aliancas',
  },
  {
    slug: 'moeda',
    label: 'Alianças de',
    name: 'Moeda Antiga',
    from: 'A partir de R$ 249,90 o par',
    image: '/images/coin.webp',
    alt: 'Alianças de moeda antiga — Oliveira Joias',
    href: '/aliancas',
  },
  {
    slug: 'ouro',
    label: 'Alianças de',
    name: 'Ouro 18K',
    from: 'Orçamentos personalizados',
    image: '/images/gold2.webp',
    alt: 'Alianças de ouro 18k — Oliveira Joias',
    href: '/aliancas',
  },
]

export default function MaterialsSection() {
  return (
    <section id="materiais" className="py-20 lg:py-28 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[11px] text-gold tracking-[0.2em] uppercase font-medium mb-3">
            Nossos materiais
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] leading-[1.05] font-medium text-white">
            Escolha o material perfeito<br className="hidden sm:block" /> para a sua história
          </h2>
          <p className="text-white/50 mt-4 text-base max-w-lg mx-auto">
            Veja as principais opções e fale com nossa equipe para encontrar o modelo ideal.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {materials.map((m) => (
            <Link
              key={m.slug}
              href={m.href}
              className="group relative min-h-[300px] rounded-2xl overflow-hidden bg-[#171717] border border-white/8 block"
            >
              <Image
                src={m.image}
                alt={m.alt}
                fill
                className="object-cover opacity-60 transition-all duration-500 group-hover:scale-105 group-hover:opacity-75"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute left-6 right-6 bottom-5 z-10">
                <p className="text-[#e5c98e] text-[11px] tracking-[0.14em] uppercase mb-1">{m.label}</p>
                <h3 className="font-serif text-white text-[28px] font-medium leading-tight mb-1.5">{m.name}</h3>
                <p className="text-white/70 text-sm mb-4">{m.from}</p>
                <span className="inline-block border border-gold/60 hover:bg-gold hover:border-gold text-white hover:text-dark text-[12px] font-bold px-3.5 py-2 rounded-lg transition-all duration-200">
                  Ver coleção
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
