import {NextRequest, NextResponse} from "next/server";
import {prisma} from "../../../../prisma/prisma-client";


export async function POST(req: NextRequest) {
    try {
        // Извлечение данных из тела запроса
        const body = await req.json();
        const {date, name, number, coment, authorId} = body;
        // Проверка на наличие обязательных полей
        if (!date || !name || !number) {
            return NextResponse.json(
                {error: "Пожалуйста, заполните все обязательные поля: date, name, contact, authorId"},
                {status: 400}
            );
        }
        // Создание записи в базе данных
        const newConsul = await prisma.consul.create({
            data: {
                date: new Date(date), // Преобразование строки в объект Date
                name,
                contact: number,
                coment: coment || null, // Опциональное поле
                authorId: authorId || null,
            },
        });
        // Успешный ответ
        return NextResponse.json(newConsul, {status: 201});
    } catch (error) {
        console.error("Ошибка при создании записи:", error);
        return NextResponse.json(
            {error: "Внутренняя ошибка сервера"},
            {status: 500}
        );
    }
}
