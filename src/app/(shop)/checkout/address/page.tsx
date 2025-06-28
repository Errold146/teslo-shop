import { Title } from "@/components";
import { AddressForm } from "./ui/AddressForm";
import { getCountries, getUserAddress } from "@/actions";
import { auth } from "@/auth.config";

export const metadata = {
    title: "Confirmar Dirección",
    description: "Revisa tu dirección completa antes de completar la compra en Teslo Shop."
}

export default async function AddressPage() {

    const countries = await getCountries()
    const session = await auth()

    if ( !session?.user ) {
        return (
            <h3 className=" text-5xl text-red-500">500 - No hay sesión de usuario.</h3>
        )
    }

    const userAddress = await getUserAddress(session.user.id) ?? undefined

    return (
        <div className="flex flex-col justify-center items-center my-6 md:my-22 sm:px-0">
            <div className="w-full max-w-[1200px] bg-white rounded-xl shadow-lg p-6 sm:p-10">

                {/* Título */}
                <Title title="Dirección" subTitle="Escribe la dirección de entrega de tu pedido." className="text-3xl font-bold text-gray-900 mb-8 text-center" />

                <AddressForm countries={countries} userStoreAddress={userAddress} />
            </div>
        </div>
    );
}