"use server"

import { auth } from "@/auth.config"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"

export const getPaginatedUsers = async () => {
    
    const session = await auth()
    if ( session?.user.role !== 'admin' ) redirect('/');

    const users = await prisma.user.findMany({
        orderBy: {
            name: 'desc'
        }
    })

    return {
        ok: true,
        users
    }
}