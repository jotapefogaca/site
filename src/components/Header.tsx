'use client'
//Next Components
import Image from "next/image"
import Link from "next/link"
//Images
import logomarca from '../../public/media/images/logo.webp'
import locale from '../../public/media/icons/location.svg'
import MenuIcon from '@mui/icons-material/Menu';
//MUI Components
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { IconButton } from "@mui/material"
import adult from "@icons/adult.svg"

type Props = {
    location?: 'Campinas - SP' | 'Sorocaba - SP' | 'Londrina - PR'
}

const Header = ({ location }: Props) => {
    //Pathname
    const path = usePathname()
    const router = useRouter();
    //Variaveis
    const [open, setOpen] = useState(false);
    const [warning, setWarning] = useState(false)
    const [city, setCity] = useState('')
    const [viewChange, setViewChange] = useState(false)

    useEffect(() => {
        if (location) {
            setCity(location);
        } else {
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
        }
    }, []);

    const handleSetCity = (cidade: string) => {
        document.cookie = `userLocation=${cidade}; path=/; samesite=strict`;
        setCity(cidade);
        switch (cidade) {
            case 'Campinas - SP':
                router.push('/acompanhantes/campinas');
                break;
            case 'Sorocaba - SP':
                router.push('/acompanhantes/sorocaba');
                break;
        }
        setViewChange(false);
    };

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    return (
        <header className="flex items-center justify-between px-6 py-3 md:px-[200px] w-full bg-primary">
            <Link href={'/'}>
                <Image
                    src={logomarca}
                    alt="Logomarca Wildcats"
                    loading="lazy"
                    height={70}
                />
            </Link>
            <IconButton sx={{ display: { md: 'none' } }}>
                <MenuIcon sx={{ color: '#D8A963' }} onClick={toggleDrawer(true)} />
            </IconButton>

            <div className="hidden md:flex items-center gap-10">
                <nav className="flex">
                    <ul className="flex item-center gap-10 text-white uppercase font-light text-[12px]">
                        <li>
                            <Link href={'/'}>ACOMPANHANTES</Link>
                        </li>
                        <li style={{ color: path.includes('/sobre') ? '#d8a963' : '#FFF' }}>
                            <Link href={'/sobre'}>SOBRE NÓS</Link>
                        </li>
                        <li style={{ color: path.includes('/contato') ? '#d8a963' : '#FFF' }}>
                            <Link href={'/contato'}>CONTATO</Link>
                        </li>
                    </ul>
                </nav>
                <div className="flex items-center gap-5">
                    <button type='button' className="flex justify-center items-center w-[150px] py-2 bg-secondary border border-secondary text-center text-white cursor-pointer uppercase font-semibold text-[12px] rounded-full transition-none ease-out duration-300 hover:bg-secondary-h relative">
                        <span className="flex justify-center items-center" onClick={() => setViewChange(true)}>
                            <Image className="h-[16px] w-fit text-white mr-5" src={locale} alt="Icone Localização" />
                            {city}
                        </span>
                        <ul className="w-full absolute bg-white flex flex-col top-10 z-20 rounded-md border-secondary text-black divide-y transition-all ease-in-out" style={{ display: viewChange ? 'flex' : 'none', opacity: viewChange ? 100 : 0 }}>
                            <span className="flex justify-center items-center py-2 hover:bg-gray-50 transition-all ease-in-out rounded-t-md" onClick={() => handleSetCity('Campinas - SP')}>
                                Campinas - SP
                            </span> 
                            <span className="flex justify-center items-center py-2 hover:bg-gray-50 transition-all ease-in-out rounded-b-md" onClick={() => handleSetCity('Sorocaba - SP')}>
                                Sorocaba - SP
                            </span>
                        </ul>
                    </button>
                    <Link href={'/sobre#Planos'} className="flex justify-center items-center w-[150px] py-2 border border-secondary text-center text-white cursor-pointer uppercase font-semibols text-[12px] rounded-full">
                        QUERO ANUNCIAR
                    </Link>
                </div>
            </div>

            <Drawer open={open} onClose={toggleDrawer(false)} >
                <Box role="presentation" sx={{ backgroundColor: '#272b37', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Image className="h-[100px] w-fit pt-5 self-center" src={logomarca} alt="Logomarca Wildcats" />
                    <List>
                        <ListItem>
                            <ListItemButton>
                                <button type='button' className="flex justify-center items-center w-[200px] py-2 bg-secondary border border-secondary text-center text-white cursor-pointer uppercase font-semibold text-[12px] rounded-full transition-none ease-out duration-300 hover:bg-secondary-h relative">
                                    <span className="flex justify-center items-center" onClick={() => setViewChange(true)}>
                                        <Image className="h-[16px] w-fit text-white mr-5" src={locale} alt="Icone Localização" />
                                        {city}
                                    </span>
                                    <ul className="w-full absolute bg-white flex flex-col top-10 z-20 rounded-md border-secondary text-black divide-y transition-all ease-in-out" style={{ display: viewChange ? 'flex' : 'none', opacity: viewChange ? 100 : 0 }}>
                                        <span className="flex justify-center items-center py-2 hover:bg-gray-50 transition-all ease-in-out rounded-t-md">
                                            Campinas - SP
                                        </span>{/* 
                                        <span className="flex justify-center items-center py-2 hover:bg-gray-50 transition-all ease-in-out rounded-b-md" onClick={() => handleSetCity('Sorocaba - SP')}>
                                            Sorocaba - SP
                                        </span>
                                        <span className="flex justify-center items-center py-2 hover:bg-gray-50 transition-all ease-in-out rounded-b-md" onClick={() => handleSetCity('Londrina - PR')}>
                                            Londrina - PR
                                        </span> */}
                                    </ul>
                                </button>
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton>
                                <Link href={'/sobre#Planos'} className="flex justify-center items-center w-[200px] py-2 border border-secondary text-center text-white cursor-pointer uppercase font-semibols text-[12px] rounded-full">
                                    QUERO ANUNCIAR
                                </Link>
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton>
                                <Link href={'/'} className="flex justify-center items-center w-[200px] py-2 border border-secondary text-center text-white cursor-pointer uppercase font-semibols text-[12px] rounded-full">
                                    ACOMPANHANTES
                                </Link>
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton>
                                <Link href={'/sobre'} className="flex justify-center items-center w-[200px] py-2 border border-secondary text-center text-white cursor-pointer uppercase font-semibols text-[12px] rounded-full">
                                    SOBRE NÓS
                                </Link>
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton>
                                <Link href={'/contato'} className="flex justify-center items-center w-[200px] py-2 border border-secondary text-center text-white cursor-pointer uppercase font-semibols text-[12px] rounded-full">
                                    CONTATO
                                </Link>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </header>
    )
}

export default Header