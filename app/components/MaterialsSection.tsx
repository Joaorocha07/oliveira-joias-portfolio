import Image from 'next/image'
import Link from 'next/link'

const materials = [
  {
    slug: 'prata',
    label: 'Alianças de',
    name: 'Prata 950',
    from: 'A partir de R$ 199,90 o par',
    image: '/images/products/10.webp',
    alt: 'Alianças de prata 950 — Oliveira Joias',
    href: '/aliancas?material=prata',
  },
  {
    slug: 'moeda',
    label: 'Alianças de',
    name: 'Moeda Antiga',
    from: 'A partir de R$ 239,90 o par',
    image: '/images/teste.jpeg',
    alt: 'Alianças de moeda antiga — Oliveira Joias',
    href: '/aliancas?material=moeda',
  },
  {
    slug: 'ouro',
    label: 'Alianças de',
    name: 'Ouro 18K',
    from: 'A partir de 12x de R$ 210,00',
    image: '/images/ouro.jpeg',
    alt: 'Alianças de ouro 18k — Oliveira Joias',
    href: '/aliancas?material=ouro',
  },
]

export default function MaterialsSection() {
  return (
    <section
      id="materiais"
      className="relative isolate flex min-h-[calc(100svh-72px)] sm:min-h-[calc(100svh-108px)] items-center overflow-hidden bg-dark py-12 lg:py-14"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-28rem] h-[48rem] w-[70rem] -translate-x-1/2 rounded-full bg-gold/[0.08] blur-[120px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" />
        <div className="absolute bottom-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-9 lg:mb-11">
          <p className="text-[11px] text-gold tracking-[0.2em] uppercase font-medium mb-3">
            Nossos materiais
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-[56px] leading-[1.02] font-medium text-white">
            Escolha o material perfeito<br className="hidden sm:block" /> para a sua história
          </h1>
          <p className="text-white/55 mt-4 text-base lg:text-[17px] max-w-xl mx-auto leading-relaxed">
            Veja as principais opções e fale com nossa equipe para encontrar o modelo ideal.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 lg:gap-6">
          {materials.map((m, index) => (
            <Link
              key={m.slug}
              href={m.href}
              className="group relative h-[clamp(320px,41vh,410px)] overflow-hidden rounded-2xl border border-white/10 bg-[#171717] shadow-[0_24px_70px_rgba(0,0,0,0.28)] transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/45 hover:shadow-[0_28px_80px_rgba(0,0,0,0.45)]"
            >
              <Image
                src={m.image}
                alt={m.alt}
                fill
                priority
                className={
                  m.slug === 'moeda'
                    ? 'object-cover object-center opacity-95 transition-all duration-700 ease-out group-hover:scale-[1.06]'
                    : 'object-cover opacity-70 transition-all duration-700 ease-out group-hover:scale-[1.06] group-hover:opacity-85'
                }
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t ${
                  m.slug === 'moeda'
                    ? 'from-black/70 via-transparent to-transparent'
                    : 'from-black via-black/20 to-black/5'
                }`}
              />
              <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/35 to-transparent" />
              <span className="absolute right-5 top-5 z-10 font-serif text-sm text-white/45">
                0{index + 1}
              </span>
              <div className="absolute bottom-0 left-0 right-0 z-10 p-6 lg:p-7">
                <div className="mb-5 h-px w-10 bg-gold transition-all duration-500 group-hover:w-16" />
                <p className="text-[#e5c98e] text-[11px] tracking-[0.16em] uppercase mb-1.5">{m.label}</p>
                <h2 className="font-serif text-white text-[30px] lg:text-[34px] font-medium leading-tight mb-2">{m.name}</h2>
                <p className="text-white/70 text-sm mb-5">{m.from}</p>
                <span className="inline-flex items-center gap-2 rounded-lg border border-gold/60 px-4 py-2.5 text-[12px] font-bold text-white transition-all duration-300 group-hover:bg-gold group-hover:text-dark">
                  Ver coleção
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
