"use client"
import Sidebar from "@/components/admincomps/adminsidebar";
import {useDashboardStore} from "@/app/admin/_store/adminpageStore";
import Requests from "@/components/admincomps/Requests";
import { Separator } from "@/components/ui/separator"
import {Users} from "@/components/admincomps/Users";


export default function AdminMainPage(){

    const section = useDashboardStore((state) => state.section);


    let content;
    if (section === 'users') {
        content = <Users />;
    } else if (section === 'requests') {
        content = <Requests />;
    }

    return(
        <div className="flex flex-row">
            <Sidebar/>
            <Separator orientation="vertical" className="h-screen mx-1" />
            <main className="flex-1 overflow-auto ">{content}</main>

        </div>
    );
}