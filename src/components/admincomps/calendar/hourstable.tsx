import * as React from "react";
import { consulOrder } from "@prisma/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface HoursTableProps {
    date: Date | undefined;
    consuls: consulOrder[]; // Массив записей
}

export default function HoursTable({ date, consuls }: HoursTableProps) {
    // Создаём массив из 24 часов
    const hours = Array.from({ length: 24 }, (_, i) => i);

    return (
        <div className='w-full '>
            {date ? (
                <>
                    <span>
                        Выбранная дата:{" "}
                        {date.toLocaleDateString("ru-RU", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </span>
                    <div>
                        <Table >
                            <TableCaption>Список консультаций</TableCaption>
                            <TableBody className="w-full">
                                <ScrollArea className="w-full h-72">
                                    {hours.map((hour) => {
                                        // Находим записи для текущего часа
                                        const currentHourConsuls = consuls.filter(
                                            (consul) => Math.floor(consul.Time / 100) === hour
                                        );

                                        return (
                                            <TableRow key={hour}>
                                                <TableCell className="font-medium">
                                                    {hour.toString().padStart(2, "0")}:00
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    {currentHourConsuls.length > 0 ? (
                                                        currentHourConsuls.map((consul) => (
                                                            <div key={consul.id}>{consul.clientId}</div>
                                                        ))
                                                    ) : (
                                                        <span>Нет записи</span>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </ScrollArea>
                            </TableBody>
                        </Table>
                    </div>
                </>
            ) : (
                "Нет выбранной даты"
            )}
        </div>
    );
}
