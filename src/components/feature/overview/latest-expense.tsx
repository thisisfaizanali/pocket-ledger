'use client'

import { useTransition } from 'react'
import Amount from '@/components/ui/amount'
import { deleteExpense } from '@/lib/actions'
import { formatExpenseAmount, getCategoryColor, getCurrencySymbol, utcToLocalShorter } from "@/utils/functions"
import { Expense } from "@/utils/types"

type Props = {
    expense: Expense;
    currency: string;
}

function initial(category: string) {
    return category.trim()[0]?.toUpperCase() ?? '?'
}

function LatestExpense({ expense, currency }: Props) {
    const [isPending, startTransition] = useTransition()
    const currencySymbol = getCurrencySymbol(currency)

    function handleRemove() {
        startTransition(() => {
            deleteExpense(expense.expense_id)
        })
    }

    return (
        <div className="grid grid-cols-[32px_1fr_130px_auto] items-center gap-3.5 border-b border-border py-3 last:border-0">
            <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                style={{ backgroundColor: getCategoryColor(expense.category) }}
            >
                {initial(expense.category)}
            </span>

            <div className="flex min-w-0 flex-col gap-0.5">
                <span className="truncate text-sm font-medium text-foreground">{expense.name}</span>
                <span className="truncate text-xs text-muted-foreground">{expense.category} · {utcToLocalShorter(expense.date)}</span>
            </div>

            <span className="whitespace-nowrap text-right font-mono text-sm font-semibold text-foreground">
                {currencySymbol} <Amount value={formatExpenseAmount(expense.amount, currency)} />
            </span>

            <button
                onClick={handleRemove}
                disabled={isPending}
                className="p-1 text-[11.5px] text-muted-foreground transition-colors hover:text-destructive focus:outline-none focus-visible:outline-ring disabled:opacity-50"
            >
                Remove
            </button>
        </div>
    )
}

export default LatestExpense
