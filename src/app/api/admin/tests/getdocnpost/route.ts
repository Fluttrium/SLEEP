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

        return NextResponse.json({doctors, posts, products},
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
        const {diseaseId, doctor, post, product} = body;

        if (!diseaseId || !doctor?.id || !post?.id || !product?.id) {
            return NextResponse.json(
                {error: "Необходимо указать диагноз, врача и статью  и товар ."},
                {status: 400}
            );
        }

        const [existingDisease, existingDoctor, existingPost, existingProduct] = await Promise.all([
            prisma.disease.findUnique({where: {id: diseaseId}}),
            prisma.user.findUnique({where: {id: doctor.id}}),
            prisma.post.findUnique({where: {id: post.id}}),
            prisma.product.findUnique({where: {id: product.id}}),
        ]);

        if (!existingDisease) {
            return NextResponse.json({error: "Диагноз с таким ID не найден."}, {status: 404});
        }
        if (!existingDoctor) {
            return NextResponse.json({error: "Врач с таким ID не найден."}, {status: 404});
        }
        if (!existingPost) {
            return NextResponse.json({error: "Статья с таким ID не найдена."}, {status: 404});
        }
        if (!existingProduct) {
            return NextResponse.json({error: "Product с таким ID не найдена."}, {status: 404});
        }

        const updatedDisease = await prisma.disease.update({
            where: {id: diseaseId},
            data: {
                assignedDoctors: {set: [doctor]},
                post: {connect: {id: post.id}},
                product: {set: [product]}
            },
        });

        return NextResponse.json({message: "Данные успешно обновлены.", updatedDisease});
    } catch (error) {
        console.error("Ошибка при обновлении данных:", error);
        return NextResponse.json({error: "Ошибка при обновлении данных."}, {status: 500});
    }
}







