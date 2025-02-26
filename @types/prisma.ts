import { Category2, Ingredient, Product, ProductItem } from '@prisma/client';

export type ProductWithRelations = Product & {
    items: ProductItem[];
    ingredients: Ingredient[];
    category2?: Category2 | null;
    price?: number; // Сделать price необязательным

  };  
