
import ContatoPage from "@/components/pages/ContatoPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Blog | Foxy Lady',
    description: 'Acompanhe nossas publicações e descubra novas experiências sensuais. Oferecemos uma experiência única, segura e realizada com discrição.',
    keywords: 'contato foxy lady, acompanhantes sorocaba, garota de programa sorocaba, acompanhantes campinas, garota de programa campinas, acompanhante de luxo, sexo em campinas, sexo em sorocaba, novinha, peituda, gozar sorocaba, gozar campinas, sexo anal, campinas, sorocaba, motel em campinas, motel sorocaba',
    openGraph: {
      title: 'Blog | Foxy Lady',
      description: 'Acompanhe nossas publicações e descubra novas experiências sensuais. Oferecemos uma experiência única, segura e realizada com discrição.',
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
        <ContatoPage />
    );
}

export default Page
