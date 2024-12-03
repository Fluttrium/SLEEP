"use client";
import React from "react";
import {cn} from "@/lib/utils";
import Image from "next/image";
import {motion} from "framer-motion";
import {IconBrandYoutubeFilled} from "@tabler/icons-react";
import Link from "next/link";
import {Title} from "../shared/ui/title";

export function FeaturesSectionDemo1() {
    const features = [
        {
            title: "",
            description:
                "Приглашаем вас на курс тематического усовершенствования врачей «Клиническая сомнология» - 36 часов, 36 баллов НМО и Сертификат прохождения курса. Все выпускники курса будут добавлены в бессрочный чат поддержки, где опытный врач-сомнолог Бочкарев М.В. будет помогать с медицинскими вопросами, а инженер компании CPAP RF осуществлять поддержку по оборудованию, программному обеспечению, выбору и подбору СИПАП-аппаратов и масок",
            skeleton: <SkeletonThree/>,
            className:
                "col-span-1 lg:col-span-3 lg:border-r dark:border-neutral-800",
        },
        {
            skeleton: <SkeletonFour/>,
            className: "col-span-1 lg:col-span-3 border-b lg:border-none",
        },
    ];

    return (
        <div className='w-screen relative'>
            <div className='absolute right-0 top-0 rotate-180 -z-50'>
                <Image src="/hero1.svg" alt="Icon" width={300} height={300} style={{height: '100%'}}/>
            </div>

            <div className="relative z-20 py-2 lg: max-w-7xl mx-auto">

                <div className="px-8">
                    <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white">
                    КУРС «КЛИНИЧЕСКАЯ СОМНОЛОГИЯ» С НАЧИСЛЕНИЕМ БАЛЛОВ НМО И БЕССРОЧНОЙ ПОДДЕРЖКОЙ
                    </h4>
                </div>
                <div className="relative">
                    <div className="grid grid-cols-1 lg:grid-cols-6 mt-12 xl:border rounded-md dark:border-neutral-800">
                        {features.map((feature) => (
                            <FeatureCard key={feature.title} className={feature.className}>
                                <FeatureTitle>{feature.title}</FeatureTitle>
                                <FeatureDescription>{feature.description}</FeatureDescription>
                                <div className="h-full w-full">{feature.skeleton}</div>
                            </FeatureCard>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

const FeatureCard = ({
                         children,
                         className,
                     }: {
    children?: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("p-4 sm:p-8 relative overflow-hidden", className)}>
            {children}
        </div>
    );
};

const FeatureTitle = ({children}: { children?: React.ReactNode }) => {
    return (
        <div
            className="max-w-5xl mx-auto text-left tracking-tight text-black dark:text-white text-xl md:text-2xl md:leading-snug">
            {children}
        </div>
    );
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
    return (
      <div
        className={cn(
          "text-lg md:text-xl lg:text-xl max-w-4xl mx-auto", // Увеличены размеры шрифта
          "text-neutral-600 dark:text-neutral-300 font-light leading-relaxed", // Более мягкий цвет и улучшенный интерлиньяж
          "text-center md:text-left px-4 md:px-6 lg:px-8 my-4" // Отступы для мобильных и десктопов
        )}
      >
        {children}
      </div>
    );
  };

// Компонент для отображения галереи изображений
const ImageGallery = ({images}: { images: string[] }) => {
    const imageVariants = {
        whileHover: {
            scale: 1.1,
            rotate: 0,
            zIndex: 100,
        },
        whileTap: {
            scale: 1.1,
            rotate: 0,
            zIndex: 100,
        },
    };

    return (
        <div className="flex flex-row flex-wrap gap-4 mt-4">
            {images.map((image, idx) => (
                <motion.div
                    key={idx}
                    variants={imageVariants}
                    whileHover="whileHover"
                    whileTap="whileTap"
                    className="rounded-xl p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
                >
                    <Image
                        src={image}
                        alt={`image-${idx}`}
                        width={150}
                        height={150}
                        className="rounded-lg object-cover flex-shrink-0"
                    />
                </motion.div>
            ))}
        </div>
    );
};

// Остальные компоненты остаются без изменений...


export const SkeletonTwo = () => {
    return (
        <div className="relative flex flex-col items-start p-8 gap-10 h-full overflow-hidden">
            {/* TODO: Add custom content for SkeletonTwo */}
        </div>
    );
};

export const SkeletonOne = () => {
    return (
        <div className="relative flex py-8 px-2 gap-10 h-full">
            <div className="w-full p-5 mx-auto bg-white dark:bg-neutral-900 shadow-2xl group h-full">
                <div className="flex flex-1 w-full h-full flex-col space-y-2">
                    <Image
                        src="/doctor-hospital-medical-health-medicine-teamwork-clinic-healthcare-laptop-computer-care-team-black-diversity-multiracial-unity-african-american-asian-nurse_772720-4760.jpg.avif"
                        alt="header"
                        width={800}
                        height={800}
                        className="h-full w-full aspect-square object-cover object-left-top rounded-sm"
                    />
                </div>
            </div>
            <div
                className="absolute bottom-0 z-40 inset-x-0 h-60 bg-gradient-to-t from-white dark:from-black via-white dark:via-black to-transparent w-full pointer-events-none"/>
            <div
                className="absolute top-0 z-40 inset-x-0 h-60 bg-gradient-to-b from-white dark:from-black via-transparent to-transparent w-full pointer-events-none"/>
        </div>
    );
};

export const SkeletonThree = () => {
    return (
        <Link
            href="https://www.youtube.com/watch?v=gMrtbn8Me6s"
            target="__blank"
            className="relative flex gap-10 h-full group/image"
        >
            <div className="w-full mx-auto bg-transparent dark:bg-transparent group h-full">
                <div className="flex flex-1 w-full h-full flex-col space-y-2 relative">
                    <IconBrandYoutubeFilled className="h-20 w-20 absolute z-10 inset-0 text-red-500 m-auto"/>
                    <Image
                        src="/Снимок экрана 2024-12-01 в 15.32.48.png"
                        alt="header"
                        width={800}
                        height={800}
                        className="h-full w-full aspect-square object-cover object-center rounded-sm blur-none group-hover/image:blur-md transition-all duration-200"
                    />
                </div>
            </div>
        </Link>
    );
};

export const SkeletonFour = ({ className }: { className?: string }) => {
    return (
      <div className={cn("relative flex flex-col items-center p-8 gap-6", className)}>
        
        {/* Текстовые блоки */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-black dark:text-white">
          Лектор: Бочкарев М.В.
          </h2>
          <div className="text-lg font-medium text-neutral-700 dark:text-neutral-300">
          Длительность: 36 часов
          </div>
          <div className="text-md font-normal text-neutral-600 dark:text-neutral-400 mt-2">
            Баллы НМО: 36 часов
          </div>
        </div>

        <Image
          src="/Снимок экрана 2024-12-01 в 15.12.22.png" // Замените на нужный путь к изображению
          alt="Корпоративные программы"
          width={600}
          height={400}
          className="rounded-lg object-cover"
        />
  
  
        {/* Список аспектов сомнологии */}
        <div className="text-left mt-6">
          <h3 className="text-xl font-semibold text-black dark:text-white mb-4 sm:justify-center">
            Фундаментальные аспекты сомнологии:
          </h3>
          <ul className="list-disc list-inside text-neutral-700 dark:text-neutral-300">
            <li>Оценка сна и диагностика нарушений сна</li>
            <li>Инсомния и сердечно-сосудистые заболевания</li>
            <li>Нарушения дыхания во сне</li>
            <li>Гиперсомнии</li>
            <li>Двигательные расстройства во сне</li>
            <li>Парасомнии</li>
            <li>Расстройства цикла «сон — бодрствование»</li>
            <li>Организационные аспекты</li>
          </ul>
        </div>
      </div>
    );
};
  