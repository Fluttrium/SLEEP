import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { uploadFile } from "@/lib/storage/storageSet";

const prisma = new PrismaClient()

export async function GET() {
    try {
      // Получаем все товары с их ценами через связанные ProductItem
      const products = await prisma.product.findMany({
        include: {
          category: true,  // Включаем данные о категории
          items: true      // Включаем все элементы продукта, включая цену
        }
      })
      
      // Включаем цену в данные, чтобы она отобразилась
      const productsWithPrices = products.map(product => {
        return {
          ...product,
          price: product.items?.[0]?.price ?? 0,  // Если есть элемент, берем цену
        }
      })
  
      return NextResponse.json(productsWithPrices)
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: 'Ошибка при загрузке продуктов' },
        { status: 500 }
      )
    }
  }

  export async function POST(req: Request) {
    try {
      const formData = await req.formData();
      const name = formData.get("name") as string;
      const categoryId = formData.get("categoryId") as unknown as number;
      const imageFile = formData.get("imageFile");
      const price = formData.get("price") as string; // Получаем цену
  
      if (!categoryId) {
        return NextResponse.json(
          { error: "Нет id категории" },
          { status: 400 }
        );
      }
      if (!imageFile || !(imageFile instanceof Blob)) {
        return NextResponse.json(
          { message: "No file provided or invalid file type" },
          { status: 400 }
        );
      }
  
      const fileBuffer = Buffer.from(await imageFile.arrayBuffer());
      const key = `product/${Date.now()}_${imageFile.name}`;
      const imageUrl = await uploadFile({ key, file: fileBuffer });
  
      // Создаем продукт
      const product = await prisma.product.create({
        data: {
          name,
          imageUrl,
          categoryId: Number(categoryId)
        }
      });
  
      // Создаем элемент продукта (ProductItem) с ценой
      await prisma.productItem.create({
        data: {
          price: Number(price),
          productId: product.id,
        }
      });
  
      return NextResponse.json(product, { status: 201 });
    } catch (error: any) {
      return NextResponse.json(
        { error: 'Ошибка при создании продукта' },
        { status: 500 }
      );
    }
  }

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json()

        await prisma.productItem.deleteMany({
            where: {
                productId: id
            }
        });
        await prisma.product.delete({
            where: { id: Number(id) }
        })

        return NextResponse.json(
            { message: 'Продукт удален' },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { error: 'Ошибка при удалении продукта' },
            { status: 500 }
        )
    }
}
