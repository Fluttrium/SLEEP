import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
} from "@/components/ui/breadcrumb";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {motion} from "framer-motion";
import {TestTable} from "@/components/admincomps/TestTable";
import {Button} from "@/components/ui/button";
import React, {useState} from "react";
import {useTestRedactorStore} from "@/app/admin/_store/adminpageStore";
import {TestRedactor} from "@/components/admincomps/TestRedactor";

export function TestCreator() {
    const [testName, setTestName] = useState("Тест на апноэ");
    const [testUrl, setTestUrl] = useState("localhost/");
    const [loading, setLoading] = useState(false);

    const {isCreating, createdTestId, setIsCreating, setCreatedTestId} = useTestRedactorStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!testName || !testUrl) {
            alert("Пожалуйста, заполните все поля");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/admin/tests", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    urltitle: testUrl,
                    title: testName,
                }),
            });

            if (!response.ok) {
                throw new Error("Ошибка при создании теста");
            }

            const data = await response.json(); // Предполагается, что сервер возвращает данные теста, включая ID
            setCreatedTestId(data); // Сохраните ID созданного теста
            setTestName("");
            setTestUrl("");
            alert("Тест успешно создан");
            setIsCreating(true); // Установите состояние в true, чтобы открыть редактор
            // Откройте редактор теста, если это необходимо
        } catch (error) {
            console.error("Ошибка:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{opacity: 0, y: 50}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 1.5, ease: "easeOut"}}
            className="w-full px-5"
        >
            <section className="relative flex flex-col ps-5 h-screen">
                <div className='flex text-7xl'>Создание опросников</div>
                {isCreating ? (
                    <TestRedactor
                        test={createdTestId}
                        onClose={() => {
                            setIsCreating(false);
                            setCreatedTestId(null);
                        }}
                    />
                ) : (
                    <div>
                        <div className='absolute right-0 top-0 pt-10'>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button size='lg'>Создать тест</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Создание теста</DialogTitle>
                                        <DialogDescription>
                                            Введите название теста и желаемый отображаемый адрес
                                        </DialogDescription>
                                    </DialogHeader>
                                    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="name" className="text-right">
                                                Название
                                            </Label>
                                            <Input
                                                id="name"
                                                value={testName}
                                                onChange={(e) => setTestName(e.target.value)}
                                                required
                                                className="col-span-3"
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="username" className="text-right">
                                                URL
                                            </Label>
                                            <Input
                                                id="username"
                                                value={testUrl}
                                                onChange={(e) => setTestUrl(e.target.value)}
                                                required
                                                className="col-span-3"
                                            />
                                        </div>
                                        <DialogFooter>
                                            <Button type="submit" disabled={loading}>
                                                {loading ? "Создание..." : "Создать тест"}
                                            </Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>

                        <div className="h-max flex items-center pt-5 ">
                            <Breadcrumb className='px-5'>
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/public">Список тестов</BreadcrumbLink>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                        <div className="flex space-x-20 w-full pt-12 px-4">
                            <TestTable/>
                        </div>
                    </div>
                )}
            </section>
        </motion.div>
    );
}
