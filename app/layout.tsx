import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { URL_SITE } from '@/lib/dados'
import './globals.css'

// Switzer (Fontshare, licença gratuita para uso comercial), servida pelo próprio site.
const fonte = localFont({
  src: [
    { path: './fontes/switzer-400.woff2', weight: '400', style: 'normal' },
    { path: './fontes/switzer-500.woff2', weight: '500', style: 'normal' },
    { path: './fontes/switzer-600.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--fonte',
  display: 'swap',
})

const TITULO = 'Energy-E — Energia solar no interior do Maranhão'
const DESCRICAO =
  'A Energy-E é a empresa de energia renovável do Grupo Almeida Andrade: quatro usinas solares, as Canis, ' +
  'às margens da BR-222, entre Pindaré-Mirim e Santa Inês (MA), em operação desde 2025.'

export const metadata: Metadata = {
  metadataBase: new URL(URL_SITE),
  title: { default: TITULO, template: '%s · Energy-E' },
  description: DESCRICAO,
  applicationName: 'Energy-E',
  alternates: { canonical: '/' },
  openGraph: { type: 'website', locale: 'pt_BR', siteName: 'Energy-E', title: TITULO, description: DESCRICAO },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = { themeColor: '#10132A' }

const LIGA_JS = "document.documentElement.classList.add('js')"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={fonte.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: LIGA_JS }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
