import { Metadata } from 'next';

import { getPost } from '@/utils/api/posts';
import type { PostType } from '@/utils/api/types';

import BlogPost from '@/organisms/BlogPost';
import ServerError from '@/molecules/ServerError';

// ===============================================================

export const dynamic = 'force-dynamic';

// ===============================================================

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  // const data = await fetch(`https://api.vercel.app/blog/${id}`);
  // const post: Post[] = await data.json();

  let post: PostType = {};
  try {
    post = await getPost(id);
  } catch (e) {}

  if (!post) return <ServerError />;

  return <BlogPost {...post} />;
}

// ===============================================================

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  // const data = await fetch(`https://api.vercel.app/blog/${id}`);
  // const post: Post[] = await data.json();

  let post: PostType;
  try {
    post = await getPost(id);
  } catch (e) {}

  if (!post) {
    post = { id: null, author: '', title: '' };
  }

  return { title: `Blog | Post ${post.id}`, description: `${post.author} | ${post.title}` };
}
