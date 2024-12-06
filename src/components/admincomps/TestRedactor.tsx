import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React, { useEffect, useState } from "react";
import { Tests } from "@/components/admincomps/TestTable";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface TestRedactorProps {
    onClose: () => void;
    test: Tests | null;
}

interface Questions {
    id: number;
    text: string;
    testId: number;
}

export function TestRedactor({ onClose, test }: TestRedactorProps) {
    const [questions, setQuestions] = useState<Questions[]>([]);
    const [loading, setLoading] = useState(false);
    const [qloading, setQloading] = useState(false);
    const [error, setError] = useState("");
    const [questionstext, setQuestionsText] = useState("");

    const id = test!.id;

    // Удаление вопроса
    const handleDeleteQuestion = async (questionId: number) => {
        if (confirm("Вы уверены, что хотите удалить этот вопрос?")) {
            setLoading(true);
            try {
                const response = await fetch(`/api/admin/tests/questions?id=${questionId}`, {
                    method: "DELETE",
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Ошибка при удалении вопроса");
                }

                alert("Вопрос успешно удален");
                fetchQuestions(); // Обновляем список вопросов
            } catch (error: any) {
                console.error("Ошибка:", error);
                setError(error.message || "Ошибка при удалении вопроса. Пожалуйста, попробуйте еще раз.");
            } finally {
                setLoading(false);
            }
        }
    };

    // Создание вопроса
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setQloading(true);

        if (!questionstext) {
            alert("Пожалуйста, заполните все поля");
            setQloading(false);
            return;
        }

        try {
            const response = await fetch("/api/admin/tests/postquestions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    text: questionstext,
                    testId: id,
                }),
            });

            if (!response.ok) {
                throw new Error("Ошибка при создании вопроса");
            }

            setQuestionsText("");
            alert("Вопрос успешно создан");
            fetchQuestions(); // Обновляем список вопросов
        } catch (error) {
            console.error("Ошибка:", error);
            setError("Ошибка при создании вопроса. Пожалуйста, попробуйте еще раз.");
        } finally {
            setQloading(false);
        }
    };

    // Получение списка вопросов
    const fetchQuestions = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/admin/tests/questions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ testId: id }),
            });

            if (!response.ok) {
                throw new Error("Ошибка при получении данных");
            }

            const data = await response.json();
            setQuestions(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, [test]);

    if (!test) {
        return null;
    }

    return (
        <div className="relative h-full">
            <div className="absolute bottom-0 right-0 rounded-3xl pr-10 pb-10 z-50">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size="default" variant="secondary" className="border-blue-700 border-4">
                            <Plus />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Добавьте вопрос к тесту</DialogTitle>
                            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="text" className="text-right">
                                        Текст вопроса
                                    </Label>
                                    <Input
                                        id="text"
                                        value={questionstext}
                                        onChange={(e) => setQuestionsText(e.target.value)}
                                        required
                                        className="col-span-3"
                                    />
                                </div>
                                <DialogFooter>
                                    <Button type="submit" disabled={qloading}>
                                        {qloading ? "Создание..." : "Создать вопрос"}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="relative h-max flex items-center pt-5 ">
                <Breadcrumb className="px-5">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink onClick={onClose}>Список тестов</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink>{test.title}</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="flex flex-row justify-between items-center">
                <h2 className="text-2xl py-5 ">
                    Редактор теста <p className="text-primary text-3xl">{test.title}</p>
                </h2>
                <div className="flex items-center bg-slate-500 rounded-3xl h-9 w-36 justify-center">
                    <h1 className="text-slate-50">Вопросов: {questions.length}</h1>
                </div>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Текст</TableHead>
                        <TableHead>Действия</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {questions.length > 0 ? (
                        questions.map((question: Questions) => (
                            <TableRow key={question.id}>
                                <TableCell>{question.text}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="destructive"
                                        onClick={() => handleDeleteQuestion(question.id)}
                                    >
                                        Удалить
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={2} className="text-center">
                                Нет вопросов
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
