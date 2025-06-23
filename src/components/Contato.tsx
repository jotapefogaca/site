import Image from "next/image"
import Link from "next/link"
import whatsLight from '../../public/media/icons/whatsapp_light.svg'
import { FormEvent, useState } from "react"
import { api } from "@/services/api"
import { Mail } from "@/types/Mail"
import banner_destaques from '@images/banner_home.jpg'

type Props = {
    label: 'Contato' | 'Fale Conosco'
}

const Contato = ({ label }: Props) => {
    //Variaveis
    const [send, setSend] = useState(false)
    const [formKey, setFormkey] = useState(0)

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        const form = new FormData(event.currentTarget)
        const usuario = form.get('name') as string
        const email = form.get('email') as string
        const contato = form.get('phone') as string
        const mensagem = form.get('message') as string
        const subject = form.get('subject') as string

        const date = new Date()

        const sending = await api.sendNotification(email, usuario, mensagem, contato)

        if (sending.error) {

        } else {
            setSend(true)
            setTimeout(() => {
                setSend(false)
            }, 3000)
            setFormkey(formKey + 1)
            let mail: Mail = {
                id: "",
                name: usuario,
                email: email,
                phone: contato,
                message: mensagem,
                subject: subject,
                status: {
                    read: false,
                    received: date
                }
            }

            await api.mail.register(mail)
        }
    }

    return (
        <section className="w-full flex flex-col items-center pb-20 bg-primary">
            <Image 
                className='w-full' 
                src={banner_destaques} 
                alt='Banner Destaques Wildcats' 
                loading='lazy'
                quality={50}
            />
            <div className='flex gap-10 md:gap-20 flex-col md:flex-row md:justify-between items-center w-full mb-10 md:mb-32  px-5 md:px-[200px] pt-10'>
                <h1 className="text-white text-5xl font-bold">{label}</h1>
                <p className="text-white text-[14px] font-light text-center">Preencha os espaços abaixo com seu nome, telefone e e-mail para que possamos receber sua solicitação e ler a sua mensagem. <br /> A Foxy Lady se compromete á responder a sua mensagem e sanar as suas dúvidas.</p>
            </div>
            <div className="flex flex-col gap-10 md:gap-0 md:flex-row w-full  px-5 md:px-[200px]">
                <div className="md:w-1/2 flex flex-col gap-5">
                    <strong className="text-secondary">E-mail:</strong>
                    <p className="text-white font-light text-sm">contato@foxylady.com.br</p>
                    <strong className="text-secondary">Telefone:</strong>
                    <p className="flex items-center text-white font-light text-sm">
                        <Image 
                            width={20}
                            height={20}
                            loading="lazy"
                            className="mr-3" 
                            src={whatsLight} 
                            alt="Whatsapp" 
                        />
                        <span>&#40;15&#41; 99850-4995</span>
                    </p>
                    <Link href={'https://wa.link/esbli6'} target='_blank' className="flex justify-center items-center w-fit py-2 border border-white font-semibold px-8 text-center text-white cursor-pointer uppercase font-semibols text-[12px] rounded-full">
                        Chame no Whatsapp
                    </Link>
                </div>
                <div className="md:w-1/2">
                    <form
                        key={formKey}
                        className="flex flex-col w-full gap-3"
                        onSubmit={e => {
                            e.preventDefault()
                            handleSubmit(e)
                        }}>
                        <input
                            required
                            type="text"
                            name='name'
                            className="w-full text-white font-semibold text-sm bg-[#3D435B] rounded-full px-5 py-3 placeholder:text-white placeholder:font-semibold"
                            placeholder="NOME"
                        />
                        <input
                            required
                            type="email"
                            name='email'
                            className="w-full text-white font-semibold text-sm bg-[#3D435B] rounded-full px-5 py-3 placeholder:text-white placeholder:font-semibold"
                            placeholder="E-MAIL"
                        />
                        <input
                            required
                            type="text"
                            name='phone'
                            className="w-full text-white font-semibold text-sm bg-[#3D435B] rounded-full px-5 py-3 placeholder:text-white placeholder:font-semibold"
                            placeholder="TELEFONE"
                        />
                        <select
                            defaultValue={'disabled'}
                            required
                            name='subject'
                            className="w-full text-white font-semibold text-sm bg-[#3D435B] rounded-full px-5 py-3 placeholder:text-white placeholder:font-semibold uppercase"
                        >
                            <option value="disabled">Selecione um assunto</option>
                            <option value="Elogio">Elogio</option>
                            <option value="Dúvida">Dúvida</option>
                            <option value="Sugestão">Sugestão</option>
                            <option value="Reclamação">Reclamação</option>
                        </select>
                        <textarea
                            required
                            rows={5}
                            name="message"
                            className="w-full text-white font-semibold text-sm bg-[#3D435B] rounded-lg px-5 py-3 placeholder:text-white placeholder:font-semibold"
                            placeholder="MENSAGEM"
                            style={{ resize: 'none' }}
                        />
                        <span className="flex justify-end">
                            {!send &&
                                <button type="submit" className="flex justify-center items-center w-full md:w-fit py-2 border border-secondary bg-secondary hover:bg-secondary-h font-semibold px-8 text-center text-white cursor-pointer uppercase font-semibols text-[12px] rounded-full">
                                    ENVIAR
                                </button>
                            }
                            {send &&
                                <button className="flex justify-center items-center w-full md:w-fit py-2 border border-green-400 bg-green-400 hover:bg-green-600 font-semibold px-8 text-center text-white cursor-pointer uppercase font-semibols text-[12px] rounded-full">
                                    ENVIADO COM SUCESSO!
                                </button>
                            }
                        </span>
                    </form>
                </div>
            </div>
            <p className="text-[10px] font-extralight text-center">Faça parte da melhor plataforma de acompanhantes do interior de São Paulo. Aproveite nossa promoção de lançamento e desfrute do primeiro mês gratuitamente. Seja uma acompanhante Foxy Lady, e aproveito os benefícios.</p>
            <h2 className="text-center">Contato - Foxy Lady</h2>
        </section>
    )
}

export default Contato