import Exibition from '@/components/Exibition'
import { api } from '@/services/api'
import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {

    const id = (await params).slug

    const get = await api.acompanhante.getByNickname(id);

    if (get.error || !get.model) {
        // Handle error
        return {
            title: 'Foxy Lady',
            description: 'Acompanhante não encontrada',
            openGraph: {
                title: 'Foxy Lady',
                description: 'Acompanhante não encontrada',
                images: ['/default-image.jpg'], // Imagem padrão
                url: `https://www.foxylady.com.br/acompanhante/${id}`,
                type: 'website',  // Adiciona o tipo padrão para sites
                siteName: 'Foxy Lady',
            }
        }
    }

    return {
        title: `${get.model!.nome_social} | Foxy Lady | Acompanhante em ${get.model!.cidade}`,
        description: `Conheça a acompanhante de luxo ${get.model!.nome_social} no Foxy Lady.`,
        openGraph: {
            title: `Foxy Lady | ${get.model!.nome_social}`,
            description: `Conheça a acompanhante de luxo ${get.model!.nome_social} | Foxy Lady `,
            images: [get.model!.midia.perfil],
            url: `https://www.foxylady.com.br/acompanhante/${get.model!.nickname}`,
            type: 'profile',  // Tipo específico se for um perfil
            siteName: 'Foxy Lady'
        }
    }
}

export default async function Page({ params, searchParams }: Props) {
    const data = await fetch(`https://www.foxylady.com.br/api/v1/getModel?nickname=${(await params).slug}`)
    const result = await data.json()

    return (
        <Exibition model={result.model} />
    )
}
