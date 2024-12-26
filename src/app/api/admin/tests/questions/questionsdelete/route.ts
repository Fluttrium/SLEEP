import { NextResponse } from "next/server";
import { prisma } from "../../../../../../../prisma/prisma-client";

export async function POST(req: Request) {
    try {
        const { id } = await req.json(); // Получаем ID вопроса из тела запроса

        // Проверяем, что ID был передан
        if (!id) {
            return NextResponse.json({ error: "ID вопроса не передан" }, { status: 400 });
        }

        // Удаляем вопрос из базы данных
        await prisma.question.delete({
            where: { id: Number(id) },
        });

        // Возвращаем успешный ответ
        return NextResponse.json({ message: "Вопрос успешно удалён" });
    } catch (error) {
        console.error("Ошибка при удалении вопроса:", error);
        return NextResponse.json({ error: "Ошибка при обработке запроса" }, { status: 500 });
    }
}
