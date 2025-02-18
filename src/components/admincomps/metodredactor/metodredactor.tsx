"use client";

import { motion } from "framer-motion";
import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/shared/ui/button";
import { Plus } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast, Toaster } from "react-hot-toast";

// ✅ Схема валидации
const formSchema = z.object({
    title: z.string().min(3, "Название должно содержать минимум 3 символа"),
    description: z.string().min(10, "Описание должно быть не менее 10 символов"),
    addeddescription: z.string().optional(),
    image: z.any().refine((file) => file instanceof File, "Изображение обязательно"),
});

export default function Metodredactor() {
    const {
        register,
        handleSubmit,
        setValue,
        trigger,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(formSchema),
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // Функция обработки отправки данных
    const onSubmit = async (data: any) => {
        console.log("📤 Отправка данных:", data);

        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        if (data.addeddescription) formData.append("addeddescription", data.addeddescription);
        formData.append("image", data.image);

        try {
            const response = await fetch("/api/admin/metods", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Ошибка загрузки");
            }

            toast.success("Метод успешно загружен!");
            console.log("✅ Метод успешно загружен!");
        } catch (error: any) {
            console.error("❌ Ошибка при отправке:", error);
            toast.error(error.message || "Неизвестная ошибка");
        }
    };

    // Обработка загрузки изображения
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setValue("image", file); // Устанавливаем файл в useForm
            trigger("image"); // Валидируем поле image
            setImagePreview(URL.createObjectURL(file)); // Создаём preview
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full px-5"
        >
            <div className="text-7xl pl-5">Методы исследования</div>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="rounded-md"
            >
                <Toaster position="top-center" reverseOrder={false} />
                <div className="absolute bottom-5 right-5">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="secondary">
                                <Plus />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Создание метода</DialogTitle>
                                <DialogDescription>
                                    Введите данные для нового метода диагностики
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="grid gap-4 py-4">
                                    {/* Название */}
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="title" className="text-right">
                                            Название
                                        </Label>
                                        <Input id="title" {...register("title")} className="col-span-3" />
                                    </div>


                                    {/* Описание */}
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="description" className="text-right">
                                            Описание
                                        </Label>
                                        <Input id="description" {...register("description")} className="col-span-3" />
                                    </div>


                                    {/* Доп. информация */}
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="addeddescription" className="text-left">
                                            Доп. информация
                                        </Label>
                                        <Input
                                            id="addeddescription"
                                            {...register("addeddescription")}
                                            className="col-span-3"
                                        />
                                    </div>

                                    {/* Загрузка изображения */}
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="image" className="text-left">
                                            Изображение
                                        </Label>
                                        <Input
                                            id="image"
                                            type="file"
                                            accept="image/*"
                                            className="col-span-3"
                                            onChange={handleImageChange}
                                        />
                                    </div>


                                    {/* Превью изображения */}
                                    {imagePreview && (
                                        <div className="w-full flex justify-center">
                                            <img
                                                src={imagePreview}
                                                alt="Превью"
                                                className="w-40 h-40 object-cover rounded-md"
                                            />
                                        </div>
                                    )}
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Сохранить</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </motion.div>
        </motion.div>
    );
}
