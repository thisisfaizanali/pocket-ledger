'use client'

import { useState } from 'react'
import MonthlyTotal from "@/components/feature/overview/monthly-total"
import MonthlyPicks from "./monthly-picks"
import MonthlyStatistics from "./weekly-statistics"
import BudgetProgress from "./budget-progress"
import { calculateCategoryTotals, getMonthlyHighestExpense, getMonthlyHighestSpentCategory, getMonthlyLeastSpentCategory, getMonthYearRange } from "@/utils/functions"
import { Expense } from "@/utils/types"

type Budget = { category: string; monthlyLimit: number }

type Props = {
    allExpenses: Expense[];
    currency: string;
    currencySymbol: string;
    budgets: Budget[];
}

function MonthlySummary({ allExpenses, currency, currencySymbol, budgets }: Props) {
    const monthsRange = getMonthYearRange(allExpenses)
    const [month, setMonth] = useState(monthsRange[0])

    return (
        <div className="flex flex-col gap-6">
            <MonthlyTotal
                allExpenses={allExpenses}
                currency={currency}
                currencySymbol={currencySymbol}
                monthsRange={monthsRange}
                month={month}
                handleSetMonth={setMonth}
            />

            <MonthlyPicks
                highestExpense={getMonthlyHighestExpense(allExpenses, month)}
                highestSpent={getMonthlyHighestSpentCategory(allExpenses, month)}
                leastSpent={getMonthlyLeastSpentCategory(allExpenses, month)}
                currency={currency}
                symbol={currencySymbol}
                month={month}
            />

            <div className="grid grid-cols-[1.3fr_1fr] gap-4 max-[960px]:grid-cols-1">
                <MonthlyStatistics
                    allExpenses={allExpenses}
                    month={month}
                />

                <BudgetProgress
                    currency={currency}
                    currencySymbol={currencySymbol}
                    budgets={budgets}
                    categoryTotals={calculateCategoryTotals(allExpenses, month)}
                />
            </div>
        </div>
    )
}

export default MonthlySummary;
