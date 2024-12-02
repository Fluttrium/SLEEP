"use client";

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
import { useEffect, useState } from "react";
import { useUserStore } from "@/app/admin/_store/adminpageStore";

export function TabsDemo() {
    const { name, nick, surname, setName, setNick } = useUserStore();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleSave = async () => {
        try {
            // Логика сохранения данных
            setSuccessMessage("Данные успешно сохранены!");
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (error) {
            console.error("Ошибка при сохранении:", error);
        }
    };

    const handlePasswordChange = async () => {
        if (!newPassword || newPassword.length < 6) {
            alert("Пароль должен быть не менее 6 символов.");
            return;
        }

        try {
            // Логика изменения пароля
            alert("Пароль успешно изменен.");
        } catch (error) {
            console.error("Ошибка при изменении пароля:", error);
        }
    };

    return (
        <Tabs defaultValue="account" className="w-[400px] h-max">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">Аккаунт</TabsTrigger>
                <TabsTrigger value="password">Пароль</TabsTrigger>
            </TabsList>
            <TabsContent className="h-max" value="account">
                <Card>
                    <CardHeader>
                        <CardTitle>Аккаунт</CardTitle>
                        <CardDescription>
                            Измените данные своего аккаунта. Для подтверждения нажмите кнопку готово.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-7">
                        <div className="space-y-1">
                            <Label htmlFor="name">Имя</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="username">Никнейм</Label>
                            <Input
                                id="username"
                                value={nick}
                                onChange={(e) => setNick(e.target.value)}
                                placeholder={surname}
                            />
                        </div>
                        {successMessage && <p className="text-green-500">{successMessage}</p>}
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleSave}>Готово</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="password">
                <Card>
                    <CardHeader>
                        <CardTitle>Пароль</CardTitle>
                        <CardDescription>
                            Измените пароль здесь. После изменения пароля вы выйдете из аккаунта.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-7">
                        <div className="space-y-1">
                            <Label htmlFor="current">Текущий пароль</Label>
                            <Input
                                id="current"
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="new">Новый пароль</Label>
                            <Input
                                id="new"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handlePasswordChange}>Изменить пароль</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    );
}
