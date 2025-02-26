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
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Metod, Post, Product, User} from "@prisma/client";
import {ScrollArea} from "@/components/ui/scroll-area";

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
    const [desiesDoctor, setDesiesDoctor] = useState<User[]>([]);
    const [metodsList, setMetodsList] = useState<Metod[]>([]);
    const [desiesMetodsList, setDesiesMetodsList] = useState<Metod[]>([]);
    const [postsList, setPostsList] = useState<Post[]>([]);
    const [desiesPosts, setDesiesPosts] = useState<Post>();
    const [dloading, setDloading] = useState(false);
    const [productsList, setProductsList] = useState<Product[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedmaxDiseases, setSelectedmaxDiseases] = useState<number[]>([]);
    const [selectedminDiseases, setSelectedminDiseases] = useState<number[]>([]);


    const toggleProduct = (product: Product) => {
        setProducts((prev) =>
            prev.some((p) => p.id === product.id)
                ? prev.filter((p) => p.id !== product.id)
                : [...prev, product]
        );
    };
    const toggleDoctors = (doctor: User) => {
        setDesiesDoctor((prev) =>
            prev.some((p) => p.id === doctor.id)
                ? prev.filter((p) => p.id !== doctor.id)
                : [...prev, doctor]
        );
    };
    const toggleMetods = (metod: Metod) => {
        setDesiesMetodsList((prev) =>
            prev.some((p) => p.id === metod.id)
                ? prev.filter((p) => p.id !== metod.id)
                : [...prev, metod]
        );
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
            setProductsList(data.products)
            setMetodsList(data.metods)


        } catch (error) {
        }

    }
    const handleDeleteResult = async (resultId: number) => {
        if (!confirm("Вы уверены, что хотите удалить диагноз?")) return;

        try {
            const response = await fetch(`/api/admin/tests/result/deleteresult`, {
                method: "POST", // Теперь используем POST вместо DELETE
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({id: resultId}), // Передаём ID пользователя в теле запроса
            });

            if (response.ok) {
                setResult((prevResult) => prevResult.filter((result) => result.id !== resultId));
                alert("Диагноз успешно удален.");
            } else {
                console.error("Ошибка при удалении ");
                alert("Не удалось удалить диагноз.");
            }
        } catch (error) {
            console.error("Ошибка при выполнении запроса:", error);
        }
    };
    const handleDeleteQuestion = async (questionId: number) => {
        if (!confirm("Вы уверены, что хотите удалить вопрос ?")) return;

        try {
            const response = await fetch(`/api/admin/tests/questions/questionsdelete`, {
                method: "POST", // Теперь используем POST вместо DELETE
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({id: questionId}), // Передаём ID пользователя в теле запроса
            });

            if (response.ok) {
                setQuestions((prevQuestion) => prevQuestion.filter((questions) => questions.id !== questionId));
                alert("Вопрос успешно удален.");
            } else {
                console.error("Ошибка при удалении ");
                alert("Не удалось удалить вопрос.");
            }
        } catch (error) {
            console.error("Ошибка при выполнении запроса:", error);
        }
    };

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

        if (!desiesDoctor  || !desiesPosts || !desiesPosts.id || !products  ) {
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
                    doctor: desiesDoctor,
                    post: {id: desiesPosts.id},
                    product: products,
                    metods: desiesMetodsList
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
            setDesiesDoctor([]);
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
                                    <ScrollArea className='max-h-60 overflow-auto'>
                                        {result.length > 0 ? (
                                            result.map((result: Diseas) => (
                                                <TableRow key={result.id}>
                                                    <TableCell
                                                        className='flex-1 flex-row justify-between mx-3 text-xl'>
                                                        <div
                                                            className='flex w-full items-center justify-items-start'>{result.title}</div>

                                                        <Dialog onOpenChange={(isOpen) => {
                                                            if (!isOpen) {
                                                                setDesiesDoctor([]); // Сбрасываем выбранного врача
                                                                setDesiesPosts(undefined); // Сбрасываем выбранную статью
                                                                setProducts([]);
                                                            }
                                                        }}>
                                                            <DialogTrigger asChild>
                                                                <div
                                                                    className="bg-primary rounded-2xl flex justify-center items-center h-min "

                                                                >
                                                                    <Settings color="white" className="m-1"/>
                                                                </div>
                                                            </DialogTrigger>

                                                            <DialogContent>
                                                                <DialogHeader className='text-center text-xl'>
                                                                    Добавьте статью и врача для рекомендации
                                                                    пользователям
                                                                </DialogHeader>
                                                                <DialogContent>
                                                                    <form
                                                                        onSubmit={(e) => handleUpdateDesies(e, result.id)}
                                                                        className="grid gap-4 py-4">
                                                                        <div
                                                                            className="flex flex-row  justify-between items-center mx-8">
                                                                            <Label htmlFor="doctor"
                                                                                   className="text-right">
                                                                                Врач
                                                                            </Label>
                                                                            <DropdownMenu>
                                                                                <DropdownMenuTrigger asChild>
                                                                                    <Button variant="outline">
                                                                                       Выберите доктора
                                                                                    </Button>
                                                                                </DropdownMenuTrigger>
                                                                                <DropdownMenuContent>
                                                                                    {doctorsList.map((doctor) => (
                                                                                        <div
                                                                                            key={doctor.id}
                                                                                            className={`cursor-pointer p-2 flex items-center ${
                                                                                                desiesDoctor.some((p) => p.id === doctor.id) ? "bg-blue-200" : ""
                                                                                            }`}
                                                                                            onClick={() => toggleDoctors(doctor)}
                                                                                        >
                                                                                            <span>{doctor.name}</span>
                                                                                            {desiesDoctor.some((p) => p.id === doctor.id) && (
                                                                                                <span className="ml-auto text-green-500">✔</span>
                                                                                            )}
                                                                                        </div>
                                                                                    ))}
                                                                                </DropdownMenuContent>
                                                                            </DropdownMenu>
                                                                        </div>

                                                                        <div
                                                                            className="flex flex-row  justify-between items-center mx-8">
                                                                            <Label htmlFor="post"
                                                                                   className="text-right">
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

                                                                        <div
                                                                            className="flex flex-row  justify-between items-center mx-8">
                                                                            <Label htmlFor="product"
                                                                                   className="text-right">
                                                                                Товар из магазина
                                                                            </Label>
                                                                            <DropdownMenu>
                                                                                <DropdownMenuTrigger asChild>
                                                                                    <Button className='flex '
                                                                                            variant="outline">
                                                                                        Выберете товары
                                                                                    </Button>
                                                                                </DropdownMenuTrigger>
                                                                                <DropdownMenuContent>
                                                                                    {productsList.map((product) => (
                                                                                        <div
                                                                                            key={product.id}
                                                                                            className={`cursor-pointer p-2 flex items-center ${
                                                                                                products.some((p) => p.id === product.id) ? "bg-blue-200" : ""
                                                                                            }`}
                                                                                            onClick={() => toggleProduct(product)}
                                                                                        >
                                                                                            <span>{product.name}</span>
                                                                                            {products.some((p) => p.id === product.id) && (
                                                                                                <span className="ml-auto text-green-500">✔</span>
                                                                                            )}
                                                                                        </div>
                                                                                    ))}
                                                                                </DropdownMenuContent>
                                                                            </DropdownMenu>
                                                                        </div>

                                                                        <div
                                                                            className="flex flex-row  justify-between items-center mx-8">
                                                                            <Label htmlFor="metod" className="text-left">
                                                                                Рекомендация метода обследования
                                                                            </Label>
                                                                            <DropdownMenu>
                                                                                <DropdownMenuTrigger asChild>
                                                                                    <Button className='flex '
                                                                                            variant="outline">
                                                                                      Выберите методы
                                                                                    </Button>
                                                                                </DropdownMenuTrigger>
                                                                                <DropdownMenuContent>
                                                                                    {metodsList.map((metod) => (
                                                                                        <div
                                                                                            key={metod.id}
                                                                                            className={`cursor-pointer p-2 flex items-center ${
                                                                                                desiesMetodsList.some((p) => p.id === metod.id) ? "bg-blue-200" : ""
                                                                                            }`}
                                                                                            onClick={() => toggleMetods(metod)}
                                                                                        >
                                                                                            <span>{metod.title}</span>
                                                                                            {desiesMetodsList.some((p) => p.id === metod.id) && (
                                                                                                <span className="ml-auto text-green-500">✔</span>
                                                                                            )}
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
                                                        <Button
                                                            variant="destructive"
                                                            className="ml-2"
                                                            onClick={() => handleDeleteResult(result.id)}
                                                        >
                                                            Удалить
                                                        </Button>
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
                                    </ScrollArea>
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
                                <TableCell> <Button
                                    variant="destructive"
                                    className="ml-2"
                                    onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    Удалить
                                </Button></TableCell>

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