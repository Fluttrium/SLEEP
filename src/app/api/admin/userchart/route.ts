import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";

export async function GET() {
    try {
        // Получаем всех пользователей с необходимыми полями
        const users = await prisma.user.findMany({
            select: {
                registrationDate: true,
                firstTestDate: true,
            },
        });

        // Создаем структуру для хранения данных по месяцам
        const months = Array.from({ length: 12 }, (_, i) => ({
            month: i + 1,
            registrationCount: 0,
            firstTestCount: 0,
        }));

        // Заполняем данные по месяцам
        users.forEach((user) => {
            if (user.registrationDate) {
                const month = user.registrationDate.getMonth(); // Месяц от 0 до 11
                months[month].registrationCount++;
            }
            if (user.firstTestDate) {
                const month = user.firstTestDate.getMonth(); // Месяц от 0 до 11
                months[month].firstTestCount++;
            }
        });

        // Форматируем данные с названиями месяцев
        const monthNames = [
            "Январь",
            "Февраль",
            "Март",
            "Апрель",
            "Май",
            "Июнь",
            "Июль",
            "Август",
            "Сентябрь",
            "Октябрь",
            "Ноябрь",
            "Декабрь",
        ];

        const formattedData = months.map((data, index) => ({
            month: monthNames[index],
            registrationCount: data.registrationCount,
            firstTestCount: data.firstTestCount,
        }));

        // Возвращаем данные
        return NextResponse.json(formattedData, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        });
    } catch (error) {
        console.error("Ошибка при получении данных пользователей:", error);
        return NextResponse.json(
            { message: "Ошибка при получении данных", error },
            { status: 500 }
        );
    }
}
