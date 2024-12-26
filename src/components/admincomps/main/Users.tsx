"use client";

import {motion} from "framer-motion";
import * as React from "react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {Button} from "@/components/ui/button";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription} from "@/components/ui/dialog";

export type Users = {
    id: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
    consul: {
        id: number;
        date: string;
        name: string;
        contact: string;
        isRead: boolean;
        body: string;
    }[];
};

export const columns: (
    setDialogData: React.Dispatch<React.SetStateAction<Users["consul"] | null>>,
    setDialogUserId: React.Dispatch<React.SetStateAction<string | null>>,
    handleDeleteUser: (userId: string) => void
) => ColumnDef<Users>[] = (setDialogData, setDialogUserId, handleDeleteUser) => [
    {
        accessorKey: "name",
        header: "Имя",
        cell: ({row}) => <div>{row.getValue("name")}</div>,
    },
    {
        accessorKey: "surname",
        header: "Фамилия",
        cell: ({row}) => <div>{row.getValue("surname")}</div>,
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({row}) => <div>{row.getValue("email")}</div>,
    },
    {
        accessorKey: "consul",
        header: "Сообщения",
        cell: ({row}) => {
            const messages: Users["consul"] = row.getValue("consul") || [];
            const unreadMessages = messages.filter((message) => !message.isRead);

            return (
                <div>
                    <span>Всего сообщений: {messages.length}</span>
                    {unreadMessages.length > 0 && (
                        <span className="text-red-500 font-semibold">Есть непрочитанные сообщения</span>
                    )}
                </div>
            );
        },
    },
    {
        id: "actions",
        cell: ({row}) => {
            const user = row.original;
            return (
                <div className="flex gap-2">
                    <Button
                        onClick={() => {
                            setDialogData(user.consul);
                            setDialogUserId(user.id);
                        }}
                    >
                        Посмотреть обращения
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => handleDeleteUser(user.id)}
                    >
                        Удалить
                    </Button>
                </div>
            );
        },
    },
];

export function Users() {
    const [users, setUsers] = React.useState<Users[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [dialogData, setDialogData] = React.useState<Users["consul"] | null>(null);
    const [dialogUserId, setDialogUserId] = React.useState<string | null>(null);
    const [currentMessageIndex, setCurrentMessageIndex] = React.useState(0);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/admin/users");
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Ошибка при получении данных:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDeleteUser = async (userId: string) => {
        if (!confirm("Вы уверены, что хотите удалить этого пользователя?")) return;

        try {
            const response = await fetch(`/api/admin/users`, {
                method: "POST", // Теперь используем POST вместо DELETE
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({id: userId}), // Передаём ID пользователя в теле запроса
            });

            if (response.ok) {
                setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
                alert("Пользователь успешно удален.");
            } else {
                console.error("Ошибка при удалении пользователя");
                alert("Не удалось удалить пользователя.");
            }
        } catch (error) {
            console.error("Ошибка при выполнении запроса:", error);
        }
    };


    const table = useReactTable({
        data: users,
        columns: columns(setDialogData, setDialogUserId, handleDeleteUser),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            pagination: {
                pageSize: 10, // Количество записей на странице
                pageIndex: 0, // Начальный индекс страницы
            },
        },
    });

    if (loading) {
        return <div>Загрузка...</div>;
    }

    return (
        <motion.div
            initial={{opacity: 0, y: 50}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5, ease: "easeOut"}}
            className="w-full px-5"
        >
            <div className="text-7xl pl-5">Пользователи</div>
            <motion.div
                initial={{opacity: 0, scale: 0.9}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.5}}
                className="rounded-md border"
            >
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={table.getHeaderGroups()[0].headers.length}>
                                    Нет данных.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                {/* Пагинация */}
                <div className="flex items-center justify-between p-2">
                    <Button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Предыдущая
                    </Button>
                    <span>
                        Страница {table.getState().pagination.pageIndex + 1} из{" "}
                        {table.getPageCount()}
                    </span>
                    <Button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Следующая
                    </Button>
                </div>
            </motion.div>

            <Dialog open={!!dialogData} onOpenChange={() => setDialogData(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Текст обращения</DialogTitle>
                        <DialogDescription>
                            {dialogData && dialogData.length > 0 ? (
                                <div>
                                    <p>
                                        <strong>Дата:</strong> {new Date(dialogData[currentMessageIndex].date).toLocaleDateString()}
                                    </p>
                                    <p><strong>Имя:</strong> {dialogData[currentMessageIndex].name}</p>
                                    <p><strong>Контакт:</strong> {dialogData[currentMessageIndex].contact}</p>
                                    <div className="flex justify-between mt-4">
                                        <Button
                                            onClick={() =>
                                                setCurrentMessageIndex((prev) =>
                                                    Math.max(prev - 1, 0)
                                                )
                                            }
                                            disabled={currentMessageIndex === 0}
                                        >
                                            Предыдущее
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                setCurrentMessageIndex((prev) =>
                                                    Math.min(prev + 1, dialogData.length - 1)
                                                )
                                            }
                                            disabled={currentMessageIndex === dialogData.length - 1}
                                        >
                                            Следующее
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                "Сообщения не найдены."
                            )}
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </motion.div>
    );
}
