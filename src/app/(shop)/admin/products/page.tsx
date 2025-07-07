// page.tsx
import Link from "next/link";
import { redirect } from "next/navigation";
import { Pagination, Title } from "@/components";
import { auth } from "@/auth.config";
import { getPaginatedProductsWhitImages } from "@/actions";
import { TableProducts } from "./ui/TableProducts";

export const metadata = {
    title: "Todas los Productos",
    description: "Revisión del total de los productos en existencia.",
};

interface Props {
    searchParams: {
        page?: string;
    };
}

export default async function ProductsAdminPage({ searchParams }: Props) {
    const session = await auth();
    if (session?.user.role !== "admin") redirect("/");

    const { page } = await searchParams;
    const pageNumber = page ? parseInt(page) : 1;
    const { products, currentPage, totalPages } = await getPaginatedProductsWhitImages({ page: pageNumber });

    // Ensure description is always a string
    const safeProducts = products.map(product => ({
        ...product,
        description: product.description ?? "",
    }));

    return (
        <>
            <Title title="Todos los Productos." subTitle={`Benvenido ${session?.user.name}`} />
            <Pagination totalPages={totalPages} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
                <div className="flex justify-end mb-5">
                    <Link href={"/admin/product/new"} className="btn-primary">
                        Nuevo Producto
                    </Link>
                </div>
                
                <TableProducts products={safeProducts} currentPage={currentPage} />

                <Pagination totalPages={totalPages} />
            </div>
        </>
    );
}