import Link from 'next/link';
import { IoCardOutline } from 'react-icons/io5';
import { SalesSummary, Title } from '@/components';
import { getPaginatedOrders } from '@/actions';
import { redirect } from 'next/navigation';
import { auth } from '@/auth.config';
import { formatCurrency } from '@/utils/currency';
import { MonthYearSelector } from '@/components/orders/MonthYearSelector';

export const metadata = {
    title: "Todas las Ordenes",
    description: "Revisión del total de las ordenes realizadas."
};

type Order = {
    id: string;
    isPaid: boolean;
    total: number;
    createAt: string;
    OrderAddress?: {
        firstName?: string;
        lastName?: string;
    };
};

export default async function OrdersAdminPage() {

    const session = await auth()
    if ( session?.user.role !== 'admin' ) redirect('/');

    const { ok, orders = [] } = await getPaginatedOrders() as { ok: boolean, orders: Order[] }
    if (!ok) redirect('/auth/login');

    return (
        <>
            <Title title="Todas las Ordenes" subTitle={`Benvenido ${session?.user.name}`} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
                <MonthYearSelector />
                <div className="w-full overflow-x-auto rounded-lg shadow bg-white">
                    <table className="min-w-full divide-y divide-gray-200">

                        <thead className="bg-gradient-to-r from-gray-100 to-gray-200">
                            <tr>
                                <th scope="col" className="px-4 py-3 sm:px-8 sm:py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                                    #ID
                                </th>
                                <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                                    Nombre completo
                                </th>
                                <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                                    Estado
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                                    Fecha
                                </th>
                                <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                                    Opciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">

                            {
                                orders.map(or => (
                                    <tr key={or.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                            {or.id.split('-').at(-1)}
                                        </td>
                                        <td className="px-4 py-3 sm:px-2 sm:py-4 whitespace-nowrap text-sm text-gray-700">
                                            {or.OrderAddress?.firstName} {' '} {or.OrderAddress?.lastName}
                                        </td>
                                        <td className="px-4 py-3 sm:px-2 sm:py-4 whitespace-nowrap">
                                            {
                                                or.isPaid ? (
                                                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-100">
                                                        <IoCardOutline className="text-green-600 mr-1" />
                                                        <span className="text-xs font-medium text-green-700">Pagado</span>
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-red-100">
                                                        <IoCardOutline className="text-red-600 mr-1" />
                                                        <span className="text-xs font-medium text-red-700">Pendiente</span>
                                                    </span>
                                                )
                                            }
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                                            {new Date(or.createAt).toLocaleDateString('es-CR', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                                            {formatCurrency(or.total)}
                                        </td>
                                        <td className="px-4 py-3 sm:px-2 sm:py-4 whitespace-nowrap">
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

                    {/* Resumen mensual de ventas */}
                    { <SalesSummary orders={orders} /> }
                </div>
            </div>
        </>
    );
}

