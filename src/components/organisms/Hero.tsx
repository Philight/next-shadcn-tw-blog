import Heading from '../atoms/Heading';
import LazyLoadImage from '@/components/atoms/LazyLoadImage';

import { cn } from '@/utils/functions';
import type { IGenericProps } from '@/types/generic-types';

// ============================================================================

export interface HeroPropsType extends IGenericProps {
  title: string;
  imageProps: {
    src: string;
    alt: string;
  };
}

export default function Hero({ title, className, imageProps }: HeroPropsType) {
  return (
    <section className={cn('hero__c ', className)}>
      <LazyLoadImage fill {...(imageProps ?? {})} />
      <Heading tag="h1">{title}</Heading>
    </section>
  );
}
