import {NextResponse, NextRequest} from "next/server";
import {SignJWT} from "jose";
import {PrismaClient, User} from "@prisma/client";

// Инициализация Prisma Client
const prisma = new PrismaClient();

// Функция для получения пользователя по имени (или email)
async function giveUser(username: string): Promise<User | null> {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: username,
            },
        });
        return user;
    } catch (error) {
        console.error("Ошибка при получении данных пользователя из базы данных:", error);
        throw error;
    }
}

export async function POST(request: NextRequest) {
    const {username, password} = (await request.json()) as { username: string; password: string };

    // Получаем учетные данные из базы данных
    const user = await giveUser(username);

    if (user && user.password === password) { // Проверка пароля (помните о хешировании паролей)
        try {
            // Создание JWT токена
            const token = await new SignJWT({username: user.name})
                .setProtectedHeader({alg: "HS256"})
                .setExpirationTime("30m")
                .sign(Buffer.from("your_secret_key")); // Замените на ваш секретный ключ

            // Установка токена в HTTP-only cookie
            const response = NextResponse.json( user);
            response.cookies.set("token", token, {httpOnly: true, path: "/"});

            return response; // Возвращаем объект user в ответе
        } catch (error) {
            console.error("Ошибка при создании токена:", error);
            return NextResponse.json({message: "Ошибка при создании токена"}, {status: 500});
        }
    } else {
        return NextResponse.json({message: "Неверные учетные данные"}, {status: 401});
    }
}
