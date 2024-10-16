'use client';

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Container } from './container';
import Image from 'next/image';
import { Button } from "../../ui/button";
import { ArrowRight, User, Search, Menu, X } from "lucide-react";
import { SearchInput } from "./search-input";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Props {
    className?: string;
    hasSearch: boolean;
}

export const Header: React.FC<Props> = ({ className, hasSearch }) => {
    const router = useRouter();
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false); // Состояние для бургер-меню

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className={cn('border-b bg-background w-full', className)}>
            <Container className="flex items-center justify-between py-4 md:py-8 mx-auto px-4">
                {/* Бургер-меню для мобильной версии (слева) */}
                {/* Левая часть */}
                <Link href="/signin" className="flex items-center gap-2 md:gap-4">
                    <Image src="/sleeplogo.png" alt="Logo" width={50} height={50} />
                    <div className="hidden md:block">
                        <h1 className="text-xl md:text-2xl uppercase font-black">Михаил Бочкарев</h1>
                        <p className="text-xs md:text-sm text-gray-400 leading-3">Здоровый сон возможен</p>
                    </div>
                </Link>

                {/* Десктопная версия */}
                <div className={`hidden md:flex flex-1 mx-4 md:mx-10 ${isOpen ? 'block' : 'hidden'}`}>
                    {hasSearch ? (
                        <div className="flex-1 mx-4 md:mx-10">
                            <div className="md:hidden">
                                <Search size={24} className="text-gray-500" />
                            </div>
                            <div className="hidden md:block">
                                <SearchInput />
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-row space-x-4">
                            <div>Опрос</div>
                            <Link href="/aboutUS">
                                <div className="cursor-pointer">О нас</div>
                            </Link>
                            <DropdownMenu>
                                <DropdownMenuTrigger>Услуги</DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>Онлайн Услуги</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <Link href="https://telegra.ph/Polisomnografiya-07-27">
                                            Методы Диагностики
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <div>Врачи</div>
                            <div>Лечение нарушения сна</div>
                        </div>
                    )}
                </div>

                {/* Правая часть */}
                <div className="flex items-center gap-2 md:gap-3">
                    {!session ? (
                        <Link href='/signin'>
                            <Button variant="outline" className="flex items-center gap-1 text-xs md:text-sm">
                                <User size={14} />
                                <span className="hidden md:inline">Войти</span>
                            </Button>
                        </Link>
                    ) : (
                        <Button className="flex items-center gap-1 text-xs md:text-sm" variant='outline' onClick={() => { router.push('/profile') }}>
                            <User size={14} />
                            <span className="hidden md:inline">Личный кабинет</span>
                        </Button>
                    )}

                    <div>
                        <Link href="/signin">
                            <Button type="submit" className="w-full h-8 md:h-10 text-xs md:text-sm">
                                <span className="hidden md:inline">Пройти тест</span>
                                <span className="md:hidden">Тест</span>
                                <ArrowRight className="w-4 md:w-5 ml-1 md:ml-2" />
                            </Button>
                        </Link>
                    </div>
                    <div className="md:hidden ml-auto">
                        <Button variant="outline" onClick={toggleMenu}>
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </Button>
                    </div>
                </div>
            </Container>

            {/* Меню для мобильной версии */}
            {isOpen && (
                <div className="md:hidden bg-white shadow-md p-4">
                    <div className="flex flex-col space-y-2">
                        <Link href="/aboutUS">О нас</Link>
                        <Link href="/">Опрос</Link>
                        <Link href="/signin">Войти</Link>
                        <Link href="/profile">Личный кабинет</Link>
                        <Link href="https://telegra.ph/Polisomnografiya-07-27">Методы Диагностики</Link>
                        <Link href="/">Услуги</Link>
                        <Link href="/">Врачи</Link>
                        <Link href="/">Лечение нарушения сна</Link>
                    </div>
                </div>
            )}
        </header>
    );
};
