'use client';

import React from 'react';
import { Ingredient, ProductItem } from '@prisma/client';

import { PizzaImage } from './pizza-image';
import { Title } from './title';
import { Button } from '../ui';

import { IngredientItem } from './ingredient-item';
import { cn } from '@/lib/utils';

import { GroupVariants } from './group-variants';
import { getPizzaDetails } from '@/lib/get-pizza-details';
import { usePizzaOptions } from '@/hooks/use-pizza-options';
import { PizzaSize, PizzaType, pizzaTypes } from '@/constants/pizza';

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  loading?: boolean;
  onSubmit: (itemId: number, ingredients: number[]) => void;
  className?: string;
}

/**
 * Форма выбора ПИЦЦЫ
 */
export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  items,
  imageUrl,
  ingredients,
  loading,
  onSubmit,
  className,
}) => {
  const {
    size,
    type,
    selectedIngredients,
    availableSizes,
    currentItemId,
    setSize,
    setType,
    addIngredient,
  } = usePizzaOptions(items);

  const { totalPrice, textDetaills } = getPizzaDetails(
    type,
    size,
    items,
    ingredients,
    selectedIngredients,
  );

  const handleClickAdd = () => {
    if (currentItemId) {
      onSubmit(currentItemId, Array.from(selectedIngredients));
    }
  };

  return (
    <div className={cn(className, 'flex flex-col sm:flex-row')}>
      {/* Изображение Пиццы */}
      <div className="flex justify-center sm:w-[50%] w-full mb-5 sm:mb-0">
        <PizzaImage imageUrl={imageUrl} size={size} />
      </div>

      <div className="sm:w-[50%] bg-[#f7f6f5] p-7 flex flex-col h-[80vh] overflow-y-auto">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">{textDetaills}</p>

        {/* Выбор размера и типа пиццы */}
        <div className="flex flex-col gap-4 mt-5">
          <GroupVariants
            items={availableSizes}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />

          <GroupVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        {/* Выбор ингредиентов (сокрытие только на мобильных экранах) */}
        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-y-auto scrollbar mt-5 hidden sm:block">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                onClick={() => addIngredient(ingredient.id)}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>

        {/* Кнопка "Добавить в корзину" */}
        <Button
          loading={loading}
          onClick={handleClickAdd}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10 mb-5"
        >
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
