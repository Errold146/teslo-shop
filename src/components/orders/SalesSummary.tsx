'use client';

import { motion } from 'framer-motion';
import { formatCurrency } from '../../utils/currency';

interface Order {
    id: string;
    isPaid: boolean;
    total: number;
    createAt: string;
}

interface Props {
    orders: Order[];
}

export const SalesSummary = ({ orders }: Props) => {
    const totalOrders = orders.length;
    const totalPaid = orders.filter(o => o.isPaid).length;
    const totalAmount = orders
        .filter(o => o.isPaid)
        .reduce((sum, o) => sum + o.total, 0);

    const latestDate = orders[0]?.createAt ? new Date(orders[0].createAt) : new Date();
    const month = latestDate.toLocaleString('es-CR', { month: 'long' });
    const year = latestDate.getFullYear();

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-200 px-6 py-4 bg-white"
        >
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Resumen de ventas - {month.charAt(0).toUpperCase() + month.slice(1)} {year}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-700">
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md shadow-sm">
                    <span>Órdenes totales</span>
                    <span className="font-semibold text-gray-900">{totalOrders}</span>
                </div>
                <div className="flex items-center justify-between bg-green-50 p-3 rounded-md shadow-sm">
                    <span>Órdenes pagadas</span>
                    <span className="font-semibold text-green-700">{totalPaid}</span>
                </div>
                <div className="flex items-center justify-between bg-blue-50 p-3 rounded-md shadow-sm">
                    <span>Total vendido</span>
                    <span className="font-semibold text-blue-700">
                        {formatCurrency(totalAmount)}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};