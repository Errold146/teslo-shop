"use client"

import { useCartStore } from "@/store";
import { formatCurrency } from "@/utils/currency";

export const OrderSummary = () => {
    const subTotal = useCartStore(state => state.subTotal);
    const tax = useCartStore(state => state.tax);
    const total = useCartStore(state => state.total);
    const totalItems = useCartStore(state => state.totalItems);

    return (
        <div className="grid grid-cols-2 gap-2 text-lg text-gray-700">
            <span>Cantidad de artículos:</span>
            <span className="text-right text-indigo-600">
                {totalItems === 1 ? "1 Artículo" : `${totalItems} Artículos`}
            </span>

            <hr className="col-span-2 my-2 border-gray-300" />

            <span>Subtotal:</span>
            <span className="text-right text-indigo-600">{formatCurrency(subTotal)}</span>

            <hr className="col-span-2 my-2 border-gray-300" />

            <span>Impuestos (13%):</span>
            <span className="text-right text-indigo-600">{formatCurrency(tax)}</span>

            <hr className="col-span-2 my-2 border-gray-300" />

            <span className="text-2xl font-semibold">Total:</span>
            <span className="text-right text-2xl text-indigo-600">{formatCurrency(total)}</span>
        </div>
    );
};