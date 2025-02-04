
import { NextRequest, NextResponse } from "next/server";
import {prisma} from "../../../../../prisma/prisma-client";



export async function POST(req: NextRequest) {
    try {
        const { doctorId } = await req.json();

        const products = await prisma.consulProduct.findMany({
            where: { doctorID: doctorId },
            include: {
                ConsulProductItem: {
                    where: {
                        dateStart: { gt: new Date() }
                    },
                    orderBy: { dateStart: 'asc' }
                }
            }
        });

        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json(
            { error: "Ошибка загрузки данных" },
            { status: 500 }
        );
    }
}