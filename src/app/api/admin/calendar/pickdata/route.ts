import { NextResponse } from 'next/server';
import {prisma} from "../../../../../../prisma/prisma-client";


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { data } = body;

        // Проверка входных данных
        if (!data || typeof data !== 'number') {
            return NextResponse.json({ message: 'Неверный формат данных' }, { status: 400 });
        }

        // Поиск записей на указанную дату
        const records = await prisma.consulOrder.findMany({
            where: {
                Date: data, // Фильтрация по дате
            },
        });

        return NextResponse.json(records, { status: 200 });
    } catch (error) {
        console.error('Ошибка при обработке запроса:', error);
        return NextResponse.json({ message: 'Внутренняя ошибка сервера' }, { status: 500 });
    }
}
