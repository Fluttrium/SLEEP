import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import React, {useEffect, useState} from "react";
import {Tests} from "@/components/admincomps/TestTable";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

interface TestRedactorProps {
    onClose: () => void;
    test: Tests | null;
}

interface Questions {
    id: number;
    text: string;
    testId: number;
    options: Options[];
}

interface Options {
    id: number;
    text: string;
    score: number;
    questionId: number;
}

interface Results {
    id: number;
    title: string;
    minScore: number;
    maxScore: number;
    links: string[];
    testId: number;
}

export function TestRedactor({onClose, test}: TestRedactorProps) {


    const [questions, setQuestions] = useState<Questions[]>([]);
    const [loading, setLoading] = useState(false);
    const [qloading, setQloading] = useState(false);
    const [oloading, setOloading] = useState(false);
    const [questionstext, setQuestionsText] = useState("");
    const [optionstext, setOptionsText,] = useState("");
    const [optionsScore, setOptionsScore] = useState<number>(0);
    const [error, setError] = useState('');
    const [options, setOptions] = useState<Options[]>([]);
    const id = test!.id;

    const [loadingResult, setLoadingResult] = useState(false);
    const [result, setResult] = useState<Results[]>([]);
    const [errorResult, setErrorResult] = useState('');
    const [resultTitle, setResultTitle] = useState("");
    const [minScoreResult, setMinScoreResult] = useState(0);
    const [maxScoreResult, setMaxScoreResult] = useState(0);
    const [linksResult, setLinksResult] = useState<string[]>([]);


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
                    testId: id
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

    const handleSubmitOption = async (e: React.FormEvent, questionId: number) => {
        e.preventDefault();
        setOloading(true);

        if (!optionstext || !optionsScore) {
            alert("Пожалуйста, заполните все поля");
            setOloading(false);
            return;
        }

        try {
            const response = await fetch("/api/admin/tests/options/postoptions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    questionId: questionId,
                    text: optionstext,
                    score: optionsScore
                }),
            });

            if (!response.ok) {
                throw new Error("Ошибка при создании варианта");
            }

            setQuestionsText("");
            alert("Вариант успешно создан");
            fetchOptions(questionId); // Обновляем список вопросов
        } catch (error) {
            console.error("Ошибка:", error);
            setError("Ошибка при создании вопроса. Пожалуйста, попробуйте еще раз.");
        } finally {
            setOloading(false);
        }
    };


    const handleSubmitResult = async (e: React.FormEvent,) => {
        e.preventDefault();
        setLoadingResult(true);

        if (!optionstext || !optionsScore) {
            alert("Пожалуйста, заполните все поля");
            setOloading(false);
            return;
        }

        try {
            const response = await fetch("/api/admin/tests/result/postresult", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: resultTitle,
                    minScore: minScoreResult,
                    maxScore: maxScoreResult,
                    links: linksResult,
                    testId: id
                }),
            });

            if (!response.ok) {
                throw new Error("Ошибка при создании реэультата");
            }

            setQuestionsText("");
            alert("Результат успешно создан");
            fetchResults(); // Обновляем список вопросов
        } catch (error) {
            console.error("Ошибка:", error);
            setError("Ошибка при создании результата. Пожалуйста, попробуйте еще раз.");
        } finally {
            setLoadingResult(false);
        }
    };

    const fetchQuestions = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/admin/tests/questions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({testId: id}),
            });

            if (!response.ok) {
                throw new Error('Ошибка при получении данных');
            }

            const data = await response.json();
            setQuestions(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchOptions = async (questionId: number) => {
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/admin/tests/options', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({questionId}),
            });

            if (!response.ok) {
                throw new Error('Ошибка при получении данных вариантов');
            }

            const data = await response.json();
            setOptions(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchResults = async () => {
        setLoadingResult(true);
        setErrorResult('');
        const testId = test!.id;

        try {
            const response = await fetch('/api/admin/tests/result', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({testId}),
            });

            if (!response.ok) {
                throw new Error('Ошибка при получении данных результата');
            }

            const data = await response.json();
            setResult(data);
        } catch (err: any) {
            setErrorResult(err.message);
        } finally {
            setLoadingResult(false);
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
            <div className="absolute bottom-0 right-0 rounded-3xl pr-10 pb-10">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size='default'>
                            <Plus/>
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
                <Breadcrumb className='px-5'>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink onClick={onClose}>Список тестов</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator/>
                        <BreadcrumbItem>
                            <BreadcrumbLink>{test.title}</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className='flex flex-row justify-between items-center'>
                <h2 className="text-2xl py-5 ">Редактор теста <p className="text-primary text-3xl">{test.title}</p></h2>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button onClick={fetchResults}>Результаты</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Результаты теста </DialogTitle>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Название</TableHead>
                                        <TableHead>Диапазон значения</TableHead>
                                        <TableHead>Ссылки</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {result.length > 0 ? (
                                        result.map((result: Results) => (
                                            <TableRow key={result.id}>
                                                <TableCell>{result.title}</TableCell>
                                                <TableCell>{result.minScore}-{result.maxScore}</TableCell>
                                                <TableCell>{result.links}</TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={2} className="text-center">
                                                Нет результатов
                                            </TableCell>
                                        </TableRow>
                                    )}
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button>Добавить результат</Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Добавление результата для теста</DialogTitle>
                                            </DialogHeader>
                                            <form onSubmit={(e) => handleSubmitResult(e)}
                                                  className="grid gap-4 py-4">
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="text" className="text-right">
                                                        Название результата
                                                    </Label>
                                                    <Input
                                                        id="text"
                                                        value={resultTitle}
                                                        onChange={(e) => setResultTitle(e.target.value)}
                                                        required
                                                        className="col-span-3"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="score" className="text-right">
                                                        Минимальный бал для результата
                                                    </Label>
                                                    <Input
                                                        id="score"
                                                        type="number"
                                                        value={minScoreResult}
                                                        onChange={(e) => setMinScoreResult(Number(e.target.value))}
                                                        required
                                                        className="col-span-3"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="score" className="text-right">
                                                        Максимальный бал для результата
                                                    </Label>
                                                    <Input
                                                        id="score"
                                                        type="number"
                                                        value={maxScoreResult}
                                                        onChange={(e) => setMaxScoreResult(Number(e.target.value))}
                                                        required
                                                        className="col-span-3"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="text" className="text-right">
                                                        Ссылки для страницы представления результата
                                                    </Label>
                                                    <Input
                                                        id="text"
                                                        value={linksResult}
                                                        onChange={(e) => setLinksResult([e.target.value])}
                                                        required
                                                        className="col-span-3"
                                                    />
                                                </div>
                                                <DialogFooter>
                                                    <Button type="submit" disabled={loadingResult}>
                                                        {oloading ? "Создание..." : "Создать результат"}
                                                    </Button>
                                                </DialogFooter>
                                            </form>
                                        </DialogContent>
                                    </Dialog>
                                </TableBody>
                            </Table>

                        </DialogHeader>
                    </DialogContent>
                </Dialog>
                <div className='flex items-center bg-slate-500 rounded-3xl h-9 w-36 justify-center'>
                    <h1 className='text-slate-50'>Вопросов: {questions.length}</h1>
                </div>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Текст</TableHead>
                        <TableHead>Варианты</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {questions.length > 0 ? (
                        questions.map((question: Questions) => (
                            <TableRow key={question.id}>
                                <TableCell>{question.text}</TableCell>
                                <TableCell>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button onClick={() => fetchOptions(question.id)}>Варианты</Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Варианты ответов</DialogTitle>
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow>
                                                            <TableHead>Текст</TableHead>
                                                            <TableHead>Очки</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {options.length > 0 ? (
                                                            options.map((option: Options) => (
                                                                <TableRow key={option.id}>
                                                                    <TableCell>{option.text}</TableCell>
                                                                    <TableCell>{option.score}</TableCell>
                                                                </TableRow>
                                                            ))
                                                        ) : (
                                                            <TableRow>
                                                                <TableCell colSpan={2} className="text-center">
                                                                    Нет вариантов
                                                                </TableCell>
                                                            </TableRow>
                                                        )}
                                                    </TableBody>
                                                </Table>

                                                <form onSubmit={(e) => handleSubmitOption(e, question.id)}
                                                      className="grid gap-4 py-4">
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="text" className="text-right">
                                                            Текст варианта
                                                        </Label>
                                                        <Input
                                                            id="text"
                                                            value={optionstext}
                                                            onChange={(e) => setOptionsText(e.target.value)}
                                                            required
                                                            className="col-span-3"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="score" className="text-right">
                                                            Очки
                                                        </Label>
                                                        <Input
                                                            id="score"
                                                            type="number"
                                                            value={optionsScore}
                                                            onChange={(e) => setOptionsScore(Number(e.target.value))}
                                                            required
                                                            className="col-span-3"
                                                        />
                                                    </div>
                                                    <DialogFooter>
                                                        <Button type="submit" disabled={oloading}>
                                                            {oloading ? "Создание..." : "Создать вариант"}
                                                        </Button>
                                                    </DialogFooter>
                                                </form>
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>
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