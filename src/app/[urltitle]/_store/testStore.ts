import { create } from 'zustand';

interface Disease {
    id: number;
    title: string;
    score: number;
}

interface QuestionOption {
    id: number;
    text: string;
    score: number;
    maxDisease?: Disease[];
    minDisease?: Disease[];
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
    totalScores: { [diseaseId: number]: number };
    currentQuestionIndex: number;
    loadTest: (url: string) => void;
    answerQuestion: (option: QuestionOption) => void;
    nextQuestion: () => void;
    getFinalResults: () => { [title: string]: number };
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

            console.log("Loaded test data:", test);

            const diseasesMap = new Map<number, Disease>();

            // Обрабатываем данные теста
            test.questions.forEach((question: any) => {
                question.options.forEach((option: any) => {
                    option.maxDisease = option.maxDisease || [];
                    option.minDisease = option.minDisease || [];
                    option.maxDisease.forEach((disease: Disease) => {
                        if (disease && !diseasesMap.has(disease.id)) {
                            diseasesMap.set(disease.id, {
                                id: disease.id,
                                title: disease.title,
                                score: 0,
                            });
                        }
                    });
                    option.minDisease.forEach((disease: Disease) => {
                        if (disease && !diseasesMap.has(disease.id)) {
                            diseasesMap.set(disease.id, {
                                id: disease.id,
                                title: disease.title,
                                score: 0,
                            });
                        }
                    });
                });
            });

            const diseases = Array.from(diseasesMap.values());

            set({
                testId: test.id || 0,
                questions: test.questions.map((q: any) => ({
                    ...q,
                    options: q.options.map((opt: any) => ({
                        ...opt,
                    })),
                })),
                diseases,
                totalScores: diseases.reduce((acc, disease) => {
                    acc[disease.id] = 0; // Инициализируем начальные очки
                    return acc;
                }, {} as { [diseaseId: number]: number }),
            });
        } catch (error) {
            console.error("Error loading test:", error);
        }
    },

    answerQuestion: (option: QuestionOption) => {
        set((state) => {
            const updatedScores = { ...state.totalScores };

            console.log("Выбранный вариант:", option);

            // Добавляем баллы к maxDisease
            option.maxDisease?.forEach((disease) => {
                console.log(`Добавляем ${option.score} к диагнозу: ${disease.title}`);
                updatedScores[disease.id] = (updatedScores[disease.id] || 0) + option.score;
            });

            // Вычитаем баллы из minDisease
            option.minDisease?.forEach((disease) => {
                console.log(`Вычитаем ${option.score} из диагноза: ${disease.title}`);
                updatedScores[disease.id] = (updatedScores[disease.id] || 0) - option.score;
            });

            console.log("Обновленные очки:", updatedScores);

            return {
                totalScores: updatedScores,
            };
        });
    },

    nextQuestion: () => {
        set((state) => {
            if (state.currentQuestionIndex + 1 < state.questions.length) {
                return { currentQuestionIndex: state.currentQuestionIndex + 1 };
            }
            return state; // Если вопросы закончились, не изменяем состояние
        });
    },

    getFinalResults: () => {
        const { totalScores, diseases } = get();
        const results: { [title: string]: number } = {};
        diseases.forEach((disease) => {
            results[disease.title] = totalScores[disease.id] || 0;
        });
        return results;
    },
}));
