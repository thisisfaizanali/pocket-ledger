import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/shadcn/chart"
import Amount from '@/components/ui/amount'
import { formatExpenseAmount, getCurrencySymbol } from "@/utils/functions"

type Props = {
    data: { month: string; total: number }[];
    currency: string;
}

const chartConfig = {
    total: { label: "Total spent", color: "hsl(var(--brand))" },
} satisfies ChartConfig

function SpendingTrendChart({ data, currency }: Props) {
    const hasSpending = data.some((point) => point.total > 0)

    if (!hasSpending) {
        return (
            <p className="text-center text-muted-foreground py-16 tracking-wide">
                Not enough history yet to show a trend.
            </p>
        )
    }

    return (
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
                                    {getCurrencySymbol(currency)} <Amount value={formatExpenseAmount(value as number, currency)} />
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
    )
}

export default SpendingTrendChart;
