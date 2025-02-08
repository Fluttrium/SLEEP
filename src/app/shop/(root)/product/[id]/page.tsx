import { Suspense } from 'react';
import { notFound } from 'next/navigation';

import { Container, ProductForm } from "../../../../../../shared/components/shared";
import { prisma } from '../../../../../../prisma/prisma-client';

async function fetchProduct(id: string) {
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
      category: {
        include: {
          products: {
            include: {
              items: true,
            },
          },
        },
      },
      items: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return product;
}
