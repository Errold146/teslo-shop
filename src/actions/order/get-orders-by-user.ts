"use server"

import { auth } from "@/auth.config"
import prisma from "@/lib/prisma";

interface Order {
    id: string;
    isPaid: boolean;
    OrderAddress: {
        firstName: string;
        lastName: string;
    } | null;
}

export const getOrdersByUser = async (): Promise<{ ok: boolean; message: string; orders: Order[] }> => {


    const session = await auth()
    if (!session?.user) {
        return {
            ok: false,
            message: 'Por favor iniciar sesión.',
            orders: []
        };
    }

    const orders = await prisma.order.findMany({
        where: {
            userId: session.user.id
        },
        include: {
            OrderAddress: {
                select: {
                    firstName: true,
                    lastName: true,
                }
            }
        }
    })

    return {
        ok: true,
        message: '',
        orders
    }
}