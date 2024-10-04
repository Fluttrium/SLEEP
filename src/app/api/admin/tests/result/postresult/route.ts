import {NextResponse} from "next/server";
import {prisma} from "../../../../../../../prisma/prisma-client";

export async function POST(req: Request) {
    try {
        const {title, minScore, maxScore, links, testId} = await req.json(); // Получаем данные из тела запроса

        // Логируем полученные данные
        console.log('Полученные данные:', {title, minScore, maxScore, links, testId});

        // Проверка на наличие обязательных полей
        if (!title || !minScore || !maxScore || !links || !testId) {
            console.log('Ошибка: обязательные поля отсутствуют');
            return NextResponse.json(
                {message: 'Текст ответа и балл обязательны'},
                {status: 400}
            );
        }

        // Создание нового теста в базе данных
        const newResult = await prisma.result.create({
            data: {
                title, minScore, maxScore, links, testId,

            },
        });

        // Возвращаем созданный тест
        return NextResponse.json(newResult, {status: 201});
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Ошибка при создании резултьтата:', error.message); // Логируем ошибку
            return NextResponse.json(
                {message: 'Ошибка при создании результата', error: error.message},
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