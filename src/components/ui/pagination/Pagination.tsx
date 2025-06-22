"use client"

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface Props {
    totalPages: number;
}

// Componente de paginación que recibe el total de páginas como prop
export const Pagination = ({ totalPages }: Props) => {

    // Obtiene el path actual de la URL
    const pathName = usePathname();
    // Obtiene los parámetros de búsqueda de la URL
    const searchParams = useSearchParams();
    // Obtiene el número de página actual desde los parámetros de búsqueda, por defecto 1
    const currentPage = Number(searchParams.get('page')) || 1;

    // Función para crear la URL de cada página, actualizando el parámetro 'page'
    const createPageUrl = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        if (pageNumber === '...') return `${pathName}?${params.toString()}`;
        params.set('page', pageNumber.toString());
        return `${pathName}?${params.toString()}`;
    };

    // Función que genera el arreglo de páginas a mostrar (números y puntos suspensivos)
    const getPages = () => {
        const pages: (number | string)[] = [];
        // Si hay 5 páginas o menos, muestra todas
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            // Si la página actual está cerca del inicio
            if (currentPage <= 3) {
                pages.push(1, 2, 3, "...", totalPages);
                // Si la página actual está cerca del final
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
                // Si la página actual está en el medio
            } else {
                pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
            }
        }
        return pages;
    };

    // Estilos para los botones deshabilitados
    const disabledStyles = "opacity-50 pointer-events-none bg-gray-200 text-gray-400";

    return (
        <div className="flex justify-center my-8">
            <nav aria-label="Pagination">
                <ul className="flex flex-wrap justify-center items-center gap-2 px-2 py-1 text-sm sm:text-base">
                    {/* Botón para ir a la página anterior */}
                    <li>
                        <Link
                            className={`px-3 py-2 rounded-md transition-colors duration-200 font-semibold cursor-pointer text-indigo-600 hover:bg-blue-50 hover:text-indigo-700
                                ${currentPage === 1 ? disabledStyles : ""}
                            `}
                            href={createPageUrl(Math.max(currentPage - 1, 1))}
                            aria-disabled={currentPage === 1}
                            tabIndex={currentPage === 1 ? -1 : 0}
                        >
                            <span className="inline-block align-middle mr-1"><IoChevronBackOutline size={25} /></span>
                            Anterior
                        </Link>
                    </li>

                    {/* Renderiza los números de página y los puntos suspensivos */}
                    {getPages().map((page, idx) => (
                        <li key={idx}>
                            {page === "..." ? (
                                // Si es puntos suspensivos, solo muestra texto
                                <span className="px-3 py-2 rounded-md font-semibold text-gray-500 select-none">...</span>
                            ) : (
                                // Si es un número de página, muestra el enlace correspondiente
                                <Link
                                    className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-md transition-colors duration-200 font-semibold cursor-pointer
                                        ${currentPage === page
                                            ? "bg-indigo-600 text-white"
                                            : "text-gray-700 hover:text-indigo-700 hover:bg-indigo-50"
                                        }`}
                                    href={createPageUrl(page)}
                                >
                                    {page}
                                </Link>
                            )}
                        </li>
                    ))}

                    {/* Botón para ir a la página siguiente */}
                    <li>
                        <Link
                            className={`px-3 py-2 rounded-md transition-colors duration-200 font-semibold cursor-pointer text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700
                                ${currentPage === totalPages ? disabledStyles : ""}
                            `}
                            href={createPageUrl(Math.min(currentPage + 1, totalPages))}
                            aria-disabled={currentPage === totalPages}
                            tabIndex={currentPage === totalPages ? -1 : 0}
                        >
                            Siguiente
                            <span className="inline-block align-middle ml-1"><IoChevronForwardOutline size={25} /></span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};
