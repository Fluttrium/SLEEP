import {NextResponse} from "next/server";
import {verifyEmail} from "@/app/actions";

export async function POST(request: Request) {
    const { token } = await request.json();

    if (!token) {
        return NextResponse.json({ error: "Token and email are required." }, { status: 400 });
    }

    try {
        // Вызов функции верификации с передачей email
        const message = await verifyEmail(token);
        return NextResponse.json({ message });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
