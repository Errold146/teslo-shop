// TableProducts.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "@/utils/currency";
import type { Product } from "@/interfaces";
import { ProductImage } from "@/components";

interface Props {
    products: Product[];
    currentPage: number;
}

export const TableProducts = ({ products, currentPage }: Props) => {
    return (
        <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full overflow-x-auto rounded-xl shadow bg-white"
        >
            <table className="min-w-full table-fixed divide-y divide-gray-200">
                <colgroup>
                    <col style={{ width: "80px" }} />
                    <col style={{ width: "100px" }} />
                    <col style={{ width: "220px" }} />
                    <col style={{ width: "100px" }} />
                    <col style={{ width: "100px" }} />
                    <col style={{ width: "100px" }} />
                    <col style={{ width: "150px" }} />
                </colgroup>
                <thead className="sticky top-0 z-10 bg-gradient-to-r from-gray-50 to-gray-200 border-b border-gray-200">
                    <tr>
                        <th className="px-4 py-3 text-center text-xs font-extrabold text-gray-600 uppercase tracking-widest">#ID</th>
                        <th className="px-4 py-3 text-center text-xs font-extrabold text-gray-600 uppercase tracking-widest">Imagen</th>
                        <th className="px-4 py-3 text-center text-xs font-extrabold text-gray-600 uppercase tracking-widest">Título</th>
                        <th className="px-4 py-3 text-center text-xs font-extrabold text-gray-600 uppercase tracking-widest">Precio</th>
                        <th className="px-4 py-3 text-center text-xs font-extrabold text-gray-600 uppercase tracking-widest">Género</th>
                        <th className="px-4 py-3 text-center text-xs font-extrabold text-gray-600 uppercase tracking-widest">Inventario</th>
                        <th className="px-4 py-3 text-center text-xs font-extrabold text-gray-600 uppercase tracking-widest">Tallas</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((prod, idx) => (
                        <tr
                            key={prod.id}
                            className={`
                                ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                                hover:bg-indigo-50 transition-colors align-middle
                                border-b border-gray-100 last:border-b-0
                            `}
                        >
                            <td className="px-4 py-3 text-center whitespace-nowrap text-sm text-gray-700 font-bold font-mono">{prod.id.split("-").at(-1)}</td>
                            <td className="px-4 py-3 whitespace-nowrap">
                                <Link href={`/product/${prod.slug}`} title="Ver Producto">
                                    <ProductImage
                                        src={prod.images[0]}
                                        alt={`Imagen del producto: ${prod.title}`}
                                        width={64}
                                        height={64}
                                        className="w-16 h-16 object-cover rounded-lg shadow-sm border border-gray-200"
                                    />
                                </Link>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-800 max-w-[180px] overflow-hidden">
                                <Link
                                    href={`/admin/product/${prod.slug}`}
                                    className="hover:text-indigo-600 hover:underline block"
                                    title="Actualizar Producto"
                                >
                                    <span className="truncate block">{prod.title}</span>
                                </Link>
                            </td>
                            <td className="px-4 py-3 text-center whitespace-nowrap text-xs text-gray-700 font-semibold">{formatCurrency(prod.price)}</td>
                            <td className="px-4 py-3 text-center whitespace-nowrap text-xs text-gray-700">{prod.gender}</td>
                            <td className="px-4 py-3 text-center whitespace-nowrap text-xs text-gray-700">
                                <span className={`px-2 py-1 rounded-full text-xs font-bold
                                    ${prod.inStock > 10 ? "bg-green-100 text-green-700" :
                                        prod.inStock > 0 ? "bg-yellow-100 text-yellow-700" :
                                            "bg-red-100 text-red-700"}`}
                                >
                                    {prod.inStock}
                                </span>
                            </td>
                            <td className="px-4 py-3 text-center whitespace-nowrap text-xs text-gray-700 max-w-[120px]">
                                <span className="inline-block truncate" title={prod.sizes.join(", ")}>
                                    {prod.sizes.join(", ")}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </motion.div>
    );
};