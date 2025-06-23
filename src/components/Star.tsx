'use client'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { useState } from 'react';
import { api } from '@/services/api';

type Props = {
    destaque: boolean,
    id: string
}

const Star = ({ destaque, id }:Props) => {
    const [current, setCurrent] = useState(destaque)

    const handleSetDestaque = async () => {
        await api.acompanhante.updateDestaque(id, true)
        setCurrent(true)
    }

    const handleNotDestaque = async () => {
        await api.acompanhante.updateDestaque(id, false)
        setCurrent(false)
    }


    return (
        <span>
            {current &&
                <StarIcon color='warning' sx={{ cursor: 'pointer' }} onClick={handleNotDestaque} />
            }
            {!current &&
                <StarBorderIcon color='warning' sx={{ cursor: 'pointer' }} onClick={handleSetDestaque} />
            }
        </span>
    )
}

export default Star