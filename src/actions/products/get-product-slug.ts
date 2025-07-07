"use server"

import prisma from "@/lib/prisma";

export const getProductSlug = async (slug: string) => {
   
    try {
        const product = await prisma.product.findUnique({
            include: {
                ProductImage: true
            },
            where: { slug },
        })

        if ( !product ) return null;
        
        return {
            ...product,
            images: product.ProductImage.map(image => image.url),
        };

    } catch (error) {
        console.error(error);
        throw new Error("Error al obtener el producto por el slug")
        
    }
}