'use client';

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Container } from './container';
import Image from 'next/image';
import { Button } from "../ui/button";

import { ArrowRight, ShoppingCart, User } from "lucide-react";
import { SearchInput } from "./search-input";


interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {

  return (
    <header className={cn('border-b bg-background', className)}>
      <Container className="flex items-center justify-between py-8">
        {/* Левая часть */}
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/sleeplogo.png" alt="Logo" width={55} height={55} />
            <div>
              <h1 className="text-2xl uppercase font-black">Михаил Бочкарев</h1>
              <p className="text-sm text-gray-400 leading-3">Здоровый сон возможен</p>
            </div>
          </div>
        </Link>


        <div className="mx-10 flex-1">
          <SearchInput />
        </div>



        {/* Правая часть */}
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-1"><User size={16} />Войти</Button>
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
