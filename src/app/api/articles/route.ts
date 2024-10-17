import {NextResponse} from "next/server";
import {prisma} from "../../../../prisma/prisma-client";

export async function GET() {
    try {
        const posts = await prisma.post.findMany({
            include: {
                categories: {
                    select: {
                        id: true,
                        name: true, // Предполагается, что `name` у категорий существует в базе данных
                    },
                },
            },
        });

        // Форматируем ответ, чтобы включить только необходимые поля
        const formattedPosts = posts.map(post => ({
            id: post.id,
            title: post.title,
            body: post.body,
            published: post.published,
            categories: post.categories.map(category => category.name), // Предположим, у вас есть поле `name` в категориях
        }));

        return NextResponse.json(formattedPosts);
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
