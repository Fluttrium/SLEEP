import { Category2, Ingredient, Product, ProductItem } from '@prisma/client';

export type ProductWithRelations = Product & {
    items: ProductItem[];
    ingredients: Ingredient[];
    category2?: Category2 | null; // Если поле может быть null, указываем это
    price: number;
  };
