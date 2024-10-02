import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import * as React from "react";
import { format } from "date-fns";
import {Button} from "@/components/ui/button"; // Используем для форматирования дат

interface Tests {
    id: number;
    title: string;
    questions: any[]; // предполагается, что массив вопросов будет возвращен с сервера
    createdAt: string;
    updatedAt: string;
}

export function TestTable() {
    const [tests, setTests] = React.useState<Tests[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/admin/tests");
                const data = await response.json();
                setTests(data);
            } catch (error) {
                console.error("Ошибка при получении данных:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="">Название</TableHead>
                    <TableHead>Количество вопросов</TableHead>
                    <TableHead>Дата создания</TableHead>
                    <TableHead className="text-right">Дата обновления</TableHead>
                    <TableHead>Удалить</TableHead>
                    <TableHead>Редактировать</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {!loading && tests.length > 0 ? (
                    tests.map((test) => (
                        <TableRow className=' ' key={test.id}>
                            <TableCell className="font-medium flex-grow">{test.title}</TableCell>
                            <TableCell className="flex-grow">{test.questions ? test.questions.length : 0}</TableCell>
                            <TableCell className="flex-grow">{format(new Date(test.createdAt), "dd.MM.yyyy HH:mm")}</TableCell>
                            <TableCell className="flex-grow text-right">{format(new Date(test.updatedAt), "dd.MM.yyyy HH:mm")}</TableCell>
                            <TableCell className="flex-none">
                                <Button variant="destructive" size="sm">Удалить</Button>
                            </TableCell>
                            <TableCell className="flex-none">
                                <Button  size="sm">Редактировать</Button>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center">
                            {loading ? "Загрузка..." : "Нет данных"}
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
