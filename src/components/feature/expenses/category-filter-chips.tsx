'use client'

import { Dispatch } from "react"
import { categories } from "@/utils/data"
import { Action } from "@/utils/types"

type Props = {
    dispatch: Dispatch<Action>;
    activeCategories: string[];
    amountRange: [number, number];
    dateRange: { from?: Date | undefined; to?: Date | undefined };
}

function CategoryFilterChips({ dispatch, activeCategories, amountRange, dateRange }: Props) {
    const active = new Set(activeCategories)

    function toggle(category: string) {
        const next = new Set(active)
        next.has(category) ? next.delete(category) : next.add(category)
        dispatch({ type: 'filter', payload: { categories: Array.from(next), amountRange, dateRange } })
    }

    return (
        <div className="flex flex-wrap gap-1.5">
            {categories.map((category) => {
                const isActive = active.has(category)

                return (
                    <button
                        key={category}
                        onClick={() => toggle(category)}
                        aria-pressed={isActive}
                        className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus:outline-none focus-visible:outline-ring ${
                            isActive
                                ? 'border-primary bg-primary text-primary-foreground'
                                : 'border-border bg-card text-muted-foreground hover:bg-secondary'
                        }`}
                    >
                        {category}
                    </button>
                )
            })}
        </div>
    )
}

export default CategoryFilterChips
