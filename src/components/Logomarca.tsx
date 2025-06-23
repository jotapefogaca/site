import Image from "next/image"
import Link from "next/link"
import logomarca from '../../public/media/images/logo.png'
import foxy from '../../public/media/images/foxy.png'
import lady from '../../public/media/images/lady.png'

const Logomarca = () => {
    return (
        <Link href='/' className='flex'>
            <Image className="h-[50px] w-fit self-center" src={logomarca} alt="Logomarca Wildcats" />
            <Image className="h-[50px] w-fit self-center" src={foxy} alt="Logomarca Wildcats" />
            <Image className="h-[50px] w-fit self-center" src={lady} alt="Logomarca Wildcats" />
        </Link>
    )
}

export default Logomarca