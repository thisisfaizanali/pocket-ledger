import Link from 'next/link'
import { useMediaQuery } from '@react-hook/media-query'
import MobileNavbar from "./mobile-Navbar"
import UserProfile from "@/components/ui/user-profile"
import { User } from "@/utils/types"

type Props = {
    user: User;
    profilePicture: string | null | undefined;
}

function todayLabel() {
    return new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })
}

function Header({ user, profilePicture }: Props) {
    const isTablet = useMediaQuery('(max-width: 1160px)');

    return (
        <header className="flex items-center justify-end gap-4 border-b border-border bg-card px-11 py-4 backdrop-blur-xl row-start-1 max-[1160px]:justify-between max-[1400px]:px-8 max-[1160px]:px-6">
            {isTablet && <MobileNavbar />}

            <div className="flex items-center gap-4">
                <span className="whitespace-nowrap font-mono text-xs tabular-nums text-muted-foreground max-[500px]:hidden">
                    {todayLabel()}
                </span>

                <Link
                    href="/dashboard/settings"
                    className="rounded-lg outline-none transition-opacity hover:opacity-80 focus-visible:outline-ring"
                >
                    <UserProfile
                        username={user.name}
                        profilePicture={profilePicture}
                    />
                </Link>
            </div>
        </header>
    )
}

export default Header
