export const dynamic = "force-dynamic";
import {NextResponse} from "next/server";
import {prisma} from "../../../../prisma/prisma-client";

export async function GET() {
    try {
        const posts = await prisma.post.findMany({
            include: {
                categories: true,
            },
        });

        const formattedPosts = posts.map(post => ({
            id: post.id,
            title: post.title,
            body: post.body,
            published: post.published,
            image: post.image,
            categories: post.categories.map(category => category.name),
            posttype: post.posttype,
        }));

        // Возвращаем данные с отключением кэширования
        const response = NextResponse.json(formattedPosts);
        response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
        response.headers.set("Pragma", "no-cache");
        response.headers.set("Expires", "0");
        return response;
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}

export async function PUT(req: Request) {
    try {
        const {id, title, body, imageUrl} = await req.json();

        if (!id || !title || !body) {
            return NextResponse.json(
                {message: 'ID, Название и Содержимое обязательны'},
                {status: 400}
            );
        }

        const image = imageUrl;

        const updatedPost = await prisma.post.update({
            where: {id},
            data: {title, body, image},
        });

        return NextResponse.json(updatedPost, {status: 200});
    } catch (error: unknown) {
        console.error('Ошибка при обновлении поста:', error instanceof Error ? error.message : error);
        return NextResponse.json(
            {
                message: 'Ошибка при обновлении поста',
                error: error instanceof Error ? error.message : 'Неизвестная ошибка'
            },
            {status: 500}
        );
    }
}