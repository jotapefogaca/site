'use client'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotesIcon from '@mui/icons-material/Notes';
import { useEffect, useState } from 'react';
import { Mail } from '@/types/Mail';
import { api } from '@/services/api';
import Mailbox from '@/components/Mailbox';

const Page = () => {
    //Variaveis
    const [mails, setMails] = useState<Mail[]>([])
    const [currentIndex, setCurrentIndex] = useState(-1)

    useEffect(() => {
        setTimeout(async () => {
            const getMails = await api.mail.get()

            if (getMails.error) {

            } else if (getMails.mails.length > 0) {
                setMails(getMails.mails)
            }
        })
    })
    return (
        <div className='flex flex-col w-full flex-1'>
            <h1 className='text-3xl font-semibold text-center my-6'>Caixa de Entrada</h1>
            <div className='flex border flex-1 w-full rounded-sm'>
                <div className='w-96 border-r h-full'>
                    {mails.length > 0 &&
                        mails.map((item, index) => {
                            return (
                                <Mailbox key={index} data={item} onClick={()=>setCurrentIndex(index)} />
                            )
                        })
                    }
                </div>
                <div className='flex-1 h-full p-5 bg-gray-50'>
                    {currentIndex >= 0 &&
                        <div className='flex flex-col p-5 w-full h-full border bg-white gap-1'>
                            <span className='flex gap-2 items-center py-1'>
                                <AccountCircleIcon />
                                <strong className='text-lg'>{mails[currentIndex].name}</strong>
                            </span>
                            <span className='flex gap-2 items-center py-1'>
                                <MailOutlineIcon />
                                <p>{mails[currentIndex].email}</p>
                            </span>
                            <span className='flex gap-2 items-center py-1'>
                                <LocalPhoneIcon />
                                <p>{mails[currentIndex].phone}</p>
                            </span>
                            <hr />
                            <span className='flex gap-2 items-center py-1 justify-center'>
                                <NotesIcon />
                                <p>Mensagem</p>
                            </span>
                            <p>{mails[currentIndex].message}</p>
                        </div>
                    }

                </div>
            </div>
        </div>
    )
}

export default Page