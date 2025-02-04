import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import * as React from "react";

// Интерфейс для данных из модели ConsulProductItem
interface ConsulProductItem {
    id: number;
    dateStart: string; // DateTime преобразуется в строку при передаче
    dateEnd: string;
    consulProductId: number;
    ConsulProduct: {
        title?: string;
        description: string;
        doctorID: string;
        image?: string;
        price?: number;
    };
}

// Пример интерфейса данных из API
interface ApiConsulOrder {
    id: number;
    Time: number;
    Date: number;
    clientId: string;
}

// Функция преобразования данных
const transformConsulData = (data: ApiConsulOrder[]): ConsulProductItem[] => {
    return data.map((item) => ({
        id: item.id,
        dateStart: new Date(item.Time).toLocaleString(), 
        dateEnd: new Date(item.Date).toLocaleString(), 
        consulProductId: parseInt(item.clientId), // Преобразование clientId в число
        ConsulProduct: {
            title: "Пример продукта", // Добавь сюда логику получения названия продукта
            description: "Описание продукта",
            doctorID: "Доктор", // Пример, можешь заменить на актуальные данные
        },
    }));
}

interface DetailOfConsulProps {
    consuls: ApiConsulOrder[]; // Ожидаемые данные из API
}

export default function DetailOfConsul({ consuls }: DetailOfConsulProps) {
    const consulsbyhour = transformConsulData(consuls); // Преобразуем данные

    return (
        <Table>
            <TableCaption>Детали консультаций</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Начало</TableHead>
                    <TableHead>Конец</TableHead>
                    <TableHead>Продукт</TableHead>
                    <TableHead>Доктор</TableHead>
                    <TableHead className="text-right">Цена</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {consulsbyhour.map((consul) => (
                    <TableRow key={consul.id}>
                        <TableCell className="font-medium">{consul.id}</TableCell>
                        <TableCell>{consul.dateStart}</TableCell>
                        <TableCell>{consul.dateEnd}</TableCell>
                        <TableCell>{consul.ConsulProduct?.title || "Без названия"}</TableCell>
                        <TableCell>{consul.ConsulProduct?.doctorID}</TableCell>
                        <TableCell className="text-right">
                            {consul.ConsulProduct?.price ? `${consul.ConsulProduct.price} ₽` : "Не указана"}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
