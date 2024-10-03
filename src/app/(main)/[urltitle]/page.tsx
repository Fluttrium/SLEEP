"use client";
import { useEffect, useState } from "react";

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

export default function Page({ params }: { params: { urltitle: string } }) {
    const [test, setTest] = useState<Test | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<{ questionId: number; optionId: number }[]>([]);
    const [resultTitle, setResultTitle] = useState<string | null>(null); // Заменяем number на string

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

    const handleOptionClick = async (optionId: number) => {
        const questionId = test!.questions[currentQuestionIndex].id;

        // Добавляем текущий ответ в массив
        setAnswers((prev) => [...prev, { questionId, optionId }]);

        // Переходим к следующему вопросу или отправляем результаты, если вопросы закончились
        if (currentQuestionIndex + 1 < test!.questions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            // Отправляем ответы на сервер для обработки
            const response = await fetch(`/api/test/${params.urltitle}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ answers: [...answers, { questionId, optionId }] }), // Включаем последний ответ
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
        return <div>Ваш результат: {resultTitle}</div>; // Отображаем заголовок результата
    }

    const currentQuestion = test.questions[currentQuestionIndex];

    return (
        <div>
            <h1>Тест: {test.title}</h1>
            <h2>Вопрос: {currentQuestion.text}</h2>
            <ul>
                {currentQuestion.options.map((option) => (
                    <li key={option.id} onClick={() => handleOptionClick(option.id)}>
                        {option.text}
                    </li>
                ))}
            </ul>
        </div>
    );
}
