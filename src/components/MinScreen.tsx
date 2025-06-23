type Props = {
    children: React.ReactNode
}

const MinScreen = ({ children }:Props) => {
    return (
        <section className="flex flex-col w-full">
            {children}
        </section>
    )
}

export default MinScreen