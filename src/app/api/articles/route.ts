import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";

export async function GET() {
    try {
        const posts = await prisma.post.findMany({
            include: {
                categories: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        const formattedPosts = posts.map(post => ({
            id: post.id,
            title: post.title,
            body: post.body,
            published: post.published,
            imageUrl: post.image,
            categories: post.categories.map(category => category.name),
        }));

        // Возвращаем данные с отключением кэширования
        const response = NextResponse.json(formattedPosts);
        response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
        response.headers.set("Pragma", "no-cache");
        response.headers.set("Expires", "0");
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
