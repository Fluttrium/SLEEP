'use client';

import { cn } from '../../lib/utils';
import React from 'react';

interface Props {
  className?: string;
}

const cats = [
  { id: 1, name: 'Нарушения сна' },
  { id: 2, name: 'Опрос' },
  { id: 3, name: 'Как работает' },
  { id: 4, name: 'Услуги' },
  { id: 5, name: 'Здоровый сон' },
  { id: 6, name: 'О нас' },
];

export const Categories: React.FC<Props> = ({ className }) => {
  return (
    
    <div className="relative">
      
      {/* Фоновое видео */}

      {/* Контейнер с категориями */}
      <div className={cn('inline-flex gap-1 bg-gray-50 bg-opacity-80 p-1 rounded-2xl', className)}>
        
        {cats.map(({ name, id }, index) => (
          <a
            className={cn(
              'flex items-center font-bold h-11 rounded-2xl px-5',
              // categoryActiveId === id && 'bg-white shadow-md shadow-gray-200 text-primary',
            )}
            href={`/#${name}`}
            key={index}
          >
            <button>{name}</button>
          
          </a>
          
        ))}
      </div>
    </div>
  );
};
