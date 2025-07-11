"use server"

/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'
import { Gender, type Product, type Size } from '@prisma/client'
import { cloudinary } from "@/lib/cloudinary"

const productSchema = z.object({
    id: z.string().uuid().optional().nullable(),
    title: z.string().min(3).max(255),
    slug: z.string().min(3).max(255),
    description: z.string(),
    price: z.coerce.number().min(1).transform( val => Number(val.toFixed(2)) ),
    inStock: z.coerce.number().min(0).transform( val => Number(val.toFixed(0)) ),
    categoryId: z.string().uuid(),
    sizes: z.coerce.string().transform(val =>
        val.split(',').map(s => s.trim().toUpperCase())
    ),
    tags: z.string(),
    gender: z.nativeEnum(Gender),

})

export const createUpdateProduct = async ( formData: FormData ) => {
    const data = Object.fromEntries( formData )
    const productParsed = productSchema.safeParse( data )

    if ( !productParsed.success ) {
        console.log(productParsed.error)
        return { ok: false }
    }

    const product = productParsed.data
    product.slug = product.slug.toLowerCase().replace(/ /g, '-').trim()
    const { id, ...rest } = product

    try {
        //@typescript-eslint/no-unused-vars
        const prismaTx = await prisma.$transaction(async (_tx) => {

            let product: Product
            const tagsArray = rest.tags.split(',').map(tag => tag.trim().toLowerCase())

            if (id) {
                // Actualizar
                product = await prisma.product.update({
                    where: { id },
                    data: {
                        ...rest,
                        sizes: {
                            set: rest.sizes as Size[]
                        },
                        tags: tagsArray
                    }
                })

            } else {
                // Crear
                product = await prisma.product.create({
                    data: {
                        ...rest,
                        sizes: {
                            set: rest.sizes as Size[]
                        },
                        tags: tagsArray
                    }
                })
            }

            // Proceso de carga y guardado de imagenes
            if ( formData.getAll('images') ) {
                const images = await uploadImages( formData.getAll('images') as File[] )
                if ( !images ) throw new Error('Error al subir las imagenes, recargue e intente de nuevo.');

                // Recorre las imagenes y guardarlas
                await prisma.productImage.createMany({
                    data: images.map( img => ({
                        url: img!,
                        productId: product.id
                    }))
                })
            }

            return product
        })

        revalidatePath('/admin/products')
        revalidatePath(`/admin/product/${product.slug}`)
        revalidatePath(`/products/${product.slug}`)

        return {
            ok: true,
            product: prismaTx
        }

    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'Ocurrio un error inesperado, recargue e intente de nuevo.'
        }
    }
}

const uploadImages = async (images: File[]) => {
    try {
        const uploadPromises = images.map( async img => {
            try {
                const buffer = await img.arrayBuffer()
                const base64Image = Buffer.from(buffer).toString('base64')
                return cloudinary.uploader.upload(`data:image/png;base64,${ base64Image }`)
                    .then( (r: { secure_url: any }) => r.secure_url )
                
            } catch (error) {
                console.log(error)
                return null
            }
        })

        const uploadedImages = await Promise.all( uploadPromises )
        return uploadedImages

    } catch (error) {
        console.log(error)
        return null
    }
}