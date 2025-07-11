"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation"; 
import { getSession } from 'next-auth/react'
import { useFormState, useFormStatus } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { IoInformationOutline } from "react-icons/io5";
import { authenticate } from "@/actions";

export const LoginForm = () => {
    const [state, dispatch] = useFormState(authenticate, undefined);

    const [showError, setShowError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        if (state === "CredentialsSignin") {
            setShowError(true);
            const timeout = setTimeout(() => setShowError(false), 4000);
            return () => clearTimeout(timeout);
        }
    }, [state]);

    useEffect(() => {
        const refreshSession = async () => {
            await getSession()

            const redirectTo = searchParams.get("redirectTo") || "/"
            router.replace(redirectTo)
        }

        if (state === 'Success') {
            refreshSession()
        }
    }, [state, router, searchParams]) 

    const isFormValid = email.trim() !== "" && password.trim() !== "";

    return (
        <div className="w-full max-w-[600px] h-auto bg-white rounded-2xl shadow-xl p-10 border border-gray-100 self-center">
            <h1 className="text-3xl font-extrabold mb-8 text-center text-indigo-700 tracking-tight">
                Iniciar sesión
            </h1>

            <form className="flex flex-col gap-6" action={dispatch}>
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-700">
                        Correo electrónico
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="tucorreo@ejemplo.com"
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg bg-gray-50 border focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${showError ? "border-red-300 animate-shake" : "border-gray-200"
                            }`}
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-semibold text-gray-700">
                        Contraseña
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="***********"
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg bg-gray-50 border focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${showError ? "border-red-300 animate-shake" : "border-gray-200"
                            }`}
                    />
                </div>

                <AnimatePresence>
                    {showError && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.25 }}
                            aria-live="polite"
                            className="flex items-center gap-2 my-2 text-sm font-semibold text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2 shadow-sm"
                        >
                            <IoInformationOutline size={22} />
                            Credenciales inválidas, intente de nuevo.
                        </motion.div>
                    )}
                </AnimatePresence>

                <LoginButton disabled={!isFormValid} />
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
    );
};

function LoginButton({ disabled }: { disabled: boolean }) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={disabled || pending}
            className={clsx(
                "w-full py-3 mt-2 rounded-lg font-bold text-lg transition shadow-md",
                {
                    "bg-gradient-to-r from-indigo-500 to-blue-500 text-white hover:from-indigo-600 hover:to-blue-600":
                        !disabled && !pending,
                    "bg-gray-200 text-gray-400 cursor-not-allowed opacity-70": disabled || pending
                }
            )}
        >
            {pending ? "Ingresando..." : "Ingresar"}
        </button>
    );
}