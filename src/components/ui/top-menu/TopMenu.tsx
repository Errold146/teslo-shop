"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { IoCartOutline, IoSearchOutline } from "react-icons/io5"
import { useCartStore, useUIStore } from "@/store"

export const TopMenu = () => {

    const openMenu = useUIStore( state => state.openSideMenu )
    const totalItemsInCart = useCartStore(state => state.totalItems);

    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setLoaded( true )
    }, [])
    
    if ( !loaded ) return <p className=" text-center font-semibold text-2xl">Cargando...</p>

    return (
        <nav className="flex items-center justify-between mb-5 p-5 bg-slate-50 shadow-lg">

            {/* Logo */}
            <div>
                <Link
                    href="/"
                    className="flex items-center gap-3 group"
                    aria-label="Teslo Shop Home"
                >
                    <div className="relative w-10 h-10">
                        <Image
                            src="/imgs/logo.png"
                            alt="Logo Teslo Shop"
                            fill
                            priority
                            style={{ objectFit: "contain" }}
                            sizes="40px"
                        />
                    </div>
                    <span className="font-black text-2xl text-gray-900 group-hover:text-red-600 tracking-tight transition-colors hidden sm:inline">
                        Teslo
                    </span>
                    <span className="text-xl text-gray-400 group-hover:text-red-400 font-medium transition-colors hidden sm:inline">
                        | Shop
                    </span>
                </Link>
            </div>

            {/* Center Menu */}
            <div className=" hidden sm:block">
                <Link 
                    href="/gender/men"
                    className="m-2 p-2 rounded-md transition-all hover:bg-gray-200 text-black"
                >
                    Hombres
                </Link>
                <Link 
                    href="/gender/women"
                    className="m-2 p-2 rounded-md transition-all hover:bg-gray-200 text-black"
                >
                    Mujeres
                </Link>
                <Link 
                    href="/gender/kids"
                    className="m-2 p-2 rounded-md transition-all hover:bg-gray-200 text-black"
                >
                    Niños
                </Link>
                <Link 
                    href="/gender/unisex"
                    className="m-2 p-2 rounded-md transition-all hover:bg-gray-200 text-black"
                >
                    Unisex
                </Link>
            </div>

            {/* Search, Cart, Menu */}
            <div className="flex items-center space-x-4 ">
                <Link
                    href="/search"
                >
                    <IoSearchOutline size={30} />
                </Link>

                <div className="relative ">
                    <Link 
                        href={
                            ((totalItemsInCart === 0) && loaded )
                            ? '/empty'
                            : '/cart'
                        }
                    >
                        <IoCartOutline size={30} />
                        {
                            totalItemsInCart > 0 && (
                                <span 
                                    className="absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-indigo-600 text-white fade-in"
                                >
                                    { totalItemsInCart }
                                </span>
                            )
                        }
                    </Link>
                </div>

                <button
                    className=" btn-secondary transition-all duration-200 ease-in-out cursor-pointer"
                    onClick={() => openMenu()}
                >
                    Menú
                </button>
            </div>

        </nav>
    )
}