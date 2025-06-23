'use client'
import Editor from "@/components/Editor"
import { api } from "@/services/api"
import Image from "next/image"
import { FormEvent, useEffect, useState } from "react"
import star from '@icons/star.svg'
import star_outlined from '@icons/star-outlined.svg'
import edit from '@icons/edit.svg'
import visit from '@icons/visit.svg'
import trash from '@icons/trash.svg'
import { Post } from "@/types/Post"
import HomeHeader from "@/components/HomeHeader"
import LexicalEditor from "@/components/editor/LexicalEditor"
import Link from "next/link"
import { deleteDoc, doc } from "firebase/firestore"
import { db } from "@/libs/firebase-config"


const Page = () => {
    const [posts, setPosts] = useState<Post[]>([])
    const [screen, setScreen] = useState<'initial' | 'new' | 'edit'>('initial')
    const [file, setFile] = useState<File | null>()
    const [loading, setLoading] = useState(false)
    const [indexEditable, setIndexEditable] = useState(-1)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setFile(file);
    };

    const handleSetFocus = async (id: string, index: number) => {
        const update = await api.post.setFocus(id)

        if (update.success) {
            const find = posts.findIndex((element) => element.focus === true)

            if (find >= 0) {
                setPosts(prev =>
                    prev.map((item, n) =>
                        n === find ? { ...item, focus: false } : item
                    )
                )
            }

            setPosts(prev =>
                prev.map((item, n) =>
                    n === index ? { ...item, focus: true } : item
                )
            )
        }
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        setLoading(true)
        event.preventDefault()
        const form = new FormData(event.currentTarget)

        if (file) {
            let register: Post = {
                id: "",
                title: form.get('title') as string,
                description: form.get('description') as string,
                content: form.get('descricao') as string,
                image: "",
                autor: "Foxy Lady",
                created: new Date(),
                focus: false,
                linkname: api.functions.formatTextForLink(form.get('title') as string)
            }

            const set = await api.post.insert(register)

            if (set.success) {
                const upload = await api.post.uploadImage(file, set.id!)

                if (upload.success) {
                    if (upload.url) {
                        register.id = set.id!
                        register.image = upload.url

                        setPosts(prev => [...prev, register])
                        setScreen('initial')
                        setLoading(false)
                    }
                }
            } else {
                alert('error')
                setLoading(false)
            }
        }


    }

    const handleSubmitEditable = async (event: FormEvent<HTMLFormElement>) => {
        setLoading(true)
        event.preventDefault()
        const form = new FormData(event.currentTarget)

        let register: Post = {
            id: posts[indexEditable].id,
            title: posts[indexEditable].title,
            description: form.get('description') as string,
            content: form.get('descricao') as string,
            image: posts[indexEditable].image,
            autor: "Foxy Lady",
            created: new Date(),
            focus: false,
            linkname: posts[indexEditable].linkname
        }

        const set = await api.post.update(register)

        if (set.success) {
            setPosts(prev => prev.map((item, n) => n === indexEditable ? { ...item, ...register } : item))
            setScreen('initial')
            setLoading(false)
        } else {
            alert('error')
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        const response = confirm("Deseja mesmo excluir esta publicação?")

        if (response) {
            await deleteDoc(doc(db, "posts", id));
            const get = await api.post.get()

            if (get.success) {
                setPosts(posts.filter((element) => element.id !== id))
            }
        }
    }

    useEffect(() => {
        setTimeout(async () => {
            const get = await api.post.get()

            if (get.success) {
                setPosts(get.data)
            }
        })
    }, [])

    return (
        <main className="w-full h-screen flex flex-col">
            {screen === 'initial' && (
                <section className="flex flex-col w-full">
                    <span className="flex justify-between items-center w-full mb-6">
                        <h1 className="font-bold mb-6 text-2xl">Publicações</h1>
                        <button className="px-4 py-2 text-sm rounded-md border" onClick={() => setScreen('new')}>NOVA PUBLICAÇÃO</button>
                    </span>

                    <ul className="flex flex-col w-full divide-y">
                        <li className="flex w-full font-semibold py-3 border-b-2 bg-gray-50 divide-x">
                            <span className="px-2 flex-1">Título:</span>
                            <span className="px-2 w-40">Autor:</span>
                            <span className="px-2 w-32">Data:</span>
                            <span className="w-20 flex items-center justify-center">
                                <Image src={star} alt="Destaque" className="h-6 w-fit" />
                            </span>
                            <span className="w-32 text-center">Ações:</span>
                        </li>
                        {posts.map((item, index) => {
                            return (
                                <li key={index} className="flex w-full py-1 divide-x">
                                    <h2 className="px-2 flex-1">{item.title}</h2>
                                    <p className="px-2 w-40">{item.autor}</p>
                                    <p className="px-2 w-32">{api.functions.timestampToDate(item.created)}</p>
                                    <span className="w-20 flex items-center justify-center">
                                        {item.focus ? (
                                            <Image
                                                src={star}
                                                alt="Destaque"
                                                className="h-6 w-fit cursor-pointer"
                                            />
                                        ) : (
                                            <Image
                                                src={star_outlined}
                                                alt="Destaque"
                                                className="h-6 w-fit cursor-pointer"
                                                onClick={() => handleSetFocus(item.id, index)}
                                            />
                                        )}
                                    </span>
                                    <span className="w-32 flex text-center items-center justify-around">
                                        <Link
                                            href={`https://foxylady.com.br/post/${item.linkname}`}
                                            className="flex items-center justify-center"
                                            target="_blank"
                                        >
                                            <Image src={visit} alt="Destaque" className="h-5 w-5" />
                                        </Link>
                                        <button className="flex items-center justify-center" onClick={() => {
                                            setScreen('edit')
                                            setIndexEditable(index)
                                        }}>
                                            <Image src={edit} alt="Destaque" className="h-5 w-5" />
                                        </button>
                                        <button className="flex items-center justify-center" onClick={() => handleDelete(item.id)}>
                                            <Image src={trash} alt="Destaque" className="h-5 w-5" />
                                        </button>
                                    </span>
                                </li>
                            )
                        })}


                    </ul>
                </section>
            )}
            {screen === 'edit' && (
                <form className="flex flex-col flex-1 w-full" onSubmit={(e) => {
                    handleSubmitEditable(e)
                }}>
                    <input
                        required
                        type="text"
                        className="border rounded-md p-3 outline-none my-3"
                        placeholder="Digite o título"
                        name="title"
                        defaultValue={posts[indexEditable].title}
                        disabled
                    />
                    <textarea
                        required
                        rows={4}
                        className="border rounded-md p-3 outline-none mb-3"
                        placeholder="Digite a descrição"
                        name="description"
                        defaultValue={posts[indexEditable].description}
                    />
                    <section className="flex w-full flex-1">
                        <LexicalEditor
                            SavelocalStorage={false}
                            contentEditable={posts[indexEditable].content}
                        />
                    </section>
                    <span className="flex items-center gap-3 my-6 h-fit">
                        <button className="px-4 py-2 border rounded-md font-semibold" type="submit" disabled={loading}>
                            {loading ? (
                                <>CARREGANDO...</>
                            ) : (
                                <>SALVAR ALTERAÇÕES</>
                            )}
                        </button>
                        <button className="px-4 py-2 border rounded-md font-semibold" type="submit" disabled={loading}>
                            VOLTAR
                        </button>
                    </span>
                </form>
            )}
            {screen === 'new' && (
                <form className="flex flex-col flex-1 w-full" onSubmit={(e) => {
                    handleSubmit(e)
                }}>
                    <input type="file" name="file" accept="image/*" onChange={handleChange} />
                    <input required type="text" className="border rounded-md p-3 outline-none my-3" placeholder="Digite o título" name="title" />
                    <input required type="text" className="border rounded-md p-3 outline-none mb-3" placeholder="Digite a descrição" name="description" />
                    <section className="flex w-full flex-1">
                        {/* <Editor type="Editor" /> */}
                        <LexicalEditor SavelocalStorage={false} />
                    </section>
                    <span className="flex items-center gap-3 my-6 h-fit">
                        <button className="px-4 py-2 border rounded-md font-semibold" type="submit" disabled={loading}>
                            {loading ? (
                                <>CARREGANDO...</>
                            ) : (
                                <>PUBLICAR</>
                            )}
                        </button>
                    </span>
                </form>
            )}

        </main>
    )
}

export default Page