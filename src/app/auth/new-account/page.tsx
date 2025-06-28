import Link from 'next/link';
import { RegisterForm } from './ui/RegisterForm';

export default function LoginPage() {
    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="w-full max-w-[500px] h-auto bg-white rounded-2xl shadow-xl p-10 border border-gray-100 self-center">
                
                <h1 className="text-3xl font-extrabold mb-8 text-center text-indigo-700 tracking-tight">Crear Cuenta</h1>

                <RegisterForm />

                <div className="flex items-center my-8">
                    <div className="flex-1 border-t border-gray-200"></div>
                    <span className="px-4 text-gray-400 font-medium">O</span>
                    <div className="flex-1 border-t border-gray-200"></div>
                </div>

                <Link
                    href="/auth/login"
                    className="block w-full py-3 rounded-lg border border-indigo-400 text-indigo-600 font-semibold text-center hover:bg-indigo-50 transition"
                >
                    Iniciar Sesión
                </Link>
            </div>
        </div>
    );
}