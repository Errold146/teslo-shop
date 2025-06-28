import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Address {
    firstName: string
    lastName: string
    address: string
    address2?: string
    postalCode: string
    city: string
    country: string
    phone: string
}

interface State {
    address: Address
    setAddress: (address: State['address']) => void
}

export const useAddressStore = create<State>()(
    persist(
        (set) => ({
            address: {
                firstName: '',
                lastName: '',
                address: '',
                address2: '',
                postalCode: '',
                city: '',
                country: '',
                phone: '',
            },
            setAddress: (address) => {
                set({ address })
            }

        }),
        {
            name: 'address-info',
        }
    )
) 