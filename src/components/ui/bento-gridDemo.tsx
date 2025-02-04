"use client";
import { useState, useEffect } from "react";
import React from "react";
import { BentoGrid, BentoGridItem } from "./bento-grid";
import {
  IconHeartRateMonitor,
  IconMoon,
  IconAlertTriangle,
  IconUsers,
  IconUserPlus,
} from "@tabler/icons-react";

export function BentoGridDemo() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <BentoGrid className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={
            <div className="w-full h-20 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
              {item.icon}
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
    description: "Основные проблемы включают бессонницу, апноэ и другие расстройства.",
    icon: <IconMoon size={40} className="text-blue-500" />,
  },
  {
    title: "18,1%",
    description: "Такова распространенность синдрома апноэ во сне в РФ.",
    icon: <IconHeartRateMonitor size={40} className="text-red-500" />,
  },
  {
    title: "39% россиян",
    description: "Страдают от избыточной дневной сонливости.",
    icon: <IconAlertTriangle size={40} className="text-yellow-500" />,
  },
  {
    title: "100% пациентов",
    description: "Жизнеугрожающие заболевания часто остаются невыявленными.",
    icon: <IconUsers size={40} className="text-green-500" />,
  },
  {
    title: "Риск увеличивается с возрастом",
    description: "Апноэ чаще встречается у людей старше 40 лет.",
    icon: <IconUserPlus size={40} className="text-purple-500" />,
  },
];

export default BentoGridDemo;
