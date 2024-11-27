import type { Metadata } from "next";
import { Montserrat_Alternates } from "next/font/google";

const sans = Montserrat_Alternates({ subsets: ["cyrillic"], weight: '400' });

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
