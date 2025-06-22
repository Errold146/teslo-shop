import Image from "next/image"
import Link from "next/link"

export const Footer = () => {
    return (
        <footer className="w-full bg-white z-50 py-6 px-4 mt-5 flex items-center justify-center border-t">
            <div className="flex flex-row items-center justify-center w-full max-w-5xl gap-8 flex-wrap">
                <Link href="/" className="group flex items-center">
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
                        &nbsp; Teslo
                    </span>
                    <span className="text-xl text-gray-400 group-hover:text-red-400 font-medium transition-colors hidden sm:inline">
                        &nbsp;| Shop
                    </span>
                </Link>

                <span className="flex items-center text-gray-400 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                        <text x="12" y="16" textAnchor="middle" fontSize="10" fill="currentColor" fontFamily="Arial">C</text>
                    </svg>
                    {new Date().getFullYear()} Derechos Reservados
                </span>

                <div className="flex items-center text-gray-500 text-sm gap-1">
                    <span>Conoce nuestros:</span>
                    <Link href="/terminos" className="underline hover:text-indigo-600 transition-colors">Términos y Condiciones</Link>
                    <span>|</span>
                    <Link href="/privacidad" className="underline hover:text-indigo-600 transition-colors">Política de Privacidad</Link>
                </div>
            </div>
        </footer>
    )
}
