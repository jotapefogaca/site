'use client'
import MinScreen from "@/components/MinScreen"
import Main from "@/components/Main"
import Header from "@/components/Header"
import HomeDestaques from "@/components/HomeDestaques"
import Contato from "@/components/Contato"
import Footer from "@/components/Footer"
import HomeBanner from "@/components/HomeBanner"
import Filters from "@/components/Filters"

const AcompanhatesPage = () => {
    return (
        <Main>
            <Header />
            <section className='px-5 md:px-[180px] mb-6'>
                <h1 className="text-2xl font-bold text-secondary mb-4">Plataforma de Acompanhantes de Luxo</h1>
                <h2 className="text-xl font-bold text-secondary mb-4">Bem vindo à Foxy Lady, a melhor plataforma de acompanhantes de Campinas e Sorocaba!</h2>
                <p className="text-lg text-white">
                    A Foxy Lady oferece uma plataforma exclusiva para acompanhantes em Campinas e Sorocaba.
                    Nosso objetivo é proporcionar uma experiência única, segura e discreta para todos os nossos usuários.
                    Aqui você encontrará profissionais qualificadas que atendem com máxima descrição e respeito.
                </p>
            </section>
            <section className="px-5 md:px-[180px] mb-6">
                <h2 className="text-2xl font-bold text-white mb-4">Como Funciona a Foxy Lady?</h2>
                <p className="text-lg text-white">
                    Na Foxy Lady, você pode facilmente buscar por acompanhantes em sua região utilizando nosso sistema de filtros.
                    Filtre por gênero, etnia, orientação sexual e muito mais para encontrar a profissional ideal.
                    Após encontrar uma acompanhante, basta clicar em seu perfil para obter mais detalhes e agendar um encontro.
                </p>
            </section>

            <Filters />
            <section className="px-5 md:px-[180px] mb-6 mt-20">
                <h2 className="text-2xl font-bold text-white mb-4">Acompanhantes em Destaque</h2>
                <p className="text-lg text-white">
                    Conheça algumas das melhores acompanhantes disponíveis em Campinas e Sorocaba. Nossos destaques são profissionais
                    altamente qualificadas, prontas para oferecer uma experiência inesquecível. Explore os perfis e descubra mais!
                </p>
            </section>
           {/*  <section className="px-5 md:px-[180px] mb-6">
                <h2 className="text-2xl font-bold text-white mb-4">Depoimentos de Clientes</h2>
                <div className="text-lg text-white space-y-5">
                    <blockquote className="italic">Serviço excelente e discreto. A Foxy Lady tem as melhores acompanhantes de Campinas!</blockquote>
                    <blockquote className="italic">Muito fácil de usar e sempre encontrei profissionais de alta qualidade. Recomendo!</blockquote>
                    <blockquote className="italic">A experiência foi incrível, com atendimento rápido e sigiloso. Voltarei com certeza.</blockquote>
                </div>
            </section> */}

            <Contato label="Contato" />
            <section className="px-5 md:px-[180px] mb-6">
                <h2 className="text-2xl font-bold text-white mb-4">Segurança e Confidencialidade</h2>
                <p className="text-lg text-white">
                    Na Foxy Lady, sua privacidade é nossa prioridade. Todas as interações e dados pessoais são tratados com o mais alto
                    nível de segurança. Você pode utilizar nossa plataforma com total confiança, sabendo que suas informações estão protegidas.
                </p>
            </section>

            <Footer />
        </Main>
    )
}

export default AcompanhatesPage