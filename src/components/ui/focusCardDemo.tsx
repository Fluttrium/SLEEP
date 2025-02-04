"use client";
import { motion } from "framer-motion";

export function FocusCardsDemo() {
  const cards = [
    {
      title: "Попробуйте узнать больше о себе! Пройдите наш тест и откройте свои скрытые возможности!",
      src: "/chto-takoe-sipap-terapiya.jpg", // Иконка Яндекса (замени при необходимости)
    },
  ];

  return (
    <div className="flex justify-center py-10 bg-neutral-50 dark:bg-neutral-900">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
          className="max-w-3xl w-full bg-white dark:bg-neutral-800 shadow-xl rounded-2xl overflow-hidden transition-transform flex flex-col items-center text-center"
        >
          <div className="relative w-full h-64 overflow-hidden rounded-t-2xl">
            <img
              src={card.src}
              alt="Focus Card"
              className="w-full h-full object-cover" // Заполняет всю карточку
            />
          </div>
          <div className="p-10">
            <h2 className="text-3xl font-semibold text-neutral-900 dark:text-white mb-6">
              {card.title}
            </h2>
            <button className="px-8 py-4 rounded-full text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg hover:opacity-90 transition">
              Пройти тест
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
