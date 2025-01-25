import React from 'react';
import { Title } from './title';
import { Button } from '../ui';
import { cn } from '@/lib/utils';

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  loading?: boolean;
  onSubmit?: VoidFunction;
  className?: string;
}

/**
 * Форма выбора ПРОДУКТА
 */
export const ChooseProductForm: React.FC<Props> = ({
  name,
  imageUrl,
  price,
  onSubmit,
  className,
  loading,
}) => {
  return (
    <div className={cn(className, 'flex flex-col sm:flex-row')}>
      <div className="flex justify-center sm:w-[40%] w-full mb-5 sm:mb-0">
        <img
          src={imageUrl}
          alt={name}
          className="transition-all duration-300 w-full h-auto max-w-[350px] max-h-[350px]"
        />
      </div>

      <div className="sm:w-[60%] w-full bg-[#f7f6f5] p-6 sm:p-8">
        <Title text={name} size="lg" className="font-extrabold mb-2" />

        <Button
          loading={loading}
          onClick={() => onSubmit?.()}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-6 sm:mt-8"
        >
          Добавить в корзину за {price} ₽
        </Button>
      </div>
    </div>
  );
};
