"use client"
import {NewChart} from "@/components/newchart";
import React from "react";
import Doctorscopmonent from "@/components/resultComponents/doctorscopmonent";
import {PostsResult} from "@/components/resultComponents/postrsult";
import {CardDescription} from "@/components/ui/card";


const posts = [
    {
        id: 1,
        title: "5 советов для здорового сна",
        body: "Узнайте, как улучшить качество своего сна с помощью простых изменений в распорядке дня.",
        image: "https://via.placeholder.com/150", // Плейсхолдер изображения
        categories: ["Здоровье", "Сон"],
    },

];

export default function NnewTestResComp() {
    return (
        <div className='bg-neutral-300 h-[90%] w-[90%] rounded-3xl flex flex-row p-3'>
            <div className='flex flex-col w-1/2 h-full mr-3 gap-3'>
                <div className='flex h-1/2  '>
                    <NewChart/>
                </div>
                <div className='flex h-1/2 bg-white rounded-3xl  flex-row shadow justify-between items-center p-3 '>
                    <CardDescription className='flex flex-col gap-3 w-1/3 ml-4'>
                        Вы отлично постарались! 🎉 Ваш тест завершён, и результаты готовы. На основе ваших ответов мы
                        смогли предположить возможные проблемы и пути их решения.
                        <strong>Ваш предположительный диагноз:</strong>
                        <span className="text-green-600 text-2xl">Лёгкая форма бессонницы</span>
                    </CardDescription>
                    {posts.map((post) => (
                        <PostsResult
                            key={post.id}
                            author={post.title}
                            description={post.body}
                            title={post.title}
                            image={post.image}
                            categories={post.categories}
                        />
                    ))}
                </div>
            </div>
            <div className='flex flex-col w-1/2 h-full gap-3 '>
                <Doctorscopmonent/>
                <Doctorscopmonent/>
                <Doctorscopmonent/>
            </div>

        </div>
    )
}