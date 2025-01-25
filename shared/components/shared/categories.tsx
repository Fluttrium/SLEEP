'use client';

import { useCategoryStore } from '@/lib/store/category';
import { cn } from '@/lib/utils';

import { Category } from '@prisma/client';
import React from 'react';

interface Props {
  items: Category[];
  className?: string;
}

export const Categories: React.FC<Props> = ({ items, className }) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId);

  return (
    <div
      className={cn(
        'grid grid-cols-2 gap-2 bg-gray-50 p-2 rounded-2xl sm:flex sm:gap-1',
        className
      )}
    >
      {items.map(({ name, id }, index) => (
        <a
          className={cn(
            'flex items-center justify-center font-bold h-10 rounded-2xl px-4 text-center transition-colors',
            categoryActiveId === id
              ? 'bg-white shadow-md shadow-gray-200 text-primary'
              : 'hover:bg-gray-100 text-gray-700'
          )}
          href={`/#${name}`}
          key={index}
        >
          <button className="truncate">{name}</button>
        </a>
      ))}
    </div>
  );
};
