"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Specs {
    specialty: string;
    doctorIds: string[];
}

export default function SpecList() {
    const [specs, setSpecs] = useState<Specs[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function fetchSpecList() {
            try {
                const response = await fetch("/api/userconsul/specs");
                if (!response.ok) throw new Error("Ошибка загрузки данных");
                const data: Specs[] = await response.json();
                setSpecs(data);
            } catch (error) {
                console.error("Ошибка:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchSpecList();
    }, []);

    const handleClick = (specialityTitle: string) => {
        // Преобразуем массив doctorIds в строку, разделенную запятыми
        console.log(specialityTitle, "Переход по новому URL с параметрами");
        router.push(`/consultations/${specialityTitle}`);
    };

    return (
        <div className="flex justify-center items-center w-full flex-col">
            <div className="pt-8 text-5xl">Список специальностей</div>
            {loading ? (
                <p>Загрузка...</p>
            ) : specs.length > 0 ? (
                <div className="grid grid-cols-4 p-32 gap-6">
                    {specs.map((spec) => (
                        <SpecCard
                            key={spec.specialty} // Используйте specialty для ключа
                            spec={spec}
                            onClick={() => handleClick(spec.specialty)} // Передаем массив doctorIds
                        />
                    ))}
                </div>
            ) : (
                <p>Нет данных</p>
            )}
        </div>
    );
}

function SpecCard({ spec, onClick }: { spec: Specs; onClick: () => void }) {
    return (
        <div
            className="z-50 w-52 border rounded-lg shadow-md text-center p-7 hover:border-blue-600 cursor-pointer transition-all"
            onClick={onClick}
        >
            <div className="text-lg font-semibold">{spec.specialty}</div> {/* Используем specialty */}
        </div>
    );
}
