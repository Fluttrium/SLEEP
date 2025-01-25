"use client"
import {useForm} from "react-hook-form"
import Link from "next/link"
import {Button} from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"
import {registerUser} from "@/app/actions";
import {useRouter} from "next/navigation";
import {signIn} from "next-auth/react";
import {Checkbox} from "@/components/ui/checkbox";

// Схема валидации с помощью zod
const formSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

type FormData = z.infer<typeof formSchema>;

import { useState } from "react";

export function SignUpForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });
    const [isChecked, setIsChecked] = useState(false); // Состояние чекбокса
    const router = useRouter();

    const onSubmit = async (data: FormData) => {
        try {
            await registerUser({
                name: `${data.firstName} ${data.lastName}`,
                email: data.email,
                password: data.password,
            });
            router.push(`/signup/checktoken`);
        } catch (error) {
            console.error("Registration error:", error);
            alert("Error: " + (error as Error).message);
        }
    };

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-xl">Регистрация</CardTitle>
                <CardDescription>
                    Введите информацию о себе для регистрации
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="first-name">Имя</Label>
                                <Input
                                    id="first-name"
                                    placeholder="Иван"
                                    {...register("firstName")}
                                    required
                                />
                                {errors.firstName && <div>{errors.firstName.message}</div>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="last-name">Фамилия</Label>
                                <Input
                                    id="last-name"
                                    placeholder="Иванов"
                                    {...register("lastName")}
                                    required
                                />
                                {errors.lastName && <div>{errors.lastName.message}</div>}
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                {...register("email")}
                                required
                            />
                            {errors.email && <div>{errors.email.message}</div>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Пароль</Label>
                            <Input
                                id="password"
                                type="password"
                                {...register("password")}
                                required
                            />
                            {errors.password && <div>{errors.password.message}</div>}
                        </div>
                        <div className="mt-4 text-xs flex flex-col items-center gap-2">
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="terms"
                                    checked={isChecked}
                                    onCheckedChange={(checked) => setIsChecked(!!checked)} // Обновляем состояние чекбокса
                                />
                                <span>
                  Я ознакомился с{" "}
                                    <a
                                        href="/files/personal_data_policy.pdf"
                                        download="Политика_персональных_данных.pdf"
                                        className="underline text-primary cursor-pointer"
                                    >
                    Политикой обработки персональных данных
                  </a>{" "}
                                    и принимаю её условия.
                </span>
                            </div>
                        </div>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={!isChecked} // Кнопка активируется только при нажатии на чекбокс
                        >
                            Создать аккаунт
                        </Button>
                        <Button variant="outline" className="w-full" onClick={() => signIn("yandex")}>
                            Войти с помощью яндекс
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Уже есть аккаунт?{" "}
                        <Link href="/signin" className="underline">
                            Войти
                        </Link>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

