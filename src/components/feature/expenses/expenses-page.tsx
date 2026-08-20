'use client'

import { useReducer } from "react"
import AddExpenseButton from "@/components/ui/add-expense-button"
import CategoryFilterChips from "./category-filter-chips"
import ExpensesTable from "./expenses-table"
import ExportCsvButton from "./export-csv-button"
import FilterButton from "./filter-button"
import SortButton from "./sort-button"
import { reducer } from "@/lib/reducer"
import { categories } from "@/utils/data"
import { User, Expense } from '@/utils/types'

type Props = {
    user: User;
    expenses: Expense[];
    totalPages: number;
    minAmount: number;
    maxAmount: number;
    currentPage: number;
}

function ExpensesPage({ user, expenses, totalPages, minAmount, maxAmount, currentPage }: Props) {
    const [state, dispatch] = useReducer(reducer, {
        originalExpenseList: expenses,
        filteredExpenseList: expenses,
        totalPages: totalPages,
        currentPage: currentPage,
        sortBy: 'Date',
        sortDirection: 'Descending',
        filters: {
            categories: categories,
            amountRange: [minAmount, maxAmount],
            dateRange: { from: undefined, to: undefined }
        }
    });

    return (
        <div className="flex flex-col gap-5 px-11 pb-14 pt-6 max-[1400px]:px-8 max-[1160px]:px-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-[30px] font-bold tracking-tight text-foreground max-[1400px]:text-2xl">Expenses</h1>

                <div className="flex items-center gap-2 max-[630px]:gap-1.5">
                    <SortButton
                        dispatch={dispatch}
                        sortBy={state.sortBy}
                        sortDirection={state.sortDirection}
                    />

                    <FilterButton
                        dispatch={dispatch}
                        currency={user.currency}
                        minAmount={state.filters.amountRange[0]}
                        maxAmount={state.filters.amountRange[1]}
                        filterConfig={state.filters}
                    />

                    <AddExpenseButton userId={user.user_id} />

                    <ExportCsvButton expenses={state.filteredExpenseList} currency={user.currency} />
                </div>
            </div>

            <CategoryFilterChips
                dispatch={dispatch}
                activeCategories={state.filters.categories}
                amountRange={state.filters.amountRange}
                dateRange={state.filters.dateRange}
            />

            <ExpensesTable
                expenses={state.filteredExpenseList}
                currency={user.currency}
                pageCount={state.totalPages}
                dispatch={dispatch}
                currentPage={state.currentPage}
                userId={user.user_id}
            />
        </div>
    )
}

export default ExpensesPage;
