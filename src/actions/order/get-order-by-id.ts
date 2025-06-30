"use server"

import { auth } from "@/auth.config"
import prisma from "@/lib/prisma";

export const getOrderById = async (id: string) => {
    
    const session = await auth()
    if ( !session?.user ) return { ok: false, message: 'Favor iniciar sesión.' };

    try {
        const order = await prisma.order.findUnique({ 
            where: { id },
            include: {
                OrderAddress: true,
                OrderItem: {
                    select: {
                        price: true,
                        quantity: true,
                        size: true,
                        product: {
                            select: {
                                title: true,
                                slug: true,
                                ProductImage: {
                                    select: {
                                        url: true
                                    },
                                    take: 1
                                }
                            }
                        }
                    }
                }
            }
        })

        if ( !order ) throw 'Orden inválida.';
        if ( session.user.role === 'user' ) {
            if ( session.user.id !== order.userId ) throw 'Operación Inválida.';
        }

        return {
            ok: true,
            order
        }

    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'Ocurrio un error inesperado, recargue e intente de nuevo.'
        }
    }
}