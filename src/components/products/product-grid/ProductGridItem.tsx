"use client"

 
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from "react"
import Link from "next/link"
import type { Product } from "@/interfaces"
import { formatCurrency } from "@/utils/currency"
import { ProductImage } from "@/components"

interface Props {
    product: Product
}

export function ProductGridItem({product}: Props) {

    //  @typescript-eslint/no-unused-vars
    const [displayImage, _setDisplayImage] = useState(product.images[0])

    return (
        <div className=" rounded-md overflow-hidden fade-in">
            <Link href={`/product/${product.slug}`}>
                <ProductImage 
                    src={displayImage}
                    alt={product.title}
                    className=" w-full object-cover rounded"
                    width={500}
                    height={500}
                />
            </Link>

            <div className="p-4 flex flex-col">
                <Link 
                    href={`/product/${ product.slug }`}
                    className=" hover:text-indigo-600"
                >
                    {product.title}
                </Link>

                <span className=" text-indigo-600 font-bold">{formatCurrency(product.price)}</span>

            </div>
        </div>
    )
}
