import {PrismaClient, Prisma} from "@prisma/client";
import {faker} from "@faker-js/faker";

const prisma = new PrismaClient();

async function seed() {

    try {
        // Типизация массива пользователей
        const users: Prisma.UserCreateManyInput[] = [];

        const userCount = 100;
        for (let i = 0; i < userCount; i++) {
            const randomMonth = faker.number.int({min: 1, max: 12});
            const randomDay = faker.number.int({min: 1, max: 28});
            const registrationDate = new Date(
                `2024-${randomMonth.toString().padStart(2, "0")}-${randomDay.toString().padStart(2, "0")}`
            );
            const firstTestDate = new Date(
                `2024-${randomMonth.toString().padStart(2, "0")}-${randomDay.toString().padStart(2, "0")}`
            );

            users.push({
                name: faker.person.firstName(),
                surname: faker.person.lastName(),
                email: faker.internet.email(),
                phone: faker.phone.number(),
                password: "sleep2024",
                registrationDate,
                firstTestDate,
            });
        }

        const createdUsers = await prisma.user.createMany({
            data: users,
            skipDuplicates: true,
        });

        console.log(`Users created: ${createdUsers.count}`);

        // Загружаем пользователей из базы для дальнейшего использования
        const allUsers = await prisma.user.findMany();


        // Генерация тестов
        const testCount = 10;
        const tests = [];
        for (let i = 0; i < testCount; i++) {
            tests.push({
                title: faker.lorem.words(3),
                urltitle: faker.lorem.slug(),
            });
        }

        const createdTests = await prisma.test.createMany({
            data: tests,
        });

        console.log(`Tests created: ${createdTests.count}`);

        // Генерация вопросов и опций для тестов
        for (let i = 1; i <= testCount; i++) {
            const questionCount = faker.number.int({min: 3, max: 10}); // Новый метод faker
            for (let j = 0; j < questionCount; j++) {
                const question = await prisma.question.create({
                    data: {
                        text: faker.lorem.sentence(),
                        testId: i,
                    },
                });

                const optionCount = faker.number.int({min: 2, max: 5}); // Новый метод faker
                const options = Array.from({length: optionCount}).map(() => ({
                    text: faker.lorem.word(),
                    score: faker.number.int({min: 0, max: 10}),
                    questionId: question.id,
                }));

                await prisma.option.createMany({
                    data: options,
                });
            }
        }

        console.log("Questions and options created");

        // Генерация сообщений пользователей
        const messages = [];
        for (let i = 0; i < 50; i++) {
            // Получаем случайный существующий ID пользователя
            const randomUser = await prisma.user.findFirst({
                take: 1,
                skip: faker.number.int({min: 0, max: userCount - 1}), // Используем существующие записи
            });

            if (randomUser) {
                messages.push({
                    title: faker.lorem.words(5),
                    body: faker.lorem.paragraphs(2),
                    authorId: randomUser.id, // Привязываем существующий ID пользователя
                });
            }
        }

        // Вставляем сообщения в базу данных
        await prisma.message.createMany({
            data: messages,
        });


        console.log(`Messages created: ${messages.length}`);

        // Генерация результатов для тестов

        for (let i = 1; i <= testCount; i++) {
            const resultCount = faker.number.int({min: 2, max: 5});
            for (let j = 0; j < resultCount; j++) {
                // Выбираем случайных пользователей для привязки
                const randomUsers = Array.from({length: faker.number.int({min: 1, max: 5})}).map(() => {
                    const randomIndex = faker.number.int({min: 0, max: allUsers.length - 1});
                    return {id: allUsers[randomIndex].id}; // Используем ID из базы
                });

                await prisma.result.create({
                    data: {
                        title: faker.lorem.words(3),
                        minScore: faker.number.int({min: 0, max: 10}),
                        maxScore: faker.number.int({min: 11, max: 20}),
                        links: [faker.internet.url(), faker.internet.url()],
                        testId: i,
                        users: {
                            connect: randomUsers, // Связываем результат с пользователями
                        },
                    },
                });
            }
        }

        console.log("Results created");


        console.log("Results created");

        console.log("Database seeding completed successfully!");
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        await prisma.$disconnect();
    }
}

seed();
