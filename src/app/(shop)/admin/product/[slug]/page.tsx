import { getCategories, getProductSlug } from "@/actions";
import { BackButton, Title } from "@/components";
import { PageNotFound } from "@/components"
import { ProductForm } from "./ui/ProductForm";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

interface Props {
    params :{
        slug: string
    }
}

export const metadata = {
    title: "Administrar Producto",
    description: "Administración del producto.",
};

export default async function ProductPage({ params }: Props) {
    
    const { slug } = await params;

    const session = await auth();
    if (session?.user.role !== "admin") redirect("/");

    const [product, categories] = await Promise.all([
        getProductSlug(slug),
        getCategories(),
    ]);

    if ( !product && slug !== 'new' ) {
        return <PageNotFound />;
    }

    const isNew = slug === "new";
    const title = isNew ? "Nuevo Producto" : "Editar Producto";
    const subTitle = isNew
        ? "Crea un nuevo producto, llena todo los campos."
        : `Actualizar el producto: ${product?.title ?? ""}`;

    return (
        <>
            <Title title={title} subTitle={subTitle} />
            <div className="w-full max-w-7xl md:mx-auto mb-3 flex justify-center md:justify-end">
                <BackButton label="Regresar" className=" transition-alltransition-all duration-200 ease-in-out" />
            </div>
            <ProductForm
                product={{ ...product ?? {}, description: product?.description ?? "" }}
                category={categories}
            />
        </>
    );
}