'use client'

import { useState, useTransition } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/shadcn/sheet"
import CategoryIcon from "@/components/ui/category-icon"
import BudgetForm from "@/components/ui/budget-form"
import { deleteBudget } from "@/lib/actions"
import { categories } from "@/utils/data"
import { formatExpenseAmount, getCategoryColor } from "@/utils/functions"

type Budget = { category: string; monthlyLimit: number }

type Props = {
    userId: string;
    currencySymbol: string;
    budgets: Budget[];
    categoryTotals: number[];
}

function budgetBarColor(ratio: number) {
    if (ratio >= 1) return 'bg-negative'
    if (ratio >= 0.8) return 'bg-primary'
    return 'bg-positive'
}

function BudgetProgress({ userId, currencySymbol, budgets, categoryTotals }: Props) {
    const [open, setOpen] = useState(false)
    const [isPending, startTransition] = useTransition()

    function handleDelete(category: string) {
        startTransition(async () => {
            await deleteBudget(userId, category)
        })
    }

    return (
        <div className="flex flex-col gap-4 bg-card border border-border rounded-3xl p-6 max-[1160px]:p-5">
            <div className="flex justify-between items-center">
                <p className="font-bold text-lg max-[1400px]:text-base tracking-wide text-foreground">Budgets</p>

                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger className="text-sm font-semibold text-primary hover:underline focus:outline-none focus-visible:outline-ring rounded">
                        + Add budget
                    </SheetTrigger>

                    <SheetContent className="bg-card border-l border-border">
                        <SheetHeader>
                            <SheetTitle className="text-left tracking-wide text-foreground">Set a monthly budget</SheetTitle>
                        </SheetHeader>

                        <BudgetForm userId={userId} onSaved={() => setOpen(false)} />
                    </SheetContent>
                </Sheet>
            </div>

            {budgets.length === 0 ? (
                <p className="text-sm text-muted-foreground tracking-wide">No budgets set yet.</p>
            ) : (
                <div className="flex flex-col gap-4">
                    {budgets.map((budget) => {
                        const categoryIndex = categories.indexOf(budget.category)
                        const spent = categoryIndex === -1 ? 0 : categoryTotals[categoryIndex]
                        const ratio = budget.monthlyLimit > 0 ? spent / budget.monthlyLimit : 0

                        return (
                            <div key={budget.category} className="flex flex-col gap-1.5">
                                <div className="flex justify-between items-center gap-2 text-sm tracking-wide">
                                    <div className="flex items-center gap-2 min-w-0">
                                        <div
                                            className="h-6 w-6 shrink-0 flex justify-center items-center rounded-md"
                                            style={{ backgroundColor: getCategoryColor(budget.category) }}
                                        >
                                            <CategoryIcon category={budget.category} classname="text-sm" />
                                        </div>

                                        <span className="text-foreground truncate">{budget.category}</span>
                                    </div>

                                    <div className="flex items-center gap-2 shrink-0">
                                        <span className="font-mono tabular-nums text-muted-foreground text-xs">
                                            {currencySymbol} {formatExpenseAmount(spent)} / {formatExpenseAmount(budget.monthlyLimit)}
                                        </span>

                                        <button
                                            onClick={() => handleDelete(budget.category)}
                                            disabled={isPending}
                                            aria-label={`Remove ${budget.category} budget`}
                                            className="text-muted-foreground hover:text-negative focus:outline-none focus-visible:outline-ring rounded transition-colors disabled:opacity-50"
                                        >
                                            <RxCross2 />
                                        </button>
                                    </div>
                                </div>

                                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
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
