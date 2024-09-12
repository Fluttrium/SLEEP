"use client"
import Sidebar from "@/components/admincomps/adminsidebar";
import { useDashboardStore } from "@/app/admin/_store/adminpageStore";
import Requests from "@/components/admincomps/Requests";
import { Separator } from "@/components/ui/separator";
import { Users } from "@/components/admincomps/Users";
import Redactor from "@/components/admincomps/Redactor";

export default function AdminMainPage() {
    const section = useDashboardStore((state) => state.section);

    const renderSection = (section: string) => {
        switch (section) {
            case 'users':
                return <Users />;
            case 'requests':
                return <Requests />;
            case 'redactor':
                return <Redactor />;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-row">
            <Sidebar />
            <Separator orientation="vertical" className="h-screen mx-1" />
            <main className="flex-1 overflow-auto ">
                {renderSection(section)}
            </main>
        </div>
    );
}
