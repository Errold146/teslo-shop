export const revalidate = 60

import { notFound, redirect } from "next/navigation"
import { getPaginatedProductsWhitImages } from "@/actions"
import { Pagination, ProductGrid, Title } from "@/components"

// @ts-expect-error// @ts-expect-error Next.js dynamic params may be a promise 
export default async function GenderPage({ params, searchParams }) {
    const { gender } = await params as { gender: string };
    const genderMap: Record<string, string> = {
        men: "hombres",
        women: "mujeres",
        kids: "niños",
        unisex: "todos"
    };

    const { page } = await searchParams;
    const pageNumber = page ? parseInt(page) : 1;

    if (!genderMap[gender]) notFound();

    // @ts-expect-error getPaginatedProductsWhitImages types may not match
    const { products, totalPages } = await getPaginatedProductsWhitImages({ page: pageNumber, gender });

    if (products.length === 0) redirect(`/gender/${gender}`);

    return (
        <>
            <Title
                title="Productos"
                subTitle={`Productos para ${genderMap[gender]}`}
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