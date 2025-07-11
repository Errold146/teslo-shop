"use server"

import type { Product } from "@prisma/client";
import type { Prisma } from "@prisma/client";
import { auth } from "@/auth.config"
import type { Address, Size } from "@/interfaces"
import prisma from "@/lib/prisma"

interface ProductToOrder {
    productId: string
    quantity: number
    size: Size
}

export const placeOrder = async ( productIds: ProductToOrder[], address: Address ) => {

    const session = await auth()
    const userId = session?.user.id

    // Verificar la sesión de usuario
    if ( !userId ) {
        return {
            ok: false,
            message: 'No hay sesión de usuario.'
        }
    }

    // Obtener la info de los productos
    const products: Product[] = await prisma.product.findMany({
        where: {
            id: {
                in: productIds.map( prod => prod.productId )
            }
        }
    })

    // Calcular las cantidades
    const itemsInOrder = productIds.reduce((count, prod) => count + prod.quantity, 0)
    
    // Calcular totales e impuestos
    const { subTotal, tax, total } = productIds.reduce((totals, item) => {

        const productQuantity = item.quantity
        const product = products.find(prod => prod.id === item.productId)

        if ( !product ) throw new Error(`${item.productId} no existe - 500`);

        const subTotal = product.price * productQuantity
        totals.subTotal += subTotal
        totals.tax += subTotal * 0.13
        totals.total += subTotal * 1.13

        return totals

    }, { subTotal: 0, tax: 0, total: 0 })

    // Crear la transacción de la base de datos
    try {
        const prismaTx = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {

            // 1. Actualizar stock 
            const updatedProductsPromises = products.map(prod => {

                // Acumular valores
                const productQuantity = productIds.filter(p => p.productId === prod.id).reduce(
                    (acc, item) => item.quantity + acc, 0
                )

                if (!productQuantity) throw new Error(`${prod.id} - Sin cantidad definida.`);

                return tx.product.update({
                    where: { id: prod.id },
                    data: {
                        inStock: {
                            decrement: productQuantity
                        }
                    }
                })
            })

            const updatedProducts = await Promise.all(updatedProductsPromises)

            // Verificar la contabilidad del stock
            updatedProducts.forEach(prod => {
                if (prod.inStock < 0) throw new Error(`${prod.title} no tiene inventario sificiente.`);
            })

            // 2. Crear la orden (encabezado - detalle)
            const order = await tx.order.create({
                data: {
                    userId,
                    itemsInOrder,
                    subTotal,
                    tax,
                    total,
                    OrderItem: {
                        createMany: {
                            data: productIds.map(prod => ({
                                quantity: prod.quantity,
                                size: prod.size,
                                productId: prod.productId,
                                price: products.find(p => p.id === prod.productId)?.price ?? 0
                            }))
                        }
                    }
                }
            })

            // 3. Crear la dirección de la orden
            const { firstName, lastName, address2, postalCode, city, phone, } = address
            const orderAddress = await tx.orderAddress.create({
                data: {
                    firstName,
                    lastName,
                    address2,
                    postalCode,
                    city,
                    phone,
                    orderId: order.id,
                    address: address.address,
                    countryId: address.country,
                }
            });

            return {
                order,
                orderAddress,
                updatedProducts,
            }
        })

        return {
            ok: true,
            order: prismaTx.order,
            prismaTx
        }

    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'Error inesperado, recargue e intente de nuevo.',
        }
    }
    
}