import { NextResponse } from 'next/server';
import {prisma} from "../../../../../../prisma/prisma-client";

export async function PUT(req: Request) {
    try {
        // Извлекаем id и posttypes из тела запроса
        const { id, posttypes } = await req.json();

        // Валидация входных данных
        if (!id || !posttypes || !Array.isArray(posttypes)) {
            return NextResponse.json(
                { message: 'Invalid input. Required: id and an array of posttypes.' },
                { status: 400 }
            );
        }

        // Обновляем поле posttype с использованием операции "set"
        const updatedPost = await prisma.post.update({
            where: { id: Number(id) },
            data: {
                posttype: { set: posttypes }
            }
        });

        return NextResponse.json(updatedPost, { status: 200 });
    } catch (error) {
        console.error('Error updating post types:', error);
        return NextResponse.json(
            { message: 'Error updating post types', error },
            { status: 500 }
        );
    }
}
