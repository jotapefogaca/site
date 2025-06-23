'use client'
import Contato from "@/components/Contato";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HomeBanner from "@/components/HomeBanner";
import HomeDestaques from "@/components/HomeDestaques";
import Main from "@/components/Main";
import banner from '../../../public/media/images/banner_contato.jpg'
import Image from "next/image";
import Acompanhante from "@/components/Acompanhante";
import { Acompanhante as TypeAcompanhante } from "@/types/Acompanhante";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/services/api";

type Props = {
    model: TypeAcompanhante
}

const Exibition = ({ model }:Props) => {

    const [current, setCurrent] = useState<TypeAcompanhante>(model)
    const [warning, setWarning] = useState(false)
    const [city, setCity] = useState('')

   /*  useEffect(() => {
        const cookies = Cookies.get('acceptTermsAndConditions');
        if (!cookies) {
            setWarning(true)
        } else {
            setCity(Cookies.get('userLocation'))
        }
    }, []) */

    return (
        <Main>
            <Header />
            <Acompanhante item={current} />
            <Footer />
        </Main>
    );
}

export default Exibition
