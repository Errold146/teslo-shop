"use server";

import { signIn } from "../../auth.config";

type AuthState = "Success" | "CredentialsSignin" | "Unknown Error" | undefined;

export const authenticate = async (
    _prevState: AuthState,
    formData: FormData
): Promise<AuthState> => {
    try {
        await signIn("credentials", {
            ...Object.fromEntries(formData),
            redirect: false,
        });

        return "Success";
    } catch (error) {
        if (
            typeof error === "object" &&
            error !== null &&
            "type" in error &&
            (error as { type: string }).type === "CredentialsSignin"
        ) {
            return "CredentialsSignin";
        }

        return "Unknown Error";
    }
};