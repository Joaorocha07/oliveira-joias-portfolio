const whatsappUrl = 'https://wa.me/5534998717389?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20conhecer%20as%20alian%C3%A7as%20da%20Oliveira%20Joias.'

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-gold px-4 py-20 text-center text-dark sm:px-6 lg:py-24">
      <div aria-hidden="true" className="absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full border border-dark/10" />
      <div aria-hidden="true" className="absolute -right-16 top-1/2 h-52 w-52 -translate-y-1/2 rounded-full border-[24px] border-dark/5" />
      <div className="relative mx-auto max-w-3xl">
        <p className="mb-3 text-sm font-bold uppercase tracking-widest text-dark/60">Atendimento personalizado</p>
        <h2 className="font-serif text-3xl font-bold sm:text-4xl lg:text-5xl">Pronto para escolher sua aliança?</h2>
        <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-dark/70">Converse com um especialista e descubra o modelo ideal para eternizar a sua história.</p>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-dark px-8 py-4 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-black">
          Falar no WhatsApp
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </a>
      </div>
    </section>
  )
}
