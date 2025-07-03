"use client"

import { useTransition, useEffect } from 'react'
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { IoWarningOutline } from "react-icons/io5"
import { motion, AnimatePresence } from 'framer-motion'
import type { Address, Country } from "@/interfaces"
import { useAddressStore } from "@/store"
import { useAddressSubmitHandler } from './useAddressSubmitHandler'
import Link from 'next/link'

export type FormInputs = {
    firstName: string
    lastName: string
    address: string
    address2?: string
    postalCode: string
    city: string
    country: string
    phone: string
    rememberAddress: boolean
}

interface Props {
    countries: Country[]
    userStoreAddress?: Partial<Address>
}

const fields = [
    { name: "firstName", label: "Nombres", type: "text", required: true },
    { name: "lastName", label: "Apellidos", type: "text", required: true },
    { name: "address", label: "Dirección", type: "text", required: true },
    { name: "address2", label: "Dirección 2 (opcional)", type: "text", required: false },
    { name: "postalCode", label: "Código postal", type: "text", required: true },
    { name: "city", label: "Ciudad", type: "text", required: true },
    { name: "phone", label: "Teléfono", type: "text", required: true },
]

export const AddressForm = ({ countries, userStoreAddress = {} }: Props) => {

    const { handleSubmit, register, formState: { errors }, reset } = useForm<FormInputs>({
        mode: 'onTouched',
        defaultValues: {
            ...(userStoreAddress as any),
            rememberAddress: false
        }
    })

    const [isPending, startTransition] = useTransition()
    const { data: session } = useSession({ required: true })

    const setAddress = useAddressStore(state => state.setAddress)
    const address = useAddressStore(state => state.address)

    // useEffect(() => {
    //     if ( address.firstName ) {
    //         reset( address )
    //     }
    // }, [])


    const onSubmit = useAddressSubmitHandler(session, setAddress)

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >

            {/* Campos del formulario */}
            {fields.map((field, index) => {
                const fieldName = field.name as keyof FormInputs
                return (
                    <div key={index} className="flex flex-col">
                        <span className="text-gray-800">{field.label}</span>
                        <input
                            type={field.type}
                            className={`p-3 border rounded-lg bg-gray-100 shadow-lg focus:outline-none focus:ring-2 ${errors[fieldName] ? 'border-red-500 ring-red-400' : 'focus:ring-indigo-400'}`
                            }
                            aria-invalid={!!errors[fieldName]}
                            {...register(fieldName, { required: field.required })}
                        />
                        <AnimatePresence>
                            {errors[fieldName] && (
                                <motion.span
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -4 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-sm text-red-500 mt-1 flex items-center gap-2"
                                >
                                    <IoWarningOutline />
                                    {field.required ? 'Este campo es obligatorio.' : ''}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>
                )
            })}

            {/* País - Selector */}
            <div className="flex flex-col">
                <span className="text-gray-700 font-medium">País</span>
                <select
                    className={`p-3 border rounded-lg bg-gray-100 shadow-lg focus:outline-none focus:ring-2 ${errors.country ? 'border-red-500 ring-red-400' : 'focus:ring-indigo-400'
                        }`}
                    {...register('country', { required: true })}
                    aria-invalid={!!errors.country}
                >
                    <option value="">-- Seleccione --</option>
                    {
                        countries.map(country => (
                            <option key={country.id} value={country.id} >{country.name}</option>
                        ))
                    }
                </select>

                <AnimatePresence>
                    {errors.country && (
                        <motion.span
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.2 }}
                            className="text-sm text-red-500 mt-1 flex items-center gap-2"
                        >
                            <IoWarningOutline /> Seleccione un país.
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>

            {/* Botón de continuar */}
            <div className="flex flex-col sm:col-span-1 mt-1">

                <div className="inline-flex items-center gap-2 mb-2 flex-wrap sm:flex-nowrap">
                    <label
                        htmlFor="checkbox"
                        className="relative flex items-center cursor-pointer rounded-md px-2 py-1"
                    >
                        <input
                            type="checkbox"
                            id="checkbox"
                            className="peer relative h-5 w-5 appearance-none rounded-md border border-blue-gray-200 cursor-pointer transition-all
                            checked:border-indigo-500 checked:bg-indigo-500 checked:before:bg-indigo-500
                            before:absolute before:top-2/4 before:left-2/4 before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 hover:before:opacity-10"
                            {...register('rememberAddress')}
                        />
                        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                            <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    </label>

                    <span className="text-sm text-gray-700">Recordar dirección de envío</span>

                    <Link
                        href="/checkout/address/prev-address"
                        className="text-sm text-indigo-600 hover:underline ml-2"
                    >
                        Usar dirección anterior
                    </Link>
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className={`btn-primary flex w-full sm:w-1/2 justify-center items-center py-3 rounded-lg font-semibold shadow-xl transition-colors ${isPending ? 'bg-indigo-300 cursor-wait' : 'hover:cursor-pointer text-white'
                        }`}
                >
                    {isPending ? 'Guardando...' : 'Siguiente Paso'}
                </button>
            </div>

        </form>
    )
}
