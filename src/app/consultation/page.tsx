"use client";
import React from "react";


import Link from "next/link";
import { GlareCardDemo } from "@/components/ui/glare-cardDemo";
import { Form } from "@/components/Form";

const AboutUsPage = () => {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl lg:text-6xl text-center font-bold mb-12">О нас</h1>

      <div className="text-lg text-center mb-12">
        <p>CEO: Михаил Бочкарев</p>
        <p>Врач-терапевт, кандидат медицинских наук</p>
        <p>Сертифицирован по сомнологии Европейским обществом изучения сна</p>
        <p className="mt-4">
          По любым вопросам и для сотрудничества свяжитесь с нами в социальных сетях:
        </p>
        <Link href="https://web.telegram.org/k/#@Mikhail_V_Bochkarev" target="_blank" className="text-blue-600 hover:underline">
          Telegram
        </Link>
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
    </div>
  );
};

export default AboutUsPage;
