import { NextResponse } from "next/server";
import {prisma} from "../../../../../prisma/prisma-client";


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userId, results } = body;

        if (!userId) {
            return NextResponse.json({ error: "Invalid input data" }, { status: 400 });
        }



        if (results) {
            await prisma.user.update({
                where: { id :userId },
                data: {
                    DisesesList: results.map((item: any) => JSON.stringify(item)),
                },
            });
            return NextResponse.json(
                { message: "Results successfully saved." },
                { status: 200 }
            );
        } else {
            const result = await prisma.user.findUnique({
                where: { id: userId },
                select: { DisesesList: true },
            });
            return NextResponse.json(
                { message: "User data fetched successfully", diseasesList: result?.DisesesList || [] },
                { status: 200 }
            );
        }
    } catch (error) {
        console.error("Error processing user data:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
