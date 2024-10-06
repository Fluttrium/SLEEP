'use client';

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Container } from './container';
import Image from 'next/image';
import { Button } from "../../ui/button";
import { ArrowRight, User, Search } from "lucide-react";
import { SearchInput } from "./search-input";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  return (
    <header className={cn('border-b bg-background w-full', className)}>
      <Container className="flex items-center justify-between py-4 md:py-8 mx-auto px-4"> {/* Добавлены отступы */}
        {/* Левая часть */}
        <Link href="/public">
          <div className="flex items-center gap-2 md:gap-4">
            <Image src="/sleeplogo.png" alt="Logo" width={50} height={50} />
            <div className="hidden md:block"> {/* Скрываем на мобильной версии */}
              <h1 className="text-xl md:text-2xl uppercase font-black">Михаил Бочкарев</h1>
              <p className="text-xs md:text-sm text-gray-400 leading-3">Здоровый сон возможен</p>
            </div>
          </div>
        </Link>

        <div className="flex-1 mx-4 md:mx-10">
          {/* Иконка поиска на мобильной версии */}
          <div className="md:hidden">
            <Search size={24} className="text-gray-500" />
          </div>
          {/* Поле поиска на десктопе */}
          <div className="hidden md:block">
            <SearchInput />
          </div>
        </div>

        {/* Правая часть */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Кнопка "Войти" с текстом на десктопе */}
          <Button variant="outline" className="flex items-center gap-1 text-xs md:text-sm">
            <User size={14} />
            <span className="hidden md:inline">Войти</span> {/* Показываем текст только на десктопе */}
          </Button>
          <div>
            <Link href="/checkout">
              <Button
                type="submit"
                className="w-full h-8 md:h-10 text-xs md:text-sm">
                <span className="hidden md:inline">Пройти тест</span> {/* Текст для десктопа */}
                <span className="md:hidden">Тест</span> {/* Текст для мобильной версии */}
                <ArrowRight className="w-4 md:w-5 ml-1 md:ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
};
