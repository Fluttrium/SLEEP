"use client"
import { Pie, PieChart } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

// Исходный конфиг с цветами
const chartConfig: ChartConfig = {
    chrome: {
        label: "Chrome",
        color: "hsl(var(--chart-1))",
    },
    safari: {
        label: "Safari",
        color: "hsl(var(--chart-2))",
    },
    firefox: {
        label: "Firefox",
        color: "hsl(var(--chart-3))",
    },
    edge: {
        label: "Edge",
        color: "hsl(var(--chart-4))",
    },
    other: {
        label: "Other",
        color: "hsl(var(--chart-5))",
    },
};

// Функция для генерации конфигурации на основе названий заболеваний
const generateChartConfig = (diseasesList: any[]): ChartConfig => {
    const config: ChartConfig = {};

    // Маппируем заболевания на доступные цвета из исходного конфигурации
    diseasesList.forEach((disease, index) => {
        const diseaseKey = disease.title.toLowerCase().replace(/\s+/g, ''); // Преобразуем название в ключ
        const colorKey = Object.keys(chartConfig)[index % Object.keys(chartConfig).length]; // Используем цвета из chartConfig

        config[diseaseKey] = {
            label: disease.title,
            color: chartConfig[colorKey].color, // Применяем цвет
        };
    });

    return config;
};

export function NewChart({ diseasesList }: { diseasesList: any[] }) {
    // Генерируем конфигурацию на основе списка заболеваний
    const dynamicChartConfig = generateChartConfig(diseasesList);

    // Маппируем данные для отображения на графике
    const chartData = diseasesList.map(disease => {
        const diseaseKey = disease.title.toLowerCase().replace(/\s+/g, '');
        return {
            name: disease.title, // Название заболевания
            value: disease.score, // Оценка заболевания
            fill: dynamicChartConfig[diseaseKey]?.color || "gray", // Применяем цвет из динамической конфигурации
        };
    });

    return (
        <Card className="flex flex-row w-full">
            <CardHeader className="items-center pb-0 w-1/2">
                <CardTitle>Результаты теста</CardTitle>
                <CardDescription className="flex flex-col gap-3">
                    Вы отлично постарались! 🎉 Ваш тест завершён, и результаты готовы. На основе ваших ответов мы смогли предположить возможные проблемы и пути их решения.
                    <strong>Ваш предположительный диагноз:</strong>
                    <span className="text-green-600 text-2xl">Лёгкая форма бессонницы</span>
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 my-10 items-center">
                <ChartContainer
                    config={dynamicChartConfig}  // Используем динамически сгенерированную конфигурацию
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie data={chartData} dataKey="value" nameKey="name" />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
