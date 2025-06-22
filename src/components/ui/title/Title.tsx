
interface Props {
    title: string
    subTitle?: string
    className?: string
}

export const Title = ({ title, subTitle, className }: Props) => {
    return (
        <div className={`mt-3 ${className}`} >
            <h1 className=" text-5xl text-center font-bold my-6">{title}</h1>

            {
                subTitle && (
                    <h3 className=" text-2xl text-center mb-5 text-indigo-600 font-semibold">{subTitle}</h3>
                )
            }
        </div>
    )
}
