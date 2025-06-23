'use client';
import { lazy, useEffect, useState } from "react";
import { Acompanhante } from "@/types/Acompanhante";
import dynamic from "next/dynamic";
import HomeBanner from "@/components/HomeBanner";
import Header from "@/components/Header";
import HomeDestaques from "@/components/HomeDestaques";
import Contato from "@/components/Contato";
import Footer from "@/components/Footer";


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
    const [models, setModels] = useState<Acompanhante[]>([]);

    useEffect(() => {
        fetchModels().then(setModels).catch(console.error);
    }, []);

    return (
        <main className="h-[100dvh] w-full flex flex-col overflow-auto text-primary custom-scrollbar">
            <section className="flex flex-col w-full">
                <Header />
                <HomeBanner />
            </section>
            <HomeDestaques models={models} />
            <Contato label="Contato" />
            <Footer />
        </main>
    );
}
