"use client";
import Image from "next/image";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Title } from "./shared/ui/title";


export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: any;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
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
        {/* Используем компонент Title для отображения заголовка */}
        <Title
          text={card.title}
          size="2xl" 
          className="text-center bg-clip-text text-bold bg-gradient-to-b from-neutral-50 to-neutral-200 mb-6"
        />
        <button className="p-[6px] relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-primary rounded-[64px]" />
          <div
            style={{ fontWeight: 600 }}
            className="px-[128px] py-10 bg-white rounded-[64px] text-4xl relative group transition duration-200 text-black hover:bg-transparent"
          >
            Пройти тест
          </div>
        </button>
      </div>
    </div>
  )
);

Card.displayName = "Card";

type Card = {
  title: string;
  src: string;
};

export function FocusCards({ cards }: { cards: Card[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-center w-full">
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}

export { Title };
