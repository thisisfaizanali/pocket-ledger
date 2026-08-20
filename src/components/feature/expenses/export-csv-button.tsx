'use client'

import { FiDownload } from "react-icons/fi"
import { utcToLocal } from "@/utils/functions"
import { Expense } from "@/utils/types"

type Props = {
    expenses: Expense[];
    currency: string;
}

function escapeCsvField(value: string): string {
    return `"${value.replace(/"/g, '""')}"`
}

function ExportCsvButton({ expenses, currency }: Props) {
    function handleExport() {
        const header = ['Name', 'Category', 'Date', `Amount (${currency})`]
        const rows = expenses.map(expense => [
            expense.name,
            expense.category,
            utcToLocal(expense.date),
            expense.amount.toString()
        ])

        const csv = [header, ...rows]
            .map(row => row.map(field => escapeCsvField(field)).join(','))
            .join('\r\n')

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `expenses-${new Date().toISOString().slice(0, 10)}.csv`
        link.click()
        URL.revokeObjectURL(url)
    }

    return (
        <button
            type="button"
            onClick={handleExport}
            disabled={expenses.length === 0}
            aria-label="Export expenses as CSV"
            className="bg-card text-muted-foreground border border-border p-2.5 rounded-full hover:bg-secondary hover:text-foreground transition-all focus:outline-none focus-visible:!outline-ring transform active:scale-90 ease-in-out duration-200 disabled:opacity-50 disabled:pointer-events-none"
        >
            <FiDownload className="text-lg" />
        </button>
    )
}

export default ExportCsvButton
