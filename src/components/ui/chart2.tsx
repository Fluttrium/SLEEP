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
};

export function TestChart({chartData}: { chartData: any }) {

    return (
        <div className='h-full w-'>
        <Card className=''>
            <CardHeader className="items-center ">
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
                                content={<ChartTooltipContent/>}
                            />
                            <PolarAngleAxis
                                dataKey="month"
                                tick={(props) => {
                                    const {payload, x, y, textAnchor} = props;
                                    const words = payload.value.split(" ");
                                    return (
                                        <text
                                            x={x}
                                            y={y}
                                            textAnchor={textAnchor}
                                            dominantBaseline="central"
                                            style={{fontSize: "12px"}}
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
                            <PolarGrid/>
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

        </Card>
        </div>
    );
}
