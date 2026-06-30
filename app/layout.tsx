import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

const playfair = Playfair_Display({
  variable: '--font-serif',
  subsets: ['latin'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Oliveira Joias — Elegância e tradição em cada peça',
    template: '%s | Oliveira Joias',
  },
  description:
    'Joalheria em Uberlândia-MG. Alianças, anéis, correntes e serviços especializados. Qualidade e tradição há anos no mercado.',
  keywords: ['joias', 'alianças', 'joalheria', 'Uberlândia', 'ouro', 'anéis', 'correntes'],
  authors: [{ name: 'Oliveira Joias' }],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Oliveira Joias',
    title: 'Oliveira Joias — Elegância e tradição em cada peça',
    description: 'Joalheria em Uberlândia-MG. Alianças, anéis, correntes e serviços especializados.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-cream text-text antialiased" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
