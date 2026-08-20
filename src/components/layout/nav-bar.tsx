'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaMoneyBillTransfer } from 'react-icons/fa6';
import { MdAnalytics } from 'react-icons/md';
import {
  TbLayoutDashboardFilled,
  TbLogout2,
  TbSettings,
  TbWallet,
} from 'react-icons/tb';
import { signOutAction } from '@/lib/actions';
import LogoMark from '@/components/ui/logo-mark';
import ThemeToggle from '@/components/ui/theme-toggle';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Overview', icon: TbLayoutDashboardFilled },
  { href: '/dashboard/expenses', label: 'Expenses', icon: FaMoneyBillTransfer },
  { href: '/dashboard/analytics', label: 'Analytics', icon: MdAnalytics },
  { href: '/dashboard/budgets', label: 'Budgets', icon: TbWallet },
  { href: '/dashboard/settings', label: 'Settings', icon: TbSettings },
];

function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="col-start-1 col-end-2 row-start-1 row-end-3 flex h-full w-full flex-col gap-8 border-r border-border bg-card p-4 backdrop-blur-xl">
      <Link
        href="/dashboard"
        className="flex items-center gap-2.5 rounded-lg p-1 focus:outline-none focus-visible:outline-ring"
      >
        <LogoMark size={26} />

        <span className="whitespace-nowrap text-[15px] font-bold tracking-tight text-foreground">
          Pocket Ledger
        </span>
      </Link>

      <ul className="flex grow flex-col gap-0.5">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;

          return (
            <li key={href}>
              <Link
                href={href}
                className={`flex w-full items-center gap-3 rounded-full px-3.5 py-2.5 text-sm transition-colors focus:outline-none focus-visible:outline-ring ${
                  active
                    ? 'bg-secondary font-semibold text-foreground'
                    : 'font-medium text-muted-foreground hover:bg-secondary/60'
                }`}
              >
                <Icon className="shrink-0 text-lg" />

                <span className="tracking-wide">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="mt-auto flex flex-col gap-2.5">
        <div className="flex items-center justify-between gap-2 px-1">
          <span className="whitespace-nowrap text-xs text-muted-foreground">
            Theme
          </span>

          <ThemeToggle />
        </div>

        <form action={signOutAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground focus:outline-none focus-visible:outline-ring"
          >
            <TbLogout2 className="shrink-0 text-lg" />

            <span className="tracking-wide">Log out</span>
          </button>
        </form>
      </div>
    </nav>
  );
}

export default NavBar;
