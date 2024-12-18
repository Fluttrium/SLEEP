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
import {Plus, Settings} from "lucide-react";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Post, User} from "@prisma/client";

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
    minDisease: Diseas[];
    maxDisease: Diseas[];
}


interface Diseas {
    id: number;
    title: string;
    testId: number;
    test: Tests | null;
    posts: Post[];
    doctors: User[];
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
    const [result, setResult] = useState<Diseas[]>([]);
    const [errorResult, setErrorResult] = useState('');
    const [resultTitle, setResultTitle] = useState("");
    const [doctorsList, setDoctorsList] = useState<User[]>([]);
    const [desiesDoctor, setDesiesDoctor] = useState<User>();
    const [postsList, setPostsList] = useState<Post[]>([]);
    const [desiesPosts, setDesiesPosts] = useState<Post>();
    const [dloading, setDloading] = useState(false);

    const [selectedmaxDiseases, setSelectedmaxDiseases] = useState<number[]>([]);

    const [selectedminDiseases, setSelectedminDiseases] = useState<number[]>([]);
    const handleChange = async (post: Post | null, doctor: User | null) => {
        console.log("handleChange called with:", post, doctor);
        if (!doctor || !post) {
            return setError("Doctor not found");
        } else {
            setDesiesDoctor(doctor);
            setDesiesPosts(post);
        }

    };

    const handleminDiseaseSelect = (e: React.ChangeEvent<HTMLInputElement>, diseaseId: number) => {
        setSelectedminDiseases((prev) =>
            e.target.checked
                ? [...prev, diseaseId] // Добавляем выбранное значение
                : prev.filter((id) => id !== diseaseId) // Убираем, если отменили выбор
        );
    };

    const handlemaxDiseaseSelect = (e: React.ChangeEvent<HTMLInputElement>, diseaseId: number) => {
        setSelectedmaxDiseases((prev) =>
            e.target.checked
                ? [...prev, diseaseId] // Добавляем выбранное значение
                : prev.filter((id) => id !== diseaseId) // Убираем, если отменили выбор
        );
    };

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

