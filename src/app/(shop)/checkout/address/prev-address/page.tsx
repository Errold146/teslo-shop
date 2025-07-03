import { IoLocationOutline, IoCallOutline } from 'react-icons/io5'
import { BackButton, Title } from "@/components"

export default function PreviousAddressesPage() {
    const mockAddresses = [
        {
            id: 1,
            nombre: 'Carlos Fernández',
            direccion: 'Calle 12, Barrio Escalante',
            ciudad: 'San José',
            telefono: '8888-1234',
        },
        {
            id: 2,
            nombre: 'Laura Jiménez',
            direccion: 'Avenida Principal, Frente a la escuela',
            ciudad: 'Alajuela',
            telefono: '8700-5678',
        },
    ];

    return (
        <section className="md:max-w-3xl mx-auto px-6 py-10 space-y-6">
            <Title
                title="Tus direcciones"
                subTitle="Direcciones usadas anteriormente."
                className="mr-1 text-center"
            />

            <ul className="space-y-3">
                {mockAddresses.map(addr => (
                    <li
                        key={addr.id}
                        className="border border-gray-200 bg-white rounded-xl p-5 shadow-sm hover:shadow-md hover:cursor-pointer transition"
                    >
                        <p className="font-semibold text-gray-900 text-center text-xl mb-2">
                            {addr.nombre}
                        </p>

                        <p className="text-base text-gray-600 flex items-center gap-2">
                            <IoLocationOutline className="text-indigo-500" size={25} />
                            {addr.direccion}
                        </p>

                        <div className="flex justify-between items-center text-base text-gray-500 mt-2">
                            <div className="flex items-center gap-1">
                                <IoLocationOutline className="text-indigo-500" size={25} />
                                <span>{addr.ciudad}</span>
                            </div>

                            <div className="flex items-center gap-1">
                                <IoCallOutline className="text-red-400" size={25} />
                                <span>{addr.telefono}</span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <BackButton label='Nueva direccion' />
        </section>
    );
}