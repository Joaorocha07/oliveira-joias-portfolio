const questions = [
  { question: 'Como descubro o aro da minha aliança?', answer: 'Fale conosco pelo WhatsApp para receber as orientações de medição ou visite a loja para fazermos a medida com precisão.' },
  { question: 'Vocês entregam para outras cidades?', answer: 'Sim. As opções de envio variam conforme o material e o destino. Consulte sua cidade com nossa equipe pelo WhatsApp.' },
  { question: 'As alianças têm garantia?', answer: 'Sim. Nossas alianças contam com garantia de autenticidade do material. A cobertura específica é informada de acordo com a linha escolhida.' },
  { question: 'Posso gravar nomes ou datas?', answer: 'Sim. É possível personalizar as alianças com nomes, datas ou uma mensagem curta. Consulte as condições para o modelo escolhido.' },
  { question: 'Quanto tempo demora a fabricação?', answer: 'O prazo depende do modelo, do material e da personalização. Ao confirmar os detalhes, nossa equipe informa a previsão exata de entrega.' },
  { question: 'Aceitam cartão e parcelam?', answer: 'Sim. Trabalhamos com cartão e opções de parcelamento. As condições variam conforme a linha e o valor do pedido.' },
]

export default function FaqSection() {
  return (
    <section id="duvidas" className="scroll-mt-20 bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-gold">Perguntas frequentes</p>
          <h2 className="font-serif text-3xl font-bold text-dark sm:text-4xl lg:text-5xl">Ainda com dúvidas?</h2>
          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-text/65">Reunimos as respostas que mais ajudam na hora de escolher suas alianças.</p>
        </div>
        <div className="divide-y divide-dark/10 border-y border-dark/10">
          {questions.map((item) => (
            <details key={item.question} className="group py-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-semibold text-dark marker:content-none">
                {item.question}
                <span aria-hidden="true" className="shrink-0 text-2xl font-light text-gold transition-transform duration-200 group-open:rotate-45">+</span>
              </summary>
              <p className="max-w-2xl pb-6 pr-10 text-sm leading-relaxed text-text/65">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
