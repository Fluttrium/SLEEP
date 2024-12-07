import {prisma} from "../../../../../../prisma/prisma-client";
import {NextResponse} from "next/server";

export async function GET() {
    try {
        const defaultTest = await prisma.defaultTest.findFirst({
            select: {
                testTitle: true,
            },
        });
        const testTitle = defaultTest?.testTitle;
        return NextResponse.json(testTitle, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        });
    } catch (error) {
        return NextResponse.json({message: 'Ошибка при получении данных', error}, {status: 500});
    }
}

export async function POST(req: Request) {
    try {
        const { id } = await req.json(); // Извлекаем ID из тела запроса

        if (!id) {
            return NextResponse.json({ message: 'ID теста не передан' }, { status: 400 });
        }

        // Убедимся, что тест с таким ID существует
        const testExists = await prisma.test.findUnique({
            where: { id: Number(id) },
        });

        if (!testExists) {
            return NextResponse.json({ message: 'Тест с таким ID не найден' }, { status: 404 });
        }

        // Удаляем текущий дефолтный тест, если он существует
        await prisma.defaultTest.deleteMany();

        // Устанавливаем новый дефолтный тест
        const newDefaultTest = await prisma.defaultTest.create({
            data: {
                test: {
                    connect: { id: Number(id) }, // Связываем новый дефолтный тест с тестом
                },
            },
        });

        return NextResponse.json(
            { message: 'Дефолтный тест обновлён', defaultTest: newDefaultTest },
            { status: 200 }
        );
    } catch (error) {
        console.error("Ошибка при обновлении дефолтного теста:", error);
        return NextResponse.json({ message: 'Ошибка при обновлении данных', error }, { status: 500 });
    }
}
