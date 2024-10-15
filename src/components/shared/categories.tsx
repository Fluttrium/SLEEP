'use client';

import { useStore } from '@/app/(main)/store/mainPageStore';
import { cn } from '@/lib/utils';
import React, { useEffect } from 'react';

interface Props {
  className?: string;
}

const cats = [
  { id: 1, name: 'Тест' },
  { id: 2, name: 'Услуги' },
  { id: 3, name: 'Нарушение сна' },
  { id: 4, name: 'Статьи' },
  { id: 5, name: 'Как мы можем помочь вам' },
  { id: 6, name: 'Команда' }

];

export const Categories: React.FC<Props> = ({ className }) => {
  const { activeId, setActiveId } = useStore(); // Получаем состояние из Zustand

  const scrollToSection = (id: number) => {
    const category = cats.find(cat => cat.id === id);
    if (category && category.name) {
      const section = document.getElementById(category.name);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        setActiveId(id); // Устанавливаем активный элемент
      }
    }
  };

  const handleScroll = () => {
    const sections = cats.map(cat => document.getElementById(cat.name));
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    sections.forEach((section, index) => {
      if (section) {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveId(cats[index].id); // Обновляем активный элемент при скролле
        }
      }
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative">
      <div className={cn('inline-flex gap-1 bg-secondary p-1 rounded-2xl', className)}>
        {cats.map(({ name, id }) => (
          <a
            className={cn(
              'flex items-center font-bold h-11 rounded-2xl px-5 cursor-pointer',
              activeId === id ? 'bg-white shadow-md shadow-gray-200 text-primary' : 'bg-transparent'
            )}
            onClick={() => scrollToSection(id)} // Используем scrollToSection
            key={id}
          >
            <button>{name}</button>
          </a>
        ))}
      </div>
    </div>
  );
};
