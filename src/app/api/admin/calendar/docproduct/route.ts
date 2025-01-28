import { NextResponse } from 'next/server';
import { uploadFile } from "@/lib/storage/storageSet";
import { prisma } from "../../../../../../prisma/prisma-client";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const price = parseFloat(formData.get('price') as string);
        const doctorId = formData.get('doctorId') as string;
        const image = formData.get('image') as File;

        if (!title || !description || !doctorId || isNaN(price)) {
            return NextResponse.json({ error: 'Missing or invalid required fields.' }, { status: 400 });
        }

        let imageUrl: string | null = null;

        if (image) {
            try {
                const fileBuffer = Buffer.from(await image.arrayBuffer());
                const key = `doctor/${Date.now()}_${image.name}`;
                imageUrl = await uploadFile({ key, file: fileBuffer });
                console.log("URL загруженного изображения:", imageUrl);
            } catch (uploadError) {
                console.error("Ошибка при загрузке изображения:", uploadError);
                return NextResponse.json({ error: 'Image upload failed.' }, { status: 500 });
            }
        }

        const addDoctorProfile = await prisma.consulProduct.create({
            data: {
                title,
                description,
                price,
                doctorID: doctorId,
                image: imageUrl,
            },
        });

        return NextResponse.json({ success: 'Doctor added successfully!', data: addDoctorProfile });
    } catch (error) {
        console.error('Ошибка при обработке данных:', error);
        return NextResponse.json({ error: 'Ошибка при добавлении доктора.', details: error }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const allDoctorProduct = await prisma.consulProduct.findMany();
        return NextResponse.json(allDoctorProduct, { status: 200 });
    } catch (error) {
        console.error('Ошибка при обработке запроса:', error);
        return NextResponse.json({ message: 'Internal server error.', error: error }, { status: 500 });
    }
}
