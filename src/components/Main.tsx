import { ClassNames } from "@emotion/react"

type Props = {
    children: React.ReactNode,
    className?: string
}

const Main = ({ children, className }:Props) => {
    return (
        <main className={`${className} h-[100dvh] w-full flex flex-col overflow-auto text-primary custom-scrollbar `}>
            {children}
        </main>
    )
}

export default Main