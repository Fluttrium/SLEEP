import {NextResponse} from "next/server";
import {prisma} from "../../../../../../../prisma/prisma-client";

export async function POST(req: Request) {
    try {
        const { questionId, text, score = 0, maxDisease = [], minDisease = [] } = await req.json(); // Устанавливаем значение по умолчанию

        // Логируем полученные данные
        console.log('Полученные данные:', { text, questionId, score });

        // Проверка на наличие обязательных полей
        if (!text || score === undefined) { // Убедитесь, что score проверяется на undefined, а не только falsy
            console.log('Ошибка: обязательные поля отсутствуют');
            return NextResponse.json(
                { message: 'Текст ответа и балл обязательны' },
                { status: 400 }
            );
        }

        // Создание нового варианта в базе данных
        const newTest = await prisma.option.create({
            data: {
                questionId,
                text,
                score,
                maxDisease: {
                    connect: maxDisease.map((id: any) => ({ id })),
                },
                minDisease: {
                    connect: minDisease.map((id: any) => ({ id })),
                },
            },
        });

        // Возвращаем созданный вариант
        return NextResponse.json(newTest, { status: 201 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Ошибка при создании варианта:', error.message);
            return NextResponse.json(
                { message: 'Ошибка при создании варианта', error: error.message },
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

