import { Pagination, Title } from '@/components';
import { getPaginatedUsers } from '@/actions';
import { redirect } from 'next/navigation';
import { auth } from '@/auth.config';
import { UsersTable } from './ui/UsersTable';

export const metadata = {
    title: "Todas los Usuarios",
    description: "Revisión del total de usuarios de la app."
};

export default async function OrdersAdminPage() {

    const session = await auth()
    if ( session?.user.role !== 'admin' ) redirect('/');

    const { ok, users } = await getPaginatedUsers()
    if (!ok) redirect('/auth/login');

    return (
        <>
            <Title title="Todos los Usuarios" subTitle={`Benvenido ${session?.user.name}`} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
                <div className="w-full overflow-x-auto rounded-lg shadow bg-white">
                    <UsersTable users={ users } />
                </div>
            </div>

            <Pagination totalPages={1} />
        </>
    );
}

