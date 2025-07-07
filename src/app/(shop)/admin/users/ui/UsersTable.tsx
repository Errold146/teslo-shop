'use client';

import { toast } from 'sonner'
import { changeUserRole } from "@/actions";
import type { User } from "@/interfaces";

interface Props {
    users: User[];
}

export const UsersTable = ({ users }: Props) => {

    const handleRoleChange = async (userId: string, newRole: string) => {
        try {
            const res = await changeUserRole(userId, newRole);

            if (res?.ok) {
                toast.success(res.message || 'Rol actualizado correctamente');
            } else {
                toast.error(res?.message || 'No se pudo actualizar el rol');
            }
        } catch (error) {
            toast.error('Error inesperado. Intenta de nuevo.');
            console.error(error);
        }
      };

    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full table-auto divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-3 text-left font-bold text-gray-700 uppercase tracking-wider">#ID</th>
                        <th className="p-3 text-left font-bold text-gray-700 uppercase tracking-wider">Nombre completo</th>
                        <th className="p-3 text-left font-bold text-gray-700 uppercase tracking-wider">Email</th>
                        <th className="p-3 text-left font-bold text-gray-700 uppercase tracking-wider">Rol</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                    {users.map(us => (
                        <tr key={us.id} className="hover:bg-gray-50 transition-colors">
                            <td className="p-3 whitespace-nowrap font-semibold text-gray-900">{us.id}</td>
                            <td className="p-3 whitespace-nowrap text-gray-700">{us.name}</td>
                            <td className="p-3 whitespace-nowrap text-blue-600 hover:underline">
                                <a href={`mailto:${us.email}`}>{us.email}</a>
                            </td>
                            <td className="p-3 whitespace-nowrap">
                                <div className="w-full max-w-[140px] sm:max-w-[180px]">
                                    <select
                                        value={us.role}
                                        onChange={e => handleRoleChange(us.id, e.target.value)}
                                        className="w-full p-1 border rounded-md border-gray-300 text-sm bg-white"
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                    </select>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};