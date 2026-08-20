'use client'

import LatestExpense from "@/components/feature/overview/latest-expense"
import AddExpenseButton from "@/components/ui/add-expense-button"
import { getLatestExpenses } from "@/utils/functions"
import { Expense } from "@/utils/types"

type Props = {
    userId: string;
    currency: string;
    allExpenses: Expense[];
}

function LatestExpenses({ userId, currency, allExpenses }: Props) {
    const latestExpenses = getLatestExpenses(allExpenses)

    return (
        <div className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-6">
            <div className="flex items-baseline justify-between">
                <span className="text-base font-bold text-foreground">Recent expenses</span>

                <AddExpenseButton userId={userId} />
            </div>

            {latestExpenses.length === 0 ? (
                <p className="text-sm tracking-wide text-muted-foreground">No expenses yet.</p>
            ) : (
                <div className="flex flex-col">
                    {latestExpenses.map((expense) => (
                        <LatestExpense
                            key={expense.expense_id}
                            expense={expense}
                            currency={currency}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default LatestExpenses
