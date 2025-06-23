'use client'
import { useEffect, useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Accordion from './Accordion';

const Duvidas = () => {
    //Variaveis
    const [step, setStep] = useState(0)
    //Handlres
    const handleSetStep = (newStep: number) => {
        if (newStep == step) {
            setStep(0)
        } else {
            setStep(newStep)
        }
       
    }

    return (
        <section className="w-full bg-white flex flex-col px-5 md:px-[200px] py-24">
            <h3 className="text-secondary font-bold text-5xl text-center mb-12">Dúvidas frequentes</h3>
            <div className='w-full gap-5 flex flex-col'>
                <div id='step1' className='border rounded-md p-3' onClick={() => handleSetStep(1)}>
                    <span className='flex justify-between'>
                        <strong>01 - Legislação</strong>
                        <KeyboardArrowDownIcon sx={{ color: '#272b37' }} />
                    </span>
                    <div className={`flex flex-col gap-3 overflow-hidden transition-max-height duration-300 ease-in-out ${step == 1 ? 'max-h-[9999px] mt-3' : 'max-h-0'}`}>
                        A Foxy Lady opera em total conformidade com as leis brasileiras, oferecendo uma plataforma que permite às profissionais anunciar seus serviços na cidade selecionada. Nosso compromisso é garantir que todas as atividades ocorram de maneira legal e ética.
                    </div>
                </div>
                <div id='step2' className='border rounded-md p-3' onClick={() => handleSetStep(2)}>
                    <span className='flex justify-between'>
                        <strong>02 - Preços e Serviços</strong>
                        <KeyboardArrowDownIcon sx={{ color: '#272b37' }} />
                    </span>
                    <div className={`flex flex-col gap-3 overflow-hidden transition-max-height duration-300 ease-in-out ${step == 2 ? 'max-h-[9999px] mt-3' : 'max-h-0'}`}>
                        Na Foxy Lady, os preços e serviços são determinados exclusivamente pelas acompanhantes. Eles podem variar de acordo com os serviços oferecidos, proporcionando uma ampla gama de opções para os clientes. Para obter informações detalhadas sobre os serviços e preços, consulte os perfis individuais das acompanhantes. É importante destacar que a Foxy Lady não se envolve na prestação dos serviços ou na definição dos valores cobrados pelas acompanhantes.
                    </div>
                </div>
                <div id='step3' className='border rounded-md p-3' onClick={() => handleSetStep(3)}>
                    <span className='flex justify-between'>
                        <strong>03 - Privacidade</strong>
                        <KeyboardArrowDownIcon sx={{ color: '#272b37' }} />
                    </span>
                    <div className={`flex flex-col gap-3 overflow-hidden transition-max-height duration-300 ease-in-out ${step == 3 ? 'max-h-[9999px] mt-3' : 'max-h-0'}`}>
                        Respeitamos profundamente a privacidade dos nossos usuários. Todas as informações fornecidas são mantidas confidenciais e protegidas por nossa política de privacidade. A Foxy Lady nunca solicitará informações pessoais dos usuários que navegam em nosso website, garantindo uma experiência segura e discreta.
                    </div>
                </div>
                <div id='step4' className='border rounded-md p-3' onClick={() => handleSetStep(4)}>
                    <span className='flex justify-between'>
                        <strong>04 - Autenticidade</strong>
                        <KeyboardArrowDownIcon sx={{ color: '#272b37' }} />
                    </span>
                    <div className={`flex flex-col gap-3 overflow-hidden transition-max-height duration-300 ease-in-out ${step == 4 ? 'max-h-[9999px] mt-3' : 'max-h-0'}`}>
                        Garantimos a autenticidade dos perfis das acompanhantes e a veracidade das informações fornecidas. Realizamos avaliações e entrevistas mensais com cada modelo para assegurar que os perfis sejam precisos e confiáveis.
                    </div>
                </div>
                <div id='step5' className='border rounded-md p-3' onClick={() => handleSetStep(5)}>
                    <span className='flex justify-between'>
                        <strong>05 - Formas de Contato</strong>
                        <KeyboardArrowDownIcon sx={{ color: '#272b37' }} />
                    </span>
                    <div className={`flex flex-col gap-3 overflow-hidden transition-max-height duration-300 ease-in-out ${step == 5 ? 'max-h-[9999px] mt-3' : 'max-h-0'}`}>
                        As formas de contato com as acompanhantes podem variar, geralmente incluindo números de telefone ou redes sociais listadas nos perfis. Siga as instruções fornecidas nos perfis individuais. O contato é feito diretamente com as acompanhantes; nosso site apenas divulga os meios de contatá-las e não possui responsabilidade sobre as comunicações entre as partes.
                    </div>
                </div>
                <div id='step6' className='border rounded-md p-3' onClick={() => handleSetStep(6)}>
                    <span className='flex justify-between'>
                        <strong>06 - Experiência Geral</strong>
                        <KeyboardArrowDownIcon sx={{ color: '#272b37' }} />
                    </span>
                    <div className={`flex flex-col gap-3 overflow-hidden transition-max-height duration-300 ease-in-out ${step == 6 ? 'max-h-[9999px] mt-3' : 'max-h-0'}`}>
                        Cada experiência é única. Respeite as regras e expectativas das acompanhantes e comunique-se de forma respeitosa. O consentimento mútuo é essencial para garantir uma experiência segura, positiva e prazerosa para ambas as partes.As formas de contato com as acompanhantes podem variar, geralmente incluindo números de telefone ou redes sociais listadas nos perfis. Siga as instruções fornecidas nos perfis individuais. O contato é feito diretamente com as acompanhantes; nosso site apenas divulga os meios de contatá-las e não possui responsabilidade sobre as comunicações entre as partes.
                    </div>
                </div>
            </div>
            <h3 className="text-secondary font-bold text-5xl text-center mt-12">Tenha acesso a<br />conteúdos e ferramentos<br /><span className='text-primary'>exclusivas</span></h3>
        </section>
    )

}

export default Duvidas