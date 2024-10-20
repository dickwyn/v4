import type { Metadata } from 'next';

import { baseUrl } from './sitemap';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Dick Wyn Yong',
    template: '%s | Dick Wyn Yong',
  },
  description:
    'Dick Wyn is a software engineer and content creator. He is a Malaysian living in America and enjoys experimenting with new recipes in the kitchen and geeking out on the latest tech gadgets.',
  openGraph: {
    title: 'Dick Wyn Yong',
    description:
      'Dick Wyn is a software engineer and content creator. He is a Malaysian living in America and enjoys experimenting with new recipes in the kitchen and geeking out on the latest tech gadgets.',
    url: baseUrl,
    siteName: 'Dick Wyn Yong',
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
