import type { Metadata } from "next"
import SettingsPage from "@/components/feature/settings/settings-page"
import { auth } from "@/lib/auth"
import { fetchUser, fetchAllUserExpenses } from "@/lib/data"

const metadata: Metadata = {
    title: 'Settings'
}

async function Settings() {
    const session = await auth()

    const user = await fetchUser(session?.user?.email, session?.user?.name)
    const { expenses } = await fetchAllUserExpenses(user.user_id, user.currentPage)

    return (
        <SettingsPage user={user} allExpenses={expenses} />
    );
}

export default Settings;

export { metadata };
