'use client'
import Header from "@/components/Header"
import ViewHtml from "@/components/ViewHtml"
import { api } from "@/services/api"
import { Post } from "@/types/Post"
import { useEffect, useState } from "react"
import Image from "next/image"
import parse from 'html-react-parser';
//Images
import Link from "next/link"
import Footer from "@/components/Footer"
import Main from "../Main"

type Props = {
    id: string
}

const Publication = ({ id }: Props) => {
    const [post, setPost] = useState<Post>()
    const [posts, setPosts] = useState<Post[]>([])
    const phone = "5511933595005";

    function formatWhatsAppMessage(phone: string, message: string): string {
        const formattedMessage = encodeURIComponent(message);
        return `https://api.whatsapp.com/send?phone=${phone}&text=${formattedMessage}`;
    }

    useEffect(() => {
        setTimeout(async () => {
            let get = await api.post.getByLinkname(id)

            if (get.success) {
                if (get.post) {
                    setPost(get.post)

                }
            }
        })
        setTimeout(async () => {
            const get = await api.post.get()

            if (get.success) {
                setPosts(get.data)
            }
        })
    }, [])

    return (
        <Main className="bg-primary">
            <Header />
            <section className='flex flex-col px-5 md:px-[180px] my-10 bg-primary'>
                <h1 id='title' className="text-4xl font-bold mb-3 text-secondary">{post?.title}</h1>
                <h2 className="text-lg text-justify text-gray-300">{post?.description}</h2>
                {post &&
                    <div className="my-12 flex font-light text-gray-50">
                        <p>Data de publicação: {api.functions.timestampToDate(post.created)} | Escrito por: {post?.autor}</p>
                    </div>
                }
                {post != undefined && (
                    <>
                        <div className=" text-white">
{/*                             <img
                                src={post.image}
                                alt={post.title}
                                className="image-left w-1/2 aspect-square object-cover rounded-lg"
                            /> */}
                            {parse(post!.content)}
                        </div>
                    </>
                )}
            </section>
            <hr className='mx-[180px] mb-3' />
            <section className='flex flex-col items-center justify-center px-5 md:px-[200px]'>
                <h3 className="mb-[65px] text-secondary font-bold text-3xl text-center pt-20">Últimas Publicações</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                    {posts.map((item, index) => {
                        return (
                            <Link key={index} href={`/post/${item.linkname}`} className="flex flex-col">
                                <img
                                    className="border border-secondary rounded-md w-full aspect-square mb-3 object-cover p-3"
                                    src={item.image}
                                    alt={item.title}
                                />
                                <h2 className="text-2xl text-secondary font-semibold mb-3 hover:underline">{item.title}</h2>
                            </Link>
                        )
                    })}
                </div>
                <Link href={'/blog'} className="flex self-center w-fit p-2 px-4 border border-secondary text-center text-white cursor-pointer uppercase font-semibols text-[12px] rounded-full my-10">
                    VER TODAS AS PUBLICAÇÕES
                </Link>
            </section>
            <Footer />
        </Main>
    )
}

export default Publication