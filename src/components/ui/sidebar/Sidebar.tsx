"use client"

import Link from "next/link"
import { useSession, signOut } from 'next-auth/react'
import { ImListNumbered } from "react-icons/im"
import {
    IoCloseOutline,
    IoCreateOutline,
    IoLogInOutline,
    IoLogOutOutline,
    IoPeopleOutline,
    IoPersonOutline,
    IoSearchOutline,
    IoShirtOutline,
    IoTicketOutline
} from "react-icons/io5"
import clsx from "clsx"
import { useUIStore } from "@/store"
import { useRouter } from "next/navigation"

export const Sidebar = () => {

    const router = useRouter()
    const openMenu = useUIStore(state => state.isSideMenuOpen)
    const closeMenu = useUIStore(state => state.closeSideMenu)

    const { data: session, status } = useSession()
    if (status === 'loading') return null

    const isAuthenticated = !!session?.user

    const handleLogout = async () => {
        closeMenu()
        await new Promise(r => setTimeout(r, 100))
        await signOut({ redirect: false })
        router.push('/')
    }

    return (
        <div>
            {/* Fondo oscuro detrás del menú */}
            {openMenu && (
                <>
                    <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
                    <div
                        onClick={closeMenu}
                        className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-blur-md bg-black/40"
                    />
                </>
            )}

            {/* Sidebar */}
            <nav
                className={clsx(
                    "fixed p-8 right-0 top-0 w-full max-w-md h-screen bg-white z-20 shadow-2xl rounded-l-3xl flex flex-col gap-6 transform transition-all duration-300",
                    { "translate-x-full": !openMenu }
                )}
            >
                {/* Cerrar botón */}
                <div className="flex justify-end">
                    <button
                        aria-label="Cerrar menú"
                        className="text-gray-400 hover:text-gray-700 transition-colors"
                        onClick={closeMenu}
                    >
                        <IoCloseOutline size={36} />
                    </button>
                </div>

                {/* Buscador */}
                <div className="relative mt-2">
                    <IoSearchOutline size={22} className="absolute top-2.5 left-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar productos y/o ..."
                        className="w-full bg-gray-100 rounded-full pl-10 pr-4 py-2 text-lg border border-transparent focus:outline-none focus:border-indigo-500 transition-all shadow-sm"
                    />
                </div>

                {/* Menú superior */}
                <div className="flex flex-col gap-2 mt-2">

                    {!isAuthenticated && (
                        <>
                            <Link
                                href={"/auth/login"}
                                onClick={closeMenu}
                                className="flex w-full items-center gap-3 px-4 py-3 rounded-xl hover:bg-indigo-50 transition-all group"
                            >
                                <IoLogInOutline size={24} className="text-indigo-500 group-hover:scale-110 transition-transform" />
                                <span className="text-lg font-medium text-gray-800">Iniciar Sesión</span>
                            </Link>
                            <Link
                                href={"/auth/new-account"}
                                onClick={closeMenu}
                                className="flex w-full items-center gap-3 px-4 py-3 rounded-xl hover:bg-indigo-50 transition-all group"
                            >
                                <IoCreateOutline size={24} className="text-indigo-500 group-hover:scale-110 transition-transform" />
                                <span className="text-lg font-medium text-gray-800">Crear Cuenta</span>
                            </Link>
                        </>
                    )}

                    {isAuthenticated && (
                        <>
                            <Link
                                href={"/profile"}
                                onClick={closeMenu}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-indigo-50 transition-all group"
                            >
                                <IoPersonOutline size={24} className="text-indigo-500 group-hover:scale-110 transition-transform" />
                                <span className="text-lg font-medium text-gray-800">Perfil</span>
                            </Link>
                            <Link
                                href={"/orders"}
                                onClick={closeMenu}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-indigo-50 transition-all group"
                            >
                                <IoTicketOutline size={24} className="text-indigo-500 group-hover:scale-110 transition-transform" />
                                <span className="text-lg font-medium text-gray-800">Órdenes</span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-indigo-50 transition-all group"
                            >
                                <IoLogOutOutline size={24} className="text-indigo-500 group-hover:scale-110 transition-transform" />
                                <span className="text-lg font-medium text-gray-800">Cerrar Sesión</span>
                            </button>
                        </>
                    )}
                </div>

                {/* Menú solo para administradores */}
                {session?.user?.role === "admin" && (
                    <>
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-4" />
                        <div className="flex flex-col gap-2">
                            <Link 
                                href={"/admin/products"} 
                                onClick={closeMenu} 
                                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-indigo-50 transition-all group"
                            >
                                <IoShirtOutline size={24} className="text-indigo-500 group-hover:scale-110 transition-transform" />
                                <span className="text-lg font-medium text-gray-800">Productos</span>
                            </Link>
                            <Link 
                                href={"/admin/orders"} 
                                onClick={closeMenu} 
                                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-indigo-50 transition-all group"
                            >
                                <ImListNumbered size={24} className="text-indigo-500 group-hover:scale-110 transition-transform" />
                                <span className="text-lg font-medium text-gray-800">Pedidos</span>
                            </Link>
                            <Link 
                                href={"/admin/users"} 
                                onClick={closeMenu} 
                                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-indigo-50 transition-all group"
                            >
                                <IoPeopleOutline size={24} className="text-indigo-500 group-hover:scale-110 transition-transform" />
                                <span className="text-lg font-medium text-gray-800">Usuarios</span>
                            </Link>
                        </div>
                    </>
                )}

                {/* Footer */}
                <div className="flex-1" />
                <div className="text-center text-gray-500 pb-2">
                    © {new Date().getFullYear()} Teslo | Shop
                </div>
            </nav>
        </div>
    )
}