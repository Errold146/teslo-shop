import { Title } from "@/components";
import { auth } from "../../../auth.config";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function ProfilePage() {
    const session = await auth();
    if (!session?.user) redirect("/");

    const { name, email, role, image } = session.user;

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <Title title="Perfil del Usuario" />

            <div className="mt-10 bg-white border border-gray-100 rounded-3xl shadow-lg p-10 flex flex-col md:flex-row gap-10">
                {/* Avatar */}
                <div className="flex flex-col items-center gap-4 w-full md:w-1/3">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-200 shadow-md">
                        {image ? (
                            <Image
                                src={image}
                                alt="Foto de perfil"
                                width={128}
                                height={128}
                                className="object-cover w-full h-full"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-6xl text-indigo-500 bg-indigo-50">
                                {name?.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>
                    <span className="text-sm text-gray-400">Imagen de perfil</span>
                </div>

                {/* User Info */}
                <div className="flex-1 flex flex-col gap-6">
                    <div>
                        <label className="text-sm font-medium text-gray-500">Nombre completo</label>
                        <p className="text-lg font-semibold text-gray-800">{name}</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-500">Correo electrónico</label>
                        <p className="text-lg text-gray-800">{email}</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-500 mr-2">Rol de usuario</label>
                        <p
                            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${role === "admin"
                                    ? "bg-red-100 text-red-600"
                                    : "bg-indigo-100 text-indigo-600"
                                }`}
                        >
                            {role}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}