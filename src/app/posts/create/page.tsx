import { Metadata } from 'next';

import CreatePost from '@/components/organisms/CreatePost';

// ===============================================================

export default async function Page() {
  return <CreatePost />;
}

// ===============================================================

export const metadata: Metadata = {
  title: 'New post',
  description: 'New blog post',
};
