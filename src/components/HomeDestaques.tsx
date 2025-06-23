'use client'
import React, { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Acompanhante } from '@/types/Acompanhante';
import { convertTimestampToDate } from '@/services/functions';
import logo from "@images/logo.png"
import manu from "@images/manu.png"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import './styles/swiper.css';
import { Navigation } from 'swiper/modules';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

type Props = {
    models: Acompanhante[]
}

const HomeDestaques = ({ models }: Props) => {

    const handleAge = useMemo(() => (time: any): string => {
        const dateConverted = convertTimestampToDate(time);
        const currentDate = new Date().getFullYear();
        return (currentDate - dateConverted.getFullYear()).toString();
    }, []);

    return (
        <section className="w-full flex flex-col items-center bg-primary">
            <h3 className="mb-[65px] text-secondary font-bold text-3xl text-center pt-20">Destaques</h3>
            <div className='flex w-full px-5 md:px-[150px] h-[250px]'>
                <span className='w-[50px] flex items-center justify-center pr-2'>
                    <KeyboardArrowLeftIcon id='prevItem' className='border rounded-full w-full h-fit cursor-pointer' sx={{ color: 'white' }} />
                </span>
                <Swiper
                    slidesPerView={2}
                    spaceBetween={'6px'}
                    navigation={{
                        prevEl: '#prevItem',
                        nextEl: '#nextItem'
                    }}
                    modules={[Navigation]}
                    className="swiper-web hidden md:flex"
                >
                    {models.length > 0 &&
                        models.map((item, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <Link href={`/acompanhante/${item.nickname}`} className='flex justify-between flex-col m-2 p-3 border border-secondary rounded-xl w-full h-full'>
                                        <img className='w-full h-[175px] object-cover object-center  rounded-md' src={item.midia.banner} alt="" />
                                        <p className='text-white text-left text-[12px] leading-none font-light'>{item.altura} | 27 anos</p>
                                        <strong className='text-secondary text-left leading-none'>{item.nome_social}</strong>
                                    </Link>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={'6px'}
                    navigation={{
                        prevEl: '#prevItem',
                        nextEl: '#nextItem'
                    }}
                    modules={[Navigation]}
                    className="swiper-mobile md:hidden"
                >
                    {models.length > 0 &&
                        models.map((item, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <Link href={`/acompanhante/${item.nickname}`} className='flex justify-between flex-col m-2 p-3 border border-secondary rounded-xl w-full h-full'>
                                        <img className='w-full h-[175px] object-cover object-center  rounded-md' src={item.midia.card} alt="" />
                                        <p className='text-white text-left text-[12px] leading-none font-light'>{item.altura} | {handleAge(item.nascimento)} anos</p>
                                        <strong className='text-secondary text-left leading-none'>{item.nome_social}</strong>
                                    </Link>
                                </SwiperSlide>
                            )
                        })
                    }

                </Swiper>
                <span className='w-[50px] flex items-center justify-center pl-2'>
                    <KeyboardArrowRightIcon id='nextItem' className='border rounded-full w-full h-fit cursor-pointer' sx={{ color: 'white' }} />
                </span>
            </div>
            <h3 className="mb-[65px] text-secondary font-bold text-3xl text-center pt-20">Wildcats Gilrs</h3>
            <div className='grid md:grid-cols-4 gap-5 w-full px-5 md:px-[200px]'>
                {models.length > 0 &&
                    models.map((item, index) => {
                        return (
                            <Link href={`/acompanhante/${item.nickname}`} key={index} className='h-[300px] justify-between w-full border rounded-lg p-3 flex flex-col border-secondary'>
                                <img className='h-[230px] w-full rounded-md object-cover object-center' src={item.midia.perfil} alt="" />
                                <p className='text-white text-left text-[12px] leading-none font-light'>{item.altura} | {handleAge(item.nascimento)} anos</p>
                                <strong className='text-secondary text-left leading-none'>{item.nome_social}</strong>
                            </Link>
                        )
                    })
                }


            </div>
            <Link href={'/acompanhantes'} className="flex justify-center items-center w-fit p-2 px-4 border border-primary text-center text-primary cursor-pointer uppercase font-semibols text-[12px] rounded-full my-10">
                VER TODAS AS ACOMPANHANTES
            </Link>
            <div className='flex justify-center flex-wrap gap-2 mb-10 px-6 md:px-[200px]'>
                <span className='bg-neutral-200 text-primary font-semibold rounded-md p-2 cursor-pointer'>Namoradinha</span>
                <span className='bg-neutral-200 text-primary font-semibold rounded-md p-2 cursor-pointer'>Loira</span>
                <span className='bg-neutral-200 text-primary font-semibold rounded-md p-2 cursor-pointer'>Morena</span>
                <span className='bg-neutral-200 text-primary font-semibold rounded-md p-2 cursor-pointer'>Cheirosa</span>
                <span className='bg-neutral-200 text-primary font-semibold rounded-md p-2 cursor-pointer'>Seios Naturais</span>
                <span className='bg-neutral-200 text-primary font-semibold rounded-md p-2 cursor-pointer'>Silicone</span>
                <span className='bg-neutral-200 text-primary font-semibold rounded-md p-2 cursor-pointer'>Piercing</span>
            </div>
            <span className='text-center text-primary font-light mb-10 px-6 md:px-[200px]'>Quer encontrar a acompanhante ideal? Escolha uma das tags acima ou <a className='font-bold' href="/acompanhantes">Clique aqui</a> e defina seus filtros!</span>
        </section>
    )
}

export default HomeDestaques