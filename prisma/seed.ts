import {PrismaClient} from "@prisma/client";
import {diseaseDictionary} from "./constans";

const prisma = new PrismaClient();

async function seed() {
    try {
        // Создаем тест
        const test = await prisma.test.create({
            data: {
                id: 1,
                title: "Тест на здоровье",
                urltitle: "health-test",
            },
        });

        console.log("Создан тест:", test);

        // Создаём заболевания и получаем их из словаря
        // Используем upsert для создания/обновления заболеваний
        const flu = await prisma.disease.upsert({
            where: {title: "ОСТРАЯ ИНСОМНИЯ"},
            update: {},
            create: diseaseDictionary["ОСТРАЯ ИНСОМНИЯ"],
        });
        const chronic = await prisma.disease.upsert({
            where: {title: "ХРОНИЧЕСКАЯ ИНСОМНИЯ"},
            update: {},
            create: diseaseDictionary["ХРОНИЧЕСКАЯ ИНСОМНИЯ"],
        });
        const syndrome = await prisma.disease.upsert({
            where: {title: "СИНДРОМ БЕСПОКОЙНЫХ НОГ"},
            update: {},
            create: diseaseDictionary["СИНДРОМ БЕСПОКОЙНЫХ НОГ"],
        });
        const apnea = await prisma.disease.upsert({
            where: {title: "СИНДРОМ ОБСТРУКТИВНОГО АПНОЭ ВО СНЕ"},
            update: {},
            create: diseaseDictionary["СИНДРОМ ОБСТРУКТИВНОГО АПНОЭ ВО СНЕ"],
        });

        // Добавляем вопросы и их опции
        const question1 = await prisma.question.create({
            data: {
                text: "Я просыпаюсь за ≥ 30 минут до того, как должен проснуться утром, и не могу снова заснуть",
                testId: test.id, // Связываем с тестом
                options: {
                    create: [
                        {
                            text: "Да",
                            score: 1,
                            maxDisease: {
                                connect: [
                                    {id: flu.id},
                                    {id: chronic.id},
                                    {id: syndrome.id},
                                    {id: apnea.id}
                                ], // Подключаем к заболеваниям
                            },
                        },
                        {
                            text: "Нет",
                            score: 0,
                        },
                    ],
                },
            },
        });

        console.log("Создан вопрос:", question1);

        // Добавление других вопросов (например, вопрос 2 и 3, аналогично примеру 1)
        const question2 = await prisma.question.create({
                data: {
                    text: "Я часто просыпаюсь ночью и не могу снова заснуть",
                    testId: test.id,
                    options: {
                        create: [
                            {
                                text: "Да",
                                score: 1,
                                maxDisease: {
                                    connect: [
                                        {id: flu.id},
                                        {id: chronic.id}
                                    ], // Добавляем баллы к заболеваниям
                                },
                            },
                            {
                                text: "Нет",
                                score: -1,
                                minDisease: {
                                    connect: [

                                        {id: syndrome.id},
                                        {id: apnea.id}
                                    ],
                                }
                            },
                        ],
                    },
                },
            })
        ;

        console.log("Создан вопрос 2:", question2);

        const question3 = await prisma.question.create({
            data: {
                text: "Мне тяжело расслабиться после рабочего дня",
                testId: test.id,
                options: {
                    create: [
                        {
                            text: "Да",
                            score: 1,
                            maxDisease: {
                                connect: [
                                    {id: chronic.id}
                                ], // Добавляем баллы к заболеваниям
                            },
                        },
                        {
                            text: "Нет",
                            score: -1,
                            minDisease: {
                                connect: [
                                    {id: apnea.id}
                                ],
                            }
                        },
                    ],
                },
            },
        });

        console.log("Создан вопрос 3:", question3);

    } catch (error) {
        console.error("Ошибка при добавлении данных:", error);
        prisma.$disconnect();
        process.exit(1);
    }
}

seed()
    .then(() => {
        console.log("Данные успешно добавлены");
        prisma.$disconnect();
    })
    .catch((e) => {
        console.error("Ошибка при добавлении данных:", e);
        prisma.$disconnect();
        process.exit(1);
    });
