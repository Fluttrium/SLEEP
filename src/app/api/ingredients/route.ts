import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { uploadFile } from "@/lib/storage/storageSet"; // Импорт функции загрузки файлов

const prisma = new PrismaClient();

export async function GET() {
  try {
    const ingredients = await prisma.ingredient.findMany();
    return NextResponse.json(ingredients);
  } catch (error) {
    console.error("Ошибка при загрузке ингредиентов:", error);
    return NextResponse.json({ error: 'Ошибка при загрузке ингредиентов' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const price = formData.get("price") as string;
    const imageFile = formData.get("imageFile");

    if (!name || !price || !imageFile || !(imageFile instanceof Blob)) {
      return NextResponse.json(
        { error: "Все поля (name, price, imageFile) обязательны" },
        { status: 400 }
      );
    }

    const fileBuffer = Buffer.from(await imageFile.arrayBuffer());
    const key = `ingredients/${Date.now()}_${(imageFile as File).name}`;
    const imageUrl = await uploadFile({ key, file: fileBuffer });

    const ingredient = await prisma.ingredient.create({
      data: { name, price: Number(price), imageUrl }
    });

    return NextResponse.json(ingredient, { status: 201 });
  } catch (error) {
    console.error("Ошибка при создании ингредиента:", error);
    return NextResponse.json({ error: 'Ошибка при создании ингредиента' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID ингредиента обязателен' }, { status: 400 });
    }

    await prisma.ingredient.delete({
      where: { id: Number(id) }
    });

    return NextResponse.json({ message: "Ингредиент успешно удалён" }, { status: 200 });
  } catch (error) {
    console.error("Ошибка при удалении ингредиента:", error);
    return NextResponse.json({ error: 'Ошибка при удалении ингредиента' }, { status: 500 });
  }
}
