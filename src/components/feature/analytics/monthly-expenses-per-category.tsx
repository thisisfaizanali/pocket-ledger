import { Dispatch, SetStateAction } from "react"
import { Cell, Pie, PieChart } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/shadcn/chart"
import AnalyticsCardHeader from "./analytics-card-header"
import { categories } from "@/utils/data"
import { formatExpenseAmount, getCategoryColor, getCurrencySymbol } from "@/utils/functions"

type Props = {
    data: number[];
    currency: string;
    handleCard: Dispatch<SetStateAction<number>>;
    month: string;
}

const chartConfig = {
    amount: { label: "Amount" },
} satisfies ChartConfig

function MonthlyExpensesPerCategory({ data, currency, handleCard }: Props) {
    const chartData = categories
        .map((category, index) => ({ category, amount: data[index], fill: getCategoryColor(category) }))
        .filter((entry) => entry.amount > 0)

    const total = data.reduce((sum, amount) => sum + amount, 0)

    return (
        <Card className="bg-transparent border-0 shadow-none">
            <CardHeader className="p-0">
                <CardTitle>
                    <AnalyticsCardHeader
                        title="Where Your Money Goes"
                        onNext={() => handleCard((card) => card + 1)}
                    />
                </CardTitle>
            </CardHeader>

            <CardContent className="p-0 mt-6 max-[1400px]:mt-5">
                {chartData.length === 0 ? (
                    <p className="text-center text-muted-foreground py-16 tracking-wide">
                        No expenses recorded this month.
                    </p>
                ) : (
                    <>
                        <div className="relative mx-auto aspect-square max-h-72 w-full">
                            <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-72">
                                <PieChart>
                                    <ChartTooltip
                                        content={
                                            <ChartTooltipContent
                                                hideLabel
                                                nameKey="category"
                                                formatter={(value, name) => (
                                                    <span className="tracking-wide">
                                                        {name}: {getCurrencySymbol(currency)} {formatExpenseAmount(value as number)}
                                                    </span>
                                                )}
                                            />
                                        }
                                    />
                                    <Pie
                                        data={chartData}
                                        dataKey="amount"
                                        nameKey="category"
                                        innerRadius="55%"
                                        outerRadius="85%"
                                        strokeWidth={2}
                                    >
                                        {chartData.map((entry) => (
                                            <Cell key={entry.category} fill={entry.fill} stroke="hsl(var(--card))" />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ChartContainer>

                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="font-mono tabular-nums text-lg max-[800px]:text-base font-semibold text-foreground">
                                    {getCurrencySymbol(currency)} {formatExpenseAmount(total)}
                                </span>
                                <span className="text-xs text-muted-foreground tracking-wide">Total spent</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4 text-sm text-foreground tracking-wide">
                            {chartData.map((entry) => (
                                <div key={entry.category} className="flex items-center gap-1.5">
                                    <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: entry.fill }} />
                                    {entry.category}
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    )
}

export default MonthlyExpensesPerCategory;
