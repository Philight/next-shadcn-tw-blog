import { getUserPublic } from '@/utils/api/userPublicApi';
import { Metadata } from 'next';
import { ReactNode } from 'react';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  // const user = await getUserPublic(slug)
  const user = null;

  return { title: user ? user.username : 'Welcome' };
}

export default async function UserPublicLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
