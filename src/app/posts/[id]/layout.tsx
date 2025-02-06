import React from 'react';
import { getTranslations } from 'next-intl/server';

import MainLayout from '@/layouts/Main';

// ----------------------------------------------------------------------

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Layout({ children }: { children: React.ReactNode }) {
  const t = await getTranslations('posts');
  return <MainLayout title={t('hero_title')}>{children}</MainLayout>;
}

// ----------------------------------------------------------------------
