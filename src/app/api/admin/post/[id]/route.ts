import {NextResponse} from "next/server";
import {prisma} from "../../../../../../prisma/prisma-client";

export async function DELETE(request: Request, {params}: { params: { id: string } }) {
    try {
        const {id} = params; // Предполагается, что ID передается в URL

        if (!id) {
            return NextResponse.json(
                {message: 'ID поста обязательный'},
                {status: 400}
            );
        }

        // Удаляем пост
        await prisma.post.delete({
            where: {id: Number(id)}, // Преобразуем строку в число
        });

        return NextResponse.json({message: 'Пост удален успешно'}, {status: 200});
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}