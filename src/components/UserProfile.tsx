"use client";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TestChart } from "@/components/ui/chart2";
import { DesiesLinksNDocrors } from "@/components/prifilecomp/desiesLinksNDocrors";
import { useEffect, useState } from "react";
import NnewTestResComp from "@/components/newTestResComp";

export function UserProfile() {
    const { data: session } = useSession();
    const userId = String(session?.user.email);
    const [chartData, setChartData] = useState<{ month: string; desktop: number }[]>([]);
    const [dataFetched, setDataFetched] = useState(false);
    const [isWidgetOpen, setIsWidgetOpen] = useState(true); // Состояние для управления видимостью основного виджета
    const [isTestResultsWidgetOpen, setIsTestResultsWidgetOpen] = useState(false); // Состояние для открытия/закрытия NnewTestResComp

    // Функция для загрузки данных
    const fetchData = async () => {
        if (!userId) return;

        const results = localStorage.getItem("testResult");

        try {
            const response = await fetch("/api/user/test", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, results }),
            });

            if (response.ok) {
                const result = await response.json();
                if (result?.diseasesList?.length > 0) {
                    const formattedData = result.diseasesList.map((item: string) => {
                        const parsedItem = JSON.parse(item);
                        return { month: parsedItem.title, desktop: parsedItem.score };
                    });
                    setChartData(formattedData);
                    setDataFetched(true);
                }
            }
        } catch (error) {
            console.error("Error loading chart data:", error);
        }
    };
// eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="flex flex-row w-screen h-full justify-between px-10 py-11">
            {/* Виджет, который будет отображаться поверх всех элементов */}
            {isWidgetOpen && (
                <div
                    className="fixed top-0 left-0 z-50 w-full h-full bg-opacity-60 bg-black flex justify-center items-center"
                    onClick={() => setIsWidgetOpen(false)} // Закрытие при клике на фон
                >
                    <div
                        className="relative w-full max-w-[90%] max-h-[90%] h-auto p-4"
                        onClick={(e) => e.stopPropagation()} // Предотвращает закрытие при клике внутри виджета
                    >
                        <NnewTestResComp isOpenn={isWidgetOpen} />
                    </div>
                </div>
            )}

            {/* Основной контент страницы */}
            <div className="flex flex-col mx-3 basis-1/2">
                <Tabs defaultValue="account" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="account">Аккаунт</TabsTrigger>
                        <TabsTrigger value="password">Пароль</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">
                        <Card>
                            <CardHeader>
                                <CardTitle>Аккаунт</CardTitle>
                                <CardDescription>
                                    Внесите изменения в свой аккаунт здесь. Нажмите &quot;Сохранить&quot;, когда
                                    закончите.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="name">Имя</Label>
                                    <Input id="name" defaultValue="" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="username">Имя пользователя</Label>
                                    <Input id="username" defaultValue="" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Сохранить изменения</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="password">
                        <Card>
                            <CardHeader>
                                <CardTitle>Пароль</CardTitle>
                                <CardDescription>
                                    Измените свой пароль здесь. После сохранения вы будете выведены из
                                    системы.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="current">Текущий пароль</Label>
                                    <Input id="current" type="password" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="new">Новый пароль</Label>
                                    <Input id="new" type="password" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Сохранить пароль</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* Кнопка для открытия/закрытия виджета с результатами */}
                <Button
                    className="mt-4"
                    onClick={() => setIsTestResultsWidgetOpen((prev) => !prev)}
                >
                    {isTestResultsWidgetOpen ? "Закрыть виджет результатов" : "Открыть виджет результатов"}
                </Button>

                {/* Виджет с результатами теста */}
                {isTestResultsWidgetOpen && (
                    <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
                        <NnewTestResComp isOpenn={isTestResultsWidgetOpen} />
                    </div>
                )}
            </div>

            <div className="flex flex-col mx-3 basis-1/2">
                <div
                    className="mt-8 w-full h-8 bg-red-600 rounded-3xl flex items-center justify-center text-stone-50 font-semibold"
                    onClick={() => signOut({ callbackUrl: "/" })}
                >
                    Выйти из аккаунта
                </div>
            </div>
        </div>
    );
}
