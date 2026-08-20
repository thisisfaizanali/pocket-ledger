import type { Metadata } from "next"
import LatestExpenses from "@/components/feature/overview/latest-expenses"
import MonthlySummary from "@/components/feature/overview/monthly-summary"
import { auth } from "@/lib/auth"
import { fetchUser, fetchAllUserExpenses, fetchBudgets } from "@/lib/data"
import { getCurrencySymbol } from "@/utils/functions"

const metadata: Metadata = {
    title: 'Overview'
}

async function OverviewPage() {
    const session = await auth()

    const user = await fetchUser(session?.user?.email, session?.user?.name)
    const { expenses } = await fetchAllUserExpenses(user.user_id, user.currentPage)
    const budgets = await fetchBudgets(user.user_id)

    const currencySymbol = getCurrencySymbol(user.currency)

    return (
        <div className="flex flex-col gap-6 max-w-[1080px] px-11 pb-20 pt-6 max-[1400px]:px-8 max-[1160px]:px-6">
            <MonthlySummary
                allExpenses={expenses}
                currency={user.currency}
                currencySymbol={currencySymbol}
                budgets={budgets}
            />

            <LatestExpenses
                userId={user.user_id}
                currency={user.currency}
                allExpenses={expenses}
            />
        </div>
    )
}

export default OverviewPage;

export { metadata }
