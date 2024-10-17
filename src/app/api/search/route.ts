// app/api/search/route.ts
import {NextResponse} from "next/server";
import {prisma} from "../../../../prisma/prisma-client";


export async function GET(request: Request) {
    const {searchParams} = new URL(request.url);
    const query = searchParams.get("query") || "";

    try {
        const posts = await prisma.post.findMany({
            where: {
                OR: [
                    {title: {contains: query, mode: "insensitive"}},
                    {body: {contains: query, mode: "insensitive"}},
                ],
                published: true,
            },
        });

        return NextResponse.json(posts);
    } catch (error) {
        return NextResponse.json(
            {message: "Ошибка при выполнении поиска", error: String(error)},
            {status: 500}
        );
    }
}
