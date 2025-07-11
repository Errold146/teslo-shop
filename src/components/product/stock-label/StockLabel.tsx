"use client"

import { getProductStock } from "@/actions"
import { useEffect, useState } from "react"

interface Props {
    slug: string
}

export const StockLabel = ({slug}: Props) => {

    const [stock, setStock] = useState('0')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getStock = async () => {
            const stock = await getProductStock(slug);
            setStock(String(stock));
            setIsLoading(false);
        };

        getStock();
    }, [slug]);

    return (
        <>
            {isLoading ? (
                <span className="inline-block font-semibold text-lg mt-10 text-gray-900 bg-indigo-200 rounded-md px-4 py-2 animate-pulse shadow-sm min-w-[120px] text-center">
                    Cargando...
                </span>
            ) : (
                <span className="inline-block font-semibold text-lg mt-10 text-gray-900 bg-indigo-100 rounded-md px-4 py-2 shadow-sm min-w-[120px] text-center">
                    Disponibles: {stock}
                </span>
            )}
        </>
    )
}
