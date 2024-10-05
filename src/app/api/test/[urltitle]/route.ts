import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";

// Получаем тест
export async function GET(request: Request, { params }: { params: { urltitle: string } }) {
    try {
        const urltitle = params.urltitle;

        if (!urltitle) {
            return NextResponse.json({ message: 'Неверный идентификатор теста' }, { status: 400 });
        }

        const test = await prisma.test.findFirst({
            where: { urltitle },
            include: {
                questions: {
                    include: {
                        options: true,
                    },
                },
            },
        });

        if (!test) {
            return NextResponse.json({ message: 'Тест не найден' }, { status: 404 });
        }

        return NextResponse.json(test);
    } catch (error) {
        return NextResponse.json({ message: 'Ошибка при получении данных', error: String(error) }, { status: 500 });
    }
}

// Обработка ответов на тест
export async function POST(request: Request) {
    try {
        const { answers } = await request.json(); // Ожидаем массив объектов с ответами
        let totalScore = 0;

        // Обрабатываем каждый ответ
        for (const answer of answers) {
            const { questionId, optionId } = answer;
            const option = await prisma.option.findUnique({
                where: { id: optionId },
            });

            if (option) {
                totalScore += option.score; // Добавляем баллы к общему счету
            }
        }

        const testId = answers[0].testId; // Получаем testId из первого ответа

        // Находим результат на основе общего балла
        const result = await prisma.result.findFirst({
            where: {
                testId: testId, // Используем testId
                minScore: { lte: totalScore },
                maxScore: { gte: totalScore },
            },
        });

        if (!result) {
            return NextResponse.json({ message: 'Результат не найден' }, { status: 404 });
        }

        return NextResponse.json({ title: result.title });
    } catch (error) {
        return NextResponse.json({ message: 'Ошибка при обработке ответов', error: String(error) }, { status: 500 });
    }
}