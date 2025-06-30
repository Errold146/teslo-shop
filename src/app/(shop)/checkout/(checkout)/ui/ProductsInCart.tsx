"use client"

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCartStore } from '@/store';
import { formatCurrency } from '@/utils/currency';

export const ProductsInCart = () => {

    const [loaded, setLoaded] = useState(false)
    const productsInCart = useCartStore( state => state.cart )

    useEffect(() => {
        setLoaded( true )
    }, [])
    

    if (!loaded) return <p className=' text-center text-2xl text-gray-700'>Cargando...</p>;

    return (
        <>
            {productsInCart.map(prod => (
                <div
                    key={`${prod.slug}-${prod.size}`}
                    className="grid grid-cols-1 sm:grid-cols-[190px_1fr] gap-6 p-6 bg-white border border-gray-200 rounded-xl shadow-sm transition hover:shadow-md w-full"
                >
                    {/* Imagen */}
                    <div className="w-full h-[150px] overflow-hidden rounded-lg border border-gray-300 bg-white">
                        <Image
                            src={`/products/${prod.image}`}
                            alt={prod.title}
                            width={150}
                            height={150}
                            className="w-full h-full object-cover"
                            priority
                        />
                    </div>

                    {/* Detalles */}
                    <div className="flex flex-wrap justify-between items-center gap-4 text-center sm:text-left">
                        <div className=" min-w-[150px]">
                            <p className="text-lg font-semibold text-gray-950 mb-1">Producto</p>
                            <p className="text-sm font-bold text-gray-600 truncate max-w-[150px]">
                                {prod.title}
                            </p>
                        </div>
                        <div className="flex-1 min-w-[80px] text-center">
                            <p className="text-lg font-semibold text-gray-950 mb-1">Talla</p>
                            <p className="text-sm text-gray-600 font-medium">{prod.size}</p>
                        </div>
                        <div className="flex-1 min-w-[110px] text-center">
                            <p className="text-lg font-semibold text-gray-950 mb-1">Cantidad</p>
                            <p className="text-sm text-gray-600 font-medium">{prod.quantity}</p>
                        </div>
                        
                        <div className="flex-1 min-w-[110px] text-center">
                            <p className="text-lg font-semibold text-gray-950 mb-1">Subtotal</p>
                            <p className="text-sm text-gray-600 font-medium">
                                {formatCurrency(prod.price * prod.quantity)}
                            </p>
                        </div>
                    </div>
             </div>
            ))}   
        </>
    )
}
