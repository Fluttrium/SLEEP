"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
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

export function UserProfile() {
    const { data: session } = useSession();

    useEffect(() => {
        const syncResultsWithServer = async () => {
            // Проверяем, есть ли результаты в localStorage
            const storedResults = localStorage.getItem("testResults");

            if (storedResults && session?.user?.id) {
                try {
                    const resultsArray = JSON.parse(storedResults);

                    // Отправляем результаты на сервер
                    const response = await fetch("/api/user/test", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            userId: session.user.id,
                            results: resultsArray,
                        }),
                    });

                    if (response.ok) {
                        console.log("Results successfully synced with the server.");
                        localStorage.removeItem("testResults"); // Очищаем localStorage после успешной отправки
                    } else {
                        console.error("Failed to sync results with the server.");
                    }
                } catch (error) {
                    console.error("Error syncing results with the server:", error);
                }
            }
        };

        if (session) {
            syncResultsWithServer();
        }
    }, [session]);

    return (
        <div className="flex flex-row w-screen h-full justify-between px-10 py-11">
            <Tabs defaultValue="account" className="w-1/3">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="account">Аккаунт</TabsTrigger>
                    <TabsTrigger value="password">Пароль</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <Card>
                        <CardHeader>
                            <CardTitle>Аккаунт</CardTitle>
                            <CardDescription>
                                Внесите изменения в свой аккаунт здесь. Нажмите "Сохранить", когда
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

            <TestChart />
        </div>
    );
}
