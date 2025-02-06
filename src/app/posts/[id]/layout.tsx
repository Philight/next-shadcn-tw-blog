import React from 'react';
import { getTranslations } from 'next-intl/server';

import MainLayout from '@/layouts/Main';

// ----------------------------------------------------------------------

export default async function Layout({ children }: { children: React.ReactNode }) {
  const t = await getTranslations('posts');

  return <MainLayout title={t('hero_title')}>{children}</MainLayout>;
}

// ----------------------------------------------------------------------
