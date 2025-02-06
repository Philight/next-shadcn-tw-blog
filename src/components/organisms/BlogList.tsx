import { useTranslations } from 'next-intl';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../shadcn/card';
import { UserCard } from '@/components/molecules/UserCard';
import BlogListItem from '@/components/molecules/BlogListItem';
import Heading from '@/components/atoms/Heading';
import { cn } from '@/utils/functions';

import type { IGenericProps } from '@/types/generic-types';

// ============================================================================

export interface BlogListProps extends IGenericProps {
  posts: any[];
}

export default function BlogList({ posts, className }: BlogListProps) {
  const t = useTranslations();

  const noBlogPosts = (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
      <Card>
        <CardHeader>
          <CardTitle>{t('no_blog_posts.title')}</CardTitle>
          <CardDescription>{t('no_blog_posts.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{t('no_blog_posts.content')}</p>
        </CardContent>
      </Card>
    </div>
  );

  if (!posts || posts.length === 0) {
    return noBlogPosts;
  }

  return (
    <section className={cn('blog-list__c', className)}>
      <Heading tag="h2">{t('home.blog_title')}</Heading>
      <div className={cn('blog-list__grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4')}>
        {posts.map((post: any) => (
          <BlogListItem key={post.id} {...post} />
        ))}
      </div>
    </section>
  );
}