        if (!optionstext.trim()) {
            alert("Пожалуйста, заполните текст варианта");
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
                    questionId,
                    text: optionstext,
                    score: optionsScore !== undefined ? optionsScore : 0, // Убедитесь, что score передается
                    maxDisease: selectedmaxDiseases.length > 0 ? selectedmaxDiseases : [],
                    minDisease: selectedminDiseases.length > 0 ? selectedminDiseases : [],
                }),
            });

            if (!response.ok) {
                throw new Error("Ошибка при создании варианта");
            }

            setOptionsText("");
            setOptionsScore(0);
            setSelectedmaxDiseases([]);
            setSelectedminDiseases([]);
            alert("Вариант успешно создан");
            fetchOptions(questionId); // Обновляем список вариантов
        } catch (error) {
            console.error("Ошибка:", error);
            setError("Ошибка при создании варианта. Пожалуйста, попробуйте еще раз.");
        } finally {
            setOloading(false);
        }
    };

    const fetchdoctorsnposts = async () => {
        try {
            const response = await fetch("/api/admin/tests/getdocnpost")
            if (!response.ok) {
                throw new Error('Ошибка при получении данных');
            }
            const data = await response.json();

            setDoctorsList(data.doctors);
            setPostsList(data.posts);

        } catch (error) {
        }

    }

    const handleSubmitResult = async (e: React.FormEvent,) => {
        e.preventDefault();
        setLoadingResult(true);

        if (!resultTitle) {
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

    const handleUpdateDesies = async (e: React.FormEvent, diseaseId: number) => {
        e.preventDefault();
        setDloading(true);

        if (!desiesDoctor || !desiesDoctor.id || !desiesPosts || !desiesPosts.id) {
            alert("Выберите врача и статью перед сохранением.");
            setDloading(false);
            return;
        }

        try {
            const response = await fetch("/api/admin/tests/getdocnpost", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    diseaseId, // ID диагноза
                    doctor: {id: desiesDoctor.id},
                    post: {id: desiesPosts.id},
                }),
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.error || "Ошибка при обновлении диагноза");
            }

            alert("Обновление успешно выполнено");
        } catch (error) {
            console.error("Ошибка:", error);
            setError("Ошибка при обновлении данных. Пожалуйста, попробуйте ещё раз.");
        } finally {
            setDesiesDoctor(undefined);
            setDesiesPosts(undefined);
            setDloading(false);
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
        fetchdoctorsnposts();
    }, [test]);

    if (!test) {
        return null;
    }

    return (
        <div className="relative h-full">
            <div className="absolute bottom-0 right-0 rounded-3xl pr-10 pb-10 z-50">
                <Dialog
                >
                    <DialogTrigger asChild>
                        <Button size='default' variant='secondary' className='border-blue-700 border-4'>
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
                <Dialog
                >
                    <DialogTrigger asChild>
                        <Button onClick={fetchResults}>Диагнозы </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Диагнозы теста </DialogTitle>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Название</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {result.length > 0 ? (
                                        result.map((result: Diseas) => (
                                            <TableRow key={result.id}>
                                                <TableCell
                                                    className='flex flex-row justify-between mx-3 text-xl'>{result.title}

                                                    <Dialog onOpenChange={(isOpen) => {
                                                        if (!isOpen) {
                                                            setDesiesDoctor(undefined); // Сбрасываем выбранного врача
                                                            setDesiesPosts(undefined); // Сбрасываем выбранную статью
                                                        }
                                                    }}>
                                                        <DialogTrigger asChild>
                                                            <div
                                                                className="bg-primary rounded -2xl"
                                                                onClick={() =>
                                                                    handleChange(
                                                                        result.posts.length > 0 ? result.posts[0] : null,
                                                                        result.doctors.length > 0 ? result.doctors[0] : null
                                                                    )
                                                                }
                                                            >
                                                                <Settings color="white" className="m-1"/>
                                                            </div>
                                                        </DialogTrigger>
                                                        <DialogContent>
                                                            <DialogHeader className='text-center text-xl'>
                                                                Добавьте статью и врача для рекомендации пользователям
                                                            </DialogHeader>
                                                            <DialogContent>
                                                                <form onSubmit={(e) => handleUpdateDesies(e, result.id)}
                                                                      className="grid gap-4 py-4">
                                                                    <div
                                                                        className="flex flex-row  justify-between items-center mx-8">
                                                                        <Label htmlFor="doctor" className="text-right">
                                                                            Врач
                                                                        </Label>
                                                                        <DropdownMenu>
                                                                            <DropdownMenuTrigger asChild>
                                                                                <Button variant="outline">
                                                                                    {desiesDoctor ? desiesDoctor.name : "выберите доктора"}
                                                                                </Button>
                                                                            </DropdownMenuTrigger>
                                                                            <DropdownMenuContent>
                                                                                {doctorsList.map((doctor) => (
                                                                                    <div
                                                                                        key={doctor.id}
                                                                                        className="cursor-pointer"
                                                                                        onClick={() => setDesiesDoctor(doctor)}
                                                                                    >
                                                                                        {doctor.name}
                                                                                    </div>
                                                                                ))}
                                                                            </DropdownMenuContent>
                                                                        </DropdownMenu>
                                                                    </div>

                                                                    <div
                                                                        className="flex flex-row  justify-between items-center mx-8">
                                                                        <Label htmlFor="post" className="text-right">
                                                                            Статья
                                                                        </Label>
                                                                        <DropdownMenu>
                                                                            <DropdownMenuTrigger asChild>
                                                                                <Button className='flex '
                                                                                        variant="outline">
                                                                                    {desiesPosts ? desiesPosts.title : "выберите статью"}
                                                                                </Button>
                                                                            </DropdownMenuTrigger>
                                                                            <DropdownMenuContent>
                                                                                {postsList.map((post) => (
                                                                                    <div
                                                                                        key={post.id}
                                                                                        className="cursor-pointer"
                                                                                        onClick={() => setDesiesPosts(post)}
                                                                                    >
                                                                                        {post.title}
                                                                                    </div>
                                                                                ))}
                                                                            </DropdownMenuContent>
                                                                        </DropdownMenu>
                                                                    </div>

                                                                    <DialogFooter>
                                                                        <Button type="submit" disabled={dloading}>
                                                                            {dloading ? "Сохранение..." : "Сохранить изменения"}
                                                                        </Button>
                                                                    </DialogFooter>
                                                                </form>


                                                            </DialogContent>

                                                        </DialogContent>
                                                    </Dialog>
                                                </TableCell>
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
                                                <DialogTitle>Добавление диагнозов для теста </DialogTitle>
                                            </DialogHeader>
                                            <form onSubmit={(e) => handleSubmitResult(e)}
                                                  className="grid gap-4 py-4">
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="text" className="text-right">
                                                        Название диагноза
                                                    </Label>
                                                    <Input
                                                        id="text"
                                                        value={resultTitle}
                                                        onChange={(e) => setResultTitle(e.target.value)}
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
                                            <Button
                                                onClick={() => [fetchOptions(question.id), fetchResults()]}>Варианты</Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Варианты ответов</DialogTitle>
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow>
                                                            <TableHead>Текст</TableHead>
                                                            <TableHead>Очки</TableHead>
                                                            <TableHead>Отнимает очки у диагноза</TableHead>
                                                            <TableHead>Прибовляет очки у диагноза</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {options.length > 0 ? (
                                                            options.map((option: Options) => (
                                                                <TableRow key={option.id}>
                                                                    <TableCell>{option.text}</TableCell>
                                                                    <TableCell>{option.score}</TableCell>
                                                                    <TableCell>
                                                                        {option.minDisease.length > 0
                                                                            ? option.minDisease.map((disease) => <p
                                                                                key={disease.id}>{disease.title}</p>)
                                                                            : "Нет данных"}
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {option.maxDisease.length > 0
                                                                            ? option.maxDisease.map((disease) => <p
                                                                                key={disease.id}>{disease.title}</p>)
                                                                            : "Нет данных"}
                                                                    </TableCell>
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
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="minDisease" className="text-right">
                                                            Диагноз к которому прибавляются баллы
                                                        </Label>
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="outline">Выбрать</Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent>
                                                                {result.length > 0 ? (
                                                                    result.map((disease) => (
                                                                        <div key={disease.id}
                                                                             className="flex items-center gap-2">
                                                                            <input
                                                                                type="checkbox"
                                                                                id={`disease-${disease.id}`}
                                                                                value={disease.id}
                                                                                checked={selectedmaxDiseases.includes(disease.id)}
                                                                                onChange={(e) => handlemaxDiseaseSelect(e, disease.id)}
                                                                            />
                                                                            <label
                                                                                htmlFor={`disease-${disease.id}`}>{disease.title}</label>
                                                                        </div>
                                                                    ))
                                                                ) : (
                                                                    <p>Нет данных</p>
                                                                )}
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="minDisease" className="text-right">
                                                            Диагноз у которого убавляются баллы
                                                        </Label>
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="outline">Выбрать</Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent>
                                                                {result.length > 0 ? (
                                                                    result.map((disease) => (
                                                                        <div key={disease.id}
                                                                             className="flex items-center gap-2">
                                                                            <input
                                                                                type="checkbox"
                                                                                id={`disease-${disease.id}`}
                                                                                value={disease.id}
                                                                                checked={selectedminDiseases.includes(disease.id)}
                                                                                onChange={(e) => handleminDiseaseSelect(e, disease.id)}
                                                                            />
                                                                            <label
                                                                                htmlFor={`disease-${disease.id}`}>{disease.title}</label>
                                                                        </div>
                                                                    ))
                                                                ) : (
                                                                    <p>Нет данных</p>
                                                                )}
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
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