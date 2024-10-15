import {NextResponse} from 'next/server';
import {prisma} from "../../../../../prisma/prisma-client";


export async function GET() {
    try {
        const users = await prisma.user.findMany({
            include: {
                messages: true, // Включаем сообщения
            },
        });
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({message: 'Ошибка при получении данных', error}, {status: 500});
    }
}
