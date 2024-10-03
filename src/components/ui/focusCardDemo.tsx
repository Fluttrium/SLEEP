"use client"
import { FocusCards } from "./focus-card";


export function FocusCardsDemo() {
  const cards = [
    {
      title: "Попробуйте узнать больше о себе! Пройдите наш тест и откройте свои скрытые возможности!",
      src: "/IMAGE 2024-10-03 12:25:05.jpg",
    },
  ];

  return <FocusCards cards={cards} />;
}
