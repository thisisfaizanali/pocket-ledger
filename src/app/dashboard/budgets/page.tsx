import type { Metadata } from "next"
import BudgetsPage from "@/components/feature/budgets/budgets-page"
import { auth } from "@/lib/auth"
import { fetchUser, fetchAllUserExpenses, fetchBudgets } from "@/lib/data"
import { getCurrencySymbol } from "@/utils/functions"

const metadata: Metadata = {
    title: 'Budgets'
}

async function Budgets() {
    const session = await auth()

    const user = await fetchUser(session?.user?.email, session?.user?.name)
    const { expenses } = await fetchAllUserExpenses(user.user_id, user.currentPage)
    const budgets = await fetchBudgets(user.user_id)

    return (
        <BudgetsPage
            userId={user.user_id}
            budgets={budgets}
            allExpenses={expenses}
            currency={user.currency}
            currencySymbol={getCurrencySymbol(user.currency)}
        />
    );
}

export default Budgets;

export { metadata };
