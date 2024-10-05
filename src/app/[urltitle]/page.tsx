"use client";
import {useEffect, useState} from "react";
import * as React from "react";

import {Button} from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {Label} from "@/components/ui/label";

interface Question {
    id: number;
    text: string;
    options: Option[];
}

interface Option {
    id: number;
    text: string;
    score: number;
}

interface Test {
    id: number;
    title: string;
    questions: Question[];
}

export default function Page({params}: { params: { urltitle: string } }) {
    const [test, setTest] = useState<Test | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [answers, setAnswers] = useState<{ questionId: number; optionId: number }[]>([]);
    const [resultTitle, setResultTitle] = useState<string | null>(null);

    useEffect(() => {
        const fetchTest = async () => {
            try {
                const response = await fetch(`/api/test/${params.urltitle}`);
                if (!response.ok) {
                    throw new Error("Ошибка загрузки теста");
                }
                const data = await response.json();
                setTest(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTest();
    }, [params.urltitle]);

    const handleAnswerSubmit = async () => {
        const questionId = test!.questions[currentQuestionIndex].id;

        if (selectedOption === null) {
            setError("Выберите вариант ответа");
            return;
        }

        // Добавляем текущий ответ в массив
        const updatedAnswers = [
            ...answers,
            {questionId, optionId: selectedOption, testId: test!.id}, // Добавляем testId
        ];
        setAnswers(updatedAnswers);

        // Переходим к следующему вопросу или отправляем результаты, если вопросы закончились
        if (currentQuestionIndex + 1 < test!.questions.length) {
            setSelectedOption(null); // Сбрасываем выбранный вариант
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            // Отправляем ответы на сервер для обработки
            const response = await fetch(`/api/test/${params.urltitle}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({answers: updatedAnswers}),
            });

            if (response.ok) {
                const resultData = await response.json();
                setResultTitle(resultData.title); // Установите заголовок результата
            } else {
                setError("Ошибка при отправке ответов");
            }
        }
    };


    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    if (!test || test.questions.length === 0) {
        return <div>Тест или вопросы не найдены</div>;
    }

    if (resultTitle !== null) {
        return <div>Ваш результат: {resultTitle}</div>;
    }

    const currentQuestion = test.questions[currentQuestionIndex];

    return (
        <div className='flex flex-col justify-center items-center w-screen h-screen'>
            {/* Отображаем прогресс прохождения теста */}
            <div className="mb-4 text-center font-bold">
                Вопрос {currentQuestionIndex + 1} из {test.questions.length}
            </div>

            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>{test.title}</CardTitle>
                    <CardDescription>{currentQuestion.text}</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="options">Варианты ответа</Label>
                                {currentQuestion.options.map((option) => (
                                    <div key={option.id} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={option.id.toString()}
                                            checked={selectedOption === option.id}
                                            onChange={() => setSelectedOption(option.id)}
                                            className="mr-2"
                                        />
                                        <label
                                            htmlFor={option.id.toString()}
                                            className="text-sm font-medium leading-none"
                                        >
                                            {option.text}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button onClick={handleAnswerSubmit}>Ответить</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
