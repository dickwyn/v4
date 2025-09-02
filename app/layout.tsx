import './global.css';

import { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Fira_Code, Inter, Literata } from 'next/font/google';
import Script from 'next/script';

import Footer from './components/footer';
import { Navbar } from './components/nav';
import { SiteInfo } from './components/siteInfo';
import { baseUrl } from './sitemap';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fira-code',
});

const literata = Literata({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-literata',
});

const siteName = 'Dickwyn Yong';
const siteDescription =
  'Dickwyn is a software engineer and content creator. He is a Malaysian living in America and enjoys experimenting with new recipes in the kitchen and geeking out on the latest tech gadgets.';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: siteName,
    description: siteDescription,
    url: baseUrl,
    siteName,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: siteDescription,
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
    <html
      lang="en"
      className={cx(
        'text-black bg-white dark:text-white dark:bg-black',
        inter.variable,
        firaCode.variable,
        literata.variable
      )}
    >
      <head>
        <link rel="icon" type="image/png" href="/favicon-48x48.png" sizes="48x48" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="MyWebSite" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="alternate" type="application/rss+xml" title="RSS" href="/rss" />
      </head>
      <body className="antialiased max-w-xl mx-4 mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <SiteInfo />
          <Navbar />
          {children}
          <Footer />
          <Script
            src="https://analytics.dickwyn.com/script.js"
            data-website-id="a38ba9c3-b3ac-4d35-a975-43dc25892827"
            strategy="afterInteractive"
            defer
          />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
