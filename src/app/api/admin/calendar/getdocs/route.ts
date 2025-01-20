import { prisma } from "../../../../../../prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const users = await prisma.user.findMany({
            where: {
                role: "DOCTOR", // Роль обернута в кавычки
            },
            include: {
                consul: true, // Включаем связанные сообщения
            },
        });
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json(
            { message: "Ошибка при получении данных", error },
            { status: 500 }
        );
    }
}
