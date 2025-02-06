import BlogList from '@/organisms/BlogList';
import { getPosts } from '@/utils/api/posts';
import type { PostType } from '@/utils/api/types';
import ServerError from '@/molecules/ServerError';

import { Loader2 } from 'lucide-react';

// ===============================================================

// Force static generation
export const dynamic = 'force-static';

// Invalidate cache: 1 day
export const revalidate = 86400;
// export const revalidate = 120;

// ===============================================================

interface Props {}

export default async function Home() {
  let posts: PostType[] = [];
  try {
    posts = await getPosts();
  } catch (e) {}

  if (!posts.length) return <ServerError />;

  console.log('HOME', posts);
  return (
    <>
      <BlogList posts={posts} />
    </>
  );
}

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Newest blog posts',
};
