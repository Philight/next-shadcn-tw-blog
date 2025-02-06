// 'use client';

import React from 'react';
// import { QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import type { Metadata, Viewport } from 'next';
// import { NextIntlClientProvider } from 'next-intl';
// import { getLocale, getMessages } from 'next-intl/server';
import { ReactNode } from 'react';

import { ThemeProvider } from '@/context/ThemeProvider';
import { AuthProvider } from '@/context/AuthProvider';

import { Toaster } from '@/components/shadcn/sonner';
// import { Footer } from '@/components/organisms/Footer';
// import Container from '@/layouts/Container';
import { TooltipProvider } from '@/components/shadcn/tooltip';
// import Header from '@/components/organisms/Header';

// import { GlobalStoreProvider } from 'src/store';
// import { LocalizationProvider } from 'src/locales';
// import { SearchParamsProvider } from 'src/router/context';
// import { getQueryClient } from 'src/services/get-query-client';

// import ProgressBar from 'src/components/progress-bar';
// import { SnackbarProvider } from 'src/components/snackbar';
import { MotionLazy } from '@/components/molecules/framer-motion';

// ----------------------------------------------------------------------

export default function Providers({ children }: { children: ReactNode }) {
  // const queryClient = getQueryClient();

  return (
    <AuthProvider>
      {/*<QueryClientProvider client={queryClient}>*/}
      {/*<LocalizationProvider>*/}
      {/*<SearchParamsProvider>*/}
      {/*<GlobalStoreProvider>*/}
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <TooltipProvider>
          <MotionLazy>
            <Toaster />
            {/*<ProgressBar />*/}
            {children}
          </MotionLazy>
        </TooltipProvider>
      </ThemeProvider>
      {/*</GlobalStoreProvider>*/}
      {/*</SearchParamsProvider>*/}
      {/*</LocalizationProvider>*/}
      {/* By default, React Query Devtools are only included in bundles when process. env. NODE_ENV === 'development', */}
      {/*<ReactQueryDevtools initialIsOpen={false} />*/}
      {/*</QueryClientProvider>*/}
    </AuthProvider>
  );
}
