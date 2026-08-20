'use client'

import { useState, useTransition } from 'react'
import Amount from '@/components/ui/amount'
import CategoryChipPicker from "@/components/ui/category-chip-picker"
import { setBudget, deleteBudget } from "@/lib/actions"
import { categories } from "@/utils/data"
import { budgetSchemaClient } from "@/utils/schemas"
import { calculateCategoryTotals, formatExpenseAmount, getCategoryColor, getMonthYearRange } from "@/utils/functions"
import { Expense } from "@/utils/types"

type Budget = { category: string; monthlyLimit: number }

type Props = {
    userId: string;
    budgets: Budget[];
    allExpenses: Expense[];
    currency: string;
    currencySymbol: string;
}

function initial(category: string) {
    return category.trim()[0]?.toUpperCase() ?? '?'
}

function barColor(ratio: number) {
    if (ratio >= 1) return 'bg-negative'
    if (ratio >= 0.8) return 'bg-primary'
    return 'bg-positive'
}

function BudgetsPage({ userId, budgets, allExpenses, currency, currencySymbol }: Props) {
    const month = getMonthYearRange(allExpenses)[0]
    const categoryTotals = calculateCategoryTotals(allExpenses, month)

    const [showAdd, setShowAdd] = useState(false)
    const [draftCategory, setDraftCategory] = useState<string>(categories[0])
    const [draftLimit, setDraftLimit] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()

    const spentTotal = budgets.reduce((sum, b) => {
        const idx = categories.indexOf(b.category)
        return sum + (idx === -1 ? 0 : categoryTotals[idx])
    }, 0)
    const limitTotal = budgets.reduce((sum, b) => sum + b.monthlyLimit, 0)

    function handleSave() {
        const parsed = budgetSchemaClient.safeParse({ category: draftCategory, monthlyLimit: draftLimit })
        if (!parsed.success) {
            setError(parsed.error.issues[0]?.message ?? 'Invalid budget')
            return
        }
        setError(null)
        startTransition(async () => {
            await setBudget(userId, draftCategory, parseFloat(draftLimit))
            setDraftLimit('')
            setShowAdd(false)
        })
    }

    function handleRemove(category: string) {
        startTransition(() => {
            deleteBudget(userId, category)
        })
    }

    return (
        <div className="flex flex-col gap-5 max-w-[760px] px-11 pb-14 pt-6 max-[1400px]:px-8 max-[1160px]:px-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1.5">
                    <h1 className="text-[30px] font-bold tracking-tight text-foreground max-[1400px]:text-2xl">Budgets</h1>
                    <span className="font-mono text-xs tabular-nums text-muted-foreground">
                        {currencySymbol} <Amount value={formatExpenseAmount(spentTotal, currency)} /> spent of {currencySymbol} <Amount value={formatExpenseAmount(limitTotal, currency)} /> allotted
                    </span>
                </div>

                <button
                    onClick={() => setShowAdd((v) => !v)}
                    className="whitespace-nowrap rounded-full bg-primary px-5 py-2.5 text-[13px] font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus:outline-none focus-visible:outline-ring active:scale-90"
                >
                    + Add budget
                </button>
            </div>

            {showAdd && (
                <div className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-5">
                    <CategoryChipPicker value={draftCategory} onChange={setDraftCategory} categories={categories} />

                    <div className="flex items-center gap-3">
                        <input
                            value={draftLimit}
                            onChange={(e) => setDraftLimit(e.target.value)}
                            placeholder="Monthly limit"
                            className="flex-1 rounded-full border border-border bg-secondary px-3.5 py-2.5 font-mono text-sm text-foreground focus:outline-none"
                        />

                        <button
                            onClick={handleSave}
                            disabled={isPending}
                            className="whitespace-nowrap rounded-full bg-foreground px-5 py-2.5 text-[13px] font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-50"
                        >
                            {isPending ? 'Saving...' : 'Save'}
                        </button>
                    </div>

                    {error && <span className="text-xs text-destructive">{error}</span>}
                </div>
            )}

            <div className="flex flex-col rounded-3xl border border-border bg-card px-6">
                {budgets.length === 0 ? (
                    <p className="py-10 text-center text-sm tracking-wide text-muted-foreground">No budgets set yet.</p>
                ) : (
                    budgets.map((budget) => {
                        const idx = categories.indexOf(budget.category)
                        const spent = idx === -1 ? 0 : categoryTotals[idx]
                        const ratio = budget.monthlyLimit > 0 ? spent / budget.monthlyLimit : 0
                        const over = ratio >= 1
                        const color = getCategoryColor(budget.category)

                        return (
                            <div key={budget.category} className="flex flex-col gap-2.5 border-b border-border py-5 last:border-0">
                                <div className="flex items-center justify-between">
                                    <span className="flex min-w-0 items-center gap-2.5 truncate text-[14.5px] font-medium text-foreground">
                                        <span
                                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                                            style={{ backgroundColor: color }}
                                        >
                                            {initial(budget.category)}
                                        </span>
                                        {budget.category}
                                    </span>

                                    <div className="flex items-center gap-3">
                                        <span className="whitespace-nowrap font-mono text-[13px] text-muted-foreground">
                                            {currencySymbol} <Amount value={formatExpenseAmount(spent, currency)} /> / <Amount value={formatExpenseAmount(budget.monthlyLimit, currency)} />
                                        </span>

                                        <button
                                            onClick={() => handleRemove(budget.category)}
                                            disabled={isPending}
                                            aria-label={`Remove ${budget.category} budget`}
                                            className="text-muted-foreground transition-colors hover:text-destructive disabled:opacity-50"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>

                                <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                                    <div
                                        className={`h-full rounded-full transition-all ${barColor(ratio)}`}
                                        style={{ width: `${Math.min(ratio, 1) * 100}%` }}
                                    />
                                </div>

                                <span className={`font-mono text-xs ${over ? 'text-destructive' : 'text-muted-foreground'}`}>
                                    {currencySymbol} <Amount value={over ? formatExpenseAmount(spent - budget.monthlyLimit, currency) : formatExpenseAmount(budget.monthlyLimit - spent, currency)} /> {over ? 'over budget' : 'left this month'}
                                </span>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}

export default BudgetsPage
