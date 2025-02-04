"use client";
import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  IconBrandYoutubeFilled,
  IconStethoscope,
  IconHeartbeat,
  IconMicroscope,
  IconUser,
  IconBuildingHospital,
  IconBed,
  IconPill,
  IconBrain,
  IconClock,
  IconAlertCircle,
} from "@tabler/icons-react";
import Link from "next/link";

export function FeaturesSectionDemo() {
  const features = [
    {
      title: "Для пациентов",
      description: (
        <>
          <div className="mt-4">
            Мы собрали все необходимые консультации, методы диагностики и эффективного лечения нарушений сна.
          </div>
          <div className="mt-6 space-y-4">
            <FeatureWidget
              icon={<IconStethoscope className="w-12 h-12 text-blue-500" />}
              title="Лечение"
              link="/articles"
              description="Эффективные методы лечения нарушений сна"
            />
            <FeatureWidget
              icon={<IconHeartbeat className="w-12 h-12 text-red-500" />}
              title="Консультации"
              link="/doctors"
              description="Консультации с ведущими сомнологами"
            />
            <FeatureWidget
              icon={<IconMicroscope className="w-12 h-12 text-green-500" />}
              title="Диагностика"
              link="https://telegra.ph/Polisomnografiya-07-27"
              description="Точная диагностика нарушений сна"
            />
          </div>
        </>
      ),
      icon: <IconBed className="w-20 h-20 text-blue-500" />,
    },
    {
      title: "Для Врачей и клиник",
      description: (
        <>
          <div className="mt-4 text-neutral-600 dark:text-neutral-400">
            Напишите нам, если вы хотите привлекать больше пациентов с нарушениями сна.
          </div>
          <div className="mt-6 flex flex-col items-center gap-4">
            <IconBuildingHospital className="w-12 h-12 text-blue-500" />
            <Link
              href="/for-doctors"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Написать нам
            </Link>
          </div>
          <div className="mt-8 text-center">
            <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
              Смотрите наше видео на YouTube
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
              Наши врачи-сомнологи объяснят, как мы помогаем пациентам улучшить качество жизни.
            </p>
            <Link
              href="https://www.youtube.com/watch?v=RPa3_AD1_Vs"
              target="_blank"
              className="flex items-center gap-2 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <IconBrandYoutubeFilled className="w-6 h-6" />
              <span>Смотреть видео</span>
            </Link>
          </div>
        </>
      ),
      icon: <IconBuildingHospital className="w-20 h-20 text-blue-500" />,
    },
    {
      title: "Качество сна важно",
      description: (
        <>
          <div className="mt-4 text-neutral-600 dark:text-neutral-400">
            80% случаев синдрома апноэ во сне не диагностируются вовремя. Узнайте, как вы можете предотвратить это.
          </div>
          <div className="mt-6 flex flex-col items-center gap-4">
            <IconAlertCircle className="w-20 h-20 text-yellow-500" />
            <div className="text-center">
              <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                Почему это важно?
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Недиагностированные нарушения сна могут привести к серьезным проблемам со здоровьем.
              </p>
            </div>
            <Link
              href="/sleep-disorders"
              className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Узнать больше
            </Link>
          </div>
        </>
      ),
      icon: <IconAlertCircle className="w-20 h-20 text-yellow-500" />,
    },
  ];

  return (
    <div className="w-screen relative">
        <div className='absolute right-0 top-0 rotate-180 -z-50'>
            
            <Image src="/hero1.svg" alt="Icon" width={300} height={300} style={{height: '100%'}}/>
        </div>
      <div className="relative z-20 py-2 lg:max-w-7xl mx-auto">
        <div className="px-8 text-center">
        <h4 className="text-4xl lg:text-6xl font-bold tracking-tight text-center text-black dark:text-white leading-tight">
  Наши <span className="text-blue-500">услуги</span>
</h4>
        </div>
        <div className="relative mt-12">
          {/* Полукруг сверху */}
          <div className="relative overflow-hidden before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-[150%] before:h-[50px] before:bg-neutral-200 dark:before:bg-neutral-800 before:rounded-t-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xl:border rounded-md dark:border-neutral-800 p-6 bg-white dark:bg-neutral-900 shadow-md">
              {features.map((feature, index) => (
                <FeatureCard key={index}>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureDescription>{feature.description}</FeatureDescription>
                  {feature.icon && <div className="flex justify-center mt-6">{feature.icon}</div>}
                </FeatureCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const FeatureCard = ({ children }: { children?: React.ReactNode }) => {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="p-6 sm:p-8 relative overflow-hidden bg-white dark:bg-neutral-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex flex-col justify-between h-full"
      >
        {children}
      </motion.div>
    );
  };

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <h3 className="text-xl md:text-2xl font-semibold text-black dark:text-white text-center mb-4">
      {children}
    </h3>
  );
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="text-sm md:text-base text-neutral-600 dark:text-neutral-300 text-center max-w-md mx-auto">
      {children}
    </div>
  );
};

const FeatureWidget = ({
  icon,
  title,
  link,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  link: string;
  description: string;
}) => {
  return (
    <Link href={link} className="block group">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-4 p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="flex-shrink-0">{icon}</div>
        <div>
          <h3 className="text-lg font-semibold text-black dark:text-white">
            {title}
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {description}
          </p>
        </div>
      </motion.div>
    </Link>
  );
};