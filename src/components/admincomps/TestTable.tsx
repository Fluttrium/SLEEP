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
import {format} from "date-fns";
import {Button} from "@/components/ui/button";
import {useTestRedactorStore} from "@/app/admin/_store/adminpageStore";

export interface Tests {
    id: number;
    title: string;
    urltitle: string;
    questions: any[];
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

    const handleDeleteClick = async (testId: number) => {
        try {
            const response = await fetch(`/api/admin/tests?id=${testId}`, { // Передаём ID через строку запроса
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Ошибка: ${response.statusText}`);
            }

            setTests(tests.filter(test => test.id !== testId)); // Обновите локальное состояние
        } catch (error) {
            console.error("Ошибка при удалении теста:", error);
        }
    };


    const {setIsCreating, setCreatedTestId} = useTestRedactorStore();

    const handleEditClick = (test: Tests) => {
        setCreatedTestId(test); // Установите ID теста для редактирования
        setIsCreating(true); // Откройте редактор
    };
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Название</TableHead>
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
                        <TableRow key={test.id}>
                            <TableCell className="font-medium">{test.title}</TableCell>
                            <TableCell>{test.questions ? test.questions.length : 0}</TableCell>
                            <TableCell>{format(new Date(test.createdAt), "dd.MM.yyyy HH:mm")}</TableCell>
                            <TableCell
                                className="text-right">{format(new Date(test.updatedAt), "dd.MM.yyyy HH:mm")}</TableCell>
                            <TableCell>
                                <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(test.id)}>
                                    Удалить
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Button size="sm" onClick={() => handleEditClick(test)}>Редактировать</Button>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center">
                            {loading ? "Загрузка..." : "Нет данных"}
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
