"use client"

import { useEffect, useState } from 'react';
import { useCartStore } from '@/store';
import { ProductImage, QuantitySelector } from '@/components';
import { formatCurrency } from '@/utils/currency';
import Link from 'next/link';

export const ProductsInCart = () => {

    const [loaded, setLoaded] = useState(false)
    const productsInCart = useCartStore( state => state.cart )
    const updateProductQuantity = useCartStore( state => state.updateProductQuantity )
    const removeProduct = useCartStore( state => state.removeProduct )

    useEffect(() => {
        setLoaded( true )
    }, [])
    

    if (!loaded) return <p className=' text-center text-2xl text-gray-700'>Cargando...</p>;

    return (
        <>
            {productsInCart.map(prod => (
                <div
                    key={`${prod.slug}-${prod.size}`}
                    className="flex flex-col sm:flex-row items-center bg-gray-50 rounded-xl shadow-md p-6 transition hover:shadow-lg gap-6"
                >
                    {/* Imagen del producto */}
                    <ProductImage
                        src={prod.image}
                        alt={prod.title}
                        width={150}
                        height={150}
                        className="rounded-lg object-cover border border-gray-300 mx-auto sm:mx-0"
                    />

                    {/* Detalles del producto */}
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between w-full text-center sm:text-left">
                        <div className="flex-1">
                            <Link
                                href={`/product/${prod.slug}`}
                            >
                                <p 
                                    className="hover:text-indigo-600 text-xl font-semibold text-gray-800 hover:underline"
                                >
                                    {prod.title}
                                </p>
                            </Link>
                            <p className="text-indigo-600 font-bold text-lg">{formatCurrency(prod.price)}</p>
                        </div>

                        <div className="flex flex-col items-center sm:items-start text-center sm:text-left md:mx-5">
                            <p className="text-center font-bold text-gray-800 tracking-wide sm:text-lg md:mb-4">Talla</p>
                            <span className="inline-block my-1 px-3 py-1 bg-white border border-gray-300 rounded-full text-gray-600 text-sm font-semibold shadow-sm">
                                {prod.size}
                            </span>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <QuantitySelector
                                quantity={prod.quantity}
                                handleQuantityChange={ quantity => updateProductQuantity(prod, quantity) }
                            />
                            <button 
                                className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition w-full sm:w-auto"
                                onClick={ () => removeProduct(prod) }
                            >
                                Remover
                            </button>
                        </div>
                    </div>
                </div>
            ))}   
        </>
    )
}
