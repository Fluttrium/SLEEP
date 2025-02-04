import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { year, month } = body;

        if (!year || !month) {
            return NextResponse.json({ message: "Не переданы параметры year и month" }, { status: 400 });
        }

        console.log("Полученные данные на сервере:", year, month);

        return NextResponse.json({ message: "Данные получены", year, month });
    } catch (error) {
        return NextResponse.json({ message: "Ошибка обработки запроса" }, { status: 500 });
    }
}
