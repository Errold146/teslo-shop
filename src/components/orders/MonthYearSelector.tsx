'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

export const MonthYearSelector = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentMonth = Number(searchParams.get('month')) || new Date().getMonth() + 1;
    const currentYear = Number(searchParams.get('year')) || new Date().getFullYear();

    const [month, setMonth] = useState(currentMonth);
    const [year, setYear] = useState(currentYear);

    const handleChange = (newMonth: number, newYear: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('month', newMonth.toString());
        params.set('year', newYear.toString());
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="flex flex-wrap gap-4 items-center mb-4">
            <select
                value={month}
                onChange={(e) => {
                    const newMonth = Number(e.target.value);
                    setMonth(newMonth);
                    handleChange(newMonth, year);
                }}
                className="border-none bg-blue-50 shadow-md text-blue-600 rounded px-3 py-2 text-sm font-semibold"
            >
                {months.map((name, idx) => (
                    <option key={idx} value={idx + 1}>{name}</option>
                ))}
            </select>

            <select
                value={year}
                onChange={(e) => {
                    const newYear = Number(e.target.value);
                    setYear(newYear);
                    handleChange(month, newYear);
                }}
                className="border-none bg-blue-50 shadow-md text-blue-600 rounded px-3 py-2 text-sm font-semibold"
            >
                {Array.from({ length: 3 }, (_, i) => new Date().getFullYear() - i).map(y => (
                    <option key={y} value={y}>{y}</option>
                ))}
            </select>
        </div>
    );
};