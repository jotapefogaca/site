import { MetadataRoute } from 'next'

// Função para buscar perfis do banco de dados
async function getProfiles() {
  // Substitua pela sua lógica de busca de perfis
  // const profiles = await db.profiles.findMany()
  // return profiles
  
  // Exemplo estático - remova quando implementar o banco
  return [
    { id: 1, slug: 'ana-sorocaba', city: 'sorocaba', updatedAt: new Date() },
    { id: 2, slug: 'maria-campinas', city: 'campinas', updatedAt: new Date() },
  ]
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const profiles = await getProfiles()
  
  const staticRoutes = [
    {
      url: 'https://www.foxylady.com.br',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: 'https://www.foxylady.com.br/acompanhantes/sorocaba',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: 'https://www.foxylady.com.br/acompanhantes/campinas',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: 'https://www.foxylady.com.br/sobre',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: 'https://www.foxylady.com.br/contato',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]

  const profileRoutes = profiles.map((profile) => ({
    url: `https://www.foxylady.com.br/acompanhantes/${profile.city}/${profile.slug}`,
    lastModified: profile.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticRoutes, ...profileRoutes]
}
