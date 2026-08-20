'use client'

import { useState } from 'react'
import MonthButton from '@/components/ui/month-button'
import ExpenseFrequencyPerCategory from './expense-frequency-per-category'
import HighestExpensePerCategory from './highest-expense-per-category'
import MonthlyExpensesPerCategory from './monthly-expenses-per-category'
import SpendingTrendChart from './spending-trend-chart'
import { getMonthYearRange, calculateCategoryTotals, processMonthlyTopExpenses, processExpenseFrequency, getMonthlySpendingTrend } from "@/utils/functions"
import { Expense } from '@/utils/types'

const TABS = [
    { id: 1, label: 'By category' },
    { id: 2, label: 'Biggest per category' },
    { id: 3, label: 'Frequency' },
    { id: 4, label: 'Trend' },
] as const

type Props = {
    expenses: Expense[];
    currency: string;
}

function AnalyticsSection({ expenses, currency }: Props) {
    const monthsRange = getMonthYearRange(expenses)

    const [month, setMonth] = useState(monthsRange[0])
    const [tab, setTab] = useState<number>(1)

    return (
        <div className="flex flex-col gap-5 px-11 pb-14 pt-6 max-[1400px]:px-8 max-[1160px]:px-6">
            <div className="flex items-baseline justify-between">
                <h1 className="text-[30px] font-bold tracking-tight text-foreground max-[1400px]:text-2xl">Analytics</h1>

                <MonthButton
                    month={month}
                    handleSetMonth={setMonth}
                    monthsRange={monthsRange}
                />
            </div>

            <div className="flex w-fit gap-1 rounded-full border border-border bg-card p-1">
                {TABS.map((t) => (
                    <button
                        key={t.id}
                        onClick={() => setTab(t.id)}
                        className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium transition-colors focus:outline-none focus-visible:outline-ring ${
                            tab === t.id
                                ? 'bg-secondary font-semibold text-foreground'
                                : 'text-muted-foreground hover:text-foreground'
                        }`}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            <div className="rounded-3xl border border-border bg-card p-6">
                {tab === 1 && (
                    <MonthlyExpensesPerCategory
                        data={calculateCategoryTotals(expenses, month)}
                        currency={currency}
                    />
                )}

                {tab === 2 && (
                    <HighestExpensePerCategory
                        data={processMonthlyTopExpenses(expenses, month)}
                        currency={currency}
                    />
                )}

                {tab === 3 && (
                    <ExpenseFrequencyPerCategory
                        data={processExpenseFrequency(expenses, month)}
                    />
                )}

                {tab === 4 && (
                    <SpendingTrendChart
                        data={getMonthlySpendingTrend(expenses, monthsRange)}
                        currency={currency}
                    />
                )}
            </div>
        </div>
    )
}

export default AnalyticsSection;
