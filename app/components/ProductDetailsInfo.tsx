type Props = {
  width: string
}

export default function ProductDetailsInfo({ width }: Props) {
  return (
    <div className="border-t border-gray-100 pt-8 mt-8 space-y-8">
      <div>
        <h2 className="font-serif text-dark font-bold text-lg mb-3">Produto</h2>
        <p className="text-sm text-text/70 leading-relaxed">
          Sob encomenda. Prazo de fabricação de até 72h úteis.
        </p>
        <p className="text-sm text-text/70 leading-relaxed mt-2">
          <span className="font-semibold text-dark">Importante:</span> Valor referente ao par de
          alianças e caixinha de veludo.
        </p>
        <p className="text-sm text-text/70 leading-relaxed mt-2">
          <span className="font-semibold text-dark">Incluso:</span> Todos os pares acompanham
          caixinha de brinde.
        </p>
      </div>

      <div>
        <h2 className="font-serif text-dark font-bold text-lg mb-3">Dados técnicos</h2>
        <dl className="text-sm text-text/70 leading-relaxed space-y-1">
          <div>
            <dt className="inline font-semibold text-dark">Formato: </dt>
            <dd className="inline">Anatômica</dd>
          </div>
          <div>
            <dt className="inline font-semibold text-dark">Largura: </dt>
            <dd className="inline">{width}</dd>
          </div>
          <div>
            <dt className="inline font-semibold text-dark">Metal: </dt>
            <dd className="inline">Aliança em prata legítima 950.</dd>
          </div>
        </dl>
      </div>

      <div className="bg-gold/5 rounded-2xl p-6">
        <h2 className="font-serif text-dark font-bold text-lg mb-2">Você sabia?</h2>
        <p className="text-sm text-text/70 leading-relaxed">
          Nossas alianças são de fabricação própria, aqui você pode personalizar como desejar!
          Por exemplo: acrescentar/remover pedras, solicitar modelo liso, espessura maior e
          muito mais.
        </p>
        <p className="text-sm text-text/70 leading-relaxed mt-2">
          Faça já seu orçamento via WhatsApp que vamos lhe direcionar ♡
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="font-serif text-dark font-bold text-base mb-2">
            Qual o material da joia?
          </h3>
          <p className="text-sm text-text/70 leading-relaxed">
            Nossas peças são fabricadas em prata premium 950 com designers especializados em
            joias.
          </p>
        </div>

        <div>
          <h3 className="font-serif text-dark font-bold text-base mb-2">
            Quanto tempo de garantia?
          </h3>
          <p className="text-sm text-text/70 leading-relaxed">
            Todas as peças possuem garantia eterna sob a autenticidade da joia.
          </p>
          <p className="text-sm text-text/50 leading-relaxed mt-1">
            Obs: não damos garantia em pedras.
          </p>
        </div>

        <div>
          <h3 className="font-serif text-dark font-bold text-base mb-2">
            Como funciona caso precise efetuar uma troca/ajuste de aliança?
          </h3>
          <p className="text-sm text-text/70 leading-relaxed">
            Você tem até 7 dias para fazer uma troca ou ajuste na aliança.
          </p>
          <p className="text-sm text-text/70 leading-relaxed mt-2">
            Não efetuamos trocas para defeitos identificados previamente como mau uso, somente
            para peças com defeito de fábrica.
          </p>
          <p className="text-sm text-text/70 leading-relaxed mt-2">
            Para ajuste de alianças, se for preciso aumentar/diminuir até 2 números, será
            cobrada uma taxa de apenas R$ 25,00. Caso a aliança tenha pedra, não será possível
            fazer o ajuste, somente a troca.
          </p>
          <p className="text-sm text-text/70 leading-relaxed mt-2">
            Caso o ajuste seja acima de 2 numerações, será cobrado o valor de 1/3 sobre o valor
            integral das alianças.
          </p>
        </div>
      </div>
    </div>
  )
}
