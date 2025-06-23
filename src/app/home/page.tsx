'use client'

import { api } from "@/services/api"
import { Acompanhante } from "@/types/Acompanhante"
import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { convertTimestampToDate } from "@/services/functions"

const Page = () => {
    const [started, setStarted] = useState(false)
    const [models, setModels] = useState<Acompanhante[]>([])
    const router = useRouter()

    const handleAge = useMemo(() => (time: any): string => {
        const dateConverted = convertTimestampToDate(time);
        const currentDate = new Date().getFullYear();
        return (currentDate - dateConverted.getFullYear()).toString();
    }, []);

    useEffect(() => {
        if (started) {
            const getModels = async () => {
                const get = await api.acompanhante.getAll()

                if (get.error) {

                } else if (get.list.length > 0) {
                    setModels(get.list)
                }
            }

            getModels()
        } else {
            setStarted(true)
        }
    }, [started])

    return (
        <div className="flex flex-col flex-1 p-5">
            <h1 className="text-2xl font-bold mb-5">Acompanhantes</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {models.map((model) => (
                    <Card
                        key={model.id}
                        className="cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() => router.push(`/home/acompanhantes/edit/${model.id}`)}
                    >
                        <CardHeader className="relative aspect-square overflow-hidden">
                            <Image
                                src={model.midia.perfil}
                                alt={`Foto de ${model.nome}`}
                                fill
                                className="object-cover rounded-t-md"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </CardHeader>
                        <CardContent className="pt-4">
                            <h3 className="text-lg font-semibold">{model.nome}</h3>
                            <p className="text-sm text-muted-foreground">{handleAge(model.nascimento)} anos</p>
                        </CardContent>
                        <CardFooter>
                            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                                {model.plano}
                            </span>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default Page