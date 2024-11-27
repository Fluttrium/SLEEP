import {NextResponse} from "next/server";
import {prisma} from "../../../../../../../prisma/prisma-client";

export  async function POST(req: Request) {
    try {
        const {title, testId} = await req.json();

        console.log("Полученные данные на бек", {title, testId});

        if (!title || !testId) {
            console.log('Ошибка: обязательные поля отсутствуют');
            return NextResponse.json(
                {message: 'Название и TestID обязательны'},
                {status: 400}
            );
        }

        const newDesises = await prisma.disease.create({
            data: {
                title,
                testId
            },
        });

        return NextResponse.json(newDesises, {status: 201});
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Ошибка при создании диагноза :', error.message);
            return NextResponse.json(
                {message: 'Ошибка при создании диагноза ', error: error.message},
                {status: 500}
            );
        } else {
            console.error('Неизвестная ошибка:', error);
            return NextResponse.json(
                {message: 'Неизвестная ошибка'},
                {status: 500}
            );
        }
    }
}