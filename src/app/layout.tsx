"use client"
import {Montserrat_Alternates} from "next/font/google";
import "./globals.css";
import {SessionProvider} from "next-auth/react";

const sans = Montserrat_Alternates({subsets: ["cyrillic"], weight: ["900", "800", "600", "200"]});


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
        <body className={sans.className}>
        <SessionProvider>

            {children}
        </SessionProvider>
        </body>

        </html>
    );
}
