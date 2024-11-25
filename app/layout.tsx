import './global.css';

import { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';

import Footer from './components/footer';
import { Navbar } from './components/nav';
import { SiteInfo } from './components/siteInfo';
import { baseUrl } from './sitemap';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Dickwyn Yong',
    template: '%s | Dickwyn Yong',
  },
  description:
    'Dickwyn is a software engineer and content creator. He is a Malaysian living in America and enjoys experimenting with new recipes in the kitchen and geeking out on the latest tech gadgets.',
  openGraph: {
    title: 'Dickwyn Yong',
    description:
      'Dickwyn is a software engineer and content creator. He is a Malaysian living in America and enjoys experimenting with new recipes in the kitchen and geeking out on the latest tech gadgets.',
    url: baseUrl,
    siteName: 'Dickwyn Yong',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const cx = (...classes) => classes.filter(Boolean).join(' ');

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={cx('text-black bg-white dark:text-white dark:bg-black')}>
      <head>
        <link rel="icon" type="image/png" href="/favicon-48x48.png" sizes="48x48" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="MyWebSite" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="antialiased max-w-xl mx-4 mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <SiteInfo />
          <Navbar />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
