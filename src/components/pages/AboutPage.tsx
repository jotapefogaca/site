'use client'
import Contato from "@/components/Contato";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Main from "@/components/Main";
import history from '../../../public/media/images/image_history.png'
import ensaio from '../../../public/media/icons/ensaio.svg'
import perfis from '../../../public/media/icons/perfis.svg'
import gallery from '../../../public/media/icons/gallery.svg'
import check from '../../../public/media/icons/check.svg'
import Image from "next/image";
import Planos from "@/components/Planos";
import Duvidas from "@/components/Duvidas";
import { useEffect, useState } from "react";
import Head from 'next/head';

export default function AboutPage() {
    const [warning, setWarning] = useState(false)
    const [city, setCity] = useState('')

    /* useEffect(() => {
        const cookies = Cookies.get('acceptTermsAndConditions');
        if (!cookies) {
            setWarning(true)
        } else {
            setCity(Cookies.get('userLocation'))
        }
    }, []) */

    useEffect(() => {
        document.title = 'Sobre nós - Foxy Lady';
      }, []);

    return (
        <Main className="bg-primary">
            <Header />
            <div className="block min-w-full max-h-[50vh] min-h-[50vh] md:min-h-[70%] bg-bottom bg-cover" style={{ backgroundImage: 'url("/media/images/banner_about.jpg")' }}>
                <span className="block w-full h-full bg-gradient-to-t to-40% from-primary" />
            </div>
            <section className='px-5 md:px-[200px] py-5 flex flex-col'>
                <div className="">
                    <Image className="hidden md:block w-1/3 h-fit float-left mr-10 mb-5" src={history} alt="" />
                    <h1 className="text-center md:text-start text-3xl text-secondary mb-5 font-bold">Somos a melhor plataforma de acompanhantes do interior de São Paulo</h1>
                    <p className="text-white font-extralight">
                        Bem-vindo a Foxy Lady, a principal plataforma de acompanhantes do interior de São Paulo, onde a excelência se encontra com a sensualidade. Estamos comprometidos em oferecer a você uma experiência única e segura, onde seus desejos se tornam realidade. <br /><br />
                        Nossa equipe trabalha diligentemente para garantir que todos os perfis de acompanhantes sejam autênticos e verificados, proporcionando a você tranquilidade e confiança em cada interação. Você pode relaxar e aproveitar a jornada, sabendo que estamos fornecendo segurança para a sua experiência. <br /><br />
                        Reunimos uma seleção excepcional de modelos incrivelmente talentosas e sedutoras, prontas para tornar a sua experiência memorável. Nossas acompanhantes são escolhidas a dedo por sua beleza, charme e habilidades, garantindo que você tenha encontros emocionantes e envolventes. <br /><br />
                        Acreditamos na transparência. Todas as informações apresentadas em nossos perfis são precisas e atualizadas. Você pode confiar nas fotos e descrições para tomar decisões informadas e encontrar a companhia perfeita para satisfazer seus desejos. <br /><br />
                        Na Foxy Lady, a qualidade dos serviços é inigualável. Nossas modelos são dedicadas a proporcionar momentos especiais e experiências que o levarão ao êxtase. Desfrute de encontros sensuais e inesquecíveis que irão superar todas as suas expectativas. <br /><br />
                        A Foxy Lady é mais do que uma plataforma de acompanhantes; somos o seu portal para prazer e satisfação. Explore o melhor que o interior de São Paulo tem a oferecer em nossa companhia. Venha fazer parte da nossa comunidade exclusiva e descubra um mundo de sensualidade, respeito mútuo e satisfação. <br /><br />
                        Descubra a Foxy Lady hoje e comece a sua jornada para o prazer.
                    </p>
                </div>
            </section>
            <section className="hidden mt-20 md:flex w-full bg-gradient-to-t from-white from-50% to-primary to-50% bg-white min-h-60">
                <div className="px-5 md:px-[200px] w-full grid grid-cols-4 gap-7">
                    <span className="flex flex-col items-center justify-center border border-white bg-primary rounded-lg gap-5">
                        <Image className="w-14 h-fit" src={ensaio} alt="Ensaios Exclusivos" />
                        <strong className="font-semibold text-lg text-secondary text-center">Ensaios<br />Exclusivos</strong>
                    </span>
                    <span className="flex flex-col items-center justify-center border border-white bg-primary rounded-lg gap-5">
                        <Image className="w-14 h-fit" src={perfis} alt="Perfis" />
                        <strong className="font-semibold text-lg text-secondary text-center">Perfis<br />Certificados</strong>
                    </span>
                    <span className="flex flex-col items-center justify-center border border-white bg-primary rounded-lg gap-5">
                        <Image className="w-14 h-fit" src={gallery} alt="" />
                        <strong className="font-semibold text-lg text-secondary text-center">Diversos<br />formatos de<br />anúncio</strong>
                    </span>
                    <span className="flex flex-col items-center justify-center border border-white bg-primary rounded-lg gap-5">
                        <Image className="w-14 h-fit" src={check} alt="" />
                        <strong className="font-semibold text-lg text-secondary text-center">Plataforma<br />Optimizada</strong>
                    </span>
                </div>
            </section>
            <Duvidas />
            <Planos />
            <Contato label="Contato" />
            <Footer />
        </Main>
    );
}
