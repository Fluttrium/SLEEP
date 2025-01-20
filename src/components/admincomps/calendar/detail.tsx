import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import * as React from "react";
import { ConsulOrder } from "@prisma/client";

interface DatailOfConsulProps {
    consulsbyhour: ConsulOrder[]; // Массив записей
}

export default function DatailOfConsul({ consulsbyhour }: DatailOfConsulProps) {
    return (
        <Table>
            <TableCaption>Детали консультаций</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Клиент</TableHead>
                    <TableHead className="text-right">Сообщение</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {consulsbyhour.map((consul: ConsulOrder) => (
                    <TableRow key={consul.id}>
                        <TableCell className="font-medium">{consul.id}</TableCell>
                        <TableCell>{consul.Paid ? "Оплачено" : "Не оплачено"}</TableCell>
                        <TableCell>{consul.clientId}</TableCell>
                        <TableCell className="text-right">{consul.message}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
