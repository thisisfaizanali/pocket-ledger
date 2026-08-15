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
        <div className="grid grid-cols-[64fr_36fr] max-[960px]:grid-cols-[100fr] gap-14 max-[1400px]:gap-8 max-[1280px]:gap-6 px-12 max-[1400px]:px-8 max-[1160px]:px-6 max-[960px]:pb-6">
            <MonthlySummary
                userId={user.user_id}
                allExpenses={expenses}
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