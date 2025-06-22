import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"

interface Props {
    quantity: number
    handleQuantityChange: (quantity: number) => void
    stock?: number
}

export const QuantitySelector = ({ quantity, handleQuantityChange, stock }: Props) => {

    const onQuantityChange = (value: number) => {
        if (quantity + value < 1) return;
        if (typeof stock === 'number' && quantity + value > stock) return;
        handleQuantityChange(quantity + value);
    };

    return (
        <div className="flex flex-col gap-2 p-3 w-full sm:w-fit sm:p-4 items-center sm:items-start text-center">
            <span className="text-center font-bold text-gray-800 tracking-wide sm:text-lg ">Cantidad</span>
            <div className="flex items-center gap-2 sm:gap-4">
                <button
                    className="p-1 rounded-full cursor-pointer hover:bg-gray-200 transition-colors text-primary text-2xl disabled:opacity-40 disabled:cursor-not-allowed sm:p-2 sm:text-3xl"
                    disabled={quantity <= 1}
                    aria-label="Disminuir cantidad"
                    onClick={() => onQuantityChange(-1)}
                >
                    <IoRemoveCircleOutline size={28} className="sm:size-[34px]" />
                </button>
                <span
                    className="text-lg font-semibold text-gray-700 min-w-[28px] text-center select-none sm:text-xl sm:min-w-[32px] border border-gray-300 rounded-md bg-white px-5 py-2"
                >
                    {quantity}
                </span>
                <button
                    className="p-1 rounded-full hover:bg-gray-200 transition-colors text-primary text-2xl cursor-pointer sm:p-2 sm:text-3xl disabled:opacity-40 disabled:cursor-not-allowed"
                    aria-label="Aumentar cantidad"
                    onClick={() => onQuantityChange(1)}
                    disabled={typeof stock === 'number' ? quantity >= stock : false}
                >
                    <IoAddCircleOutline size={28} className="sm:size-[34px]" />
                </button>
            </div>
        </div>
    );
};
