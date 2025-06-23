'use client'
import Contato from "@/components/Contato";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HomeBanner from "@/components/HomeBanner";
import HomeDestaques from "@/components/HomeDestaques";
import Main from "@/components/Main";
import MinScreen from "@/components/MinScreen";
import { api } from "@/services/api";
import { Post } from "@/types/Post";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import star from '@icons/star.svg'
import parse from 'html-react-parser';
import { Metadata } from "next";



const BlogPage = () => {
    const [started, setStarted] = useState(false)
    const [view, setView] = useState(false)
    const [ads, setAds] = useState(true)
    const [posts, setPosts] = useState<Post[]>([])
    const [lastedPosts, setLastedPosts] = useState<Post[]>([])
    const [focusedIndex, setFocusedIndex] = useState(-1)

    useEffect(() => {
        if (started) {
            setTimeout(async () => {
                const get = await api.post.get()

                if (get.success) {
                    setFocusedIndex(get.data.findIndex((element) => element.focus === true))
                    setPosts(get.data)
                }
            })
            setTimeout(async () => {
                const get = await api.post.getLasteds()

                if (get.success) {
                    setFocusedIndex(get.data.findIndex((element) => element.focus === true))
                    setLastedPosts(get.data)
                }
            })
        } else {
            setStarted(true)
        }
    }, [started])

    return (
        <Main>
            <MinScreen>
                <Header />
                <section className='flex flex-col items-center justify-center px-5 md:px-[200px]'>
                    <h1 className="mb-[65px] text-secondary font-bold text-3xl text-center pt-20">Publicações Blog Foxy Lady | Acompanhantes de Luxo</h1>
                    <h3 className="text-secondary font-bold text-3xl text-center pt-2">Publicações</h3>
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
                <Contato label="Contato" />
                <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 h-[250px] w-fit z-50" style={{ display: ads ? 'block' : 'none' }}>
                    <button className="absolute border px-2 text-white bg-secondary/90 right-0 rounded-sm m-2" onClick={() => setAds(false)}>Fechar</button>
                    <Link href={'/sobre#Planos'}>
                        <img
                            src={'/media/images/junte-se.png'}
                            className="h-full w-fit rounded-md shadow-lg"
                        />
                    </Link>
                </div>
                <Footer />
            </MinScreen>
        </Main>
    )
}

export default BlogPage