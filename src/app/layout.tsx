import '@/styles/globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';

const local = localFont({
  src: '../fonts/literal/Literal - Light (Personal use).otf',
  display: 'swap',
});

const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: {
    template: '%s | Pocket Ledger',
    default: 'Pocket Ledger',
  },
  description:
    'Track expenses easily, analyze spending patterns, and view financial insights through this dashboard. The perfect expense management tool for personal finance control.',
  icons: {
    icon: [
      { url: '../../public/favicon.ico', sizes: '48x48' },
      { url: '../../public/android-chrome-192x192.png', sizes: '192x192' },
    ],
    apple: [{ url: '../../public/apple-touch-icon.png', sizes: '180x180' }],
  },
  openGraph: {
    title: 'Pocket Ledger',
    description:
      'Take control of your finances with this comprehensive expense tracker. Monitor spending through detailed tables, visualize trends with analytics, and make informed decisions.',
    url: 'https://your-domain.com',
    siteName: 'Pocket Ledger',
    images: [
      {
        url: '../../public/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Cahsflow Dojo Dashboard Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cahflow Dojo',
    description:
      'Take control of your finances with this comprehensive expense tracker. Monitor spending through detailed tables, visualize trends with analytics, and make informed decisions.',
    images: ['../../public/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: '/site.webmanifest',
};

function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${local.className} h-svh bg-custom-gradient`}>
        {children}
      </body>
    </html>
  );
}

export default RootLayout;

export { metadata };
