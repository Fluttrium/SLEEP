import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userId, results } = body;

        // Проверка входных данных
        if (!userId || !results || !Array.isArray(results)) {
            return NextResponse.json({ error: "Invalid input data" }, { status: 400 });
        }

        // Сохраняем результаты напрямую в формате JSON
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                DisesesList: results.map((result) => JSON.stringify(result)), // Преобразуем массив объектов в строки JSON
            },
        });

        return NextResponse.json(
            { message: "Test results saved successfully", user: updatedUser },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error saving test results:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
