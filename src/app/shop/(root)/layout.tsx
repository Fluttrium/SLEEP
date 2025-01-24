import type {Metadata} from "next";
import {Montserrat_Alternates} from "next/font/google";

import {Header} from "@/components/shared/ui/header";

import "./globals.css";
import {Toaster} from "react-hot-toast";


const sans = Montserrat_Alternates({subsets: ["cyrillic"], weight: ["900", "800", "600", "200"]});

export const metadata: Metadata = {
    title: "Магазин",
    description: "Центр здорового сна",
};

export default function RootLayout({
                                       children,
                                       modal,
                                   }: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode;
}>) {
    return (
        <body className={sans.className}>
        <Header hasSearch={false}/>

        {children}
        {modal}
        </body>
    );
}
