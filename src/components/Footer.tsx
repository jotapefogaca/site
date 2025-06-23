import Link from "next/link"
import Image from "next/image"
import logomarca from '../../public/media/images/logo.webp'
import instagram from '../../public/media/icons/instagram.svg'
import facebook from '../../public/media/icons/facebook.svg'
import linkedin from '../../public/media/icons/linkedin.svg'
import twitter from '../../public/media/icons/twitter-x.svg'

const Footer = () => {
    return (
        <footer className="w-full h-fit pb-32 bg-primary">
            <hr className="mb-10" />
            <div className="flex flex-col md:flex-row h-full w-full md:divide-x px-5 md:px-[200px]">
                <div className="flex flex-col flex-[2] md:pr-10 gap-10">
                    <strong className="text-secondary text-center md:text-left">Sobre a Foxy Lady</strong>
                    <p className="text-white font-light text-sm text-center md:text-left">Foxy Lady é a melhor plataforma de anúncios de acompanhantes de São Paulo. Nossa missão é organizar e dignificar o mercado de acompanhantes no interior de São Paulo.</p>
                </div>
                <nav className="hidden md:flex flex-col flex-1 pr-10 h-full">
                    <ul className="flex h-full flex-col px-5 justify-around text-white uppercase font-light text-[12px]">
                        <li>
                            <Link href={'/'}>ACOMPANHANTES</Link>
                        </li>
                        <li>
                            <Link href={'/sobre'}>SOBRE NÓS</Link>
                        </li>
                        <li>
                            <Link href={'/contato'}>CONTATO</Link>
                        </li>
                        <li>
                            <Link href={'/login'}>LOGIN</Link>
                        </li>
                    </ul>
                </nav>
                <div className="flex flex-col justify-center flex-[2] md:pl-10 gap-5">
                    <Image
                        className="w-fit self-center md:self-auto"
                        src={logomarca}
                        alt="Logomarca Widlcats"
                        height={100}
                        loading="lazy"
                    />
                    <span className="flex items-center justify-between gap-5 self-center md:self-auto">
                        <Link href={"https://www.tiktok.com/@foxylady_ofc"} target="_blank">
                            <Image
                                width={32}
                                height={32}
                                src={linkedin}
                                alt={"TikTok"}
                                loading="lazy"
                            />
                        </Link>
                        <Link href={"https://www.instagram.com/foxylady.ofc/"} target="_blank">
                            <Image
                                width={32}
                                height={32}
                                src={instagram}
                                alt={"Instagram"}
                                loading="lazy"
                            />
                        </Link>

                        <Link href={"https://www.reddit.com/user/Plastic-Neck-4443/"} target="_blank">
                            <Image
                                width={32}
                                height={32}
                                src={facebook}
                                alt={"Reddit"}
                                loading="lazy"
                            />
                        </Link>
                        <Link href={"https://x.com/FoxyLady_ofc"} target="_blank">
                            <Image
                                width={32}
                                height={32}
                                src={twitter}
                                alt={"Twitter"}
                                loading="lazy"
                            />
                        </Link>
                    </span>
                </div>
            </div>
        </footer>
    )
}

export default Footer