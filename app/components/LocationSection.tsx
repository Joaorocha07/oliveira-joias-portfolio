const schedule = [
  { day: 'Segunda-feira', hours: '09:00 – 19:00' },
  { day: 'Terça-feira', hours: '09:00 – 19:00' },
  { day: 'Quarta-feira', hours: '09:00 – 19:00' },
  { day: 'Quinta-feira', hours: '09:00 – 19:00' },
  { day: 'Sexta-feira', hours: '09:00 – 19:00' },
  { day: 'Sábado', hours: '09:00 – 14:00' },
  { day: 'Domingo', hours: 'Fechado' },
]

function getTodayStatus() {
  const now = new Date()
  const day = now.getDay()
  const hour = now.getHours() + now.getMinutes() / 60

  if (day === 0) return { open: false, label: 'Fechado hoje' }
  if (day === 6) return { open: hour >= 9 && hour < 14, label: hour >= 9 && hour < 14 ? 'Aberto agora' : 'Fechado agora' }
  return { open: hour >= 9 && hour < 19, label: hour >= 9 && hour < 19 ? 'Aberto agora' : 'Fechado agora' }
}

export default function LocationSection() {
  const status = getTodayStatus()

  return (
    <section id="localizacao" className="py-20 lg:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-gold text-sm tracking-widest uppercase font-medium mb-3">
            Onde estamos
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-dark">
            Visite nossa loja
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.1!2d-48.2!3d-18.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDU0JzAwLjAiUyA0OMKwMTInMDAuMCJX!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr&q=Av.+Seme+Sim%C3%A3o%2C+1281+-+Granada%2C+Uberl%C3%A2ndia+-+MG"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '350px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização da Oliveira Joias no Google Maps"
            />
          </div>

          <div className="flex flex-col gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center text-gold">
                  <MapPinIcon />
                </div>
                <div>
                  <h3 className="font-serif text-dark font-bold text-lg">Endereço</h3>
                </div>
              </div>
              <p className="text-text/70 text-sm leading-relaxed">
                Av. Seme Simão, 1281 — Loja 01<br />
                Granada — Uberlândia-MG<br />
                CEP: 38410-094
              </p>
              <a
                href="https://maps.google.com/?q=Av.+Seme+Simão+1281+Granada+Uberlândia+MG"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-gold text-sm font-medium mt-3 hover:underline"
              >
                Ver no Google Maps
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center text-gold">
                    <ClockIcon />
                  </div>
                  <h3 className="font-serif text-dark font-bold text-lg">Horário de Funcionamento</h3>
                </div>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    status.open
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-600'
                  }`}
                >
                  {status.label}
                </span>
              </div>
              <table className="w-full text-sm">
                <tbody>
                  {schedule.map((s) => {
                    const isClosed = s.hours === 'Fechado'
                    return (
                      <tr key={s.day} className="border-b border-gray-50 last:border-0">
                        <td className="py-2 text-text/70">{s.day}</td>
                        <td className={`py-2 text-right font-medium ${isClosed ? 'text-red-400' : 'text-dark'}`}>
                          {s.hours}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <a
              href="https://wa.me/5534997717779?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20os%20produtos%20da%20Oliveira%20Joias."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-whatsapp hover:bg-whatsapp-dark text-white font-semibold py-4 px-6 rounded-2xl transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Falar com um Especialista
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function MapPinIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}
