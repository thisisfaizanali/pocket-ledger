'use client'

import { Dispatch, SetStateAction } from 'react'
import Amount from '@/components/ui/amount'
import MonthButton from '@/components/ui/month-button'
import { calculateMonthlyTotalExpenses } from "@/utils/functions"
import { Expense } from "@/utils/types"

type Props = {
    allExpenses: Expense[];
    currency: string;
    currencySymbol: string;
    monthsRange: string[];
    month: string;
    handleSetMonth: Dispatch<SetStateAction<string>>
}

function MonthlyTotal({ allExpenses, currency, currencySymbol, monthsRange, month, handleSetMonth }: Props) {
    const monthlyTotal = calculateMonthlyTotalExpenses(allExpenses, month, currency)

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <span className="text-[11px] font-bold uppercase tracking-wide text-primary">{month}</span>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground max-[645px]:text-2xl">Overview</h1>
                </div>

                <MonthButton
                    month={month}
                    handleSetMonth={handleSetMonth}
                    monthsRange={monthsRange}
                />
            </div>

            <div className="relative flex flex-col gap-2 overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-card)] max-[1160px]:p-6">
                <div aria-hidden className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-primary opacity-20 blur-3xl" />

                <span className="relative text-xs font-semibold text-muted-foreground">Total spent this month</span>

                <span className="relative whitespace-nowrap font-mono text-5xl font-semibold tracking-tight text-foreground max-[1160px]:text-4xl">
                    {currencySymbol} <Amount value={monthlyTotal} />
                </span>
            </div>
        </div>
    )
}

export default MonthlyTotal;
