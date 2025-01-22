
import { Metadata } from 'next';
import { Suspense } from 'react';

import { Montserrat_Alternates } from 'next/font/google';
import { Header } from '@/components/shared/ui/header';

const sans = Montserrat_Alternates({subsets: ["cyrillic"], weight: ["900", "800", "600", "200"]});

export const metadata: Metadata = {
    title: "Магазин",
    description: "Центр здорового сна",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <body className={sans.className}>
            <Suspense>
            <Header hasSearch={false}/>
            </Suspense>
        {children}
        </body>
    );
}

