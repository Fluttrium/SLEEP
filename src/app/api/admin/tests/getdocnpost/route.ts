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

        // Проверяем, существует ли диагноз
        const existingDisease = await prisma.disease.findUnique({
            where: { id: diseaseId },
        });

        if (!existingDisease) {
            return NextResponse.json({ error: "Диагноз с таким ID не найден." }, { status: 404 });
        }

        // Проверяем, существует ли врач
        const existingDoctor = await prisma.user.findUnique({
            where: { id: doctor.id },
        });

        if (!existingDoctor) {
            return NextResponse.json({ error: "Врач с таким ID не найден." }, { status: 404 });
        }

        // Проверяем, существует ли статья
        const existingPost = await prisma.post.findUnique({
            where: { id: post.id },
        });

        if (!existingPost) {
            return NextResponse.json({ error: "Статья с таким ID не найдена." }, { status: 404 });
        }

        // Обновляем диагноз в рамках транзакции
        const updatedDisease = await prisma.$transaction(async (tx) => {
            // Удаляем старые связи
            await tx.disease.update({
                where: { id: diseaseId },
                data: {
                    doctorId: null,
                    postId: null,
                },
            });

            // Добавляем новые связи
            return tx.disease.update({
                where: { id: diseaseId },
                data: {
                    doctorId: doctor.id,
                    postId: post.id,
                },
            });
        });

        return NextResponse.json({ message: "Данные успешно обновлены.", updatedDisease });
    } catch (error) {
        console.error("Ошибка при обновлении данных:", error);
        return NextResponse.json({ error: "Ошибка при обновлении данных." }, { status: 500 });
    }
}






