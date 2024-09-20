'use client';

import React from 'react';
import { useIntersection } from 'react-use';

import { Title } from './title';


// import { useCategoryStore } from '@/shared/store';
// import { ProductWithRelations } from '@/@types/prisma';
import { cn } from '@/lib/utils';
import { NewsCard } from './news-card';

interface Props {
  title: string;
  items: any[];
//   items: ProductWithRelations[];
  categoryId: number;
  className?: string;
  listClassName?: string;
}

export const NewsGroupList: React.FC<Props> = ({
  title,
  items,
  listClassName,
  categoryId,
  className,
}) => {
//   const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
//   const intersectionRef = React.useRef(null);
//   const intersection = useIntersection(intersectionRef, {
//     threshold: 0.4,
//   });

//   React.useEffect(() => {
//     if (intersection?.isIntersecting) {
//       setActiveCategoryId(categoryId);
//     }
//   }, [categoryId, intersection?.isIntersecting, title]);

  return (
    <div className={className}> 
     {/* <div className={className} id={title} ref={intersectionRef}> */}
      <Title text={title} size="lg" className="font-extrabold mb-5" />

      <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
        {items.map((product, i) => (
          <NewsCard
            key={product.id}
            id={product.id}
            title={product.title}
            imageUrl={product.imageUrl}
            body={product.items && product.items.length > 0 ? product.items[0].body : "Описание отсутствует"}
            //  tags={product.ingredients}
          />
        ))}
      </div>
    </div>
  );
};
