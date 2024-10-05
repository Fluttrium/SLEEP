"use client";
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import createGlobe from "cobe";
import { motion } from "framer-motion";
import { IconBrandYoutubeFilled } from "@tabler/icons-react";
import Link from "next/link";

export function FeaturesSectionDemo() {
  const features = [
    {
      title: "Для Врачей и клиник",
      description:
        "Напишите нам, если вы хотите привлекать больше пациентов с нарушениями сна",
      skeleton: <SkeletonOne />,
      className:
        "col-span-1 lg:col-span-4 border-b lg:border-r dark:border-neutral-800",
    },
    {
      title: "Для пациентов",
      description: (
        <>
          <ul>
            <li>
              <Link href="/diagnostics" className="text-blue-500 hover:underline">
                Диагностика
              </Link>
              <ImageGallery images={["/budkovaya_3.png", "/budkovaya_3.png", "/budkovaya_3.png"]} />
            </li>
            <li>
              <Link href="/consultations" className="text-blue-500 hover:underline">
                Консультации
              </Link>
              <ImageGallery images={["/thumb_1534_437_437_0_0_crop.png", "/thumb_1534_437_437_0_0_crop.png", "/thumb_1534_437_437_0_0_crop.png"]} />
            </li>
            <li>
              <Link href="/treatment" className="text-blue-500 hover:underline">
                Лечение
              </Link>
              <ImageGallery images={["/chto-takoe-sipap-terapiya.jpg", "/chto-takoe-sipap-terapiya.jpg", "/chto-takoe-sipap-terapiya.jpg"]} />
            </li>
          </ul>
        </>
      ),
      skeleton: <SkeletonTwo />,
      className: "border-b col-span-1 lg:col-span-2 dark:border-neutral-800",
    },
    {
      title: "Смотрите наше видео на YouTube",
      description:
        "Наши врачи-сомнологи объяснят, как мы помогаем пациентам улучшить качество жизни, начиная с первых симптомов и до полного выздоровления",
      skeleton: <SkeletonThree />,
      className:
        "col-span-1 lg:col-span-3 lg:border-r dark:border-neutral-800",
    },
    {
      title: "Качество сна важно. Но большинство нарушений остаются без диагноза",
      description:
        "80% случаев синдрома апноэ во сне не диагностируются вовремя. Узнайте, как вы можете предотвратить это",
      skeleton: <SkeletonFour />,
      className: "col-span-1 lg:col-span-3 border-b lg:border-none",
    },
  ];

  return (
    <div className="relative z-20 py-10 lg:py-40 max-w-7xl mx-auto">
      <div className="px-8">
        <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white">
          Наши услуги
        </h4>
        <p className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
          Мы собрали все необходимые консультации, методы диагностики и эффективного лечения нарушений сна
        </p>
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

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className="max-w-5xl mx-auto text-left tracking-tight text-black dark:text-white text-xl md:text-2xl md:leading-snug">
      {children}
    </p>
  );
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p
      className={cn(
        "text-sm md:text-base max-w-4xl text-left mx-auto",
        "text-neutral-500 text-center font-normal dark:text-neutral-300",
        "text-left max-w-sm mx-0 md:text-sm my-2"
      )}
    >
      {children}
    </p>
  );
};

// Компонент для отображения галереи изображений
const ImageGallery = ({ images }: { images: string[] }) => {
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
      <div className="absolute bottom-0 z-40 inset-x-0 h-60 bg-gradient-to-t from-white dark:from-black via-white dark:via-black to-transparent w-full pointer-events-none" />
      <div className="absolute top-0 z-40 inset-x-0 h-60 bg-gradient-to-b from-white dark:from-black via-transparent to-transparent w-full pointer-events-none" />
    </div>
  );
};

export const SkeletonTwo = () => {
  return (
    <div className="relative flex flex-col items-start p-8 gap-10 h-full overflow-hidden">
      {/* TODO: Add custom content for SkeletonTwo */}
    </div>
  );
};

export const SkeletonThree = () => {
  return (
    <Link
      href="https://www.youtube.com/watch?v=RPa3_AD1_Vs"
      target="__blank"
      className="relative flex gap-10 h-full group/image"
    >
      <div className="w-full mx-auto bg-transparent dark:bg-transparent group h-full">
        <div className="flex flex-1 w-full h-full flex-col space-y-2 relative">
          <IconBrandYoutubeFilled className="h-20 w-20 absolute z-10 inset-0 text-red-500 m-auto" />
          <Image
            src="/IMAGE 2024-10-03 11:52:23.jpg"
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
    const canvasRef = useRef<HTMLCanvasElement>(null);
  
    useEffect(() => {
      let phi = 0;
      let animationFrameId: number;
  
      if (!canvasRef.current) return;
  
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
  
      const drawCross = () => {
        if (!ctx) return;
  
        // Очищаем холст
        ctx.clearRect(0, 0, canvas.width, canvas.height);
  
        // Настройки креста (увеличены в три раза)
        const crossSize = 150; // Увеличен до 150
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
  
        // Сохраняем состояние перед вращением
        ctx.save();
  
        // Перемещаем точку вращения в центр холста
        ctx.translate(centerX, centerY);
  
        // Вращаем крест
        ctx.rotate(phi);
  
        // Рисуем крест
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(-crossSize / 2, -crossSize * 2, crossSize, crossSize * 4); // Вертикальная часть
        ctx.fillRect(-crossSize * 2, -crossSize / 2, crossSize * 4, crossSize); // Горизонтальная часть
  
        // Восстанавливаем исходное состояние
        ctx.restore();
      };
  
      const animate = () => {
        phi += 0.02; // Скорость вращения
        drawCross();
        animationFrameId = requestAnimationFrame(animate);
      };
  
      // Устанавливаем размеры холста
      canvas.width = 600;
      canvas.height = 600;
  
      animate();
  
      return () => {
        // Очищаем анимацию при демонтировании компонента
        cancelAnimationFrame(animationFrameId);
      };
    }, []);
  
    return (
      <canvas ref={canvasRef} className={className} />
    );
  };