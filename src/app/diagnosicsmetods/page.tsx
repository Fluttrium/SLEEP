"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {Button} from "@/components/shared/ui/button";

export default function MetodsClient() {
    // Данные для карточек (можно заменить на реальные)
    const methods = [
        {title: "Метод 1", description: "Описание метода 1", content: "Доп. инфо 1", img: '/budkofaja.jpeg'},
        {title: "Метод 2", description: "Описание метода 2", content: "Доп. инфо 2", img: '/budkofaja.jpeg'},
        {title: "Метод 3", description: "Описание метода 3", content: "Доп. инфо 3", img: '/budkofaja.jpeg'},
        {title: "Метод 4", description: "Описание метода 4", content: "Доп. инфо 4", img: '/budkofaja.jpeg'},
        {title: "Метод 1", description: "Описание метода 1", content: "Доп. инфо 1", img: '/budkofaja.jpeg'},
        {title: "Метод 2", description: "Описание метода 2", content: "Доп. инфо 2", img: '/budkofaja.jpeg'},
        {title: "Метод 3", description: "Описание метода 3", content: "Доп. инфо 3", img: '/budkofaja.jpeg'},
        {title: "Метод 4", description: "Описание метода 4", content: "Доп. инфо 4", img: '/budkofaja.jpeg'},
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 p-12">
            {methods.map((method, index) => (
                <Card key={index} className="shadow-lg relative">
                    <CardHeader>
                        <CardTitle>{method.title}</CardTitle>
                        <CardDescription>{method.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className='flex flex-row'>
                            <div className='w-2/3'>{method.content}</div>
                            <img className='absolute right-4 top-4 max-w-40  aspect-square rounded-3xl' alt='фото метода' src={method.img}></img>
                        </div>

                    </CardContent>
                    <CardFooter>
                        <Button variant="secondary">Записаться</Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
