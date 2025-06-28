import Link from "next/link";
import { Title } from "@/components";
import { ProductsInCart } from "./ui/ProductsInCart";
import { MdAddShoppingCart } from "react-icons/md";
import { OrderSummary } from "./ui/OrderSummary";

export const metadata = {
    title: "Carrito de compras",
    description: "Revisa los productos en tu carrito antes de completar la compra en Teslo Shop."
};

export default function CartPage() {

    return (
        <div className="flex flex-col justify-center items-center md:my-10 sm:px-0">
            <div className="flex flex-col w-full max-w-[1150px] bg-white rounded-xl shadow-lg p-6 sm:p-10">

                {/* Título del carrito */}
                <Title title="Lista de compras" className="text-3xl font-bold text-gray-900 text-center" />

                <div className="grid grid-cols-1 gap-6">

                    {/* Continuar comprando */}
                    <div className="flex flex-col sm:flex-row items-center sm:justify-start gap-2 text-center sm:text-left">
                        <span className="text-lg font-medium text-gray-700">Agregar más productos:</span>
                        <Link
                            href={"/"}
                            className="inline-flex items-center gap-1 sm:gap-2 text-gray-700 hover:text-indigo-600 font-semibold text-lg transition hover:underline"
                        >
                            <span className="whitespace-nowrap">Continuar comprando</span>
                            <MdAddShoppingCart size={25} className="relative -top-[1px]" />
                        </Link>
                    </div>

                    {/* Items en el carrito */}
                    <ProductsInCart />
                </div>

                {/* Checkout */}
                <div className="mt-10 bg-gray-50 rounded-xl shadow-lg p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center sm:text-left">Resumen de la orden</h2>
                    
                    <OrderSummary />

                    <div className="mt-5 w-full">
                        <Link
                            href="/checkout/address"
                            className="flex btn-primary justify-center text-white font-bold py-3 rounded-lg transition-colors"
                        >
                            Checkout
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}