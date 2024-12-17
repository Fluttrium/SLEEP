"use client";

import { useEffect, useState } from "react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";

const chartConfig = {
    desktop: {
        label: "",
        color: "hsl(var(--chart-3))",
    },
};

export function TestChart({ userId }: { userId: string }) {
    const [chartData, setChartData] = useState<{ month: string; desktop: number }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            if (!userId) return console.log("User ID is not provided.");

            try {
                let dataFetched = false;

                // 1. Попытка загрузить данные с сервера
                const response = await fetch("/api/user/test", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId }),
                });

                if (response.ok) {
                    const result = await response.json();
                    if (result?.diseasesList?.length > 0) {
                        const formattedData = result.diseasesList.map((item: string) => {
                            const parsedItem = JSON.parse(item);
                            return {
                                month: parsedItem.title,
                                desktop: parsedItem.score,
                            };
                        });
                        setChartData(formattedData);
                        localStorage.setItem("testResults", JSON.stringify(formattedData));
                        dataFetched = true;
                    }
                }

                // 2. Если с сервера данных нет, загружаем из localStorage
                if (!dataFetched) {
                    const storedData = localStorage.getItem("testResults");

                    // Проверка данных из localStorage
                    if (storedData) {
                        let parsedData;

                        try {
                            // Парсим данные из localStorage
                            parsedData = JSON.parse(storedData);

                            // Проверяем, что это массив
                            if (!Array.isArray(parsedData)) {
                                console.error("Stored data is not a valid array");
                                return;
                            }
                        } catch (e) {
                            console.error("Error parsing stored data:", e);
                            return;
                        }

                        // Отправка данных на сервер
                        const saveResponse = await fetch("/api/user/test", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ userId, results: parsedData }),
                        });

                        if (saveResponse.ok) {
                            let parsedData = JSON.parse(storedData);

                            // Проверка: если данные — массив строк, парсим каждую строку
                            if (Array.isArray(parsedData)) {
                                parsedData = parsedData.map((item) => {
                                    if (typeof item === "string") {
                                        try {
                                            return JSON.parse(item); // Парсим строку в объект
                                        } catch (e) {
                                            console.error("Error parsing item:", item, e);
                                        }
                                    }
                                    return item; // Возвращаем, если это уже объект
                                });

                                // Проверяем, что каждый элемент имеет title и score
                                const validData = parsedData.filter(
                                    (item: { title: undefined; score: undefined; }) => item?.title !== undefined && item?.score !== undefined
                                );

                                setChartData(
                                    validData.map((item: { title: any; score: any; }) => ({
                                        month: item.title,
                                        desktop: item.score,
                                    }))
                                );
                                console.log("Loaded and parsed local data:", validData);
                            }
                            console.log("Local data successfully sent to server and applied to chart.");
                        } else {
                            console.warn("Failed to update server with local data. Using local data only.");
                            setChartData(parsedData);
                        }
                    }
                }
            } catch (error) {
                console.error("Error loading chart data:", error);
            }
        };

        fetchData();
    }, [userId]);

    return (
        <Card className='w-full'>
            <CardHeader className="items-center pb-4">
                <CardTitle>Результаты теста</CardTitle>
                <CardDescription>
                    График выявленных проблем по результатам теста
                </CardDescription>
            </CardHeader>
            <CardContent className="pb-0">
                {chartData.length > 0 ? (
                    <ChartContainer
                        config={chartConfig}
                        className="mx-auto aspect-square "
                    >
                        <RadarChart data={chartData}>
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent />}
                            />
                            <PolarAngleAxis
                                dataKey="month"
                                tick={(props) => {
                                    const { payload, x, y, textAnchor } = props;
                                    const words = payload.value.split(" ");
                                    return (
                                        <text
                                            x={x}
                                            y={y}
                                            textAnchor={textAnchor}
                                            dominantBaseline="central"
                                            style={{ fontSize: "12px" }}
                                        >
                                            {words.map((word: string, index: number) => (
                                                <tspan key={index} x={x} dy={index === 0 ? "0em" : "1em"}>
                                                    {word}
                                                </tspan>
                                            ))}
                                        </text>
                                    );
                                }}
                            />
                            <PolarGrid />
                            <Radar
                                dataKey="desktop"
                                fill="var(--color-desktop)"
                                fillOpacity={0.6}
                            />
                        </RadarChart>
                    </ChartContainer>
                ) : (
                    <div className="text-center">Нет данных для отображения.</div>
                )}
            </CardContent>
            <CardFooter className="flex justify-center">
                <Button className="text-xl font-semibold">Записаться на консультацию</Button>
            </CardFooter>
        </Card>
    );
}
