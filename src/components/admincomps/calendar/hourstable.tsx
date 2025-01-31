import * as React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface HoursTableProps {
    date: Date | undefined;
    consuls: {
        id: number;
        Time: number;
        Date: number;
        clientId: string;
        ConsulProduct?: {
            title: string;
            doctorID: string;
        };
    }[];
}

const parseTime = (time: number) => ({
    hours: Math.floor(time / 100),
    minutes: time % 100,
});

const formatToYYYYMMDD = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}${month}${day}`;
};

export default function HoursTable({ date, consuls }: HoursTableProps) {
    if (!date) return <div className="p-4 text-gray-500">Выберите дату</div>;

    const targetDate = formatToYYYYMMDD(date);
    const filteredConsuls = consuls.filter(
        (c) => formatToYYYYMMDD(new Date(c.Date)) === targetDate
    );

    // Группировка по часам
    const hoursMap = new Map<number, typeof filteredConsuls>();
    for (let hour = 0; hour < 24; hour++) hoursMap.set(hour, []);
    
    filteredConsuls.forEach(c => {
        const hour = Math.floor(c.Time / 100);
        hoursMap.get(hour)?.push(c);
    });

    return (
        <div className="w-full p-4">
            <Table>
                <TableHeader className="bg-gray-50">
                    <TableRow>
                        <TableHead className="w-[120px]">Время</TableHead>
                        <TableHead>Записи</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {Array.from(hoursMap.entries()).map(([hour, consuls]) => (
                        <TableRow key={hour}>
                            <TableCell className={`font-medium ${consuls.length > 0 ? 'bg-blue-100' : ''}`}>
                                {hour.toString().padStart(2, '0')}:00
                            </TableCell>
                            <TableCell>
                                {consuls.length > 0 ? (
                                    consuls.map((c) => {
                                        const { hours, minutes } = parseTime(c.Time);
                                        return (
                                            <div key={c.id} className="mb-2 p-2 bg-blue-50 rounded-md">
                                                <div className="text-sm">
                                                    <span className="font-medium">
                                                        {c.ConsulProduct?.title || "Консультация"}
                                                    </span>
                                                    <span className="ml-2 text-gray-500 text-xs">
                                                        ({hours.toString().padStart(2, '0')}:
                                                        {minutes.toString().padStart(2, '0')})
                                                    </span>
                                                </div>
                                                {c.ConsulProduct?.doctorID && (
                                                    <div className="text-xs text-gray-400">
                                                        Доктор: {c.ConsulProduct.doctorID}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })
                                ) : (
                                    <span className="text-gray-400">Нет записей</span>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
