import {NextResponse} from "next/server";
import {prisma} from "../../../../../../prisma/prisma-client";

export async function POST(req: Request) {
    try {
        const {name, posts} = await req.json();
        console.log('Полученные данные:', {name, posts});

        if (!name || !posts) {
            console.log('Ошибка: обязательные поля отсутствуют');
            return NextResponse.json(
                {message: 'Название и URL обязательны'},
                {status: 400}
            );
        }
        const newCategory = await prisma.category.create({
            data: {
                name,
                posts: {
                    connect: {
                        id: posts, // Идентификатор поста, который вы хотите связать
                    },
                },
            },
        });
        return NextResponse.json(newCategory, {status: 201});
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Ошибка при создании категории:', error.message);
            return NextResponse.json(
                {message: 'Ошибка при создании категории', error: error.message},
                {status: 500}
            );
        } else {
            console.error('Неизвестная ошибка:', error);
            return NextResponse.json(
                {message: 'Неизвестная ошибка'},
                {status: 500}
            );
        }

    }
}

