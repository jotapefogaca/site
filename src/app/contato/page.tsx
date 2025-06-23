
import ContatoPage from "@/components/pages/ContatoPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Contato | Foxy Lady',
    description: 'Na Foxy Lady, garantimos discrição e segurança. Para dúvidas ou sugestões, contate nossa equipe e tenha um atendimento especial.',
    keywords: 'contato foxy lady, acompanhantes sorocaba, garota de programa sorocaba, acompanhantes campinas, garota de programa campinas, acompanhante de luxo, sexo em campinas, sexo em sorocaba, novinha, peituda, gozar sorocaba, gozar campinas, sexo anal, campinas, sorocaba, motel em campinas, motel sorocaba',
    openGraph: {
      title: 'Contato | Foxy Lady',
      description: 'Na Foxy Lady, garantimos discrição e segurança. Para dúvidas ou sugestões, contate nossa equipe e tenha um atendimento especial.',
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
