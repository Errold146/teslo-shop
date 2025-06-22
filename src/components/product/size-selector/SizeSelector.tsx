import type { Size } from "@/interfaces"
import clsx from "clsx"

interface Props {
    selectedSizes?: Size
    availableSizes: Size[]
    onSizeChange: (size: Size) => void
}

export const SizeSelector = ({selectedSizes, availableSizes, onSizeChange}: Props) => {

    return (
        <div className="flex flex-col gap-3">
            <span className="text-center md:text-start font-bold text-gray-800 tracking-wide sm:text-lg">Tallas Disponibles</span>
            <div className="flex gap-2 justify-center md:justify-start">
                {availableSizes.map(size => (
                    <button
                        key={size}
                        type="button"
                        onClick={() => onSizeChange(size)}
                        className={clsx(
                            "px-3 py-2 border rounded-lg cursor-pointer hover:bg-gray-200",
                            selectedSizes === size
                                ? "underline focus:ring-2 focus:ring-primary bg-gray-200"
                                : "border-gray-300 text-gray-700"
                        )}
                    >
                        {size}
                    </button>
                ))}
            </div>
        </div>
    )
}
