"use-client";
import { useState, useEffect } from "react";
import { GlareCard } from "../ui/glare-card";
import Link from "next/dist/client/link";

export function GlareCardDemo() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Функция для проверки ширины экрана
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // 768px - это порог между мобильным и планшетным/десктопным режимом
    };

    // Вызов функции при первой загрузке и при изменении размера окна
    handleResize();
    window.addEventListener("resize", handleResize);

    // Очистка слушателя при размонтировании компонента
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {/* Карточка, которая отображается на мобильных экранах */}
      {isMobile ? (
        <GlareCard className="flex flex-col items-center justify-center">
          <img
            className="h-full w-full absolute inset-0 object-cover"
            src="IMAGE 2024-10-03 11:52:23.jpg"
          />
        </GlareCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Карточки для планшетов и десктопов */}

<Link href="/doctors">
  <GlareCard className="flex flex-col items-center justify-center cursor-pointer">
    <svg
      width="66"
      height="65"
      viewBox="0 0 66 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-14 w-14 text-white"
    >
      <path
        d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
        stroke="currentColor"
        strokeWidth="15"
        strokeMiterlimit="3.86874"
        strokeLinecap="round"
      />
    </svg>
    <span className="mt-2 text-white text-lg font-semibold">
      Перейти
    </span>
  </GlareCard>
</Link>
          <GlareCard className="flex flex-col items-center justify-center">
            <img
              className="h-full w-full absolute inset-0 object-cover"
              src="IMAGE 2024-10-03 11:52:23.jpg"
            />
          </GlareCard>
          <GlareCard className="flex flex-col items-start justify-end py-8 px-6">
            <div className="font-bold text-white text-lg">
              Михаил Викторович Бочкарев
            </div>
            <div className="font-normal text-base text-neutral-200 mt-4">
              Врач - терапевт, врач функциональной диагностики, кандидат медицинских
              наук, сертифицирован по сомнологии Европейским обществом изучения сна
            </div>
          </GlareCard>
        </div>
      )}
    </>
  );
}
