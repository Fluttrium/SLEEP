'use client'
import { useEffect, useState } from "react";
import Doctorslist from "@/components/clientconsulwidgets/doctorslist";
import CalendarWidget from "@/components/clientconsulwidgets/CalendarWidget";


export default function DoctorPage({ params }: { params: { specialityTitle: string } }) {
    const [isDoctor, setIsDoctor] = useState<boolean | null>(null);

    useEffect(() => {
        async function fetchUserIds() {
            try {
                const response = await fetch("/api/getUserIds"); // Подставь реальный API
                const userIds: string[] = await response.json();
                setIsDoctor(userIds.includes(params.specialityTitle));
            } catch (error) {
                console.error("Ошибка загрузки ID пользователей:", error);
                setIsDoctor(false);
            }
        }

        fetchUserIds();
    }, [params.specialityTitle]);

    if (isDoctor === null) return <div>Загрузка...</div>;

    return isDoctor ? (
        <div className="container mx-auto p-8">
            <CalendarWidget doctorId={params.specialityTitle} />
        </div>
    ) : (
        <Doctorslist specialityTitle={params.specialityTitle} />
    );
}
