import Image from "next/image";
import { BackButton } from "../button/BackButton";

export const PageNotFound = () => {
    return (
        <div className="min-h-[calc(88vh-120px)] flex items-center justify-center px-4">
            <div className="w-full max-w-7xl bg-white rounded-xl shadow-lg p-6 md:p-10 flex flex-col md:flex-row items-center justify-center">

                {/* Texto y botón */}
                <div className="flex-1 flex flex-col justify-center items-center text-center px-4 py-4 md:py-0 md:mr-6">
                    <h2 className="text-9xl font-extrabold text-indigo-600 drop-shadow-lg">
                        404
                    </h2>
                    <p className="font-semibold text-[clamp(1rem,2.5vw,2xl)] text-gray-700 mb-4">
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
                        <span className="text-lg text-gray-600">Puedes regresar</span>
                        <BackButton label="Regresar" />
                    </div>
                </div>

                {/* Imagen */}
                <div className="flex-1 flex justify-center items-center px-4 py-4 md:py-0 md:ml-6">
                    <div className="rounded-xl overflow-hidden">
                        <Image
                            src="/imgs/starman_750x750.png"
                            alt="Imagen 404"
                            className="max-w-[80%] w-full h-auto object-contain"
                            width={400}
                            height={400}
                            priority
                        />
                    </div>
                </div>
            </div>
        </div>
    );
  };