"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

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

export const description = "A stacked area chart"

const chartData = [
    { month: "Январь", desktop: 186, mobile: 80 },
    { month: "Февраль", desktop: 305, mobile: 200 },
    { month: "Март", desktop: 237, mobile: 120 },
    { month: "Апрель", desktop: 73, mobile: 190 },
    { month: "Май", desktop: 209, mobile: 130 },
    { month: "Июнь", desktop: 214, mobile: 140 },
]

const chartConfig = {
    desktop: {
        label: "Новые регистрации",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "Новые пройденные опросы",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

export function Chart1() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>График виральности опросов</CardTitle>
                <CardDescription>
                    Показывает отношения новых пользователей на платформе к пройденным опросам новыми пользователями.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
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
                            cursor={false}
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
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className=" items-center gap-2 font-medium leading-none">
                            Количество новых пользователей увеличилось на 5.2 процента за этот месяц <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            Январь - Июнь 2024
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}
