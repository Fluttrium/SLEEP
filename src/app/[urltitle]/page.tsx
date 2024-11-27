"use client";

import {useEffect, useState} from "react";
import * as React from "react";
import {Button} from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {useSession} from "next-auth/react";
import {useTestStore} from "@/app/[urltitle]/_store/testStore";
import {Progress} from "@/components/ui/progress";

interface Option {
    id: number;
    text: string;
    score: number;
    diseaseId?: number;
}

export default function Page({params}: { params: { urltitle: string } }) {
    const {data: session} = useSession();
    const userId = session?.user?.id;

    const {
        testId,
        questions,
        diseases,
        totalScores,
        currentQuestionIndex,
        loadTest,
        answerQuestion,
        nextQuestion,
        getFinalResults,
    } = useTestStore();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [resultTitle, setResultTitle] = useState<string | null>(null);
    const [progress, setProgress] = React.useState(13)

    React.useEffect(() => {
        const timer = setTimeout(() => setProgress(80), 300)
        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        const fetchTest = async () => {
            try {
                await loadTest(params.urltitle);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTest();
    }, [params.urltitle, loadTest]);

    const handleAnswerSubmit = () => {
        const currentQuestion = questions[currentQuestionIndex];

        if (selectedOption === null) {
            setError("Выберите вариант ответа");
            return;
        }

        // Находим выбранный вариант
        const selectedOptionData = currentQuestion.options.find(
            (option) => option.id === selectedOption
        );

        if (selectedOptionData) {
            // Передаем ответ в Zustand
            answerQuestion(selectedOptionData);
        }

        // Переходим к следующему вопросу или показываем результат
        if (currentQuestionIndex + 1 < questions.length) {
            setSelectedOption(null);
            nextQuestion();
        } else {
            const finalResults = getFinalResults(); // Получаем финальные результаты из Zustand
            console.log("Итоговые результаты:", finalResults);

            // Отображаем результат
            setResultTitle(
                finalResults
                    .sort((a, b) => b.score - a.score) // Сортировка по убыванию баллов
                    .map((disease) => `${disease.title}: ${disease.score}`)
                    .join(", ")
            );
        }
    };

    if (loading) {
        return (<div className="flex h-screen w-screen justify-center items-center"><Progress value={progress} className="w-[60%]" /></div>);
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    if (!questions.length) {
        return <div>Тест не найден или не содержит вопросов</div>;
    }

    if (resultTitle) {
        return <div>Ваш результат: {resultTitle}</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];

    // Промежуточные результаты
    const intermediateResults = Object.entries(totalScores)
        .map(([diseaseId, score]) => {
            const disease = diseases.find((d) => d.id === parseInt(diseaseId));
            return disease ? `${disease.title}: ${score}` : null;
        })
        .filter(Boolean)
        .join(", ");

    return (
        <div className="flex flex-col justify-center items-center w-screen h-screen">
            <div className="mb-4 text-center font-bold">
                Вопрос {currentQuestionIndex + 1} из {questions.length}
            </div>

            <Card className="w-[350px]">
                <CardHeader>
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
                                            type="radio"
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

            {/* Отображение промежуточных результатов */}
            <div className="mt-8 text-center">
                <h2 className="font-bold">Промежуточные результаты:</h2>
                <div>{intermediateResults}</div>
            </div>
        </div>
    );
}
