import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const doctors = await prisma.user.findMany({
            where: { role: "DOCTOR" },
            select: {
                id: true,
                specialty: true,
            },
        });

        // Группируем докторов по специальности
        const specialtiesMap = doctors.reduce((acc, doctor) => {
            if (!doctor.specialty) return acc; // Пропускаем, если нет специальности

            if (!acc[doctor.specialty]) {
                acc[doctor.specialty] = { specialty: doctor.specialty, doctorIds: [] };
            }

            acc[doctor.specialty].doctorIds.push(doctor.id);
            return acc;
        }, {} as Record<string, { specialty: string; doctorIds: string[] }>);

        // Преобразуем объект в массив
        const uniqueSpecialties = Object.values(specialtiesMap);

        return NextResponse.json(uniqueSpecialties, { status: 200 });
    } catch (error) {
        console.error("Ошибка при получении списка врачей:", error);
        return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
    }
}
