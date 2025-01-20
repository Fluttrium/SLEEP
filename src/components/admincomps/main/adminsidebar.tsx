"use client"
import {useDashboardStore} from "@/app/admin/_store/adminpageStore";
import {Button} from "@/components/ui/button"
import {
    CircleUserRound,
    UsersRound,
    LogOut,
    SquarePen, SquareCheckBig, Calendar
} from "lucide-react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


export default function Sidebar() {
    const {setSection, section} = useDashboardStore((state) => ({
        setSection: state.setSection,
        section: state.section,
    }));

    const isActive = (currentSection: string) => section === currentSection ? 'bg-blue-500 text-white' : 'text-black';

    return (
        <nav className="flex flex-col justify-between items-center gap-1 p-2 my-4">
            <TooltipProvider>
                <div className="rounded-2xl backdrop-blur bg-gray-200 w-12 h-12 justify-center flex items-center">
                    <img
                        src="/sleeplogo.png"
                    />
                </div>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            onClick={() => setSection('requests')}
                            variant="ghost"
                            size="icon"
                            className={`rounded-lg ${isActive('requests')}`}
                            aria-label="Личный кабинет"
                        >
                            <CircleUserRound className="size-7"/>
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
                            className={`rounded-lg ${isActive('users')}`}
                            aria-label="Пользователи"
                        >
                            <UsersRound className="size-7"/>
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
                            className={`rounded-lg ${isActive('redactor')}`}
                            aria-label="База знаний"
                        >
                            <SquarePen className="size-7"/>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={10}>
                        База знаний
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            onClick={() => setSection('test')}
                            variant="ghost"
                            size="icon"
                            className={`rounded-lg ${isActive('test')}`}
                            aria-label="Тесты"
                        >
                            <SquareCheckBig className="size-7"/>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={10}>
                        Тесты
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            onClick={() => setSection('calendar')}
                            variant="ghost"
                            size="icon"
                            className={`rounded-lg ${isActive('calendar')}`}
                            aria-label="Календарь"
                        >
                            <Calendar  className="size-7"/>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={10}>
                        Календарь
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
                            <LogOut className="size-7"/>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-destructive" side="right" sideOffset={5}>
                        Выйти из аккаунта
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </nav>
    );
}
