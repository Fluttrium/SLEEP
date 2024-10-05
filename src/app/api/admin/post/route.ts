import {NextResponse} from 'next/server';
import {prisma} from "../../../../../prisma/prisma-client";


export async function GET() {
    try {
        const posts = await prisma.post.findMany({

            include: {
                categories: true, // Загрузка категорий вместе с постами
            },
        });
        return NextResponse.json(posts); // Возвращаем JSON с данными
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


export async function PUT(req: Request) {
    try {
        const { id, title, body, } = await req.json();

        if (!id || !title || !body ) {
            return NextResponse.json(
                { message: 'ID, Название, Содержимое и URL обязательны' },
                { status: 400 }
            );
        }

        // Обновляем пост
        const updatedPost = await prisma.post.update({
            where: { id }, // Предполагается, что id - это уникальный идентификатор поста
            data: { title, body},
        });

        return NextResponse.json(updatedPost, { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Ошибка при обновлении поста:', error.message);
            return NextResponse.json(
                { message: 'Ошибка при обновлении поста', error: error.message },
                { status: 500 }
            );
        } else {
            console.error('Неизвестная ошибка:', error);
            return NextResponse.json(
                { message: 'Неизвестная ошибка' },
                { status: 500 }
            );
        }
    }
}