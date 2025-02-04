import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Timeline } from "@/components/ui/timeline";
import { Title } from "@/components/shared/ui/title";
import Link from "next/link";
import { motion } from "framer-motion";

export function TimelineDemo() {
    const [deftest, setDeftest] = useState('');

    useEffect(() => {
        const fetchDeftest = async () => {
            try {
                const response = await fetch('/api/test/deftest');
                const data = await response.json();
                setDeftest(typeof data === 'string' ? (data.startsWith('/') ? data : `/${data}`) : '/');
            } catch (error) {
                console.error("Ошибка при загрузке дефолтного теста:", error);
                setDeftest('/');
            }
        };

        fetchDeftest();
    }, []);

    const data = [
        {
            title: "1 Этап",
            content: (
                <motion.div 
                    whileHover={{ scale: 1.05 }} 
                    transition={{ duration: 0.3 }} 
                    className="bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-md transition-transform"
                >
                    <Title text="Онлайн-проверка" size="2xl" className="text-neutral-900 dark:text-neutral-100 mb-2 font-bold" />
                    <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-6">
                        ✅ Потратьте 3 минуты, чтобы оценить свой профиль риска
                    </p>
                    <Link href={deftest || '/'}>
                        <button className="relative px-6 py-3 rounded-full text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg hover:opacity-90 transition">
                            Пройти тест
                        </button>
                    </Link>
                </motion.div>
            ),
        },
        {
            title: "2 Этап",
            content: (
                <motion.div 
                    whileHover={{ scale: 1.05 }} 
                    transition={{ duration: 0.3 }} 
                    className="bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-md transition-transform"
                >
                    <Title text="Получаете результаты" size="2xl" className="text-neutral-900 dark:text-neutral-100 mb-2 font-bold" />
                    <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-6">
                        ✅ Получаете вероятные результаты сна
                    </p>
                </motion.div>
            ),
        },
        {
            title: "3 Этап",
            content: (
                <motion.div 
                    whileHover={{ scale: 1.05 }} 
                    transition={{ duration: 0.3 }} 
                    className="bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-md transition-transform"
                >
                    <Title text="Диагностика" size="2xl" className="text-neutral-900 dark:text-neutral-100 mb-2 font-bold" />
                    <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-6">
                        ✅ Записываетесь на диагностику, консультации
                    </p>
                </motion.div>
            ),
        },
        {
            title: "4 Этап",
            content: (
                <motion.div 
                    whileHover={{ scale: 1.05 }} 
                    transition={{ duration: 0.3 }} 
                    className="bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-md transition-transform"
                >
                    <Title text="Прием у врача или онлайн" size="2xl" className="text-neutral-900 dark:text-neutral-100 mb-2 font-bold" />
                    <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-4">
                        ✅ Наша команда приедет к вам домой и поможет установить небольшое устройство для записи сна
                    </p>
                    <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-4">
                        ✅ Ваш врач сообщит результаты обследования и предложит лечение
                    </p>
                    <p className="text-lg text-neutral-700 dark:text-neutral-300">
                        ✅ Пожизненное сопровождение
                    </p>
                </motion.div>
            ),
        },
    ];

    return (
        <div className="w-full py-10 bg-neutral-50 dark:bg-neutral-800">
            <Timeline data={data} />
        </div>
    );
}
