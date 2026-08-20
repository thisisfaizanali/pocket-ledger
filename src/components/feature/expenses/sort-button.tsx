'use client'

import { Dispatch } from "react"
import { Action } from "@/utils/types"

type Props = {
    dispatch: Dispatch<Action>;
    sortBy: 'Date' | 'Amount';
    sortDirection: 'Ascending' | 'Descending';
}

function SortButton({ dispatch, sortBy, sortDirection }: Props) {
    function toggleSortBy() {
        dispatch({ type: 'sort', payload: { sortBy: sortBy === 'Date' ? 'Amount' : 'Date', direction: sortDirection } })
    }

    function toggleDirection() {
        dispatch({ type: 'sort', payload: { sortBy, direction: sortDirection === 'Descending' ? 'Ascending' : 'Descending' } })
    }

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={toggleSortBy}
                className="rounded-full border border-border bg-card px-3.5 py-2 text-xs font-medium text-foreground transition-colors hover:bg-secondary focus:outline-none focus-visible:outline-ring active:scale-90"
            >
                Sort: {sortBy}
            </button>

            <button
                onClick={toggleDirection}
                aria-label={`Sort ${sortDirection === 'Descending' ? 'ascending' : 'descending'}`}
                className="rounded-full border border-border bg-card px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-secondary focus:outline-none focus-visible:outline-ring active:scale-90"
            >
                {sortDirection === 'Descending' ? '↓' : '↑'}
            </button>
        </div>
    )
}

export default SortButton
