import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./style.css";

const sans = Noto_Sans({ subsets: ["cyrillic"] });

export const metadata: Metadata = {
    title: "Админ Панель",
    description: "Админ панель для управления приложением",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
        <body className={sans.className}>{children}</body>
        </html>
    );
}
