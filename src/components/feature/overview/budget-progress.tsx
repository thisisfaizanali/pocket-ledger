import Link from 'next/link'
import Amount from '@/components/ui/amount'
import { categories } from "@/utils/data"
import { formatExpenseAmount } from "@/utils/functions"

type Budget = { category: string; monthlyLimit: number }

type Props = {
    budgets: Budget[];
    currency: string;
    currencySymbol: string;
    categoryTotals: number[];
}

function budgetBarColor(ratio: number) {
    if (ratio >= 1) return 'bg-negative'
    if (ratio >= 0.8) return 'bg-primary'
    return 'bg-positive'
}

function BudgetProgress({ budgets, currency, currencySymbol, categoryTotals }: Props) {
    const topBudgets = budgets.slice(0, 3)

    return (
        <div className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-6">
            <div className="flex items-baseline justify-between">
                <span className="text-sm font-bold text-foreground">Budgets</span>

                <Link
                    href="/dashboard/budgets"
                    className="text-xs font-semibold text-primary hover:underline focus:outline-none focus-visible:outline-ring rounded"
                >
                    Manage all →
                </Link>
            </div>

            {topBudgets.length === 0 ? (
                <p className="text-sm tracking-wide text-muted-foreground">No budgets set yet.</p>
            ) : (
                <div className="flex flex-col gap-4">
                    {topBudgets.map((budget) => {
                        const categoryIndex = categories.indexOf(budget.category)
                        const spent = categoryIndex === -1 ? 0 : categoryTotals[categoryIndex]
                        const ratio = budget.monthlyLimit > 0 ? spent / budget.monthlyLimit : 0

                        return (
                            <div key={budget.category} className="flex flex-col gap-1.5">
                                <div className="flex items-center justify-between gap-2 text-xs">
                                    <span className="min-w-0 flex-1 truncate text-foreground">{budget.category}</span>

                                    <span className="shrink-0 font-mono tabular-nums text-muted-foreground">
                                        {currencySymbol} <Amount value={formatExpenseAmount(spent, currency)} /> / <Amount value={formatExpenseAmount(budget.monthlyLimit, currency)} />
                                    </span>
                                </div>

                                <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                                    <div
                                        className={`h-full rounded-full transition-all ${budgetBarColor(ratio)}`}
                                        style={{ width: `${Math.min(ratio, 1) * 100}%` }}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default BudgetProgress;
