import {NextResponse} from 'next/server';
import {uploadFile} from "@/lib/storage/storageSet";
import {prisma} from "../../../../../../prisma/prisma-client";

export async function POST(request: Request) {
    try {
        // Получаем данные из формы
        const formData = await request.formData();

        const description = formData.get('description') as string;
        const doctorId = formData.get('doctorId') as string;
        const image = formData.get('image') as File;

        // Проверка на обязательные поля
        if (!description || !doctorId) {
            return NextResponse.json({error: 'Missing required fields.'}, {status: 400});
        }

        let imageUrl: string | null = null; // Значение по умолчанию

        // Если изображение передано
        if (image) {
            const fileBuffer = Buffer.from(await image.arrayBuffer());
            const key = `doctor/${Date.now()}_${image.name}`;
            imageUrl = await uploadFile({key, file: fileBuffer});
            console.log("URL загруженного изображения:", imageUrl);
        }

        // Добавление записи в базу данных
        const addDoctorProfile = await prisma.consulProduct.create({
            data: {
                description,
                doctorID: doctorId,
                image: imageUrl, // Передаём null, если изображения нет
            }
        });

        return NextResponse.json({success: 'Doctor added successfully!'});

    } catch (error) {
        console.error('Ошибка при обработке данных:', error);
        return NextResponse.json({error: 'Ошибка при добавлении доктора.'}, {status: 500});
    }
}

export async function GET(request: Request) {
    try {
        const allDoctorProduct = await prisma.consulProduct.findMany();
        return NextResponse.json(allDoctorProduct, {status: 200});
    } catch (error) {
        console.error('Ошибка при обработке запроса:', error);
        return NextResponse.json({message: 'Внутренняя ошибка сервера'}, {status: 500});
    }
}