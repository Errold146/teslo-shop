import { redirect } from "next/navigation";
import { auth } from "../../auth.config";

export default async function ShopLayout({ children }: { children: React.ReactNode; }) {

    const session = await auth()
    if ( session?.user ) redirect('/');

    return (
        <main className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="w-full max-w-[500px] md:max-w-[600px] lg:max-w-[700px] px-6">
                {children}
            </div>
        </main>
    );
}