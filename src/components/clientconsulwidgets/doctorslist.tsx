"use client";

import {useEffect, useState} from "react";
import {User} from "@prisma/client";
import {useRouter} from "next/navigation";

export default function Doctorslist({specialityTitle}: { specialityTitle: string }) {
    const [doctors, setDoctors] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (!specialityTitle) {
            setError("Не указана специальность");
            setLoading(false);
            return;
        }

        async function fetchDoctors() {
            try {
                const response = await fetch("/api/userconsul", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({specialty: specialityTitle}),
                });

                if (!response.ok) {
                    throw new Error("Ошибка загрузки данных");
                }

                const data: User[] = await response.json();
                setDoctors(data);
            } catch (error) {
                setError(error instanceof Error ? error.message : "Что-то пошло не так.");
                console.error("Ошибка:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchDoctors();
    }, [specialityTitle]);

    const handleDoctorClick = (doctor: User) => {
        if (!doctor.specialty || !doctor.id) {
            console.error("Некорректные данные доктора");
            return;
        }

        const encodedSpecialty = encodeURIComponent(doctor.specialty);
        router.push(`/consultations/${encodedSpecialty}/${doctor.id}`);
    };

    return (
        <div className="grid grid-cols-2 justify-center items-center w-full p-10">
            {loading && !error ? (
                <p>Загрузка...</p>
            ) : error ? (
                <div className="text-red-600 font-semibold">{error}</div>
            ) : doctors.length > 0 ? (
                doctors.map((doctor) => (
                    <div
                        key={doctor.id}
                        onClick={() => handleDoctorClick(doctor)}
                        className="max-h-64 border rounded-lg shadow-lg p-6 bg-white mb-4 flex justify-between flex-row hover:border-blue-600 cursor-pointer transition-all"
                    >
                        <div className='flex flex-col'>
                            <div className="text-2xl font-bold text-blue-600">{doctor.name}</div>
                            <div className="text-lg text-gray-600">{doctor.specialty}</div>
                            <div className="mt-4 text-gray-800">{doctor.description}</div>
                        </div>
                        <div>
                            <img
                                alt="фото доктора"
                                src={doctor.image || "/default-avatar.png"}
                                className='rounded-3xl max-h-24 object-cover'
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = "/default-avatar.png";
                                }}
                            />
                        </div>
                    </div>
                ))
            ) : (
                <p>Доктора не найдены</p>
            )}
        </div>
    );
}