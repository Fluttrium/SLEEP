"use client";
import {cn} from '@/lib/utils';
import React, {useEffect, useState} from 'react';
import {Categories} from './categories';
import {motion, useAnimation} from 'framer-motion';

interface Props {
    className?: string;
}

export const TopBar: React.FC<Props> = ({className}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false); // Изначально false, так как window может быть недоступен

    useEffect(() => {
        // Проверяем, что мы находимся на клиенте
        if (typeof window !== 'undefined') {
            // Устанавливаем начальное значение для isMobile
            setIsMobile(window.innerWidth < 768);

            const handleResize = () => {
                setIsMobile(window.innerWidth < 768);
            };

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 60) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const controls = useAnimation();

    useEffect(() => {
        if (isVisible) {
            controls.start({scaleY: 1, transition: {duration: 0.9}});
        } else {
            controls.start({scaleY: 0, transition: {duration: 0.5}});
        }
    }, [isVisible, controls]);

    // Если мобильное устройство, скрываем TopBar
    if (isMobile) return null;

    return (
        <motion.div
            className={cn('fixed top-0 pt-5 flex items-center justify-center shadow-black/5 z-50', className)} // Увеличен z-index до 50
            initial={{scaleY: 0}}
            animate={controls}
            style={{transformOrigin: 'top'}} // Задаем точку опоры для анимации
        >
            {isVisible && <Categories/>}
        </motion.div>
    );
};