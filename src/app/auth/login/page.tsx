import { LoginForm } from './ui/LoginForm';

export const metadata = {
    title: "Iniciar Sesión",
    description: "Inicia sesión y disfruta de experiencia única de compras en Teslo Shop."
};

export default function LoginPage() {
    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <LoginForm />
        </div>
    );
}