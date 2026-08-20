import Amount from '@/components/ui/amount'
import { categories } from "@/utils/data"
import { formatExpenseAmount, getCategoryColor } from "@/utils/functions"

type Props = {
    data: number[];
}

function ExpenseFrequencyPerCategory({ data }: Props) {
    const max = Math.max(...data, 1)

    return (
        <div className="flex flex-col gap-3.5">
            {categories.map((category, index) => (
                <div key={category} className="grid grid-cols-[180px_1fr_50px] items-center gap-3.5 max-[500px]:grid-cols-1 max-[500px]:gap-1.5">
                    <span className="flex items-center gap-2 truncate text-[13.5px] text-foreground">
                        <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: getCategoryColor(category) }} />
                        {category}
                    </span>

                    <div className="h-2 overflow-hidden rounded-full bg-secondary max-[500px]:hidden">
                        <div
                            className="h-full rounded-full"
                            style={{ width: `${Math.round((data[index] / max) * 100)}%`, backgroundColor: getCategoryColor(category) }}
                        />
                    </div>

                    <span className="text-right font-mono text-[13px] text-foreground"><Amount value={formatExpenseAmount(data[index])} /></span>
                </div>
            ))}
        </div>
    )
}

export default ExpenseFrequencyPerCategory;
