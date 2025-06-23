import AboutPage from "@/components/pages/AboutPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Quem somos | Foxy Lady',
    description: 'Na Foxy Lady, a sua satisfação é nossa prioridade. Se você tiver dúvidas, sugestões ou quiser saber mais sobre nossos serviços, nossa equipe está pronta para atender. Preencha o formulário abaixo ou entre em contato pelos nossos canais de comunicação. Garantimos discrição, respeito e total segurança em todos os atendimentos. Não hesite em nos contatar para tornar sua experiência ainda mais especial!',
    keywords: 'contato foxy lady, acompanhantes sorocaba, garota de programa sorocaba, acompanhantes campinas, garota de programa campinas, acompanhante de luxo, sexo em campinas, sexo em sorocaba, novinha, peituda, gozar sorocaba, gozar campinas, sexo anal, campinas, sorocaba, motel em campinas, motel sorocaba',
    openGraph: {
      title: 'Quem somos | Foxy Lady',
      description: 'Na Foxy Lady, a sua satisfação é nossa prioridade. Se você tiver dúvidas, sugestões ou quiser saber mais sobre nossos serviços, nossa equipe está pronta para atender. Preencha o formulário abaixo ou entre em contato pelos nossos canais de comunicação. Garantimos discrição, respeito e total segurança em todos os atendimentos. Não hesite em nos contatar para tornar sua experiência ainda mais especial!',
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

export default function Home() {
   
    return (
        <AboutPage />
    );
}
