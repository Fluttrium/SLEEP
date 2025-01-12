import { prisma } from "../../prisma/prisma-client";

export interface GetSearchParams {
  query?: string;
  sortBy?: string;
  sizes?: string;
  pizzaTypes?: string;
  ingredients?: string;
  priceFrom?: string;
  priceTo?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

export const findPizzas = async (params: GetSearchParams) => {
  // Преобразование параметров поиска в массивы чисел
  const sizes = params.sizes?.split(",").map(Number);
  const pizzaTypes = params.pizzaTypes?.split(",").map(Number);
  const ingredientsIdArr = params.ingredients?.split(",").map(Number);

  // Установка минимальной и максимальной цены
  const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
  const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;

  // Поиск категорий с продуктами по заданным параметрам
  const categories = await prisma.category2.findMany({
    include: {
      products: {
        orderBy: { id: "desc" },
        where: {
          // Фильтрация по ингредиентам
          ingredients: ingredientsIdArr
            ? {
                some: { id: { in: ingredientsIdArr } },
              }
            : undefined,
          // Фильтрация по характеристикам продуктов
          items: {
            some: {
              size: sizes ? { in: sizes } : undefined,
              pizzaType: pizzaTypes ? { in: pizzaTypes } : undefined,
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
          },
        },
        include: {
          ingredients: true,
          items: {
            where: {
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
            orderBy: {
              price: "asc",
            },
          },
        },
      },
    },
  });

  return categories;
};
