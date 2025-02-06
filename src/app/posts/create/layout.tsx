import React from 'react';
import { getTranslations } from 'next-intl/server';

import MainLayout from '@/layouts/Main';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default async function Layout({ children }: Props) {
  const t = await getTranslations('posts_create');
  return <MainLayout title={t('hero_title')}>{children}</MainLayout>;
}

// ----------------------------------------------------------------------
