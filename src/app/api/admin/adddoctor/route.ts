import {NextResponse} from "next/server";
import {prisma} from "../../../../../prisma/prisma-client";
import {uploadFile} from "@/lib/storage/storageSet";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        // Извлечение данных из FormData
        const name = formData.get("name") as string;
        const surname = formData.get("surname") as string;
        const email = formData.get("email") as string;
        const phone = formData.get("phone") as string;
        const password = formData.get("password") as string;
        const specialty = formData.get("specialty") as string;
        const description = formData.get("description") as string;
        const imageFile = formData.get("image");

        // Валидация обязательных полей
        if (!email || !password) {
            return NextResponse.json(
                {error: "Email и пароль являются обязательными."},
                {status: 400}
            );
        }
        if (!imageFile || !(imageFile instanceof File)) {
            return NextResponse.json({ message: "No file provided or invalid file type" }, { status: 400 });
        }

        const fileBuffer = Buffer.from(await imageFile.arrayBuffer());
        const key = `doctor/${Date.now()}_${imageFile.name}`;
        const imageUrl = await uploadFile({ key, file: fileBuffer });
        console.log("URL загруженного изображения:", imageUrl);


        // Создание нового пользователя в базе данных
        const newUser = await prisma.user.create({
            data: {
                name: name,
                surname: surname,
                email: email,
                phone: phone,
                password: password,
                specialty: specialty,
                description: description,
                image: imageUrl,
                role: "DOCTOR", // Укажите роль, если требуется
            },
        });

        console.log(newUser);

        return NextResponse.json({message: "Пользователь успешно создан", user: newUser});
    } catch (error) {
        console.error("Ошибка при создании пользователя:", error, );
        return NextResponse.json(
            {error: "Произошла ошибка при создании пользователя."},
            {status: 500}
        );
    }
}
