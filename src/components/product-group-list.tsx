'use client';

import React from 'react';
import { useIntersection } from 'react-use';

import { Title } from './title';

import { ProductCard } from './shared/product-card';
import { cn } from '@/lib/utils';
import { useCategoryStore } from '@/lib/store/category';
import { ProductWithRelations } from '../../@types/prisma';

interface Props {
  title: string;
items: ProductWithRelations[];
  categoryId: number;
  className?: string;
  listClassName?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
  title,
items,
  listClassName,
  categoryId,
  className,
}) => {
const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
    setActiveCategoryId(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting, title]);

  return (
    <div className={className} id={title} ref={intersectionRef}>
      
      <Title text={title} size="lg" className="font-extrabold mb-5" />

      {/* Сетка продуктов: flexbox для мобильных устройств и grid для десктопов */}
      <div
        className={cn(
          'grid grid-cols-3 gap-[50px] md:grid',
          'overflow-x-auto flex md:grid md:gap-[50px]', // Flexbox для мобильных экранов
          listClassName
        )}
        style={{ scrollSnapType: 'x mandatory' }} // Для плавного скроллинга на мобильных
      >
        {items.map((product) => (
          <div key={product.id} style={{ scrollSnapAlign: 'start' }}>
            <ProductCard
              id={product.id}
              name={product.name}
              imageUrl={product.imageUrl}
              price={product.items[0].price}
            //   ingredients={product.ingredients}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
