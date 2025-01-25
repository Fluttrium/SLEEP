
import { cn } from '@/lib/utils';
import { CircleCheck } from 'lucide-react';
import React from 'react';

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export const IngredientItem: React.FC<Props> = ({
  className,
  active,
  price,
  name,
  imageUrl,
  onClick,
}) => {
  return (
    <div
      className={cn(
        'flex items-center flex-col p-1 rounded-md text-center relative cursor-pointer shadow-md bg-white',
        'w-20 sm:w-24 md:w-28', // Уменьшены размеры контейнера
        { 'border border-primary': active },
        className,
      )}
      onClick={onClick}
    >
      {active && <CircleCheck className="absolute top-2 right-2 text-primary" />}
      <img
        width={70} // Уменьшен размер для мобильных устройств
        height={70}
        src={imageUrl}
        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover" // Адаптация изображения
        alt={name}
      />
      <span className="text-xs sm:text-sm mb-1">{name}</span>
      <span className="font-bold text-sm sm:text-base">{price} ₽</span>
    </div>
  );
};
