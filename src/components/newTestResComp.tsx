"use client"
import { NewChart } from "@/components/newchart";
import React, { useEffect, useState, useMemo, useRef } from "react";
import Doctorscopmonent from "@/components/resultComponents/doctorscopmonent";
import { PostsResult } from "@/components/resultComponents/postrsult";
import { CardDescription } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { Category, Disease, Post, User } from "@prisma/client";

export default function NnewTestResComp() {
    const [result, setResult] = useState<string[] | null>(null);
    const [maxDiagnosis, setMaxDiagnosis] = useState<any | null>(null);
    const { data: session } = useSession();
    const id = session?.user.id;
    const [disease, setDisease] = useState<Disease>();
    const [post, setPost] = useState<Post & { categories: Category[] } | null>(null);
    const [doctors, setDocrors] = useState<User[] >([]);

    // Состояние для управления видимостью компонента
    const [isOpen, setIsOpen] = useState(true);

    // Указываем тип для ref
    const containerRef = useRef<HTMLDivElement | null>(null); // Тип ref

    const fetchInfoForWidget = async (diagnos: string) => {
        try {
            const response = await fetch('/api/resultWidgets', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ diagnos }),
            });
            const data = await response.json();
            console.log("Инфа о диагнозе:", data);
            setDisease(data.disease); // Устанавливаем диагноз
            setPost(data.disease.post); // Устанавливаем пост
            setDocrors(data.disease.assignedDoctors);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (id) {
            fetchUserResult(id);
        }
    }, [id]);

    const fetchUserResult = async (userId: string) => {
        try {
            console.log("fetching user result", userId);
            const response = await fetch('/api/user/newTestRes', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: userId }),
            });
            const data = await response.json();
            console.log("Data received:", data);
            setResult(data.DisesesList);
        } catch (error) {
            console.log("Ошибка при загрузке результатов:", error);
        }
    };

    const parsedResult = useMemo(() => {
        return result
            ? result.map((disease: string) => {
                try {
                    if (typeof disease === "string" && disease.trim().startsWith("{") && disease.trim().endsWith("}")) {
                        return JSON.parse(disease);
                    } else {
                        return null;
                    }
                } catch (e) {
                    return null;
                }
            }).filter(Boolean)
            : [];
    }, [result]);

    useEffect(() => {
        if (parsedResult.length > 0) {
            const maxDiagnosis = parsedResult.reduce((max, current) => {
                return current.score > max.score ? current : max;
            });
            setMaxDiagnosis(maxDiagnosis);
            fetchInfoForWidget(maxDiagnosis.title);
        }
    }, [parsedResult]);

    // Обработчик для закрытия компонента
    const handleOutsideClick = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleOutsideClick);

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    if (!isOpen) return null; // Если компонент закрыт, не рендерим его

    return (
        <div
            ref={containerRef}
            className="bg-neutral-300 h-[90%] w-[90%] rounded-3xl flex flex-row p-3"
        >
            <div className="flex flex-col w-1/2 h-full mr-3 gap-3">
                <div className="flex h-1/2">
                    <NewChart diseasesList={parsedResult} />
                </div>
                <div className="flex h-1/2 bg-white rounded-3xl flex-row shadow justify-between items-center p-3">
                    <CardDescription className="flex flex-col gap-3 w-1/3 ml-4">
                        Вы отлично постарались! 🎉 Ваш тест завершён, и результаты готовы. На основе ваших ответов мы
                        смогли предположить возможные проблемы и пути их решения.
                        <strong>Ваш предположительный диагноз:</strong>
                        <span className="text-green-600 text-2xl">
                            {maxDiagnosis ? maxDiagnosis.title : "Неизвестный диагноз"}
                        </span>
                    </CardDescription>

                    {/* Проверка наличия поста перед рендерингом */}
                    {post && (
                        <PostsResult
                            author={post.title}
                            description={post.body}
                            title={post.title}
                            categories={post.categories.map((category) => category.name) || []} // Преобразуем категории в массив строк
                            image={post.image || ""}
                        />
                    )}
                </div>
            </div>
            <div className="flex flex-col w-1/2 gap-2 h-full ">
                <Doctorscopmonent doctors={doctors} />
                <Doctorscopmonent doctors={doctors} />
                <Doctorscopmonent doctors={doctors} />
            </div>
        </div>
    );
}
