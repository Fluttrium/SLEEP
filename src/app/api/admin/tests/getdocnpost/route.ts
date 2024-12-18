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

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { diseaseId, doctor, post } = body;

        if (!diseaseId || !doctor?.id || !post?.id) {
            return NextResponse.json(
                { error: "Необходимо указать диагноз, врача и статью." },
                { status: 400 }
            );
        }

        // Убедимся, что диагноз существует и получаем текущие связи
        const existingDisease = await prisma.disease.findUnique({
            where: { id: diseaseId },
            include: {
                doctors: true,
                posts: true,
            },
        });

        if (!existingDisease) {
            return NextResponse.json(
                { error: "Диагноз с таким ID не найден." },
                { status: 404 }
            );
        }

        // Удаляем все текущие связи
        await prisma.disease.update({
            where: { id: diseaseId },
            data: {
                doctors: {
                    disconnect: existingDisease.doctors.map((doctor) => ({ id: doctor.id })), // Указываем ID врачей
                },
                posts: {
                    disconnect: existingDisease.posts.map((post) => ({ id: post.id })), // Указываем ID постов
                },
            },
        });

        // Устанавливаем новые связи
        const updatedDisease = await prisma.disease.update({
            where: { id: diseaseId },
            data: {
                doctors: {
                    connect: { id: doctor.id }, // Связываем нового врача
                },
                posts: {
                    connect: { id: post.id }, // Связываем новый пост
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



