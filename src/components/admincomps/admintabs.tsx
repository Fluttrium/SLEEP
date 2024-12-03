"use client";

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
import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {useUserStore} from "@/app/admin/_store/adminpageStore";

export function TabsDemo() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [name, setName] = useState<string>("");
    const [nick, setNick] = useState<string>("");
    const {surname, id} = useUserStore();
    const [image, setImage] = useState<File | null>(null);


    const handleSave = () => {
        console.log("Данные сохранены:", {name, nick});
        // Здесь можно добавить логику для отправки данных на сервер
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUploadImage = async () => {
        if (!image) {
            alert("Пожалуйста, выберите изображение.");
            return;
        }

        const formData = new FormData()
        formData.append("file", image);
        formData.append("id", id);

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                alert(`Фото успешно загружено! ${data.fileUrl}`);
            } else {
                alert("Ошибка загрузки изображения.");
            }
        } catch (error) {
            console.error("Ошибка загрузки:", error);
            alert("Произошла ошибка при загрузке изображения.");
        }
    };

    handleSave()

    return (
        <Tabs defaultValue="account" className="w-[400px] h-max">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="account">Аккаунт</TabsTrigger>
                <TabsTrigger value="password">Пароль</TabsTrigger>
                <TabsTrigger value="image">Image</TabsTrigger>
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
                            <Input id="current" type="password"/>
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="new">Новый пароль</Label>
                            <Input id="new" type="password" placeholder={name}/>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Изменить пароль</Button>
                        <Button>Изменить пароль</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="image">
                <Card>
                    <CardHeader>
                        <CardTitle>Image</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-7">
                        <div className="space-y-1">
                            <Label htmlFor="new">Новый Image</Label>
                            <Input id="new" type="file" accept="image/*" onChange={handleImageChange}/>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleUploadImage}>Загрузить фото</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    );
}
