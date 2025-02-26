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

        const products = await prisma.product.findMany();

        const metods = await prisma.metod.findMany();

        return NextResponse.json({doctors, posts, products, metods},
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
        const { diseaseId, doctor, post, product, metods } = body;

        if (!diseaseId || !Array.isArray(doctor) || !post?.id || !Array.isArray(product) || !Array.isArray(metods)) {
            return NextResponse.json(
                { error: "Необходимо указать диагноз, список врачей, статью и товары." },
                { status: 400 }
            );
        }

        // Проверка существования переданных данных
        const [existingDisease, existingPost] = await Promise.all([
            prisma.disease.findUnique({ where: { id: diseaseId } }),
            prisma.post.findUnique({ where: { id: post.id } }),

        ]);

        if (!existingDisease) {
            return NextResponse.json({ error: "Диагноз с таким ID не найден." }, { status: 404 });
        }
        if (!existingPost) {
            return NextResponse.json({ error: "Статья с таким ID не найдена." }, { status: 404 });
        }

        // Проверка врачей и товаров
        const doctorIds = doctor.map((d: { id: string }) => d.id);
        const productIds = product.map((p: { id: number }) => p.id);
        const metodsIds = metods.map((p: { id: number }) => p.id);
        const [existingDoctors, existingProducts, existingMetods] = await Promise.all([
            prisma.user.findMany({ where: { id: { in: doctorIds }, role: "DOCTOR" } }),
            prisma.product.findMany({ where: { id: { in: productIds } } }),
            prisma.metod.findMany({ where: { id: { in: metodsIds } } }),
        ]);

        if (existingDoctors.length !== doctorIds.length) {
            return NextResponse.json({ error: "Некоторые врачи с указанными ID не найдены." }, { status: 404 });
        }
        if (existingProducts.length !== productIds.length) {
            return NextResponse.json({ error: "Некоторые товары с указанными ID не найдены." }, { status: 404 });
        }
        if (existingMetods.length !== metodsIds.length) {
            return NextResponse.json({ error: "Некоторые metods с указанными ID не найдены." }, { status: 404 });
        }

        // Обновление диагноза
        const updatedDisease = await prisma.disease.update({
            where: { id: diseaseId },
            data: {
                assignedDoctor: { set: doctorIds.map((id) => ({ id })) }, // Установка связи по ID врачей
                post: { connect: { id: post.id } }, // Связывание поста
                Product: { set: productIds.map((id) => ({ id })) },
                Metod: {set: metodsIds.map((id)=>({id}))}// Установка связи по ID товаров
            },
        });

        return NextResponse.json({ message: "Данные успешно обновлены.", updatedDisease });
    } catch (error) {
        console.error("Ошибка при обновлении данных:", error);
        return NextResponse.json({ error: "Ошибка при обновлении данных." }, { status: 500 });
    }
}








