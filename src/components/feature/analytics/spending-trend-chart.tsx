import { Dispatch, SetStateAction } from "react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/shadcn/chart"
import AnalyticsCardHeader from "./analytics-card-header"
import { formatExpenseAmount, getCurrencySymbol } from "@/utils/functions"

type Props = {
    data: { month: string; total: number }[];
    currency: string;
    handleCard: Dispatch<SetStateAction<number>>;
}

const chartConfig = {
    total: { label: "Total spent", color: "hsl(var(--gold))" },
} satisfies ChartConfig

function SpendingTrendChart({ data, currency, handleCard }: Props) {
    const hasSpending = data.some((point) => point.total > 0)

    return (
        <Card className="bg-transparent border-0 shadow-none">
            <CardHeader className="p-0">
                <CardTitle>
                    <AnalyticsCardHeader
                        title="Spending Trend"
                        onBack={() => handleCard((card) => card - 1)}
                        onNext={() => handleCard((card) => card + 1)}
                    />
                </CardTitle>
            </CardHeader>

            <CardContent className="p-0 mt-6 max-[1400px]:mt-5">
                {!hasSpending ? (
                    <p className="text-center text-muted-foreground py-16 tracking-wide">
                        Not enough history yet to show a trend.
                    </p>
                ) : (
                    <ChartContainer config={chartConfig} className="aspect-auto h-72 w-full">
                        <LineChart data={data} margin={{ left: 0, right: 12, top: 12, bottom: 0 }}>
                            <CartesianGrid vertical={false} stroke="hsl(var(--border))" />

                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={12}
                                tickFormatter={(value: string) => value.split(' ')[0].slice(0, 3)}
                                className="text-xs"
                            />

                            <ChartTooltip
                                content={
                                    <ChartTooltipContent
                                        nameKey="total"
                                        labelFormatter={(value) => value}
                                        formatter={(value) => (
                                            <span className="font-mono tabular-nums tracking-wide">
                                                {getCurrencySymbol(currency)} {formatExpenseAmount(value as number)}
                                            </span>
                                        )}
                                    />
                                }
                            />

                            <Line
                                type="monotone"
                                dataKey="total"
                                stroke="var(--color-total)"
                                strokeWidth={2}
                                dot={{ fill: "var(--color-total)", r: 3 }}
                                activeDot={{ r: 5 }}
                            />
                        </LineChart>
                    </ChartContainer>
                )}
            </CardContent>
        </Card>
    )
}

export default SpendingTrendChart;
