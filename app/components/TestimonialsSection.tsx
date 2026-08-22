import { GOOGLE_PLACE_RATING, GOOGLE_PLACE_REVIEW_COUNT, GOOGLE_MAPS_URL, GOOGLE_WRITE_REVIEW_URL } from '@/app/lib/google'

const testimonials = [
  {
    name: 'Ana Paula M.',
    date: 'há 2 semanas',
    text: 'Atendimento incrível! As alianças ficaram lindas, exatamente como queríamos. Muito obrigada pela paciência em tirar todas as nossas dúvidas pelo WhatsApp.',
    stars: 5,
  },
  {
    name: 'Carlos e Fernanda',
    date: 'há 1 mês',
    text: 'Compramos nossas alianças de prata 950 e ficamos apaixonados. A qualidade é excelente e a entrega foi dentro do prazo prometido. Super recomendamos!',
    stars: 5,
  },
  {
    name: 'Rodrigo S.',
    date: 'há 1 mês',
    text: 'Fiz a encomenda pelo WhatsApp, foi tudo muito simples. As alianças chegaram em uma caixinha linda e o acabamento é impecável. Vale cada centavo.',
    stars: 5,
  },
  {
    name: 'Juliana e Marcos',
    date: 'há 2 meses',
    text: 'Procurávamos alianças de moeda antiga há muito tempo. A Oliveira Joias foi a única que nos atendeu com tanta atenção e o resultado foi perfeito.',
    stars: 5,
  },
  {
    name: 'Thaís R.',
    date: 'há 2 meses',
    text: 'Compra rápida, segura e de excelente qualidade. As alianças vieram com a gravação exatamente como pedimos. Recomendo muito!',
    stars: 5,
  },
  {
    name: 'Diego e Camila',
    date: 'há 3 meses',
    text: 'Nos casamos em novembro e as alianças foram o detalhe perfeito. Elegantes, bem acabadas e com um atendimento humanizado que fez toda a diferença.',
    stars: 5,
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[11px] text-gold tracking-[0.2em] uppercase font-medium mb-3">
            Quem já comprou
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] leading-[1.05] font-medium text-white">
            O que dizem nossos clientes
          </h2>
        </div>

        <a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 mb-12 group"
        >
          <GoogleIcon />
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-xl">
              {GOOGLE_PLACE_RATING.toFixed(1).replace('.', ',')}
            </span>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarFilledIcon key={i} />
              ))}
            </div>
            <span className="text-white/50 text-sm group-hover:text-gold transition-colors">
              · {GOOGLE_PLACE_REVIEW_COUNT} avaliações no Google
            </span>
          </div>
        </a>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-[#171717] border border-white/8 rounded-2xl p-6 flex flex-col gap-4"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <StarFilledIcon key={i} />
                ))}
              </div>
              <p className="text-white/75 text-sm leading-relaxed flex-1">"{t.text}"</p>
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold text-xs font-bold">
                    {t.name[0]}
                  </div>
                  <span className="text-white/80 text-sm font-medium">{t.name}</span>
                </div>
                <span className="text-white/30 text-xs">{t.date}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href={GOOGLE_WRITE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gold/30 text-gold text-sm font-semibold hover:bg-gold hover:text-dark transition-all duration-200"
          >
            Avaliar no Google
          </a>
        </div>
      </div>
    </section>
  )
}

function StarFilledIcon() {
  return (
    <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg className="w-7 h-7" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47a5.53 5.53 0 01-2.4 3.63v3h3.88c2.27-2.09 3.57-5.17 3.57-8.82z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.07 7.93-2.91l-3.88-3a7.4 7.4 0 01-11-3.89H1.06v3.09A12 12 0 0012 24z" />
      <path fill="#FBBC05" d="M5.05 14.2a7.2 7.2 0 010-4.4V6.71H1.06a12 12 0 000 10.58z" />
      <path fill="#EA4335" d="M12 4.77c1.76 0 3.34.6 4.58 1.79l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 001.06 6.71l3.99 3.09A7.16 7.16 0 0112 4.77z" />
    </svg>
  )
}
