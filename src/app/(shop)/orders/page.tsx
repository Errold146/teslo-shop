import Link from 'next/link';
import { IoCardOutline } from 'react-icons/io5';
import { Title } from '@/components';

export const metadata = {
    title: "Total de Ordenes",
    description: "Revisión del total de las ordenes realizadas."
};

export default function OrdersPage() {
    return (
        <>
            <Title title="Orders" subTitle='Todas las ordenes' />

            <div className="w-full overflow-x-auto my-4 md:my-10 p-2 sm:p-10">
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
                            <tr className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-sm font-semibold text-gray-900">1</td>
                                <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-700">
                                    Mark
                                </td>
                                <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-100">
                                        <IoCardOutline className="text-green-600 mr-1" />
                                        <span className="text-xs font-medium text-green-700">Pagada</span>
                                    </span>
                                </td>
                                <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                                    <Link
                                        href="/orders/123"
                                        className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded hover:bg-blue-100 transition"
                                    >
                                        Ver orden
                                    </Link>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-sm font-semibold text-gray-900">2</td>
                                <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-700">
                                    Mark
                                </td>
                                <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-red-100">
                                        <IoCardOutline className="text-red-600 mr-1" />
                                        <span className="text-xs font-medium text-red-700">No Pagada</span>
                                    </span>
                                </td>
                                <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                                    <Link
                                        href="/orders/123"
                                        className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded hover:bg-blue-100 transition"
                                    >
                                        Ver orden
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}