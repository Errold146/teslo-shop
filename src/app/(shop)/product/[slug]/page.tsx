export const revalidate = 604800

import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from "next/navigation";
import { getProductSlug } from "@/actions";
import { formatCurrency } from "@/utils/currency";
import { ProductSlideShow, QuantitySelector, SizeSelector, StockLabel } from "@/components";
import { AddToCart } from './ui/AddToCart';

type Props = {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata ): Promise<Metadata> {
    
    const slug = (await params).slug
    const product = await getProductSlug(slug)

    return {
        title: product?.title ?? 'Producto no encontrado',
        description: product?.description ?? '',
        openGraph: {
            title: product?.title ?? 'Producto no encontrado',
            description: product?.description ?? '',
            images: [`/products/${product?.images[1]}`]
        }
    }
}

// @ts-expect-error Next.js dynamic params may be a promise
export default async function ProductPage({ params }) {
    const { slug } = await params;
    const product = await getProductSlug(slug)

    if (!product) notFound();

    // Ensure description is always a string
    const safeProduct = { ...product, description: product.description ?? '' };

    return (
        <div
            className="w-full max-w-[1800px] mx-auto bg-white rounded-none md:rounded-xl shadow-lg p-4 md:p-12 flex flex-col md:flex-row items-center gap-4 md:gap-8 min-h-[900px] my-18"
        >
            {/* Sección de imágenes */}
            <div className="w-full md:w-1/2 flex justify-center">
                <ProductSlideShow images={product.images} title={product.title} className="w-full max-w-[800px] md:max-w-[1200px] rounded-none md:rounded-xl" />
            </div>

            {/* Sección de detalles del producto */}
            <div className="w-full md:w-1/2 flex flex-col justify-between gap-3 mb-10">
                <h1 className="font-extrabold text-xl md:text-4xl text-gray-900">{product.title}</h1>
                <p className="text-lg md:text-2xl text-indigo-600 font-semibold">{formatCurrency(product.price)}</p>
                <hr className="border-t border-gray-500" />

                <AddToCart product={safeProduct} />
            </div>
        </div>
    );
}