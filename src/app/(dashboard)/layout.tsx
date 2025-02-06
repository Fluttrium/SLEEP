import { Header } from "@/components/shared/ui/header";
import { Metadata } from "next";
import { Montserrat_Alternates } from "next/font/google";
import { Suspense } from "react";





const sans = Montserrat_Alternates({subsets: ["cyrillic"], weight: ["900", "800", "600", "200"]});

export const metadata: Metadata = {
    title: "Asleep",
    description: "Здоровый сон возможен",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <body className={sans.className}>
            <Suspense>
            <Header hasSearch={false}/>
            </Suspense>
        {children}
        </body>
  );
}
