'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'
import type { Address } from '@/interfaces'

export const setUserAddress = async (formData: FormData) => {
    const userId = formData.get('userId')?.toString()

    const address: Address = {
        firstName: formData.get('firstName')?.toString() || '',
        lastName: formData.get('lastName')?.toString() || '',
        address: formData.get('address')?.toString() || '',
        address2: formData.get('address2')?.toString() || '',
        postalCode: formData.get('postalCode')?.toString() || '',
        city: formData.get('city')?.toString() || '',
        country: formData.get('country')?.toString() || '',
        phone: formData.get('phone')?.toString() || '',
    }

    if (!userId) {
        return {
            ok: false,
            message: 'Falta el identificador del usuario.',
        }
    }

    try {
        const existing = await prisma.userAddress.findUnique({ where: { userId } })

        const addressToSave = {
            userId,
            address: address.address,
            address2: address.address2,
            city: address.city,
            countryId: address.country,
            postalCode: address.postalCode,
            phone: address.phone,
            firstName: address.firstName,
            lastName: address.lastName,
        }

        const saved = existing
            ? await prisma.userAddress.update({ where: { userId }, data: addressToSave })
            : await prisma.userAddress.create({ data: addressToSave })

        revalidatePath('/checkout/address')

        return {
            ok: true,
            message: 'Dirección guardada con éxito.',
            address: saved,
        }
    } catch (error) {
        console.error('❌ Error en setUserAddress:', error)
        return {
            ok: false,
            message: 'Error interno al guardar la dirección.',
        }
    }
}