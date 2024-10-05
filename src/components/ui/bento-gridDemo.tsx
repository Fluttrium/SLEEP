import { cn } from "@/lib/utils";
import React from "react";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconBrain,
  IconClipboardCopy,
  IconFileBroken,
  IconHealthRecognition,
  IconMedicalCross,
  IconMedicalCrossCircle,
  IconMedicineSyrup,
  IconReportMedical,
  IconSignature,
  IconTableColumn,
  IconUserHeart,
} from "@tabler/icons-react";
import { BentoGrid, BentoGridItem } from "./bento-grid";

export function BentoGridDemo() {
  return (
    <BentoGrid className="max-w-5xl mx-auto">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={
            <div
              className="w-full h-60 rounded-xl"
              style={{
                backgroundImage: `url(${item.backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          }
          icon={item.icon}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
}

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[8rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

const items = [
  {
    title: "Более 60 нарушений сна",
    description: "Бессонница и сонливость - основные симптомы всех нарушений сна",
    header: <Skeleton />,
    icon: <IconUserHeart className="h-8 w-8 text-neutral-500" />,
    backgroundImage: "/iStock-896820002-1.jpg",
  },
  {
    title: "18,1%",
    description: "Распространенность синдрома апноэ во сне в РФ",
    header: <Skeleton />,
    icon: <IconUserHeart className="h-8 w-8 text-neutral-500" />,
    backgroundImage: "/iStock-896820002-1.jpg",
  },
  {
    title: "39%",
    description: "Россиян испытывают избыточную дневную сонливость",
    header: <Skeleton />,
    icon: <IconUserHeart className="h-8 w-8 text-neutral-500" />,
    backgroundImage: "/iStock-896820002-1.jpg",
  },
  {
    title: "100%",
    description: "Жизнеугрожающие заболевания, такие как синдром апноэ во сне, не выявляются врачами",
    header: <Skeleton />,
    icon: <IconUserHeart className="h-8 w-8 text-neutral-500" />,
    backgroundImage: "/iStock-896820002-1.jpg",
  },
  {
    title: "9,7 лет",
    description: "Среднее время постановки диагноза нарколепсии от появления симптомов",
    header: <Skeleton />,
    icon: <IconUserHeart className="h-8 w-8 text-neutral-500" />,
    backgroundImage: "/iStock-896820002-1.jpg",
  },
  {
    title: "Сомнология",
    description: "Специализация по нарушениям сна, отсутствующая в России",
    header: <Skeleton />,
    icon: <IconUserHeart className="h-8 w-8 text-neutral-500" />,
    backgroundImage: "/iStock-896820002-1.jpg",
  },
  {
    title: "The Spirit of Adventure",
    description: "Embark on exciting journeys and thrilling discoveries.",
    header: <Skeleton />,
    icon: <IconUserHeart className="h-8 w-8 text-neutral-500" />,
    backgroundImage: "/iStock-896820002-1.jpg",
  },
];
