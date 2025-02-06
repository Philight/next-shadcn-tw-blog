import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { ReactNode } from 'react';

import Providers from './providers';

// import { geist } from '/public/fonts/geist';
import { lora } from '/public/fonts/lora';
import '../styles/globals.css';

// ============================================================

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export const metadata: Metadata = {
  title: {
    template: 'Blog | %s',
    default: 'About You',
  },
  description: 'Generated by create next app',
  generator: 'Next.js',
  applicationName: 'About You',
  referrer: 'origin-when-cross-origin',
  keywords: ['Next.js', 'React', 'JavaScript'],
  creator: 'Maela Cudini',
  metadataBase: new URL('https://addwebsite.com'),
  manifest: 'https://nextjs.org/manifest.json',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'it-IT': '/it-IT',
    },
  },
  openGraph: {
    title: 'About You',
    description: 'The React Framework for the Web',
    url: 'https://addwebsite.com',
    siteName: 'About You',
    images: [
      {
        url: 'https://addwebsite.com/og.png',
        width: 1800,
        height: 1600,
        alt: 'My custom alt',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About You',
    description: 'The React Framework for the Web',
    siteId: '',
    creator: '@aboutyou',
    creatorId: '',
    images: ['https://addwebsite.com/og.png'],
  },
  icons: {
    icon: '/icon.png',
    shortcut: '/shortcut-icon.png',
    apple: '/apple-icon.png',
  },
  robots: {
    index: false,
    follow: false,
    nocache: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

// ============================================================

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <body className={`${lora.className} antialiased`} suppressHydrationWarning={true} id="body">
        <NextIntlClientProvider messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
