import AcompanhatesPage from "@/components/pages/AcompanhantesPage"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Busca de Acompanhantes | Foxy Lady',
    description: 'Explore nosso catálogo exclusivo de acompanhantes no interior de SP, selecionadas para momentos inesquecíveis. Use nossos filtros e encontre a companhia ideal.',
    keywords: 'acompanhantes sorocaba, garota de programa sorocaba, acompanhantes campinas, garota de programa campinas, acompanhante de luxo, sexo em campinas, sexo em sorocaba, novinha, peituda, gozar sorocaba, gozar campinas, sexo anal, campinas, sorocaba, motel em campinas, motel sorocaba',
    openGraph: {
        title: 'Acompanhantes | Foxy Lady',
        description: 'Explore nosso catálogo exclusivo de acompanhantes no interior de SP, selecionadas para momentos inesquecíveis. Use nossos filtros e encontre a companhia ideal.',
        url: 'https://foxylady.com.br',
        siteName: 'Foxy Lady',
        locale: 'pt-br',
        type: 'website',
    },
    other: {
        ['geo.placename']: 'Sorocaba',
        ['get.region']: 'BR-SP',
        ['geo.position']: '-23.500345;-47.458286',
        'ICBM': '-23.500345, -47.458286'
    },
}

const Page = () => {
    return (
        <AcompanhatesPage />
    )
}

export default Page