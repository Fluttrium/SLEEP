"use client";
import React from "react";
import Link from "next/link";
import { GlareCardDemo } from "@/components/ui/glare-cardDemo";
import { GlareCardDemo3 } from "@/components/ui/glare-cardDemo3";
import { GlareCardDemo4 } from "@/components/ui/glare-cardDemo4";
import { GlareCardDemo5 } from "@/components/ui/glare-cardDemo5";

const AboutUsPage = () => {
  return (
    <div className="container mx-auto py-12 px-6">
    
      <div className="text-lg text-left mb-8 text-gray-700 leading-relaxed">
        <div>
          <span className="font-semibold">Команда Asleep</span> — это группа профессионалов, стремящихся помочь каждому пользователю улучшить качество своего сна. Мы понимаем, что качественный сон является основой здорового образа жизни, и для нас важен комплексный подход к лечению нарушений сна. Мы объединяем людей, которые хотят оценить и улучшить свой сон, с поставщиками услуг и продуктов, таких как клиники, производители оборудования и гаджетов для сна, психологи, онлайн-курсы и программы когнитивно-поведенческой терапии для лечения инсомнии.
        </div>
        <div className="mt-6">
          Наша платформа предлагает бесплатный опрос, который анализирует показатели сна и помогает определить, что необходимо каждому пользователю для нормализации и улучшения сна.
        </div>

        <h2 className="text-2xl lg:text-3xl font-semibold mt-8 mb-4 text-gray-900 text-left">Наше решение</h2>
        <div className="leading-relaxed mb-6">
          Мы предлагаем индивидуальные решения для каждого, ориентируясь на специфические потребности и особенности пользователя. Платформа предоставляет доступ к профессиональной диагностике и рекомендациям, которые помогут улучшить качество сна, а также расширяет доступ к высококачественным услугам, таким как онлайн консультации и персонализированные курсы.
        </div>

        <h2 className="text-2xl lg:text-3xl font-semibold mt-8 mb-4 text-gray-900 text-left">Почему выбирают нас?</h2>
        <ul className="list-disc list-inside text-left text-lg text-gray-700">
          <li><span className="font-semibold">Индивидуальный подход:</span> Мы учитываем уникальные потребности каждого пользователя, предлагая персонализированные решения.</li>
          <li><span className="font-semibold">Комплексная диагностика:</span> Наши инструменты позволяют вам не только оценить качество сна, но и получить рекомендации по улучшению.</li>
          <li><span className="font-semibold">Профессиональные консультанты и курсы:</span> В нашей команде работают эксперты, готовые помочь на каждом этапе — от диагностики до выбора правильного лечения.</li>
          <li><span className="font-semibold">Инновационные продукты:</span> Мы сотрудничаем с ведущими поставщиками продуктов для сна, чтобы предложить самые эффективные решения.</li>
        </ul>

        <div className="mt-6">
          Команда Asleep всегда рядом, чтобы помочь вам вернуть себе здоровый и полноценный сон.
        </div>

        <div className="mt-6">
          Для связи с нами и сотрудничества, пожалуйста, напишите в <Link href="https://web.telegram.org/k/#@Mikhail_V_Bochkarev" target="_blank" className="text-blue-600 hover:underline">Telegram</Link>.
        </div>
      </div>

      <TeamCard />
    </div>
  );
};

const TeamCard = () => {
  return (
    <div className="flex flex-col items-center pb-8">
      <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white pb-4">
        Наша команда
      </h4>
      <GlareCardDemo />
      <hr className="my-8 w-1/2 border-t-2 border-gray-300 dark:border-gray-700" />
      <GlareCardDemo3 />
      <hr className="my-8 w-1/2 border-t-2 border-gray-300 dark:border-gray-700" />
      <GlareCardDemo4 />
      <hr className="my-8 w-1/2 border-t-2 border-gray-300 dark:border-gray-700" />
      <GlareCardDemo5 />
    </div>
  );
};

export default AboutUsPage;
