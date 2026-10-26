// Faixa vermelha "Sem estoque" atravessando a foto do produto. O pai precisa
// ser `relative` (os containers de imagem dos cards e da galeria já são).
export default function OutOfStockRibbon({ size = 'sm' }: { size?: 'sm' | 'lg' }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-white/25">
      <span
        className={[
          'w-full bg-red-600/90 text-center font-bold uppercase text-white shadow-lg',
          size === 'lg'
            ? 'py-3 text-base sm:text-lg tracking-[0.3em]'
            : 'py-1.5 sm:py-2 text-[10px] sm:text-xs tracking-[0.25em]',
        ].join(' ')}
      >
        Sem estoque
      </span>
    </div>
  )
}
