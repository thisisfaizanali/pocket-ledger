import Amount from '@/components/ui/amount'
import { categories } from "@/utils/data"
import { formatExpenseAmount, getCategoryColor, getCurrencySymbol } from "@/utils/functions"

type Props = {
    data: { amount: number; description: string; }[];
    currency: string;
}

function HighestExpensePerCategory({ data, currency }: Props) {
    return (
        <div className="grid grid-cols-2 max-[800px]:grid-cols-1 gap-3.5">
            {categories.map((category, index) => (
                <div key={category} className="grid grid-cols-[180px_1fr_90px] items-center gap-3.5 max-[500px]:grid-cols-[140px_1fr_auto]">
                    <span className="flex items-center gap-2 truncate text-[13.5px] text-foreground">
                        <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: getCategoryColor(category) }} />
                        {category}
                    </span>

                    <span className="truncate text-[13px] text-muted-foreground">{data[index].description}</span>

                    <span className="text-right font-mono text-[13px] text-foreground">
                        {data[index].amount !== 0 && <>{getCurrencySymbol(currency)} <Amount value={formatExpenseAmount(data[index].amount, currency)} /></>}
                    </span>
                </div>
            ))}
        </div>
    )
}

export default HighestExpensePerCategory;
