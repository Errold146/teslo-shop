import Image from "next/image";
import Link from "next/link";

export const PageNotFound = () => {
    return (
        <div 
            className="flex flex-col md:flex-row h-auto min-h-[1000px] md:h-[800px] w-full justify-center items-center bg-gradient-to-br from-gray-50 to-gray-200"
        >
            <div className="flex-1 flex flex-col justify-center items-center px-6 py-8 md:py-0 md:mr-4 text-center">
                <h2 className="text-9xl font-extrabold text-indigo-600 drop-shadow-lg">
                    404
                </h2>
                <p className="font-semibold text-[clamp(1rem, 2.5vw, 2xl)] text-gray-700 mb-4">
                    ¡Lo sentimos! La página que buscas no existe.
                </p>
                <hr className="border-t-4 border-indigo-400 w-3/4 mx-auto my-4" />
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-6">
                    <Image
                        src="/imgs/logo.png"
                        alt="Logo Teslo Shop"
                        width={35}
                        height={35}
                        priority
                    />
                    <span className="text-lg text-gray-600">Puedes regresar al:</span>
                    <Link
                        href="/"
                        className="text-lg text-indigo-500 hover:text-indigo-700 hover:underline transition-all font-semibold ml-1"
                    >
                        Inicio
                    </Link>
                </div>
            </div>

            <div className="flex-1 flex justify-center items-center px-2 py-8 md:py-0 md:ml-4">
                <div className="bg-white rounded-xl shadow-lg p-6 flex justify-center items-center">
                    <Image
                        src="/imgs/starman_750x750.png"
                        alt="Imagen 404"
                        className="max-w-[80%] md:max-w-[80%] w-full h-auto object-contain"
                        width={400}
                        height={400}
                        priority
                    />
                </div>
            </div>
        </div>
    );
};