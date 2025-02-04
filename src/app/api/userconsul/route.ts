import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getDoctorsBySpecialty(specialty: string) {
    // Получаем всех докторов с указанной специализацией
    const doctors = await prisma.user.findMany({
        where: {
            specialty: specialty, // Фильтр по специализации
            role: "DOCTOR", // Фильтр по роли "DOCTOR"
        },

    });

    return doctors;
}

export async function POST(req: Request) {
    try {
        const { specialty } = await req.json();

        if (!specialty || typeof specialty !== "string") {
            return new Response("Не передана специализация", { status: 400 });
        }

        const decodedSpecialty = decodeURIComponent(specialty); // Декодируем URL-кодировку

        const doctors = await getDoctorsBySpecialty(decodedSpecialty);

        if (doctors.length === 0) {
            return new Response("Врачи не найдены", { status: 404 });
        }

        return new Response(JSON.stringify(doctors), { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (error) {
        console.error("Ошибка при обработке запроса", error);
        return new Response("Ошибка загрузки данных", { status: 500 });
    }
}
