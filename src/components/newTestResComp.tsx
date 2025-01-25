"use client";

import {NewChart} from "@/components/newchart";
import React, {useEffect, useState, useMemo, useRef} from "react";
import Doctorscopmonent from "@/components/resultComponents/doctorscopmonent";
import {PostsResult} from "@/components/resultComponents/postrsult";
import {CardDescription} from "@/components/ui/card";
import {useSession} from "next-auth/react";
import {Category, Disease, Post, User} from "@prisma/client";

// Компонент для отображения диагноза и поста
function DiagnosisSection({maxDiagnosis, post}: { maxDiagnosis: any; post: Post | null }) {
    return (
        <div className="flex h-1/2 bg-white rounded-3xl flex-row shadow justify-between items-center p-3">
            <CardDescription className="flex flex-col gap-3 w-1/3 ml-4">
                Вы отлично постарались! 🎉 Ваш тест завершён, и результаты готовы.
                <strong>Ваше вероятное состояние:</strong>
                <span className="text-green-600 text-2xl">
                    {maxDiagnosis ? maxDiagnosis.title : "Неизвестный диагноз"}
                </span>
            </CardDescription>

            {post && (
                <PostsResult
                    author={post.title}
                    description={post.body}
                    title={post.title}
                    // categories={post.categories.map((category: { name: any; }) => category.name) || []}
                    image={post.image || ""} categories={[]}/>
            )}
        </div>
    );
}

interface NnewTestResCompProps {
    isOpenn: boolean; // Убедитесь, что тип здесь boolean
}

export default function NnewTestResComp({ isOpenn }: NnewTestResCompProps) {
    const [result, setResult] = useState<string[] | null>(null);
    const [maxDiagnosis, setMaxDiagnosis] = useState<any | null>(null);
    const {data: session} = useSession();
    const id = session?.user.id;
    const [disease, setDisease] = useState<Disease>();
    const [post, setPost] = useState<Post & { categories: Category[] } | null>(null);
    const [doctors, setDoctors] = useState<User[]>([]);

    // Состояние для управления видимостью компонента
    const [isOpen, setIsOpen] = useState(isOpenn);  // Используйте пропс isOpen напрямую

    const containerRef = useRef<HTMLDivElement | null>(null);

    // Получение информации для виджета
    const fetchInfoForWidget = async (diagnos: string) => {
        try {
            const response = await fetch("/api/resultWidgets", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({diagnos}),
            });
            const data = await response.json();
            console.log("Инфа о диагнозе:", data);

            setDisease(data.disease);
            setPost(data.disease.post);
            setDoctors(data.disease.assignedDoctor);
        } catch (err) {
            console.error("Ошибка при загрузке данных для виджета:", err);
        }
    };

    // Загрузка результата пользователя
    const fetchUserResult = async (userId: string) => {
        try {
            console.log("Fetching user result for:", userId);
            const cookieResult = localStorage.getItem("testResults");

            if (cookieResult) {
                try {
                    const parsedResult: string[] = JSON.parse(cookieResult);
                    setResult(parsedResult);
                    console.log("Loaded results from localStorage:", parsedResult);
                    return;
                } catch (error) {
                    console.error("Failed to parse localStorage data:", error);
                }
            }

            const response = await fetch("/api/user/newTestRes", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({id: userId}),
            });

            const data = await response.json();
            console.log("Fetched data from API:", data);

            if (data?.DisesesList) {
                setResult(data.DisesesList);
                localStorage.setItem("testResults", JSON.stringify(data.DisesesList));
            }
        } catch (error) {
            console.error("Error fetching user results:", error);
        }
    };

    // Мемоизация результата
    const parsedResult = useMemo(() => {
        if (!result) return [];
        return result
            .map((disease) => {
                try {
                    return typeof disease === 'string' ? JSON.parse(disease) : disease;
                } catch {
                    console.error("Failed to parse disease:", disease);
                    return null;
                }
            })
            .filter(Boolean);
    }, [result]);


    // Обновление диагноза на основе результатов
    useEffect(() => {
        if (parsedResult.length > 0) {
            const maxDiagnosis = parsedResult.reduce((max, current) =>
                current.score > max.score ? current : max
            );

            setMaxDiagnosis(maxDiagnosis);
            console.log('Вероятное сосотояние',maxDiagnosis);
            fetchInfoForWidget(maxDiagnosis.title);
        }
    }, [parsedResult]);

    // Обработчик клика вне области компонента
    const handleOutsideClick = (e: MouseEvent) => {
        if (!containerRef.current?.contains(e.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    // Загрузка результатов при наличии id пользователя
    useEffect(() => {
        if (id) {
            fetchUserResult(id);
        }
    }, [id]);

    if (!isOpen) return null; // Не рендерим компонент, если он закрыт

    return (
        <div
            ref={containerRef}
            className="bg-neutral-300 h-[90%] w-[90%] rounded-3xl flex flex-row p-3"
        >
            <div className="flex flex-col w-1/2 h-full mr-3 gap-3">
                <div className="flex h-1/2">
                    <NewChart diseasesList={parsedResult} disise={maxDiagnosis?.title || ""}/>
                </div>
                <DiagnosisSection maxDiagnosis={maxDiagnosis} post={post}/>
            </div>
            <div className="flex flex-col w-1/2 gap-2 h-full">
                <Doctorscopmonent doctors={doctors}/>
                <Doctorscopmonent doctors={doctors}/>
                <Doctorscopmonent doctors={doctors}/>
            </div>
        </div>
    );
}
