import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { Container, ProductForm } from '../../../../../../shared/components/shared';
import { prisma } from '../../../../../../prisma/prisma-client';

async function fetchProduct(id: string) {
  const productId = parseInt(id, 10);

  if (isNaN(productId)) {
    return null; // Вернем null вместо notFound()
  }

  const product = await prisma.product.findFirst({
    where: { id: productId },
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

  return product;
}

// Компонент страницы
export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await fetchProduct(params.id);

  if (!product) {
    return notFound(); // Если продукт не найден, вызываем 404
  }

  return (
      <Container>
        <h1>{product.name}</h1>
        <ProductForm product={product} />
      </Container>
  );
}
