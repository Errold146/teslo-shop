'use client'

import { setUserAddress } from '@/actions'

export const saveAddress = async (formData: FormData) => {
    return await setUserAddress(formData)
}