import { prisma } from "../../../../../prisma/prisma-client";

export async function POST(req: Request) {
    try {
        // Парсим тело запроса
        const body = await req.json();
        const { title } = body;

        // Проверяем наличие title
        if (!title) {
            return new Response(
                JSON.stringify({ error: "Title is required" }),
                { status: 400 }
            );
        }

        // Находим диагноз, включая врачей и посты
        const disease = await prisma.disease.findUnique({
            where: { title },
            include: {
                doctors: {
                    select: {
                        id: true,
                        name: true,
                        surname: true,
                        specialty: true,
                        image: true,
                    },
                },
                posts: {
                    select: {
                        id: true,
                        title: true,
                        body: true,
                        createdAt: true,
                        image: true,

                    },
                },
            },
        });

        // Проверяем, найден ли диагноз
        if (!disease) {
            return new Response(
                JSON.stringify({ error: "Disease not found" }),
                { status: 404 }
            );
        }

        // Возвращаем диагноз с врачами и постами
        return new Response(
            JSON.stringify({
                message: "Disease data fetched successfully",
                disease: {
                    title: disease.title,
                    doctors: disease.doctors,
                    posts: disease.posts,
                },
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Error fetching disease data:", error);
        return new Response(
            JSON.stringify({ error: "Internal Server Error" }),
            { status: 500 }
        );
    }
}
