import Link from 'next/link';

export default function LoginPage() {
    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="w-full max-w-[500px] h-auto bg-white rounded-2xl shadow-xl p-10 border border-gray-100 self-center">
                
                <h1 className="text-3xl font-extrabold mb-8 text-center text-indigo-700 tracking-tight">Iniciar sesión</h1>

                <form className="flex flex-col gap-6">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-700">
                            Correo electrónico
                        </label>
                        <input
                            id="email"
                            name="email"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                            type="email"
                            autoComplete="email"
                            placeholder="tucorreo@ejemplo.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-semibold text-gray-700">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            name="password"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                            type="password"
                            autoComplete="current-password"
                            placeholder="***********"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 mt-2 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold text-lg shadow-md hover:from-indigo-600 hover:to-blue-600 transition"
                    >
                        Ingresar
                    </button>
                </form>

                <div className="flex items-center my-8">
                    <div className="flex-1 border-t border-gray-200"></div>
                    <span className="px-4 text-gray-400 font-medium">O</span>
                    <div className="flex-1 border-t border-gray-200"></div>
                </div>
                
                <Link
                    href="/auth/new-account"
                    className="block w-full py-3 rounded-lg border border-indigo-400 text-indigo-600 font-semibold text-center hover:bg-indigo-50 transition"
                >
                    Crear una nueva cuenta
                </Link>
            </div>
        </div>
    );
}