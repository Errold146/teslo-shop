import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";

export const metadata = {
    title: "Sin productos",
    description: 'No hay productos en el carritode compras.'
};

export default function EmptyPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(90vh-140px)] px-4 py-10 bg-gradient-to-br from-white to-gray-100">
            <div className="flex flex-col items-center bg-white rounded-xl shadow-lg p-8 w-full max-w-sm">
                <IoCartOutline size={100} className="text-gray-400 mb-6" />
                <h1 className="text-2xl font-bold text-red-600 mb-4 text-center">Tu carrito está vacío</h1>
                <p className="text-gray-500 mb-6 text-center">
                    ¡Parece que aún no has agregado productos! Explora nuestra tienda y encuentra lo que buscas.
                </p>
                <Link
                    href="/"
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg shadow transition-colors text-lg w-full text-center"
                >
                    Ir a la tienda
                </Link>
            </div>
        </div>
    )
}