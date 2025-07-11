export const revalidate = 60

import { notFound, redirect } from "next/navigation"
import { getPaginatedProductsWhitImages } from "@/actions"
import { Pagination, ProductGrid, Title } from "@/components"

const genderMap: Record<string, string> = {
    men: "Hombres",
    women: "Mujeres",
    kids: "Niños",
    unisex: "Unisex"
};

// @ts-expect-error// @ts-expect-error Next.js dynamic params may be a promise 
export async function generateMetadata({ params }) {
    const { gender } = params;

    const genderName = genderMap[gender];

    if (!genderName) {
        return {
            title: "Categoría no encontrada",
            description: "La categoría solicitada no existe.",
        };
    }

    return {
        title: `${genderName}`,
        description: `Explora nuestra selección de productos para ${genderName} en Teslo Shop.`,
    };
}

// @ts-expect-error// @ts-expect-error Next.js dynamic params may be a promise 
export default async function GenderPage({ params, searchParams }) {
    
    const { gender } =  params
    const { page } = searchParams;
    const pageNumber = page ? parseInt(page) : 1;

    if (!genderMap[gender]) notFound();

    const { products, totalPages } = await getPaginatedProductsWhitImages({ page: pageNumber, gender });

    if (products.length === 0) redirect(`/gender/${gender}`);

    return (
        <>
            <Title
                title="Productos"
                subTitle={`Productos Para ${genderMap[gender]}`}
                className="mb-2"
            />
            <Pagination totalPages={totalPages} />
            <ProductGrid
                products={products.map(product => ({
                    ...product,
                    description: product.description ?? ""
                }))}
            />
            <Pagination totalPages={totalPages} />
        </>
    );
}