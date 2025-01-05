"use client";
import { FocusCards } from "./focus-card";

export function FocusCardsDemo() {
  const cards = [
    {
      title: "Попробуйте узнать больше о себе! Пройдите наш тест и откройте свои скрытые возможности!",
      src: "", // Замените на новый путь
    },
  ];

  return <FocusCards cards={cards} />;
}
