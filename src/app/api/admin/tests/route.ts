import {NextResponse} from 'next/server';
import {prisma} from "../../../../../prisma/prisma-client";


export async function GET() {
    try {
        const users = await prisma.test.findMany(); // Пример для Prisma
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({message: 'Ошибка при получении данных', error}, {status: 500});
    }
}

export async function POST(req: Request) {
    try {
        const {title, urltitle} = await req.json();

        console.log('Полученные данные:', {title, urltitle});

        if (!title || !urltitle) {
            console.log('Ошибка: обязательные поля отсутствуют');
            return NextResponse.json(
                {message: 'Название и URL обязательны'},
                {status: 400}
            );
        }

        // Проверяем, существует ли тест с таким urltitle
        const existingTest = await prisma.test.findUnique({
            where: {urltitle},
        });

        if (existingTest) {
            return NextResponse.json(
                {message: 'Тест с таким URL уже существует'},
                {status: 400}
            );
        }

        const lastTest = await prisma.test.findFirst({
            orderBy: { id: 'desc' }, // Получаем последний тест
            select: { id: true }, // Только поле id
        });

        const newId = lastTest ? lastTest.id + 1 : 1; // Если тестов нет, начинаем с 1

        const newTest = await prisma.test.create({
            data: {
                id: newId,  // Устанавливаем новый id
                title: title,
                urltitle: urltitle,
            },
        });



        return NextResponse.json( {status: 201});
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Ошибка при создании теста:', error.message);
            return NextResponse.json(
                {message: 'Ошибка при создании теста', error: error.message},
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