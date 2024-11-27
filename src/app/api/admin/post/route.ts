import {NextResponse} from 'next/server';
import {prisma} from "../../../../../prisma/prisma-client";

// Обработчик для получения постов
export async function GET() {
    try {
        const posts = await prisma.post.findMany({
            include: {
                categories: true,
            },
        });
        return NextResponse.json(posts);
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}

// Обработчик для обновления поста
export async function PUT(req: Request) {
    try {
        const {id, title, body} = await req.json();

        if (!id || !title || !body) {
            return NextResponse.json(
                {message: 'ID, Название и Содержимое обязательны'},
                {status: 400}
            );
        }

        const updatedPost = await prisma.post.update({
            where: {id},
            data: {title, body},
        });

        return NextResponse.json(updatedPost, {status: 200});
    } catch (error: unknown) {
        console.error('Ошибка при обновлении поста:', error instanceof Error ? error.message : error);
        return NextResponse.json(
            {
                message: 'Ошибка при обновлении поста',
                error: error instanceof Error ? error.message : 'Неизвестная ошибка'
            },
            {status: 500}
        );
    }
}




// Обработчик для создания нового поста
export async function POST(req: Request) {
    try {
        const {title} = await req.json(); // Добавляем authorId в параметры

        if (!title ) { // Проверяем наличие всех обязательных полей
            return NextResponse.json(
                {message: 'Название, Содержимое и автор обязательны'},
                {status: 400}
            );
        }

        const newPost = await prisma.post.create({
            data: {
                title,
                body: "",
                published: true, // Можно установить по умолчанию

            },
        });

        return NextResponse.json(newPost, {status: 201});
    } catch (error: unknown) {
        console.error('Ошибка при создании поста:', error instanceof Error ? error.message : error);
        return NextResponse.json(
            {
                message: 'Ошибка при создании поста',
                error: error instanceof Error ? error.message : 'Неизвестная ошибка'
            },
            {status: 500}
        );
    }
}
