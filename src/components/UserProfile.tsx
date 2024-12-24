"use client";
import {useSession, signOut} from "next-auth/react";
import {Button} from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {TestChart} from "@/components/ui/chart2";
import {DesiesLinksNDocrors} from "@/components/prifilecomp/desiesLinksNDocrors";
import {useEffect, useState} from "react";

interface Doctor {
    id: string;
    name: string;
    surname: string;
    specialty: string;
    image: string;
}

interface Post {
    id: number;
    title: string;
    body: string;
    image: string;
}


export function UserProfile() {
    const {data: session} = useSession();
    const userId = String(session?.user.email);
    const [chartData, setChartData] = useState<{ month: string; desktop: number }[]>([]);
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);
    const [dataFetched, setDataFetched] = useState(false);

    // Функция для загрузки данных
    // Функция для загрузки данных
    const fetchData = async () => {
        if (!userId) return;

        try {
            const response = await fetch("/api/user/test", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId }),
            });

            if (response.ok) {
                const result = await response.json();

                if (result?.diseasesList?.length > 0) {
                    // Если сервер вернул данные, форматируем и сохраняем их
                    const formattedData = result.diseasesList.map((item: string) => {
                        const parsedItem = JSON.parse(item);
                        return { month: parsedItem.title, desktop: parsedItem.score };
                    });
                    setChartData(formattedData);
                    localStorage.setItem("testResults", JSON.stringify(formattedData));
                    setDataFetched(true);
                } else {
                    // Если сервер вернул пустой список, пробуем данные из localStorage
                    const storedData = localStorage.getItem("testResults");
                    if (storedData) {
                        const parsedData = JSON.parse(storedData);
                        const formattedData = parsedData.map((item: { title: string; score: number }) => ({
                            month: item.title,
                            desktop: item.score,
                        }));
                        setChartData(formattedData);
                        setDataFetched(true);
                    } else {
                        console.warn("No test results found locally or on the server.");
                    }
                }
            } else {
                console.error("Failed to fetch data from server:", response.statusText);

                // Если запрос не удался, пробуем загрузить данные из localStorage
                const storedData = localStorage.getItem("testResults");
                if (storedData) {
                    const parsedData = JSON.parse(storedData);
                    const formattedData = parsedData.map((item: { title: string; score: number }) => ({
                        month: item.title,
                        desktop: item.score,
                    }));
                    setChartData(formattedData);
                    setDataFetched(true);
                } else {
                    console.warn("No test results found locally or on the server.");
                }
            }
        } catch (error) {
            console.error("Error loading chart data:", error);

            // Если произошла ошибка, пробуем загрузить данные из localStorage
            const storedData = localStorage.getItem("testResults");
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                const formattedData = parsedData.map((item: { title: string; score: number }) => ({
                    month: item.title,
                    desktop: item.score,
                }));
                setChartData(formattedData);
                setDataFetched(true);
            } else {
                console.warn("No test results found locally or on the server.");
            }
        }
    };




    // Функция для отправки данных о максимальном диагнозе
    const fetchPostsNDoctors = async () => {
        try {
            const maxDisease = chartData.reduce(
                (max, current) => (current.desktop > max.desktop ? current : max),
                {month: "", desktop: -Infinity}
            );

            if (maxDisease.desktop === -Infinity) return;

            console.log("Sending the best disease:", maxDisease);

            const response = await fetch("/api/test/profiletest", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({title: maxDisease.month}),
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Fetched disease data with doctors and posts:", result);

                // Указываем, что это массивы
                const doctorsArray: Doctor[] = result.disease.doctor ? [result.disease.doctor] : [];
                const postsArray: Post[] = result.disease.post ? [result.disease.post] : [];

                setDoctors(doctorsArray);
                setPosts(postsArray);
            } else {
                console.error("Failed to fetch disease data:", response.statusText);
            }
        } catch (error) {
            console.error("Error in fetchPostsNDoctors:", error);
        }
    };


    useEffect(() => {
        fetchData();
    }, [userId]);

    useEffect(() => {
        if (dataFetched && chartData.length > 0) {
            fetchPostsNDoctors();
        }
    }, [dataFetched]);

    return (
        <div className="flex flex-row w-screen h-full justify-between px-10 py-11">
            <div className="flex flex-col mx-3 basis-1/2">
                {/* Передаём врачей и посты в компонент */}
                <DesiesLinksNDocrors doctor={doctors} post={posts}/>


            </div>
            <div className="flex flex-col mx-3 basis-1/2">
                {session?.user?.id && <TestChart chartData={chartData}/>}
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
                                    <Input id="name" defaultValue=""/>
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="username">Имя пользователя</Label>
                                    <Input id="username" defaultValue=""/>
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
                                    <Input id="current" type="password"/>
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="new">Новый пароль</Label>
                                    <Input id="new" type="password"/>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Сохранить пароль</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
                <div
                    className="mt-8 w-full h-8 bg-red-600 rounded-3xl flex items-center justify-center text-stone-50 font-semibold"
                    onClick={() => signOut({callbackUrl: "/"})}
                >
                    Выйти из аккаунта
                </div>
            </div>


        </div>
    );
}
