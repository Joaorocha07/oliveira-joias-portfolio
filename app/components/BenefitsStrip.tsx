const benefits = [
  'Fabricação própria',
  'Parcelamento facilitado',
  'Gravação personalizada',
  'Atendimento rápido',
  'Acabamento premium',
  'Modelos exclusivos',
  'Diversas larguras',
  'Garantia de autenticidade',
]

export default function BenefitsStrip() {
  return (
    <section
      aria-label="Diferenciais da Oliveira Joias"
      className="relative overflow-hidden border-y border-gold/20 bg-dark"
    >
      <div
        aria-hidden="true"
        className="absolute -left-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full border border-gold/10"
      />
      <div
        aria-hidden="true"
        className="absolute -right-16 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full border-[28px] border-gold/5"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
        <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] sm:grid-cols-4">
          {benefits.map((benefit, index) => (
            <div
              key={benefit}
              className={`group flex min-h-24 items-center gap-3 border-white/10 px-4 py-4 transition-colors duration-300 hover:bg-white/[0.06] sm:px-5 lg:min-h-20 lg:px-6 ${
                index % 2 !== 0 ? '' : 'border-r'
              } ${index < 6 ? 'border-b sm:border-b-0' : ''} ${
                index % 4 !== 3 ? 'sm:border-r' : ''
              } ${index < 4 ? 'sm:border-b' : ''}`}
            >
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-sm text-gold shadow-[0_0_20px_rgba(201,164,92,0.08)] transition-all duration-300 group-hover:border-gold/60 group-hover:bg-gold group-hover:text-dark"
              >
                ✦
              </span>
              <span className="text-xs font-medium leading-snug text-white/75 transition-colors group-hover:text-white sm:text-sm">
                {benefit}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
