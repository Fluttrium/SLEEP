"use client"
import {useDashboardStore} from "@/app/admin/_store/adminpageStore";
import {Button} from "@/components/ui/button"
import { TfiWrite } from "react-icons/tfi";

import {EnvelopeOpenIcon, ExitIcon, PersonIcon} from "@radix-ui/react-icons";
import {LuUsers2} from "react-icons/lu";

export default function Sidebar() {
    const setSection = useDashboardStore((state) => state.setSection);

    return (
        <nav className="flex flex-col h-screen py-8   justify-between items-center">
            <div className="rounded-2xl backdrop-blur bg-gray-200 w-12 h-12 justify-center flex items-center">
                <p>лого</p></div>
            <ul className="space-y-5">
                <li onClick={() => setSection('requests')}>
                    <Button variant="outline" size="icon">
                        <PersonIcon className="h-5 w-5"/>
                    </Button>

                </li>
                <li onClick={() => setSection('users')}>
                    <Button variant="outline" size="icon">
                        <LuUsers2 className="h-5 w-5"/>
                    </Button>
                </li>
                <li onClick={() => setSection('redactor')}>
                    <Button variant="outline" size="icon">
                        <TfiWrite className="h-5 w-5"/>
                    </Button>
                </li>
            </ul>
            <Button variant="outline" size="icon">
                <ExitIcon className="h-4 w-4"/>
            </Button>
        </nav>
    );
}