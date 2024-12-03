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
    const [doctorData, setDoctorData] = useState({
        name: "",
        surname: "",
        specialty: "",
        image: null as File | null,
        email: "",
        phone: "",
        description: "",
        password: "",
    });


    const handleSave = () => {
        console.log("Данные сохранены:", {name, nick});
        // Здесь можно добавить логику для отправки данных на сервер
    };

    // Обработчик изменения полей формы
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value, files} = e.target;
        setDoctorData((prev) => ({
            ...prev,
            [id]: files ? files[0] : value, // Если это input type="file", берём первый файл
        }));
    };

// Обработчик загрузки данных
    const handleUploadDoctor = async () => {
        // Проверка, что изображение обязательно загружено
        if (!doctorData.image) {
            alert("Пожалуйста, выберите изображение.");
            return;
        }

        // Формируем данные для отправки
        const formData = new FormData();
        Object.entries(doctorData).forEach(([key, value]) => {
            if (value) {
                formData.append(key, value as string | Blob); // Добавляем только не пустые значения
            }
        });

        try {
            // Отправляем данные на сервер
            const response = await fetch("/api/admin/adddoctor", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("Доктор успешно добавлен!");
                // Очищаем форму после успешной отправки
                setDoctorData({
                    name: "",
                    surname: "",
                    specialty: "",
                    image: null,
                    email: "",
                    phone: "",
                    description: "",
                    password: "",
                });
            } else {
                const errorData = await response.json();
                alert(`Ошибка: ${errorData.message || "Не удалось добавить доктора"}`);
            }
        } catch (error) {
            console.error("Ошибка:", error);
            alert("Произошла ошибка при добавлении доктора.");
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
        <Tabs defaultValue="account" className="w-[500px] h-max">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="account">Аккаунт</TabsTrigger>
                <TabsTrigger value="password">Пароль</TabsTrigger>
                <TabsTrigger value="doctor">Добавить доктора</TabsTrigger>
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
                    </CardFooter>
                </Card>
            </TabsContent>

            <TabsContent value="doctor">
                <Card>
                    <CardHeader>
                        <CardTitle>Добавить доктора</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-7">
                        <div className="space-y-1">
                            <Label htmlFor="name">Имя</Label>
                            <Input
                                id="name"
                                type="text"
                                value={doctorData.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="surname">Фамилия</Label>
                            <Input
                                id="surname"
                                type="text"
                                value={doctorData.surname}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="specialty">Специальность</Label>
                            <Input
                                id="specialty"
                                type="text"
                                value={doctorData.specialty}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={doctorData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="phone">Телефон</Label>
                            <Input
                                id="phone"
                                type="tel"
                                value={doctorData.phone}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="description">Описание</Label>
                            <Input
                                id="description"
                                type="text"
                                value={doctorData.description}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="password">Пароль</Label>
                            <Input
                                id="password"
                                type="password"
                                value={doctorData.password}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="image">Фото</Label>
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={handleInputChange}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleUploadDoctor}>Добавить доктора</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    );
}
