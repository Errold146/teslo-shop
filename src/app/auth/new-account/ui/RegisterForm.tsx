"use client"

import { useForm, type SubmitHandler } from "react-hook-form"
import { IoCheckmarkCircleOutline, IoInformationOutline, IoWarningOutline } from "react-icons/io5"
import { motion, AnimatePresence } from 'framer-motion'
import clsx from "clsx"
import { useRouter } from "next/navigation"
import { registerUser } from "@/actions"
import { useState } from "react"

type FormInputs = {
    name: string
    email: string
    password: string
}

export const RegisterForm = () => {

    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormInputs>()

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {

        setErrorMessage('')
        const { name, email, password } = data
        const res = await registerUser( name, email, password )

        if ( ! res.ok ) {
            setErrorMessage( res.message )
            return
        }

        setSuccessMessage(res.message)
        setTimeout(() => {
            router.push('/auth/login')
        }, 3000)
    }

    return (
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>

            <AnimatePresence>
                {successMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.25 }}
                        className="flex items-center gap-2 mt-2 text-sm font-medium text-green-700 bg-green-50 border border-green-200 rounded px-3 py-2 shadow-sm"
                    >
                        <IoCheckmarkCircleOutline size={20} />
                        {successMessage}
                    </motion.div>
                )}
            </AnimatePresence>


            {/* NOMBRE */}
            <div>
                <label htmlFor="name" className="block mb-2 text-sm font-semibold text-gray-700">
                    Nombre completo
                </label>
                <input
                    id="name"
                    className={clsx(
                        "w-full px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 transition",
                        {
                            "border-red-300 focus:ring-red-400 animate-shake": !!errors.name,
                            "border-gray-200 focus:ring-indigo-400": !errors.name
                        }
                    )}
                    type="text"
                    autoFocus
                    placeholder="Juan Pérez"
                    {...register("name", { required: true })}
                />
                <AnimatePresence>
                    {errors.name && (
                        <motion.div
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center gap-2 mt-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2 shadow-sm"
                        >
                            <IoInformationOutline size={20} />
                            El nombre es obligatorio.
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* CORREO */}
            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-700">
                    Correo electrónico
                </label>
                <input
                    id="email"
                    className={clsx(
                        "w-full px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 transition",
                        {
                            "border-red-300 focus:ring-red-400 animate-shake": !!errors.email,
                            "border-gray-200 focus:ring-indigo-400": !errors.email
                        }
                    )}
                    type="email"
                    placeholder="tucorreo@ejemplo.com"
                    {...register("email", {
                        required: true,
                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                    })}
                />
                <AnimatePresence>
                    {errors.email && (
                        <motion.div
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center gap-2 mt-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2 shadow-sm"
                        >
                            {errors.email.type === "pattern" ? (
                                <IoWarningOutline size={20} />
                            ) : (
                                <IoInformationOutline size={20} />
                            )}
                            {errors.email.type === "required"
                                ? "El correo es obligatorio."
                                : "El formato del correo no es válido."}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* CONTRASEÑA */}
            <div>
                <label htmlFor="password" className="block mb-2 text-sm font-semibold text-gray-700">
                    Contraseña
                </label>
                <input
                    id="password"
                    type="password"
                    placeholder="***********"
                    className={clsx(
                        "w-full px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 transition",
                        {
                            "border-red-300 focus:ring-red-400 animate-shake": !!errors.password,
                            "border-gray-200 focus:ring-indigo-400": !errors.password
                        }
                    )}
                    {...register("password", {
                        required: true,
                        minLength: 6
                    })}
                />

                <AnimatePresence>
                    {errors.password?.type === "required" && (
                        <motion.div
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center gap-2 mt-1 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2 shadow-sm"
                        >
                            <IoInformationOutline size={20} />
                            La contraseña es obligatoria.
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {errors.password?.type === "minLength" && (
                        <motion.div
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center gap-2 mt-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2 shadow-sm"
                        >
                            <IoWarningOutline size={20} />
                            La contraseña debe tener al menos 6 caracteres.
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* BOTÓN */}
            <button
                type="submit"
                className="w-full py-3 mt-2 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold text-lg shadow-md hover:from-indigo-600 hover:to-blue-600 transition"
            >
                Crear Cuenta
            </button>

            <AnimatePresence>
                {errorMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.25 }}
                        className="flex items-center gap-2 mt-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2 shadow-sm"
                    >
                        <IoWarningOutline size={20} />
                        {errorMessage}
                    </motion.div>
                )}
            </AnimatePresence>

        </form>
    )
}