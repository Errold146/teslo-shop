"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { cloudinary } from "@/lib/cloudinary"

export const deleteProductImage = async ( imageId: number, imageUrl: string ) => {
    
    if ( !imageUrl.startsWith('http') ) {
        return {
            ok: false,
            message: 'No se puede eliminar imagenes de nuestro servidor interno.'
        }
    }

    const imageName = imageUrl.split('/').pop()?.split('.')[0] ?? ''

    try {
        await cloudinary.uploader.destroy( imageName )
        const deletedImage = await prisma.productImage.delete({ 
            where: { 
                id: imageId 
            },
            select: {
                product: {
                    select: {
                        slug: true
                    }
                }
            }
        })

        revalidatePath('/admin/products')
        revalidatePath(`/admin/product/${deletedImage.product.slug}`)
        revalidatePath(`/product/${deletedImage.product.slug}`)

        return {
            ok: true,
            message: 'Imagen eliminada correctamente.'
        }

    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'Ocurrio un error inesperado, recargue e intente de nuevo.'
        }
    }
}