'use client';

import './global.css';

import { ReactNode, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import Footer from './components/footer';
import { Navbar } from './components/nav';

const cx = (...classes) => classes.filter(Boolean).join(' ');

export default function Layout({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      console.log(
        `
%cDick Wyn Yong's Portfolio vAPP_VERSION
  
Looking for something?
  
👨‍💻 https://www.github.com/dickwyn
📄 https://dickwyn.xyz/dickwyn-resume.pdf
🐛 https://dickwyn.xyz/debug
  
built: unsetTimestamp`,
        'font-family:monospace;'
      );
    }
  }, []);

  return (
    <html lang="en" className={cx('text-black bg-white dark:text-wh~ite dark:bg-black')}>
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
