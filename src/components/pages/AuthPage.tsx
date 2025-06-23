
'use client'
import Image from "next/image"
import Main from "@/components/Main"
import logomarca from '../../../public/media/images/logo.webp'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { FormEvent, useState } from "react";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";

const AuthPage = () => {
    //Router
    const router = useRouter()
    //Variaveis
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        const form = new FormData(event.currentTarget)
        const email: string = form.get('input-email') as string
        const senha: string = form.get('input-senha') as string

        const login = await api.auth.signIn(email, senha)

        if (login.error) {

        } else {
            router.push('/home/acompanhantes')
        }
    }

    return (
        <Main>

            <section className="flex items-center justify-center flex-col bg-[#20232a] w-full h-full mx-auto my-auto p-10 px-24 gap-5">
                <Image className="h-14 w-fit self-center" src={logomarca} alt="" />
                <h1 className="text-bold text-3xl text-center text-white">Login | Área Exclusiva de Acesso</h1>
                <h2 className="text-light text-center text-white">Página de acesso exclusivo da Foxy Lady, site de acompanhantes de luxo</h2>
                <p className="text-light text-center text-white w-full md:w-1/2">Bem-vindo à área de acesso exclusivo da Foxy Lady. Esta seção é destinada apenas a membros e administradores da plataforma. Faça login para gerenciar sua conta e acessar recursos restritos com total segurança.</p>
                <form
                    className="flex flex-col w-full md:w-1/3 gap-5"
                    onSubmit={e => {
                        e.preventDefault()
                        handleSubmit(e)
                    }}>
                    <input
                        required
                        name='input-email'
                        type="text"
                        className="w-full text-white font-semibold text-sm bg-[#3D435B] rounded-full px-5 py-3 placeholder:text-white placeholder:font-semibold"
                        placeholder="E-MAIL"
                    />
                    <span className="flex items-center justify-end w-full h-fit relative">
                        <input
                            required
                            name='input-senha'
                            className="w-full text-white font-semibold text-sm bg-[#3D435B] rounded-full px-5 py-3 placeholder:text-white placeholder:font-semibold"
                            placeholder="SENHA"
                            type={showPassword ? 'text' : 'password'}

                        />
                        <span className="absolute w-fit px-5">
                            {showPassword &&
                                <VisibilityOffIcon sx={{ color: '#fff', cursor: 'pointer' }} onClick={() => setShowPassword(false)} />
                            }
                            {!showPassword &&
                                <VisibilityIcon sx={{ color: '#fff', cursor: 'pointer' }} onClick={() => setShowPassword(true)} />
                            }
                        </span>
                    </span>
                    <span className="flex justify-end">
                        <button type="submit" className="flex justify-center items-center w-full py-2 border border-secondary bg-secondary hover:bg-secondary-h font-semibold px-8 text-center text-white cursor-pointer uppercase font-semibols text-[12px] rounded-full">
                            FAZER LOGIN
                        </button>
                    </span>
                    <span className="text-white text-center cursor-pointer">Esqueci minha senha</span>
                </form>
            </section>
        </Main>
    )
}

export default AuthPage