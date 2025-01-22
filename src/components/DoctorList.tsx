import {User} from "@prisma/client";
import React, {useEffect, useState} from "react";

export default function DoctorsList() {
    const [doctors, setDoctors] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Для хранения состояния раскрытия карточки
    const [expandedDoctor, setExpandedDoctor] = useState<string | null>(null);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await fetch("/api/doctors");
                if (!res.ok) {
                    throw new Error("Ошибка при загрузке данных");
                }
                const data = await res.json();
                console.log("Полученные данные врачей:", data);
                if (data && data.doctors) {
                    setDoctors(data.doctors);
                } else {
                    console.error("Структура данных неверная", data);
                }
            } catch (error) {
                console.error("Ошибка при загрузке врачей", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    const handleAppointmentSubmit = async (doctorId: string) => {
        setLoading(true);

        try {
            const res = await fetch("/api/appointment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({doctorId}),
            });

            if (!res.ok) {
                throw new Error("Ошибка при отправке данных");
            }

            alert("Запись успешно создана");
        } catch (error) {
            console.error("Ошибка при отправке данных:", error);
            alert("Ошибка при отправке данных");
        } finally {
            setLoading(false);
        }
    };

    const toggleCard = (doctorId: string) => {
        setExpandedDoctor((prev) => (prev === doctorId ? null : doctorId));
    };

    const truncateSpecialty = (specialty: string, maxLength: number = 50) => {
        if (!specialty) return "Не указана";
        if (specialty.length <= maxLength) return specialty;
        const lastSpaceIndex = specialty.lastIndexOf(" ", maxLength);
        return lastSpaceIndex !== -1 ? specialty.slice(0, lastSpaceIndex) + "..." : specialty.slice(0, maxLength) + "...";
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center my-6 text-gray-800 dark:text-white">
                Список врачей
            </h2>
            {doctors.length === 0 ? (
                <div className="text-center text-gray-600 dark:text-gray-300">
                    Нет врачей для отображения
                </div>
            ) : (
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {doctors.map((doctor) => (
                        <div
                            key={doctor.id}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col"
                        >
                            {/* Изображение врача */}
                            <div className="relative w-full h-48">
                                <img
                                    src={doctor.image || `/IMAGE 2024-10-03 11:52:23.jpg`} // Используем уникальное изображение врача
                                    alt={`${doctor.name} ${doctor.surname}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Информация о враче */}
                            <div className="p-4 flex-grow">
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                                    {`${doctor.name} ${doctor.surname}`}
                                </h3>
                                {/* Специальность с улучшенным сокращением */}
                                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                    <strong>Специальность:</strong>{" "}
                                    {truncateSpecialty(doctor.specialty || "")}
                                    {doctor.specialty && doctor.specialty.length > 50 && (
                                        <button
                                            className="text-blue-600 dark:text-blue-400 ml-2"
                                            onClick={() => toggleCard(doctor.id)}
                                        >
                                            {expandedDoctor === doctor.id ? 'Скрыть' : 'Показать'}
                                        </button>
                                    )}
                                </div>
                                {/* Полное описание специальности */}
                                {expandedDoctor === doctor.id && doctor.specialty && (
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        {doctor.specialty}
                                    </div>
                                )}
                                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                    <strong>Телефон:</strong> {doctor.phone}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    <strong>Email:</strong> {doctor.email}
                                </div>
                            </div>
                            {/* Кнопка записи на прием */}
                            <div className="p-4 w-full">
                                <button
                                    className="bg-gradient-to-br from-black dark:from-zinc-900 to-neutral-600 dark:to-zinc-900 w-full text-white rounded-md h-10 text-sm font-medium"
                                    onClick={() => handleAppointmentSubmit(doctor.id)} // передаем id врача при клике
                                    disabled={loading}
                                >
                                    {loading ? "Отправка..." : "Записаться на прием"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
