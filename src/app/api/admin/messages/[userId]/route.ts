import { NextResponse } from "next/server";
import {prisma} from "../../../../../../prisma/prisma-client";


// Функция для обработки POST-запроса
export async function POST(req: Request, { params }: { params: { userId: string } }) {
    try {
        const userId = params.userId;

        // Парсим данные из запроса
        const { isRead } = await req.json();

        // Проверяем, что `isRead` передан и является булевым значением
        if (typeof isRead !== "boolean") {
            return NextResponse.json({ error: "Поле 'isRead' должно быть булевым" }, { status: 400 });
        }

        // Обновляем все сообщения пользователя в базе данных
        const updatedMessages = await prisma.consul.updateMany({
            where: { authorId: String(userId) },
            data: { isRead },
        });

        // Проверяем, обновились ли записи
        if (updatedMessages.count === 0) {
            return NextResponse.json(
                { message: "У пользователя нет сообщений для обновления" },
                { status: 404 }
            );
        }

        // Возвращаем подтверждение успешного обновления
        return NextResponse.json({
            message: `Обновлено ${updatedMessages.count} сообщений`,
            updatedMessages,
        });
    } catch (error) {
        console.error("Ошибка при обновлении статуса сообщений:", error);
        return NextResponse.json({ error: "Ошибка при обработке запроса" }, { status: 500 });
    }
}
