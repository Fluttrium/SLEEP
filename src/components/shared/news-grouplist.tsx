'use client';

import React from 'react';
import { useIntersection } from 'react-use';

import { Title } from './ui/title';
// import { useCategoryStore } from '@/shared/store';
// import { ProductWithRelations } from '@/@types/prisma';
import { cn } from '@/lib/utils';
import { NewsCard } from './news-card';

interface Props {
  title: string;
  items: any[];
  // items: ProductWithRelations[];
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
  // const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  // const intersectionRef = React.useRef(null);
  // const intersection = useIntersection(intersectionRef, {
  //   threshold: 0.4,
  // });

  // React.useEffect(() => {
  //   if (intersection?.isIntersecting) {
  //     setActiveCategoryId(categoryId);
  //   }
  // }, [categoryId, intersection?.isIntersecting, title]);

  return (
    <div className={className}> 
      {/* <div className={className} id={title} ref={intersectionRef}> */}
      <h4 className="text-4xl sm:text-5xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white py-4">
  {title}
</h4>
      <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8', listClassName)}>
        {items.map((product, i) => (
          <NewsCard
            key={product.id}
            id={product.id}
            title={product.title}
            imageUrl={product.imageUrl}
            body={product.items && product.items.length > 0 ? product.items[0].body : ""}
            // tags={product.ingredients}
          />
        ))}
      </div>
    </div>
  );
};
