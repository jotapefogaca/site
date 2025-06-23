'use client'
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import './styles/swiper.css';
import { Acompanhante } from '@/types/Acompanhante';
import { api } from '@/services/api';
import { convertTimestampToDate } from '@/services/functions';
import PriceView from './PriceView';
import TuneIcon from '@mui/icons-material/Tune';
import { IconButton, MenuItem, TextField } from '@mui/material';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

type Filtro = {
    [key: string]: any;
};

type Props = {
    location?: 'Campinas - SP' | 'Sorocaba - SP'
}

interface FilterItem {
    attribute: string,
    value: string,
    label: string
}

const Filters = ({ location }: Props) => {
    //Variaveis
    const [filters, setFilters] = useState<FilterItem[]>([])
    const [destaques, setDestaques] = useState<Acompanhante[]>([])
    const [models, setModels] = useState<Acompanhante[]>([])
    const [modelsFilters, setModelsFilters] = useState<Acompanhante[]>([])
    const [view, setView] = useState(false)

    //Functions
    function filtrarAcompanhantes(acompanhantes: Acompanhante[], filtros: Filtro): Acompanhante[] {
        return acompanhantes.filter(acompanhante => {
            return Object.entries(filtros).every(([key, value]) => {
                if (typeof value === 'object' && !Array.isArray(value)) {
                    return Object.entries(value).every(([subKey, subValue]) => {
                        return (acompanhante[key as keyof Acompanhante] as any)[subKey] === subValue;
                    });
                }
                return acompanhante[key as keyof Acompanhante] === value;
            });
        });
    }

    useEffect(() => {
        if (location) {
            setTimeout(async () => {
                const get = await api.acompanhante.getDestaques(location)

                if (get.error) {

                } else if (get.list.length > 0) {
                    setDestaques(get.list)
                }
            })

            setTimeout(async () => {
                const get = await api.acompanhante.getAll(location)

                if (get.error) {

                } else if (get.list.length > 0) {
                    setModels(get.list)
                    console.log(get.list)
                }
            })
        } else {
            setTimeout(async () => {
                const get = await api.acompanhante.getDestaques()

                if (get.error) {

                } else if (get.list.length > 0) {
                    setDestaques(get.list)
                    console.log(get.list)
                }
            })

            setTimeout(async () => {
                const get = await api.acompanhante.getAll()

                if (get.error) {

                } else if (get.list.length > 0) {
                    setModels(get.list)
                }
            })
        }
    }, [])

    const handleAge = (time: any): string => {
        const dateConverted = convertTimestampToDate(time)
        const currentDate = new Date().getFullYear()
        const age = currentDate - dateConverted.getFullYear()

        return age.toString()
    }

    const handleSetFilter = (filter: FilterItem) => {
        setFilters(prev => [...prev, filter])
    }

    const handleFiltersSubmit = () => {
        const filtros: Filtro = filters.reduce((acc, item) => {
            acc[item.attribute] = item.value;
            return acc;
        }, {} as Filtro);

        setModelsFilters(filtrarAcompanhantes(models, filtros));
    }


    return (
        <section className="w-full flex flex-col items-center">
            
            <h3 className="mb-[65px] text-secondary font-bold text-3xl text-center pt-20">Foxy Lady - Pesquisa por filtros</h3>
            <div className='flex flex-col w-full px-5 md:px-[200px] mb-20 relative'>
                <div className='flex p-1 border rounded-full'>
                    <div className='flex-1 flex gap-1'>
                        {filters.length > 0 &&
                            filters.map((item, index) => {
                                return (
                                    <span key={index} className='flex items-center gap-2 px-2 bg-[#4f576e] rounded-full text-white text-sm'>
                                        {item.value}
                                        <CancelRoundedIcon sx={{ color: '#fff' }} />
                                    </span>
                                )
                            })
                        }
                    </div>
                    <IconButton onClick={() => setView(true)}>
                        <TuneIcon sx={{ color: '#FFF' }} />
                    </IconButton>
                </div>
                {view &&
                    <div className='md:px-[200px] mb-20 absolute mt-3 flex w-full h-fit left-0 top-14' >
                        <div className='grid grid-cols-3 rounded-xl shadow-lg bg-white text-primary w-full p-5'>
                            <div className='col-span-3 flex justify-center w-full'>
                                <h3 className='my-8 text-xl text-gray-400'>Selecione os filtros desejados</h3>
                            </div>
                            <div className='flex flex-col gap-3 pr-3'>

                                <TextField
                                    label='Gênero'
                                    name='gender'
                                    size='small'
                                    sx={{ flex: 1 }}
                                    select
                                    onChange={(e) => { handleSetFilter({ label: 'Gênero', attribute: 'genero', value: e.target.value }) }}
                                >
                                    <MenuItem value=''>Selecione</MenuItem>
                                    <MenuItem value='Homem'>Homem</MenuItem>
                                    <MenuItem value='Mulher'>Mulher</MenuItem>
                                    <MenuItem value='Homem Transgênero'>Homem Transgênero</MenuItem>
                                    <MenuItem value='Mulher Transgênero'>Mulher Transgênero</MenuItem>
                                    <MenuItem value='Não Binário'>Não Binário</MenuItem>
                                </TextField>
                                <TextField
                                    label='Orientação Sexual'
                                    name='sexual-orientation'
                                    size='small'
                                    sx={{ flex: 0.5 }}
                                    select
                                    onChange={(e) => { handleSetFilter({ label: 'Orientação Sexual', attribute: 'orientacao', value: e.target.value }) }}
                                >
                                    <MenuItem value='Heterossexual'>Heterossexual</MenuItem>
                                    <MenuItem value='Homossexual'>Homossexual</MenuItem>
                                    <MenuItem value='Bissexual'>Bissexual</MenuItem>
                                </TextField>
                                <TextField
                                    label='Etnia'
                                    name='etinia'
                                    size='small'
                                    sx={{ flex: 1 }}
                                    select
                                    onChange={(e) => { handleSetFilter({ label: 'Etnia', attribute: 'etnia', value: e.target.value }) }}
                                >
                                    <MenuItem value=''>Selecione</MenuItem>
                                    <MenuItem value='Branco'>Branco</MenuItem>
                                    <MenuItem value='Preto'>Preto</MenuItem>
                                    <MenuItem value='Pardo'>Pardo</MenuItem>
                                    <MenuItem value='Asiático'>Asiático</MenuItem>
                                    <MenuItem value='Indígena'>Indígena</MenuItem>
                                </TextField>
                            </div>
                            <div className='flex flex-col gap-3 px-3 border-l border-r'>
                                <TextField
                                    label='Silicone'
                                    name='silicone'
                                    size='small'
                                    sx={{ flex: 1 }}
                                    select
                                    onChange={(e) => { handleSetFilter({ label: 'Silicone', attribute: 'silicone', value: e.target.value }) }}
                                >
                                    <MenuItem value=''>Selecione</MenuItem>
                                    <MenuItem value='Sim'>Sim</MenuItem>
                                    <MenuItem value='Não'>Não</MenuItem>
                                </TextField>
                                <TextField
                                    label='Tatuagens'
                                    name='tatoo'
                                    size='small'
                                    sx={{ flex: 1 }}
                                    select
                                    onChange={(e) => { handleSetFilter({ label: 'Tatuagens', attribute: 'tatuagem', value: e.target.value }) }}
                                >
                                    <MenuItem value=''>Selecione</MenuItem>
                                    <MenuItem value='Sim'>Sim</MenuItem>
                                    <MenuItem value='Não'>Não</MenuItem>
                                </TextField>
                                <TextField
                                    label='Piercing'
                                    name='piercing'
                                    size='small'
                                    sx={{ flex: 1 }}
                                    select
                                    onChange={(e) => { handleSetFilter({ label: 'Piercings', attribute: 'piercing', value: e.target.value }) }}
                                >
                                    <MenuItem value=''>Selecione</MenuItem>
                                    <MenuItem value='Sim'>Sim</MenuItem>
                                    <MenuItem value='Não'>Não</MenuItem>
                                </TextField>
                            </div>
                            <div className='flex flex-col gap-3 pl-3'>
                                <TextField
                                    label='Local'
                                    name='local'
                                    size='small'
                                    sx={{ flex: 1 }}
                                    select
                                    onChange={(e) => { handleSetFilter({ label: 'Local', attribute: 'local', value: e.target.value }) }}
                                >
                                    <MenuItem value=''>Selecione</MenuItem>
                                    <MenuItem value='Local Particular'>Local Particular</MenuItem>
                                    <MenuItem value='Local à escolha do cliente'>Local à escolha do cliente</MenuItem>
                                    <MenuItem value='Local à escolha do cliente'>Ambos</MenuItem>
                                </TextField>
                                <TextField
                                    label='Altura'
                                    name='altura'
                                    size='small'
                                    sx={{ flex: 1 }}
                                    select
                                    onChange={(e) => { handleSetFilter({ label: 'Altura', attribute: 'altura', value: e.target.value }) }}
                                >
                                    <MenuItem value=''>Selecione</MenuItem>
                                    <MenuItem value='150'>Até 1,50</MenuItem>
                                    <MenuItem value='160'>Até 1,60</MenuItem>
                                    <MenuItem value='170'>Até 1,70</MenuItem>
                                    <MenuItem value='180'>Até 1,80</MenuItem>
                                    <MenuItem value='1,70'>Acima de 1,80</MenuItem>
                                </TextField>
                                <TextField
                                    label='Peso'
                                    name='peso'
                                    size='small'
                                    sx={{ flex: 1 }}
                                    select
                                    onChange={(e) => { handleSetFilter({ label: 'Peso', attribute: 'peso', value: e.target.value }) }}
                                >
                                    <MenuItem value=''>Selecione</MenuItem>
                                    <MenuItem value='50'>Até 50kg</MenuItem>
                                    <MenuItem value='60'>Até 60kg</MenuItem>
                                    <MenuItem value='70'>Até 70kg</MenuItem>
                                    <MenuItem value='80'>Até 80kg</MenuItem>
                                    <MenuItem value='90'>Até 90kg</MenuItem>
                                    <MenuItem value='100'>Até 100kg</MenuItem>
                                    <MenuItem value='100+'>Acima de 100kg</MenuItem>
                                </TextField>
                            </div>
                            <div className='col-span-3 flex justify-between mt-8 w-full gap-3'>
                               
                                <button className='py-2 px-4 w-fit border hover:bg-gray-50 transition-all ease-out rounded-md text-gray-600 flex gap-3 items-center' onClick={() => setFilters([])}>
                                    <RotateLeftIcon sx={{ color: '#4b5563' }} />
                                    Resetar Filtros
                                </button>
                                <button className='py-2 px-4 w-fit bg-blue-500 hover:bg-blue-600 transition-all ease-out rounded-md text-white flex gap-3 items-center' onClick={handleFiltersSubmit}>
                                    <FilterAltIcon sx={{ color: '#fff' }} />
                                    Aplicar
                                </button>
                            </div>

                        </div>
                    </div>
                }

            </div>
            <div className='grid md:grid-cols-2 gap-5 w-full px-5 md:px-[200px]'>
                {models.length > 0 && filters.length < 1 &&
                    models.map((item, index) => {
                        return (
                            <Link href={`/acompanhante/${item.id}`} key={index} className='justify-between w-full border rounded-lg flex border-secondary'>
                                <img className='h-[230px] w-[200px] rounded-l-md object-cover object-center' src={item.midia.perfil} alt="" />
                                <div className='flex flex-col justify-around flex-1 gap-2 p-3'>
                                    <span className='flex justify-between'>
                                        <strong className='text-secondary text-left leading-none text-3xl '>{item.nome_social}</strong>
                                        <span className='flex items-center px-4 rounded-full bg-secondary text-white font-semibold'>
                                            <PriceView value={item.valores.uma_hora} styles='text-center max-w-[60px]' />
                                        </span>
                                    </span>

                                    <p className='text-white text-left text-[14px] leading-none font-light pb-1 border-b border-[#4f576e]'><strong className='font-bold'>Gênero: </strong>{item.genero}</p>
                                    <p className='text-white text-left text-[14px] leading-none font-light pb-1 border-b border-[#4f576e]'><strong className='font-bold'>Idade: </strong>{handleAge(item.nascimento)} anos</p>
                                    <p className='text-white text-left text-[14px] leading-none font-light pb-1 border-b border-[#4f576e]'><strong className='font-bold'>Etnia: </strong>{item.etnia}</p>
                                    <p className='text-white text-left text-[14px] leading-none font-light pb-1 border-b border-[#4f576e]'><strong className='font-bold'>Local: </strong>{item.local}</p>
                                    <p className='text-white text-left text-[14px] leading-none font-light pb-1 border-b border-[#4f576e]'><strong className='font-bold'>Altura: </strong>{item.altura}</p>
                                    <p className='text-white text-left text-[14px] leading-none font-light'><strong className='font-bold'>Peso: </strong>{item.peso}</p>


                                </div>

                            </Link>
                        )
                    })
                }
                {filters.length > 0 &&
                    modelsFilters.map((item, index) => {
                        return (
                            <Link href={`/acompanhante/${item.id}`} key={index} className='justify-between w-full border rounded-lg flex border-secondary'>
                                <img className='h-[230px] w-[200px] rounded-l-md object-cover object-center' src={item.midia.perfil} alt="" />
                                <div className='flex flex-col justify-around flex-1 gap-2 p-3'>
                                    <span className='flex justify-between'>
                                        <strong className='text-secondary text-left leading-none text-3xl '>{item.nome_social}</strong>
                                        <span className='flex items-center px-4 rounded-full bg-secondary text-white font-semibold'>
                                            <PriceView value={item.valores.uma_hora} styles='text-center max-w-[60px]' />
                                        </span>
                                    </span>

                                    <p className='text-white text-left text-[14px] leading-none font-light pb-1 border-b border-[#4f576e]'><strong className='font-bold'>Gênero: </strong>{item.genero}</p>
                                    <p className='text-white text-left text-[14px] leading-none font-light pb-1 border-b border-[#4f576e]'><strong className='font-bold'>Idade: </strong>{handleAge(item.nascimento)} anos</p>
                                    <p className='text-white text-left text-[14px] leading-none font-light pb-1 border-b border-[#4f576e]'><strong className='font-bold'>Etnia: </strong>{item.etnia}</p>
                                    <p className='text-white text-left text-[14px] leading-none font-light pb-1 border-b border-[#4f576e]'><strong className='font-bold'>Local: </strong>{item.local}</p>
                                    <p className='text-white text-left text-[14px] leading-none font-light pb-1 border-b border-[#4f576e]'><strong className='font-bold'>Altura: </strong>{item.altura}</p>
                                    <p className='text-white text-left text-[14px] leading-none font-light'><strong className='font-bold'>Peso: </strong>{item.peso}</p>


                                </div>

                            </Link>
                        )
                    })
                }

            </div>
        </section>
    )
}

export default Filters