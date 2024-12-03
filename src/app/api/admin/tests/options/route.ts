import { prisma } from "../../../../../../prisma/prisma-client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        // Извлекаем questionId из тела запроса
        const { questionId } = await request.json();

        if (typeof questionId !== "number") {
            return NextResponse.json({ message: "Неверный questionId" }, { status: 400 });
        }

        // Получаем все данные об опциях, включая связанные записи
        const options = await prisma.option.findMany({
            where: { questionId },
            include: {
                maxDisease: true, // Загружаем связанные записи maxDisease
                minDisease: true, // Загружаем связанные записи minDisease
            },
        });

        // Возвращаем полученные данные без изменений
        return NextResponse.json(options);
    } catch (error) {
        console.error("Ошибка при получении данных:", error);
        return NextResponse.json(
            { message: "Ошибка при получении данных", error },
            { status: 500 }
        );
    }
}
