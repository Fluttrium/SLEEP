import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userId, results } = body;

        if (!userId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        if (results) {
            if (!Array.isArray(results)) {
                return NextResponse.json(
                    { error: "Results should be an array" },
                    { status: 400 }
                );
            }

            // Преобразуем массив данных в JSON для сохранения
            const serializedResults = results.map((item: any) => JSON.stringify(item));

            // Обновляем данные пользователя
            await prisma.user.update({
                where: { email: userId },
                data: {
                    DisesesList: serializedResults,
                },
            });

            return NextResponse.json(
                { message: "Results successfully saved." },
                { status: 200 }
            );
        } else {
            // Если `results` нет, просто возвращаем данные пользователя
            const userData = await prisma.user.findUnique({
                where: { email: userId },
                select: { DisesesList: true },
            });

            if (!userData) {
                return NextResponse.json(
                    { error: "User not found" },
                    { status: 404 }
                );
            }

            return NextResponse.json(
                { message: "User data fetched successfully", diseasesList: userData.DisesesList || [] },
                { status: 200 }
            );
        }
    } catch (error) {
        console.error("Error processing user data:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
