import prisma from "@/lib/prisma";
import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcryptjs from 'bcryptjs';

export const authConfig: NextAuthConfig = {
    pages: {
        signIn: "/auth/login",
        newUser: "/auth/new-account",
    },
    callbacks: {
        jwt({ token, user }) {
            if ( user ) {
                token.data = user
            }
            return token
        },
        session({ session, token, user }) {
            session.user = token.data as any
            return session
        },
    },
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ 
                        email: z.string().email(), 
                        password: z.string().min(6) 
                    }).safeParse(credentials);

                if ( !parsedCredentials.success ) return null;

                const { email, password } = parsedCredentials.data

                // Comparar emails
                const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })
                if ( !user ) return null;

                // Compara contraseñas
                if ( !bcryptjs.compareSync(password, user.password) ) return null;

                // Regresar el usuario si el password
                const { password: pass, ...rest } = user
                return rest;
            }
        })
    ],
    secret: process.env.AUTH_SECRET,
};

export const { signIn, signOut, auth, handlers } = NextAuth( authConfig )
