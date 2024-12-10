import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";

export async function GET(request: Request, { params }: { params: { title: string } }) {
    try {
        const title = decodeURIComponent(params.title); // Декодируем заголовок

        if (!title) {
            return NextResponse.json({ message: "Неверный идентификатор теста" }, { status: 400 });
        }

        const test = await prisma.post.findFirst({
            where: {
                title: title,
                published: true,
            },
            include: {
                categories: true, // Загрузка категорий вместе с постами
            },
        });

        if (!test) {
            return NextResponse.json({ message: "Тест не найден" }, { status: 404 });
        }

        return NextResponse.json(test);
    } catch (error) {
        return NextResponse.json({ message: "Ошибка при получении данных", error: String(error) }, { status: 500 });
    }
}
