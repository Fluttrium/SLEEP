import {NextResponse} from 'next/server';
import {prisma} from "../../../../../prisma/prisma-client";


export async function GET() {
    try {
        const tests = await prisma.test.findMany(
            {
                include: {
                    questions: true,
                }
            }
        ); // Пример для Prisma
        return NextResponse.json(tests, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        });
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
            orderBy: {id: 'desc'}, // Получаем последний тест
            select: {id: true}, // Только поле id
        });

        const newId = lastTest ? lastTest.id + 1 : 1; // Если тестов нет, начинаем с 1

        const newTest = await prisma.test.create({
            data: {
                id: newId,  // Устанавливаем новый id
                title: title,
                urltitle: urltitle,
            },
        });


        return NextResponse.json({status: 201});
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

export async function DELETE(req: Request) {
    try {
        const url = new URL(req.url);
        const testId = url.searchParams.get('id'); // Получаем ID теста из строки запроса

        if (!testId) {
            return NextResponse.json(
                {message: 'Не указан ID теста для удаления'},
                {status: 400}
            );
        }

        const deletedTest = await prisma.test.delete({
            where: {id: parseInt(testId, 10)},
        });

        return NextResponse.json(
            {message: 'Тест успешно удалён', deletedTest},
            {status: 200}
        );
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Ошибка при удалении теста:', error.message);
            return NextResponse.json(
                {message: 'Ошибка при удалении теста', error: error.message},
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