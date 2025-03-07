"use client";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import {cn} from "@/lib/utils";
import Link from "next/link";


export const Card = React.memo(
    ({
         card,
         index,
         hovered,
         setHovered,
        def
     }: {
        card: any;
        index: number;
        hovered: number | null;
        setHovered: React.Dispatch<React.SetStateAction<number | null>>;
        def: string
    }) => (
        <div
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            className={cn(
                "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-80 md:h-96 w-full md:w-[60%] transition-all duration-300 ease-out",
                hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
            )}
        >
            <Image
                src={card.src}
                alt={card.title}
                fill
                className="object-cover absolute inset-0"
            />
            <div
                className={cn(
                    "absolute inset-0 bg-black/50 flex flex-col items-center justify-center py-8 px-4 transition-opacity duration-300",
                    hovered === index ? "opacity-100" : "opacity-0"
                )}
            >
                <div
                    className="text-center text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200 mb-6">
                    {card.title}
                </div>
                <Link href={def || '/'}>
                <button className="p-[6px] relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-primary rounded-[64px]"/>
                    <div
                        style={{fontWeight: 600}}
                        className="px-8 py-4 sm:px-16 sm:py-6 bg-white rounded-[64px] text-xl sm:text-4xl relative group transition duration-200 text-black hover:bg-transparent"
                    >
                        Пройти тест
                    </div>
                </button>
                </Link>
            </div>
        </div>
    )
);

Card.displayName = "Card";

type Card = {
    title: string;
    src: string;
};

export function FocusCards({cards}: { cards: Card[] }) {
    const [hovered, setHovered] = useState<number | null>(null);
    const [deftest, setDeftest] = useState('')

    useEffect(() => {
        const fetchDeftest = async () => {
            try {
                const response = await fetch('/api/test/deftest');
                const data = await response.json();

                if (typeof data === 'string') {
                    // Гарантируем, что значение всегда начинается с "/"
                    setDeftest(data.startsWith('/') ? data : `/${data}`);
                } else {
                    console.error("Некорректный формат ответа:", data);
                    setDeftest('/'); // Устанавливаем значение по умолчанию
                }
            } catch (error) {
                console.error("Ошибка при загрузке дефолтного теста:", error);
                setDeftest('/'); // Устанавливаем значение по умолчанию при ошибке
            }
        };

        fetchDeftest();
    }, []);

    return (
        <div className="flex flex-col items-center w-full">
            {cards.map((card, index) => (
                <Card
                    key={card.title}
                    card={card}
                    index={index}
                    hovered={hovered}
                    setHovered={setHovered}
                    def={deftest}
                />
            ))}
        </div>
    );
}
