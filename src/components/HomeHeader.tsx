'use client'
import { IconButton } from '@mui/material'
import logomarca from '../../public/media/images/logo.webp'
import Image from "next/image"
import Link from 'next/link'
import LogoutIcon from '@mui/icons-material/Logout';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import { api } from '@/services/api'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const HomeHeader = () => {
    //Router
    const router = useRouter()
    const [exitView, setExitView] = useState(false)
    //Handlers
    const handleSigout = async () => {
        const logout = await api.auth.signOut()

        if (logout.error) {

        } else {
            router.push('/auth')
        }
    }

    return (
        <header className="flex justify-between px-14 bg-primary text-white ">
            {exitView &&
                <div className="fixed top-0 left-0 flex justify-center items-center flex-col bg-[rgba(32,35,42,0.5)] w-full h-screen mx-auto my-auto p-10 px-24 gap-5 z-50">
                    <div className="flex flex-col gap-5 bg-primary rounded-2xl w-full md:w-[60%] p-3 md:p-10">
                        <Image className="h-14 w-fit self-center" src={logomarca} alt="" />
                        <p className='text-white text-lg text-center'>Deseja realmente sair da plataforma?</p>
                        <span className='flex gap-5 self-center'>
                            <button className='flex px-5 py-1 rounded-full border border-white text-red-600' onClick={()=>setExitView(false)}>CANCELAR</button>
                            <button className='flex px-5 py-1 rounded-full border border-white text-secondary' onClick={handleSigout}>SAIR</button>
                        </span>
                    </div>
                </div>
            }
            <Link href='/home/acompanhantes'>
                <Image className='h-[100px] w-fit my-2' src={logomarca} alt="Logomarca Wildcats" />
                <p className='hidden'>Acompanhantes</p>
            </Link>
            <nav className='flex gap-8 items-center'>
                <ul className='flex gap-5 text-[12px] font-light h-full'>
                    <li className='h-full flex items-center border-4 border-transparent border-b-secondary'>
                        <Link href='/home/acompanhantes'>ACOMPANHANTES</Link>
                    </li>
                </ul>
                <ul className='flex gap-5 text-[12px] font-light h-full'>
                    <li className='h-full flex items-center border-4 border-transparent border-b-secondary'>
                        <Link href='/home/blog'>BLOG</Link>
                    </li>
                </ul>
                <Link href={'/home/mail'}>
                    <IconButton>
                        <Badge badgeContent={0} color="info" variant="dot">
                            <MailIcon sx={{ color: '#fff' }} />
                        </Badge>
                    </IconButton>
                </Link>
                <IconButton onClick={()=>setExitView(true)}>
                    <LogoutIcon sx={{ color: '#fff', fontSize: '16px' }} />
                </IconButton>
            </nav>
        </header>
    )
}

export default HomeHeader