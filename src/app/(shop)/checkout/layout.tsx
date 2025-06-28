import { redirect } from "next/navigation";
import { auth } from "../../../auth.config";

export default async function CheckooutLayout({ children }: { children: React.ReactNode }) {

    const session  = await auth()

    if (!session?.user) redirect(`/auth/login?redirectTo=${encodeURIComponent('/checkout/address')}`)

    return (
        <>
            { children }  
        </>
    );
}