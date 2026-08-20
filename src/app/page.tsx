'use client';

import { signInGithub, signInGoogle } from '@/lib/actions';
import LogoMark from '@/components/ui/logo-mark';
import { FaGithub } from 'react-icons/fa';

function decorativeBars() {
  const heights = [38, 62, 46, 80, 54];
  return heights.map((h, i) => (
    <div key={i} className="flex w-6 flex-col justify-end" style={{ height: 90 }}>
      <div className="w-full rounded-t-full bg-primary" style={{ height: `${h}%` }} />
    </div>
  ));
}

function decorativeRows() {
  const rows = [
    { color: '#6C6CF0', width: 82 },
    { color: '#5FB0A8', width: 58 },
    { color: '#E0906B', width: 70 },
    { color: '#4C9BD6', width: 45 },
    { color: '#D6B24C', width: 64 },
  ];

  return rows.map((row, i) => (
    <div key={i} className="flex items-center gap-3.5 rounded-xl border border-border bg-card px-4 py-3.5">
      <span className="h-5 w-5 shrink-0 rounded-full" style={{ backgroundColor: row.color }} />
      <span className="h-2.5 flex-1 rounded-full bg-secondary" />
      <span className="h-1.5 w-24 shrink-0 rounded-full bg-secondary" style={{ opacity: row.width / 100 }} />
      <span className="h-3 w-16 shrink-0 rounded-full bg-secondary" />
    </div>
  ));
}

function LoginPage() {
  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden bg-background p-10">
      <div aria-hidden className="pointer-events-none fixed -left-40 -top-64 h-[640px] w-[640px] rounded-full bg-primary opacity-[0.16] blur-3xl" />
      <div aria-hidden className="pointer-events-none fixed -right-56 -top-40 h-[520px] w-[520px] rounded-full bg-foreground opacity-[0.05] blur-3xl" />

      <div aria-hidden className="pointer-events-none absolute inset-0 flex justify-center opacity-40 blur-[1px]">
        <div className="flex w-[1040px] flex-col gap-8 px-16 py-16 max-[1160px]:hidden">
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary">This month</span>
              <span className="font-mono text-4xl font-semibold tracking-tight text-foreground">$2,847</span>
            </div>

            <div className="flex gap-9">{decorativeBars()}</div>
          </div>

          <div className="flex flex-col gap-3">{decorativeRows()}</div>
        </div>
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,transparent_0%,transparent_8%,hsl(var(--background))_60%)]" />

      <div className="relative z-[1] flex w-full max-w-[400px] flex-col overflow-hidden rounded-[28px] border border-border bg-card shadow-[var(--shadow-card)]">
        <div className="flex flex-col items-center gap-2.5 px-10 pb-7 pt-11">
          <LogoMark size={44} className="mb-2" />

          <span className="whitespace-nowrap text-xl font-bold tracking-tight text-foreground">Pocket Ledger</span>
          <span className="whitespace-nowrap text-[13.5px] text-muted-foreground">Track every dollar, effortlessly.</span>
        </div>

        <div className="flex flex-col gap-2.5 px-10 pb-9 pt-1.5">
          <form action={signInGoogle}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-full border border-border bg-secondary px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary focus:outline-none focus-visible:outline-ring"
            >
              <svg width="16" height="16" viewBox="0 0 48 48" className="shrink-0">
                <path fill="#4285F4" d="M45.1 24.5c0-1.6-.1-3.1-.4-4.6H24v9h11.9c-.5 2.8-2.1 5.2-4.4 6.8v5.7h7.1c4.2-3.9 6.5-9.6 6.5-16.9z" />
                <path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.5-5.3l-7.1-5.7c-2 1.3-4.5 2.1-7.4 2.1-5.7 0-10.5-3.8-12.2-9h-7.3v5.9C7.9 41 15.3 46 24 46z" />
                <path fill="#FBBC05" d="M11.8 28.1c-.4-1.3-.7-2.7-.7-4.1s.2-2.8.7-4.1v-5.9H4.5C3.2 16.7 2.4 20.2 2.4 24s.8 7.3 2.1 10.1z" />
                <path fill="#EA4335" d="M24 10.9c3.2 0 6 1.1 8.3 3.2l6.2-6.2C34.9 4.4 29.9 2.4 24 2.4c-8.7 0-16.1 5-19.5 12.1l7.3 5.9c1.7-5.2 6.5-9.5 12.2-9.5z" />
              </svg>

              <span className="flex-1 text-center">Continue with Google</span>
            </button>
          </form>

          <form action={signInGithub}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-full border border-foreground bg-foreground px-4 py-3 text-sm font-medium text-background transition-opacity hover:opacity-85 focus:outline-none focus-visible:outline-ring"
            >
              <FaGithub className="shrink-0 text-base" />

              <span className="flex-1 text-center">Continue with GitHub</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
