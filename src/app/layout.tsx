import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'FoxyLady - Acompanhantes Sorocaba e Campinas | Garotas de Programa VIP',
    template: '%s | FoxyLady'
  },
  description: 'Encontre as melhores acompanhantes de Sorocaba, Campinas e região. Garotas de programa verificadas, fotos reais, total discrição. Plataforma premium no interior de SP.',
  keywords: ['acompanhantes sorocaba', 'garotas de programa campinas', 'escorts interior sp', 'acompanhantes campinas', 'garotas sorocaba', 'acompanhantes verificadas'],
  authors: [{ name: 'FoxyLady' }],
  creator: 'FoxyLady',
  publisher: 'FoxyLady',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.foxylady.com.br'
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://www.foxylady.com.br',
    siteName: 'FoxyLady',
    title: 'FoxyLady - Acompanhantes Premium no Interior de SP',
    description: 'Plataforma premium de acompanhantes em Sorocaba, Campinas e região. Perfis verificados, fotos reais, total discrição.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FoxyLady - Acompanhantes Premium',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FoxyLady - Acompanhantes Premium',
    description: 'Acompanhantes verificadas em Sorocaba, Campinas e região',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'SEU_CODIGO_GOOGLE_SEARCH_CONSOLE',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="canonical" href="https://www.foxylady.com.br" />
        <meta name="theme-color" content="#ff1493" />
        <meta name="msapplication-TileColor" content="#ff1493" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "FoxyLady",
              "url": "https://www.foxylady.com.br",
              "logo": "https://www.foxylady.com.br/logo.png",
              "description": "Plataforma premium de acompanhantes no interior de São Paulo",
              "areaServed": [
                {
                  "@type": "City",
                  "name": "Sorocaba",
                  "addressRegion": "SP",
                  "addressCountry": "BR"
                },
                {
                  "@type": "City", 
                  "name": "Campinas",
                  "addressRegion": "SP",
                  "addressCountry": "BR"
                }
              ],
              "serviceType": "Adult Entertainment Platform",
              "address": {
                "@type": "PostalAddress",
                "addressRegion": "SP",
                "addressCountry": "BR"
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
