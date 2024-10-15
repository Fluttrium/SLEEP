'use client';

import {cn} from "@/lib/utils";
import Link from "next/link";
import {Container} from './container';
import Image from 'next/image';
import {Button} from "../../ui/button";
import {ArrowRight, User, Search} from "lucide-react";
import {SearchInput} from "./search-input";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
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
    return (
        <header className={cn('border-b bg-background w-full', className)}>
            <Container
                className="flex items-center justify-between py-4 md:py-8 mx-auto px-4"> {/* Добавлены отступы */}
                {/* Левая часть */}
                <Link href="/signin">
                    <div className="flex items-center gap-2 md:gap-4">
                        <Image src="/sleeplogo.png" alt="Logo" width={50} height={50}/>
                        <div className="hidden md:block"> {/* Скрываем на мобильной версии */}
                            <h1 className="text-xl md:text-2xl uppercase font-black">Михаил Бочкарев</h1>
                            <p className="text-xs md:text-sm text-gray-400 leading-3">Здоровый сон возможен</p>
                        </div>
                    </div>
                </Link>

                {hasSearch ? (<div className="flex-1 mx-4 md:mx-10">
                    {/* Иконка поиска на мобильной версии */}
                    <div className="md:hidden">
                        <Search size={24} className="text-gray-500"/>
                    </div>
                    {/* Поле поиска на десктопе */}
                    <div className="hidden md:block">
                        <SearchInput/>
                    </div>
                </div>) : (
                    <div className="flex flex-row space-x-4 ">
                        <div>Опрос</div>
                        <DropdownMenu>
                            <DropdownMenuTrigger>O нас</DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>Онлайн Услуги</DropdownMenuItem>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem>Методы Диагностики</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <div>Врачи</div>
                        <div>Лечение нарушения сна</div>


                    </div>
                )
                }

                {/* Правая часть */}
                <div className="flex items-center gap-2 md:gap-3">
                    {/* Кнопка "Войти" с текстом на десктопе */}
                    {!session ? (<Link href='/signin'>
                        <Button variant="outline" className="flex items-center gap-1 text-xs md:text-sm">
                            <User size={14}/>
                            <span className="hidden md:inline">Войти</span> {/* Показываем текст только на десктопе */}
                        </Button>
                    </Link>) : (
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
                            <Button
                                type="submit"
                                className="w-full h-8 md:h-10 text-xs md:text-sm">
                                <span className="hidden md:inline">Пройти тест</span> {/* Текст для десктопа */}
                                <span className="md:hidden">Тест</span> {/* Текст для мобильной версии */}
                                <ArrowRight className="w-4 md:w-5 ml-1 md:ml-2"/>
                            </Button>
                        </Link>
                    </div>
                </div>
            </Container>
        </header>
    );
};
