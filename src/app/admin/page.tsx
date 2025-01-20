"use client"
import Sidebar from "@/components/admincomps/main/adminsidebar";
import {useDashboardStore} from "@/app/admin/_store/adminpageStore";
import Requests from "@/components/admincomps/main/Requests";
import {Separator} from "@/components/ui/separator";
import {Users} from "@/components/admincomps/main/Users";
import {Redactor} from "@/components/admincomps/main/Redactor";
import {TestCreator} from "@/components/admincomps/main/TestCreator";
import Calendardash from "@/components/admincomps/calendar/calendar";
import CalendarMainPage from "@/components/admincomps/calendar/calendarMainPage";



export default function AdminMainPage() {
    const section = useDashboardStore((state) => state.section);

    const renderSection = (section: string) => {
        switch (section) {
            case 'users':
                return <Users/>;
            case 'requests':
                return <Requests/>;
            case 'redactor':
                return <Redactor/>;
            case 'test':
                return <TestCreator/>;
            case 'calendar':
                return <CalendarMainPage/>;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-row overflow-x-hidden">
            <Sidebar/>
            <Separator orientation="vertical" className="h-screen mx-1"/>
            <main className="flex-1 overflow-auto ">
                {renderSection(section)}
            </main>
        </div>
    );
}
