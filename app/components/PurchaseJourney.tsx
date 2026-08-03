const steps = [
  { title: 'Escolha seu modelo', text: 'Explore nossas alianças e encontre o modelo que combina com a sua história.' },
  { title: 'Tire suas dúvidas', text: 'Converse diretamente com um especialista pelo WhatsApp, sem compromisso.' },
  { title: 'Personalize', text: 'Defina largura, acabamento e gravação para deixar cada detalhe do seu jeito.' },
  { title: 'Receba ou retire', text: 'Acompanhe a produção e escolha entre receber a joia ou retirá-la em nossa loja.' },
]

export default function PurchaseJourney() {
  return (
    <section id="como-funciona" className="scroll-mt-20 border-y border-gold/10 bg-cream py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-gold">Como funciona</p>
          <h2 className="font-serif text-3xl font-bold text-dark sm:text-4xl lg:text-5xl">Do primeiro contato à entrega</h2>
          <p className="mt-5 leading-relaxed text-text/65">Um atendimento simples e próximo para você escolher com segurança e personalizar cada detalhe.</p>
        </div>
        <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className="relative border-t border-gold/30 pt-6">
              <span className="font-serif text-3xl font-bold text-gold/55">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="mt-4 font-serif text-xl font-bold text-dark">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text/65">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
