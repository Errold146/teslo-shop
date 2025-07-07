"use server"

import { auth } from "@/auth.config"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const changeUserRole = async ( userId: string, role: string ) => {

    const session = await auth()
    if ( session?.user.role !== 'admin' ) redirect('/');

    try {
        const newRole = role === 'admin' ? 'admin' : 'user'

        const user = await prisma.user.update({
            where: { id: userId },
            data: { role: newRole }
        })

        revalidatePath('/admin/users')

        return {
            ok: true, 
            user,
            message: 'Rol actualizado correctamente.'
        }

    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'Hubo un error, recargue e intente de nuevo.'
        }
    }
}