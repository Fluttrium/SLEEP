import { NextResponse } from "next/server";
import { prisma } from "../../../../../../prisma/prisma-client";

export async function POST(req: Request) {
    try {
        const { id } = await req.json();

        // Проверяем, что ID передан
        if (!id) {
            return NextResponse.json(
                { message: "Необходимо указать ID пользователя" },
                { status: 400 }
            );
        }

        // Обновляем состояние сообщений в модели Consul
        await prisma.consul.updateMany({
            where: {
                authorId: id, // Обновляем все записи для указанного пользователя
            },
            data: {
                isRead: true, // Помечаем как прочитанные
            },
        });

        return NextResponse.json({
            message: `Состояние сообщений изменено успешно`,
        });
    } catch (error) {
        console.error("Ошибка при обновлении состояния:", error);
        return NextResponse.json(
            { message: "Ошибка при обновлении состояния", error: error },
            { status: 500 }
        );
    }
}
