"use client"

import { Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
    { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
    { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
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
} satisfies ChartConfig

export function NewChart() {
    return (
        <Card className="flex flex-row w-full">
            <CardHeader className="items-center pb-0 w-1/2">
                <CardTitle>Результаты теста</CardTitle>
                <CardDescription className='flex flex-col gap-3'>
                    Вы отлично постарались! 🎉 Ваш тест завершён, и результаты готовы. На основе ваших ответов мы смогли предположить возможные проблемы и пути их решения.
                    <strong>Ваш предположительный диагноз:</strong>
                    <span className="text-green-600 text-2xl">Лёгкая форма бессонницы</span>
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 my-10  items-center">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie data={chartData} dataKey="visitors" nameKey="browser" />
                    </PieChart>
                </ChartContainer>
            </CardContent>

        </Card>
    )
}
