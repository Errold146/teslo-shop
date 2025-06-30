import Link from 'next/link';
import { IoCardOutline } from 'react-icons/io5';
import { Title } from '@/components';
import { getOrdersByUser } from '@/actions';
import { redirect } from 'next/navigation';

export const metadata = {
    title: "Todas las Ordenes",
    description: "Revisión del total de las ordenes realizadas."
};

export default async function OrdersPage() {

    const { ok, orders = [] } = await getOrdersByUser()
    if ( !ok ) redirect('/auth/login');

    return (
        <>
            <Title title="Orders" subTitle='Todas las ordenes' />

            <div className="w-full overflow-x-auto mt-2 mb-4 md:my-10 p-2 sm:p-10">
                <div className="min-w-[600px] shadow-lg rounded-lg overflow-hidden bg-white">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gradient-to-r from-gray-100 to-gray-200">
                            <tr>
                                <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                    #ID
                                </th>
                                <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                    Nombre completo
                                </th>
                                <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                    Estado
                                </th>
                                <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                    Opciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">

                            {
                                orders.map(or => (
                                    <tr key={or.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                            { or.id.split('-').at(-1)}
                                        </td>
                                        <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-700">
                                            {or.OrderAddress?.firstName} {' '} {or.OrderAddress?.lastName}
                                        </td>
                                        <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                                            {
                                                or.isPaid ? (
                                                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-100">
                                                        <IoCardOutline className="text-green-600 mr-1" />
                                                        <span className="text-xs font-medium text-green-700">Cancelada</span>
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-red-100">
                                                        <IoCardOutline className="text-red-600 mr-1" />
                                                        <span className="text-xs font-medium text-red-700">Pendiente...</span>
                                                    </span>
                                                )
                                            }
                                        </td>
                                        <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                                            <Link
                                                href={`/orders/${or.id}`}
                                                className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded hover:bg-blue-100 transition"
                                            >
                                                Ver orden
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}