const benefits = [
  { icon: '✦', title: 'Fabricação própria', sub: 'Controle total de qualidade' },
  { icon: '◇', title: 'Garantia vitalícia', sub: 'Autenticidade da joia' },
  { icon: '✎', title: 'Personalização', sub: 'Largura, pedras e gravação' },
  { icon: '⌁', title: 'Atendimento rápido', sub: 'Direto pelo WhatsApp' },
  { icon: '▱', title: 'Envio seguro', sub: 'Para todo o Brasil' },
]

export default function BenefitsStrip() {
  return (
    <section className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-x divide-y lg:divide-y-0 divide-gray-100">
          {benefits.map((b) => (
            <div key={b.title} className="flex items-center gap-3 px-5 py-5">
              <span className="text-gold text-xl shrink-0">{b.icon}</span>
              <div>
                <p className="text-dark font-semibold text-sm leading-snug">{b.title}</p>
                <p className="text-text/50 text-xs mt-0.5">{b.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
