"use server"
import {Prisma} from '@prisma/client';
import {hashSync} from 'bcrypt';
import {sendEmail} from "@/shared/send-mail";
import {getUserSession} from "@/lib/get-user-session";
import {prisma} from "../../prisma/prisma-client";


async function sendVerificationEmail(email: string, token: string) {
    const htmlContent = `
        <div>
            <h1>Подтверждение регистрации</h1>
            <div>Ваш код подтверждения: ${token}</div>
        </div>
    `;

    await sendEmail(
        email,
        'Ножи СПБ / 📝 Подтверждение регистрации',
        htmlContent
    );
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
    try {
        const currentUser = await getUserSession();

        if (!currentUser) {
            throw new Error('Пользователь не найден');
        }

        const findUser = await prisma.user.findFirst({
            where: {
                id: currentUser.id,
            },
        });

        if (!findUser) {
            throw new Error('Пользователь не найден');
        }

        await prisma.user.update({
            where: {
                id: currentUser.id,
            },
            data: {
                name: body.name,
                email: body.email,
                password: body.password ? hashSync(body.password as string, 10) : findUser.password,
            },
        });
    } catch (err) {
        console.log('Error [UPDATE_USER]', err);
        throw err;
    }
}

export async function registerUser(body: {
    password: string;
    name: string | null | undefined
    email: string
}) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: body.email,
            },
        });

        if (user) {
            if (!user.verified) {
                const token = Math.floor(100000 + Math.random() * 900000).toString();

                await prisma.verificationToken.upsert({
                    where: {
                        userId: user.id,
                    },
                    update: {
                        token,
                    },
                    create: {
                        token,
                        userId: user.id,
                    },
                });

                await sendVerificationEmail(user.email!, token);
                throw new Error('Почта не подтверждена. Новый код подтверждения отправлен.');
            }

            throw new Error('Пользователь уже существует и верифицирован.');
        }

        const createdUser = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: hashSync(body.password!, 10),
            },
        });

        const code = Math.floor(100000 + Math.random() * 900000).toString();

        await prisma.verificationToken.create({
            data: {
                token: code,
                userId: createdUser.id,
            },
        });

        await sendVerificationEmail(createdUser.email!, code);
    } catch (err) {
        console.log('Error [CREATE_USER]', err);
        throw err;
    }
}

export async function verifyEmail(token: string) {
    try {
        // Найдите запись токена
        const verificationToken = await prisma.verificationToken.findFirst({
            where: {token},
        });

        if (!verificationToken) {
            throw new Error("Токен недействителен.");
        }


        // Обновите статус пользователя как подтвержденного
        await prisma.user.update({
            where: {id: verificationToken.userId},
            data: {verified: true},
        });

        // Удалите токен после успешной проверки
        await prisma.verificationToken.delete({
            where: {token: verificationToken.token},
        });

        return "Почта успешно подтверждена.";
    } catch (error: any) {
        throw new Error(error.message || "Ошибка при верификации токена.");
    }
}

