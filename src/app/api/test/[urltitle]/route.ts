import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";

export async function GET(request: Request, { params }: { params: { urltitle: string } }) {
    try {
        const urltitle = params.urltitle;

        if (!urltitle) {
            return NextResponse.json({ message: "Invalid test identifier" }, { status: 400 });
        }

        const test = await prisma.test.findUnique({
            where: { urltitle },
            include: {
                questions: {
                    include: {
                        options: {
                            include: {
                                MinDiseases: { include: { Disease: true } },
                                MaxDiseases: { include: { Disease: true } },
                            },
                        },
                    },
                },
            },
        });

        if (!test) {
            return NextResponse.json({ message: "Test not found" }, { status: 404 });
        }

        return NextResponse.json(test, { status: 200 });
    } catch (error) {
        console.error("Error fetching test data:", error);
        return NextResponse.json({ message: "Error fetching data", error: String(error) }, { status: 500 });
    }
}
