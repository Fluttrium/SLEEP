import { ConsulProduct } from "@prisma/client";
import { EllipsisVertical } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";

type TimeSlot = {
    start: string;
    end: string;
};

type DateSlots = {
    [key: string]: TimeSlot[];
};

interface DocconsulCompProps {
    consul: ConsulProduct;
}

export default function DocconsulComp({ consul }: DocconsulCompProps): JSX.Element {
    const [dates, setDates] = useState<DateObject[]>([]);
    const [timeSlots, setTimeSlots] = useState<DateSlots>({});
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isDialogOpen) {
            loadExistingSlots();
        }
    }, [isDialogOpen]);

    const loadExistingSlots = async () => {
        try {
            const response = await fetch(`/api/admin/consul-slots/${consul.id}`);
            const data = await response.json();

            if (data.status === "success") {
                const newTimeSlots: DateSlots = {};
                const newDates: DateObject[] = [];

                data.items.forEach((item: any) => {
                    const dateStart = new Date(item.dateStart);
                    const dateEnd = new Date(item.dateEnd);

                    const dateKey = dateStart.toISOString().split("T")[0];
                    const timeSlot = {
                        start: dateStart.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
                        end: dateEnd.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
                    };

                    if (!newTimeSlots[dateKey]) {
                        newTimeSlots[dateKey] = [];
                        newDates.push(new DateObject(dateKey));
                    }

                    newTimeSlots[dateKey].push(timeSlot);
                });

                setTimeSlots(newTimeSlots);
                setDates(newDates);
                setError(null);
            } else {
                setError("Не удалось загрузить временные слоты.");
            }
        } catch (error) {
            setError("Произошла ошибка при загрузке данных.");
            console.error("Ошибка загрузки слотов:", error);
        }
    };

    const handleDialogOpen = (open: boolean) => {
        setIsDialogOpen(open);
        if (!open) {
            resetState();
        }
    };

    const resetState = () => {
        setTimeSlots({});
        setDates([]);
        setError(null);
    };

    const handleDateChange = (newDates: DateObject[]) => {
        const newSlots: DateSlots = {};
        newDates.forEach((date) => {
            const dateStr = date.format();
            newSlots[dateStr] = timeSlots[dateStr] || [];
        });
        setTimeSlots(newSlots);
        setDates(newDates);
    };

    const addTimeSlot = (dateStr: string) => {
        setTimeSlots((prev) => ({
            ...prev,
            [dateStr]: [...(prev[dateStr] || []), { start: "10:00", end: "11:00" }],
        }));
    };

    const updateTimeSlot = (dateStr: string, index: number, field: "start" | "end", value: string) => {
        setTimeSlots((prev) => ({
            ...prev,
            [dateStr]: prev[dateStr].map((slot, i) =>
                i === index ? { ...slot, [field]: value } : slot
            ),
        }));
    };

    const isValidTimeSlot = (start: string, end: string) => {
        const startDate = new Date(`1970-01-01T${start}:00`);
        const endDate = new Date(`1970-01-01T${end}:00`);
        return startDate < endDate;
    };

    const submitSlots = async () => {
        const slotsToSend = [];

        for (const [dateStr, slots] of Object.entries(timeSlots)) {
            for (const slot of slots) {
                if (!isValidTimeSlot(slot.start, slot.end)) {
                    alert(`Некорректный временной интервал для ${dateStr}`);
                    return;
                }

                const startDateTime = new Date(`${dateStr} ${slot.start}`);
                const endDateTime = new Date(`${dateStr} ${slot.end}`);

                slotsToSend.push({
                    dateStart: startDateTime.toISOString(),
                    dateEnd: endDateTime.toISOString(),
                });
            }
        }

        try {
            await fetch(`/api/admin/consul-slots/${consul.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(slotsToSend),
            });
            alert("Расписание успешно сохранено!");
            resetState();
        } catch (error) {
            console.error("Ошибка при сохранении:", error);
            alert("Произошла ошибка при сохранении расписания.");
        }
    };

    return (
        <div className="rounded-3xl shadow-lg border p-4 flex flex-row items-center relative">
            <div className="flex flex-col">
                <h1 className="text-xl font-bold mb-2">{consul.title}</h1>
                <p className="mb-2">{consul.description}</p>
                <p className="font-semibold mb-4">Цена: {consul.price} руб.</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={handleDialogOpen}>
                <DialogTrigger>
                    <EllipsisVertical className="absolute top-2 right-3" />
                </DialogTrigger>

                <DialogContent>
                    <DialogTitle className="text-center">Заполните временные возможности</DialogTitle>
                    <div>
                        <div style={{ textAlign: "center" }}>
                            <DatePicker
                                value={dates}
                                onChange={handleDateChange}
                                multiple
                                sort
                                calendarPosition="bottom-center"
                                plugins={[<DatePanel />]}
                            />
                        </div>

                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                        {Object.entries(timeSlots).map(([dateStr, slots]) => (
                            <div key={dateStr} className="mt-4 p-4 border rounded">
                                <h3 className="font-bold mb-2">
                                    {new Date(dateStr).toLocaleDateString("ru-RU", {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </h3>
                                {slots.map((slot, index) => (
                                    <div key={index} className="flex gap-2 mb-2 items-center">
                                        <TimePicker
                                            value={slot.start}
                                            onChange={(v) => updateTimeSlot(dateStr, index, "start", v || "10:00")}
                                        />
                                        <span>-</span>
                                        <TimePicker
                                            value={slot.end}
                                            onChange={(v) => updateTimeSlot(dateStr, index, "end", v || "11:00")}
                                        />
                                        <button
                                            onClick={() =>
                                                setTimeSlots((prev) => ({
                                                    ...prev,
                                                    [dateStr]: prev[dateStr].filter((_, i) => i !== index),
                                                }))
                                            }
                                            className="text-red-500 ml-2"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={() => addTimeSlot(dateStr)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded"
                                >
                                    Добавить время
                                </button>
                            </div>
                        ))}

                        <button
                            onClick={submitSlots}
                            className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
                        >
                            Сохранить расписание
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
