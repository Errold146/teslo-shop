"use server"

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export const getCategories = async () => {
    const session = await auth()
    if ( session?.user.role !== 'admin' ) redirect('/');

    try {
        const categories = await prisma.category.findMany({
            orderBy: {
                name: 'asc'
            }
        })

        return categories

    } catch (error) {
        console.error(error)
        return []
    }
}