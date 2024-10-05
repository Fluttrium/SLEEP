import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    if (!id) {
        return NextResponse.json({ message: 'Post ID is required' }, { status: 400 });
    }

    try {
        // Получаем категории, связанные с постом
        const postCategories = await prisma.category.findMany({
            where: {
                posts: {
                    some: {
                        id: Number(id), // Приводим ID к числу
                    },
                },
            },
        });

        // Получаем все категории, исключая те, которые связаны с постом
        const allCategories = await prisma.category.findMany({
            where: {
                NOT: {
                    posts: {
                        some: {
                            id: Number(id),
                        },
                    },
                },
            },
        });

        return NextResponse.json({ postCategories, allCategories }, { status: 200 });
    } catch (error) {
        console.error("Ошибка при получении категорий:", error);
        return NextResponse.json({ message: 'Error fetching categories' }, { status: 500 });
    }
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const { categoryId } = await request.json();

    if (!id || !categoryId) {
        return NextResponse.json({ message: 'Post ID and Category ID are required' }, { status: 400 });
    }

    try {
        // Добавляем связь категории и поста
        const post = await prisma.post.update({
            where: {
                id: Number(id),
            },
            data: {
                categories: {
                    connect: {
                        id: Number(categoryId),
                    },
                },
            },
        });

        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        console.error("Ошибка при добавлении категории к посту:", error);
        return NextResponse.json({ message: 'Error adding category to post' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params; // ID поста
    const { categoryId } = await request.json(); // ID категории, которую нужно удалить из поста

    if (!id || !categoryId) {
        return NextResponse.json({ message: 'Post ID and Category ID are required' }, { status: 400 });
    }

    try {
        // Удаляем связь категории и поста
        const post = await prisma.post.update({
            where: {
                id: Number(id),
            },
            data: {
                categories: {
                    disconnect: {
                        id: Number(categoryId),
                    },
                },
            },
        });

        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        console.error("Ошибка при удалении категории из поста:", error);
        return NextResponse.json({ message: 'Error removing category from post' }, { status: 500 });
    }
}
