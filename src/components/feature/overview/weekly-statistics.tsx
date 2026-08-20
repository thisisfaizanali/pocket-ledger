import ExpenseDistributionChart from "./expense-distribution-chart"
import { getCurrentMonthExpenses } from "@/utils/functions"
import { Expense } from "@/utils/types"

type Props = {
    allExpenses: Expense[];
    month: string;
}

function MonthlyStatistics({ allExpenses, month }: Props) {
    const data = getCurrentMonthExpenses(allExpenses, month)

    return (
        <div className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-6">
            <span className="text-sm font-bold text-foreground">Expense distribution</span>

            <ExpenseDistributionChart chartData={data} />
        </div>
    )
}

export default MonthlyStatistics;
