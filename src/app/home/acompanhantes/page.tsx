'use client'
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InserirAcompanhante from '@/components/InserirAcompanhante';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useEffect, useState } from 'react';
import { Acompanhante } from '@/types/Acompanhante';
import { api } from '@/services/api';
import { Avatar, IconButton, Tooltip } from '@mui/material';
import Star from '@/components/Star';
import Link from 'next/link';
import CollectionsIcon from '@mui/icons-material/Collections';
import ViewGallery from '@/components/ViewGallery';
import { convertTimestampToDate } from '@/services/functions';
import logomarca from '../../../../public/media/images/logo.webp'
import Image from "next/image"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Edit, ImageIcon, Trash2 } from 'lucide-react';

const Page = () => {
    //Variaveis
    const [screen, setScreen] = useState<'search' | 'insert' | 'edit' | 'gallery'>('search')
    const [models, setModels] = useState<Acompanhante[]>([])
    const [currentId, setCurrentId] = useState('')
    const [findModel, setFindModel] = useState('')
    const [searchResult, setSearchResult] = useState<Acompanhante[]>([])
    const [warning, setWarning] = useState(false)
    const [modelsList, setModelsList] = useState<string[]>([])
    const [exitView, setExitView] = useState(false)
    const [warningType, setWarningType] = useState<'suspend' | 'active' | 'delete'>()

    const handleFindEmployee = () => {
        setSearchResult([])

        if (models.length > 0 && findModel) {
            models.forEach((item, index) => {
                if (item.nome.includes(findModel)) {
                    setSearchResult(prev => [...prev, item])
                }
            });
        }

    }

    const updateStatusAtIndex = (index: number, newStatus: boolean) => {
        setModels(prevModels => {
            // Cria uma cópia do array anterior
            const updatedModels = [...prevModels];

            // Verifica se o index é válido
            if (updatedModels[index]) {
                // Cria uma cópia do objeto que queremos atualizar
                const updatedModel = { ...updatedModels[index], status: newStatus };

                // Substitui o objeto antigo pelo novo objeto atualizado
                updatedModels[index] = updatedModel;
            }

            // Retorna o novo array para atualizar o estado
            return updatedModels;
        });
    };

    const removeItemAtIndex = (index: number) => {
        setModels(prevModels => {
            // Verifica se o index é válido
            if (index < 0 || index >= prevModels.length) {
                return prevModels; // Se o index for inválido, retorna o array sem alterações
            }

            // Cria uma cópia do array anterior sem o item no índice especificado
            const updatedModels = prevModels.filter((_, i) => i !== index);

            // Retorna o novo array para atualizar o estado
            return updatedModels;
        });
    };

    useEffect(() => {
        setTimeout(async () => {
            const get = await api.acompanhante.getAll()

            if (get.error) {

            } else if (get.list.length > 0) {
                setModels(get.list)
                setModelsList([])
                setTimeout(() => {
                    get.list.forEach((girl) => {
                        setModelsList(prev => [...prev, girl.nome_social])
                    })
                }, 500)

            }
        })
    }, [])

    const handleAge = (time: any): string => {
        const dateConverted = convertTimestampToDate(time)
        const currentDate = new Date().getFullYear()
        const age = currentDate - dateConverted.getFullYear()

        return age.toString()
    }

    const handleSuspend = async () => {
        const update = await api.acompanhante.suspend(currentId)
        if (update.success) {
            const find = models.findIndex((element) => element.id == currentId)

            if (find >= 0) {
                updateStatusAtIndex(find, false);
            }
        }

        setWarning(false)
    }

    const handleActive = async () => {
        const update = await api.acompanhante.active(currentId)
        if (update.success) {
            const find = models.findIndex((element) => element.id == currentId)

            if (find >= 0) {
                updateStatusAtIndex(find, true);
            }
        }

        setWarning(false)
    }

    const handleDelete = async () => {
        const deleteItem = await api.acompanhante.delete(currentId)
        if (deleteItem.success) {
            const find = models.findIndex((element) => element.id == currentId)

            if (find >= 0) {
                removeItemAtIndex(find);
            }
        }

        setWarning(false)
    }

    return (
        <div className='flex flex-col w-full flex-1'>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="#">
                                    Foxy Lady
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Acompanhantes</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <div className='flex flex-1 flex-col p-4'>
                {warning &&
                    <div className="fixed top-0 left-0 flex justify-center items-center flex-col bg-[rgba(32,35,42,0.5)] w-full h-screen mx-auto my-auto p-10 px-24 gap-5 z-50">
                        {warningType == 'suspend' &&
                            <div className="flex flex-col gap-5 bg-primary rounded-2xl w-full md:w-[60%] p-3 md:p-10">
                                <Image className="h-14 w-fit self-center" src={logomarca} alt="" />
                                <p className='text-white text-lg text-center'>Deseja realmente suspender esta acompanhante?</p>
                                <span className='flex gap-5 self-center'>
                                    <button className='flex px-5 py-1 rounded-full border border-white text-red-600' onClick={() => setWarning(false)}>CANCELAR</button>
                                    <button className='flex px-5 py-1 rounded-full border border-white text-secondary' onClick={handleSuspend}>CONFIRMAR</button>
                                </span>
                            </div>
                        }
                        {warningType == 'active' &&
                            <div className="flex flex-col gap-5 bg-primary rounded-2xl w-full md:w-[60%] p-3 md:p-10">
                                <Image className="h-14 w-fit self-center" src={logomarca} alt="" />
                                <p className='text-white text-lg text-center'>Deseja realmente habilitar esta acompanhante?</p>
                                <span className='flex gap-5 self-center'>
                                    <button className='flex px-5 py-1 rounded-full border border-white text-red-600' onClick={() => setWarning(false)}>CANCELAR</button>
                                    <button className='flex px-5 py-1 rounded-full border border-white text-secondary' onClick={handleActive}>CONFIRMAR</button>
                                </span>
                            </div>
                        }
                        {warningType == 'delete' &&
                            <div className="flex flex-col gap-5 bg-primary rounded-2xl w-full md:w-[60%] p-3 md:p-10">
                                <Image className="h-14 w-fit self-center" src={logomarca} alt="" />
                                <p className='text-white text-lg text-center'>Deseja realmente excluir <strong>permanentemente</strong> esta acompanhante?</p>
                                <p className='text-white text-lg text-center'>Todos os dados inseridos, fotos e vídeos serão perdidos.</p>
                                <span className='flex gap-5 self-center'>
                                    <button className='flex px-5 py-1 rounded-full border border-white text-red-600' onClick={() => setWarning(false)}>CANCELAR</button>
                                    <button className='flex px-5 py-1 rounded-full border border-white text-secondary' onClick={handleDelete}>CONFIRMAR</button>
                                </span>
                            </div>
                        }
                    </div>
                }
                {currentId != '' &&
                    <ViewGallery
                        id={currentId}
                        visible={screen == 'gallery' ? true : false}
                        fn={setScreen}
                    />
                }
                {screen == 'search' &&
                    <>
                        <div className="w-full flex items-center gap-3" style={{ display: screen == 'search' ? 'flex' : 'none' }}>
                            <h1 className='text-3xl font-semibold'>Acompanhantes</h1>
                        </div>
                        <div className='flex w-full flex-col flex-1 mt-12'>
                            <ul className='w-full h-full flex flex-col'>
                                <li className='flex w-full border-b border-neutral-200 py-4 font-semibold text-[#191919] bg-gray-100 rounded-t'>
                                    <span className='flex-[0.5] text-center text-[14px]'>Perfil</span>
                                    <span className='flex-[0.5] text-center text-[14px]'><StarIcon color='warning' /></span>
                                    <span className='flex-[2] text-center text-[14px]'>Nome</span>
                                    <span className='flex-1 text-center text-[14px]'>Idade</span>
                                    <span className='flex-1 text-center text-[14px]'>Whatsapp</span>
                                    <span className='flex-1 text-center text-[14px]'>Plano</span>
                                    <span className='flex-[1] text-center text-[14px]'>Ações</span>
                                </li>
                                {models.length > 0 &&
                                    models.map((item, index) => {
                                        return (
                                            <li key={index} className='flex items-center w-full border-b border-neutral-200 py-2  text-[#191919]'>
                                                <span className='flex-[0.5] text-center text-[14px] flex justify-center'>
                                                    <Avatar className='h-16 w-16' src={item.midia.perfil} alt={item.nome_social} />
                                                </span>
                                                <span className='flex-[0.5] text-center text-[14px]'>
                                                    <Star id={item.id} destaque={item.destaque} />
                                                </span>
                                                <span className='flex-[2] text-center text-[14px]'>{item.nome_social}</span>
                                                <span className='flex-1 text-center text-[14px]'>
                                                    {handleAge(item.nascimento)}
                                                </span>
                                                <span className='flex-1 text-center text-[14px]'>{item.whatsapp}</span>
                                                <span className='flex-1 text-center text-[14px]'>{item.plano}</span>
                                                <span className='flex-[1] text-center text-[14px] gap-3 flex justify-center'>
                                                    <Link href={`/home/acompanhantes/edit/${item.id}`}>
                                                        <Tooltip title='Editar'>
                                                            <IconButton>
                                                               <Edit />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Link>
                                                    <Tooltip title='Galeria'>
                                                        <IconButton onClick={() => {
                                                            setCurrentId(item.id)
                                                            setScreen('gallery')
                                                        }}>
                                                            <ImageIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    {item.status ? (
                                                        <Tooltip title='Suspender'>
                                                            <IconButton onClick={() => {
                                                                setCurrentId(item.id)
                                                                setWarningType('suspend')
                                                                setWarning(true)
                                                            }}>
                                                                <img
                                                                    className='h-5 w-5'
                                                                    src="/media/icons/suspend.svg"
                                                                    alt=""
                                                                />
                                                            </IconButton>
                                                        </Tooltip>
                                                    ) : (
                                                        <Tooltip title='Habilitar'>
                                                            <IconButton onClick={() => {
                                                                setCurrentId(item.id)
                                                                setWarningType('active')
                                                                setWarning(true)
                                                            }}>
                                                                <img
                                                                    className='h-5 w-5'
                                                                    src="/media/icons/checked.svg"
                                                                    alt=""
                                                                />
                                                            </IconButton>
                                                        </Tooltip>
                                                    )}
                                                    <Tooltip title='Deletar'>
                                                        <IconButton onClick={() => {
                                                            setCurrentId(item.id)
                                                            setWarningType('delete')
                                                            setWarning(true)
                                                        }}>
                                                            <Trash2 />
                                                        </IconButton>
                                                    </Tooltip>
                                                </span>
                                            </li>
                                        )
                                    })
                                }

                            </ul>
                        </div>
                    </>
                }
            </div>

        </div>
    )
}

export default Page