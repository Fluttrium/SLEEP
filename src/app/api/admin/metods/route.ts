import {NextResponse} from 'next/server';
import {prisma} from "../../../../../prisma/prisma-client";
import {z} from "zod";
import {uploadFile} from "@/lib/storage/storageSet";

const metodSchema = z.object({
    title: z.string().min(3, "Название должно быть не менее 3 символов"),
    description: z.string().min(10, "Описание должно быть не менее 10 символов"),
    addeddescription: z.string().optional(),
});

// Обработчик для создания нового метода
export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const addeddescription = formData.get("addeddescription") as string | null;
        const imageFile = formData.get("image") as File | null;

        if (!imageFile) {
            return NextResponse.json({ error: "Изображение обязательно" }, { status: 400 });
        }

        const fileBuffer = Buffer.from(await imageFile.arrayBuffer());
        const key = `metod/${Date.now()}_${imageFile.name}`;
        const imageUrl = await uploadFile({ key, file: fileBuffer });

        const newMetod = await prisma.metod.create({
            data: { title, description, addeddescription, image: imageUrl },
        });

        return NextResponse.json(newMetod, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}

// Обработчик для получения методов
export async function GET() {
    try {
        const metods = await prisma.metod.findMany();
        return NextResponse.json(metods);
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}

