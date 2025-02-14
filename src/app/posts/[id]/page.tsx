import { Metadata } from 'next';

import { getPost } from '@/utils/api/posts';
import type { PostType } from '@/utils/api/types';

import BlogPost from '@/organisms/BlogPost';
import ServerError from '@/molecules/ServerError';

// ===============================================================

// Force SSR default
export const dynamic = 'force-dynamic';

// ===============================================================

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  let post: PostType = {} as PostType;

  try {
    post = await getPost(id);
  } catch (e) {}

  if (!post || !Object.keys(post).length) {
    return <ServerError />;
  }

  return <BlogPost {...post} />;
}

// ===============================================================

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  let post: PostType = {} as PostType;

  try {
    post = await getPost(id);
  } catch (e) {}

  if (!post || !Object.keys(post).length) {
    post = { author: '', title: '' } as PostType;
  }

  return { title: `Post: ${post.title}`, description: `${post.title} ~ ${post.author}` };
}
