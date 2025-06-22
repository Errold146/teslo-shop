"use client"

import { useEffect, useState } from "react"
import { TbShoppingCartCheck, TbShoppingCartX } from "react-icons/tb"
import { useCartStore } from "@/store"
import { getProductStock } from "@/actions"
import type { CartProduct, Product, Size } from "@/interfaces"
import { QuantitySelector, SizeSelector, StockLabel } from "@/components"

interface Props {
    product: Product
}

export const AddToCart = ({product}: Props) => {

    const addProductToCart = useCartStore( state => state.addProductToCart )

    const [size, setSize] = useState<Size | undefined>()
    const [quantity, setQuantity] = useState<number>(1)
    const [stock, setStock] = useState<number>(product.inStock)
    const [posted, setPosted] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    useEffect(() => {
        getProductStock(product.slug).then(setStock);
    }, [product.slug]);

    useEffect(() => {
        if (showSuccess) {
            const timer = setTimeout(() => setShowSuccess(false), 3000)
            return () => clearTimeout(timer)
        }
    }, [showSuccess])

    const addToCart = () => {
        setPosted(true)
        if ( !size ) return;

        const cartProduct: CartProduct = {
            id: product.id,
            slug: product.slug,
            title: product.title,
            price: product.price,
            quantity: quantity,
            size: size,
            image: product.images[0]
        }
        addProductToCart(cartProduct)
        
        setPosted(false)
        setQuantity(1)
        setSize(undefined)
        setShowSuccess(true)
    }

    return (
        <>
            {/* Selector de Talla */}
            <div>
                <SizeSelector 
                    selectedSizes={size} 
                    availableSizes={product.sizes} 
                    onSizeChange={ setSize }
                />
            </div>

            {
                posted && !size && (
                    <span
                        className="flex items-center gap-2 mb-2 text-sm font-semibold text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2 shadow-sm fade-in"
                    >
                        <TbShoppingCartX size={25} />
                        Seleccione una talla por favor.
                    </span>
                )
            }

            {/* Selector de Cantidad */}
            <div
                className={`flex gap-4 items-center ${product.inStock === 0 ? 'opacity-50 pointer-events-none select-none' : ''}`}
            >
                <QuantitySelector 
                    quantity={quantity} 
                    handleQuantityChange={ setQuantity }
                    stock={stock}
                />
                <StockLabel slug={product.slug} />
            </div>

            {/* Botón Agregar al Carrito */}
            <button
                className={`btn-primary w-full text-white font-bold py-3 rounded-lg shadow-md transition-colors text-lg ${!product.inStock ? 'opacity-50 pointer-events-none select-none' : ''}`}
                disabled={!product.inStock}
                aria-disabled={!product.inStock}
                onClick={ addToCart }
            >
                {!product.inStock ? "Lo sentimos, producto agotado temporalmente" : "Agregar al carrito"}
            </button>

            {/* Descripción */}
            <span className="text-base font-bold text-gray-800 my-2 tracking-wide sm:text-lg sm:mb-2">Descripción</span>
            <p className="text-gray-600 leading-relaxed text-sm md:text-lg ">{product.description}</p>   

            {/* Mensaje de éxito */}
            {showSuccess && (
                <div className="mt-4 flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-100 border border-indigo-300 text-indigo-800 text-sm font-medium shadow transition-all animate-fade-in fade-in">
                    <TbShoppingCartCheck size={25} />
                    Producto agregado al carrito
                </div>
            )}
        </>
    )
}
