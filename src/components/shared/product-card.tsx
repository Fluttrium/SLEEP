import Link from 'next/link';
import React from 'react';


import { Plus } from 'lucide-react';
// import { Ingredient } from '@prisma/client';
import { Title } from './ui/title';
import { Button } from '../ui/button';

interface Props {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
//   ingredients: Ingredient[];
  className?: string;
}

export const ProductCard: React.FC<Props> = ({
  id,
  name,
  price,
  imageUrl,
//   ingredients,
  className,
}) => {
  // Функция для ограничения имени до двух слов
  const truncateName = (name: string) => {
    const words = name.split(' ');
    return words.length > 2 ? `${words.slice(0, 2).join(' ')}...` : name;
  };

  return (
    <div className={`${className} w-[200px] h-[300px]`}>
      <Link href={`/shop/product/${id}`}>
        <div className="flex justify-center p-4 bg-secondary rounded-lg h-[160px]">
          <img className="w-full h-full object-contain" src={imageUrl} alt={name} />
        </div>

        <Title text={truncateName(name)} size="sm" className="mb-1 mt-2 font-bold" /> {/* Применяем функцию для обрезки имени */}

        {/* Ингредиенты скрыты на мобильных устройствах */}
        {/* <div className="text-xs text-gray-400 hidden md:block">
          {ingredients.map((ingredient) => ingredient.name).join(', ')}
        </div> */}

        <div className="flex justify-between items-center mt-2">
          <span className="text-xs">
            <b>{price} ₽</b>
          </span>

          <Button variant="secondary" className="text-xs font-bold">
            <Plus size={16} className="mr-1" />
            <span className="hidden sm:inline">Добавить</span>
          </Button>
        </div>
      </Link>
    </div>
  );
};
