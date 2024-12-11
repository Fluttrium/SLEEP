import { NextRequest, NextResponse } from "next/server";
import { uploadFile } from "@/lib/storage/storageSet";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file");
        const id = formData.get("id");

        // Проверяем, что file это объект типа File
        if (!file || !(file instanceof File)) {
            return NextResponse.json({ message: "No file provided or invalid file type" }, { status: 400 });
        }

        const bucket = process.env.YANDEX_CLOUD_BUCKET;
        if (!bucket) {
            return NextResponse.json({ message: "Bucket name is missing in environment variables." }, { status: 500 });
        }

        const fileBuffer = Buffer.from(await file.arrayBuffer());
        const key = `post2/${id}_${file.name}`;

        const fileUrl = await uploadFile({
            key,
            file: fileBuffer,
        });

        // Кодируем путь файла в URL
        const encodedFileUrl = encodeURI(fileUrl);

        return NextResponse.json({
            fileUrl: encodedFileUrl,
        });

    } catch (error: any) {
        console.error("Ошибка загрузки файла:", error);
        return NextResponse.json({ error: error.message, message: "File upload failed" }, { status: 500 });
    }
}
