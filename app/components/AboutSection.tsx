import Image from 'next/image'

export default function AboutSection() {
  const values = [
    {
      icon: <DiamondIcon />,
      title: 'Qualidade',
      text: 'Cada peça é selecionada com rigoroso controle de qualidade para garantir beleza e durabilidade.',
    },
    {
      icon: <HeartIcon />,
      title: 'Tradição',
      text: 'Anos de experiência no mercado de joias, carregando a confiança de famílias inteiras.',
    },
    {
      icon: <StarIcon />,
      title: 'Atendimento',
      text: 'Atendimento personalizado para que você encontre a joia perfeita para o seu momento.',
    },
  ]

  return (
    <section id="sobre" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/essenza_line_3mm_01.webp"
                alt="Oliveira Joias — Elegância em cada detalhe"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-2xl overflow-hidden shadow-xl border-4 border-white hidden sm:block">
              <Image
                src="/images/lumina_crystal_3mm_01.webp"
                alt="Detalhe de joia Oliveira Joias"
                fill
                className="object-cover"
                sizes="192px"
              />
            </div>
            <div className="absolute -top-4 -left-4 bg-gold text-dark px-5 py-3 rounded-xl shadow-lg hidden sm:block">
              <p className="font-serif text-2xl font-bold leading-none">10+</p>
              <p className="text-xs font-medium uppercase tracking-wide mt-1">Anos no mercado</p>
            </div>
          </div>

          <div>
            <p className="text-gold text-sm tracking-widest uppercase font-medium mb-3">
              Sobre nós
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-dark leading-tight mb-6">
              Elegância e tradição<br />
              <span className="text-gold">em cada peça</span>
            </h2>
            <p className="text-text/70 leading-relaxed mb-4 text-base">
              A Oliveira Joias é referência em Uberlândia quando o assunto é qualidade e elegância.
              Com anos de experiência no mercado, oferecemos peças exclusivas que eternizam os
              momentos mais especiais da sua vida.
            </p>
            <p className="text-text/70 leading-relaxed mb-10 text-base">
              Cada joia é selecionada com carinho para garantir beleza, durabilidade e um brilho
              incomparável. Venha nos visitar e descobrir a peça perfeita para o seu momento.
            </p>

            <div className="grid sm:grid-cols-3 gap-6">
              {values.map((v) => (
                <div key={v.title} className="text-center sm:text-left">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gold/10 rounded-xl text-gold mb-3">
                    {v.icon}
                  </div>
                  <h3 className="font-serif text-dark font-bold text-lg mb-1">{v.title}</h3>
                  <p className="text-text/60 text-sm leading-relaxed">{v.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function DiamondIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3H5l-3 6 10 12L22 9l-3-6h-4m-6 0h6m-6 0L9 9m6-6L15 9m-6 0h6" />
    </svg>
  )
}

function HeartIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  )
}
