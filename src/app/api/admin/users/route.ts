export const dynamic = "force-dynamic";
import {NextResponse} from 'next/server';
import {prisma} from "../../../../../prisma/prisma-client";


export async function GET() {
    try {
        const users = await prisma.user.findMany({
            include: {
                consul: true, // Включаем сообщения
            },
        });
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({message: 'Ошибка при получении данных', error}, {status: 500});
    }
}

export async function POST(req: Request) {
    try {
        // Получаем данные из тела запроса
        const {id} = await req.json();

        // Проверяем, что ID передан
        if (!id) {
            return NextResponse.json(
                {message: "Необходимо указать ID пользователя"},
                {status: 400}
            );
        }

        // Удаляем пользователя и связанные записи (если нужно)
        await prisma.user.delete({
            where: {
                id: id,
            },
        });

        return NextResponse.json({
            message: `Пользователь с ID ${id} успешно удалён`,
        });
    } catch (error) {
        console.error("Ошибка при удалении пользователя:", error);
        return NextResponse.json(
            {message: "Ошибка при удалении пользователя", error},
            {status: 500}
        );
    }
}