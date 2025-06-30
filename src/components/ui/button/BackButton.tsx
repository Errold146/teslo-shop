'use client';

import { useRouter } from 'next/navigation';
import type { FC } from 'react';

interface BackButtonProps {
    label: string;
    className?: string;
}

export const BackButton: FC<BackButtonProps> = ({ label, className = '' }) => {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className={`text-indigo-600 hover:text-indigo-700 hover:underline text-sm md:text-base ${className}`}
        >
            {label}
        </button>
    );
};