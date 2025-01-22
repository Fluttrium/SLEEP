import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log("Полученные данные:", body);  // Логирование тела запроса

        const { id } = body;
        if (!id) {
            return NextResponse.json({ message: "ID не передан" }, { status: 400 });
        }

        const resultFormBD = await prisma.user.findUnique({
            select: { DisesesList: true },
            where: { id: id },
        });

        if (!resultFormBD) {
            return NextResponse.json({ message: "Пользователь не найден" }, { status: 404 });
        }

        return NextResponse.json(resultFormBD);

    } catch (error) {
        console.error("Ошибка получения пользователя:", error);
        return NextResponse.json({ message: "Ошибка сервера" }, { status: 500 });
    }
}

