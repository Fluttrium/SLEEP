'use client';

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Container } from './container';
import Image from 'next/image';
import { Button } from "../ui/button";

import { ArrowRight, ShoppingCart, User } from "lucide-react";


interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({className }) => {
  
  return (
    <header className={cn('border-b', className)}>
      <Container className="flex items-center justify-between py-8">
        {/* Левая часть */}
        <Link href="/">
          <div className="flex items-center gap-4">
          <Image src="/logo.png" alt="Logo" width={35} height={35} />
            <div>
              <h1 className="text-2xl uppercase font-black">Михаил Бочкарев</h1>
              <p className="text-sm text-gray-400 leading-3">Здоровый сон возможен</p>
            </div>
          </div>
        </Link>

        

        {/* Правая часть */} 
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-1"><User size ={16}/>Войти</Button> 
          <div>
          <div>
        <Link href="/checkout">
                    <Button
                      type="submit"
                      className="w-full h-12 text-base">
                      Пройти тест
                      <ArrowRight className="w-5 ml-2" />
                    </Button>
                  </Link>
        </div>
            </div>
            </div>
      </Container>
    </header>
  );
};
