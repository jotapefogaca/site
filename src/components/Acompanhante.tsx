'use client'
import Image from "next/image"
import whatsapp from '../../public/media/icons/whatsapp_light.svg'
import cost from '../../public/media/icons/cost.svg'
import people from '../../public/media/icons/people.svg'
import home from '../../public/media/icons/home.svg'
import location from '../../public/media/icons/gold_location.svg'
import instagram from '../../public/media/icons/square_instagram.svg'
import tiktok from '../../public/media/icons/square_tiktok.svg'
import twitter from '../../public/media/icons/twitter-x.svg'
import add_people from '../../public/media/icons/add_people.svg'
import onlyfans from '../../public/media/icons/onlyfans.svg'
import privacy from '../../public/media/icons/privacy.webp'
import face from '../../public/media/icons/facebook.svg'

import product from '../../public/media/icons/product.svg'
import midia_comparacao from '../../public/media/images/image_comparacao.png'
import values from '../../public/media/icons/values.svg'
import Link from "next/link"
import { Acompanhante as TypeAcompanhante } from "@/types/Acompanhante"
import Price from "./Price"
import { useEffect, useState } from "react"
import PriceView from "./PriceView"
import { api } from "@/services/api"
import { getDownloadURL } from "firebase/storage"
import Gallery from "./Gallery"
import { convertTimestampToDate } from "@/services/functions"
import Editor from "./Editor"
import ViewHtml from "./ViewHtml"

type Props = {
    item: TypeAcompanhante
}

