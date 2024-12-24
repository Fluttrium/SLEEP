import {NextResponse} from "next/server";
import {prisma} from "../../../../../prisma/prisma-client";

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({message: "Не указан id пользователя"}, {status: 400});
    }

    try {
        const user = await prisma.user.findUnique({
            where: {id},
            select: {name: true, surname: true},

        });

        if (!user) {
            return NextResponse.json({message: "Пользователь не найден"}, {status: 404});
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error("Ошибка получения пользователя:", error);
        return NextResponse.json({message: "Ошибка сервера"}, {status: 500});
    }
}
