'use client'
import Contato from "@/components/Contato";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HomeBanner from "@/components/HomeBanner";
import HomeDestaques from "@/components/HomeDestaques";
import Main from "@/components/Main";
import banner from '../../../public/media/images/banner_contato.jpg'
import Image from "next/image";
import { useEffect, useState } from "react";
import Head from 'next/head';

const ContatoPage = () => {

    return (
        <Main>
            <Header />
            <div className="block min-w-full max-h-[50vh] min-h-[50vh] md:min-h-[70%] bg-top bg-cover" style={{ backgroundImage: 'url("/media/images/banner_contato.jpg")' }}>
                <span className="block w-full h-full bg-gradient-to-t to-40% from-primary" />
            </div>

            {/* Seção adicional para SEO e mais conteúdo */}
            <section className="p-4 max-w-screen-lg mx-auto text-justify">
                <h1 className="text-2xl font-bold mb-4">Entre em Contato com a Foxy Lady</h1>
                <h2>A maior plataforma de acompanhantes de luxo do interior de São Paulo</h2>
                <p className="mb-4">
                    Na Foxy Lady, nos dedicamos a oferecer o melhor serviço de acompanhantes na região de Campinas e Sorocaba. 
                    Se você tem dúvidas, sugestões ou gostaria de saber mais sobre nossos serviços, entre em contato conosco por meio do formulário abaixo. 
                    Estamos à disposição para responder suas perguntas e oferecer suporte rápido e eficiente.
                </p>
                <p className="mb-4">
                    Nosso time de atendimento é especializado para garantir uma experiência segura, confortável e discreta. 
                    Agradecemos a confiança em nossos serviços e estamos ansiosos para ajudá-lo com qualquer informação adicional.
                </p>
                <p className="mb-4">
                    Caso esteja visitando nosso site pela primeira vez, sugerimos verificar nossas <strong>perguntas frequentes (FAQ)</strong> 
                    abaixo, onde respondemos algumas das questões mais comuns. Nossa equipe está sempre disponível para esclarecer mais dúvidas!
                </p>
            </section>

            {/* Adição de FAQ */}
            <section className="p-4 max-w-screen-lg mx-auto">
                <h2 className="text-xl font-semibold mb-4">Perguntas Frequentes (FAQ)</h2>
                <div className="mb-4">
                    <h3 className="font-semibold">1. Como posso entrar em contato com a Foxy Lady?</h3>
                    <p>
                        Você pode utilizar o formulário de contato abaixo ou nos enviar um e-mail diretamente para nosso time de atendimento. 
                        Responderemos o mais rápido possível.
                    </p>
                </div>
                <div className="mb-4">
                    <h3 className="font-semibold">2. Quais regiões a Foxy Lady atende?</h3>
                    <p>
                        Atendemos as regiões de Campinas e Sorocaba, oferecendo serviços personalizados de acompanhantes com total discrição e qualidade.
                    </p>
                </div>
                <div className="mb-4">
                    <h3 className="font-semibold">3. Posso agendar um encontro pelo site?</h3>
                    <p>
                        Sim, oferecemos a opção de agendamento diretamente pelo nosso site. Basta entrar em contato e fornecer os detalhes necessários, 
                        que nossa equipe cuidará de tudo.
                    </p>
                </div>
            </section>

            <Contato label="Fale Conosco" />
            <Footer />
        </Main>
    );
}

export default ContatoPage
