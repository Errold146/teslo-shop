import type { Metadata } from "next";
import "./globals.css"; 
import { Playfair_Display } from "next/font/google"

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
                {children}
            </body>
        </html>
    )
}
