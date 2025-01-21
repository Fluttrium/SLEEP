import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log("Received request body:", body); // Логируем тело запроса
        const { diagnos } = body;

        if (!diagnos) {
            console.error("diagnos is required in the request body");
            return NextResponse.json({ error: "diagnos is required" }, { status: 400 });
        }

        // Проверим, что diagnos содержит ожидаемое значение
        console.log("diagnos:", diagnos);

        // Получаем диагноз по названию
        const disease = await prisma.disease.findUnique({
            where: { title: diagnos },
            select: {
                post: {
                    select: {
                        id: true,
                        title: true,
                        body: true,
                        image: true,
                        categories: { // Включаем категории
                            select: {
                                name: true, // Только поле name для категорий
                            },
                        },
                    },
                },
                assignedDoctors: true,
            },
        });


        if (!disease) {
            console.error("Disease not found");
            return NextResponse.json({ error: "Disease not found" }, { status: 404 });
        }

        return NextResponse.json(
            { message: "Диагноз получен успешно", disease },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
