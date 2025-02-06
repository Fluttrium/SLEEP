import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const productItems = await prisma.productItem.findMany({
          include: { product: true },
        });
        res.status(200).json(productItems);
      } catch (error) {
        res.status(500).json({ error: 'Ошибка при загрузке элементов продукта' });
      }
      break;

    case 'POST':
      try {
        const { price, size, pizzaType, productId } = req.body;
        const productItem = await prisma.productItem.create({
          data: { price, size, pizzaType, productId },
        });
        res.status(201).json(productItem);
      } catch (error) {
        res.status(500).json({ error: 'Ошибка при создании элемента продукта' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}