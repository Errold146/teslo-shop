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
            className={` btn-primary cursor-pointer ${className}`}
        >
            {label}
        </button>
    );
};