const Acompanhante = ({ item }: Props) => {
    //Variaveis
    const [value, setValue] = useState(0)
    const [started, setStarted] = useState(false)
    const [ready, setReady] = useState(false)

    const [photos, setPhotos] = useState<string[]>([])
    const [photosLength, setPhotosLength] = useState(0)
    const [videos, setVideos] = useState<string[]>([])

    const handleAge = (time: any): string => {
        const dateConverted = convertTimestampToDate(time)
        const currentDate = new Date().getFullYear()
        const age = currentDate - dateConverted.getFullYear()

        return age.toString()
    }

    useEffect(() => {
        if (item.id != '') {
            setStarted(true)
        }
    }, [item])

    useEffect(() => {
        if (item.id != '' && started) {
            setTimeout(async () => {
                const getPhotos = await api.acompanhante.getPhotoFiles(item.id)

                if (getPhotos.error) {

                } else if (getPhotos.list.length > 0) {

                    getPhotos.list.forEach(async (itemRef) => {
                        let url = await getDownloadURL(itemRef);
                        setPhotos(prev => [...prev, url])
                    });
                }
            })
            setTimeout(async () => {
                const getVideos = await api.acompanhante.getVideoFiles(item.id)

                if (getVideos.error) {

                } else if (getVideos.list.length > 0) {

                    getVideos.list.forEach(async (itemRef) => {
                        let url = await getDownloadURL(itemRef);
                        setVideos(prev => [...prev, url])
                    });
                }
            })
        }
    }, [started])

    useEffect(() => {
        if (photos.length > 0) {
            setReady(true)
        }
    }, [photos])

    return (
        <section className=" px-5 md:px-[200px] w-full bg-primary">
            <div className="flex flex-col md:h-screen w-full bg-[#20232a] rounded-b-2xl mb-10">
                <div className="min-h-[55%] relative" style={{ background: `url("${item.midia.banner}") center center / cover no-repeat` }}>
                    <div className="flex gap-3 flex-col md:flex-row h-full w-full items-center md:items-end justify-center md:justify-between bg-gradient-to-t from-[#20232a] px-0 from-20% md:px-12">
                        <div className="flex flex-col md:flex-row gap-10 items-end">
                            <img className="bg-[#272b38] self-center p-1 h-32 w-32 md:h-56 md:w-56 rounded-full" src={item.midia.perfil} alt="" />
                            <span className="flex flex-col gap-2">
                                <h1 className="text-white font-extralight  text-center md:text-left">Acompanhantes de Luxo</h1>
                                <h2 className="font-bold text-4xl text-white text-center md:text-left">{item.nome_social}</h2>
                                <p className="text-white font-extralight  text-center md:text-left">{item.altura}m | {handleAge(item.nascimento)} anos | {item.cidade}</p>
                            </span>
                        </div>
                        <Link href={`https://api.whatsapp.com/send?phone=55${item.whatsapp}&text=Ol%C3%A1!%20Te%20encontrei%20atrav%C3%A9s%20da%20plataforma%20Foxy%20Lady.`} target='_blank' className='flex items-center justify-center bg-[#51be1d] text-white rounded-full px-3 py-2'>
                            <Image className='h-8 w-8' src={whatsapp} alt="Whatsapp" />
                            <h3 className='font-semibold text-white ml-3'>{item.whatsapp}</h3>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row px-12 py-12 h-full gap-12 overflow-auto">
                    <div className="flex gap-3 md:gap-0 flex-col justify-around">
                        <span className='flex gap-4 items-center'>
                            <Image src={cost} alt="Valor por hora" />
                            <span className="flex text-white font-extralight"><PriceView styles="text-start" value={item.valores.uma_hora} /></span>
                        </span>
                        <span className='flex gap-4 items-center'>
                            <Image src={people} alt="Valor por hora" />
                            <p className="text-white font-extralight">{handleAge(item.nascimento)} anos</p>
                        </span>
                        <span className='flex gap-4 items-center'>
                            <Image src={home} alt="Valor por hora" />
                            <p className="text-white font-extralight">{item.local}</p>
                        </span>
                        <span className='flex gap-4 items-center'>
                            <Image src={location} alt="Valor por hora" />
                            <p className="text-white font-extralight">{item.endereco}</p>
                        </span>
                    </div>
                    <div className="flex flex-col flex-1 gap-5">
                        <span className="flex gap-5">
                            {item.midia.instagram &&
                                <Link href={item.midia.instagram} target='_blank'>
                                    <Image className='h-10 w-10' src={instagram} alt="Valor por hora" />
                                </Link>
                            }
                            {item.midia.tiktok &&
                                <Link href={item.midia.tiktok} target='_blank'>
                                    <Image className='h-10 w-10' src={tiktok} alt="Valor por hora" />
                                </Link>
                            }
                            {item.midia.facebook &&
                                <Link href={item.midia.facebook} target='_blank'>
                                    <Image className='h-10 w-10' src={face} alt="Valor por hora" />
                                </Link>
                            }
                            {item.midia.onlyfans &&
                                <Link href={item.midia.onlyfans} target='_blank'>
                                    <Image className='h-10 w-10' src={onlyfans} alt="Valor por hora" />
                                </Link>
                            }
                            {item.midia.privacy &&
                                <Link href={item.midia.privacy} target='_blank'>
                                    <Image className='h-10 w-10' src={privacy} alt="Valor por hora" />
                                </Link>
                            }

                        </span>
                        <span className='text-white overflow-auto custom-scrollbar'>
                            <ViewHtml type='Html' htmlString={item.descricao} />
                            <br />
                            acompanhantes de luxo | acompanantes de luxo | acompanhamentos luxo | photo acompa campinas | photoacompanhantes
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col h-fit w-full bg-[#20232a] rounded-2xl mb-10 p-12 gap-12">
                <span className="w-full flex items-center gap-10">
                    <Image src={add_people} alt="" />
                    <h3 className="text-3xl text-white font-bold leading-none">Sobre mim</h3>
                </span>
                <div className="flex flex-col md:flex-row md:divide-x">
                    <div className="flex flex-col mb-5 md:mb-0 w-full md:w-1/2 justify-around gap-5">
                        <span className="flex flex-col">
                            <strong className="text-secondary">Gênero</strong>
                            <p className="font-extralight text-white">Mulher</p>
                        </span>
                        <span className="flex flex-col">
                            <strong className="text-secondary">Genitália</strong>
                            <p className="font-extralight text-white">Possui vagina</p>
                        </span>
                        <span className="flex flex-col">
                            <strong className="text-secondary">Comportamento Sexual</strong>
                            <p className="font-extralight text-white">Ativo - Passivo</p>
                        </span>
                    </div>
                    <div className="flex flex-col w-full md:w-1/2 justify-around md:pl-12 gap-5">
                        <span className="flex flex-col">
                            <strong className="text-secondary">Orientação Sexual</strong>
                            <p className="font-extralight text-white">Bissexual</p>
                            <p className="font-extralight text-white text-[10px]">Atração por ambos os gêneros feminino e masculino.</p>
                        </span>
                        <span className="flex flex-col">
                            <strong className="text-secondary">Idioma</strong>
                            <p className="font-extralight text-white">Português</p>
                        </span>
                        <span className="flex flex-col">
                            <strong className="text-secondary">Fumante</strong>
                            <p className="font-extralight text-white">Não informado</p>
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col h-fit w-full bg-[#20232a] rounded-2xl mb-10 p-12 gap-12">
                <span className="w-full flex items-center gap-10">
                    <Image src={add_people} alt="" />
                    <h3 className="text-3xl text-white font-bold leading-none">Mídia de Comparação</h3>
                </span>
                <div className="flex flex-col md:flex-row md:divide-x">
                    <div className="flex flex-col w-full md:w-1/2 justify-around gap-5 py-5 md:pr-12">
                        <video className="h-full w-fit" src={item.midia.comparacao} controls>
                            Seu navegador não suporta a tag de vídeo.
                        </video>
                        {/*                         <p className='text-center text-sm text-white font-extralight'>Vídeo enviado em: agosto/2023</p> */}
                    </div>
                    <div className="grid md:grid-cols-2 flex-1 md:pl-12 gap-3 md:gap-0 gap-x-5 py-5">
                        <span className="flex flex-col">
                            <strong className="text-secondary">Peso</strong>
                            <p className="font-extralight text-white">{item.peso}kg</p>
                        </span>
                        <span className="flex flex-col">
                            <strong className="text-secondary">Altura</strong>
                            <p className="font-extralight text-white">{item.altura}</p>
                        </span>
                        <span className="flex flex-col">
                            <strong className="text-secondary">Etnia</strong>
                            <p className="font-extralight text-white">{item.etnia}</p>
                        </span>
                        <span className="flex flex-col">
                            <strong className="text-secondary">Cor dos olhos</strong>
                            <p className="font-extralight text-white">{item.olhos}</p>
                        </span>
                        <span className="flex flex-col">
                            <strong className="text-secondary">Estilo de cabelo</strong>
                            <p className="font-extralight text-white">{item.estiloCabelo}</p>
                        </span>
                        <span className="flex flex-col">
                            <strong className="text-secondary">Cor de cabelo</strong>
                            <p className="font-extralight text-white">{item.corCabelo}</p>
                        </span>
                        <span className="flex flex-col">
                            <strong className="text-secondary">Tamanho do pé</strong>
                            <p className="font-extralight text-white">{item.pe}</p>
                        </span>
                        <span className="flex flex-col">
                            <strong className="text-secondary">Silicone</strong>
                            <p className="font-extralight text-white">{item.silicone}</p>
                        </span>
                        <span className="flex flex-col">
                            <strong className="text-secondary">Tatuagens</strong>
                            <p className="font-extralight text-white">{item.tatuagem}</p>
                        </span>
                        <span className="flex flex-col">
                            <strong className="text-secondary">Piercing</strong>
                            <p className="font-extralight text-white">{item.piercing}</p>
                        </span>
                    </div>
                </div>
            </div>
            <Gallery photos={photos} videos={videos} />
            <div className="flex flex-col h-fit w-full bg-[#20232a] rounded-2xl mb-10 p-12 gap-12">
                <span className="w-full flex items-center gap-10">
                    <Image src={product} alt="" />
                    <h3 className="text-3xl text-white font-bold leading-none">Serviços</h3>
                </span>
                <span className="flex items-center">
                    <strong className='text-secondary w-56'>Serviços Ofercidos</strong>
                    <hr className="border-secondary border flex-1" />
                </span>
                <div className="md:grid grid-cols-2 gap-3 w-full">
                    <span className="py-5 text-white border-b border-white block" style={{ display: item.servicos.penetração_com_acessorios ? 'block' : 'none' }} >
                        Acessórios eróticos
                    </span>
                    <span className="py-5 text-white border-b border-white block" style={{ display: item.servicos.beijo_grego ? 'block' : 'none' }} >
                        Beijo Grego
                    </span>
                    <span className="py-5 text-white border-b border-white block" style={{ display: item.servicos.beijo_na_boca ? 'block' : 'none' }} >
                        Beijo na boca
                    </span>
                    <span className="py-5 text-white border-b border-white block" style={{ display: item.servicos.bondage ? 'block' : 'none' }} >
                        Bondage
                    </span>
                    <span className="py-5 text-white border-b border-white block" style={{ display: item.servicos.chuva_dourada ? 'block' : 'none' }} >
                        Chuva dourada
                    </span>
                    <span className="py-5 text-white border-b border-white block" style={{ display: item.servicos.chuva_marrom ? 'block' : 'none' }} >
                        Chuva marrom
                    </span>
                    <span className="py-5 text-white border-b border-white block" style={{ display: item.servicos.dominacao ? 'block' : 'none' }} >
                        Dominação
                    </span>
                    <span className="py-5 text-white border-b border-white block" style={{ display: item.servicos.dupla_penetracao ? 'block' : 'none' }} >
                        Dupla penetração
                    </span>
                    <span className="py-5 text-white border-b border-white block" style={{ display: item.servicos.facefuck ? 'block' : 'none' }} >
                        Facefuck
                    </span>
                    <span className="py-5 text-white border-b border-white block" style={{ display: item.servicos.fisting ? 'block' : 'none' }} >
                        Fisting
                    </span>
                    <span className="py-5 text-white border-b border-white block" style={{ display: item.servicos.masturbacao ? 'block' : 'none' }} >
                        Masturbação
                    </span>
                    <span className="py-5 text-white border-b border-white block" style={{ display: item.servicos.massagem_tantrica ? 'block' : 'none' }} >
                        Massagem tântrica
                    </span>
                    <span className="py-5 text-white border-b border-white block" style={{ display: item.servicos.massagem_tradicional ? 'block' : 'none' }} >
                        Massagem tradicional
                    </span>
                    <span className="py-5 text-white border-b border-white block" style={{ display: item.servicos.oral_sem_preservativo ? 'block' : 'none' }} >
                        Oral sem preservativo
                    </span>
                    <span className="py-5 text-white border-b border-white block" style={{ display: item.servicos.permite_filmagem ? 'block' : 'none' }} >
                        Permite filmagem
                    </span>
                    <span className="py-5 text-white border-b border-white block" style={{ display: item.servicos.podolatria ? 'block' : 'none' }} >
                        Podolatria
                    </span>
                    <span className="py-5 text-white border-b border-white block" style={{ display: item.servicos.quirofilia ? 'block' : 'none' }} >
                        Quirofilia
                    </span>
                    <span className="py-5 text-white border-b border-white block" style={{ display: item.servicos.roleplay ? 'block' : 'none' }} >
                        Roleplay
                    </span>
                    <span className="py-5 text-white border-b border-white block" style={{ display: item.servicos.sadomasoquismo ? 'block' : 'none' }} >
                        Sadomasoquismo
                    </span>
                    <span className="py-5 text-white border-b border-white block" style={{ display: item.servicos.sexo_anal_com_preservativo ? 'block' : 'none' }} >
                        Sexo anal com preservativo
                    </span>
                    <span className="py-5 text-white border-b border-white block" style={{ display: item.servicos.sexo_com_voyeurismo ? 'block' : 'none' }} >
                        Sexo com voyeurismo / ser voyeur
                    </span>
                    <span className="py-5 text-white border-b border-white block" style={{ display: item.servicos.sexo_oral_com_preservativo ? 'block' : 'none' }} >
                        Sexo oral com preservativo
                    </span>
                    <span className="py-5 text-white border-b border-white block" style={{ display: item.servicos.sexo_vaginal_com_preservativo ? 'block' : 'none' }} >
                        Sexo vaginal com preservativo
                    </span>
                    <span className="py-5 text-white border-b border-white block" style={{ display: item.servicos.sexo_virtual ? 'block' : 'none' }} >
                        Sexo virtual
                    </span>
                    <span className="py-5 text-white border-b border-white block" style={{ display: item.servicos.squirt ? 'block' : 'none' }} >
                        Squirt
                    </span>
                    <span className="py-5 text-white border-b border-white block" style={{ display: item.servicos.striptease ? 'block' : 'none' }} >
                        Stripetease
                    </span>
                    <span className="py-5 text-white border-b border-white block" style={{ display: item.servicos.trampling ? 'block' : 'none' }} >
                        Trampling
                    </span>
                    <span className="py-5 text-white border-b border-white block" style={{ display: item.servicos.tripla_penetracao ? 'block' : 'none' }} >
                        Tripla penetração
                    </span>
                    <span className="py-5 text-white border-b border-white block" style={{ display: item.servicos.uso_de_fantasias ? 'block' : 'none' }} >
                        Uso de fantasias
                    </span>
                </div>
                {/* <span className="flex items-center">
                    <strong className='text-secondary w-56'>Serviços não Ofercidos</strong>
                    <hr className="border-secondary border flex-1" />
                </span>
                <div className="grid grid-cols-2 gap-3 w-full">
                    <span className="py-5 text-white border-b border-white line-through" style={{ display: item.servicos.penetração_com_acessorios ? 'none' : 'block' }} >
                        Acessórios eróticos
                    </span>
                    <span className="py-5 text-white border-b border-white line-through" style={{ display: item.servicos.beijo_grego ? 'none' : 'block' }} >
                        Beijo Grego
                    </span>
                    <span className="py-5 text-white border-b border-white line-through" style={{ display: item.servicos.beijo_na_boca ? 'none' : 'block' }} >
                        Beijo na boca
                    </span>
                    <span className="py-5 text-white border-b border-white line-through" style={{ display: item.servicos.bondage ? 'none' : 'block' }} >
                        Bondage
                    </span>
                    <span className="py-5 text-white border-b border-white line-through" style={{ display: item.servicos.chuva_dourada ? 'none' : 'block' }} >
                        Chuva dourada
                    </span>
                    <span className="py-5 text-white border-b border-white line-through" style={{ display: item.servicos.chuva_marrom ? 'none' : 'block' }} >
                        Chuva marrom
                    </span>
                    <span className="py-5 text-white border-b border-white line-through" style={{ display: item.servicos.dominacao ? 'none' : 'block' }} >
                        Dominação
                    </span>
                    <span className="py-5 text-white border-b border-white line-through" style={{ display: item.servicos.dupla_penetracao ? 'none' : 'block' }} >
                        Dupla penetração
                    </span>
                    <span className="py-5 text-white border-b border-white line-through" style={{ display: item.servicos.facefuck ? 'none' : 'block' }} >
                        Facefuck
                    </span>
                    <span className="py-5 text-white border-b border-white line-through" style={{ display: item.servicos.fisting ? 'none' : 'block' }} >
                        Fisting
                    </span>
                    <span className="py-5 text-white border-b border-white line-through" style={{ display: item.servicos.masturbacao ? 'none' : 'block' }} >
                        Masturbação
                    </span>
                    <span className="py-5 text-white border-b border-white line-through" style={{ display: item.servicos.massagem_tantrica ? 'none' : 'block' }} >
                        Massagem tântrica
                    </span>
                    <span className="py-5 text-white border-b border-white line-through" style={{ display: item.servicos.massagem_tradicional ? 'none' : 'block' }} >
                        Massagem tradicional
                    </span>
                    <span className="py-5 text-white border-b border-white line-through" style={{ display: item.servicos.oral_sem_preservativo ? 'none' : 'block' }} >
                        Oral sem preservativo
                    </span>
                    <span className="py-5 text-white border-b border-white line-through" style={{ display: item.servicos.permite_filmagem ? 'none' : 'block' }} >
                        Permite filmagem
                    </span>
                    <span className="py-5 text-white border-b border-white line-through" style={{ display: item.servicos.podolatria ? 'none' : 'block' }} >
                        Podolatria
                    </span>
                    <span className="py-5 text-white border-b border-white line-through" style={{ display: item.servicos.quirofilia ? 'none' : 'block' }} >
                        Quirofilia
                    </span>
                    <span className="py-5 text-white border-b border-white line-through" style={{ display: item.servicos.roleplay ? 'none' : 'block' }} >
                        Roleplay
                    </span>
                    <span className="py-5 text-white border-b border-white line-through" style={{ display: item.servicos.sadomasoquismo ? 'none' : 'block' }} >
                        Sadomasoquismo
                    </span>
                    <span className="py-5 text-white border-b border-white line-through" style={{ display: item.servicos.sexo_anal_com_preservativo ? 'none' : 'block' }} >
                        Sexo anal com preservativo
                    </span>
                    <span className="py-5 text-white border-b border-white line-through" style={{ display: item.servicos.sexo_com_voyeurismo ? 'none' : 'block' }} >
                        Sexo com voyeurismo / ser voyeur
                    </span>
                    <span className="py-5 text-white border-b border-white line-through" style={{ display: item.servicos.sexo_oral_com_preservativo ? 'none' : 'block' }} >
                        Sexo oral com preservativo
                    </span>
                    <span className="py-5 text-white border-b border-white line-through" style={{ display: item.servicos.sexo_vaginal_com_preservativo ? 'none' : 'block' }} >
                        Sexo vaginal com preservativo
                    </span>
                    <span className="py-5 text-white border-b border-white line-through" style={{ display: item.servicos.sexo_virtual ? 'none' : 'block' }} >
                        Sexo virtual
                    </span>
                    <span className="py-5 text-white border-b border-white line-through" style={{ display: item.servicos.squirt ? 'none' : 'block' }} >
                        Squirt
                    </span>
                    <span className="py-5 text-white border-b border-white line-through" style={{ display: item.servicos.striptease ? 'none' : 'block' }} >
                        Stripetease
                    </span>
                    <span className="py-5 text-white border-b border-white line-through" style={{ display: item.servicos.trampling ? 'none' : 'block' }} >
                        Trampling
                    </span>
                    <span className="py-5 text-white border-b border-white line-through" style={{ display: item.servicos.tripla_penetracao ? 'none' : 'block' }} >
                        Tripla penetração
                    </span>
                    <span className="py-5 text-white border-b border-white line-through" style={{ display: item.servicos.uso_de_fantasias ? 'none' : 'block' }} >
                        Uso de fantasias
                    </span>
                </div> */}
            </div>
            <div className="flex flex-col h-fit w-full bg-[#20232a] rounded-2xl mb-10 p-6 md:p-12 gap-12">
                <span className="w-full flex items-center gap-10">
                    <Image src={values} alt="" />
                    <h3 className="text-3xl text-white font-bold leading-none">Valores</h3>
                </span>
                <div className="flex flex-col md:flex-row w-full">
                    <div className="grid md:pr-12 h-fit w-full md:w-1/2 md:border-r">
                        <span className="py-5 text-white border-b border-white flex justify-between">
                            <strong className="text-secondary block">15 minutos</strong>
                            <span>
                                {item.valores.quinze_min > 0 &&
                                    <PriceView styles={'text-end'} value={item.valores.quinze_min} />
                                }
                                {item.valores.quinze_min == 0 &&
                                    <>Não realiza</>
                                }
                            </span>
                        </span>
                        <span className="py-5 text-white border-b border-white flex justify-between">
                            <strong className="text-secondary block">30 minutos</strong>
                            <span>
                                {item.valores.meia_hora > 0 &&
                                    <PriceView styles={'text-end'} value={item.valores.meia_hora} />
                                }
                                {item.valores.meia_hora == 0 &&
                                    <>Não realiza</>
                                }
                            </span>
                        </span>
                        <span className="py-5 text-white border-b border-white flex justify-between">
                            <strong className="text-secondary">1 hora</strong>
                            <span>
                                {item.valores.uma_hora > 0 &&
                                    <PriceView styles={'text-end'} value={item.valores.uma_hora} />
                                }
                                {item.valores.uma_hora == 0 &&
                                    <>Não realiza</>
                                }
                            </span>
                        </span>
                        <span className="py-5 text-white border-b border-white flex justify-between">
                            <strong className="text-secondary block">2 horas</strong>
                            <span>
                                {item.valores.duas_horas > 0 &&
                                    <PriceView styles={'text-end'} value={item.valores.duas_horas} />
                                }
                                {item.valores.duas_horas == 0 &&
                                    <>Não realiza</>
                                }
                            </span>
                        </span>
                    </div>
                    <div className="grid md:pl-12 h-fit w-full md:w-1/2">

                        <span className="py-5 text-white border-b border-white flex justify-between">
                            <strong className="text-secondary block">4 horas</strong>
                            <span>
                                {item.valores.quatro_horas > 0 &&
                                    <PriceView styles={'text-end'} value={item.valores.quatro_horas} />
                                }
                                {item.valores.quatro_horas == 0 &&
                                    <>Não realiza</>
                                }
                            </span>
                        </span>
                        <span className="py-5 text-white border-b border-white flex justify-between">
                            <strong className="text-secondary block">Diárias</strong>
                            <span>
                                {item.valores.diaria > 0 &&
                                    <PriceView styles={'text-end'} value={item.valores.diaria} />
                                }
                                {item.valores.diaria == 0 &&
                                    <>Não realiza</>
                                }
                            </span>
                        </span>
                        <span className="py-5 text-white border-b border-white flex justify-between">
                            <strong className="text-secondary block">Pernoite</strong>
                            <span>
                                {item.valores.pernoite > 0 &&
                                    <PriceView styles={'text-end'} value={item.valores.pernoite} />
                                }
                                {item.valores.pernoite == 0 &&
                                    <>Não realiza</>
                                }
                            </span>
                        </span>
                        <span className="py-5 text-white border-b border-white flex justify-between">
                            <strong className="text-secondary block">Diária de viagem</strong>
                            <span>
                                {item.valores.diaria_viagem > 0 &&
                                    <PriceView styles={'text-end'} value={item.valores.diaria_viagem} />
                                }
                                {item.valores.diaria_viagem == 0 &&
                                    <>Não realiza</>
                                }
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Acompanhante