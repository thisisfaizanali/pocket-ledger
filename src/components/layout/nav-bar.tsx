'use client';

import { signOutAction } from '@/lib/actions';
import { useMediaQuery } from '@react-hook/media-query';
import { motion } from 'framer-motion';
import localFont from 'next/font/local';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaMoneyBillTransfer } from 'react-icons/fa6';
import { MdAnalytics } from 'react-icons/md';
import { TbLayoutDashboardFilled, TbLogout2 } from 'react-icons/tb';
import logo from '../../../public/file.png';

const local = localFont({
  src: '../../fonts/publica-sans/ZPublicaSans.otf',
  display: 'swap',
});

function NavBar() {
  const pathname = usePathname();
  const isDesktop = useMediaQuery('(min-width: 1400px)');

  return (
    <nav
      className={
        'col-start-1 col-end-2 row-start-1 row-end-3 flex flex-col h-full bg-card border-r border-border'
      }
    >
      {isDesktop ? (
        <Link
          href="/dashboard"
          className={`${local.className} text-foreground ml-7 mt-7 p-1 rounded text-3xl tracking-tight font-bold focus:outline-none focus-visible:outline-ring`}
        >
          Pocket Ledger
        </Link>
      ) : (
        <Link
          href="/dashboard"
          className={`${local.className} ml-4 mt-4 p-1 rounded-md text-3xl font-bold focus:outline-none focus-visible:outline-ring`}
        >
          <Image src={logo} alt="logo" height={45} />
        </Link>
      )}

      <ul
        className={
          'grow ml-4 max-[1400px]:ml-5 mr-7 max-[1400px]:mr-0 flex flex-col mt-10 mb-8 gap-3 font-semibold'
        }
      >
        <li className={'flex gap-4 items-center relative'}>
          {pathname === '/dashboard' && (
            <motion.div
              layoutId="nav"
              className="bg-primary block absolute inset-0 rounded-lg"
            />
          )}

          <Link
            href="/dashboard"
            className={`rounded-lg focus:outline-none focus-visible:outline-ring relative z-10`}
          >
            <div
              className={`mt-auto rounded-lg flex gap-3 items-center ${pathname === '/dashboard' ? 'text-primary-foreground' : 'text-muted-foreground bg-transparent border-transparent hover:bg-accent hover:text-accent-foreground'} py-3 pl-4 pr-16 max-[1400px]:p-3 transition-colors ease-in-out duration-200`}
            >
              <TbLayoutDashboardFilled className={'text-2xl'} />

              {isDesktop && <p className="tracking-wide">Overview</p>}
            </div>
          </Link>
        </li>

        <li className={'flex gap-4 items-center relative'}>
          {pathname === '/dashboard/expenses' && (
            <motion.div
              layoutId="nav"
              className="bg-primary block absolute inset-0 rounded-lg"
            />
          )}

          <Link
            href="/dashboard/expenses"
            className={`focus:outline-none rounded-lg ${pathname === '/dashboard/expenses' ? 'focus-visible:outline-ring' : 'focus-visible:outline-ring'} relative z-10`}
          >
            <div
              className={`mt-auto flex rounded-lg gap-3 items-center ${pathname === '/dashboard/expenses' ? 'text-primary-foreground' : 'text-muted-foreground bg-transparent border-transparent hover:bg-accent hover:text-accent-foreground'} py-3 pl-4 pr-16 max-[1400px]:p-3 transition-colors ease-in-out duration-200`}
            >
              <FaMoneyBillTransfer className={'text-2xl'} />

              {isDesktop && <p className="tracking-wide">Expenses</p>}
            </div>
          </Link>
        </li>

        <li className={'flex gap-4 items-center relative'}>
          {pathname === '/dashboard/analytics' && (
            <motion.div
              layoutId="nav"
              className="bg-primary block absolute inset-0 rounded-lg"
            />
          )}

          <Link
            href="/dashboard/analytics"
            className={`focus:outline-none rounded-lg focus-visible:outline-ring relative z-10`}
          >
            <div
              className={`mt-auto rounded-lg flex gap-3 items-center ${pathname === '/dashboard/analytics' ? 'text-primary-foreground' : 'text-muted-foreground bg-transparent border-transparent hover:bg-accent hover:text-accent-foreground'} py-3 pl-4 pr-16 max-[1400px]:p-3 transition-colors ease-in-out duration-200`}
            >
              <MdAnalytics className={'text-2xl'} />

              {isDesktop && <p className="tracking-wide">Analytics</p>}
            </div>
          </Link>
        </li>

        <li className={'mt-auto flex gap-4 items-center'}>
          <form action={signOutAction}>
            <button
              className={
                'mt-auto flex rounded-lg gap-3 items-center py-3 pl-4 pr-16 max-[1400px]:p-3 text-muted-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus-visible:outline-ring transition-colors ease-in-out duration-200'
              }
              type="submit"
            >
              <TbLogout2 className={'text-2xl'} />

              {isDesktop && <p className="tracking-wide">Log out</p>}
            </button>
          </form>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
