"use server"
import {OrderStatus, Prisma} from '@prisma/client';
import {hashSync} from 'bcrypt';
import {sendEmail} from "@/shared/send-mail";
import {getUserSession} from "@/lib/get-user-session";
import {prisma} from "../../prisma/prisma-client";
import {CheckoutFormValues} from '@/constants';
import {cookies} from 'next/dist/client/components/headers';
import {createPayment} from '@/lib/creat-payment';
import {PayOrderTemplate} from '../../shared/components/shared';
import {checkoutConsulValue} from "@/constants/checkout-consul-schema";


export interface createConsulOrderProps {
    data: checkoutConsulValue,
    consulItemId: number,
}

export async function createOrder(data: CheckoutFormValues) {
    try {
        const cookieStore = cookies();
        const cartToken = cookieStore.get('cartToken')?.value;

        if (!cartToken) {
            throw new Error('Cart token not found');
        }

        /* Находим корзину по токену */
        const userCart = await prisma.cart.findFirst({
            include: {
                user: true,
                items: {
                    include: {
                        ingredients: true,
                        productItem: {
                            include: {
                                product: true,
                            },
                        },
                    },
                },
            },
            where: {
                token: cartToken,
            },
        });

        /* Если корзина не найдена возращаем ошибку */
        if (!userCart) {
            throw new Error('Cart not found');
        }

        /* Если корзина пустая возращаем ошибку */
        if (userCart?.totalAmount === 0) {
            throw new Error('Cart is empty');
        }

        /* Создаем заказ */
        const order = await prisma.order.create({
            data: {
                token: cartToken,
                fullName: data.firstName + ' ' + data.lastName,
                email: data.email,
                phone: data.phone,
                address: data.address,
                comment: data.comment,
                totalAmount: userCart.totalAmount,
                status: OrderStatus.PENDING,
                items: JSON.stringify(userCart.items),
            },
        });

        /* Очищаем корзину */
        await prisma.cart.update({
            where: {
                id: userCart.id,
            },
            data: {
                totalAmount: 0,
            },
        });

        await prisma.cartItem.deleteMany({
            where: {
                cartId: userCart.id,
            },
        });

        const paymentData = await createPayment({
            amount: order.totalAmount,
            orderId: order.id,
            description: 'Оплата заказа #' + order.id,
        });

        if (!paymentData) {
            throw new Error('Payment data not found');
        }

        await prisma.order.update({
            where: {
                id: order.id,
            },
            data: {
                paymentId: paymentData.id,
            },
        });

        const paymentUrl = paymentData.confirmation.confirmation_url;

        // await sendEmail(
        //   data.email,
        //   'Next Pizza / Оплатите заказ #' + order.id,
        //   PayOrderTemplate({
        //     orderId: order.id,
        //     totalAmount: order.totalAmount,
        //     paymentUrl,
        //   }),
        // );

        return paymentUrl;
    } catch (err) {
        console.log('[CreateOrder] Server error', err);
    }
}

async function sendVerificationEmail(email: string, token: string) {
    const htmlContent = `
        <div>
            <h1>Подтверждение регистрации</h1>
            <div>Ваш код подтверждения: ${token}</div>
        </div>
    `;

    await sendEmail(
        email,
        'Asleep || Подтверждение почтового ящика ',
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


export async function createConsulOrder(prop: createConsulOrderProps) {

    const consulitemId = prop.consulItemId;
    const dataForm = prop.data;
    try {
        if (!consulitemId && !dataForm) {
            throw new Error('Непередан id или дата формы!');
        }

        const consulItem = await prisma.consulProductItem.findFirst({
            where: {
                id: consulitemId,
            }
        })

        if (!consulItem) {
            throw new Error('не найден айтем!');
        }
        const consulProduct = await prisma.consulProduct.findFirst({
            where: {
                id: consulItem.consulProductId
            }
        })
        if (!consulProduct) {
            throw new Error('не найден продукт!');
        }

        /* Создаем заказ */
        const consulorder = await prisma.consulOrder.create({
            data: {
                fullName: prop.data.firstName + ' ' + prop.data.lastName,
                email: prop.data.email,
                phone: prop.data.phone,
                comment: prop.data.comment,
                totalAmount: consulProduct.price!,
                status: OrderStatus.PENDING,
                items: JSON.stringify(consulItem),
            },
        });

        const paymentData = await createPayment({
            amount: consulorder.totalAmount,
            orderId: consulorder.id,
            description: 'Оплата заказа #' + consulorder.id,
        });

        if (!paymentData) {
            throw new Error('Payment data not found');
        }

        await prisma.consulOrder.update({
            where: {
                id: consulorder.id,
            },
            data: {
                paymentId: paymentData.id,
            },
        });

        const paymentUrl = paymentData.confirmation.confirmation_url;
        return paymentUrl;
    } catch (err) {
        console.log('[CreateOrder] Server error', err);
    }
}

