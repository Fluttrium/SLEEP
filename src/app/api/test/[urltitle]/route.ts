import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { urltitle: string } }) {
    try {
        const urltitle = params.urltitle;

        if (!urltitle) {
            return NextResponse.json({ message: 'Неверный идентификатор теста' }, { status: 400 });
        }

        // Запрос к базе данных для получения теста с вопросами, опциями и связанными заболеваниями
        const test = await prisma.test.findUnique({
            where: { urltitle },
            include: {
                questions: {
                    include: {
                        options: {
                            include: {
                                minDisease: true,  // Включаем связанные минимальные заболевания
                                maxDisease: true   // Включаем связанные максимальные заболевания
                            }
                        },
                    },
                },
            },
        });

        if (!test) {
            return NextResponse.json({ message: 'Тест не найден' }, { status: 404 });
        }

        // Возвращаем JSON с заголовками
        const response = NextResponse.json(test, { status: 200 });
        response.headers.set('Content-Type', 'application/json; charset=utf-8');

        return response;
    } catch (error) {
        return NextResponse.json({ message: 'Ошибка при получении данных', error: String(error) }, { status: 500 });
    }
}
