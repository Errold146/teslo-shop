import Image from "next/image";
import Link from "next/link";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import { formatCurrency } from "@/utils/currency";

const productsInCart = [
    initialData.products[0],
    // initialData.products[21],
    // initialData.products[32],
]

export default function CheckoutPage() {
    return (
        <div className="flex flex-col justify-center items-center my-4 md:my-12 sm:px-0">
            <div className="flex flex-col w-full max-w-[900px] bg-white rounded-xl shadow-lg p-6 sm:p-10">

                {/* Título del carrito */}
                <Title title="Verificar Orden" className="text-3xl font-bold text-gray-900 mb-8 text-center" />

                <div className="grid grid-cols-1 gap-6">

                    {/* Continuar comprando */}
                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                        <span className="text-lg font-medium text-gray-700">Ajustar elementos</span>
                        <Link href={"/cart"} className="text-indigo-600 hover:text-indigo-800 font-semibold text-lg transition">
                            Editar Productos
                        </Link>
                    </div>

                    {/* Items en el carrito */}
                    {productsInCart.map(prod => (
                        <div
                            key={prod.slug}
                            className="flex flex-col sm:flex-row items-center bg-gray-50 rounded-xl shadow-md p-6 transition hover:shadow-lg gap-6"
                        >
                            {/* Imagen del producto */}
                            <Image
                                src={`/products/${prod.images[0]}`}
                                alt={prod.title}
                                width={150}
                                height={150}
                                className="rounded-lg object-cover border border-gray-300 mx-auto sm:mx-0"
                            />

                            {/* Detalles del producto */}
                            <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between w-full text-center sm:text-left">
                                <div className="flex-1">
                                    <p className="text-xl font-semibold text-gray-800">{prod.title}</p>
                                    <p className="text-indigo-600 font-bold">{formatCurrency(prod.price)} 
                                        <span className=" text-gray-600"> X 3</span>
                                    </p>
                                    <p className=" font-bold">Subtotal: 
                                        <span className="text-indigo-600 font-bold">{formatCurrency(prod.price * 3)}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Checkout - Ubicado al final */}
                <div className="mt-10 bg-gray-50 rounded-xl shadow-lg p-6 sm:p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center sm:text-left">Resumen de la orden</h2>

                    <h2 className="text-2xl mb-4 font-semibold flex items-center gap-2">
                        <FaMapMarkerAlt className="w-6 h-6 text-indigo-500" />
                        Dirección de entrega
                        <Link href="/checkout/address" className="ml-auto text-indigo-600 hover:underline text-base font-medium">
                            Editar
                        </Link>
                    </h2>
                    <div className="mb-10 bg-white rounded-lg border border-gray-200 shadow-sm p-5">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-lg">
                                EN
                            </span>
                            <span className="font-semibold text-lg text-gray-900">Errold Núñez Sánchez</span>
                        </div>
                        <div className="text-gray-700 space-y-1 pl-12">
                            <p>San José, Desamparados</p>
                            <p>Código Postal: <span className="font-medium">10025</span></p>
                            <p>Tel: <span className="font-medium">+506 2525 3651</span></p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-lg text-gray-700">
                        <span>No. productos</span>
                        <span className="text-right">3 artículos</span>

                        <span>Subtotal:</span>
                        <span className="text-right text-indigo-600">$100.00</span>

                        <span>Impuestos (13%)</span>
                        <span className="text-right text-indigo-600">$13.00</span>

                        <hr className="col-span-2 my-2 border-gray-300" />

                        <span className="text-2xl font-semibold">Total:</span>
                        <span className="text-right text-2xl text-indigo-600">$113.00</span>
                    </div>
                    <div className="mt-5 w-full">
                        <p className="text-xs text-gray-500 text-center mb-4">
                            Al continuar, aceptas nuestros <Link href="/terminos" className="underline hover:text-indigo-600">Términos y Condiciones</Link> y <Link href="/privacidad" className="underline hover:text-indigo-600">Política de Privacidad</Link>.
                        </p>
                        <Link
                            href="/orders/1122"
                            className="flex btn-primary justify-center text-white font-bold py-3 rounded-lg transition-colors"
                        >
                            Agregar orden
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}