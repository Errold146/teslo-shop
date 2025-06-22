"use server"

import prisma from "@/lib/prisma"

export const getProductStock = async (slug: string): Promise<number> => {
    
    try {
        const stock = await prisma.product.findUnique({
            where: { slug },
            select: { inStock: true }
        })

        return stock?.inStock ?? 0; // Retorna 0 si no se encuentra el producto o no tiene stock

    } catch (error) {
        console.error("Error al obtener el stock del producto:", error)
        throw new Error("Error al obtener el stock del producto")
        
    }
}