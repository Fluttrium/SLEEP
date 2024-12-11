import { NextResponse } from "next/server";
import { prisma } from "../../../../../../prisma/prisma-client";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userId } = body;

        if (!userId) {
            return NextResponse.json({ error: "Invalid input data" }, { status: 400 });
        }

        const user = await prisma.user.findFirst({
            where: { providerId: userId },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const result = await prisma.user.findUnique({
            where: { id: user.id },
            select: {
                DisesesList: true,
            },
        });

        return NextResponse.json(
            { message: "User data fetched successfully", diseasesList: result?.DisesesList || [] },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching user data:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
