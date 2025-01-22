import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log("Received request body:", body); // Логируем тело запроса
        const { email, results } = body;

        if (!email) {
            console.error("Email is required in the request body");
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        // Проверим, что results содержит ожидаемые данные
        console.log("Results:", results);

        if (results) {
            // Обновляем данные пользователя
            await prisma.user.update({
                where: { email },
                data: {
                    DisesesList: results.map((result: any) => JSON.stringify(result)), // Преобразуем объекты в строки
                },
            });

            return NextResponse.json({ message: "Results successfully saved." }, { status: 200 });
        } else {
            // Если `results` нет, возвращаем данные пользователя
            const userData = await prisma.user.findUnique({
                where: { email },
                select: { DisesesList: true },
            });

            if (!userData) {
                console.error("User not found");
                return NextResponse.json({ error: "User not found" }, { status: 404 });
            }

            return NextResponse.json(
                { message: "User data fetched successfully", diseasesList: userData.DisesesList || [] },
                { status: 200 }
            );
        }
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
