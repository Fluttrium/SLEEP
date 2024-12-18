import {prisma} from "../../../../../../prisma/prisma-client";
import {NextResponse} from "next/server";

export async function GET() {
    try {


        const doctors = await prisma.user.findMany(
            {
                where: {
                    role: "DOCTOR",
                }
            }
        );

        const posts = await prisma.post.findMany();

        return NextResponse.json({doctors, posts},
            {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
            }
        );


    } catch (error) {
        return NextResponse.json({message: 'Ошибка при получении данных', error}, {status: 500});
    }
}


export async function POST (req: Request) {
    try {
        const body = await req.json();

        const { diseaseId, doctor, post } = body;

        await prisma.disease.update({
            where: { id: diseaseId },
            data: {
                doctors: {
                    set: [], // Удаляет всех связанных пользователей
                },
                posts: {
                    set: [], // Удаляет все связанные посты
                },
            },
        });


        if (!diseaseId || !doctor?.id || !post?.id) {
            return NextResponse.json(
                { error: "Необходимо указать диагноз, врача и статью." },
                { status: 400 }
            );
        }

        // Убедимся, что диагноз существует
        const existingDisease = await prisma.disease.findUnique({
            where: { id: diseaseId },
        });

        if (!existingDisease) {
            return NextResponse.json(
                { error: "Диагноз с таким ID не найден." },
                { status: 404 }
            );
        }

        // Обновляем диагноз, связывая врача и статью
        const updatedDisease = await prisma.disease.update({
            where: { id: diseaseId },
            data: {
                doctors: {
                    connect: { id: doctor.id }, // Связываем врача
                },
                posts: {
                    connect: { id: post.id }, // Связываем пост
                },
            },
        });

        return NextResponse.json({
            message: "Данные успешно обновлены.",
            updatedDisease,
        });
    } catch (error) {
        console.error("Ошибка при обновлении данных:", error);
        return NextResponse.json(
            { error: "Ошибка при обновлении данных." },
            { status: 500 }
        );
    }
}

