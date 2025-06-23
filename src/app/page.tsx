'use client';
import { useEffect, useState } from "react";
import { Acompanhante } from "@/types/Acompanhante";
import Image from "next/image";
import logomarca from '../../public/media/images/logo.webp'
import adult from "@icons/adult.svg"

// Carrega os dados de modelos usando SSR
async function fetchModels() {
    const res = await fetch('/api/v1/getAllModels', {
        next: { revalidate: 60 }, // revalida a cada 60 segundos
    });

    if (!res.ok) {
        throw new Error('Failed to fetch models');
    }

    const data = await res.json();
    return data.models as Acompanhante[];
}

export default function HomePage() {
    const [city, setCity] = useState('')

    useEffect(() => {
        const getCookies = async () => {
            const request = fetch('/api/v2/get-cookies', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const response = await request;
            const data = await response.json();
            const acceptTerms = data.acceptTerms;
            const userLocation = data.userLocation;

            if (userLocation) {
                setCity(userLocation.value);
            } 
        }

        getCookies();
    }, []);

    return (
        <main className="h-[100dvh] w-full flex flex-col overflow-auto text-primary custom-scrollbar">
            <div className="p-3 md:p-10 top-0 left-0 w-full h-[100dvh] bg-primary flex items-center justify-center">
                <div className="p-3 md:p-8 rounded-3xl bg-primary flex flex-col gap-5 h-fit w-full md:w-[60%]">
                    <Image className="h-[60px] md:h-[100px] w-fit self-center md:self-start" src={logomarca} alt="Logomarca Wildcats" />
                    <span className='flex items-center justify-center gap-3'>
                        <Image className="h-[50px] md:h-[100px] w-fit self-center" src={adult} alt="Logomarca Wildcats" />
                        <h1 className="text-white font-extrabold text-xl md:text-3xl">PLATAFORMA DE CONTEÚDO ADULTO</h1>
                    </span>
                    <hr />
                    <span className='border rounded-md flex flex-col md:flex-row'>
                        <label htmlFor="city-select" className='text-white p-3'>Selecione uma cidade:</label>
                        <select id='city-select' className="flex-1 px-3 text-gray-800" name="" defaultValue={'disabled'} onChange={(e) => setCity(e.currentTarget.value)}>
                            <option className='text-gray-800' value={'disabled'} disabled>Clique aqui para escolher o local das buscas</option>
                            <option className='text-gray-800' value="Campinas - SP">Campinas - SP</option>
                            <option className='text-gray-800' value="Sorocaba - SP">Sorocaba - SP</option>
                        </select>
                    </span>
                    <hr />
                    <p className="text-[12px] text-white">Estou ciente que a Lady Foxy é uma plataforma de conteúdo adulto, e apresenta conteúdo explicíto. Ao utilizar o site, também concordo com o uso de cookies e outras tecnologias semelhantes para melhorar a sua experiência.</p>
                    <a className='p-3 border border-secondary text-white rounded-md w-fit' href="">Termos de uso</a>
                    <hr />
                    <button
                        type="button"
                        className="bg-secondary rounded-md text-primary font-semibold text-center p-3"
                        onClick={() => {
                            if (city) {
                                document.cookie = `acceptTermsAndConditions=true; path=/; samesite=strict`;
                                document.cookie = `userLocation=${city}; path=/; samesite=strict`;

                                if (city === 'Campinas - SP') {
                                    window.location.href = '/acompanhantes/campinas';
                                } else if (city === 'Sorocaba - SP') {
                                    window.location.href = '/acompanhantes/sorocaba';
                                }
                            }
                        }}
                    >
                        Continuar
                    </button>

                </div>
            </div>
        </main>
    );
}
