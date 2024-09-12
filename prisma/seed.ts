import {PrismaClient} from '@prisma/client';
import {categories, posts, users} from "./constants";

const prisma = new PrismaClient();

async function up() {
    try {
        const createdUsers = await prisma.user.createMany(
            {
                data: users,
            }
        )



        // Создаем категории
        const createdCategories = await prisma.category.createMany({
            data: categories,
        });

        // Получаем пользователей и категории для связи
        const user = await prisma.user.findFirst({where: {email: 'user@test.ru'}});
        const admin = await prisma.user.findFirst({where: {email: 'admin@test.ru'}});
        const createdCategory = await prisma.category.findFirst({where: {name: 'Сон'}});

        // Создаем посты с указанием автора и категории
        await prisma.post.create({
            data: {
                title: 'First Post',
                body: `# Заголовок\n\nЭто текст **лонгрида** с использованием _Markdown_.`,
                author: {connect: {id: user?.id}}, // Связь с автором
                categories: {
                    connect: [{id: createdCategory?.id}] // Связь с категорией
                },
            },
        });

        await prisma.post.create({
            data: {
                title: 'Second Post',
                body: `# Еще один пост\n\nMarkdown **здесь** тоже работает!`,
                author: {connect: {id: admin?.id}}, // Связь с админом
                categories: {
                    connect: [{id: createdCategory?.id}] // Связь с категорией
                },
            },
        });
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        await prisma.$disconnect();
    }
}

up();
