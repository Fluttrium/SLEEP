import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

export const useTestStore = create(
    persist<TestStore>(
        (set, get) => ({
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

                    // Обрабатываем данные API
                    test.questions.forEach((question: any) => {
                        question.options.forEach((option: any) => {
                            option.MaxDiseases = option.MaxDiseases?.map((item: any) => item.Disease) || [];
                            option.MinDiseases = option.MinDiseases?.map((item: any) => item.Disease) || [];
                            option.MaxDiseases.forEach((disease: Disease) => {
                                if (disease && !diseasesMap.has(disease.id)) {
                                    diseasesMap.set(disease.id, {
                                        id: disease.id,
                                        title: disease.title,
                                        score: 0,
                                    });
                                }
                            });
                            option.MinDiseases.forEach((disease: Disease) => {
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
                                maxDisease: opt.MaxDiseases,
                                minDisease: opt.MinDiseases,
                            })),
                        })),
                        diseases,
                        totalScores: diseases.reduce((acc, disease) => {
                            acc[disease.id] = 0;
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

                    console.log("Option selected:", option);

                    // Добавляем баллы из maxDisease
                    option.maxDisease?.forEach((disease) => {
                        updatedScores[disease.id] = (updatedScores[disease.id] || 0) + option.score;
                    });

                    // Вычитаем баллы из minDisease
                    option.minDisease?.forEach((disease) => {
                        updatedScores[disease.id] = (updatedScores[disease.id] || 0) - option.score;
                    });

                    console.log("Updated totalScores:", updatedScores);

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
                    return state; // Не изменяем состояние, если тест завершён
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
        }),
        {
            name: 'test-results',
            partialize: (state) => ({
                testId: state.testId,
                totalScores: state.totalScores,
                questions: state.questions,
                diseases: state.diseases,
                currentQuestionIndex: state.currentQuestionIndex,
                loadTest: state.loadTest,
                answerQuestion: state.answerQuestion,
                nextQuestion: state.nextQuestion,
                getFinalResults: state.getFinalResults,
            }),
        }
    )
);

