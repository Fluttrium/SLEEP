import { NextRequest, NextResponse } from "next/server";
import { uploadFile } from "@/lib/storage/storageSet";
import { prisma } from "../../../../../prisma/prisma-client";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file");
        const id = formData.get("id");

        if (!file || !(file instanceof File)) {
            return NextResponse.json({ message: "No file provided or invalid file type" }, { status: 400 });
        }

        if (!id) {
            return NextResponse.json({ message: "Post ID is required" }, { status: 400 });
        }

        const bucket = process.env.YANDEX_CLOUD_BUCKET;
        if (!bucket) {
            return NextResponse.json({ message: "Bucket name is missing in environment variables." }, { status: 500 });
        }

        const fileBuffer = Buffer.from(await file.arrayBuffer());
        const key = `post/${Date.now()}_${file.name}`;
        const imageUrl = await uploadFile({ key, file: fileBuffer });
        console.log("URL загруженного изображения:", imageUrl);

        // Обновление записи в базе данных
        const updatedPost = await prisma.post.update({
            where: { id: Number(id) },
            data: { image: imageUrl },
        });

        return NextResponse.json({
            message: "File uploaded successfully",
            imageUrl,
            updatedPost,
        });

    } catch (error: any) {
        console.error("Ошибка загрузки файла:", error);
        return NextResponse.json({ error: error.message, message: "File upload failed" }, { status: 500 });
    }
}
