"use-client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "./bento-grid";

export function BentoGridDemo() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Проверка ширины экрана
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Порог мобильных экранов
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <BentoGrid className="max-w-5xl mx-auto">
      {items
        .slice(0, isMobile ? 2 : items.length) // 2 карточки на мобильных экранах
        .map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={
              <div className="w-full h-60 rounded-xl flex items-center justify-center">
                {item.infographic}
              </div>
            }
            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
          />
        ))}
    </BentoGrid>
  );
}

const items = [
  {
    title: "Более 60 нарушений сна",
    description: "Бессонница и сонливость - основные симптомы всех нарушений сна",
    infographic: (
      <svg
        width="100"
        height="100"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 50 50"
      >
        <path
          d="M24.5 42.5s-14-8.5-14-19c0-5.5 4.5-10 10-10 3 0 5.5 1.5 7 4 1.5-2.5 4-4 7-4 5.5 0 10 4.5 10 10 0 10.5-14 19-14 19Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    title: "18,1%",
    description: "Распространенность синдрома апноэ во сне в РФ",
    infographic: (
      <svg
        width="100"
        height="100"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 50 50"
      >
        <path
          d="M5 25h10l5-10 10 20 5-10h10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="25"
          cy="25"
          r="23"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    title: "39%",
    description: "Россиян испытывают избыточную дневную сонливость",
    infographic: (
      <svg
        width="100"
        height="100"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 50 50"
      >
        <path
          d="M15 20h20v15H15z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          fill="currentColor"
        />
        <path d="M20 25h10v5H20z" fill="#fff" />
        <path
          d="M25 5v5M15 10h20M25 35v5M15 40h20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "100%",
    description:
      "Жизнеугрожающие заболевания, такие как синдром апноэ во сне, не выявляются врачами",
    infographic: (
      <svg
        width="100"
        height="100"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 50 50"
      >
        <path
          d="M25 5v40M5 25h40"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Развитие апноэ обструктивного типа увеличивается с возрастом.",
    description: "От остановок дыхания во сне страдают примерно 3-7% мужчин и 2-5% женщин",
    infographic: (
      <svg
        width="100"
        height="100"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 50 50"
      >
        <path
          d="M25 5v40M5 25h40"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default BentoGridDemo;
