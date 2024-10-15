import {NextResponse} from "next/server";
import {prisma} from "../../../../../../../prisma/prisma-client";

export async function POST(req: Request) {
    try {
        const {questionId, text, score} = await req.json(); // Получаем данные из тела запроса

        // Логируем полученные данные
        console.log('Полученные данные:', {text, questionId});

        // Проверка на наличие обязательных полей
        if (!text || !score) {
            console.log('Ошибка: обязательные поля отсутствуют');
            return NextResponse.json(
                {message: 'Текст ответа и балл обязательны'},
                {status: 400}
            );
        }

        // Создание нового теста в базе данных
        const newTest = await prisma.option.create({
            data: {
                questionId,
                text,
                score,

            },
        });

        // Возвращаем созданный тест
        return NextResponse.json(newTest, {status: 201});
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Ошибка при создании варианта:', error.message); // Логируем ошибку
            return NextResponse.json(
                {message: 'Ошибка при создании варианта', error: error.message},
                {status: 500}
            );
        } else {
            console.error('Неизвестная ошибка:', error); // Логируем неизвестную ошибку
            return NextResponse.json(
                {message: 'Неизвестная ошибка'},
                {status: 500}
            );
        }
    }
}