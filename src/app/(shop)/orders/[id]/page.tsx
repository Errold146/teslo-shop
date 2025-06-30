import clsx from "clsx";
import Image from "next/image";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoCardOutline } from "react-icons/io5";
import { Title } from "@/components";
import { getOrderById } from "@/actions";
import { formatCurrency } from "@/utils/currency";
import { redirect } from "next/navigation";

export const metadata = {
    title: "Ordenes",
    description: "Aquí te presentamos un resumen de tus ordenes."
};

// @ts-expect-error Next.js dynamic params may be a promise
export default async function OrderPageId({params}) {

    const { id } = await params
    const { order, ok } = await getOrderById(id)
    if ( !ok ) redirect('/');

    const address = order!.OrderAddress
    const getInitials = (first: string, last: string) => `${first?.[0] || ''}${last?.[0] || ''}`.toUpperCase()

    return (
        <div className="flex flex-col justify-center items-center mb-4 md:my-24 sm:px-0">
            <div className="flex flex-col w-full max-w-[1000px] bg-white rounded-xl shadow-lg p-6 sm:p-10">

                {/* Título de la orden */}
                <Title 
                    title={'Orden'} 
                    subTitle={`# ${id.split('-').at(-1)}`}
                    className="text-3xl font-bold text-gray-900 text-center" 
                />

                <div className="grid grid-cols-1 gap-6">

                    {/* Continuar comprando */}
                    <div className={
                        clsx(
                            "flex items-center rounded-lg py-2 px-3.5 text-xs font-semibold text-white mb-5",
                            {
                                "bg-red-500": !order!.isPaid,
                                "bg-green-600": order!.isPaid
                            }
                        )
                    }>
                        <IoCardOutline size={30} />
                        {/* <span className=" ml-3 text-sm">Pendiente de pago</span> */}
                        <span className=" ml-3 text-sm">
                            {
                                order?.isPaid ? 'Cancelada.' : 'Pendiente de pago...'
                            }
                        </span>
                    </div>

                    <h2 className="text-2xl font-semibold">Productos comprados</h2>

                    {/* Items en el carrito */}
                    {order!.OrderItem.map(item => (
                        <article
                            key={item.product.slug + '-' + item.size}
                            className="flex flex-col sm:flex-row items-center bg-white rounded-2xl shadow-sm border border-gray-200 p-6 transition hover:shadow-md gap-6"
                        >
                            {/* Imagen del producto */}
                            <Image
                                src={`/products/${item.product.ProductImage[0].url}`}
                                alt={item.product.title}
                                width={140}
                                height={140}
                                className="rounded-lg object-cover border border-gray-300 mx-auto sm:mx-0"
                            />

                            {/* Detalles del producto */}
                            <div className="flex-1 flex flex-col gap-3 w-full text-center sm:text-left">
                                <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                                    {item.product.title}
                                </h2>

                                <div className="text-base md:text-lg text-gray-800 font-medium flex flex-wrap justify-center sm:justify-start gap-x-2">
                                    <span className="whitespace-nowrap text-indigo-700">{formatCurrency(item.price)}</span>
                                    <span className="text-gray-500">×</span>
                                    <span className="whitespace-nowrap">{item.quantity}</span>
                                    <span className="text-gray-500">=</span>
                                    <span className="text-indigo-700 font-semibold whitespace-nowrap">
                                        {formatCurrency(item.price * item.quantity)}
                                    </span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Checkout */}
                <div className="mt-10 bg-gray-50 rounded-xl shadow-lg p-6 sm:p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center sm:text-left">Resumen de la orden</h2>

                    <h2 className="text-2xl mb-4 font-semibold flex items-center gap-2 justify-center">
                        <FaMapMarkerAlt className="w-6 h-6 text-indigo-500" />
                        Dirección de entrega
                        
                    </h2>
                    <div className="mb-10 bg-white sm:flex sm:justify-center rounded-lg border border-gray-200 shadow-sm px-5 py-6 sm:px-8 sm:py-7">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-5 mb-4">
                            <span className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-lg shrink-0 mx-auto sm:mx-0">
                                {getInitials(address!.firstName, address!.lastName)}
                            </span>
                            <span className="mt-2 sm:mt-0 text-center sm:text-left font-semibold text-base sm:text-lg text-gray-900">
                                {address!.firstName} {' '} {address!.lastName}
                            </span>
                        </div>

                        <div className="text-gray-700 space-y-1 sm:pl-16 text-sm sm:text-base leading-relaxed text-center sm:text-left">
                            <p>{address!.address}</p>
                            <p>{address!.address2}</p>
                            <p>{address!.city}, {address!.countryId}</p>
                            <p>
                                Código Postal: <span className="font-medium">{address!.postalCode}</span>
                            </p>
                            <p>
                                Tel: <span className="font-medium">{address!.phone}</span>
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-lg text-gray-700">
                        <span>Cantidad de artículos:</span>
                        <span className="text-right text-indigo-600">
                            {order!.itemsInOrder === 1 ? "1 Artículo" : `${order!.itemsInOrder} Artículos`}
                        </span>

                        <hr className="col-span-2 my-2 border-gray-300" />

                        <span>Subtotal:</span>
                        <span className="text-right text-indigo-600">{formatCurrency(order!.subTotal)}</span>

                        <hr className="col-span-2 my-2 border-gray-300" />

                        <span>Impuestos (13%):</span>
                        <span className="text-right text-indigo-600">{formatCurrency(order!.tax)}</span>

                        <hr className="col-span-2 my-2 border-gray-300" />

                        <span className="text-2xl font-semibold">Total:</span>
                        <span className="text-right text-2xl text-indigo-600">{formatCurrency(order!.total)}</span>
                    </div>
                    <div className="mt-5 w-full">
                        <div className={
                            clsx(
                                "flex items-center rounded-lg py-2 px-3.5 text-xs font-semibold text-white mb-5",
                                {
                                    "bg-red-500": !order!.isPaid,
                                    "bg-green-600": order!.isPaid
                                }
                            )
                        }>
                            <IoCardOutline size={30} />
                            {/* <span className=" ml-3 text-sm">Pendiente de pago</span> */}
                            <span className=" ml-3 text-sm">
                                {
                                    order?.isPaid ? 'Cancelada.' : 'Pendiente de pago...'
                                }
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}