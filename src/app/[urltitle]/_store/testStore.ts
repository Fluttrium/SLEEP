import {create} from 'zustand';

interface Disease {
    id: number;
    title: string;
    score: number; // Общий балл для этого заболевания
}

interface QuestionOption {
    id: number;
    text: string;
    score: number;
    diseaseId?: number; // ID болезни, если есть
    maxDisease?: Disease[]; // Массив болезней, для которых добавляются баллы
    minDisease?: Disease[]; // Массив болезней, для которых вычитаются баллы
}

interface Question {
    id: number;
    text: string;
    options: QuestionOption[];
}

interface TestStore {
    testId: number;
    questions: Question[];
    diseases: Disease[];
    totalScores: { [diseaseId: number]: number }; // Храним баллы для заболеваний
    currentQuestionIndex: number;
    loadTest: (url: string) => void;
    answerQuestion: (option: QuestionOption) => void;
    nextQuestion: () => void;
    getFinalResults: () => Disease[]; // Получаем финальные результаты по заболеваниям
}

export const useTestStore = create<TestStore>((set, get) => ({
    testId: 0,
    questions: [],
    diseases: [],
    totalScores: {},
    currentQuestionIndex: 0,

    loadTest: async (url: string) => {
        try {
            const test = await fetch(`/api/test/${url}`).then((res) => res.json());

            // Извлекаем уникальные заболевания из опций
            const diseases: Disease[] = test.questions
                .flatMap((question: any) =>
                    question.options.flatMap((option: any) => [
                        ...(option.minDisease || []),
                        ...(option.maxDisease || []),
                    ])
                )
                .filter((disease: any): disease is Disease => !!disease); // Убедимся, что disease имеет тип Disease

            // Убираем дубликаты заболеваний
            const uniqueDiseases: Disease[] = Array.from(
                new Map(diseases.map((disease) => [disease.id, disease])).values()
            );

            set({
                testId: test.id || 0,
                questions: test.questions || [],
                diseases: uniqueDiseases,
                totalScores: uniqueDiseases.reduce((acc: any, disease: Disease) => {
                    acc[disease.id] = 0;
                    return acc;
                }, {}),
            });
        } catch (error) {
            console.error("Ошибка загрузки теста:", error);
            throw new Error("Не удалось загрузить данные теста");
        }
    },


    answerQuestion: (option: QuestionOption) => {
        set((state) => {
            const updatedScores = { ...state.totalScores };

            // Увеличиваем баллы для maxDisease
            if (option.maxDisease) {
                option.maxDisease.forEach((disease) => {
                    updatedScores[disease.id] = (updatedScores[disease.id] || 0) + option.score;
                });
            }

            if (option.minDisease) {
                option.minDisease.forEach((disease) => {
                    updatedScores[disease.id] = (updatedScores[disease.id] || 0) - option.score;
                });
            }

            return { totalScores: updatedScores };
        });
    },


    nextQuestion: () => {
        set((state) => {
            const nextIndex = state.currentQuestionIndex + 1;
            return { currentQuestionIndex: nextIndex };
        });
    },

    getFinalResults: () => {
        const { totalScores, diseases } = get(); // Используем get для получения состояния

        return Object.entries(totalScores).map(([diseaseId, score]) => {
            const disease = diseases.find((d) => d.id === parseInt(diseaseId)); // Используем тип disease
            return disease ? { ...disease, score } : { id: 0, title: "", score: 0 }; // Проверка на отсутствие болезни
        });
    }
}));
