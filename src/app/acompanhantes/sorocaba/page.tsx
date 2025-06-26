import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Acompanhantes Sorocaba - Garotas de Programa VIP | FoxyLady',
  description: 'As melhores acompanhantes de Sorocaba. Garotas de programa verificadas, fotos reais, perfis premium. Encontre sua acompanhante ideal em Sorocaba - SP.',
  keywords: ['acompanhantes sorocaba', 'garotas de programa sorocaba', 'escorts sorocaba', 'acompanhantes sorocaba sp', 'garotas sorocaba'],
  alternates: {
    canonical: 'https://www.foxylady.com.br/acompanhantes/sorocaba'
  },
  openGraph: {
    title: 'Acompanhantes Sorocaba - Garotas de Programa VIP',
    description: 'Encontre as melhores acompanhantes de Sorocaba. Perfis verificados, fotos reais, total discrição.',
    url: 'https://www.foxylady.com.br/acompanhantes/sorocaba',
  },
}

// Breadcrumb component
function Breadcrumb() {
  return (
    <nav aria-label="breadcrumb" className="mb-6">
      <ol className="flex items-center space-x-2 text-sm text-gray-600">
        <li><Link href="/" className="hover:text-pink-600">Início</Link></li>
        <li className="before:content-['>'] before:mx-2">
          <Link href="/acompanhantes" className="hover:text-pink-600">Acompanhantes</Link>
        </li>
        <li className="before:content-['>'] before:mx-2 text-pink-600">Sorocaba</li>
      </ol>
    </nav>
  )
}

export default function SorocabaPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb />
      
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Acompanhantes em Sorocaba - Garotas de Programa VIP
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Descubra as mais belas e elegantes acompanhantes de Sorocaba. Nossa plataforma oferece 
          perfis verificados, fotos reais e total discrição para sua experiência premium na cidade.
        </p>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Por que escolher nossas acompanhantes em Sorocaba?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-pink-600 mb-3">Perfis Verificados</h3>
            <p className="text-gray-600">
              Todos os perfis são cuidadosamente verificados pela nossa equipe para garantir 
              autenticidade e qualidade.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-pink-600 mb-3">Fotos Reais</h3>
            <p className="text-gray-600">
              Garantimos que todas as fotos são reais e atuais, sem surpresas desagradáveis 
              no encontro.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-pink-600 mb-3">Total Discrição</h3>
            <p className="text-gray-600">
              Sua privacidade é nossa prioridade. Atendimento discreto e confidencial 
              em todos os momentos.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Acompanhantes Disponíveis em Sorocaba
        </h2>
        
        {/* Grid de perfis - substitua pela sua lógica de busca */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Exemplo de card - replique com dados reais */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-64">
              <Image
                src="/placeholder-profile.jpg" // Substitua pela imagem real
                alt="Ana - Acompanhante de luxo em Sorocaba"
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Ana</h3>
              <p className="text-gray-600 mb-3">25 anos • Sorocaba</p>
              <Link 
                href="/acompanhantes/sorocaba/ana"
                className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition-colors"
              >
                Ver Perfil
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Schema.org para página da cidade */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Acompanhantes em Sorocaba",
            "description": "Encontre as melhores acompanhantes de Sorocaba. Perfis verificados, fotos reais.",
            "url": "https://www.foxylady.com.br/acompanhantes/sorocaba",
            "isPartOf": {
              "@type": "WebSite",
              "name": "FoxyLady",
              "url": "https://www.foxylady.com.br"
            },
            "about": {
              "@type": "Place",
              "name": "Sorocaba",
              "addressRegion": "SP",
              "addressCountry": "BR"
            }
          })
        }}
      />
    </div>
  )
}
