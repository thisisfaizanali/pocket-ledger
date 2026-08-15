import { useMediaQuery } from '@react-hook/media-query'
import MobileNavbar from "./mobile-Navbar"
import ProfileButton from "@/components/ui/profile-button"
import ThemeToggle from "@/components/ui/theme-toggle"
import { User } from "@/utils/types"

type Props = {
    user: User;
    profilePicture: string | null | undefined;
}

function Header({ user, profilePicture }: Props) {
    const isTablet = useMediaQuery('(max-width: 1160px)');

    return (
        <header className={"flex justify-end max-[1160px]:justify-between mx-12 max-[1400px]:mx-8 max-[1160px]:mx-6 items-center row-start-1 border-b border-border"}>
            {isTablet && <MobileNavbar />}

            <div className="flex items-center gap-3">
                <ThemeToggle />

                <ProfileButton
                    user={user}
                    profilePicture={profilePicture}
                />
            </div>
        </header>
    )
}

export default Header