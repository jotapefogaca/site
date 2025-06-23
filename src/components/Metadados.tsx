import { api } from '@/services/api'
import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const id = params.slug

    const get = await api.acompanhante.getByNickname(id);

    if (get.error) {
        // Handle error
        return {
            title: 'Foxy Lady'
        }
    }

    return {
        title: get.model!.nome_social,
        openGraph: {
            images: [get.model!.midia.perfil],
        },
    }
}

export default function Page({ params, searchParams }: Props) { }