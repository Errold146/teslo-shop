import { Title } from "@/components";
import Link from "next/link";

export default function NamePage() {
    return (
        <div className="flex flex-col justify-center items-center my-6 md:my-30 sm:px-0">
            <div className="w-full max-w-[900px] bg-white rounded-xl shadow-lg p-6 sm:p-10">

                {/* Título */}
                <Title title="Dirección" className="text-3xl font-bold text-gray-900 mb-8 text-center" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                    {/* Campos del formulario */}
                    {[
                        { label: "Nombres", type: "text" },
                        { label: "Apellidos", type: "text" },
                        { label: "Dirección", type: "text" },
                        { label: "Dirección 2 (opcional)", type: "text" },
                        { label: "Código postal", type: "text" },
                        { label: "Ciudad", type: "text" },
                        { label: "Teléfono", type: "text" },
                    ].map((field, index) => (
                        <div key={index} className="flex flex-col">
                            <span className="text-gray-700 font-medium">{field.label}</span>
                            <input type={field.type} className="p-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                        </div>
                    ))}

                    {/* País - Selector */}
                    <div className="flex flex-col">
                        <span className="text-gray-700 font-medium">País</span>
                        <select className="p-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400">
                            <option value="">[ Seleccione ]</option>
                            <option value="CRI">Costa Rica</option>
                        </select>
                    </div>

                    {/* Botón de continuar */}
                    <div className="flex flex-col sm:col-span-2 mt-6">
                        <Link
                            href="/checkout"
                            className="btn-primary flex w-full sm:w-1/2 justify-center text-white font-bold py-3 rounded-lg shadow-md transition-colors"
                        >
                            Siguiente
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}