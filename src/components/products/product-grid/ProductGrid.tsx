import type { Product } from "@/interfaces"
import { ProductGridItem } from "./ProductGridItem"

interface Props {
    products: Product[]
}

export const ProductGrid = ({products}: Props) => {
    return (
        <div className="grid grid-col sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 mb-10 p-20">
            {
                products.map( prod => (
                    <ProductGridItem 
                        key={prod.slug}
                        product={prod}
                    />
                ))
            }
        </div>
    )
}