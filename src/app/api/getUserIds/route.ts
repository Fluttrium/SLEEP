import {NextResponse} from "next/server";
import {prisma} from "../../../../prisma/prisma-client";


export async function GET() {
    const doctors = await prisma.user.findMany({
        where: {role: "DOCTOR"}, // Фильтр врачей
        select: {id: true}
    });

    return NextResponse.json(doctors.map(doc => doc.id));
}
