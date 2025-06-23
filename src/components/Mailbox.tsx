import { api } from "@/services/api"
import { Mail } from "@/types/Mail"
import { useState } from "react"

type Props = {
    data: Mail,
    onClick: () => void
}

const Mailbox = ({ data, onClick }:Props) => {
    //Variaveis
    const [status, setStatus] = useState(data.status.read)

    const handleClicked = () => {
        if (status) {
            onClick()
        } else {
            onClick()
            setStatus(true)
            setTimeout(async ()=>{
                await api.mail.setRead(data.id)
            })
        }
    }

    return (
        <div className="flex flex-col max-w-full p-3 gap-1 border-b border-l-4 cursor-pointer" style={{ borderLeftColor: status ? 'rgb(212,212,212)' : 'rgb(56,189,248)' }} onClick={handleClicked}>
            <strong>{data.name}</strong>
            <p className='truncate max-w-full'>{data.message}</p>
            <p className='truncate max-w-full text-[10px] font-extralight'>Recebido em {data.status.received.toLocaleDateString()} às {data.status.received.toLocaleTimeString()}</p>
        </div>
    )
}

export default Mailbox