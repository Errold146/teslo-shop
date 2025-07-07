import clsx from "clsx"
import { IoCardOutline } from "react-icons/io5"

interface Props {
    isPaid: boolean
    className?: string
}

export const OrderStatus = ({isPaid, className}: Props) => {
    return (
        <div className={
            clsx(
                `${className} flex items-center justify-center rounded-lg py-2 px-3.5 text-xs font-semibold text-white mt-5`,
                {
                    "bg-red-500": !isPaid,
                    "bg-green-500": isPaid
                }
            )
        }>
            <IoCardOutline size={30} />
            {/* <span className=" ml-3 text-sm">Pendiente de pago</span> */}
            <span className=" ml-3 text-sm">
                {
                    isPaid ? 'Cancelada.' : 'Pendiente de pago...'
                }
            </span>
        </div>
    )
}
