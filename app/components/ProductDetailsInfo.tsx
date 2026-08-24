import type { CatalogoConfig } from '@/app/lib/api'

function renderParagraphs(text: string) {
  return text
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p, i) => (
      <p key={i} className="text-sm text-text/70 leading-relaxed mt-2 first:mt-0">
        {p}
      </p>
    ))
}

type Props = {
  width: string
  config: CatalogoConfig
}

export default function ProductDetailsInfo({ width, config }: Props) {
  return (
    <div className="border-t border-gray-100 pt-8 mt-8 space-y-8">
      {config.info_produto && (
        <div>
          <h2 className="font-serif text-dark font-bold text-lg mb-3">Produto</h2>
          {renderParagraphs(config.info_produto)}
        </div>
      )}

      {config.voce_sabia && (
        <div className="bg-gold/5 rounded-2xl p-6">
          <h2 className="font-serif text-dark font-bold text-lg mb-2">Você sabia?</h2>
          {renderParagraphs(config.voce_sabia)}
        </div>
      )}

      {config.faq.length > 0 && (
        <div className="space-y-6">
          {config.faq.map((item, i) => (
            <div key={i}>
              <h3 className="font-serif text-dark font-bold text-base mb-2">{item.pergunta}</h3>
              {renderParagraphs(item.resposta)}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
