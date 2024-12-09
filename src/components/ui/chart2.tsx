"use client";

import {useEffect, useState} from "react";
import {PolarAngleAxis, PolarGrid, Radar, RadarChart} from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import {Button} from "@/components/ui/button";

const chartConfig = {
    desktop: {
        label: "",
        color: "hsl(var(--chart-3))",
    },
} satisfies ChartConfig;

export function TestChart() {
    const [chartData, setChartData] = useState<{ month: string; desktop: number }[]>([]);

    useEffect(() => {
        // Извлечение данных из localStorage
        const storedData = localStorage.getItem("testResults");
        if (storedData) {
            const parsedData = JSON.parse(storedData);

            // Проверяем, что данные имеют ожидаемую структуру
            if (Array.isArray(parsedData)) {
                const formattedData = parsedData.map((item) => ({
                    month: item.title, // Используем "title" как ключ для месяца
                    desktop: item.score, // Используем "score" как значение
                }));

                setChartData(formattedData);
            }
        }
    }, []);


    return (
        <Card className='w-1/2'>
            <CardHeader className="items-center pb-4">
                <CardTitle>Результаты теста</CardTitle>
                <CardDescription>
                    График выявленных проблем по результатам теста
                </CardDescription>
            </CardHeader>
            <CardContent className="pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[600px]"
                >
                    <RadarChart data={chartData}>
                        <ChartTooltip active={false} cursor={false}
                                      content={<ChartTooltipContent hideIndicator={true}/>}/>
                        <PolarAngleAxis dataKey="month"/>
                        <PolarGrid/>
                        <Radar
                            dataKey="desktop"
                            fill="var(--color-desktop)"
                            fillOpacity={0.6}
                        />
                    </RadarChart>
                </ChartContainer>
                <CardFooter className=' flex justify-center  -mt-28'>
                    <Button className='text-xl font-semibold'>Записаться на консультацию </Button>
                </CardFooter>
            </CardContent>
        </Card>
    );
}
