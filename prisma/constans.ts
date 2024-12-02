// constans.ts
export const diseases = [
    { title: "ОСТРАЯ ИНСОМНИЯ", testId: 1 },
    { title: "ХРОНИЧЕСКАЯ ИНСОМНИЯ", testId: 1 },
    { title: "СИНДРОМ БЕСПОКОЙНЫХ НОГ", testId: 1 },
    { title: "СИНДРОМ ОБСТРУКТИВНОГО АПНОЭ ВО СНЕ", testId: 1 },
    { title: "НАРКОЛЕПСИЯ  ТИП 1", testId: 1 },
    { title: "НАРКОЛЕПСИЯ  ТИП 2", testId: 1 },
    { title: "ИДИОПАТИЧЕСКАЯ ГИПЕРСОМНИЯ", testId: 1 },
    { title: "СИНДРОМ НЕДОСТАТОЧНОГО СНА", testId: 1 },
    { title: "СИНДРОМ ЗАДЕРЖКИ ФАЗЫ СНА-БОДРСТВОВАНИЯ", testId: 1 },
    { title: "СИНДРОМ ОПЕРЕЖЕНИЯ ФАЗЫ СНА-БОДРСТВОВАНИЯ", testId: 1 },
    { title: "НАРУШЕНИЕ СНА ПРИ СМЕННОЙ РАБОТЕ", testId: 1 },
    { title: "СТРАХИ ВО СНЕ", testId: 1 },
    { title: "НАРУШЕНИЕ ПОВЕДЕНИЯ В ФАЗУ МЕДЛЕННОГО СНА", testId: 1 },
    { title: "НАРУШЕНИЕ ПОВЕДЕНИЯ В ФАЗУ БЫСТРОГО СНА", testId: 1 },
    { title: "БРУКСИЗМ", testId: 1 },
];

interface Disease {
    id?: number; // Сделать id необязательным
    title: string;
    testId: number;
}

// создаём словарь для быстрого поиска
export const diseaseDictionary = diseases.reduce((acc: Record<string, Disease>, disease) => {
    acc[disease.title] = disease;
    return acc;
}, {});
