import { PrismaClient } from "@prisma/client";
import {NextRequest, NextResponse} from "next/server";

const prisma = new PrismaClient()

export async function GET() {
    try {
        const posts = await prisma.post.findMany({
            where: {
                published: true,
            },
            include: {
                categories: true, // Загрузка категорий вместе с постами
            },
        });
        return NextResponse.json(posts); // Возвращаем JSON с данными
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
export async function POST(request: NextRequest) {
    try {
        const body = await request.json(); // Получаем данные из запроса

        // Пример валидации данных
        const { title, body: content, authorId, published, categoryIds } = body;

        if (!title || !content || !authorId) {
            return NextResponse.json(
                { error: "Title, body, and authorId are required" },
                { status: 400 }
            );
        }

        // Создаём пост
        const post = await prisma.post.create({
            data: {
                title,
                body: content,
                published: published || false,
                author: { connect: { id: authorId } }, // Связываем с автором
                categories: {
                    connect: categoryIds?.map((id: number) => ({ id })), // Связываем с категориями
                },
            },
        });

        // Возвращаем данные о созданном посте
        return NextResponse.json(post, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}