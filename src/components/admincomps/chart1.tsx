"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

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

export const description = "A stacked area chart";

// Конфигурация графика
const chartConfig = {
    desktop: {
        label: "Новые регистрации",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "Новые пройденные опросы",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

export function Chart1() {
    const [chartData, setChartData] = useState<
        { month: string; desktop: number; mobile: number }[]
    >([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Функция для загрузки данных
        const fetchData = async () => {
            try {
                const response = await fetch("/api/admin/userchart"); // Замените на правильный роут
                const data = await response.json();

                // Преобразуем данные с сервера для графика
                const formattedData = data.map((item: any) => ({
                    month: item.month,
                    desktop: item.registrationCount,
                    mobile: item.firstTestCount,
                }));

                setChartData(formattedData);
            } catch (error) {
                console.error("Ошибка загрузки данных:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>График виральности опросов</CardTitle>
                <CardDescription>
                    Показывает отношения новых пользователей на платформе к пройденным опросам
                    новыми пользователями.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="flex justify-center items-center">Загрузка данных...</div>
                ) : (
                    <ChartContainer config={chartConfig}>
                        <AreaChart
                            accessibilityLayer
                            data={chartData}
                            margin={{
                                top:12,
                                left: 12,
                                right: 12,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip
                                cursor={true}
                                content={<ChartTooltipContent indicator="dot" />}
                            />
                            <Area
                                dataKey="mobile"
                                type="natural"
                                fill="var(--color-mobile)"
                                fillOpacity={0.4}
                                stroke="var(--color-mobile)"
                                stackId="a"
                            />
                            <Area
                                dataKey="desktop"
                                type="natural"
                                fill="var(--color-desktop)"
                                fillOpacity={0.4}
                                stroke="var(--color-desktop)"
                                stackId="a"
                            />
                        </AreaChart>
                    </ChartContainer>
                )}
            </CardContent>

        </Card>
    );
}
