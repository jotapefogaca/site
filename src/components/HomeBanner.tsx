'use client';
import useEmblaCarousel from 'embla-carousel-react';
import Link from 'next/link';
import './styles/embla.css'; // Certifique-se de criar este arquivo para estilos personalizados
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles/swiper.css';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import { convertTimestampToDate } from '@/services/functions';
import { api } from '@/services/api';
import { useEffect, useState } from 'react';
import { Acompanhante } from '@/types/Acompanhante';

type Props = {
    location?: 'Campinas - SP' | 'Sorocaba - SP' | 'Londrina - PR';
};

const HomeBanner = ({ location }: Props) => {
    const [models, setModels] = useState<Acompanhante[]>([])

    useEffect(() => {
        setTimeout(async () => {
            if (location) {
                const get = await api.acompanhante.getGold(location)

                if (get.error) {

                } else if (get.list.length > 0) {
                    setModels(get.list)
                }
            } else {
                const get = await api.acompanhante.getGold()

                if (get.error) {

                } else if (get.list.length > 0) {
                    setModels(get.list)
                }
            }

        })
    }, [])

    const handleAge = (time: any): string => {
        const dateConverted = convertTimestampToDate(time)
        const currentDate = new Date().getFullYear()
        const age = currentDate - dateConverted.getFullYear()

        return age.toString()
    }


    return (
        <Swiper
            slidesPerView={1}
            modules={[Pagination, Autoplay, Navigation]}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false
            }}
            className="mySwiper max-h-[60vh] md:max-h-[100dvh] md:h-screen w-full object-cover"
        >
            {models.length === 0 &&
                <SwiperSlide className='w-full min-h-[70vh] max-h-[70vh] md:h-screen bg-primary'>
                    
                </SwiperSlide>
            }
            {models.length > 0 &&
                models.map((item, index) => {
                    return (
                        <SwiperSlide key={index} className='w-full min-h-[70vh] max-h-[70vh] md:h-screen' style={{ background: `url("${item.midia.banner}") center center / cover no-repeat` }}>
                            <div className='flex w-full h-full bg-gradient-to-t from-primary to-40% px-5 md:px-[200px] items-end pb-10'>
                                <div className='flex flex-col gap-5 w-full'>
                                    <h2 className='text-white text-6xl md:text-[100px] text-start text-shadow'>{item.nome_social}</h2>
                                    <Link href={`/acompanhante/${item.nickname}`} className="flex justify-center items-center w-[150px] py-2 border border-secondary text-center text-white cursor-pointer uppercase font-semibols text-[12px] rounded-full bg-secondary">
                                        VEJA ESTE PERFIL
                                    </Link>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })
            }
        </Swiper>
    );
};

export default HomeBanner;
