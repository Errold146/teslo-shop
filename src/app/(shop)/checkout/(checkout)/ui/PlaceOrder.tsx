"use client"

/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect, useState } from "react"
import Link from "next/link"
import clsx from "clsx"
import { toast } from "sonner"
import { FaMapMarkerAlt } from "react-icons/fa"
import { placeOrder } from "@/actions"
import { useAddressStore, useCartStore } from "@/store"
import { formatCurrency } from "@/utils/currency"
import { useRouter } from "next/navigation"

export const PlaceOrder = () => {

    const router = useRouter()
    const [loaded, setLoaded] = useState(false)

    const [_errorMessage, setErrorMessage] = useState('')
    const [isPlacingOrder, setIsPlacingOrder] = useState(false)

    const address = useAddressStore( state => state.address )
    const cart = useCartStore( state => state.cart )
    const subTotal = useCartStore( state => state.subTotal )
    const tax = useCartStore( state => state.tax )
    const total = useCartStore( state => state.total )
    const totalItems = useCartStore( state => state.totalItems )
    const clearCart = useCartStore( state => state.clearCart )

    const getInitials = (first: string, last: string) => `${first?.[0] || ''}${last?.[0] || ''}`.toUpperCase()

    useEffect(() => {
        setLoaded( true )
    }, [])

    const onPlaceOrder = async () => {
        setIsPlacingOrder(true)
        setErrorMessage('') // limpiamos errores anteriores

        const productsToOrder = cart.map(prod => ({
            productId: prod.id,
            quantity: prod.quantity,
            size: prod.size,
        }))

        const res = await placeOrder(productsToOrder, address)

        setIsPlacingOrder(false)

        if (!res.ok) {
            toast.error(res.message || 'Ocurrió un error al procesar la orden.')
            setErrorMessage(res.message || '')
            return
        }

        toast.success('Orden Creada Exitosamente.')
        clearCart()
        router.replace(`/orders/${res.order?.id}`)
    }
    
    if ( !loaded ) {
        return (
            <div className="flex justify-center items-center h-40">
                <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    return (
        <div className="mt-10 bg-gray-50 rounded-xl shadow-lg p-6 sm:p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center sm:text-left">Resumen de la orden</h2>

            <h2 className="text-2xl mb-4 font-semibold flex items-center gap-2">
                <FaMapMarkerAlt className="w-6 h-6 text-indigo-500" />
                Dirección de entrega
                <Link href="/checkout/address" className="ml-auto text-indigo-600 hover:underline text-base font-medium">
                    Editar
                </Link>
            </h2>

            <div className="mb-10 bg-white sm:flex sm:justify-center rounded-lg border border-gray-200 shadow-sm px-5 py-6 sm:px-8 sm:py-7">
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-5 mb-4">
                    <span className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-lg shrink-0 mx-auto sm:mx-0">
                        {getInitials(address.firstName, address.lastName)}
                    </span>
                    <span className="mt-2 sm:mt-0 text-center sm:text-left font-semibold text-base sm:text-lg text-gray-900">
                        {address.firstName} {' '} {address.lastName}
                    </span>
                </div>

                <div className="text-gray-700 space-y-1 sm:pl-16 text-sm sm:text-base leading-relaxed text-center sm:text-left">
                    <p>{address.address}</p>
                    <p>{address.address2}</p>
                    <p>{address.city}, {address.country}</p>
                    <p>
                        Código Postal: <span className="font-medium">{address.postalCode}</span>
                    </p>
                    <p>
                        Tel: <span className="font-medium">{address.phone}</span>
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-lg text-gray-700">
                <span>Cantidad de artículos:</span>
                <span className="text-right text-indigo-600">
                    {totalItems === 1 ? "1 Artículo" : `${totalItems} Artículos`}
                </span>
    
                <hr className="col-span-2 my-2 border-gray-300" />
    
                <span>Subtotal:</span>
                <span className="text-right text-indigo-600">{formatCurrency(subTotal)}</span>
    
                <hr className="col-span-2 my-2 border-gray-300" />
    
                <span>Impuestos (13%):</span>
                <span className="text-right text-indigo-600">{formatCurrency(tax)}</span>
    
                <hr className="col-span-2 my-2 border-gray-300" />
    
                <span className="text-2xl font-semibold">Total:</span>
                <span className="text-right text-2xl text-indigo-600">{formatCurrency(total)}</span>
            </div>

            <div className="mt-5 w-full max-w-2x mx-auto">
                <button
                    onClick={ onPlaceOrder }
                    className={ clsx({
                        "w-full flex justify-center items-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-colors shadow-md": !isPlacingOrder,
                        "btn-disabled w-full": isPlacingOrder
                    })}
                >
                    Agregar orden
                </button>

                <p className="text-xs text-gray-500 text-center mt-3 px-4 sm:px-0">
                    Al continuar, aceptas nuestros{' '}
                    <Link href="/terminos" className="underline hover:text-indigo-600">
                        Términos y Condiciones
                    </Link>{' '}
                    y{' '}
                    <Link href="/privacidad" className="underline hover:text-indigo-600">
                        Política de Privacidad
                    </Link>.
                </p>
            </div>
        </div>
    )
}
