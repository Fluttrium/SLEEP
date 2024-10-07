"use client";
import React from "react";
import { StickyScroll } from "../ui/sticky-scroll-reveal";
import Image from "next/image";

const content = [
  {
    title: " Полисомнография",
    description:
      "Полисомнография - метод длительной оценки физиологических и патологических изменений, происходящих в организме во время ночного сна.Полисомнография является «золотым стандартом» диагностики нарушений сна и проводится в больнице. В результате исследования кроме определяется длительность засыпания, фактическая продолжительность сна, стадии сна, причины пробуждений и их взаимосвязь с другими событиями – остановками дыхания, храпом, снижением уровня кислорода, движениями тела и ног, жевательных мышц; взаимосвязь нарушений ритма и дыхания, что позволяет определить подходы к лечению нарушений дыхания и других заболеваний.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        Полисомнография
      </div>
    ),
  },
  
  {
    title: "Когда нужно проводить полисомнографию:",
    description: (
        <div className="flex">
          <div className="flex-1 p-4 text-white">
            <ul className="list-disc ml-5">
              <li>Жалобы на храп или апноэ во сне с низким риском синдрома апноэ во время сна или при наличии серьезных сопутствующих хронических заболеваний дыхательной или сердечно-сосудистой систем, или морбидного ожирения (ИМТ 40 кг/м²).</li>
              <li>Подозрение на повышенную двигательную активность во время сна (синдром периодических движений конечностей) в сочетании с выраженными симптомами инсомнии.</li>
              <li>Нарушения ритма сердца, которые могут быть связаны со сном.</li>
              <li>Подозрение на парасомнии по типу нарушения поведения в фазу быстрого сна.</li>
              <li>Избыточная дневная сонливость или потребность во сне 10ч (гиперсомния) для исключения центральных гиперсомний. В этом случае требуется дневник сна 1 неделю до исследования и тесты с дневным засыпания (МТЛС) после исследования.</li>
              <li>Подозрение на сочетание нарушений сна с эпилепсией.</li>
              <li>Исключение сочетания других нарушений сна с инсомнией.</li>
              <li>Инсомния, устойчивая к стандартному лечению.</li>
            </ul>
          </div>
          
        </div>
      ),
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src="/linear.webp"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Version control",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
        Version control
      </div>
    ),
  },
  {
    title: "Running out of content",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        Running out of content
      </div>
    ),
  },
];
export function StickyScrollRevealDemo() {
  return (
    <div className="p-10">
      <StickyScroll content={content} />
    </div>
  );
}
