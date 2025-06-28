"use client"

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { deleteUserAddress } from '@/actions'
import { saveAddress } from '@/utils/save-address'
import type { FormInputs } from './AddressForm'

export const useAddressSubmitHandler = (session: any, setAddress: Function) => {
    const router = useRouter()
    const [, startTransition] = useTransition()

    const handleSubmit = async (data: FormInputs) => {
        setAddress(data)

        try {
            if (!data.rememberAddress) {
                startTransition(async () => {
                    try {
                        const res = await deleteUserAddress(session.user.id)
                        if (res.ok) {
                            toast.success('Dirección eliminada de la base de datos.')
                            router.push('/checkout')
                        } else {
                            toast.error(res.message || 'Error al eliminar la dirección')
                        }
                    } catch {
                        toast.error('Ocurrió un error inesperado al eliminar')
                    }
                })
                return
            }

            const formData = new FormData()
            formData.set('userId', session.user.id)

            Object.entries(data).forEach(([key, value]) => {
                if (value !== undefined) {
                    formData.set(key, String(value))
                }
            })

            startTransition(async () => {
                try {
                    const res = await saveAddress(formData)
                    if (res?.ok) {
                        toast.success('Dirección guardada con éxito')
                        router.push('/checkout')
                    } else {
                        toast.error(res?.message || 'Error al guardar la dirección')
                    }
                } catch {
                    toast.error('Ocurrió un error inesperado al guardar')
                }
            })
        } catch {
            toast.error('Error inesperado al procesar el formulario')
        }
    }

    return handleSubmit
}