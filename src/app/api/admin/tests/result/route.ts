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
        const disease = await prisma.disease.findMany({
            where: {
                testId: testId,
            },
            include: {
                post: true,
                doctor: true// Включает связанные посты
            },
        });

        return NextResponse.json(disease);
    } catch (error) {
        return NextResponse.json({ message: 'Ошибка при получении данных', error }, { status: 500 });
    }
}