import type { Metadata } from "next";
import "./globals.css"; 
import { Playfair_Display } from "next/font/google"
import { Toaster } from 'sonner'
import { Providers } from "@/components";

export const metadata: Metadata = {
    title: {
        template: "%s - Teslo Shop",
        default: 'Home - Teslo Shop'
    },
    description: "Ecommerce de Teslo Shop",
};

const playfairDisplay = Playfair_Display({
    variable: "--font-playfair-display",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"]
})

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="es">
            <body
                className={`${playfairDisplay.variable}`}
            >
                <Providers>

                    <Toaster
                        richColors
                        position="top-right"
                        toastOptions={{
                            style: {
                                background: '#1a1a2e', 
                                color: '#f1f1f1', 
                                fontSize: '20px', 
                                fontWeight: '600',
                                borderRadius: '10px',
                                padding: '18px 24px',
                                boxShadow: '0 12px 25px rgba(0, 0, 0, 0.25)',
                                border: '1px solid #333',
                            },
                            className: 'backdrop-blur-sm' 
                        }}
                    />

                    {children}

                </Providers>
            </body>
        </html>
    )
}
