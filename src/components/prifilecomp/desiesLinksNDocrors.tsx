import {Card, CardFooter, CardHeader, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {PostsCard} from "@/components/postsforuser/PostCard";
import React from "react";
import Image from "next/image";

// Интерфейс для пропсов
interface DesiesLinksNDocrorsProps {
    doctors: {
        id: string;
        name: string;
        surname: string;
        specialty: string;
        image: string;
    }[];
    posts: {
        id: number;
        title: string;
        body: string;
        image: string;
    }[];
}

export function DesiesLinksNDocrors({doctors, posts}: DesiesLinksNDocrorsProps) {
    return (
        <div className="space-y-6">
            {/* Врачи */}
            <Card>
                <CardHeader className="text-lg  text-center font-bold">Врачи, связанные с диагнозом</CardHeader>
                <CardContent>
                    {doctors.length > 0 ? (
                        doctors.map((doctor) => (
                            <div key={doctor.id}
                                 className="mb-4 border-b pb-2 flex flex-col items-center justify-center">
                                <img alt='фото доктора' className='flex h-1/2 w-1/2 rounded-3xl' src={doctor.image}/>
                                <p className="font-semibold text-2xl pt-3">
                                    {doctor.name} {doctor.surname}
                                </p>
                                <p className="text-sm pt-2 text-gray-500 text-center">{doctor.specialty}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">Информация о врачах отсутствует.</p>
                    )}
                </CardContent>
                <CardFooter className=' flex justify-center '><Button className="text-xl font-semibold">
                    Записаться на консультацию
                </Button></CardFooter>
            </Card>

            {/* Статьи */}
            <Card>
                <CardHeader className="text-lg font-bold">
                    Ознакомьтесь с подходящими материалами
                </CardHeader>
                <CardContent>
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post.id} className="mb-6">
                                <PostsCard
                                    author={post.title}
                                    description={post.body}
                                    title={post.title}
                                    image={post.image}
                                    categories={[]} // Пустые категории, если их нет
                                />
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">Материалы отсутствуют.</p>
                    )}
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button className="text-xl font-semibold">
                        Записаться на консультацию
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
