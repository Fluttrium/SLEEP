export const dynamic = "force-dynamic";
import {prisma} from "../../../../../prisma/prisma-client";
import {NextResponse} from "next/server";

export async function GET() {
    try {
        const defaultTest = await prisma.defaultTest.findFirst({
            select: {
                test: true,
            },
        });
        const testLink = defaultTest?.test.urltitle;
        return NextResponse.json(testLink, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        });
    } catch (error) {
        return NextResponse.json({message: 'Ошибка при получении данных', error}, {status: 500});
    }
}