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

export async function DELETE(request: Request) {
    try {
        // Извлекаем id вопроса из параметров запроса
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id || isNaN(Number(id))) {
            return NextResponse.json({ message: 'Неверный id' }, { status: 400 });
        }

        // Удаляем вопрос из базы данных
        const deletedQuestion = await prisma.question.delete({
            where: {
                id: Number(id),
            },
        });

        return NextResponse.json({ message: 'Вопрос успешно удален', deletedQuestion });
    } catch (error) {
        console.error("Ошибка при удалении вопроса:", error);
        return NextResponse.json({ message: 'Ошибка при удалении вопроса', error }, { status: 500 });
    }
}
