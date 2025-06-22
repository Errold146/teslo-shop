"use server"

import prisma from "@/lib/prisma"
import type { Gender } from "@prisma/client"

interface PaginatedOptions {
    page?: number
    take?: number
    gender?: Gender
}

export const getPaginatedProductsWhitImages = async ({ page = 1, take = 10, gender }: PaginatedOptions) => {

    if ( isNaN( Number( page )) ) page = 1;
    if ( page < 1 ) page = 1;

    try {

        // 1. Obtener el total de productos
        const products = await prisma.product.findMany({
            take,
            skip: (page - 1) * take,
            include: {
                ProductImage: {
                    take: 2,
                    select: {
                        url: true
                    }
                }
            },
            where: {
                gender
            }
        })

        // 2. Obtener el total de páginas
        const totalCount = await prisma.product.count({ where: { gender: gender as Gender }})
        const totalPages = Math.ceil(totalCount / take)

        return {
            currentPage: page,
            totalPages,
            products: products.map(product => ({
                ...product,
                images: product.ProductImage.map(image => image.url)
            }))
        }

    } catch (error) {
        throw new Error("Error fetching products: " + (error instanceof Error ? error.message : "Unknown error"))
    }
}