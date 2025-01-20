import {Card, CardFooter, CardHeader, CardContent} from "@/components/ui/card";
import {PostsCard} from "@/components/postsforuser/PostCard";
import React from "react";
import Doctorform from "@/components/doctorform";

// Интерфейс для пропсов
interface DesiesLinksNDocrorsProps {
    doctor?: {
        id: string;
        name: string;
        surname: string;
        specialty: string;
        image: string;
    }[];
    post?: {
        id: number;
        title: string;
        body: string;
        image: string;
    }[];
}

export function DesiesLinksNDocrors({doctor = [], post = []}: DesiesLinksNDocrorsProps) {
    return (
        <div className="space-y-6">
            {/* Врачи */}
            <Card>
                <CardHeader className="text-lg text-center font-bold">Врачи, связанные с диагнозом</CardHeader>
                <CardContent>
                    {doctor.length > 0 ? (
                        doctor.map((doctor) => (
                            <div
                                key={doctor.id}
                                className="mb-4 border-b pb-2 flex flex-col items-center justify-center"
                            >
                                <img
                                    alt="фото доктора"
                                    className="flex h-1/2 w-1/2 rounded-3xl"
                                    src={doctor.image} // Используйте плейсхолдер для пустых изображений
                                />
                                <div className="font-semibold text-2xl pt-3">
                                    {doctor.name} {doctor.surname}
                                </div>
                                <div className="text-sm pt-2 text-gray-500 text-center">{doctor.specialty}</div>
                            </div>
                        ))
                    ) : (
                        <div className="text-gray-500">Информация о врачах отсутствует.</div>
                    )}
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Doctorform/>
                </CardFooter>
            </Card>

            {/* Статьи */}
            <Card>
                <CardHeader className="text-lg font-bold">Ознакомьтесь с подходящими материалами</CardHeader>
                <CardContent>
                    {post.length > 0 ? (
                        post.map((post) => (
                            <div key={post.id} className="mb-6">
                                <PostsCard
                                    author={post.title}
                                    description={post.body}
                                    title={post.title}
                                    image={post.image} // Используйте плейсхолдер
                                    categories={[]} // Пустые категории, если их нет
                                />
                            </div>
                        ))
                    ) : (
                        <div className="text-gray-500">Материалы отсутствуют.</div>
                    )}
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Doctorform/>

                </CardFooter>
            </Card>
        </div>
    );
}
