import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import '../globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import PopupManager from '../components/PopupManager'
import { getSite, sites } from '../lib/site'

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

type Props = {
  children: React.ReactNode
  params: Promise<{ site: string }>
}

export function generateStaticParams() {
  return Object.keys(sites).map((site) => ({ site }))
}

export async function generateMetadata({ params }: Pick<Props, 'params'>): Promise<Metadata> {
  const site = getSite((await params).site)
  return {
    metadataBase: new URL(`https://${site.domain}`),
    title: {
      default: `${site.name} — Elegância e tradição em cada peça`,
      template: `%s | ${site.name}`,
    },
    description:
      'Joalheria em Uberlândia-MG. Alianças, anéis, correntes e serviços especializados. Qualidade e tradição há anos no mercado.',
    keywords: ['joias', 'alianças', 'joalheria', 'Uberlândia', 'prata', 'anéis', 'correntes'],
    authors: [{ name: site.name }],
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      siteName: site.name,
      title: `${site.name} — Elegância e tradição em cada peça`,
      description: 'Joalheria em Uberlândia-MG. Alianças, anéis, correntes e serviços especializados.',
    },
  }
}

export default async function RootLayout({ children, params }: Props) {
  const site = getSite((await params).site)
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-cream text-text antialiased" suppressHydrationWarning>
        <Navbar site={site} />
        <main className="flex-1 pt-[72px] sm:pt-[108px]">{children}</main>
        <Footer site={site} />
        <WhatsAppButton site={site} />
        <PopupManager site={site} />
        <Analytics />
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "yj8ga78jgq");
          `}
        </Script>
      </body>
    </html>
  )
}
