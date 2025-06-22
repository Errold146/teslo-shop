import { Footer, Sidebar, TopMenu } from "@/components";

export default function ShopLayout({ children }: { children: React.ReactNode; }) {
    return (
        <main>
            <TopMenu />

            <Sidebar />

            {children}

            <Footer />
        </main>
    );
}