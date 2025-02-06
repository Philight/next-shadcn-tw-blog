import { useTranslations } from 'next-intl';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../shadcn/card';
import Heading from '@/components/atoms/Heading';
import { Separator } from '@/components/shadcn/separator';
import { cn } from '@/utils/functions';

import type { IGenericProps } from '@/types/generic-types';

// ============================================================================

export interface BlogPostProps extends IGenericProps {}

export default function BlogPost({ className, id, title, content, author }: BlogPostProps) {
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

  if (!content) {
    return noBlogPosts;
  }

  return (
    <article className={cn('blog-post__c', className)}>
      <div className="">
        <Heading tag="h2">{author}</Heading>
        <Separator className="divider" orientation="horizontal" />
      </div>
      <p>{content}</p>
    </article>
  );
}
