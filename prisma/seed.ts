import { Prisma } from '@prisma/client';

import { prisma } from './prisma-client';
import { hashSync } from 'bcrypt';
import { _ingredients, categories, products } from './constants';

const randomDecimalNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = ({
  productId,
  pizzaType,
  size,
}: {
  productId: number;
  pizzaType?: 1 | 2;
  size?: 20 | 30 | 40;
}) => {
  return {
    productId,
    price: randomDecimalNumber(190, 600),
    pizzaType,
    size,
  } as Prisma.ProductItemUncheckedCreateInput;
};

async function up() {
  
  await prisma.category2.createMany({
    data: categories,
  });

  await prisma.ingredient.createMany({
    data: _ingredients,
  });

  await prisma.product.createMany({
    data: products,
  });

  const pizza1 = await prisma.product.create({
    data: {
      name: 'СИПАП-аппарат AirSense S10 AutoSet, ResMed',
      imageUrl:
        'https://kislorod.ru/upload/iblock/84d/resmed_airsense_10.jpg',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(0, 5),
      },
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: 'СИПАП-аппарат AirSense S11 AutoSet, ResMed',
      imageUrl:
        'https://cdn1.ozone.ru/s3/multimedia-b/c600/6768907571.jpg',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(0, 5),
      },
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      name: 'Портативный СИПАП-аппарат AirMini, ResMed',
      imageUrl:
        'https://ae04.alicdn.com/kf/S1966eebc92c84af09836cdefe3da2b81Z.jpg',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(0, 5),
      },
    },
  });

  const pizza4 = await prisma.product.create({
    data: {
      name: 'СИПАП-аппарат iBreeze 20A, Resvent',
      imageUrl:
        'https://static.insales-cdn.com/images/products/1/4473/947523961/6500377014.jpg',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(0, 5),
      },
    },
  });

  const pizza5 = await prisma.product.create({
    data: {
      name: 'Портативный СИПАП-аппарат M1 Mini, BMC',
      imageUrl:
        'https://img.medicalexpo.ru/images_me/photo-mg/67875-16496241.jpg',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(0, 5),
      },
    },
  });

  const pizza6 = await prisma.product.create({
    data: {
      name: 'CPAP Аппарат ResVent RXiBreeze 20A Plus с аккумулятором',
      imageUrl:
        'https://mfhc.ru/upload/resize_cache/webp/iblock/d31/6351uq7j7frah9p0ftklofbm2qivv6t8.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(0, 5),
      },
    },
  });

  const pizza7 = await prisma.product.create({
    data: {
      name: 'СИПАП-аппарат Prisma 20A, Loewenstein Medical (Weinmann)',
      imageUrl:
        'https://сипап.рф/wordpress/wp-content/uploads/2016/01/PRISMA-20a.jpg',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(0, 5),
      },
    },
  });

  const pizza8 = await prisma.product.create({
    data: {
      name: 'БИПАП-аппарат Lumis 100 ST, ResMed',
      imageUrl:
        'https://cpimg.tistatic.com/09106882/b/4/Resmed-lumis-150-Bipap.jpg',
      categoryId: 2,
      ingredients: {
        connect: _ingredients.slice(0, 5),
      },
    },
  });

  const pizza9 = await prisma.product.create({
    data: {
      name: 'БИПАП-аппарат iBreeze TECH (НИВЛ), Resvent',
      imageUrl:
        'https://mfhc.ru/upload/iblock/bf5/bf5980c9d41c570a93ef711e519a4b4e.jpg',
      categoryId: 2,
      ingredients: {
        connect: _ingredients.slice(0, 5),
      },
    },
  });
  
  await prisma.productItem.createMany({
    data: [
      // Пицца "Пепперони фреш"
      generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 40 }),

      // Пицца "Сырная"
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 40 }),

      // Пицца "Чоризо фреш"
      generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 40 }),

      generateProductItem({ productId: pizza4.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza4.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza4.id, pizzaType: 2, size: 40 }),

      generateProductItem({ productId: pizza5.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza5.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza5.id, pizzaType: 2, size: 40 }),

      generateProductItem({ productId: pizza6.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza6.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza6.id, pizzaType: 2, size: 40 }),

      generateProductItem({ productId: pizza7.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza7.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza7.id, pizzaType: 2, size: 40 }),

      generateProductItem({ productId: pizza8.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza8.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza8.id, pizzaType: 2, size: 40 }),

      generateProductItem({ productId: pizza9.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza9.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza9.id, pizzaType: 2, size: 40 }),


      // generateProductItem({ productId: pizza16.id, pizzaType: 1, size: 20 }),
      // generateProductItem({ productId: pizza16.id, pizzaType: 2, size: 30 }),
      // generateProductItem({ productId: pizza16.id, pizzaType: 2, size: 40 }),

      // generateProductItem({ productId: pizza17.id, pizzaType: 1, size: 20 }),
      // generateProductItem({ productId: pizza17.id, pizzaType: 2, size: 30 }),
      // generateProductItem({ productId: pizza17.id, pizzaType: 2, size: 40 }),
      
      // Остальные продукты
      generateProductItem({ productId: 1 }),
      generateProductItem({ productId: 2 }),
      generateProductItem({ productId: 3 }),
      generateProductItem({ productId: 4 }),
      generateProductItem({ productId: 5 }),
      generateProductItem({ productId: 6 }),
      generateProductItem({ productId: 7 }),
      generateProductItem({ productId: 8 }),
      generateProductItem({ productId: 9 }),
      generateProductItem({ productId: 10 }),
      generateProductItem({ productId: 11 }),
      generateProductItem({ productId: 12 }),
      generateProductItem({ productId: 13 }),
      generateProductItem({ productId: 14 }),
      generateProductItem({ productId: 15 }),
      generateProductItem({ productId: 16 }),
      generateProductItem({ productId: 17 }),
    ],
  });

  await prisma.cartItem.create({
    data: {
      productItemId: 1,
      cartId: 1,
      quantity: 2,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }, ],
      },
    },
  });

  await prisma.story.createMany({
    data: [
      {
        previewImageUrl:
          'https://www.resmed.market/upload/resize_cache/iblock/0f9/640_480_0/0f978cde742c546230a82344279a60e1.jpg',
      },
      {
        previewImageUrl:
          'https://www.resmed.market/upload/resize_cache/iblock/0f9/640_480_0/0f978cde742c546230a82344279a60e1.jpg',
      },
      {
        previewImageUrl:
          'https://www.resmed.market/upload/resize_cache/iblock/0f9/640_480_0/0f978cde742c546230a82344279a60e1.jpg',
      },
      {
        previewImageUrl:
          'https://www.resmed.market/upload/resize_cache/iblock/0f9/640_480_0/0f978cde742c546230a82344279a60e1.jpg',
      },
      {
        previewImageUrl:
          'https://www.resmed.market/upload/resize_cache/iblock/0f9/640_480_0/0f978cde742c546230a82344279a60e1.jpg',
      },
      {
        previewImageUrl:
          'https://www.resmed.market/upload/resize_cache/iblock/0f9/640_480_0/0f978cde742c546230a82344279a60e1.jpg',
      },
    ],
  });

  await prisma.storyItem.createMany({
    data: [
      {
        storyId: 1,
        sourceUrl:
          'https://www.resmed.market/upload/resize_cache/iblock/0f9/640_480_0/0f978cde742c546230a82344279a60e1.jpg',
      },
      {
        storyId: 1,
        sourceUrl:
          'https://www.resmed.market/upload/resize_cache/iblock/0f9/640_480_0/0f978cde742c546230a82344279a60e1.jpg',
      },
      {
        storyId: 1,
        sourceUrl:
          'https://www.resmed.market/upload/resize_cache/iblock/0f9/640_480_0/0f978cde742c546230a82344279a60e1.jpg',
      },
      {
        storyId: 1,
        sourceUrl:
          'https://www.resmed.market/upload/resize_cache/iblock/0f9/640_480_0/0f978cde742c546230a82344279a60e1.jpg',
      },
      {
        storyId: 1,
        sourceUrl:
          'https://www.resmed.market/upload/resize_cache/iblock/0f9/640_480_0/0f978cde742c546230a82344279a60e1.jpg',
      },
    ],
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Story" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "StoryItem" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
