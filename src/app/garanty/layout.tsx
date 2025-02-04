
import type { Metadata } from 'next';
import { Suspense } from 'react';

import Footer from '@/components/footer';
import { Header } from '@/components/shared/ui/header';

export const metadata: Metadata = {
  title: "Гарантия",
  description: "Центр здорового сна",
};

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <main className="min-h-screen">
      <Suspense>
      <Header hasSearch={false}/>
      </Suspense>
      {children}
      <Suspense>
        <Footer />
      </Suspense>
    </main>
  );
}
