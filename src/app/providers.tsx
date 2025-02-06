// 'use client';

import { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
// import { QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ThemeProvider } from '@/context/ThemeProvider';
import { AuthProvider } from '@/context/AuthProvider';
// import { GlobalStoreProvider } from 'src/store';

import { Toaster } from '@/shadcn/sonner';
import { TooltipProvider } from '@/shadcn/tooltip';
import { MotionLazy } from '@/molecules/framer-motion';
// import ProgressBar from 'src/components/progress-bar';

// import { getQueryClient } from 'src/services/get-query-client';

// ----------------------------------------------------------------------

export default function Providers({ children }: { children: ReactNode }) {
  // const queryClient = getQueryClient();

  return (
    <AuthProvider>
      {/*<QueryClientProvider client={queryClient}>*/}
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
      {/* By default, React Query Devtools are only included in bundles when process. env. NODE_ENV === 'development', */}
      {/*<ReactQueryDevtools initialIsOpen={false} />*/}
      {/*</QueryClientProvider>*/}
    </AuthProvider>
  );
}
