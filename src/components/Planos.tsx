import Image from "next/image"
import Link from "next/link"
import plus from '../../public/media/icons/plus.svg'

const Planos = () => {
    return (
        <section id='Planos' className="w-full flex flex-col items-center py-32 px-5 md:px-[200px]">
            <div className="grid md:grid-cols-3 gap-7 w-full h-fit items-center">
                <div className="w-full rounded-lg bg-secondary flex flex-col p-5 gap-3 transition-all ease-in-out duration-300 h-full md:h-[540px] justify-between">
                    <div className='flex flex-col gap-3'>
                        <h3 className="text-white text-center text-3xl font-bold py-4">Plano Bronze</h3>
                        <hr />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <span className="flex gap-3">
                            <Image src={plus} alt="" />
                            <p className='text-white font-extralight text-sm'>Anúncio como Foxy Lady girl</p>
                        </span>
                        <span className="flex gap-3">
                            <Image src={plus} alt="" />
                            <p className='text-white font-extralight text-sm'>Upload de 20 fotos por modelo</p>
                        </span>
                        <span className="flex gap-3">
                            <Image src={plus} alt="" />
                            <p className='text-white font-extralight text-sm'>Upload de 2 vídeos de até 1:30min por modelo</p>
                        </span>

                        <span className="flex gap-3">
                            <Image src={plus} alt="" />
                            <p className='text-white font-extralight text-sm'>KPI&apos;s mensais da página de anúncio</p>
                        </span>
                    </div>
                    {/* <span className="flex gap-3">
                        <Image src={plus} alt="" />
                        <p className='text-white font-extralight text-sm'>5% de desconto na sexshop parceira</p>
                    </span> */}
                    <span className="flex-1 mt-5 flex flex-col items-center justify-end gap-1">
                        <p className='text-primary font-extralight text-sm'>Assinatura Trimestral</p>
                        <p className='text-primary font-extralight text-sm line-through'>R$ 150,00</p>
                        <strong className="text-3xl text-primary">GRÁTIS</strong>
                        <Link href={'https://api.whatsapp.com/send?phone=5515998504995&text=Ol%C3%A1,%20gostaria%20de%20adquirir%20o%20plano%20BRONZE%20da%20plataforma%20Foxy%20Lady'} target="_blank" className="flex justify-center items-center w-[150px] py-2 border border-primary bg-primary text-center text-white cursor-pointer uppercase font-semibols text-[12px] rounded-full">
                            QUERO CONTRATAR
                        </Link>
                    </span>
                </div>
                <div className="w-full rounded-lg bg-secondary flex flex-col p-5 gap-3 transition-all ease-in-out duration-300 h-full md:h-[590px] relative justify-between">
                    <span id='promotional' className="w-[130px] h-[130px] absolute -top-2 -left-2 flex justify-center items-center overflow-hidden" />
                    <div className='flex flex-col gap-3'>
                        <h3 className="text-white text-center text-3xl font-bold py-4">Plano Prata</h3>
                        <hr />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <span className="flex gap-3">
                            <Image src={plus} alt="" />
                            <p className='text-white font-extralight text-sm'>Todos os benefícios do Plano Bronze</p>
                        </span>
                        <span className="flex gap-3">
                            <Image src={plus} alt="" />
                            <p className='text-white font-extralight text-sm'>Upload de 40 fotos por modelo</p>
                        </span>
                        <span className="flex gap-3">
                            <Image src={plus} alt="" />
                            <p className='text-white font-extralight text-sm'>Upload de 4 vídeos de até 1:30min por modelo</p>
                        </span>
                        <span className="flex gap-3">
                            <Image src={plus} alt="" />
                            <p className='text-white font-extralight text-sm'>Destaque da cidadee</p>
                        </span>
                    </div>
                    <span className="flex-1 mt-5 flex flex-col items-center justify-end gap-1">
                        <p className='text-primary font-extralight text-sm'>Assinatura Trimestral</p>
                        <p className='text-primary font-extralight text-sm line-through'>R$ 250,00</p>
                        <strong className="text-3xl text-primary">R$ 125 / mês</strong>
                        <Link href={'https://api.whatsapp.com/send?phone=5515998504995&text=Ol%C3%A1,%20gostaria%20de%20adquirir%20o%20plano%20PRATA%20da%20plataforma%20Foxy%20Lady'} target="_blank" className="flex justify-center items-center w-[150px] py-2 border border-primary bg-primary text-center text-white cursor-pointer uppercase font-semibols text-[12px] rounded-full">
                            QUERO CONTRATAR
                        </Link>
                    </span>

                </div>
                <div className="w-full rounded-lg bg-secondary flex flex-col p-5 gap-3 transition-all ease-in-out duration-300 h-full md:h-[540px]">
                    <div className='flex flex-col gap-3'>
                        <h3 className="text-white text-center text-3xl font-bold py-4">Plano Ouro</h3>
                        <hr />
                    </div>
                    <div className='flex flex-col gap-3'>

                    </div>
                    <span className="flex gap-3">
                        <Image src={plus} alt="" />
                        <p className='text-white font-extralight text-sm'>Todos os benefícios do Plano Prata</p>
                    </span>
                    <span className="flex gap-3">
                        <Image src={plus} alt="" />
                        <p className='text-white font-extralight text-sm'>Upload de 60 fotos por modelo</p>
                    </span>
                    <span className="flex gap-3">
                        <Image src={plus} alt="" />
                        <p className='text-white font-extralight text-sm'>Upload de 6 vídeos de até 1:30min por modelo</p>
                    </span>
                    <span className="flex gap-3">
                        <Image src={plus} alt="" />
                        <p className='text-white font-extralight text-sm'>Vídeo entrevista disponível na página da modelo</p>
                    </span>
                    <span className="flex gap-3">
                        <Image src={plus} alt="" />
                        <p className='text-white font-extralight text-sm'>Destaque da Cidade durante o trimestre</p>
                    </span>
                    {/* <span className="flex gap-3">
                        <Image src={plus} alt="" />
                        <p className='text-white font-extralight text-sm'>15% de desconto na sexshop parceira</p>
                    </span> */}
                    <span className="flex-1 mt-5 flex flex-col items-center justify-end gap-1">
                        <p className='text-primary font-extralight text-sm'>Assinatura Trimestral</p>
                        <p className='text-primary font-extralight text-sm line-through'>R$ 400,00</p>
                        <strong className="text-3xl text-primary">R$ 200 / mês</strong>
                        <Link href={'https://api.whatsapp.com/send?phone=5515998504995&text=Ol%C3%A1,%20gostaria%20de%20adquirir%20o%20plano%20OURO%20da%20plataforma%20Foxy%20Lady'} target="_blank" className="flex justify-center items-center w-[150px] py-2 border border-primary bg-primary text-center text-white cursor-pointer uppercase font-semibols text-[12px] rounded-full">
                            QUERO CONTRATAR
                        </Link>
                    </span>

                </div>
            </div>
        </section>
    )
}

export default Planos