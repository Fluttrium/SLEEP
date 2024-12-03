'use client';

import {cn} from "@/lib/utils";
import Link from "next/link";
import {Container} from './container';
import Image from 'next/image';
import {Button} from "../../ui/button";
import {ArrowRight, User, Search, Menu, X} from "lucide-react";
import {SearchInput} from "./search-input";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useState} from "react";

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

export const Header: React.FC<Props> = ({className, hasSearch}) => {
    const router = useRouter();
    const {data: session} = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState(false)// Состояние для бургер-меню

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className={cn('border-b bg-background w-full', className)}>
            <Container className="flex items-center justify-between py-4 md:py-8 mx-auto px-4">
                {/* Левая часть */}
                <Link href="/" className="flex items-center gap-2 md:gap-4">
                    <Image src="/sleeplogo.png" alt="Logo" width={50} height={50}/>
                    <div className="hidden md:block">
                        <h1 className="text-xl md:text-2xl uppercase font-black">Asleep</h1>
                        <p className="text-xs md:text-sm text-gray-400 leading-3">Здоровый сон возможен</p>
                    </div>
                </Link>

                {/* Десктопная версия */}
                <div className={`hidden md:flex flex-1 mx-4 md:mx-10`}>
                    {search ? (
                        <div className="flex-1 justify-between flex-row mx-4 md:mx-10">


                                <>
                                    <div className="md:hidden">
                                        <Search size={24} className="text-gray-500"/>
                                    </div>
                                    <div className="hidden md:block">
                                        <SearchInput/>
                                    </div>
                                </>


                        </div>
                    ) : (
                        <div className="flex flex-row space-x-4">
                            <Link href="/survey">
                                <div className="cursor-pointer">Опрос</div>
                            </Link>
                            <Link href="/aboutUS">
                                <div className="cursor-pointer">О нас</div>
                            </Link>
                            <DropdownMenu>
                            <DropdownMenuTrigger>Услуги</DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>
                                        <Link href="/online-service">
                                            <div className="cursor-pointer">Онлайн Услуги</div>
                                        </Link></DropdownMenuItem>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuItem>
                                        <Link href="https://telegra.ph/Polisomnografiya-07-27">
                                            Методы Диагностики
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Link href="/doctors">
                                <div className="cursor-pointer">Врачи</div>
                            </Link>
                            <DropdownMenu>
                                <DropdownMenuTrigger>Лечение нарушения сна</DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>
                                        <Link href="/cpap">
                                            <div className="cursor-pointer">Сипап терапия</div>
                                        </Link></DropdownMenuItem>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuItem>
                                        <Link href="https://telegra.ph/Polisomnografiya-07-27">
                                            Методы Диагностики
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Link href="/articles">
                                <div className="cursor-pointer">Блог</div>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Правая часть */}
                <div className="flex items-center gap-2 md:gap-3">
                    {hasSearch && ( <Button className="rounded-3xl" onClick={() => setSearch((prev) => !prev)}>
                        <Search size={24} className="text-gray-500"/>
                    </Button>) }

                    {!session ? (
                        <Link href='/signin'>
                            <Button variant="outline" className="flex items-center gap-1 text-xs md:text-sm">
                                <User size={14}/>
                                <span className="hidden md:inline">Войти</span>
                            </Button>
                        </Link>
                    ) : (
                        <Button className="flex items-center gap-1 text-xs md:text-sm" variant='outline'
                                onClick={() => {
                                    router.push('/profile')
                                }}>
                            <User size={14}/>
                            <span className="hidden md:inline">Личный кабинет</span>
                        </Button>
                    )}


                    <div>

                        <Link href="/signin">
                            <Button type="submit" className="w-full h-8 md:h-10 text-xs md:text-sm">
                                <span className="hidden md:inline">Пройти тест</span>
                                <span className="md:hidden">Тест</span>
                                <ArrowRight className="w-4 md:w-5 ml-1 md:ml-2"/>
                            </Button>
                        </Link>
                    </div>
                    <div className="md:hidden ml-auto">
                        <Button variant="outline" onClick={toggleMenu}>
                            {isOpen ? <X size={24}/> : <Menu size={24}/>}
                        </Button>
                    </div>
                </div>
            </Container>

            {/* Меню для мобильной версии */}
            {isOpen && (
                <div className="md:hidden bg-white shadow-lg p-4 rounded-b-md">
                    <div className="flex flex-col space-y-2">
                        <Link href="/aboutUS" className="p-2 rounded hover:bg-gray-100">О нас</Link>
                        <Link href="/" className="p-2 rounded hover:bg-gray-100">Опрос</Link>
                        <Link href="/profile" className="p-2 rounded hover:bg-gray-100">Личный кабинет</Link>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="p-2 rounded hover:bg-gray-100 text-left">
                                Услуги
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="left-0">
                                <Link href="/online-service" className="p-2 rounded hover:bg-gray-100">
                                    Онлайн курсы
                                </Link>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem>
                                    <Link href="https://telegra.ph/Polisomnografiya-07-27">
                                        Методы Диагностики
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Link href="/" className="p-2 rounded hover:bg-gray-100">Врачи</Link>
                        <Link href="/" className="p-2 rounded hover:bg-gray-100">Лечение нарушения сна</Link>
                        <Link href="/articles">
                            <div className="cursor-pointer">Блог</div>
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};
