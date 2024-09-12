import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./style.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Вход в админ панель"

};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
        <body className={inter.className}>{children}</body>
        </html>
    );
}
