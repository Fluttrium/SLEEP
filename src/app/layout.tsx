"use client";
import {Montserrat_Alternates} from "next/font/google";
import "./globals.css";
import {SessionProvider} from "next-auth/react";
import { ThemeProvider } from "next-themes";

const sans = Montserrat_Alternates({subsets: ["cyrillic"], weight: ["900", "800", "600", "200"]});

export default function RootLayout({
                                       children,
                                   }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="ru">
        <body className={sans.className}>
        <SessionProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
        </SessionProvider>
        </body>
        </html>
    );
}
