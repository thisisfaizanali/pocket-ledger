import { ReactNode } from 'react'
import Amount from '@/components/ui/amount'
import { formatExpenseAmount } from "@/utils/functions"

type Props = {
    highestExpense: { amount: number; name: string; };
    highestSpent: { category: string; total: number; }
    leastSpent: { category: string; total: number; }
    currency: string;
    symbol: string;
    month: string;
}

function Pick({ label, value, sub }: { label: string; value: ReactNode; sub: string }) {
    return (
        <div className="flex flex-col justify-center gap-2 rounded-3xl border border-border bg-card p-5">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</span>
            <span className="whitespace-nowrap font-mono text-lg font-semibold text-foreground">{value}</span>
            <span className="truncate text-xs text-muted-foreground">{sub}</span>
        </div>
    )
}

function MonthlyPicks({ highestExpense, highestSpent, leastSpent, currency, symbol }: Props) {
    return (
        <div className="grid grid-cols-3 gap-4 max-[645px]:grid-cols-1">
            <Pick
                label="Highest expense"
                value={highestExpense.amount === 0 ? '—' : <>{symbol} <Amount value={formatExpenseAmount(highestExpense.amount, currency)} /></>}
                sub={highestExpense.amount === 0 ? ' ' : highestExpense.name}
            />

            <Pick
                label="Top category"
                value={highestSpent.total === 0 ? '—' : highestSpent.category}
                sub={highestSpent.total === 0 ? ' ' : `${symbol} ${formatExpenseAmount(highestSpent.total, currency)} spent`}
            />

            <Pick
                label="Lightest category"
                value={leastSpent.total === 0 ? '—' : leastSpent.category}
                sub={leastSpent.total === 0 ? ' ' : `${symbol} ${formatExpenseAmount(leastSpent.total, currency)} spent`}
            />
        </div>
    )
}

export default MonthlyPicks;
