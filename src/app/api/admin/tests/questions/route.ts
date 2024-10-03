import { prisma } from "../../../../../../prisma/prisma-client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        // Извлекаем testId из тела запроса
        const { testId } = await request.json();

        if (typeof testId !== 'number') {
            return NextResponse.json({ message: 'Неверный testId' }, { status: 400 });
        }

        // Получаем вопросы, связанные с заданным testId
        const questions = await prisma.question.findMany({
            where: {
                testId: testId,
            },
        });

        return NextResponse.json(questions);
    } catch (error) {
        return NextResponse.json({ message: 'Ошибка при получении данных', error }, { status: 500 });
    }
}