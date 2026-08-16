'use client';

import { useEffect, useState } from 'react';
import { TbMoon, TbSun } from 'react-icons/tb';

export function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle('dark', dark);
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  return (
    <button
      type="button"
      onClick={() => {
        const next = !isDark;
        setIsDark(next);
        applyTheme(next);
      }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="bg-transparent text-muted-foreground border border-border p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-all focus:outline-none focus-visible:!outline-ring transform active:scale-90 ease-in-out duration-200"
    >
      {isDark ? <TbSun className="text-lg" /> : <TbMoon className="text-lg" />}
    </button>
  );
}
