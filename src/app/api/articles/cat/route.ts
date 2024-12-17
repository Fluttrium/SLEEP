export const dynamic = "force-dynamic";
import {prisma} from "../../../../../prisma/prisma-client";
import {NextResponse} from "next/server";

export async function GET() {
    try {
        const category = await prisma.category.findMany({})
        return NextResponse.json(category);
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }

}