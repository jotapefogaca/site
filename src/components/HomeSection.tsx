type Props = {
    children: React.ReactNode
}

const HomeSection = ({ children }:Props) => {
    return (
        <section className="w-full flex-1 flex px-14 py-5 overflow-auto">
            {children}
        </section>
    )
}

export default HomeSection