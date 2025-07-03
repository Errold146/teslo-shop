"use server"

import prisma from "@/lib/prisma"

export const setTransactionId = async ( orderId: string, transactionId: string ) => {

    try {
        const order = await prisma.order.update({
            where: { id: orderId },
            data: { transactionId }
        })

        if ( !order ) {
            return {
                ok: false,
                message: 'Orden inválida.'
            }
        }

        return { ok: true }

    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'Error al obtener el id de la transacción.'
        }
    }
}