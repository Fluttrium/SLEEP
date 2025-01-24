"use client";

import {useEffect, useState} from "react";
import * as React from "react";
import {Button} from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardFooter,
} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {useSession} from "next-auth/react";
import {useTestStore} from "@/app/[urltitle]/_store/testStore";
import {Progress} from "@/components/ui/progress";
import {useRouter} from "next/navigation";


export default function Page({params}: { params: { urltitle: string } }) {
    const {data: session} = useSession();
    const router = useRouter();

    const {
        questions,
        diseases,
        totalScores,
        currentQuestionIndex,
        loadTest,
        answerQuestion,
        nextQuestion,
        getFinalResults,
        resetStore,
    } = useTestStore();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [resultTitle, setResultTitle] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);
// eslint-disable-next-line react-hooks/exhaustive-deps
    //анимация загрузки
    useEffect(() => {
        const timer = setTimeout(() => setProgress(80), 300);
        return () => clearTimeout(timer);
    }, []);

    // Очистка кеша с названием "testResults" при рендере
    useEffect(() => {

        localStorage.removeItem("testResults");
        resetStore();
    }, []);

    //загрузка теста по titlte
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

    const handleAnswerSubmit = async () => {
        const currentQuestion = questions[currentQuestionIndex];

        if (selectedOption === null) {
            setError("Выберите вариант ответа");
            return;
        }

        const selectedOptionData = currentQuestion.options.find(
            (option) => option.id === selectedOption
        );

        if (selectedOptionData) {
            answerQuestion(selectedOptionData);
        }

        if (currentQuestionIndex + 1 < questions.length) {
            setSelectedOption(null);
            nextQuestion();
        } else {
            const finalResults = getFinalResults();


            if (finalResults && Object.keys(finalResults).length > 0) {
                const resultsArray = Object.entries(finalResults).map(([title, score]) => ({
                    title,
                    score,
                }));


                setResultTitle(resultsArray[0].title);
                localStorage.setItem("testResults", JSON.stringify(resultsArray));

            }

        }
    };


    if (loading) {
        return (
            <div className="flex h-screen w-screen justify-center items-center">
                <Progress value={progress} className="w-[60%]"/>
            </div>
        );
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    if (!questions.length) {
        return <div>Тест не найден или не содержит вопросов</div>;
    }

    if (resultTitle) {
        return session ? (
            router.push('/profile')
        ) : (
            <div className="flex h-screen w-screen justify-center items-center">
                <Card className="w-1/3 justify-center">
                    <CardHeader className="text-2xl text-center font-semibold">
                        Для просмотра результатов теста необходимо зарегистрироваться на
                        платформе
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        <Button
                            onClick={() => router.push("/signup")}
                            className="text-xl font-semibold"
                        >
                            Зарегистрироваться
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

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

            <div className="mt-8 text-center">
                <h2 className="font-bold">Промежуточные результаты:</h2>
                <div>{intermediateResults}</div>
            </div>
        </div>
    );
}