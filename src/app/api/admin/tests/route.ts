import { NextResponse } from 'next/server';
import {prisma} from "../../../../../prisma/prisma-client";




export async function GET() {
    try {
        const users = await prisma.test.findMany(); // Пример для Prisma
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({ message: 'Ошибка при получении данных', error }, { status: 500 });
    }
}
export async function POST(req: Request) {
    try {
        const { title, urltitle } = await req.json(); // Получаем данные из тела запроса

        // Логируем полученные данные
        console.log('Полученные данные:', { title, urltitle });

        // Проверка на наличие обязательных полей
        if (!title || !urltitle) {
            console.log('Ошибка: обязательные поля отсутствуют');
            return NextResponse.json(
                { message: 'Название и URL обязательны' },
                { status: 400 }
            );
        }

        // Создание нового теста в базе данных
        const newTest = await prisma.test.create({
            data: {
                title,
                urltitle,
            },
        });

        // Возвращаем созданный тест
        return NextResponse.json(newTest, { status: 201 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Ошибка при создании теста:', error.message); // Логируем ошибку
            return NextResponse.json(
                { message: 'Ошибка при создании теста', error: error.message },
                { status: 500 }
            );
        } else {
            console.error('Неизвестная ошибка:', error); // Логируем неизвестную ошибку
            return NextResponse.json(
                { message: 'Неизвестная ошибка' },
                { status: 500 }
            );
        }
    }
}