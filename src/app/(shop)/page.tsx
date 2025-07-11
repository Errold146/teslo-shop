export const revalidate = 60

import { redirect } from "next/navigation";
import { Pagination, ProductGrid, Title } from "@/components";
import { getPaginatedProductsWhitImages } from "@/actions";

// @ts-expect-error Next.js dynamic params may be a promise
export default async function ShopPage({ searchParams }) {

    const { page } = searchParams;
    const pageNumber = page ? parseInt(page) : 1;
    const { products, totalPages } = await getPaginatedProductsWhitImages({ page: pageNumber });

    if (products.length === 0) redirect('/');

    const normalizedProducts = products.map(product => ({
        ...product,
        description: product.description ?? "",
    }));

    return (
        <>
            <Title
                title="Tienda"
                subTitle="Todos los productos"
                className="mb-2"
            />

            <Pagination totalPages={totalPages} />

            <ProductGrid products={normalizedProducts} />

            <Pagination totalPages={totalPages} />
        </>
    );
}