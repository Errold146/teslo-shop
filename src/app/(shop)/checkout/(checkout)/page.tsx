import Link from "next/link";
import { Title } from "@/components";
import { ProductsInCart } from "./ui/ProductsInCart";
import { PlaceOrder } from "./ui/PlaceOrder";

export const metadata = {
    title: "Orden de Compra",
    description: "Revisa que todo este en orden y los datos sean correctos para completar la compra en Teslo Shop."
}

export default function CheckoutPage() {
    return (
        <div className="flex flex-col justify-center items-center my-4 md:my-12 sm:px-0">
            <div className="flex flex-col w-full max-w-[1200px] bg-white rounded-xl shadow-lg p-6 sm:p-10">

                {/* Título del carrito */}
                <Title title="Verificar Orden" className="text-3xl font-bold text-gray-900 mb-8 text-center" />

                <div className="grid grid-cols-1 gap-6">

                    {/* Continuar comprando */}
                    <div className="w-full max-w-4xl mx-auto">
                        <span className="block text-lg font-medium text-gray-700 mb-3">Ajustar elementos</span>
                        <nav className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white rounded-lg border border-gray-200 p-3 shadow-sm text-center">
                            <Link
                                href="/"
                                className="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100 font-medium transition-colors duration-200 rounded-md py-2"
                            >
                                Continuar comprando
                            </Link>
                            <Link
                                href="/cart"
                                className="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100 font-medium transition-colors duration-200 rounded-md py-2"
                            >
                                Editar productos
                            </Link>
                            <Link
                                href="/checkout/address"
                                className="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100 font-medium transition-colors duration-200 rounded-md py-2"
                            >
                                Editar dirección
                            </Link>
                        </nav>
                    </div>

                    {/* Items en el carrito */}
                    <ProductsInCart />
                </div>

                {/* Checkout */}
                <PlaceOrder />

            </div>
        </div>
    );
}