"use server"

import type { PayPalOrderStatus } from "@/interfaces"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export const payapalCheckPayment = async (transactionId: string) => {
    const authToken = await getPayPalBearerToken()

    if ( !authToken ) {
        return {
            ok: false,
            message: 'No se pudo obtener el token de verificación.'
        }
    }

    const resp = await verifyPayPalPayment(transactionId, authToken)
    if ( !resp ) {
        return {
            ok: false,
            message: 'Error al verificar el pago.'
        }
    }

    const { status, purchase_units } = resp
    const { invoice_id: orderId } = purchase_units[0]
    if (status !== 'COMPLETED') {
        return {
            ok: false,
            message: 'Pago pendiente...'
        }
    }

    try {
        await prisma.order.update({
            where: { id: orderId },
            data: {
                isPaid: true,
                paidAt: new Date()
            }
        })

        revalidatePath(`/orders/${orderId}`)

        return {
            ok: true,
            message: 'Pago exitoso, muchas gracias.'
        }
        
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'Error al realizar el pago, recague e intente de nuevo.'
        }
    }
}

const getPayPalBearerToken = async (): Promise<string|null> => {

    const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYAPL_CLIENT_ID ?? ''
    const PAYPAL_SECRET = process.env.PAYPAL_SECRET ?? ''
    const oauth2Url = process.env.PAYPAL_OAUTH_URL ?? ''

    const base64Token = Buffer.from(
        `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
        'utf-8'
    ).toString('base64')

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Basic ${base64Token}`);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams()
    urlencoded.append("grant_type", "client_credentials")

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
    }

    try {
        const result = await fetch(oauth2Url, {
            ...requestOptions,
            cache: 'no-store'
        }).then(r => r.json())
        return result.access_token

    } catch (error) {
        console.log(error)
        return null
    }
}

const verifyPayPalPayment = async (paypaltransactionId: string, bearerToken: string): Promise<PayPalOrderStatus|null> => {

    const paypalOrderUrl = `${process.env.PAYPAL_ORDERS_URL}/${paypaltransactionId}`

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${bearerToken}`);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
    };

    try {
        const resp = await fetch(paypalOrderUrl, {
            ...requestOptions,
            cache: 'no-store'
        }).then(r => r.json())
        return resp

    } catch (error) {
        console.log(error)
        return null
    }
}