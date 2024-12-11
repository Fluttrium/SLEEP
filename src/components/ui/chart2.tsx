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
        console.log(userId);
        const fetchData = async () => {
            if (!userId) {
                console.log("User ID is not provided.");
                return;
            }

            try {
                let dataFetched = false;

                // Попробуем загрузить данные с сервера
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
                        console.log("Data successfully fetched from server.");
                    }
                }

                // Если данных нет, проверить локальное хранилище
                if (!dataFetched) {
                    const storedData = localStorage.getItem("testResults");
                    if (storedData) {
                        const parsedData = JSON.parse(storedData);
                        setChartData(parsedData);
                        console.log("Loaded data from local storage.");
                    } else {
                        console.log("No data available locally or from the server.");
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
