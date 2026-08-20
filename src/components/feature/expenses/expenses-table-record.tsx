'use client'

import { useMediaQuery } from '@react-hook/media-query'
import Amount from '@/components/ui/amount'
import CategoryLabel from "./category-label"
import ExpenseDeleteButton from "./expense-delete-button"
import ExpenseEditButton from "./expense-edit-button"
import { formatExpenseAmount, getCurrencySymbol, utcToLocal, utcToLocalShorter } from "@/utils/functions"
import { Expense } from "@/utils/types"

type Props = {
    expense: Expense;
    currency: string
}

function ExpensesTableRecord({ expense, currency }: Props) {
    const isMobile = useMediaQuery('(max-width: 630px)')
    const currencySymbol = getCurrencySymbol(currency);

    return (
        <tr className="border-b border-border text-sm text-foreground last:border-0">
            <td className="px-5 py-3.5 max-[515px]:hidden">{expense.name}</td>

            <td className="px-2 py-3.5 max-[900px]:hidden">
                <CategoryLabel category={expense.category} />
            </td>

            <td className="px-2 py-3.5 font-mono text-xs tabular-nums text-muted-foreground max-[515px]:pl-5">
                {isMobile && <span className="mr-2 text-foreground font-sans">{expense.name}</span>}
                {isMobile ? utcToLocalShorter(expense.date) : utcToLocal(expense.date)}
            </td>

            <td className="px-2 py-3.5 text-right font-mono font-semibold tabular-nums">
                {currencySymbol} <Amount value={formatExpenseAmount(expense.amount, currency)} />
            </td>

            <td className="px-5 py-3.5">
                <div className="flex justify-end gap-3">
                    <ExpenseEditButton expense={expense} />
                    <ExpenseDeleteButton expense_id={expense.expense_id} />
                </div>
            </td>
        </tr>
    )
}

export default ExpensesTableRecord;
