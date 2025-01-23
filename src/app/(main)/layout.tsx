import type {Metadata} from "next";
import {Montserrat_Alternates} from "next/font/google";

import {Header} from "@/components/shared/ui/header";


const sans = Montserrat_Alternates({subsets: ["cyrillic"], weight: ["900", "800", "600", "200"]});

export const metadata: Metadata = {
    title: "Asleep",
    description: "Здоровый сон возможен",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
        <body className={sans.className}>
        <Header hasSearch={false}/>
        {children}
        </body>
        </html>
    );
}