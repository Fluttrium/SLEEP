import { prisma } from "../../../../prisma/prisma-client";

export async function GET() {
  try {
    // Получаем всех врачей из базы данных
    const doctors = await prisma.user.findMany({where: { role: "DOCTOR"}});
    return new Response(JSON.stringify({ doctors }), { status: 200 });
  } catch (error) {
    console.error("Ошибка при получении врачей:", error);
    return new Response(
      JSON.stringify({ error: "Ошибка при получении врачей" }),
      { status: 500 }
    );
  }
}
