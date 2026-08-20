import Image from 'next/image'

type ProfileProps = {
    username: string
    profilePicture: string | null | undefined
}

function initials(name: string) {
    const parts = name.trim().split(/\s+/).filter(Boolean)
    if (parts.length === 0) return '?'
    const first = parts[0][0] ?? ''
    const last = parts.length > 1 ? parts[parts.length - 1][0] : ''
    return (first + last).toUpperCase()
}

function UserProfile({ username, profilePicture }: ProfileProps) {
    return (
        <div className="flex items-center gap-2.5">
            {profilePicture ? (
                <Image
                    src={profilePicture}
                    alt="User profile picture"
                    width={28}
                    height={28}
                    className="rounded-full"
                />
            ) : (
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                    {initials(username)}
                </span>
            )}

            <span className="whitespace-nowrap text-[13.5px] font-semibold tracking-wide text-foreground max-[500px]:hidden">
                {username}
            </span>
        </div>
    )
}

export default UserProfile
