"use server"

import { auth } from "@/auth.config"
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export const getPaginatedOrders = async () => {
    const session = await auth();
    if (session?.user.role !== 'admin') redirect('/');

    const now = new Date();
    const month = now.getMonth(); // 0-indexed
    const year = now.getFullYear();

    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0, 23, 59, 59, 999);

    const [orders ] = await Promise.all([
        prisma.order.findMany({
            orderBy: {
                createAt: 'desc'
            },
            include: {
                OrderAddress: {
                    select: {
                        firstName: true,
                        lastName: true,
                    }
                }
            }
        }),
        prisma.order.count({
            where: {
                createAt: {
                    gte: startDate,
                    lte: endDate
                }
            }
        }),
        prisma.order.count({
            where: {
                createAt: {
                    gte: startDate,
                    lte: endDate
                },
                isPaid: true
            }
        }),
        prisma.order.aggregate({
            where: {
                createAt: {
                    gte: startDate,
                    lte: endDate
                },
                isPaid: true
            },
            _sum: {
                total: true
            }
        })
    ]);

    const serializedOrders = orders.map(order => ({
        ...order,
        createAt: order.createAt.toISOString()
    }));

    return {
        ok: true,
        orders: serializedOrders
    };
}