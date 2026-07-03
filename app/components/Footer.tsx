import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <div className="mb-4">
              <span className="font-serif text-2xl font-bold text-gold">Oliveira Joias</span>
              <p className="text-white/50 text-xs tracking-widest uppercase mt-1">
                Elegância em cada peça
              </p>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Referência em joalheria em Uberlândia-MG. Qualidade, tradição e atendimento personalizado há anos no mercado.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-gold text-lg mb-5">Navegação</h3>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Início' },
                { href: '/aliancas', label: 'Alianças' },
                { href: '/#categorias', label: 'Categorias' },
                { href: '/#sobre', label: 'Sobre Nós' },
                { href: '/#localizacao', label: 'Localização' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-gold transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-gold text-lg mb-5">Categorias</h3>
            <ul className="space-y-3">
              {[
                { href: '/aliancas', label: 'Alianças' },
                { href: '/#categorias', label: 'Anéis' },
                { href: '/#categorias', label: 'Correntes & Pingentes' },
                { href: '/#categorias', label: 'Serviços' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-gold transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-gold text-lg mb-5">Contato</h3>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex gap-3">
                <MapPinIcon />
                <span>
                  Av. Seme Simão, 1281 — Loja 01<br />
                  Granada, Uberlândia-MG<br />
                  CEP: 38410-094
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <PhoneIcon />
                <a
                  href="https://wa.me/5534998717389"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  (34) 99871-7389
                </a>
              </li>
              <li className="mt-4">
                <p className="text-white/40 text-xs uppercase tracking-wide mb-2">Horário</p>
                <p>Seg–Sex: 09:00–19:00</p>
                <p>Sábado: 09:00–14:00</p>
                <p>Domingo: Fechado</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Oliveira Joias — Elegância em cada detalhe.
          </p>
          <p className="text-white/20 text-xs">
            Uberlândia — MG — Brasil
          </p>
        </div>
      </div>
    </footer>
  )
}

function MapPinIcon() {
  return (
    <svg className="w-4 h-4 text-gold shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg className="w-4 h-4 text-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  )
}
