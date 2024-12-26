import { NextResponse } from "next/server";
import { prisma } from "../../../../../../../prisma/prisma-client";

export async function POST(req: Request) {
    try {
        // Парсим тело запроса
        const { id } = await req.json();

        // Проверяем, что ID был передан
        if (!id) {
            return NextResponse.json({ error: "ID диагноза не передан" }, { status: 400 });
        }

        // Удаляем диагноз из базы данных
        const deletedResult = await prisma.disease.delete({
            where: { id: Number(id) },
        });

        // Возвращаем успешный ответ
        return NextResponse.json({
            message: "Диагноз успешно удалён",
            deletedResult,
        });
    } catch (error) {
        console.error("Ошибка при удалении диагноза:", error);
        return NextResponse.json({ error: "Ошибка при обработке запроса" }, { status: 500 });
    }
}
