import Image from "next/image"
import Link from "next/link"

export const Footer = () => {
    return (
        <footer className="w-full bg-white border-t py-8 px-6 z-50">
            <div className="max-w-6xl mx-auto flex flex-col gap-6 items-center text-center">

                {/* Logo y branding */}
                <Link href="/" className="group flex items-center gap-2">
                    <div className="relative w-10 h-10">
                        <Image
                            src="/imgs/logo.png"
                            alt="Logo Teslo Shop"
                            fill
                            priority
                            sizes="40px"
                            style={{ objectFit: "contain" }}
                        />
                    </div>
                    <span className="font-black text-2xl text-gray-900 group-hover:text-red-600 transition-colors">
                        Teslo
                    </span>
                    <span className="text-xl text-gray-500 group-hover:text-red-400 font-medium transition-colors">
                        | Shop
                    </span>
                </Link>

                {/* Enlaces legales */}
                <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-500">
                    <span>Conoce nuestros:</span>
                    <Link href="/terminos" className="underline hover:text-indigo-600 transition-colors">
                        Términos y Condiciones
                    </Link>
                    <span>|</span>
                    <Link href="/privacidad" className="underline hover:text-indigo-600 transition-colors">
                        Política de Privacidad
                    </Link>
                </div>

                {/* Aviso demostrativo */}
                <div className="bg-red-50 border border-red-300 rounded-md p-3 text-sm text-red-600 max-w-2xl">
                    ⚠️ Esta página es <strong>solo demostrativa</strong>. No se realiza venta de productos reales. No envíe pagos, ni comparta información sensible. Este proyecto fue desarrollado por un estudiante como parte de su aprendizaje.
                </div>

                {/* Derechos */}
                <span className="text-xs text-gray-400 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                        <text x="12" y="16" textAnchor="middle" fontSize="10" fill="currentColor" fontFamily="Arial">C</text>
                    </svg>
                    {new Date().getFullYear()} Teslo | Todos los derechos reservados
                </span>
            </div>
        </footer>
    )
}