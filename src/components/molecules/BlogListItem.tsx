import { CleanUserType } from '@/utils/api/usersApi';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { SquareArrowOutUpRight } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '../shadcn/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '../shadcn/tooltip';
import LazyLoadImage from '@/components/atoms/LazyLoadImage';

import { ICONS_SIZES } from '@/utils/constants';
import { cn } from '@/utils/functions';
import type { PostType } from '@/utils/api/types';
import { routes, navigation } from '/src/navigation';

import type { IGenericProps } from '@/types/generic-types';

// ============================================================================

const NO_IMAGE = '/assets/images/no_image.jpg';

interface BlogListItemProps extends IGenericProps, PostType {}

export default function BlogListItem({ id, className, title, content, author, image }: BlogListItemProps) {
  const t = useTranslations('home');

  const cardContent = (
    <Link href={`${routes.posts.id.replace('{$id}', id)}`}>
      <Card htmlTag="article" className={cn('blog-list-item__c relative', className)}>
        <div className="image-wrapper">
          <LazyLoadImage width={100} height={100} layout="responsive" src={image ?? NO_IMAGE} alt="BlogPost Image" />
        </div>
        <div className="blog-list-item__content card-content">
          <CardHeader>
            <p className="blog-list-item__author">{author}</p>
            <CardTitle className="blog-list-item__title">{title}</CardTitle>
          </CardHeader>
          <CardContent htmlTag="p" className="">
            {content}
          </CardContent>
        </div>
      </Card>
    </Link>
  );

  return (
    <Tooltip>
      <TooltipTrigger aria-label="visit user profile">{cardContent}</TooltipTrigger>
      <TooltipContent className="blog-list-item__tooltip">
        <p>{t('visit_blog_post', { author })}</p>
      </TooltipContent>
    </Tooltip>
  );
}
