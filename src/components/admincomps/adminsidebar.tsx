"use client"
import { useDashboardStore } from "@/app/admin/_store/adminpageStore";
import { Button } from "@/components/ui/button"
import {
    CircleUserRound,
    Book,
    Settings2,
    UsersRound,
    LogOut,
    SquarePen
} from "lucide-react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


export default function Sidebar() {
    const setSection = useDashboardStore((state) => state.setSection);

    return (

        <nav className="flex flex-col justify-between items-center gap-1 p-2 my-4" >
            <TooltipProvider>
                <div className="rounded-2xl backdrop-blur bg-gray-200 w-12 h-12 justify-center flex items-center">
                    <p>лого</p></div>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            onClick={() => setSection('requests')}
                            variant="ghost"
                            size="icon"
                            className="rounded-lg"
                            aria-label="Личный кабинет"
                        >
                            <CircleUserRound className="size-7" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={10}>
                        Личный кабинет
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            onClick={() => setSection('users')}
                            variant="ghost"
                            size="icon"
                            className="rounded-lg"
                            aria-label="Пользователи"
                        >
                            <UsersRound className="size-7" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={10}>
                        Пользователи
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            onClick={() => setSection('redactor')}
                            variant="ghost"
                            size="icon"
                            className="rounded-lg"
                            aria-label="База знаний"
                        >
                            <SquarePen className="size-7" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={10}>
                        База знаний
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="destructive"
                            size="icon"
                            className="rounded-lg"
                            aria-label="Settings"
                        >
                            <LogOut className="size-7" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-destructive" side="right" sideOffset={5}>
                        Выйти из аккаунта
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </nav >

    );
}

{/*<nav className="fix  absolute left-0 z-10 flex flex-col h-screen py-8   justify-between items-center">
            <div className="rounded-2xl backdrop-blur bg-gray-200 w-12 h-12 justify-center flex items-center">
                <p>лого</p></div>
            <ul className="space-y-5">
                <li onClick={() => setSection('requests')}>
                    <Button variant="outline" size="icon">
                        <PersonIcon className="h-5 w-5" />
                    </Button>

                </li>
                <li onClick={() => setSection('users')}>
                    <Button variant="outline" size="icon">
                        <LuUsers2 className="h-5 w-5" />
                    </Button>
                </li>
                <li onClick={() => setSection('redactor')}>
                    <Button variant="outline" size="icon">
                        <TfiWrite className="h-5 w-5" />
                    </Button>
                </li>
            </ul>
            <Button variant="outline" size="icon">
                <ExitIcon className="h-4 w-4" />
            </Button>
        </nav> */}