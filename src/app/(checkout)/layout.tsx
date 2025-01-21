
import { Metadata } from 'next';
import { Suspense } from 'react';
import { Container, Header } from '../../../shared/components/shared';
import { Montserrat_Alternates } from 'next/font/google';

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

