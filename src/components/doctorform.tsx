import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import React, {useState} from "react";
import { z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Calendar} from "@/components/ui/calendar"
import {useSession} from "next-auth/react";
import InputMask from "react-input-mask";


export default function DoctorForm() {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const session = useSession();
    const authorId = session?.data?.user?.id as string;


    const formSchema = z.object({
        date: z.preprocess(
            (value) => (value ? new Date(value as string) : undefined), // Преобразование строки или `undefined` в `Date`
            z.date().min(
                new Date(new Date().setDate(new Date().getDate() + 1)),
                "Выберите дату не раньше завтрашнего дня"
            )
        ),
        name: z.string().nonempty("Введите имя"),
        number: z
            .string()
            .nonempty("Введите номер телефона")
            .regex(/^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/, "Введите корректный номер телефона"),
    });


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            date: undefined,
            name: "",
            number: "+7",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!authorId) {
            alert("Вы должны быть авторизованы, чтобы создать запись.");
            return;
        }

        try {
            const response = await fetch("/api/consul", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...values,
                    authorId, // Добавление authorId к данным формы
                }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Успешно отправлено:", result);
                alert("Запись успешно создана!");
                setSelectedDate(undefined);
                form.reset();
                document.dispatchEvent(new MouseEvent("mousedown", {bubbles: true})); // Закрыть диалог

            } else {
                console.error("Ошибка при отправке:", response.statusText);
                alert("Произошла ошибка при создании записи.");
            }
        } catch (error) {
            console.error("Ошибка при отправке:", error);
            alert("Произошла ошибка. Попробуйте позже.");
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild={true}>
                <Button className="text-xl font-semibold">Записаться на консультацию</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Форма записи</DialogTitle>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 flex flex-col w-full justify-center"
                    >
                        {/* Поле для выбора даты */}
                        <FormField
                            control={form.control}
                            name="date"
                            render={({field}) => (
                                <FormItem className='flex justify-center  w-min flex-col'>
                                    <FormLabel>Дата</FormLabel>
                                    <FormControl>
                                        <Calendar
                                            mode="single"
                                            selected={selectedDate}
                                            onSelect={(date) => {
                                                setSelectedDate(date);
                                                field.onChange(date?.toISOString() || ""); // Связь с React Hook Form
                                            }}
                                            disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() + 1))} // Блокировка дат ранее завтрашнего дня
                                            className="rounded-md border flex flex-col w-full justify-center"
                                        />

                                    </FormControl>
                                    <FormDescription>Выберите дату консультации.</FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        {/* Поле для ввода имени */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Имя</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Введите имя" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        {/* Поле для ввода номера телефона */}
                        <FormField
                            control={form.control}
                            name="number"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Номер телефона</FormLabel>
                                    <FormControl>
                                        <InputMask
                                            mask="+7 (999) 999-99-99"
                                            placeholder="+7 (___) ___-__-__"
                                            {...field}
                                        >
                                            {(inputProps) => <Input {...inputProps} />}
                                        </InputMask>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <Button type="submit">Отправить</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
