import Link from 'next/link'

export default function Footer() {
  return (
    <footer id="contato" className="bg-[#0e0e0f] text-white pt-14 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.2fr] gap-10 pb-12 border-b border-white/10">
          <div>
            <div className="mb-4">
              <span className="font-serif text-2xl font-semibold text-white tracking-[0.15em]">OLIVEIRA</span>
              <span className="block text-[9px] text-gold tracking-[0.42em] uppercase -mt-0.5">JOIAS</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Alianças e joias para transformar momentos importantes em histórias para a vida toda.
            </p>
            <div className="flex gap-2.5 mt-5">
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 border border-white/20 hover:border-gold rounded-full grid place-items-center text-white/60 hover:text-gold transition-colors duration-200 text-sm"
              >
                ◎
              </a>
              <a
                href="https://facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 border border-white/20 hover:border-gold rounded-full grid place-items-center text-white/60 hover:text-gold transition-colors duration-200 text-sm font-bold"
              >
                f
              </a>
              <a
                href="https://wa.me/5534998717389"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 border border-white/20 hover:border-gold rounded-full grid place-items-center text-white/60 hover:text-gold transition-colors duration-200 text-sm"
              >
                ◔
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[11px] text-[#f0ce86] tracking-[0.15em] uppercase font-medium mb-4">Menu</h4>
            <ul className="space-y-2.5">
              {[
                { href: '/', label: 'Início' },
                { href: '/#materiais', label: 'Materiais' },
                { href: '/aliancas', label: 'Catálogo' },
                { href: '/#sobre', label: 'Sobre nós' },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-white/55 hover:text-gold transition-colors text-sm">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] text-[#f0ce86] tracking-[0.15em] uppercase font-medium mb-4">Materiais</h4>
            <ul className="space-y-2.5">
              {[
                { href: '/aliancas', label: 'Alianças de Prata' },
                { href: '/aliancas', label: 'Moeda Antiga' },
                { href: '/aliancas', label: 'Alianças de Ouro' },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-white/55 hover:text-gold transition-colors text-sm">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] text-[#f0ce86] tracking-[0.15em] uppercase font-medium mb-4">Informações</h4>
            <ul className="space-y-2.5">
              {['Garantia', 'Cuidados com sua joia', 'Trocas e ajustes'].map((l) => (
                <li key={l}>
                  <span className="text-white/55 text-sm cursor-default">{l}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] text-[#f0ce86] tracking-[0.15em] uppercase font-medium mb-4">Atendimento</h4>
            <p className="text-white/55 text-sm leading-relaxed mb-1">Av. Seme Simão, 1281 — Bairro Granada</p>
            <p className="text-white/55 text-sm mb-1">WhatsApp: (34) 99871-7389</p>
            <p className="text-white/55 text-sm mb-4">Uberlândia · MG</p>
            <a
              href="https://wa.me/5534998717389?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Oliveira%20Joias%20e%20gostaria%20de%20atendimento."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-whatsapp hover:bg-whatsapp-dark text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors duration-200 mb-2"
            >
              Chamar no WhatsApp
            </a>
            <br />
            <a
              href="https://www.google.com/maps/search/?api=1&query=Avenida+Seme+Sim%C3%A3o+1281+Bairro+Granada+Uberl%C3%A2ndia+MG"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-white/20 hover:border-gold text-white/60 hover:text-gold text-xs font-bold px-4 py-2.5 rounded-lg transition-all duration-200"
            >
              Como chegar
            </a>
          </div>
        </div>

        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">© {new Date().getFullYear()} Oliveira Joias. Todos os direitos reservados.</p>
          <p className="text-white/20 text-xs">Desenvolvido para transformar visitas em conversas.</p>
        </div>
      </div>
    </footer>
  )
}
