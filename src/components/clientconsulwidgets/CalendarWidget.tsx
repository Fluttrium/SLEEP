"use client";

import {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useRouter} from "next/navigation";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {checkoutConsulSchema} from "@/constants/checkout-consul-schema";
import {z} from "zod";
import {createConsulOrder} from "@/app/actions";

interface ConsulProductWithItems {
    id: number;
    title: string;
    ConsulProductItem: {
        id: number;
        dateStart: Date;
        dateEnd: Date;
    }[];
}

export default function CalendarWidget({doctorId}: { doctorId: string }) {
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [timeSlots, setTimeSlots] = useState<Date[]>([]);
    const [products, setProducts] = useState<ConsulProductWithItems[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [timeLoading, setTimeLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedTime, setSelectedTime] = useState<Date | null>(null);

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<z.infer<typeof checkoutConsulSchema>>({
        resolver: zodResolver(checkoutConsulSchema),
    });

    // Загрузка доступных продуктов консультаций
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("/api/userconsul/doctors", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({doctorId}),
                });

                if (!response.ok) {
                    throw new Error("Не удалось загрузить доступные даты");
                }

                const data = await response.json();
                setProducts(data.length > 0 ? data : []);
                setError(data.length === 0 ? "Нет доступных записей для этого врача" : null);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Произошла ошибка при загрузке данных"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [doctorId]);

    // Обработчик изменения даты
    const handleDateChange = (date: Date | null) => {
        if (!date) return;

        setSelectedDate(date);
        setTimeLoading(true);

        try {
            const slots = products
                .flatMap((product) => product.ConsulProductItem)
                .filter((item) => {
                    const itemDate = new Date(item.dateStart);
                    return (
                        itemDate.getDate() === date.getDate() &&
                        itemDate.getMonth() === date.getMonth() &&
                        itemDate.getFullYear() === date.getFullYear()
                    );
                })
                .map((item) => new Date(item.dateStart))
                .sort((a, b) => a.getTime() - b.getTime());

            setTimeSlots(slots);
        } catch (err) {
            setError("Ошибка обработки временных слотов");
        } finally {
            setTimeLoading(false);
        }
    };

    // Отправка формы
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data: z.infer<typeof checkoutConsulSchema>) => {
        // Проверяем наличие выбранного времени
        if (!selectedTime) {
            setError("Не выбрано время консультации");
            return;
        }

        try {
            setIsSubmitting(true);
            setError(null);

            // Ищем выбранный временной слот
            const selectedItem = products
                .flatMap((product) => product.ConsulProductItem)
                .find((item) => {
                    const itemTime = new Date(item.dateStart);
                    return itemTime.getTime() === selectedTime.getTime();
                });

            // Проверяем доступность слота
            if (!selectedItem) {
                throw new Error("Выбранный временной слот больше не доступен");
            }

            // Создаем заказ и получаем платежную ссылку
            const paymentUrl = await createConsulOrder({
                consulItemId: selectedItem.id,  // Исправленное имя параметра
                data: data
            });

            // Перенаправляем на страницу оплаты
            window.location.href = paymentUrl!;

        } catch (err) {
            // Обработка ошибок
            const errorMessage = err instanceof Error
                ? err.message
                : "Произошла неизвестная ошибка при создании записи";

            setError(errorMessage);
            console.error("Ошибка создания заказа:", err);

            // Для production-окружения можно отправить ошибку в систему мониторинга
            // trackError(err);

        } finally {
            // Сбрасываем состояния
            setIsSubmitting(false);
            setDialogOpen(false);
            reset();
        }
    };

    // Состояния загрузки
    if (loading) {
        return (
            <div className="text-center py-8">
                <div
                    className="spinner-border text-blue-600 animate-spin inline-block w-8 h-8 border-4 rounded-full"
                    role="status"
                >
                    <span className="visually-hidden">Загрузка...</span>
                </div>
                <p className="mt-4 text-gray-600">Загрузка доступных дат...</p>
            </div>
        );
    }

    // Обработка ошибок
    if (error) {
        return (
            <div className="text-center py-8 text-red-600">
                <p className="font-semibold">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Попробовать снова
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-8 bg-white rounded-2xl shadow-2xl">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-12 text-center">
                Выберите удобное время для консультации
            </h2>

            <div className="mb-12">
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    inline
                    minDate={new Date()}
                    includeDates={products.flatMap((product) =>
                        product.ConsulProductItem.map((item) => new Date(item.dateStart))
                    )}
                    filterDate={(date) =>
                        products.some((product) =>
                            product.ConsulProductItem.some(
                                (item) =>
                                    new Date(item.dateStart).toDateString() === date.toDateString()
                            )
                        )
                    }
                    calendarClassName="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg p-6"
                    renderCustomHeader={({
                                             date,
                                             decreaseMonth,
                                             increaseMonth,
                                             prevMonthButtonDisabled,
                                             nextMonthButtonDisabled,
                                         }) => (
                        <div className="flex items-center justify-between px-4 py-3 bg-white rounded-t-lg shadow-sm">
                            <button
                                onClick={decreaseMonth}
                                disabled={prevMonthButtonDisabled}
                                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <svg
                                    className="w-6 h-6 text-gray-700"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                            </button>

                            <span className="text-xl font-bold text-gray-800">
                {date.toLocaleDateString("ru-RU", {
                    month: "long",
                    year: "numeric",
                }).replace(" г.", "")}
              </span>

                            <button
                                onClick={increaseMonth}
                                disabled={nextMonthButtonDisabled}
                                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <svg
                                    className="w-6 h-6 text-gray-700"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </button>
                        </div>
                    )}
                    dayClassName={(date) => `
            text-lg font-medium 
            ${
                        products.some((product) =>
                            product.ConsulProductItem.some(
                                (item) =>
                                    new Date(item.dateStart).toDateString() === date.toDateString()
                            )
                        )
                            ? "hover:bg-blue-100 rounded-lg transition-colors"
                            : "text-gray-400 cursor-not-allowed"
                    }
            ${
                        date.toDateString() === selectedDate?.toDateString()
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "text-gray-800"
                    }
          `}
                />
            </div>

            {selectedDate && (
                <div className="mt-12 border-t-2 border-gray-100 pt-12">
                    <h3 className="text-2xl font-bold text-gray-900 mb-8">
                        {selectedDate.toLocaleDateString("ru-RU", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                        })}
                    </h3>

                    {timeLoading ? (
                        <div className="flex justify-center items-center space-x-3">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            <span className="text-gray-600 text-lg">
                Загружаем доступное время...
              </span>
                        </div>
                    ) : timeSlots.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                                {timeSlots.map((slot, index) => (
                                    <DialogTrigger
                                        key={index}
                                        asChild
                                        onClick={() => setSelectedTime(slot)}
                                    >
                                        <button
                                            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg border-2 border-blue-50 hover:border-blue-200 transition-all">
                                            {slot.toLocaleTimeString("ru-RU", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </button>
                                    </DialogTrigger>
                                ))}

                                <DialogContent className="max-w-md p-6">
                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Имя
                                            </label>
                                            <input
                                                {...register("firstName")}
                                                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                            {errors.firstName && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.firstName.message}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Фамилия
                                            </label>
                                            <input
                                                {...register("lastName")}
                                                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                            {errors.lastName && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.lastName.message}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                {...register("email")}
                                                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                            {errors.email && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.email.message}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Телефон
                                            </label>
                                            <input
                                                type="tel"
                                                {...register("phone")}
                                                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                            {errors.phone && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.phone.message}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Комментарий (необязательно)
                                            </label>
                                            <textarea
                                                {...register("comment")}
                                                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                rows={3}
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                                        >
                                            Перейти к оплате
                                        </button>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-xl">
                            <p className="text-gray-600 text-lg">
                                Нет доступных слотов для записи на этот день
                            </p>
                        </div>
                    )}
                </div>
            )}

            {error && (
                <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-lg">{error}</div>
            )}
        </div>
    );
}