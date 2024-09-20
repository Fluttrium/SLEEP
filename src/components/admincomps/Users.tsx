"use client"

import { motion } from "framer-motion"
import * as React from "react"
import {
    CaretSortIcon,
    ChevronDownIcon,
    DotsHorizontalIcon,
} from "@radix-ui/react-icons"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const data: Users[] = [
    {
        id: "0",
        name: 'Василий',
        surname: 'Пупкин',
        email: 'vasya@gmail.com',
        phone: '+7(995)-962-71-34',
        statusReport: "Без обращения",
        statusResult: "Тест не пройден",
    },
    {
        id: "1",
        name: 'Артем',
        surname: 'Артемов',
        email: 'art@gmail.com',
        phone: '+7(995)-962-71-34',
        statusReport: "1",
        statusResult: "Результат",
    },
    {
        id: "2",
        name: 'Кирил',
        surname: 'Медников',
        email: 'Kir@gmail.com',
        phone: '+7(995)-962-71-34',
        statusReport: "4",
        statusResult: "Результат",
    },
    {
        id: "3",
        name: 'Олег',
        surname: 'Колотухин',
        email: 'oleg@gmail.com',
        phone: '+7(995)-962-71-34',
        statusReport: "Без обращения",
        statusResult: "Результат",
    },
    {
        id: "4",
        name: 'Дмитрий',
        surname: 'Мельников',
        email: 'dmyt@gmail.com',
        phone: '+7(995)-962-71-34',
        statusReport: "Без обращения",
        statusResult: "Тест не пройден",
    },
    {
        id: "5",
        name: 'Юрий',
        surname: 'Паршев',
        email: 'yuriy@gmail.com',
        phone: '+7(995)-962-71-34',
        statusReport: "Без обращения",
        statusResult: "Тест не пройден",
    },
    {
        id: "6",
        name: 'Артем',
        surname: 'Шатохин',
        email: 'art@gmail.com',
        phone: '+7(995)-962-71-34',
        statusReport: "Без обращения",
        statusResult: "Тест не пройден",
    },
    {
        id: "7",
        name: 'Василий',
        surname: 'Пупкин',
        email: 'vasya@gmail.com',
        phone: '+7(995)-962-71-34',
        statusReport: "Без обращения",
        statusResult: "Тест не пройден",
    },
    {
        id: "8",
        name: 'Артем',
        surname: 'Артемов',
        email: 'art@gmail.com',
        phone: '+7(995)-962-71-34',
        statusReport: "1",
        statusResult: "Результат",
    },
    {
        id: "9",
        name: 'Кирил',
        surname: 'Медников',
        email: 'Kir@gmail.com',
        phone: '+7(995)-962-71-34',
        statusReport: "4",
        statusResult: "Результат",
    },
    {
        id: "10",
        name: 'Олег',
        surname: 'Колотухин',
        email: 'oleg@gmail.com',
        phone: '+7(995)-962-71-34',
        statusReport: "Без обращения",
        statusResult: "Результат",
    },
    {
        id: "11",
        name: 'Дмитрий',
        surname: 'Мельников',
        email: 'dmyt@gmail.com',
        phone: '+7(995)-962-71-34',
        statusReport: "Без обращения",
        statusResult: "Тест не пройден",
    },
    {
        id: "12",
        name: 'Юрий',
        surname: 'Паршев',
        email: 'yuriy@gmail.com',
        phone: '+7(995)-962-71-34',
        statusReport: "Без обращения",
        statusResult: "Тест не пройден",
    },
    {
        id: "13",
        name: 'Артем',
        surname: 'Шатохин',
        email: 'art@gmail.com',
        phone: '+7(995)-962-71-34',
        statusReport: "Без обращения",
        statusResult: "Тест не пройден",
    },

]

export type Users = {
    id: string
    name: string
    surname: string
    email: string
    phone: string
    statusReport: string
    statusResult: string

}

export const columns: ColumnDef<Users>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: "Имя",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "surname",
        header: "Фамилия",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("surname")}</div>
        ),
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
        accessorKey: "phone",
        header: "Телефон",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("phone")}</div>
        ),
    },
    {
        accessorKey: "statusReport",
        header: "Сообщения",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("statusReport")}</div>
        ),
    },
    {
        accessorKey: "statusResult",
        header: "Тест",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("statusResult")}</div>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const payment = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Открыть меню</span>
                            <DotsHorizontalIcon className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Действия</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(payment.id)}
                        >
                            Скопировать ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Посмотреть результат теста</DropdownMenuItem>
                        <DropdownMenuItem>Посмотреть текст обращения</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export function Users() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const pageSize = 8

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    React.useEffect(() => {
        table.setPageSize(pageSize)
    }, [pageSize, table])

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full px-5"
        >
            <div className='text-7xl pl-5'>Пользователи</div>
            <div className="flex items-center py-4">
                <Input
                    placeholder="Поиск..."
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value: any) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="rounded-md border"
            >
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <motion.tr
                                    key={row.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: row.index * 0.05 }}
                                    className={row.getIsSelected() ? "bg-gray-100" : ""}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </motion.tr>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    Нет результатов.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </motion.div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} из{" "}
                    {table.getFilteredRowModel().rows.length} строк выбрано.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Назад
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Следующая
                    </Button>
                </div>
            </div>
        </motion.div>
    )
}