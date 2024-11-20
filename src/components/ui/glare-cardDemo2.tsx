"use-client";
import { useState, useEffect } from "react";
import { GlareCard } from "../ui/glare-card";

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
          <GlareCard className="flex flex-col items-center justify-center">
            <img
              className="h-full w-full absolute inset-0 object-cover"
              src="IMAGE 2024-10-03 11:52:23.jpg"
            />
          </GlareCard>
        </div>
      )}
    </>
  );
}
