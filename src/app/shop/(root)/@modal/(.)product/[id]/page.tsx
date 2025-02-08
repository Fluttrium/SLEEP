import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { prisma } from "../../../../../../../prisma/prisma-client";
import { ChooseProductModal } from "../../../../../../../shared/components/shared";

async function fetchProduct(id: string) {
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
      items: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return product;
}

export default async function ProductModalPage({ params: { id } }: { params: { id: string } }) {
  const product = await fetchProduct(id);

  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <ChooseProductModal product={product} />
    </Suspense>
  );
}
