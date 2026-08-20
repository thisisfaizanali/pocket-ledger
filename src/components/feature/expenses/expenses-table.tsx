'use client'

import { Dispatch } from "react"
import ExpensesPagination from "@/components/feature/expenses/expenses-pagination"
import Amount from '@/components/ui/amount'
import ExpensesTableRecord from "./expenses-table-record"
import { formatExpenseAmount, getCurrencySymbol } from "@/utils/functions"
import { Expense, Action } from "@/utils/types"

type Props = {
    expenses: Expense[];
    currency: string;
    pageCount: number;
    dispatch: Dispatch<Action>;
    currentPage: number;
    userId: string;
}

const ITEMS_PER_PAGE = 10;

function ExpensesTable({ expenses, currency, dispatch, currentPage, userId }: Props) {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const currencySymbol = getCurrencySymbol(currency);
    const displayedExpenses = expenses.slice(startIndex, endIndex);
    // Recomputed locally (rather than trusting the `pageCount` prop) because the
    // reducer's own PAGE_SIZE (9) doesn't match ITEMS_PER_PAGE (10) here — see
    // CLAUDE.md's documented pagination-size inconsistency.
    const totalPages = Math.max(1, Math.ceil(expenses.length / ITEMS_PER_PAGE));

    return (
        <>
            <div className="overflow-hidden rounded-3xl border border-border bg-card">
                <table className="w-full table-auto border-collapse text-left">
                    <thead>
                        <tr className="border-b border-border text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                            <th className="px-5 py-3.5">Description</th>
                            <th className="px-2 py-3.5 max-[900px]:hidden">Category</th>
                            <th className="px-2 py-3.5">Date</th>
                            <th className="px-2 py-3.5 text-right">Amount</th>
                            <th className="px-5 py-3.5 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {displayedExpenses.map((expense) => (
                            <ExpensesTableRecord
                                expense={expense}
                                currency={currency}
                                key={expense.expense_id}
                            />
                        ))}

                        <tr className="bg-secondary font-bold text-foreground">
                            <td className="px-5 py-4">Total</td>
                            <td className="max-[900px]:hidden" />
                            <td />
                            <td className="px-2 py-4 text-right font-mono tabular-nums">{currencySymbol} <Amount value={formatExpenseAmount(totalAmount, currency)} /></td>
                            <td className="px-5 py-4" />
                        </tr>
                    </tbody>
                </table>
            </div>

            <ExpensesPagination
                pageCount={totalPages}
                currentPage={currentPage}
                dispatch={dispatch}
                userId={userId}
            />
        </>
    )
}

export default ExpensesTable;
